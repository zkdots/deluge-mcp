import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import type { ExampleSearchInput, ExampleSearchMatch, ProcessedSnippet, TopicIndexItem } from "../types.js";

interface SnippetFile {
  generatedAt?: string;
  schemaVersion?: string;
  summary?: Partial<KnowledgeSummary>;
  coverage?: Partial<KnowledgeCoverage>;
  canonicalIndex?: Array<Partial<KnowledgeCanonicalIndexItem>>;
  snippets?: ProcessedSnippet[];
}

const INDEX_VERSION = "v1";
const SOURCE_ALLOWLIST_HOST = "www.zoho.com";
const SOURCE_ALLOWLIST_PATH_PREFIX = "/deluge/help/";

export interface KnowledgeCoverage {
  requiredCanonicalKeys: string[];
  presentCanonicalKeys: string[];
  missingCanonicalKeys: string[];
  completionRatio: number;
  tierCounts: Record<string, number>;
}

export interface KnowledgeSummary {
  inputSections: number;
  rawUnits: number;
  keptSnippets: number;
  mergedVariants: number;
  rejected: {
    sourceNotAllowed: number;
    noCode: number;
    notDelugeLike: number;
    noisy: number;
    duplicate: number;
  };
}

export interface KnowledgeCanonicalIndexItem {
  groupKey: string;
  canonicalKey: string;
  apiFamily: string;
  operation: string;
  version: string;
  primarySnippetId: string;
  snippetIds: string[];
  variantSnippetIds: string[];
  variantCount: number;
  tierCounts: Record<string, number>;
  serviceScopes: string[];
  requiresScopes: string[];
  sampleTypes: string[];
}

export interface KnowledgeCurationMetadata {
  schemaVersion: string;
  generatedAt: string;
  summary: KnowledgeSummary;
  coverage: KnowledgeCoverage;
  canonicalIndex: KnowledgeCanonicalIndexItem[];
}

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
  private schemaVersion = "unknown";
  private generatedAt = "";
  private summary: KnowledgeSummary = defaultSummary();
  private coverage: KnowledgeCoverage = defaultCoverage();
  private canonicalIndex: KnowledgeCanonicalIndexItem[] = [];

  async load(filePath = "data/processed/snippets.json"): Promise<void> {
    this.sourceFile = filePath;
    const absolute = path.resolve(filePath);
    try {
      const payload = JSON.parse(await fs.readFile(absolute, "utf8")) as SnippetFile;
      const incoming = Array.isArray(payload.snippets) ? payload.snippets : [];
      this.snippets = incoming.map((snippet) => hydrateSnippet(snippet));
      this.schemaVersion = typeof payload.schemaVersion === "string" ? payload.schemaVersion : "unknown";
      this.generatedAt = typeof payload.generatedAt === "string" ? payload.generatedAt : "";
      this.summary = normalizeSummary(payload.summary, this.snippets.length);
      this.coverage = normalizeCoverage(payload.coverage);
      this.canonicalIndex = normalizeCanonicalIndex(payload.canonicalIndex);
    } catch {
      this.snippets = [];
      this.schemaVersion = "unknown";
      this.generatedAt = "";
      this.summary = defaultSummary();
      this.coverage = defaultCoverage();
      this.canonicalIndex = [];
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

  getCurationMetadata(): KnowledgeCurationMetadata {
    return {
      schemaVersion: this.schemaVersion,
      generatedAt: this.generatedAt,
      summary: this.summary,
      coverage: this.coverage,
      canonicalIndex: this.canonicalIndex,
    };
  }

  listCanonicalIndex(limit = 500): KnowledgeCanonicalIndexItem[] {
    const normalizedLimit = clamp(limit, 1, 2000);
    return this.canonicalIndex.slice(0, normalizedLimit);
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
    const canonicalNeedle = normalizeCanonicalKey(input.canonicalKey ?? "");
    const requestedTier = (input.tier ?? "").trim().toUpperCase();
    const requireAllowlist = input.requireSourceAllowlist ?? true;
    const includeDebug = input.includeMatchDebug ?? false;
    const includeVariants = input.includeVariants ?? false;

    const candidates = this.dedupedSnippets
      .filter((snippet) => snippet.qualityScore >= 0.7)
      .filter((snippet) => !requireAllowlist || snippet.sourceAllowlisted === true)
      .filter(
        (snippet) => requestedScope.length === 0 || (snippet.serviceScope ?? "core").toLowerCase() === requestedScope
      )
      .filter(
        (snippet) =>
          canonicalNeedle.length === 0 || normalizeCanonicalKey(snippet.canonicalKey ?? "").includes(canonicalNeedle)
      )
      .filter((snippet) => requestedTier.length === 0 || (snippet.tier ?? "").toUpperCase() === requestedTier);

    return candidates
      .map((snippet) =>
        rankSnippet(snippet, topicNeedle, queryText, queryTokens, requestedScope, includeDebug, includeVariants)
      )
      .filter((match): match is ExampleSearchMatch => match !== null)
      .sort(
        (a, b) =>
          b.score - a.score ||
          b.snippet.qualityScore - a.snippet.qualityScore ||
          a.snippet.id.localeCompare(b.snippet.id)
      )
      .slice(0, maxResults);
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
        score: overlapScore(tokens, tokenize(`${snippet.code} ${snippet.title} ${snippet.canonicalKey ?? ""}`)),
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

    if (this.canonicalIndex.length === 0) {
      this.canonicalIndex = buildCanonicalIndex(this.dedupedSnippets);
    }

    const hasCoverageFromPayload =
      this.coverage.requiredCanonicalKeys.length > 0 ||
      this.coverage.presentCanonicalKeys.length > 0 ||
      this.coverage.missingCanonicalKeys.length > 0;
    if (!hasCoverageFromPayload) {
      this.coverage = buildCoverage(this.dedupedSnippets, []);
    }

    if (this.summary.rawUnits === 0) {
      this.summary.rawUnits = this.snippets.length;
    }
    if (this.summary.keptSnippets === 0) {
      this.summary.keptSnippets = this.dedupedSnippets.length;
    }
    if (this.summary.mergedVariants === 0) {
      this.summary.mergedVariants = this.dedupedSnippets.reduce(
        (count, snippet) => count + (snippet.variantCount ?? 0),
        0
      );
    }

    this.indexedAt = new Date().toISOString();
  }
}

function rankSnippet(
  snippet: ProcessedSnippet,
  topicNeedle: string,
  queryText: string,
  queryTokens: string[],
  requestedScope: string,
  includeDebug: boolean,
  includeVariants: boolean
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
    canonical_bonus: 0,
    tier_bonus: 0,
    variants_bonus: 0,
  };

  const titleLower = snippet.title.toLowerCase();
  const functionLower = snippet.functionName.toLowerCase();
  const normalizedTopic = (snippet.normalizedTopic ?? normalizeTopic(snippet.topic)).toLowerCase();
  const aliases = snippet.functionAliases ?? [];
  const aliasLower = aliases.map((alias) => alias.toLowerCase());
  const canonicalKey = normalizeCanonicalKey(snippet.canonicalKey ?? "");

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
    if (canonicalKey.includes(topicNeedle)) {
      score += 5;
      debug.canonical_bonus = Number(debug.canonical_bonus) + 5;
      matchReasons.add("canonical_match");
    }
  }

  if (queryTokens.length > 0) {
    const searchable = tokenize(
      `${snippet.code} ${snippet.title} ${snippet.topic} ${snippet.functionName} ${snippet.serviceScope ?? ""} ${canonicalKey}`
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
      normalizedTopic.includes(normalizeTopic(queryText)) ||
      canonicalKey.includes(normalizeCanonicalKey(queryText)))
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

  const tier = snippet.tier ?? "C";
  if (tier === "A") {
    score += 0.3;
    debug.tier_bonus = 0.3;
  } else if (tier === "B") {
    score += 0.1;
    debug.tier_bonus = 0.1;
  }

  if (includeVariants && (snippet.variantCount ?? 0) > 0) {
    score += 0.2;
    debug.variants_bonus = 0.2;
    matchReasons.add("has_variants");
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
  const canonicalKey = normalizeCanonicalKey(
    raw.canonicalKey ?? buildCanonicalFromTopic(normalizedTopic, serviceScope, functionName)
  );
  const [apiFamily, ...operationParts] = canonicalKey.split(".");
  const operation = operationParts.join(".") || normalizeIdentifier(functionName);
  const version = raw.version ?? inferVersion(sourceUrl);
  const stability = normalizeStability(raw.stability, version);
  const requiresScopes = normalizeStringList(raw.requiresScopes);
  const requiresModule = normalizeRequiresModule(raw.requiresModule);
  const sampleVsReference = normalizeSampleType(raw.sampleVsReference, title, normalizedCode);
  const confidence = clampNumber(
    Number.isFinite(raw.confidence) ? Number(raw.confidence) : Number(raw.qualityScore ?? 0.6),
    0,
    1
  );
  const qualityScore = clampNumber(Number.isFinite(raw.qualityScore) ? Number(raw.qualityScore) : confidence, 0, 1);
  const tier = normalizeTier(raw.tier, confidence, title, normalizedCode, sourceAllowlisted, canonicalKey);
  const flags = Array.isArray(raw.flags) ? raw.flags : [];
  const qualityFlags = mergeQualityFlags(raw.qualityFlags, flags, sourceAllowlisted, qualityScore);
  const variants = normalizeVariants(raw.variants);
  const variantCount = Number.isInteger(raw.variantCount) ? Number(raw.variantCount) : variants.length;

  return {
    ...raw,
    id,
    snippetId: raw.snippetId ?? id,
    topic,
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
    variantCount,
    variants,
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

function normalizeSummary(raw: Partial<KnowledgeSummary> | undefined, fallbackCount: number): KnowledgeSummary {
  const rejected = raw?.rejected;
  return {
    inputSections: toFiniteNumber(raw?.inputSections, fallbackCount),
    rawUnits: toFiniteNumber(raw?.rawUnits, fallbackCount),
    keptSnippets: toFiniteNumber(raw?.keptSnippets, fallbackCount),
    mergedVariants: toFiniteNumber(raw?.mergedVariants, 0),
    rejected: {
      sourceNotAllowed: toFiniteNumber(rejected?.sourceNotAllowed, 0),
      noCode: toFiniteNumber(rejected?.noCode, 0),
      notDelugeLike: toFiniteNumber(rejected?.notDelugeLike, 0),
      noisy: toFiniteNumber(rejected?.noisy, 0),
      duplicate: toFiniteNumber(rejected?.duplicate, 0),
    },
  };
}

function normalizeCoverage(raw: Partial<KnowledgeCoverage> | undefined): KnowledgeCoverage {
  return {
    requiredCanonicalKeys: normalizeStringList(raw?.requiredCanonicalKeys),
    presentCanonicalKeys: normalizeStringList(raw?.presentCanonicalKeys),
    missingCanonicalKeys: normalizeStringList(raw?.missingCanonicalKeys),
    completionRatio: clampNumber(Number(raw?.completionRatio ?? 0), 0, 1),
    tierCounts: normalizeCountMap(raw?.tierCounts),
  };
}

function normalizeCanonicalIndex(
  raw: Array<Partial<KnowledgeCanonicalIndexItem>> | undefined
): KnowledgeCanonicalIndexItem[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw
    .map((item) => {
      const canonicalKey = normalizeCanonicalKey(String(item.canonicalKey ?? ""));
      const version = String(item.version ?? "main");
      const apiFamily = normalizeIdentifier(String(item.apiFamily ?? canonicalKey.split(".")[0] ?? "general"));
      const operation = normalizeIdentifier(String(item.operation ?? canonicalKey.split(".")[1] ?? "general"));
      const groupKey = String(item.groupKey ?? `${canonicalKey}|${version}`);

      return {
        groupKey,
        canonicalKey,
        apiFamily,
        operation,
        version,
        primarySnippetId: String(item.primarySnippetId ?? ""),
        snippetIds: normalizeStringList(item.snippetIds),
        variantSnippetIds: normalizeStringList(item.variantSnippetIds),
        variantCount: toFiniteNumber(item.variantCount, 0),
        tierCounts: normalizeCountMap(item.tierCounts),
        serviceScopes: normalizeStringList(item.serviceScopes),
        requiresScopes: normalizeStringList(item.requiresScopes),
        sampleTypes: normalizeStringList(item.sampleTypes),
      } satisfies KnowledgeCanonicalIndexItem;
    })
    .filter((item) => item.canonicalKey.length > 0)
    .sort((a, b) => a.canonicalKey.localeCompare(b.canonicalKey) || a.version.localeCompare(b.version));
}

function buildCanonicalIndex(snippets: ProcessedSnippet[]): KnowledgeCanonicalIndexItem[] {
  const grouped = new Map<string, ProcessedSnippet[]>();

  for (const snippet of snippets) {
    const canonicalKey = normalizeCanonicalKey(snippet.canonicalKey ?? "");
    if (!canonicalKey) {
      continue;
    }

    const version = snippet.version ?? "main";
    const groupKey = `${canonicalKey}|${version}`;
    const list = grouped.get(groupKey) ?? [];
    list.push(snippet);
    grouped.set(groupKey, list);
  }

  const index: KnowledgeCanonicalIndexItem[] = [];
  for (const [groupKey, group] of grouped.entries()) {
    const [primary] = [...group].sort((a, b) => b.qualityScore - a.qualityScore || a.id.localeCompare(b.id));
    const variants = group.flatMap((snippet) => snippet.variants ?? []);

    index.push({
      groupKey,
      canonicalKey: primary.canonicalKey ?? "general.general",
      apiFamily: primary.apiFamily ?? "general",
      operation: primary.operation ?? "general",
      version: primary.version ?? "main",
      primarySnippetId: primary.id,
      snippetIds: [...new Set(group.map((item) => item.id))],
      variantSnippetIds: [...new Set(variants.map((variant) => variant.id))],
      variantCount: group.reduce((count, item) => count + (item.variantCount ?? 0), 0),
      tierCounts: countBy(group, (item) => item.tier ?? "unknown"),
      serviceScopes: [...new Set(group.map((item) => item.serviceScope ?? "core"))].sort(),
      requiresScopes: [...new Set(group.flatMap((item) => item.requiresScopes ?? []))].sort(),
      sampleTypes: [...new Set(group.map((item) => item.sampleVsReference ?? "sample"))].sort(),
    });
  }

  return index.sort((a, b) => a.canonicalKey.localeCompare(b.canonicalKey) || a.version.localeCompare(b.version));
}

function buildCoverage(snippets: ProcessedSnippet[], requiredCanonicalKeys: string[]): KnowledgeCoverage {
  const presentCanonicalKeys = [
    ...new Set(snippets.map((snippet) => normalizeCanonicalKey(snippet.canonicalKey ?? "")).filter(Boolean)),
  ].sort();
  const missingCanonicalKeys = requiredCanonicalKeys.filter((key) => !presentCanonicalKeys.includes(key));
  const completionRatio =
    requiredCanonicalKeys.length === 0
      ? 1
      : clampNumber((requiredCanonicalKeys.length - missingCanonicalKeys.length) / requiredCanonicalKeys.length, 0, 1);

  return {
    requiredCanonicalKeys,
    presentCanonicalKeys,
    missingCanonicalKeys,
    completionRatio,
    tierCounts: countBy(snippets, (snippet) => snippet.tier ?? "unknown"),
  };
}

function defaultCoverage(): KnowledgeCoverage {
  return {
    requiredCanonicalKeys: [],
    presentCanonicalKeys: [],
    missingCanonicalKeys: [],
    completionRatio: 0,
    tierCounts: {},
  };
}

function defaultSummary(): KnowledgeSummary {
  return {
    inputSections: 0,
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
}

function normalizeVariants(rawVariants: ProcessedSnippet["variants"]): NonNullable<ProcessedSnippet["variants"]> {
  if (!Array.isArray(rawVariants)) {
    return [];
  }

  const normalized: NonNullable<ProcessedSnippet["variants"]> = [];
  for (const variant of rawVariants) {
    const id = String(variant.id ?? "").trim();
    const title = String(variant.title ?? "").trim();
    const sourceUrl = String(variant.sourceUrl ?? "").trim();
    if (!id || !title || !sourceUrl) {
      continue;
    }

    const sampleVsReference = variant.sampleVsReference === "reference" ? "reference" : "sample";
    const confidence = clampNumber(Number(variant.confidence ?? 0.6), 0, 1);
    const tier = variant.tier === "A" || variant.tier === "B" || variant.tier === "C" ? variant.tier : "C";

    normalized.push({
      id,
      title,
      sourceUrl,
      language: variant.language,
      sampleVsReference,
      confidence,
      tier,
    });
  }
  return normalized;
}

function normalizeStability(
  value: ProcessedSnippet["stability"] | undefined,
  version: string
): "stable" | "beta" | "unknown" {
  if (value === "stable" || value === "beta" || value === "unknown") {
    return value;
  }
  if (/alpha|beta|rc/i.test(version)) {
    return "beta";
  }
  return "stable";
}

function normalizeSampleType(
  value: ProcessedSnippet["sampleVsReference"] | undefined,
  title: string,
  code: string
): "sample" | "reference" {
  if (value === "sample" || value === "reference") {
    return value;
  }
  const text = `${title}\n${code}`.toLowerCase();
  return /\b(example|sample)\b/.test(text) ? "sample" : "reference";
}

function normalizeTier(
  value: ProcessedSnippet["tier"] | undefined,
  confidence: number,
  title: string,
  code: string,
  sourceAllowlisted: boolean,
  canonicalKey: string
): "A" | "B" | "C" {
  if (value === "A" || value === "B" || value === "C") {
    return value;
  }

  const risky = /\b(error|throws|invalid operation|out of bounds)\b/i.test(`${title}\n${code}`);
  const tierASet = new Set([
    "map.get",
    "map.put",
    "list.get",
    "string.substring",
    "string.len",
    "common.tonumber",
    "common.todate",
    "common.tostring",
    "datetime.addday",
    "datetime.addhour",
    "general.createrecord",
    "general.getrecord",
    "general.getrecordbyid",
    "general.getrecords",
    "general.searchrecords",
  ]);

  if (risky) {
    return "C";
  }
  if (sourceAllowlisted && !risky && confidence >= 0.88 && tierASet.has(canonicalKey)) {
    return "A";
  }
  if (sourceAllowlisted && confidence >= 0.75) {
    return "B";
  }
  return "C";
}

function normalizeRequiresModule(value: ProcessedSnippet["requiresModule"]): string | null {
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed) {
      return trimmed;
    }
  }
  return null;
}

function normalizeCountMap(input: Record<string, number> | undefined): Record<string, number> {
  const output: Record<string, number> = {};
  for (const [key, value] of Object.entries(input ?? {})) {
    output[key] = toFiniteNumber(value, 0);
  }
  return output;
}

function normalizeStringList(input: unknown): string[] {
  if (!Array.isArray(input)) {
    return [];
  }
  return [...new Set(input.map((item) => String(item).trim()).filter(Boolean))].sort();
}

function buildCanonicalFromTopic(normalizedTopic: string, serviceScope: string, functionName: string): string {
  if (normalizedTopic.includes(":")) {
    const [familyRaw, opRaw = functionName || "general"] = normalizedTopic.split(":");
    return `${normalizeIdentifier(familyRaw || "general")}.${normalizeIdentifier(opRaw || "general")}`;
  }
  return `${normalizeIdentifier(serviceScope || "core")}.${normalizeIdentifier(functionName || "general")}`;
}

function normalizeCanonicalKey(value: string): string {
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
  return `${normalizeIdentifier(familyRaw || "general")}.${normalizeIdentifier(operationParts.join("-") || "general")}`;
}

function normalizeIdentifier(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
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

function inferVersion(sourceUrl: string): string {
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

function clampNumber(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) {
    return min;
  }
  return Math.max(min, Math.min(max, Number(value.toFixed(4))));
}

function toFiniteNumber(value: unknown, fallback: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }
  return Math.max(0, Math.floor(value));
}

function countBy<T>(items: T[], getKey: (item: T) => string): Record<string, number> {
  const output: Record<string, number> = {};
  for (const item of items) {
    const key = getKey(item);
    output[key] = (output[key] ?? 0) + 1;
  }
  return output;
}

function hash(input: string): string {
  return createHash("sha256").update(input).digest("hex").slice(0, 16);
}
