import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { KnowledgeStore } from "../src/knowledge/store.js";
import type { ProcessedSnippet } from "../src/types.js";

function makeSnippet(partial: Partial<ProcessedSnippet>): ProcessedSnippet {
  return {
    id: partial.id ?? "id-1",
    topic: partial.topic ?? "map:get",
    functionName: partial.functionName ?? "get",
    title: partial.title ?? "Deluge get() example",
    sourceUrl: partial.sourceUrl ?? "https://www.zoho.com/deluge/help/functions/map/get",
    sourceTitle: partial.sourceTitle ?? partial.title ?? "Deluge get() example",
    code: partial.code ?? 'mapVar = {"Product":"Creator"};\ninfo mapVar.get("Product");',
    explanation: partial.explanation ?? "Returns a value for the provided key.",
    qualityScore: partial.qualityScore ?? 0.95,
    flags: partial.flags ?? [],
    ingestedAt: partial.ingestedAt ?? new Date().toISOString(),
    snippetId: partial.snippetId,
    normalizedTopic: partial.normalizedTopic,
    functionAliases: partial.functionAliases,
    serviceScope: partial.serviceScope,
    codeFingerprint: partial.codeFingerprint,
    qualityFlags: partial.qualityFlags,
    sourceAllowlisted: partial.sourceAllowlisted,
  };
}

async function withFixtureStore(
  snippets: ProcessedSnippet[]
): Promise<{ store: KnowledgeStore; cleanup: () => Promise<void> }> {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "deluge-store-test-"));
  const fixturePath = path.join(tmpDir, "snippets.json");
  await fs.writeFile(fixturePath, JSON.stringify({ snippets }, null, 2), "utf8");

  const store = new KnowledgeStore();
  await store.load(fixturePath);
  return {
    store,
    cleanup: async () => {
      await fs.rm(tmpDir, { recursive: true, force: true });
    },
  };
}

test("knowledge store hydrates legacy snippets and builds topic stats", async () => {
  const duplicatedCode = 'mapVar = {"Product":"Creator"};\ninfo mapVar.get("Product");';
  const snippets = [
    makeSnippet({
      id: "legacy-1",
      title: "get map example",
      code: duplicatedCode,
      qualityScore: 0.95,
    }),
    makeSnippet({
      id: "legacy-2",
      title: "duplicate with lower confidence",
      code: duplicatedCode,
      qualityScore: 0.71,
    }),
    makeSnippet({
      id: "crm-1",
      topic: "crm:upsert",
      functionName: "upsert",
      title: "CRM upsert example",
      sourceUrl: "https://www.zoho.com/deluge/help/crm/upsert-record",
      code: 'record_values = Map();\nresponse = zoho.crm.upsert("Leads",record_values);',
      qualityScore: 0.93,
    }),
  ];

  const { store, cleanup } = await withFixtureStore(snippets);
  try {
    const stats = store.getStats();
    assert.equal(stats.raw_count, 3);
    assert.equal(stats.deduped_count, 2);
    assert.equal(stats.high_confidence_count, 2);
    assert.equal(stats.index_version, "v1");
    assert.ok(stats.topic_count >= 2);

    const deduped = store.allDeduped();
    assert.equal(deduped.length, 2);
    assert.ok(deduped[0].snippetId);
    assert.ok(deduped[0].codeFingerprint);
    assert.ok(deduped[0].functionAliases && deduped[0].functionAliases.length > 0);
  } finally {
    await cleanup();
  }
});

test("searchExamples ranks by topic/query and respects allowlist + scope filters", async () => {
  const snippets = [
    makeSnippet({
      id: "map-get",
      topic: "map:get",
      functionName: "get",
      title: "Deluge get() Function Example",
      sourceUrl: "https://www.zoho.com/deluge/help/functions/map/get",
      code: 'mapVar = {"Product":"Creator"};\ninfo mapVar.get("Product");',
      qualityScore: 0.98,
    }),
    makeSnippet({
      id: "crm-upsert",
      topic: "crm:upsert",
      functionName: "upsert",
      title: "Deluge upsert record",
      sourceUrl: "https://www.zoho.com/deluge/help/crm/upsert-record",
      code: 'record_values = Map();\nresponse = zoho.crm.upsert("Leads",record_values);',
      qualityScore: 0.9,
    }),
    makeSnippet({
      id: "offsite",
      topic: "map:get",
      functionName: "get",
      title: "Offsite get example",
      sourceUrl: "https://example.com/get",
      code: 'm = {"a":"b"};\ninfo m.get("a");',
      qualityScore: 0.95,
    }),
  ];

  const { store, cleanup } = await withFixtureStore(snippets);
  try {
    const getMatches = store.searchExamples({
      topic: "get",
      query: "map get product",
      maxResults: 5,
      requireSourceAllowlist: true,
    });
    assert.ok(getMatches.length >= 1);
    assert.equal(getMatches[0].snippet.id, "map-get");
    assert.ok(getMatches[0].score > 0);
    assert.ok(getMatches[0].matchReasons.length > 0);
    assert.equal(
      getMatches.some((match) => match.snippet.id === "offsite"),
      false
    );

    const crmMatches = store.searchExamples({
      query: "upsert leads",
      serviceScope: "crm",
      requireSourceAllowlist: true,
    });
    assert.ok(crmMatches.length >= 1);
    assert.equal(crmMatches[0].snippet.id, "crm-upsert");

    const canonicalMatches = store.searchExamples({
      canonicalKey: "map.get",
      tier: "A",
      maxResults: 3,
      requireSourceAllowlist: true,
    });
    assert.ok(canonicalMatches.length >= 1);
    assert.equal(canonicalMatches[0].snippet.id, "map-get");
  } finally {
    await cleanup();
  }
});
