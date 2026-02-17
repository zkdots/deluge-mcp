import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createServer } from "../dist/src/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseArg(flag, fallback) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1 || idx + 1 >= process.argv.length) {
    return fallback;
  }
  return process.argv[idx + 1];
}

function readPath(obj, dotted) {
  return dotted.split(".").reduce((acc, key) => (acc && typeof acc === "object" ? acc[key] : undefined), obj);
}

function fail(message) {
  throw new Error(message);
}

async function startWithTransport(transportMode) {
  const requestOptions = { timeout: 180000 };

  if (transportMode === "inmemory") {
    const server = await createServer();
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    await server.connect(serverTransport);
    const client = new Client({ name: "smoke-matrix-client", version: "0.1.0" });
    await client.connect(clientTransport, requestOptions);
    return {
      client,
      requestOptions,
      close: async () => {
        await client.close();
        await server.close();
      },
    };
  }

  if (transportMode === "stdio") {
    const transport = new StdioClientTransport({
      command: "node",
      args: ["dist/src/index.js"],
      cwd: process.cwd(),
      stderr: "pipe",
    });

    transport.stderr?.on("data", (chunk) => {
      const text = chunk.toString().trim();
      if (text) {
        console.error(`[server] ${text}`);
      }
    });

    const client = new Client({ name: "smoke-matrix-client", version: "0.1.0" });
    await client.connect(transport, requestOptions);
    return {
      client,
      requestOptions,
      close: async () => {
        await client.close();
        await transport.close();
      },
    };
  }

  throw new Error(`Unsupported transport: ${transportMode}`);
}

function assertToolResult(step, result) {
  const rules = step.assert || {};

  if (typeof rules.isError === "boolean") {
    const isError = Boolean(result?.isError);
    if (isError !== rules.isError) {
      fail(`[${step.name}] expected isError=${rules.isError}, got ${isError}`);
    }
  }

  if (Array.isArray(rules.structuredHasKeys)) {
    const sc = result?.structuredContent;
    for (const key of rules.structuredHasKeys) {
      if (!(sc && Object.hasOwn(sc, key))) {
        fail(`[${step.name}] missing structuredContent key: ${key}`);
      }
    }
  }

  if (Array.isArray(rules.structuredPathEqualsOneOf)) {
    const sc = result?.structuredContent;
    for (const check of rules.structuredPathEqualsOneOf) {
      const value = readPath(sc, check.path);
      if (!check.oneOf.includes(value)) {
        fail(
          `[${step.name}] expected path '${check.path}' in ${JSON.stringify(check.oneOf)}, got ${JSON.stringify(value)}`
        );
      }
    }
  }

  if (Array.isArray(rules.textIncludes)) {
    const text = (result?.content || [])
      .filter((part) => part?.type === "text")
      .map((part) => part.text)
      .join("\n");

    for (const expected of rules.textIncludes) {
      if (!text.includes(expected)) {
        fail(`[${step.name}] expected response text to include: ${expected}`);
      }
    }
  }
}

function assertResourceResult(step, result) {
  const rules = step.assert || {};
  const first = Array.isArray(result?.contents) ? result.contents[0] : undefined;
  const text = first && typeof first.text === "string" ? first.text : "";

  if (Array.isArray(rules.resourceTextIncludes)) {
    for (const expected of rules.resourceTextIncludes) {
      if (!text.includes(expected)) {
        fail(`[${step.name}] expected resource text to include: ${expected}`);
      }
    }
  }
}

async function main() {
  const scenarioPath = parseArg("--scenario", path.join(__dirname, "scenarios/default-smoke.json"));
  const transport = parseArg("--transport", "inmemory");

  const raw = await fs.readFile(scenarioPath, "utf8");
  const scenario = JSON.parse(raw);

  console.log(`Running scenario: ${scenario.name}`);
  console.log(`Transport: ${transport}`);

  const { client, requestOptions, close } = await startWithTransport(transport);

  try {
    const tools = await client.listTools(undefined, requestOptions);
    const toolNames = tools.tools.map((t) => t.name);

    for (const required of scenario.requiredTools || []) {
      if (!toolNames.includes(required)) {
        fail(`Missing required tool: ${required}`);
      }
    }

    for (const uri of scenario.requiredResources || []) {
      const resource = await client.readResource({ uri }, requestOptions);
      if (!Array.isArray(resource.contents) || resource.contents.length === 0) {
        fail(`Required resource unavailable: ${uri}`);
      }
    }

    const results = [];

    for (const step of scenario.steps || []) {
      if (step.type === "tool") {
        const result = await client.callTool(
          { name: step.tool, arguments: step.args || {} },
          undefined,
          requestOptions
        );
        assertToolResult(step, result);
        results.push({ name: step.name, status: "pass" });
        continue;
      }

      if (step.type === "resource") {
        const result = await client.readResource({ uri: step.uri }, requestOptions);
        assertResourceResult(step, result);
        results.push({ name: step.name, status: "pass" });
        continue;
      }

      fail(`Unknown step type: ${step.type}`);
    }

    console.log("\nMatrix result: PASS");
    for (const row of results) {
      console.log(`- ${row.name}: ${row.status}`);
    }
  } finally {
    await close();
  }
}

main().catch((error) => {
  console.error(`\nMatrix result: FAIL\n${error?.stack ?? error}`);
  process.exit(1);
});
