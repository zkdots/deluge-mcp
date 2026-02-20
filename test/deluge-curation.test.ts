import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import test from "node:test";

interface DelugePayload {
  schemaVersion: string;
  summary: {
    rawUnits: number;
    keptSnippets: number;
    mergedVariants: number;
  };
  coverage: {
    requiredCanonicalKeys: string[];
    presentCanonicalKeys: string[];
    missingCanonicalKeys: string[];
    completionRatio: number;
    tierCounts: Record<string, number>;
  };
  canonicalIndex: Array<{
    canonicalKey: string;
    version: string;
    primarySnippetId: string;
    snippetIds: string[];
    variantSnippetIds: string[];
    variantCount: number;
  }>;
  snippets: Array<{
    id: string;
    canonicalKey: string;
    apiFamily: string;
    operation: string;
    version: string;
    stability: string;
    requiresScopes: string[];
    requiresModule: string | null;
    sampleVsReference: string;
    confidence: number;
    tier: string;
    variantCount?: number;
    variants?: Array<{ id: string }>;
  }>;
}

async function loadDelugePayload(): Promise<DelugePayload> {
  const filePath = path.resolve(process.cwd(), "data/processed/snippets.json");
  return JSON.parse(await fs.readFile(filePath, "utf8")) as DelugePayload;
}

test("deluge curation schema v1 exists and has required coverage", async () => {
  const payload = await loadDelugePayload();

  assert.equal(payload.schemaVersion, "deluge-kb/v1");
  assert.ok(payload.summary.rawUnits >= 600);
  assert.ok(payload.summary.keptSnippets > 0);
  assert.ok(payload.summary.mergedVariants >= 0);

  assert.equal(payload.coverage.missingCanonicalKeys.length, 0);
  assert.equal(payload.coverage.completionRatio, 1);
  assert.ok(payload.coverage.requiredCanonicalKeys.length >= 10);
  assert.ok(payload.coverage.presentCanonicalKeys.length >= payload.coverage.requiredCanonicalKeys.length);

  assert.ok((payload.coverage.tierCounts.A ?? 0) > 0);
  assert.ok((payload.coverage.tierCounts.B ?? 0) > 0);
  assert.ok((payload.coverage.tierCounts.C ?? 0) > 0);
});

test("canonical snippets contain curation fields and merged variants", async () => {
  const payload = await loadDelugePayload();
  assert.ok(payload.snippets.length > 0);

  const byId = new Set(payload.snippets.map((snippet) => snippet.id));

  for (const snippet of payload.snippets) {
    assert.ok(snippet.canonicalKey.includes("."));
    assert.ok(snippet.apiFamily.length > 0);
    assert.ok(snippet.operation.length > 0);
    assert.ok(snippet.version.length > 0);
    assert.ok(["stable", "beta", "unknown"].includes(snippet.stability));
    assert.ok(Array.isArray(snippet.requiresScopes));
    assert.ok(["sample", "reference"].includes(snippet.sampleVsReference));
    assert.ok(["A", "B", "C"].includes(snippet.tier));
    assert.ok(snippet.confidence >= 0 && snippet.confidence <= 1);

    const variantCount = snippet.variantCount ?? 0;
    const variants = Array.isArray(snippet.variants) ? snippet.variants : [];
    assert.equal(variantCount, variants.length);

    for (const variant of variants) {
      assert.notEqual(variant.id, snippet.id);
    }
  }

  for (const item of payload.canonicalIndex) {
    assert.ok(item.canonicalKey.length > 0);
    assert.ok(item.version.length > 0);
    assert.ok(item.snippetIds.includes(item.primarySnippetId));
    assert.equal(item.variantSnippetIds.length, item.variantCount);
    assert.ok(item.snippetIds.some((id) => byId.has(id)));
  }
});
