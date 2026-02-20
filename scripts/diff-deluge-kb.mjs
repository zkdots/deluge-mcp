#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

export function buildDiffReport(oldPayload, newPayload) {
  const oldSnippets = Array.isArray(oldPayload?.snippets) ? oldPayload.snippets : [];
  const newSnippets = Array.isArray(newPayload?.snippets) ? newPayload.snippets : [];

  const oldMap = new Map(oldSnippets.map((snippet) => [keyOf(snippet), snippet]));
  const newMap = new Map(newSnippets.map((snippet) => [keyOf(snippet), snippet]));

  const oldKeys = new Set(oldMap.keys());
  const newKeys = new Set(newMap.keys());

  const addedKeys = [...newKeys].filter((key) => !oldKeys.has(key)).sort();
  const removedKeys = [...oldKeys].filter((key) => !newKeys.has(key)).sort();
  const sharedKeys = [...newKeys].filter((key) => oldKeys.has(key)).sort();

  const changedScopes = [];
  const changedTiers = [];
  const changedSources = [];

  for (const key of sharedKeys) {
    const oldItem = oldMap.get(key);
    const newItem = newMap.get(key);

    const oldScopes = sortList(oldItem?.requiresScopes ?? []);
    const newScopes = sortList(newItem?.requiresScopes ?? []);
    if (JSON.stringify(oldScopes) !== JSON.stringify(newScopes)) {
      changedScopes.push({ key, before: oldScopes, after: newScopes });
    }

    if ((oldItem?.tier ?? null) !== (newItem?.tier ?? null)) {
      changedTiers.push({ key, before: oldItem?.tier ?? null, after: newItem?.tier ?? null });
    }

    if ((oldItem?.sourceUrl ?? null) !== (newItem?.sourceUrl ?? null)) {
      changedSources.push({ key, before: oldItem?.sourceUrl ?? null, after: newItem?.sourceUrl ?? null });
    }
  }

  const tierAChanges = [
    ...addedKeys.filter((key) => (newMap.get(key)?.tier ?? "") === "A").map((key) => ({ type: "added", key })),
    ...removedKeys.filter((key) => (oldMap.get(key)?.tier ?? "") === "A").map((key) => ({ type: "removed", key })),
    ...changedTiers
      .filter((item) => item.before === "A" || item.after === "A")
      .map((item) => ({ type: "tier-changed", key: item.key, before: item.before, after: item.after })),
    ...changedScopes
      .filter((item) => (newMap.get(item.key)?.tier ?? oldMap.get(item.key)?.tier ?? "") === "A")
      .map((item) => ({ type: "scope-changed", key: item.key, before: item.before, after: item.after })),
  ];

  const requiresManualReview = tierAChanges.length > 0;

  return {
    generatedAt: new Date().toISOString(),
    schemaVersion: "deluge-kb-diff/v1",
    counts: {
      oldCanonicalSnippets: oldSnippets.length,
      newCanonicalSnippets: newSnippets.length,
      deltaCanonicalSnippets: newSnippets.length - oldSnippets.length,
      oldRawUnits: oldPayload?.summary?.rawUnits ?? 0,
      newRawUnits: newPayload?.summary?.rawUnits ?? 0,
      deltaRawUnits: (newPayload?.summary?.rawUnits ?? 0) - (oldPayload?.summary?.rawUnits ?? 0),
    },
    changes: {
      addedKeys,
      removedKeys,
      changedScopes,
      changedTiers,
      changedSources,
      tierAChanges,
    },
    requiresManualReview,
    reviewReason: requiresManualReview
      ? "Tier A canonical Deluge knowledge changed. Manual curation review is required before promotion."
      : "No Tier A curation changes detected.",
  };
}

export async function writeDiffReports(report, jsonPath, markdownPath) {
  await fs.mkdir(path.dirname(jsonPath), { recursive: true });
  await fs.writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  const markdown = toMarkdown(report);
  await fs.mkdir(path.dirname(markdownPath), { recursive: true });
  await fs.writeFile(markdownPath, `${markdown}\n`, "utf8");
}

function toMarkdown(report) {
  const lines = [];
  lines.push("# Deluge KB Diff Report");
  lines.push("");
  lines.push(`Generated: ${report.generatedAt}`);
  lines.push("");
  lines.push("## Counts");
  lines.push(`- Old canonical snippets: ${report.counts.oldCanonicalSnippets}`);
  lines.push(`- New canonical snippets: ${report.counts.newCanonicalSnippets}`);
  lines.push(`- Delta canonical snippets: ${report.counts.deltaCanonicalSnippets}`);
  lines.push(`- Old raw units: ${report.counts.oldRawUnits}`);
  lines.push(`- New raw units: ${report.counts.newRawUnits}`);
  lines.push(`- Delta raw units: ${report.counts.deltaRawUnits}`);
  lines.push("");
  lines.push("## Change Summary");
  lines.push(`- Added keys: ${report.changes.addedKeys.length}`);
  lines.push(`- Removed keys: ${report.changes.removedKeys.length}`);
  lines.push(`- Scope changes: ${report.changes.changedScopes.length}`);
  lines.push(`- Tier changes: ${report.changes.changedTiers.length}`);
  lines.push(`- Source changes: ${report.changes.changedSources.length}`);
  lines.push(`- Tier A changes: ${report.changes.tierAChanges.length}`);
  lines.push("");

  if (report.changes.tierAChanges.length > 0) {
    lines.push("## Tier A Review Required");
    for (const item of report.changes.tierAChanges) {
      if (item.type === "tier-changed") {
        lines.push(`- ${item.type}: ${item.key} (${item.before} -> ${item.after})`);
      } else if (item.type === "scope-changed") {
        lines.push(`- ${item.type}: ${item.key} (${JSON.stringify(item.before)} -> ${JSON.stringify(item.after)})`);
      } else {
        lines.push(`- ${item.type}: ${item.key}`);
      }
    }
    lines.push("");
  }

  if (report.changes.addedKeys.length > 0) {
    lines.push("## Added Keys");
    for (const key of report.changes.addedKeys) {
      lines.push(`- ${key}`);
    }
    lines.push("");
  }

  if (report.changes.removedKeys.length > 0) {
    lines.push("## Removed Keys");
    for (const key of report.changes.removedKeys) {
      lines.push(`- ${key}`);
    }
    lines.push("");
  }

  lines.push("## Review Decision");
  lines.push(`- Requires manual review: ${report.requiresManualReview}`);
  lines.push(`- Reason: ${report.reviewReason}`);

  return lines.join("\n");
}

function keyOf(snippet) {
  return `${snippet?.canonicalKey ?? "unknown"}@${snippet?.version ?? "unknown"}`;
}

function sortList(values) {
  return [...values].sort();
}

async function main() {
  const oldPath = process.argv[2] ?? "data/processed/snippets.old.json";
  const newPath = process.argv[3] ?? "data/processed/snippets.json";
  const outJson = process.argv[4] ?? "data/reports/deluge-kb-diff-report.json";
  const outMd = process.argv[5] ?? "data/reports/deluge-kb-diff-report.md";
  const failOnManualReview = process.argv.includes("--fail-on-manual-review");

  const oldPayload = await readJsonMaybe(oldPath);
  const newPayload = await readJsonMaybe(newPath);
  const report = buildDiffReport(oldPayload, newPayload);
  await writeDiffReports(report, outJson, outMd);

  process.stdout.write(`Diff report written: ${outJson}\n`);
  process.stdout.write(`Markdown report written: ${outMd}\n`);
  process.stdout.write(`Tier A manual review required: ${report.requiresManualReview}\n`);

  if (failOnManualReview && report.requiresManualReview) {
    process.stderr.write("Tier A changes detected. Manual curation review required before promotion.\n");
    process.exit(2);
  }
}

async function readJsonMaybe(filePath) {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch {
    return {};
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    const message = error instanceof Error ? (error.stack ?? error.message) : String(error);
    process.stderr.write(`${message}\n`);
    process.exit(1);
  });
}
