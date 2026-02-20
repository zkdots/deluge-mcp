#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { buildDiffReport, writeDiffReports } from "./diff-zoho-crm-js-sdk-kb.mjs";

const DEFAULT_INPUT = "data/raw/zoho-crm-js-sdk-context7.md";
const DEFAULT_OUTPUT = "data/processed/zoho-crm-js-sdk-snippets.json";
const DEFAULT_REPORT_JSON = "data/reports/zoho-crm-js-sdk-diff-report.json";
const DEFAULT_REPORT_MD = "data/reports/zoho-crm-js-sdk-diff-report.md";

async function main() {
  const inputPath = process.argv[2] ?? DEFAULT_INPUT;
  const outputPath = process.argv[3] ?? DEFAULT_OUTPUT;
  const reportJsonPath = process.argv[4] ?? DEFAULT_REPORT_JSON;
  const reportMdPath = process.argv[5] ?? DEFAULT_REPORT_MD;
  const allowTierAChanges = process.argv.includes("--allow-tier-a-changes");

  const previousPayload = await readJsonMaybe(outputPath);

  const snapshotPath = path.join(os.tmpdir(), `zoho-crm-js-sdk-kb-prev-${Date.now()}.json`);
  await fs.writeFile(snapshotPath, `${JSON.stringify(previousPayload, null, 2)}\n`, "utf8");

  execFileSync("node", ["scripts/build-zoho-crm-js-sdk-kb.mjs", inputPath, outputPath], {
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
