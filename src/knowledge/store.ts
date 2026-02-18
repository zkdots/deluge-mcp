import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import type { ExampleSearchInput, ExampleSearchMatch, ProcessedSnippet, TopicIndexItem } from "../types.js";

interface SnippetFile {
  snippets: ProcessedSnippet[];
}

const INDEX_VERSION = "v1";
const SOURCE_ALLOWLIST_HOST = "www.zoho.com";
const SOURCE_ALLOWLIST_PATH_PREFIX = "/deluge/help/";

export interface KnowledgeStats {
  index_version: string;
  source_file: string;
  indexed_at: string;
  raw_count: number;
  deduped_count: number;
  high_confidence_count: number;
  topic_count: number;
}

export class KnowledgeStore {
  private snippets: ProcessedSnippet[] = [];
  private dedupedSnippets: ProcessedSnippet[] = [];
  private topicIndex: TopicIndexItem[] = [];
  private sourceFile = "data/processed/snippets.json";
  private indexedAt = "";

  async load(filePath = "data/processed/snippets.json"): Promise<void> {
    this.sourceFile = filePath;
    const absolute = path.resolve(filePath);
    try {
      const payload = JSON.parse(await fs.readFile(absolute, "utf8")) as SnippetFile;
      const incoming = Array.isArray(payload.snippets) ? payload.snippets : [];
      this.snippets = incoming.map((snippet) => hydrateSnippet(snippet));
    } catch {
      this.snippets = [];
    }
    this.rebuildIndexes();
  }

  all(): ProcessedSnippet[] {
    return this.snippets;
  }

  allDeduped(): ProcessedSnippet[] {
    return this.dedupedSnippets;
  }

  getStats(): KnowledgeStats {
    return {
      index_version: INDEX_VERSION,
      source_file: this.sourceFile,
      indexed_at: this.indexedAt,
      raw_count: this.snippets.length,
      deduped_count: this.dedupedSnippets.length,
      high_confidence_count: this.dedupedSnippets.filter((s) => s.qualityScore >= 0.7).length,
      topic_count: this.topicIndex.length,
    };
  }

  listTopics(limit = 200): TopicIndexItem[] {
    const normalizedLimit = clamp(limit, 1, 1000);
    return this.topicIndex.slice(0, normalizedLimit);
  }

  searchExamples(input: ExampleSearchInput = {}): ExampleSearchMatch[] {
    const maxResults = clamp(input.maxResults ?? 5, 1, 20);
    const topicNeedle = normalizeTopic(input.topic ?? "");
    const queryText = (input.query ?? "").trim().toLowerCase();
    const queryTokens = tokenize(queryText);
    const requestedScope = (input.serviceScope ?? "").trim().toLowerCase();
    const requireAllowlist = input.requireSourceAllowlist ?? true;
    const includeDebug = input.includeMatchDebug ?? false;

    const candidates = this.dedupedSnippets
      .filter((snippet) => snippet.qualityScore >= 0.7)
      .filter((snippet) => !requireAllowlist || snippet.sourceAllowlisted === true)
      .filter(
        (snippet) => requestedScope.length === 0 || (snippet.serviceScope ?? "core").toLowerCase() === requestedScope
      );

    const ranked = candidates
      .map((snippet) => rankSnippet(snippet, topicNeedle, queryText, queryTokens, requestedScope, includeDebug))
      .filter((match): match is ExampleSearchMatch => match !== null)
      .sort(
        (a, b) =>
          b.score - a.score ||
          b.snippet.qualityScore - a.snippet.qualityScore ||
          a.snippet.id.localeCompare(b.snippet.id)
      )
      .slice(0, maxResults);

    return ranked;
  }

  findByTopic(topic: string, limit = 5): ProcessedSnippet[] {
    return this.searchExamples({
      topic,
      maxResults: limit,
      requireSourceAllowlist: true,
    }).map((match) => match.snippet);
  }

  findRelatedByCode(code: string, limit = 3): ProcessedSnippet[] {
    const tokens = tokenize(code);
    if (tokens.length === 0) {
      return [];
    }

    return this.dedupedSnippets
      .filter((snippet) => snippet.qualityScore >= 0.7)
      .map((snippet) => ({
        snippet,
        score: overlapScore(tokens, tokenize(`${snippet.code} ${snippet.title}`)),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || b.snippet.qualityScore - a.snippet.qualityScore)
      .slice(0, clamp(limit, 1, 10))
      .map((item) => item.snippet);
  }

  private rebuildIndexes(): void {
    const byFingerprint = new Map<string, ProcessedSnippet>();
    for (const snippet of this.snippets) {
      const fingerprint = snippet.codeFingerprint ?? hash(normalizeCode(snippet.code));
      const existing = byFingerprint.get(fingerprint);
      if (!existing || shouldReplace(existing, snippet)) {
        byFingerprint.set(fingerprint, snippet);
      }
    }

    this.dedupedSnippets = [...byFingerprint.values()].sort(
      (a, b) => b.qualityScore - a.qualityScore || a.id.localeCompare(b.id)
    );

    const grouped = new Map<string, TopicIndexItem>();
    for (const snippet of this.dedupedSnippets) {
      const normalizedTopic = snippet.normalizedTopic ?? normalizeTopic(snippet.topic);
      const functionName = snippet.functionName || "general";
      const serviceScope = snippet.serviceScope ?? "core";
      const key = `${normalizedTopic}|${functionName}|${serviceScope}`;

      const existing = grouped.get(key);
      if (existing) {
        existing.count += 1;
      } else {
        grouped.set(key, {
          normalizedTopic,
          functionName,
          serviceScope,
          count: 1,
        });
      }
    }

    this.topicIndex = [...grouped.values()].sort(
      (a, b) => b.count - a.count || a.normalizedTopic.localeCompare(b.normalizedTopic)
    );
    this.indexedAt = new Date().toISOString();
  }
}

function rankSnippet(
  snippet: ProcessedSnippet,
  topicNeedle: string,
  queryText: string,
  queryTokens: string[],
  requestedScope: string,
  includeDebug: boolean
): ExampleSearchMatch | null {
  let score = 0;
  const matchReasons = new Set<string>();
  const debug: Record<string, unknown> = {
    topic_score: 0,
    query_token_overlap: 0,
    phrase_bonus: 0,
    quality_bonus: 0,
    scope_bonus: 0,
    allowlist_bonus: 0,
  };

  const titleLower = snippet.title.toLowerCase();
  const functionLower = snippet.functionName.toLowerCase();
  const normalizedTopic = (snippet.normalizedTopic ?? normalizeTopic(snippet.topic)).toLowerCase();
  const aliases = snippet.functionAliases ?? [];
  const aliasLower = aliases.map((alias) => alias.toLowerCase());

  if (topicNeedle.length > 0) {
    if (normalizedTopic.includes(topicNeedle)) {
      score += 8;
      debug.topic_score = Number(debug.topic_score) + 8;
      matchReasons.add("topic_match");
    }
    if (functionLower.includes(topicNeedle)) {
      score += 6;
      debug.topic_score = Number(debug.topic_score) + 6;
      matchReasons.add("function_match");
    }
    if (titleLower.includes(topicNeedle)) {
      score += 3;
      debug.topic_score = Number(debug.topic_score) + 3;
      matchReasons.add("title_match");
    }
    if (aliasLower.some((alias) => alias.includes(topicNeedle))) {
      score += 4;
      debug.topic_score = Number(debug.topic_score) + 4;
      matchReasons.add("alias_match");
    }
  }

  if (queryTokens.length > 0) {
    const searchable = tokenize(
      `${snippet.code} ${snippet.title} ${snippet.topic} ${snippet.functionName} ${snippet.serviceScope ?? ""}`
    );
    const overlap = overlapScore(queryTokens, searchable);
    if (overlap > 0) {
      const overlapBonus = overlap * 1.5;
      score += overlapBonus;
      debug.query_token_overlap = overlapBonus;
      matchReasons.add("query_overlap");
    }
  }

  if (
    queryText.length > 0 &&
    (titleLower.includes(queryText) ||
      snippet.code.toLowerCase().includes(queryText) ||
      normalizedTopic.includes(normalizeTopic(queryText)))
  ) {
    score += 2;
    debug.phrase_bonus = 2;
    matchReasons.add("query_phrase_match");
  }

  const qualityBonus = Math.max(0, snippet.qualityScore - 0.6) * 2;
  score += qualityBonus;
  debug.quality_bonus = qualityBonus;
  if (qualityBonus > 0) {
    matchReasons.add("quality_rank");
  }

  if (requestedScope.length > 0) {
    score += 2;
    debug.scope_bonus = 2;
    matchReasons.add("scope_match");
  }

  if (snippet.sourceAllowlisted) {
    score += 0.5;
    debug.allowlist_bonus = 0.5;
  }

  if (topicNeedle.length === 0 && queryTokens.length === 0 && queryText.length === 0) {
    matchReasons.add("default_quality_rank");
    score = Math.max(score, snippet.qualityScore);
  }

  if (score <= 0) {
    return null;
  }

  return {
    snippet,
    score: Number(score.toFixed(3)),
    matchReasons: [...matchReasons],
    sourceConfidence: snippet.sourceAllowlisted && snippet.qualityScore >= 0.85 ? "high" : "medium",
    dedupeGroup: snippet.codeFingerprint,
    debug: includeDebug ? debug : undefined,
  };
}

function hydrateSnippet(raw: ProcessedSnippet): ProcessedSnippet {
  const normalizedCode = normalizeCode(raw.code ?? "");
  const sourceUrl = raw.sourceUrl ?? "";
  const title = raw.title ?? "Deluge example";
  const topic = raw.topic ?? "general:general";
  const functionName = raw.functionName ?? "general";
  const id = raw.id || hash(`${sourceUrl}|${title}|${normalizedCode}`);
  const codeFingerprint = raw.codeFingerprint ?? hash(normalizedCode);
  const normalizedTopic = raw.normalizedTopic ?? normalizeTopic(topic);
  const serviceScope = raw.serviceScope ?? inferServiceScope(sourceUrl, title);
  const functionAliases =
    raw.functionAliases && raw.functionAliases.length > 0
      ? dedupeAliases(raw.functionAliases)
      : buildFunctionAliases(functionName);
  const sourceAllowlisted = raw.sourceAllowlisted ?? isAllowedSource(sourceUrl);
  const qualityScore = Number.isFinite(raw.qualityScore) ? raw.qualityScore : 0;
  const flags = Array.isArray(raw.flags) ? raw.flags : [];
  const qualityFlags = mergeQualityFlags(raw.qualityFlags, flags, sourceAllowlisted, qualityScore);

  return {
    ...raw,
    id,
    snippetId: raw.snippetId ?? id,
    topic,
    normalizedTopic,
    functionName,
    functionAliases,
    serviceScope,
    title,
    sourceUrl,
    sourceTitle: raw.sourceTitle ?? title,
    code: normalizedCode,
    codeFingerprint,
    explanation: raw.explanation ?? "",
    qualityScore,
    flags,
    qualityFlags,
    sourceAllowlisted,
    ingestedAt: raw.ingestedAt ?? new Date().toISOString(),
  };
}

function mergeQualityFlags(
  existing: string[] | undefined,
  legacyFlags: string[],
  sourceAllowlisted: boolean,
  qualityScore: number
): string[] {
  const merged = new Set<string>();
  for (const flag of existing ?? []) {
    merged.add(flag);
  }
  for (const flag of legacyFlags) {
    merged.add(flag);
  }
  if (sourceAllowlisted) {
    merged.add("allowlisted_source");
  }
  if (qualityScore < 0.7) {
    merged.add("low_confidence");
  }
  return [...merged];
}

function dedupeAliases(aliases: string[]): string[] {
  const deduped = new Set<string>();
  for (const alias of aliases) {
    const trimmed = alias.trim();
    if (!trimmed) {
      continue;
    }
    deduped.add(trimmed);
    deduped.add(trimmed.toLowerCase());
  }
  return [...deduped];
}

function shouldReplace(previous: ProcessedSnippet, incoming: ProcessedSnippet): boolean {
  if (incoming.qualityScore !== previous.qualityScore) {
    return incoming.qualityScore > previous.qualityScore;
  }
  if ((incoming.sourceAllowlisted ? 1 : 0) !== (previous.sourceAllowlisted ? 1 : 0)) {
    return Boolean(incoming.sourceAllowlisted);
  }
  return incoming.id.localeCompare(previous.id) < 0;
}

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[^a-z0-9_]+/)
    .filter((token) => token.length > 2);
}

function overlapScore(input: string[], target: string[]): number {
  const targetSet = new Set(target);
  let score = 0;
  for (const token of input) {
    if (targetSet.has(token)) {
      score += 1;
    }
  }
  return score;
}

function buildFunctionAliases(functionName: string): string[] {
  const cleaned = functionName.trim().replace(/\(\)$/, "");
  const lower = cleaned.toLowerCase();
  const aliases = new Set<string>([cleaned, `${cleaned}()`, lower, lower.replace(/_/g, ""), lower.replace(/_/g, "-")]);
  return [...aliases].filter(Boolean);
}

function normalizeTopic(topic: string): string {
  return topic
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9:_-]+/g, "-")
    .replace(/-+/g, "-");
}

function normalizeCode(code: string): string {
  return code.replace(/\r\n/g, "\n").trim();
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

  const match = title.toLowerCase().match(/zoho\s+([a-z]+)/);
  if (match && known.has(match[1])) {
    return match[1];
  }

  return "core";
}

function isAllowedSource(source: string): boolean {
  try {
    const url = new URL(source);
    return url.hostname === SOURCE_ALLOWLIST_HOST && url.pathname.startsWith(SOURCE_ALLOWLIST_PATH_PREFIX);
  } catch {
    return false;
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function hash(input: string): string {
  return createHash("sha256").update(input).digest("hex").slice(0, 16);
}
