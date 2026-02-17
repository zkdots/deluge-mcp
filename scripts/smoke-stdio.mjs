import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
  const requestOptions = { timeout: 180000 };

  const transport = new StdioClientTransport({
    command: "node",
    args: ["dist/src/index.js"],
    cwd: process.cwd(),
    stderr: "pipe"
  });

  transport.stderr?.on("data", (chunk) => {
    const text = chunk.toString().trim();
    if (text) {
      console.error(`[server] ${text}`);
    }
  });

  const client = new Client({ name: "stdio-smoke-client", version: "0.1.0" });

  await client.connect(transport, requestOptions);
  const tools = await client.listTools(undefined, requestOptions);
  const names = tools.tools.map((t) => t.name);
  const health = await client.callTool({
    name: "deluge_health",
    arguments: { verbose: true }
  }, undefined, requestOptions);
  const validate = await client.callTool({
    name: "deluge_validate",
    arguments: { code: 'listVar = {"A", "B"};\nvalue = listVar.get(2);' }
  }, undefined, requestOptions);

  console.log("stdio smoke OK, tools:", names.join(", "));
  console.log("health content type:", health.content?.[0]?.type ?? "none");
  console.log("validate content type:", validate.content?.[0]?.type ?? "none");

  await transport.close();
}

main().catch((error) => {
  console.error("stdio smoke FAILED:", error?.stack ?? error);
  process.exit(1);
});
