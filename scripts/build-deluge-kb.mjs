#!/usr/bin/env node

import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const DEFAULT_INPUT = "data/processed/snippets.json";
const DEFAULT_OUTPUT = "data/processed/snippets.json";
const SCHEMA_VERSION = "deluge-kb/v1";

const SOURCE_ALLOWLIST_HOST = "www.zoho.com";
const SOURCE_ALLOWLIST_PATH_PREFIX = "/deluge/help/";

async function main() {
  const inputPath = process.argv[2] ?? DEFAULT_INPUT;
  const outputPath = process.argv[3] ?? DEFAULT_OUTPUT;
  const config = await loadDelugeKbConfig();
  const tierAKeys = new Set(config.tierAKeys);

  const rawPayload = JSON.parse(await fs.readFile(inputPath, "utf8"));
  const incoming = Array.isArray(rawPayload.snippets) ? rawPayload.snippets : [];

  const { snippets, canonicalIndex, summary, coverage } = buildKnowledgePack(incoming, config, tierAKeys);
  if (rawPayload.schemaVersion === SCHEMA_VERSION && rawPayload.summary) {
    summary.inputSections = Math.max(summary.inputSections, toFiniteNumber(rawPayload.summary.inputSections, 0));
    summary.rawUnits = Math.max(summary.rawUnits, toFiniteNumber(rawPayload.summary.rawUnits, 0));
    summary.keptSnippets = Math.max(summary.keptSnippets, toFiniteNumber(rawPayload.summary.keptSnippets, 0));
    summary.mergedVariants = Math.max(summary.mergedVariants, toFiniteNumber(rawPayload.summary.mergedVariants, 0));
    summary.rejected.sourceNotAllowed = Math.max(
      summary.rejected.sourceNotAllowed,
      toFiniteNumber(rawPayload.summary.rejected?.sourceNotAllowed, 0)
    );
    summary.rejected.noCode = Math.max(summary.rejected.noCode, toFiniteNumber(rawPayload.summary.rejected?.noCode, 0));
    summary.rejected.notDelugeLike = Math.max(
      summary.rejected.notDelugeLike,
      toFiniteNumber(rawPayload.summary.rejected?.notDelugeLike, 0)
    );
    summary.rejected.noisy = Math.max(summary.rejected.noisy, toFiniteNumber(rawPayload.summary.rejected?.noisy, 0));
    summary.rejected.duplicate = Math.max(
      summary.rejected.duplicate,
      toFiniteNumber(rawPayload.summary.rejected?.duplicate, 0)
    );
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    schemaVersion: SCHEMA_VERSION,
    policy: rawPayload.policy,
    summary,
    coverage,
    canonicalIndex,
    snippets,
  };

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  process.stdout.write(`Deluge KB complete: ${snippets.length} canonical snippets written to ${outputPath}\n`);
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
  if (coverage.missingCanonicalKeys.length > 0) {
    process.stdout.write(`Coverage warning: missing keys ${coverage.missingCanonicalKeys.join(", ")}\n`);
  }
}

function buildKnowledgePack(inputSnippets, config, tierAKeys) {
  const summary = {
    inputSections: inputSnippets.length,
    rawUnits: 0,
    keptSnippets: 0,
    mergedVariants: 0,
    rejected: {
      sourceNotAllowed: 0,
      noCode: 0,
      notDelugeLike: 0,
      noisy: 0,
      duplicate: 0,
    },
  };

  const seenFingerprint = new Set();
  const candidates = [];

  for (const rawSnippet of inputSnippets) {
    const snippet = normalizeIncomingSnippet(rawSnippet);

    if (!snippet.sourceAllowlisted || !isAllowedSource(snippet.sourceUrl)) {
      summary.rejected.sourceNotAllowed += 1;
      continue;
    }

    if (!snippet.code) {
      summary.rejected.noCode += 1;
      continue;
    }

    if (isNoisy(snippet.code)) {
      summary.rejected.noisy += 1;
      continue;
    }

    if (!looksDelugeLike(snippet.code, snippet.title)) {
      summary.rejected.notDelugeLike += 1;
      continue;
    }

    const codeFingerprint = snippet.codeFingerprint || hash(normalizeCode(snippet.code));
    if (seenFingerprint.has(codeFingerprint)) {
      summary.rejected.duplicate += 1;
      continue;
    }

    seenFingerprint.add(codeFingerprint);
    summary.rawUnits += 1;

    const canonicalKey = buildCanonicalKey(snippet);
    const [apiFamily, ...operationParts] = canonicalKey.split(".");
    const operation = operationParts.join(".") || normalizeIdentifier(snippet.functionName || "general");
    const version = inferVersion(snippet.sourceUrl);
    const stability = inferStability(version);
    const sampleVsReference = inferSampleType(snippet.title, snippet.sourceTitle, snippet.code);
    const requiresScopes = extractScopes(`${snippet.code}\n${snippet.explanation}\n${snippet.title}`);
    const requiresModule = inferModule(snippet.code);
    const confidence = inferConfidence(snippet, sampleVsReference);
    const tier = inferTier({
      canonicalKey,
      confidence,
      sampleVsReference,
      title: snippet.title,
      code: snippet.code,
      sourceAllowlisted: snippet.sourceAllowlisted,
      tierAKeys,
    });

    candidates.push({
      ...snippet,
      canonicalKey,
      apiFamily,
      operation,
      version,
      stability,
      requiresScopes,
      requiresModule,
      sampleVsReference,
      confidence,
      tier,
      qualityScore: confidence,
    });
  }

  const { snippets, canonicalIndex, variantsMerged } = canonicalize(candidates);
  summary.keptSnippets = snippets.length;
  summary.mergedVariants = variantsMerged;

  const presentCanonicalKeys = [...new Set(snippets.map((snippet) => snippet.canonicalKey))].sort();
  const missingCanonicalKeys = config.requiredCanonicalKeys.filter((key) => !presentCanonicalKeys.includes(key));
  const completionRatio =
    config.requiredCanonicalKeys.length === 0
      ? 1
      : Number(
          (
            (config.requiredCanonicalKeys.length - missingCanonicalKeys.length) /
            config.requiredCanonicalKeys.length
          ).toFixed(4)
        );

  const coverage = {
    requiredCanonicalKeys: config.requiredCanonicalKeys,
    presentCanonicalKeys,
    missingCanonicalKeys,
    completionRatio,
    tierCounts: countBy(snippets, (snippet) => snippet.tier),
  };

  return { snippets, canonicalIndex, summary, coverage };
}

function normalizeIncomingSnippet(input) {
  const normalizedCode = normalizeCode(input.code || "");
  const id = input.id || hash(`${input.sourceUrl || ""}|${input.title || ""}|${normalizedCode}`);
  const sourceUrl = String(input.sourceUrl || "");
  const sourceAllowlisted = input.sourceAllowlisted ?? isAllowedSource(sourceUrl);

  return {
    ...input,
    id,
    snippetId: input.snippetId || id,
    topic: String(input.topic || "general:general"),
    normalizedTopic: normalizeTopic(input.normalizedTopic || input.topic || "general:general"),
    functionName: String(input.functionName || "general"),
    functionAliases: normalizeStringArray(input.functionAliases),
    serviceScope: String(input.serviceScope || inferServiceScope(sourceUrl, input.title || "")),
    title: String(input.title || "Deluge example"),
    sourceUrl,
    sourceTitle: String(input.sourceTitle || input.title || "Deluge example"),
    code: normalizedCode,
    codeFingerprint: input.codeFingerprint || hash(normalizedCode),
    explanation: String(input.explanation || ""),
    qualityScore: Number.isFinite(input.qualityScore) ? Number(input.qualityScore) : 0.6,
    flags: normalizeStringArray(input.flags),
    qualityFlags: normalizeStringArray(input.qualityFlags),
    sourceAllowlisted,
    ingestedAt: String(input.ingestedAt || new Date().toISOString()),
  };
}

function canonicalize(candidates) {
  const grouped = new Map();

  for (const candidate of candidates) {
    const key = `${candidate.canonicalKey}|${candidate.version}`;
    const list = grouped.get(key) ?? [];
    list.push(candidate);
    grouped.set(key, list);
  }

  const snippets = [];
  const canonicalIndex = [];
  let variantsMerged = 0;

  for (const [groupKey, group] of grouped.entries()) {
    const sorted = [...group].sort(compareCandidatePriority);
    const primary = sorted[0];
    const variants = sorted.slice(1);

    const variantMap = new Map();
    for (const inherited of normalizeInheritedVariants(primary.variants)) {
      variantMap.set(inherited.id, inherited);
    }
    for (const variant of variants) {
      variantMap.set(variant.id, {
        id: variant.id,
        title: variant.title,
        sourceUrl: variant.sourceUrl,
        sampleVsReference: variant.sampleVsReference,
        confidence: variant.confidence,
        tier: variant.tier,
      });
    }
    const mergedVariants = [...variantMap.values()].sort((a, b) => a.id.localeCompare(b.id));
    variantsMerged += mergedVariants.length;
    const snippetIds = [
      ...new Set([primary.id, ...sorted.map((item) => item.id), ...mergedVariants.map((item) => item.id)]),
    ];
    const variantSnippetIds = mergedVariants.map((item) => item.id);

    snippets.push({
      ...primary,
      variantCount: mergedVariants.length,
      variants: mergedVariants,
    });

    canonicalIndex.push({
      groupKey,
      canonicalKey: primary.canonicalKey,
      apiFamily: primary.apiFamily,
      operation: primary.operation,
      version: primary.version,
      primarySnippetId: primary.id,
      snippetIds,
      variantSnippetIds,
      variantCount: mergedVariants.length,
      tierCounts: countBy(sorted, (item) => item.tier),
      serviceScopes: [...new Set(sorted.map((item) => item.serviceScope || "core"))].sort(),
      requiresScopes: [...new Set(sorted.flatMap((item) => item.requiresScopes || []))].sort(),
      sampleTypes: [...new Set(sorted.map((item) => item.sampleVsReference))].sort(),
    });
  }

  snippets.sort(compareSnippetPriority);
  canonicalIndex.sort((a, b) => a.canonicalKey.localeCompare(b.canonicalKey) || a.version.localeCompare(b.version));

  return { snippets, canonicalIndex, variantsMerged };
}

function normalizeInheritedVariants(input) {
  if (!Array.isArray(input)) {
    return [];
  }
  const output = [];
  for (const item of input) {
    const id = String(item?.id ?? "").trim();
    const title = String(item?.title ?? "").trim();
    const sourceUrl = String(item?.sourceUrl ?? "").trim();
    if (!id || !title || !sourceUrl) {
      continue;
    }

    output.push({
      id,
      title,
      sourceUrl,
      sampleVsReference: item.sampleVsReference === "reference" ? "reference" : "sample",
      confidence: clamp(Number(item.confidence ?? 0.6), 0, 1),
      tier: item.tier === "A" || item.tier === "B" || item.tier === "C" ? item.tier : "C",
    });
  }
  return output;
}

function compareCandidatePriority(a, b) {
  const tierScore = (tier) => (tier === "A" ? 3 : tier === "B" ? 2 : 1);
  const sampleScore = (sample) => (sample === "reference" ? 2 : 1);

  return (
    tierScore(b.tier) - tierScore(a.tier) ||
    sampleScore(b.sampleVsReference) - sampleScore(a.sampleVsReference) ||
    b.confidence - a.confidence ||
    Number(Boolean(b.sourceAllowlisted)) - Number(Boolean(a.sourceAllowlisted)) ||
    a.id.localeCompare(b.id)
  );
}

function compareSnippetPriority(a, b) {
  return b.confidence - a.confidence || a.canonicalKey.localeCompare(b.canonicalKey) || a.id.localeCompare(b.id);
}

function buildCanonicalKey(snippet) {
  const explicit = normalizeCanonicalKey(String(snippet.canonicalKey || ""));
  if (explicit) {
    return explicit;
  }

  const normalizedTopic = normalizeTopic(snippet.normalizedTopic || snippet.topic || "");
  if (normalizedTopic.includes(":")) {
    const [familyRaw, operationRaw = snippet.functionName || "general"] = normalizedTopic.split(":");
    const family = normalizeIdentifier(familyRaw || "general");
    const operation = normalizeIdentifier(operationRaw || "general");
    return `${family}.${operation}`;
  }

  const family = normalizeIdentifier(snippet.serviceScope || "core");
  const operation = normalizeIdentifier(snippet.functionName || normalizedTopic || "general");
  return `${family}.${operation}`;
}

function normalizeCanonicalKey(value) {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/\.+/g, ".")
    .replace(/^-+|-+$/g, "")
    .replace(/^\.+|\.+$/g, "");

  if (!normalized) {
    return "";
  }

  if (!normalized.includes(".")) {
    return `general.${normalizeIdentifier(normalized)}`;
  }

  const [familyRaw, ...operationParts] = normalized.split(".");
  const family = normalizeIdentifier(familyRaw || "general");
  const operation = normalizeIdentifier(operationParts.join("-") || "general");
  return `${family}.${operation}`;
}

function normalizeIdentifier(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function normalizeTopic(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9:_-]+/g, "-")
    .replace(/-+/g, "-");
}

function normalizeCode(code) {
  return String(code || "")
    .replace(/\r\n/g, "\n")
    .trim();
}

function normalizeStringArray(input) {
  if (!Array.isArray(input)) {
    return [];
  }
  return [...new Set(input.map((item) => String(item).trim()).filter(Boolean))];
}

function inferSampleType(title, sourceTitle, code) {
  const text = `${title} ${sourceTitle} ${code}`.toLowerCase();
  if (/\b(example|sample)\b/.test(text)) {
    return "sample";
  }
  return "reference";
}

function inferVersion(sourceUrl) {
  try {
    const url = new URL(sourceUrl);
    const explicit = url.pathname.match(/\/v(\d+)(?:\/|$)/i);
    if (explicit?.[1]) {
      return `v${explicit[1]}`;
    }
  } catch {
    // no-op
  }
  return "main";
}

function inferStability(version) {
  if (/alpha|beta|rc/i.test(version)) {
    return "beta";
  }
  return "stable";
}

function inferConfidence(snippet, sampleVsReference) {
  let score = Number.isFinite(snippet.qualityScore) ? Number(snippet.qualityScore) : 0.6;

  if (snippet.sourceAllowlisted) {
    score += 0.05;
  }
  if (sampleVsReference === "reference") {
    score += 0.03;
  }
  if (/\b(info|if|for each|zoho\.|map\(|list\()/i.test(snippet.code)) {
    score += 0.02;
  }
  if (/\b(error|throws|invalid operation)\b/i.test(`${snippet.title} ${snippet.code}`)) {
    score -= 0.08;
  }

  return clamp(Number(score.toFixed(4)), 0, 1);
}

function inferTier({ canonicalKey, confidence, title, code, sourceAllowlisted, tierAKeys }) {
  const risky = /\b(error|throws|invalid operation|out of bounds)\b/i.test(`${title}\n${code}`);
  if (risky) {
    return "C";
  }
  if (sourceAllowlisted && !risky && confidence >= 0.88 && tierAKeys.has(canonicalKey)) {
    return "A";
  }
  if (sourceAllowlisted && confidence >= 0.75) {
    return "B";
  }
  return "C";
}

function extractScopes(text) {
  const matches = text.match(/Zoho(?:CRM|Books|Desk|Creator|Projects|Mail)?\.[A-Za-z0-9_.]+/g) ?? [];
  return [...new Set(matches.map((item) => item.trim()))].sort();
}

function inferModule(code) {
  const crmMatch = code.match(/zoho\.crm\.[a-zA-Z_]+\(\s*["']([^"']+)["']/i);
  if (crmMatch?.[1]) {
    return crmMatch[1];
  }

  const genericMatch = code.match(/(?:getRecordById|getRecord|createRecord|searchRecords)\(\s*["']([^"']+)["']/i);
  if (genericMatch?.[1]) {
    return genericMatch[1];
  }

  return null;
}

function looksDelugeLike(code, title) {
  const text = `${title}\n${code}`.toLowerCase();
  if (/\b(info|if|for each|try|catch|map\(|list\(|zoho\.|invokeurl|sendmail)\b/.test(text)) {
    return true;
  }
  if (/=/.test(code) && /;/.test(code)) {
    return true;
  }
  return code.length >= 10;
}

function isNoisy(code) {
  if (!code) {
    return true;
  }
  if (code.length > 24000) {
    return true;
  }

  const lines = code.split(/\r?\n/);
  const maxLineLength = Math.max(...lines.map((line) => line.length), 0);
  if (maxLineLength > 1200) {
    return true;
  }

  const symbolHeavyRatio = ratio(code, /[^a-zA-Z0-9\s\n\t[\]{}().,;:_"'\-/]/g);
  return symbolHeavyRatio > 0.32;
}

function ratio(input, regex) {
  const matches = input.match(regex);
  return matches ? matches.length / Math.max(input.length, 1) : 0;
}

function inferServiceScope(sourceUrl, title) {
  const known = new Set([
    "creator",
    "crm",
    "books",
    "billing",
    "invoice",
    "inventory",
    "bookings",
    "projects",
    "recruit",
    "desk",
    "mail",
    "connect",
    "writer",
    "sign",
    "fsm",
    "sdp",
    "cliq",
    "people",
    "calendar",
    "directory",
    "workdrive",
    "sheet",
    "salesforce",
  ]);

  try {
    const url = new URL(sourceUrl);
    const parts = url.pathname.split("/").filter(Boolean);
    const helpIndex = parts.indexOf("help");
    const next = helpIndex !== -1 ? parts[helpIndex + 1] : "";
    if (next === "functions" || next === "datatypes") {
      return "core";
    }
    if (next && known.has(next)) {
      return next;
    }
  } catch {
    // no-op
  }

  const match = String(title)
    .toLowerCase()
    .match(/zoho\s+([a-z]+)/);
  if (match?.[1] && known.has(match[1])) {
    return match[1];
  }

  return "core";
}

function isAllowedSource(source) {
  try {
    const url = new URL(source);
    return url.hostname === SOURCE_ALLOWLIST_HOST && url.pathname.startsWith(SOURCE_ALLOWLIST_PATH_PREFIX);
  } catch {
    return false;
  }
}

function countBy(items, getKey) {
  const output = {};
  for (const item of items) {
    const key = getKey(item);
    output[key] = (output[key] ?? 0) + 1;
  }
  return output;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function toFiniteNumber(value, fallback) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }
  return Math.max(0, Math.floor(value));
}

function hash(input) {
  return createHash("sha256").update(input).digest("hex").slice(0, 16);
}

async function loadDelugeKbConfig() {
  const configUrl = new URL("../config/deluge-kb.json", import.meta.url);
  const payload = JSON.parse(await fs.readFile(configUrl, "utf8"));
  return {
    requiredCanonicalKeys: normalizeStringArray(payload.requiredCanonicalKeys),
    tierAKeys: normalizeStringArray(payload.tierAKeys),
  };
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`Deluge KB build failed: ${message}\n`);
  process.exit(1);
});
