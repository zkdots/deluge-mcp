#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import { buildDiffReport, writeDiffReports } from "./diff-deluge-kb.mjs";

const DEFAULT_INPUT = "data/processed/snippets.json";
const DEFAULT_OUTPUT = "data/processed/snippets.json";
const DEFAULT_REPORT_JSON = "data/reports/deluge-kb-diff-report.json";
const DEFAULT_REPORT_MD = "data/reports/deluge-kb-diff-report.md";

async function main() {
  const inputPath = process.argv[2] ?? DEFAULT_INPUT;
  const outputPath = process.argv[3] ?? DEFAULT_OUTPUT;
  const reportJsonPath = process.argv[4] ?? DEFAULT_REPORT_JSON;
  const reportMdPath = process.argv[5] ?? DEFAULT_REPORT_MD;
  const allowTierAChanges = process.argv.includes("--allow-tier-a-changes");

  const previousPayload = await readJsonMaybe(outputPath);

  execFileSync("node", ["scripts/build-deluge-kb.mjs", inputPath, outputPath], {
    stdio: "inherit",
  });

  const nextPayload = await readJsonMaybe(outputPath);
  const report = buildDiffReport(previousPayload, nextPayload);
  await writeDiffReports(report, reportJsonPath, reportMdPath);

  process.stdout.write(`Refresh diff report: ${reportJsonPath}\n`);
  process.stdout.write(`Refresh diff markdown: ${reportMdPath}\n`);

  if (report.requiresManualReview && !allowTierAChanges) {
    process.stderr.write("Tier A changes detected. Manual curation review is required before promotion.\n");
    process.stderr.write("Re-run with --allow-tier-a-changes only after review.\n");
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

main().catch((error) => {
  const message = error instanceof Error ? (error.stack ?? error.message) : String(error);
  process.stderr.write(`${message}\n`);
  process.exit(1);
});
