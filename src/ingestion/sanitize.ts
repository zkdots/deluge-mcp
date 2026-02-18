import { createHash } from "node:crypto";
import type { IngestionSummary, ParsedCodeBlock, ParsedSection, ProcessedSnippet } from "../types.js";

const TRUSTED_HOST = "www.zoho.com";
const TRUSTED_PATH_PREFIX = "/deluge/help/";

export function sanitizeSectionsStrict(sections: ParsedSection[]): {
  snippets: ProcessedSnippet[];
  summary: IngestionSummary;
} {
  const summary: IngestionSummary = {
    inputSections: sections.length,
    keptSnippets: 0,
    rejected: {
      sourceNotAllowed: 0,
      noCode: 0,
      notDelugeLike: 0,
      noisy: 0,
      duplicate: 0,
    },
  };

  const snippets: ProcessedSnippet[] = [];
  const dedupe = new Set<string>();

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
      if (!isDelugeLikeBlock(section.title, block)) {
        summary.rejected.notDelugeLike += 1;
        continue;
      }

      if (isNoisyOrCorrupt(block.code)) {
        summary.rejected.noisy += 1;
        continue;
      }

      const normalizedCode = normalizeCode(block.code);
      const functionName = extractFunctionName(section.title, normalizedCode);
      const topic = inferTopic(section.sourceUrl, section.title, functionName);
      const normalizedTopic = normalizeTopic(topic);
      const functionAliases = buildFunctionAliases(functionName);
      const serviceScope = inferServiceScope(section.sourceUrl, section.title);
      const codeFingerprint = hash(normalizedCode);
      const sourceTitle = section.title;

      const dedupeKey = makeDedupeKey(codeFingerprint);
      if (dedupe.has(dedupeKey)) {
        summary.rejected.duplicate += 1;
        continue;
      }
      dedupe.add(dedupeKey);

      const qualityScore = scoreSnippet(section.title, block.language, normalizedCode);
      const qualityFlags = ["allowlisted_source", "deluge_like", "deduped_unique"];
      if (qualityScore < 0.7) {
        qualityFlags.push("low_confidence");
      }

      const id = hash(`${section.sourceUrl}|${section.title}|${normalizedCode}`);
      snippets.push({
        id,
        snippetId: id,
        topic,
        normalizedTopic,
        functionName,
        functionAliases,
        serviceScope,
        title: section.title,
        sourceUrl: section.sourceUrl,
        sourceTitle,
        code: normalizedCode,
        codeFingerprint,
        explanation: toShortExplanation(section.rawBody),
        qualityScore,
        flags: qualityScore < 0.7 ? ["low-confidence"] : [],
        qualityFlags,
        sourceAllowlisted: true,
        ingestedAt: new Date().toISOString(),
      });
    }
  }

  summary.keptSnippets = snippets.length;
  snippets.sort((a, b) => b.qualityScore - a.qualityScore || a.title.localeCompare(b.title));
  return { snippets, summary };
}

function isAllowedSource(source: string): boolean {
  try {
    const url = new URL(source);
    return url.hostname === TRUSTED_HOST && url.pathname.startsWith(TRUSTED_PATH_PREFIX);
  } catch {
    return false;
  }
}

function isDelugeLikeBlock(title: string, block: ParsedCodeBlock): boolean {
  const lang = block.language;
  if (lang === "deluge") {
    return true;
  }
  const text = `${title}\n${block.code}`.toLowerCase();
  const signals = [
    /\binfo\b/,
    /\bmap\(\)/,
    /\bcollection\(/,
    /\bzoho\.[a-z]/,
    /\binvokeurl\b/,
    /\.get\(/,
    /\bif\s*\(/,
    /\bfor each\b/,
  ];
  return signals.some((pattern) => pattern.test(text));
}

function isNoisyOrCorrupt(code: string): boolean {
  if (!code.trim()) {
    return true;
  }

  if (code.length > 8000 && !/\n/.test(code.slice(0, 2000))) {
    return true;
  }

  const lines = code.split(/\r?\n/);
  const maxLineLength = Math.max(...lines.map((line) => line.length), 0);
  if (maxLineLength > 700) {
    return true;
  }

  const nonAlnumRatio = ratio(code, /[^a-zA-Z0-9\s\n\t[\]{}().,;:_"'\-/]/g);
  if (nonAlnumRatio > 0.28) {
    return true;
  }

  const repeatedTokenRun = /(A{15,}|K{15,}|R{15,}|0{15,})/.test(code);
  if (repeatedTokenRun) {
    return true;
  }

  return false;
}

function ratio(input: string, match: RegExp): number {
  const matches = input.match(match);
  return matches ? matches.length / Math.max(input.length, 1) : 0;
}

function normalizeCode(code: string): string {
  return code.replace(/\r\n/g, "\n").trim();
}

function extractFunctionName(title: string, code: string): string {
  const titleMatch = title.match(/\b([a-zA-Z][a-zA-Z0-9_]*)\(\)/);
  if (titleMatch) {
    return titleMatch[1];
  }

  const codeMatch = code.match(/\b([a-zA-Z][a-zA-Z0-9_]*)\s*\(/);
  return codeMatch?.[1] ?? "general";
}

function inferTopic(sourceUrl: string, title: string, functionName: string): string {
  const url = new URL(sourceUrl);
  const parts = url.pathname.split("/").filter(Boolean);
  const category = parts.includes("functions") ? parts[parts.indexOf("functions") + 1] : "general";
  if (category) {
    return `${category}:${functionName}`;
  }
  return title.toLowerCase().replace(/\s+/g, "-").slice(0, 60);
}

function normalizeTopic(topic: string): string {
  return topic
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9:_-]+/g, "-")
    .replace(/-+/g, "-");
}

function buildFunctionAliases(functionName: string): string[] {
  const canonical = functionName.trim();
  const cleaned = canonical.replace(/\(\)$/, "");
  const lower = cleaned.toLowerCase();
  const aliases = new Set<string>([canonical, cleaned, lower, lower.replace(/_/g, ""), lower.replace(/_/g, "-")]);
  return [...aliases].filter(Boolean);
}

function inferServiceScope(sourceUrl: string, title: string): string {
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
    "one",
    "workdrive",
    "sheet",
    "salesforce",
    "bugtracker",
    "notebook",
  ]);

  try {
    const url = new URL(sourceUrl);
    const parts = url.pathname.split("/").filter(Boolean);
    const helpIndex = parts.indexOf("help");
    const next = helpIndex !== -1 ? parts[helpIndex + 1] : "";
    if (next && known.has(next)) {
      return next;
    }
    if (next === "functions" || next === "datatypes") {
      return "core";
    }
  } catch {
    // no-op
  }

  const titleMatch = title.toLowerCase().match(/zoho\s+([a-z]+)/);
  if (titleMatch && known.has(titleMatch[1])) {
    return titleMatch[1];
  }

  return "core";
}

function scoreSnippet(title: string, language: string, code: string): number {
  let score = 0.5;
  if (language === "deluge") {
    score += 0.2;
  }
  if (/example/i.test(title)) {
    score += 0.1;
  }
  if (/\binfo\b/.test(code)) {
    score += 0.1;
  }
  if (code.length < 900) {
    score += 0.1;
  }
  return Math.min(1, score);
}

function toShortExplanation(rawBody: string): string {
  const normalized = rawBody
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return normalized.slice(0, 280);
}

function makeDedupeKey(codeFingerprint: string): string {
  return codeFingerprint;
}

function hash(input: string): string {
  return createHash("sha256").update(input).digest("hex").slice(0, 16);
}
