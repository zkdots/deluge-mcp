import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createServer } from "../dist/src/index.js";

async function main() {
  const server = await createServer();
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await server.connect(serverTransport);

  const client = new Client({ name: "smoke-client", version: "0.1.0" });
  await client.connect(clientTransport);

  const tools = await client.listTools();
  const names = tools.tools.map((t) => t.name);
  const required = ["deluge_health", "deluge_validate", "deluge_fix", "deluge_explain", "deluge_examples"];

  for (const tool of required) {
    if (!names.includes(tool)) {
      throw new Error(`Missing tool: ${tool}`);
    }
  }

  const healthResult = await client.callTool({
    name: "deluge_health",
    arguments: { verbose: true },
  });

  const validateResult = await client.callTool({
    name: "deluge_validate",
    arguments: { code: 'listVar = {"A", "B"};\nvalue = listVar.get(2);' },
  });

  const fixResult = await client.callTool({
    name: "deluge_fix",
    arguments: { code: "a = 1\ninfo a", style: "minimal-change" },
  });

  const examplesResult = await client.callTool({
    name: "deluge_examples",
    arguments: { topic: "get", query: "map get", max_results: 3, require_source_allowlist: true },
  });

  const rules = await client.readResource({ uri: "deluge://rules/v1" });
  const topics = await client.readResource({ uri: "deluge://topics/v1" });
  const delugeCanonical = await client.readResource({ uri: "deluge://canonical-index/v1" });
  const delugeCoverage = await client.readResource({ uri: "deluge://coverage/v1" });
  const zohoSnippets = await client.readResource({ uri: "zoho://crm-js-sdk/snippets/v1" });
  const zohoTopics = await client.readResource({ uri: "zoho://crm-js-sdk/topics/v1" });
  const zohoCanonical = await client.readResource({ uri: "zoho://crm-js-sdk/canonical-index/v1" });
  const zohoCoverage = await client.readResource({ uri: "zoho://crm-js-sdk/coverage/v1" });

  console.log("Smoke OK");
  console.log("Tools:", names.join(", "));
  console.log("Health content type:", healthResult.content?.[0]?.type ?? "none");
  console.log("Validate content type:", validateResult.content?.[0]?.type ?? "none");
  console.log("Fix content type:", fixResult.content?.[0]?.type ?? "none");
  console.log("Examples content type:", examplesResult.content?.[0]?.type ?? "none");
  console.log("Resource count:", Array.isArray(rules.contents) ? rules.contents.length : 0);
  console.log("Topics resource count:", Array.isArray(topics.contents) ? topics.contents.length : 0);
  console.log(
    "Deluge canonical resource count:",
    Array.isArray(delugeCanonical.contents) ? delugeCanonical.contents.length : 0
  );
  console.log(
    "Deluge coverage resource count:",
    Array.isArray(delugeCoverage.contents) ? delugeCoverage.contents.length : 0
  );
  console.log("Zoho snippets resource count:", Array.isArray(zohoSnippets.contents) ? zohoSnippets.contents.length : 0);
  console.log("Zoho topics resource count:", Array.isArray(zohoTopics.contents) ? zohoTopics.contents.length : 0);
  console.log(
    "Zoho canonical resource count:",
    Array.isArray(zohoCanonical.contents) ? zohoCanonical.contents.length : 0
  );
  console.log("Zoho coverage resource count:", Array.isArray(zohoCoverage.contents) ? zohoCoverage.contents.length : 0);

  await client.close();
  await server.close();
}

main().catch((error) => {
  console.error("Smoke FAILED:", error?.stack ?? error);
  process.exit(1);
});
