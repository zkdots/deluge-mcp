import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

function parseArg(flag, fallback) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1 || idx + 1 >= process.argv.length) {
    return fallback;
  }
  return process.argv[idx + 1];
}

function parseNumber(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function parseArgsJson(value, fallback) {
  if (!value) {
    return fallback;
  }
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed) && parsed.every((v) => typeof v === "string")) {
      return parsed;
    }
  } catch {}
  return fallback;
}

function formatError(error) {
  if (error instanceof Error) {
    return error.stack ?? error.message;
  }
  return String(error);
}

function elapsedMs(start) {
  return Number(process.hrtime.bigint() - start) / 1_000_000;
}

async function runStep(name, fn) {
  const stepStart = process.hrtime.bigint();
  process.stdout.write(`\n[step] ${name}\n`);
  try {
    const value = await fn();
    process.stdout.write(`[ok] ${name} (${elapsedMs(stepStart).toFixed(1)} ms)\n`);
    return { ok: true, value };
  } catch (error) {
    process.stdout.write(`[fail] ${name} (${elapsedMs(stepStart).toFixed(1)} ms)\n`);
    process.stdout.write(`${formatError(error)}\n`);
    return { ok: false, error };
  }
}

async function main() {
  const command = parseArg("--command", "node");
  const entry = parseArg("--entry", "dist/src/index.js");
  const argsJson = parseArg("--args-json", "");
  const cwd = parseArg("--cwd", process.cwd());
  const timeoutMs = parseNumber(parseArg("--timeout", "120000"), 120000);
  const args = parseArgsJson(argsJson, [entry]);

  process.stdout.write("MCP stdio diagnose\n");
  process.stdout.write(`command: ${command}\n`);
  process.stdout.write(`args: ${JSON.stringify(args)}\n`);
  process.stdout.write(`cwd: ${cwd}\n`);
  process.stdout.write(`timeout_ms: ${timeoutMs}\n`);

  const transport = new StdioClientTransport({
    command,
    args,
    cwd,
    stderr: "pipe",
  });

  let stderrBytes = 0;
  transport.stderr?.on("data", (chunk) => {
    const text = chunk.toString();
    stderrBytes += chunk.length;
    if (text.trim()) {
      process.stderr.write(`[server] ${text}`);
    }
  });

  const client = new Client({ name: "stdio-diagnose-client", version: "0.1.0" });
  const options = { timeout: timeoutMs };
  const summary = [];
  const started = process.hrtime.bigint();

  try {
    const connect = await runStep("connect (initialize handshake)", () => client.connect(transport, options));
    summary.push({ step: "connect", ok: connect.ok });
    if (!connect.ok) {
      process.exitCode = 1;
      return;
    }

    const listTools = await runStep("listTools", () => client.listTools(undefined, options));
    summary.push({
      step: "listTools",
      ok: listTools.ok,
      tools: listTools.ok ? listTools.value.tools.length : undefined,
    });

    const readRules = await runStep("readResource deluge://rules/v1", () =>
      client.readResource({ uri: "deluge://rules/v1" }, options)
    );
    summary.push({
      step: "readResource.rules",
      ok: readRules.ok,
      resources: readRules.ok ? readRules.value.contents.length : undefined,
    });

    const health = await runStep("callTool deluge_health", () =>
      client.callTool({ name: "deluge_health", arguments: { verbose: true } }, undefined, options)
    );
    summary.push({ step: "callTool.health", ok: health.ok });

    const validate = await runStep("callTool deluge_validate", () =>
      client.callTool(
        {
          name: "deluge_validate",
          arguments: { code: 'listVar = {"A", "B"};\nvalue = listVar.get(2);', strict: true },
        },
        undefined,
        options
      )
    );
    summary.push({ step: "callTool.validate", ok: validate.ok });

    if (!summary.every((s) => s.ok)) {
      process.exitCode = 1;
    }
  } finally {
    try {
      await client.close();
    } catch {}
    try {
      await transport.close();
    } catch {}
    process.stdout.write("\nSummary\n");
    for (const row of summary) {
      process.stdout.write(`- ${row.step}: ${row.ok ? "ok" : "fail"}\n`);
    }
    process.stdout.write(`total_ms: ${elapsedMs(started).toFixed(1)}\n`);
    process.stdout.write(`stderr_bytes: ${stderrBytes}\n`);
  }
}

main().catch((error) => {
  process.stderr.write(`${formatError(error)}\n`);
  process.exit(1);
});
