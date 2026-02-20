#!/usr/bin/env node

import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const DEFAULT_INPUT = "data/raw/zoho-crm-js-sdk-context7.md";
const DEFAULT_OUTPUT = "data/processed/zoho-crm-js-sdk-snippets.json";
const SCHEMA_VERSION = "zoho-crm-js-sdk-kb/v1";
const LIBRARY_ID = "/zoho/zohocrm-javascript-sdk-8.0";

const REQUIRED_CANONICAL_KEYS = [
  "auth.client-registration",
  "auth.oauth",
  "auth.redirect-handling",
  "auth.scopes",
  "files.download",
  "pipeline.transfer",
  "platform.zet",
  "records.count",
  "records.create",
  "records.delete",
  "records.mass-update",
  "records.read",
  "records.update",
  "runtime.response-handling",
  "sdk.configuration",
  "sdk.distribution",
  "sdk.environment",
  "sdk.initialization",
  "tags.responses",
];

const ALLOWED_SOURCES = [
  {
    host: "github.com",
    pathIncludes: "/zoho/zohocrm-javascript-sdk-8.0/",
  },
];

const CODE_LANG_ALLOWLIST = new Set(["js", "javascript", "typescript", "ts", "apidoc", "html", "bash", "sh", "json"]);
const TIER_A_KEYS = new Set([
  "auth.oauth",
  "auth.scopes",
  "records.create",
  "records.read",
  "records.update",
  "records.delete",
  "records.count",
  "records.mass-update",
  "files.download",
  "pipeline.transfer",
  "runtime.response-handling",
  "sdk.initialization",
  "sdk.configuration",
  "sdk.environment",
]);

async function main() {
  const inputPath = process.argv[2] ?? DEFAULT_INPUT;
  const outputPath = process.argv[3] ?? DEFAULT_OUTPUT;

  const markdown = await fs.readFile(inputPath, "utf8");
  const sections = parseContext7Markdown(markdown);
  const { snippets, canonicalIndex, summary, coverage } = buildKnowledgePack(sections);

  const payload = {
    generatedAt: new Date().toISOString(),
    schemaVersion: SCHEMA_VERSION,
    libraryId: LIBRARY_ID,
    sourceAllowlist: ALLOWED_SOURCES,
    summary,
    coverage,
    canonicalIndex,
    snippets,
  };

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  process.stdout.write(`Zoho CRM JS SDK KB complete: ${snippets.length} canonical snippets written to ${outputPath}\n`);
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
  if (coverage.missingCanonicalKeys.length > 0) {
    process.stdout.write(`Coverage warning: missing keys ${coverage.missingCanonicalKeys.join(", ")}\n`);
  }
}

function parseContext7Markdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const sections = [];

  let currentTitle = "";
  let bodyLines = [];

  const flushSection = () => {
    if (!currentTitle) {
      return;
    }

    const rawBody = bodyLines.join("\n").trim();
    const sourceMatch = rawBody.match(/Source:\s*(https?:\/\/\S+)/i);

    sections.push({
      title: currentTitle,
      sourceUrl: sourceMatch?.[1],
      rawBody,
      codeBlocks: extractCodeBlocks(rawBody),
    });
  };

  for (const line of lines) {
    if (line.startsWith("### ")) {
      flushSection();
      currentTitle = line.replace(/^###\s+/, "").trim();
      bodyLines = [];
      continue;
    }

    if (!currentTitle) {
      continue;
    }

    bodyLines.push(line);
  }

  flushSection();
  return sections;
}

function extractCodeBlocks(rawBody) {
  const blocks = [];
  const regex = /```([^\n]*)\n([\s\S]*?)```/g;

  while (true) {
    const match = regex.exec(rawBody);
    if (match === null) {
      break;
    }

    blocks.push({
      language: (match[1] || "").trim().toLowerCase(),
      code: (match[2] || "").trim(),
    });
  }

  return blocks;
}

function splitBlockIntoUnits(sectionTitle, language, code) {
  if (language !== "apidoc") {
    return [{ title: sectionTitle, code }];
  }

  const normalized = normalizeCode(code);
  if (!normalized) {
    return [{ title: sectionTitle, code }];
  }

  const lines = normalized.split(/\r?\n/);
  const headingPattern = /^\s*(?:[-*]\s+)?([A-Za-z][A-Za-z0-9<>()/_\-\s]{2,}):\s*$/;
  const numberedPattern = /^\s*\d+\.\s+(.+)$/;
  const bulletPattern = /^\s*-\s+(.+)$/;

  const units = [];
  let currentLines = [];
  let currentLabel = "overview";

  const pushChunk = () => {
    const chunk = currentLines.join("\n").trim();
    if (!chunk) {
      return;
    }

    units.push({
      title: `${sectionTitle} - ${currentLabel}`,
      code: chunk,
    });
  };

  for (const line of lines) {
    const headingMatch = line.match(headingPattern);
    const numberedMatch = line.match(numberedPattern);
    const bulletMatch = line.match(bulletPattern);
    const nextLabel = headingMatch?.[1] ?? numberedMatch?.[1] ?? bulletMatch?.[1];

    if (nextLabel && currentLines.length > 0) {
      pushChunk();
      currentLines = [];
    }

    if (nextLabel) {
      currentLabel = toSlug(nextLabel);
    }

    currentLines.push(line);
  }

  pushChunk();

  if (units.length <= 1) {
    return [{ title: sectionTitle, code }];
  }

  return units;
}

function buildKnowledgePack(sections) {
  const summary = {
    inputSections: sections.length,
    rawUnits: 0,
    keptSnippets: 0,
    mergedVariants: 0,
    rejected: {
      sourceNotAllowed: 0,
      noCode: 0,
      nonCodeLanguage: 0,
      noisy: 0,
      duplicate: 0,
    },
  };

  const candidates = [];
  const seenFingerprint = new Set();

  for (const section of sections) {
    if (!section.sourceUrl || !isAllowedSource(section.sourceUrl)) {
      summary.rejected.sourceNotAllowed += 1;
      continue;
    }

    if (section.codeBlocks.length === 0) {
      summary.rejected.noCode += 1;
      continue;
    }

    for (const block of section.codeBlocks) {
      if (!CODE_LANG_ALLOWLIST.has(block.language)) {
        summary.rejected.nonCodeLanguage += 1;
        continue;
      }

      const units = splitBlockIntoUnits(section.title, block.language, block.code);
      for (const unit of units) {
        const normalizedCode = normalizeCode(unit.code);
        if (isNoisy(normalizedCode)) {
          summary.rejected.noisy += 1;
          continue;
        }

        const codeFingerprint = hash(normalizedCode);
        if (seenFingerprint.has(codeFingerprint)) {
          summary.rejected.duplicate += 1;
          continue;
        }

        seenFingerprint.add(codeFingerprint);
        summary.rawUnits += 1;

        const sourceText = `${section.rawBody}\n${normalizedCode}`;
        const version = inferVersion(section.sourceUrl);
        const { apiFamily, operation } = inferApiFamilyAndOperation(unit.title, normalizedCode);
        const canonicalKey = `${apiFamily}.${operation}`;
        const sampleType = inferSampleType(section.sourceUrl, unit.title, normalizedCode);
        const requiresScopes = extractScopes(sourceText);
        const requiresModule = inferModule(normalizedCode);
        const stability = inferStability(version);
        const confidence = scoreConfidence(unit.title, block.language, normalizedCode, sampleType);
        const tier = inferTier({
          canonicalKey,
          language: block.language,
          sampleType,
          confidence,
          title: unit.title,
          code: normalizedCode,
        });

        candidates.push({
          id: hash(`${section.sourceUrl}|${unit.title}|${normalizedCode}`),
          snippetId: hash(`${section.sourceUrl}|${unit.title}|${normalizedCode}`),
          topic: `${apiFamily}:${operation}`,
          title: unit.title,
          sourceUrl: section.sourceUrl,
          sourceTitle: section.title,
          language: block.language,
          code: normalizedCode,
          codeFingerprint,
          summary: toShortExplanation(section.rawBody),
          tags: buildTags({
            apiFamily,
            operation,
            language: block.language,
            sampleType,
            title: unit.title,
            code: normalizedCode,
          }),
          qualityScore: confidence,
          sourceAllowlisted: true,
          ingestedAt: new Date().toISOString(),
          apiFamily,
          operation,
          canonicalKey,
          version,
          stability,
          requiresScopes,
          requiresModule,
          sampleVsReference: sampleType,
          confidence,
          tier,
        });
      }
    }
  }

  const { snippets, canonicalIndex, variantsMerged } = canonicalize(candidates);
  summary.keptSnippets = snippets.length;
  summary.mergedVariants = variantsMerged;

  const present = new Set(snippets.map((snippet) => snippet.canonicalKey));
  const missingCanonicalKeys = REQUIRED_CANONICAL_KEYS.filter((key) => !present.has(key));
  const completionRatio =
    REQUIRED_CANONICAL_KEYS.length === 0
      ? 1
      : (REQUIRED_CANONICAL_KEYS.length - missingCanonicalKeys.length) / REQUIRED_CANONICAL_KEYS.length;

  const tierCounts = countBy(snippets, (snippet) => snippet.tier);
  const coverage = {
    requiredCanonicalKeys: REQUIRED_CANONICAL_KEYS,
    presentCanonicalKeys: [...present].sort(),
    missingCanonicalKeys,
    completionRatio,
    tierCounts,
  };

  return { snippets, canonicalIndex, summary, coverage };
}

function canonicalize(candidates) {
  const grouped = new Map();

  for (const candidate of candidates) {
    const groupKey = `${candidate.canonicalKey}|${candidate.version}`;
    const list = grouped.get(groupKey) ?? [];
    list.push(candidate);
    grouped.set(groupKey, list);
  }

  const snippets = [];
  const canonicalIndex = [];
  let variantsMerged = 0;

  for (const [groupKey, group] of grouped.entries()) {
    const sorted = [...group].sort(compareCandidatePriority);
    const primary = sorted[0];
    const variants = sorted.slice(1);
    variantsMerged += variants.length;

    const primaryWithVariants = {
      ...primary,
      variantCount: variants.length,
      variants: variants.map((variant) => ({
        id: variant.id,
        title: variant.title,
        sourceUrl: variant.sourceUrl,
        language: variant.language,
        sampleVsReference: variant.sampleVsReference,
        confidence: variant.confidence,
        tier: variant.tier,
      })),
    };

    snippets.push(primaryWithVariants);

    const tierCounts = countBy(group, (item) => item.tier);
    canonicalIndex.push({
      groupKey,
      canonicalKey: primary.canonicalKey,
      apiFamily: primary.apiFamily,
      operation: primary.operation,
      version: primary.version,
      primarySnippetId: primary.id,
      snippetIds: sorted.map((item) => item.id),
      variantSnippetIds: variants.map((item) => item.id),
      variantCount: variants.length,
      tierCounts,
      requiresScopes: sorted
        .flatMap((item) => item.requiresScopes)
        .filter(onlyUnique)
        .sort(),
      sampleTypes: sorted
        .map((item) => item.sampleVsReference)
        .filter(onlyUnique)
        .sort(),
    });
  }

  snippets.sort(compareSnippetPriority);
  canonicalIndex.sort((a, b) => a.canonicalKey.localeCompare(b.canonicalKey) || a.version.localeCompare(b.version));

  return { snippets, canonicalIndex, variantsMerged };
}

function compareCandidatePriority(a, b) {
  const tierScore = (tier) => (tier === "A" ? 3 : tier === "B" ? 2 : 1);
  const sampleScore = (sample) => (sample === "reference" ? 2 : 1);

  return (
    tierScore(b.tier) - tierScore(a.tier) ||
    sampleScore(b.sampleVsReference) - sampleScore(a.sampleVsReference) ||
    b.confidence - a.confidence ||
    a.id.localeCompare(b.id)
  );
}

function compareSnippetPriority(a, b) {
  return (
    b.confidence - a.confidence || a.canonicalKey.localeCompare(b.canonicalKey) || a.version.localeCompare(b.version)
  );
}

function inferApiFamilyAndOperation(title, code) {
  const t = title.toLowerCase();
  const c = code.toLowerCase();

  if (t.includes("zet")) return { apiFamily: "platform", operation: "zet" };
  if (t.includes("api console") || t.includes("client registration"))
    return { apiFamily: "auth", operation: "client-registration" };
  if (t.includes("scope requirements") || c.includes("oauth-scope-mismatch"))
    return { apiFamily: "auth", operation: "scopes" };
  if (t.includes("oauth") || c.includes("oauthbuilder")) return { apiFamily: "auth", operation: "oauth" };
  if (t.includes("redirect") || c.includes("localstorage.setitem"))
    return { apiFamily: "auth", operation: "redirect-handling" };

  if (t.includes("init") || c.includes("initializebuilder")) return { apiFamily: "sdk", operation: "initialization" };
  if (t.includes("sdkconfig") || c.includes("sdkconfigbuilder"))
    return { apiFamily: "sdk", operation: "configuration" };
  if (t.includes("environment") || c.includes("datacenter.us.production"))
    return { apiFamily: "sdk", operation: "environment" };
  if (t.includes("cdn") || c.includes("zohocrmsdk-8-0.js")) return { apiFamily: "sdk", operation: "distribution" };
  if (t.includes("feature list") || c.includes("history tracking fields api"))
    return { apiFamily: "sdk", operation: "feature-index" };

  if (t.includes("create") || c.includes("createrecord")) return { apiFamily: "records", operation: "create" };
  if (t.includes("delete") || c.includes("delete_0(")) return { apiFamily: "records", operation: "delete" };
  if (t.includes("mass update") || c.includes("massupdateresponse") || c.includes("massupdateaction")) {
    return { apiFamily: "records", operation: "mass-update" };
  }
  if (t.includes("deleted records") || c.includes("deletedrecordswrapper"))
    return { apiFamily: "records", operation: "deleted" };
  if (t.includes("count response") || c.includes("countwrapper")) return { apiFamily: "records", operation: "count" };
  if (t.includes("update") || c.includes("update(")) return { apiFamily: "records", operation: "update" };
  if (t.includes("upsert") || c.includes("upsert(")) return { apiFamily: "records", operation: "upsert" };
  if (t.includes("search") || c.includes("searchrecords")) return { apiFamily: "records", operation: "search" };
  if (t.includes("convert") || c.includes("convert")) return { apiFamily: "records", operation: "convert" };
  if (t.includes("fetch") || t.includes("get") || c.includes("getstatuscode"))
    return { apiFamily: "records", operation: "read" };

  if (t.includes("download") || c.includes("filebodywrapper")) return { apiFamily: "files", operation: "download" };
  if (t.includes("pipeline") || c.includes("transferpipeline")) return { apiFamily: "pipeline", operation: "transfer" };
  if (t.includes("tags api") || c.includes("recordactionwrapper")) return { apiFamily: "tags", operation: "responses" };

  if (t.includes("common api") || t.includes("particular api") || c.includes("actionhandler")) {
    return { apiFamily: "runtime", operation: "response-models" };
  }

  if (t.includes("response") || t.includes("exception") || c.includes("apiexception")) {
    return { apiFamily: "runtime", operation: "response-handling" };
  }

  return { apiFamily: "general", operation: "usage" };
}

function inferVersion(sourceUrl) {
  try {
    const url = new URL(sourceUrl);
    const match = url.pathname.match(/\/versions\/([^/]+)\//);
    if (match?.[1]) {
      return match[1];
    }
    return "main";
  } catch {
    return "unknown";
  }
}

function inferStability(version) {
  if (version === "unknown") {
    return "unknown";
  }
  if (/alpha|beta|rc/i.test(version)) {
    return "beta";
  }
  return "stable";
}

function inferSampleType(sourceUrl, title, code) {
  const t = title.toLowerCase();
  const c = code.toLowerCase();
  if (sourceUrl.includes("/samples/") || t.includes("sample") || c.includes("zcrmsample")) {
    return "sample";
  }
  return "reference";
}

function inferModule(code) {
  const moduleMatch = code.match(/\("([A-Za-z][A-Za-z0-9_]+)"\)/);
  const candidate = moduleMatch?.[1];
  if (candidate) {
    const blocked = new Set(["clientId", "scope", "redirectURL", "Value"]);
    if (!blocked.has(candidate)) {
      return candidate;
    }
  }
  if (code.toLowerCase().includes("leads")) {
    return "Leads";
  }
  return null;
}

function extractScopes(text) {
  return [...new Set((text.match(/ZohoCRM\.[A-Za-z0-9_.]+/g) ?? []).map((item) => item.trim()))].sort();
}

function inferTier({ canonicalKey, language, sampleType, confidence, title, code }) {
  const t = title.toLowerCase();
  const c = code.toLowerCase();
  const isStructural = language === "apidoc" || t.includes("feature list") || c.includes("response structure");

  if (!isStructural && sampleType === "reference" && confidence >= 0.75 && TIER_A_KEYS.has(canonicalKey)) {
    return "A";
  }

  if (
    language === "javascript" ||
    language === "js" ||
    language === "typescript" ||
    language === "ts" ||
    language === "html" ||
    language === "bash" ||
    language === "sh"
  ) {
    return "B";
  }

  return "C";
}

function buildTags({ apiFamily, operation, language, sampleType, title, code }) {
  const tags = new Set([`lang:${language}`, `family:${apiFamily}`, `op:${operation}`, `source:${sampleType}`]);

  const t = title.toLowerCase();
  const c = code.toLowerCase();
  if (t.includes("oauth") || c.includes("oauthbuilder")) tags.add("oauth");
  if (t.includes("response") || c.includes("apiexception")) tags.add("responses");
  if (t.includes("sample") || c.includes("zcrmsample")) tags.add("sample");
  if (t.includes("scope") || c.includes("oauth-scope-mismatch")) tags.add("scopes");

  return [...tags].sort();
}

function scoreConfidence(title, language, code, sampleType) {
  let score = 0.4;

  if (language === "javascript" || language === "js" || language === "typescript" || language === "ts") score += 0.25;
  if (sampleType === "reference") score += 0.1;
  if (code.length < 3000) score += 0.1;
  if (/await\s+|new\s+oauthbuilder|new\s+initializebuilder|zcrm\./i.test(code)) score += 0.1;
  if (/example|sample|init|initialize|create|update|get|delete|response/i.test(title)) score += 0.05;

  return Math.min(1, Number(score.toFixed(4)));
}

function isAllowedSource(urlText) {
  try {
    const url = new URL(urlText);
    return ALLOWED_SOURCES.some((allow) => url.hostname === allow.host && url.pathname.includes(allow.pathIncludes));
  } catch {
    return false;
  }
}

function isNoisy(code) {
  if (!code) return true;

  const lines = code.split(/\r?\n/);
  const maxLineLength = Math.max(...lines.map((line) => line.length), 0);
  if (maxLineLength > 1000) return true;
  if (code.length > 20000) return true;

  const symbolHeavyRatio = ratio(code, /[^a-zA-Z0-9\s\n\t[\]{}().,;:_"'\-/]/g);
  if (symbolHeavyRatio > 0.3) return true;

  return false;
}

function normalizeCode(code) {
  return code.replace(/\r\n/g, "\n").trim();
}

function ratio(input, regex) {
  const matches = input.match(regex);
  return matches ? matches.length / Math.max(input.length, 1) : 0;
}

function toShortExplanation(rawBody) {
  const normalized = rawBody
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return normalized.slice(0, 280);
}

function hash(input) {
  return createHash("sha256").update(input).digest("hex").slice(0, 16);
}

function toSlug(input) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function countBy(items, getKey) {
  const out = {};
  for (const item of items) {
    const key = getKey(item);
    out[key] = (out[key] ?? 0) + 1;
  }
  return out;
}

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`Zoho CRM JS SDK KB build failed: ${message}\n`);
  process.exit(1);
});
