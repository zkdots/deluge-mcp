import assert from "node:assert/strict";
import test from "node:test";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createServer } from "../src/index.js";

test("health tool returns status and knowledge metadata", async () => {
  const server = await createServer();
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await server.connect(serverTransport);

  const client = new Client({ name: "health-test-client", version: "0.1.0" });
  await client.connect(clientTransport);

  const result = await client.callTool({
    name: "deluge_health",
    arguments: { verbose: true },
  });

  assert.ok(result.structuredContent);

  const payload = result.structuredContent as Record<string, unknown>;
  assert.ok(payload.status === "ok" || payload.status === "degraded");
  assert.equal(typeof payload.uptime_ms, "number");

  const knowledge = payload.knowledge as Record<string, unknown>;
  assert.equal(typeof knowledge.snippet_count, "number");
  assert.equal(typeof knowledge.loaded, "boolean");

  await client.close();
  await server.close();
});
