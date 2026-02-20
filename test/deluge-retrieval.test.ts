import assert from "node:assert/strict";
import test from "node:test";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createServer } from "../src/index.js";

async function withClient() {
  const server = await createServer();
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await server.connect(serverTransport);

  const client = new Client({ name: "deluge-retrieval-test", version: "0.1.0" });
  await client.connect(clientTransport);

  return {
    client,
    close: async () => {
      await client.close();
      await server.close();
    },
  };
}

function firstResourceText(resource: { contents?: Array<{ text?: string; blob?: string }> }): string {
  const first = resource.contents?.[0];
  if (first && typeof first.text === "string") {
    return first.text;
  }
  return "";
}

test("deluge examples support tier and canonical filters", async () => {
  const { client, close } = await withClient();

  try {
    const tierResult = await client.callTool({
      name: "deluge_examples",
      arguments: {
        canonical_key: "datetime.addhour",
        tier: "A",
        include_variants: true,
        max_results: 3,
        require_source_allowlist: true,
      },
    });

    const tierPayload = tierResult.structuredContent as {
      examples?: Array<{ tier: string; canonical_key: string; variant_count: number }>;
    };
    assert.ok(Array.isArray(tierPayload.examples));
    assert.ok((tierPayload.examples?.length ?? 0) > 0);
    assert.ok((tierPayload.examples ?? []).every((item) => item.tier === "A"));
    assert.ok((tierPayload.examples ?? []).every((item) => item.canonical_key.includes("datetime.addhour")));

    const keyResult = await client.callTool({
      name: "deluge_examples",
      arguments: {
        canonical_key: "map.get",
        max_results: 3,
        require_source_allowlist: true,
      },
    });

    const keyPayload = keyResult.structuredContent as { examples?: Array<{ canonical_key: string }> };
    assert.ok((keyPayload.examples?.length ?? 0) > 0);
    assert.ok((keyPayload.examples ?? []).every((item) => item.canonical_key.includes("map.get")));
  } finally {
    await close();
  }
});

test("deluge coverage resources expose canonical coverage and index", async () => {
  const { client, close } = await withClient();

  try {
    const coverage = await client.readResource({ uri: "deluge://coverage/v1" });
    const index = await client.readResource({ uri: "deluge://canonical-index/v1" });

    const coverageBody = JSON.parse(firstResourceText(coverage) || "{}") as {
      coverage?: { missingCanonicalKeys?: string[]; completionRatio?: number };
    };
    const indexBody = JSON.parse(firstResourceText(index) || "{}") as {
      canonical_index?: Array<{ canonicalKey: string }>;
    };

    assert.equal(coverageBody.coverage?.missingCanonicalKeys?.length ?? -1, 0);
    assert.equal(coverageBody.coverage?.completionRatio, 1);
    assert.ok((indexBody.canonical_index?.length ?? 0) > 0);
  } finally {
    await close();
  }
});
