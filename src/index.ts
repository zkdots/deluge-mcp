import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { overlapScore, tokenize } from "./knowledge/search-utils.js";
import { KnowledgeStore } from "./knowledge/store.js";
import { getBeginnerCheatsheet } from "./resources/cheatsheet.js";
import { getRulesResource } from "./resources/rules.js";
import { explainDeluge } from "./tools/explainer.js";
import { fixDeluge } from "./tools/fixer.js";
import { validateDeluge } from "./tools/validator.js";

const SERVER_VERSION = "0.1.1-beta.0";

export async function createServer(): Promise<McpServer> {
  const serverStartMs = Date.now();
  const store = new KnowledgeStore();
  await store.load();
  const stats = store.getStats();
  const delugeCuration = store.getCurationMetadata();
  const zohoCrmJsKnowledge = await loadZohoCrmJsKnowledge();

  const server = new McpServer({
    name: "deluge-mcp",
    version: SERVER_VERSION,
  });

  server.registerTool(
    "deluge_validate",
    {
      title: "Validate Deluge",
      description: "Validate Deluge syntax and common runtime-risk patterns.",
      inputSchema: {
        code: z.string().min(1),
        strict: z.boolean().optional(),
      },
    },
    async ({ code, strict }) => {
      const result = validateDeluge(code, strict ?? true);
      return {
        structuredContent: result,
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }
  );

  server.registerTool(
    "deluge_fix",
    {
      title: "Fix Deluge",
      description: "Apply safe, minimal Deluge syntax fixes.",
      inputSchema: {
        code: z.string().min(1),
        style: z.enum(["minimal-change", "readable"]).optional(),
      },
    },
    async ({ code, style }) => {
      const fixed = fixDeluge(code, style ?? "minimal-change");
      return {
        structuredContent: {
          fixed_code: fixed.fixedCode,
          changes: fixed.changes,
        },
        content: [
          {
            type: "text",
            text: fixed.fixedCode,
          },
        ],
      };
    }
  );

  server.registerTool(
    "deluge_explain",
    {
      title: "Explain Deluge",
      description: "Explain Deluge snippet in beginner-friendly language.",
      inputSchema: {
        code: z.string().min(1),
        level: z.enum(["beginner", "intermediate"]).optional(),
      },
    },
    async ({ code }) => {
      const validation = validateDeluge(code, true);
      const explanation = explainDeluge(code, validation);
      const references = store.findRelatedByCode(code, 2).map((s) => ({ title: s.title, source: s.sourceUrl }));
      return {
        structuredContent: {
          summary: explanation.summary,
          line_by_line: explanation.lineByLine,
          key_rules: explanation.keyRules,
          references,
        },
        content: [
          {
            type: "text",
            text: `${explanation.summary}\n\n${explanation.keyRules.map((r) => `- ${r}`).join("\n")}`,
          },
        ],
      };
    }
  );

  server.registerTool(
    "deluge_examples",
    {
      title: "Deluge Examples",
      description: "Return ranked, high-confidence Deluge examples by topic/query with safety filters.",
      inputSchema: {
        topic: z.string().min(1).optional(),
        query: z.string().min(1).optional(),
        max_results: z.number().int().min(1).max(20).optional(),
        service_scope: z.string().min(1).optional(),
        canonical_key: z.string().min(1).optional(),
        tier: z.enum(["A", "B", "C"]).optional(),
        include_variants: z.boolean().optional(),
        require_source_allowlist: z.boolean().optional(),
        include_match_debug: z.boolean().optional(),
        difficulty: z.enum(["beginner", "intermediate"]).optional(),
      },
    },
    async ({
      topic,
      query,
      max_results,
      service_scope,
      canonical_key,
      tier,
      include_variants,
      require_source_allowlist,
      include_match_debug,
    }) => {
      const matches = store.searchExamples({
        topic,
        query,
        maxResults: max_results,
        serviceScope: service_scope,
        canonicalKey: canonical_key,
        tier,
        includeVariants: include_variants ?? false,
        requireSourceAllowlist: require_source_allowlist,
        includeMatchDebug: include_match_debug,
      });
      const examples = matches.map((match) => ({
        id: match.snippet.id,
        title: match.snippet.title,
        code: match.snippet.code,
        notes: match.snippet.explanation,
        source: match.snippet.sourceUrl,
        function_name: match.snippet.functionName,
        topic: match.snippet.topic,
        canonical_key: match.snippet.canonicalKey,
        api_family: match.snippet.apiFamily,
        operation: match.snippet.operation,
        version: match.snippet.version,
        stability: match.snippet.stability,
        requires_scopes: match.snippet.requiresScopes,
        requires_module: match.snippet.requiresModule,
        sample_vs_reference: match.snippet.sampleVsReference,
        confidence: match.snippet.confidence,
        tier: match.snippet.tier,
        variant_count: match.snippet.variantCount,
        variants: include_variants ? match.snippet.variants : undefined,
        service_scope: match.snippet.serviceScope,
        score: match.score,
        match_reasons: match.matchReasons,
        snippet_id: match.snippet.snippetId ?? match.snippet.id,
        source_confidence: match.sourceConfidence,
        dedupe_group: match.dedupeGroup,
        debug: include_match_debug ? match.debug : undefined,
      }));

      return {
        structuredContent: {
          search: {
            topic: topic ?? null,
            query: query ?? null,
            service_scope: service_scope ?? null,
            canonical_key: canonical_key ?? null,
            tier: tier ?? null,
            include_variants: include_variants ?? false,
            require_source_allowlist: require_source_allowlist ?? true,
          },
          examples,
        },
        content: [
          {
            type: "text",
            text:
              examples.length === 0
                ? "No high-confidence examples found for this topic."
                : JSON.stringify(examples, null, 2),
          },
        ],
      };
    }
  );

  server.registerTool(
    "zoho_crm_js_examples",
    {
      title: "Zoho CRM JS SDK Examples",
      description: "Return ranked Zoho CRM JavaScript SDK examples from the local curated knowledge pack.",
      inputSchema: {
        topic: z.string().min(1).optional(),
        query: z.string().min(1).optional(),
        tag: z.string().min(1).optional(),
        canonical_key: z.string().min(1).optional(),
        tier: z.enum(["A", "B", "C"]).optional(),
        include_variants: z.boolean().optional(),
        max_results: z.number().int().min(1).max(20).optional(),
      },
    },
    async ({ topic, query, tag, canonical_key, tier, include_variants, max_results }) => {
      const matches = searchZohoCrmJsSnippets(zohoCrmJsKnowledge.snippets, {
        topic,
        query,
        tag,
        canonicalKey: canonical_key,
        tier,
        includeVariants: include_variants ?? false,
        maxResults: max_results ?? 5,
      });

      const examples = matches.map((item) => ({
        id: item.snippet.id,
        title: item.snippet.title,
        topic: item.snippet.topic,
        canonical_key: item.snippet.canonicalKey,
        api_family: item.snippet.apiFamily,
        operation: item.snippet.operation,
        version: item.snippet.version,
        stability: item.snippet.stability,
        requires_scopes: item.snippet.requiresScopes,
        requires_module: item.snippet.requiresModule,
        sample_vs_reference: item.snippet.sampleVsReference,
        confidence: item.snippet.confidence,
        tier: item.snippet.tier,
        variant_count: item.snippet.variantCount,
        tags: item.snippet.tags,
        source: item.snippet.sourceUrl,
        language: item.snippet.language,
        code: item.snippet.code,
        summary: item.snippet.summary,
        variants: include_variants ? item.snippet.variants : undefined,
        score: item.score,
      }));

      return {
        structuredContent: {
          search: {
            topic: topic ?? null,
            query: query ?? null,
            tag: tag ?? null,
            canonical_key: canonical_key ?? null,
            tier: tier ?? null,
            include_variants: include_variants ?? false,
          },
          examples,
        },
        content: [
          {
            type: "text",
            text:
              examples.length === 0
                ? "No Zoho CRM JavaScript SDK examples found for this query."
                : JSON.stringify(examples, null, 2),
          },
        ],
      };
    }
  );

  server.registerTool(
    "deluge_health",
    {
      title: "Deluge MCP Health",
      description: "Report runtime health, uptime, and knowledge base availability.",
      inputSchema: {
        verbose: z.boolean().optional(),
      },
    },
    async ({ verbose }) => {
      const uptimeMs = Date.now() - serverStartMs;
      const warnings: string[] = [];

      if (stats.raw_count === 0) {
        warnings.push("Knowledge base has zero snippets. Run ingest to populate data/processed/snippets.json.");
      }
      if (delugeCuration.schemaVersion === "unknown") {
        warnings.push("Deluge KB is not curated yet. Run npm run kb:deluge to populate schemaVersion deluge-kb/v1.");
      }
      if (delugeCuration.coverage.missingCanonicalKeys.length > 0) {
        warnings.push(
          `Deluge KB is missing required canonical keys: ${delugeCuration.coverage.missingCanonicalKeys.join(", ")}`
        );
      }
      if (zohoCrmJsKnowledge.snippets.length === 0) {
        warnings.push(
          "Zoho CRM JS SDK knowledge pack is empty. Run npm run kb:zoho-crm-js-sdk to populate data/processed/zoho-crm-js-sdk-snippets.json."
        );
      }

      const payload: Record<string, unknown> = {
        status: warnings.length === 0 ? "ok" : "degraded",
        server: {
          name: "deluge-mcp",
          version: SERVER_VERSION,
        },
        timestamp: new Date().toISOString(),
        uptime_ms: uptimeMs,
        knowledge: {
          snippet_count: stats.raw_count,
          deduped_count: stats.deduped_count,
          high_confidence_count: stats.high_confidence_count,
          topic_count: stats.topic_count,
          loaded: stats.raw_count > 0,
          source_file: stats.source_file,
          indexed_at: stats.indexed_at,
          index_version: stats.index_version,
          schema_version: delugeCuration.schemaVersion,
          canonical_index_count: delugeCuration.canonicalIndex.length,
          raw_units: delugeCuration.summary.rawUnits,
          merged_variants: delugeCuration.summary.mergedVariants,
          coverage_completion_ratio: delugeCuration.coverage.completionRatio,
          missing_required_keys: delugeCuration.coverage.missingCanonicalKeys,
          tier_counts: delugeCuration.coverage.tierCounts,
          zoho_crm_js_sdk: {
            snippet_count: zohoCrmJsKnowledge.snippets.length,
            topic_count: zohoCrmJsKnowledge.topics.length,
            loaded: zohoCrmJsKnowledge.snippets.length > 0,
            source_file: zohoCrmJsKnowledge.sourceFile,
            indexed_at: zohoCrmJsKnowledge.generatedAt,
            library_id: zohoCrmJsKnowledge.libraryId,
            schema_version: zohoCrmJsKnowledge.schemaVersion,
            canonical_index_count: zohoCrmJsKnowledge.canonicalIndex.length,
            raw_units: zohoCrmJsKnowledge.summary.rawUnits,
            merged_variants: zohoCrmJsKnowledge.summary.mergedVariants,
            coverage_completion_ratio: zohoCrmJsKnowledge.coverage.completionRatio,
            missing_required_keys: zohoCrmJsKnowledge.coverage.missingCanonicalKeys,
            tier_counts: zohoCrmJsKnowledge.coverage.tierCounts,
          },
        },
        warnings,
      };

      if (verbose) {
        payload.tools = [
          "deluge_health",
          "deluge_validate",
          "deluge_fix",
          "deluge_explain",
          "deluge_examples",
          "zoho_crm_js_examples",
        ];
        payload.resources = [
          "deluge://rules/v1",
          "deluge://cheatsheet/beginner",
          "deluge://topics/v1",
          "deluge://snippets/v1",
          "deluge://canonical-index/v1",
          "deluge://coverage/v1",
          "zoho://crm-js-sdk/snippets/v1",
          "zoho://crm-js-sdk/topics/v1",
          "zoho://crm-js-sdk/canonical-index/v1",
          "zoho://crm-js-sdk/coverage/v1",
        ];
        payload.top_topics = store.listTopics(10);
        payload.zoho_crm_js_topics = zohoCrmJsKnowledge.topics.slice(0, 10);
      }

      return {
        structuredContent: payload,
        content: [
          {
            type: "text",
            text: JSON.stringify(payload, null, 2),
          },
        ],
      };
    }
  );

  server.registerResource(
    "deluge-rules",
    "deluge://rules/v1",
    {
      title: "Deluge Rules v1",
      description: "Validation rules used by deluge-mcp.",
      mimeType: "application/json",
    },
    async () => {
      const body = JSON.stringify(getRulesResource(), null, 2);
      return {
        contents: [
          {
            uri: "deluge://rules/v1",
            mimeType: "application/json",
            text: body,
          },
        ],
      };
    }
  );

  server.registerResource(
    "deluge-topics",
    "deluge://topics/v1",
    {
      title: "Deluge Topics Index",
      description: "Indexed topics derived from the local curated Deluge knowledge base.",
      mimeType: "application/json",
    },
    async () => {
      const topics = store.listTopics(500);
      const curation = store.getCurationMetadata();
      const body = JSON.stringify(
        {
          version: "v1",
          schema_version: curation.schemaVersion,
          count: topics.length,
          topics,
        },
        null,
        2
      );
      return {
        contents: [
          {
            uri: "deluge://topics/v1",
            mimeType: "application/json",
            text: body,
          },
        ],
      };
    }
  );

  server.registerResource(
    "deluge-snippets",
    "deluge://snippets/v1",
    {
      title: "Deluge Snippets v1",
      description: "Deduplicated, curated Deluge snippets from data/processed/snippets.json.",
      mimeType: "application/json",
    },
    async () => {
      const snippets = store.allDeduped();
      const curation = store.getCurationMetadata();
      const body = JSON.stringify(
        {
          version: "v1",
          schema_version: curation.schemaVersion,
          generated_at: curation.generatedAt,
          count: snippets.length,
          snippets,
        },
        null,
        2
      );
      return {
        contents: [
          {
            uri: "deluge://snippets/v1",
            mimeType: "application/json",
            text: body,
          },
        ],
      };
    }
  );

  server.registerResource(
    "deluge-canonical-index",
    "deluge://canonical-index/v1",
    {
      title: "Deluge Canonical Index v1",
      description: "Canonical key index with version groups and merged variants for curated Deluge knowledge.",
      mimeType: "application/json",
    },
    async () => {
      const canonicalIndex = store.listCanonicalIndex(2000);
      const curation = store.getCurationMetadata();
      const body = JSON.stringify(
        {
          version: "v1",
          schema_version: curation.schemaVersion,
          source_file: stats.source_file,
          generated_at: curation.generatedAt,
          count: canonicalIndex.length,
          canonical_index: canonicalIndex,
        },
        null,
        2
      );
      return {
        contents: [
          {
            uri: "deluge://canonical-index/v1",
            mimeType: "application/json",
            text: body,
          },
        ],
      };
    }
  );

  server.registerResource(
    "deluge-coverage",
    "deluge://coverage/v1",
    {
      title: "Deluge Coverage v1",
      description: "Required canonical-key coverage status and curation tier distribution for Deluge knowledge.",
      mimeType: "application/json",
    },
    async () => {
      const curation = store.getCurationMetadata();
      const body = JSON.stringify(
        {
          version: "v1",
          schema_version: curation.schemaVersion,
          source_file: stats.source_file,
          generated_at: curation.generatedAt,
          coverage: curation.coverage,
          summary: curation.summary,
        },
        null,
        2
      );
      return {
        contents: [
          {
            uri: "deluge://coverage/v1",
            mimeType: "application/json",
            text: body,
          },
        ],
      };
    }
  );

  server.registerResource(
    "zoho-crm-js-snippets",
    "zoho://crm-js-sdk/snippets/v1",
    {
      title: "Zoho CRM JS SDK Snippets v1",
      description: "Curated Zoho CRM JavaScript SDK snippets from Context7-derived local data.",
      mimeType: "application/json",
    },
    async () => {
      const body = JSON.stringify(
        {
          version: "v1",
          library_id: zohoCrmJsKnowledge.libraryId,
          generated_at: zohoCrmJsKnowledge.generatedAt,
          source_file: zohoCrmJsKnowledge.sourceFile,
          count: zohoCrmJsKnowledge.snippets.length,
          snippets: zohoCrmJsKnowledge.snippets,
        },
        null,
        2
      );
      return {
        contents: [
          {
            uri: "zoho://crm-js-sdk/snippets/v1",
            mimeType: "application/json",
            text: body,
          },
        ],
      };
    }
  );

  server.registerResource(
    "zoho-crm-js-topics",
    "zoho://crm-js-sdk/topics/v1",
    {
      title: "Zoho CRM JS SDK Topics v1",
      description: "Topic index for the local Zoho CRM JavaScript SDK knowledge pack.",
      mimeType: "application/json",
    },
    async () => {
      const body = JSON.stringify(
        {
          version: "v1",
          library_id: zohoCrmJsKnowledge.libraryId,
          count: zohoCrmJsKnowledge.topics.length,
          topics: zohoCrmJsKnowledge.topics,
        },
        null,
        2
      );
      return {
        contents: [
          {
            uri: "zoho://crm-js-sdk/topics/v1",
            mimeType: "application/json",
            text: body,
          },
        ],
      };
    }
  );

  server.registerResource(
    "zoho-crm-js-canonical-index",
    "zoho://crm-js-sdk/canonical-index/v1",
    {
      title: "Zoho CRM JS SDK Canonical Index v1",
      description: "Canonical key index with version groups and merged variants for Zoho CRM JS SDK knowledge.",
      mimeType: "application/json",
    },
    async () => {
      const body = JSON.stringify(
        {
          version: "v1",
          schema_version: zohoCrmJsKnowledge.schemaVersion,
          library_id: zohoCrmJsKnowledge.libraryId,
          count: zohoCrmJsKnowledge.canonicalIndex.length,
          canonical_index: zohoCrmJsKnowledge.canonicalIndex,
        },
        null,
        2
      );
      return {
        contents: [
          {
            uri: "zoho://crm-js-sdk/canonical-index/v1",
            mimeType: "application/json",
            text: body,
          },
        ],
      };
    }
  );

  server.registerResource(
    "zoho-crm-js-coverage",
    "zoho://crm-js-sdk/coverage/v1",
    {
      title: "Zoho CRM JS SDK Coverage v1",
      description: "Required canonical-key coverage status and curation tier distribution.",
      mimeType: "application/json",
    },
    async () => {
      const body = JSON.stringify(
        {
          version: "v1",
          schema_version: zohoCrmJsKnowledge.schemaVersion,
          library_id: zohoCrmJsKnowledge.libraryId,
          coverage: zohoCrmJsKnowledge.coverage,
          summary: zohoCrmJsKnowledge.summary,
        },
        null,
        2
      );
      return {
        contents: [
          {
            uri: "zoho://crm-js-sdk/coverage/v1",
            mimeType: "application/json",
            text: body,
          },
        ],
      };
    }
  );

  server.registerResource(
    "deluge-cheatsheet",
    "deluge://cheatsheet/beginner",
    {
      title: "Deluge Beginner Cheatsheet",
      description: "Short Deluge syntax cheatsheet for non-programmers.",
      mimeType: "text/plain",
    },
    async () => {
      return {
        contents: [
          {
            uri: "deluge://cheatsheet/beginner",
            mimeType: "text/plain",
            text: getBeginnerCheatsheet(),
          },
        ],
      };
    }
  );

  return server;
}

interface ZohoCrmJsSnippet {
  id: string;
  snippetId?: string;
  topic: string;
  canonicalKey: string;
  apiFamily: string;
  operation: string;
  version: string;
  stability: "stable" | "beta" | "unknown";
  requiresScopes: string[];
  requiresModule: string | null;
  sampleVsReference: "sample" | "reference";
  confidence: number;
  tier: "A" | "B" | "C";
  title: string;
  sourceUrl: string;
  sourceTitle: string;
  language: string;
  code: string;
  codeFingerprint: string;
  summary: string;
  tags: string[];
  qualityScore: number;
  sourceAllowlisted: boolean;
  ingestedAt: string;
  variantCount?: number;
  variants?: Array<{
    id: string;
    title: string;
    sourceUrl: string;
    language: string;
    sampleVsReference: "sample" | "reference";
    confidence: number;
    tier: "A" | "B" | "C";
  }>;
}

interface ZohoCrmJsCanonicalIndexItem {
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
  requiresScopes: string[];
  sampleTypes: string[];
}

interface ZohoCoverage {
  requiredCanonicalKeys: string[];
  presentCanonicalKeys: string[];
  missingCanonicalKeys: string[];
  completionRatio: number;
  tierCounts: Record<string, number>;
}

interface ZohoSummary {
  inputSections: number;
  rawUnits: number;
  keptSnippets: number;
  mergedVariants: number;
  rejected: {
    sourceNotAllowed: number;
    noCode: number;
    nonCodeLanguage: number;
    noisy: number;
    duplicate: number;
  };
}

interface ZohoCrmJsKnowledge {
  sourceFile: string;
  generatedAt: string;
  libraryId: string;
  schemaVersion: string;
  snippets: ZohoCrmJsSnippet[];
  canonicalIndex: ZohoCrmJsCanonicalIndexItem[];
  coverage: ZohoCoverage;
  summary: ZohoSummary;
  topics: Array<{ topic: string; count: number }>;
}

async function loadZohoCrmJsKnowledge(
  filePath = "data/processed/zoho-crm-js-sdk-snippets.json"
): Promise<ZohoCrmJsKnowledge> {
  try {
    const raw = JSON.parse(await fs.readFile(filePath, "utf8")) as {
      generatedAt?: string;
      libraryId?: string;
      schemaVersion?: string;
      snippets?: ZohoCrmJsSnippet[];
      canonicalIndex?: ZohoCrmJsCanonicalIndexItem[];
      coverage?: ZohoCoverage;
      summary?: ZohoSummary;
    };
    const snippets = Array.isArray(raw.snippets) ? raw.snippets : [];
    const canonicalIndex = Array.isArray(raw.canonicalIndex) ? raw.canonicalIndex : [];
    const fallbackSummary: ZohoSummary = {
      inputSections: 0,
      rawUnits: snippets.length,
      keptSnippets: snippets.length,
      mergedVariants: 0,
      rejected: {
        sourceNotAllowed: 0,
        noCode: 0,
        nonCodeLanguage: 0,
        noisy: 0,
        duplicate: 0,
      },
    };
    const fallbackCoverage: ZohoCoverage = {
      requiredCanonicalKeys: [],
      presentCanonicalKeys: [...new Set(snippets.map((snippet) => snippet.canonicalKey).filter(Boolean))],
      missingCanonicalKeys: [],
      completionRatio: 1,
      tierCounts: countByTier(snippets),
    };
    return {
      sourceFile: filePath,
      generatedAt: raw.generatedAt ?? "",
      libraryId: raw.libraryId ?? "unknown",
      schemaVersion: raw.schemaVersion ?? "unknown",
      snippets,
      canonicalIndex,
      coverage: raw.coverage ?? fallbackCoverage,
      summary: raw.summary ?? fallbackSummary,
      topics: buildZohoTopicIndex(snippets),
    };
  } catch {
    return {
      sourceFile: filePath,
      generatedAt: "",
      libraryId: "unknown",
      schemaVersion: "unknown",
      snippets: [],
      canonicalIndex: [],
      coverage: {
        requiredCanonicalKeys: [],
        presentCanonicalKeys: [],
        missingCanonicalKeys: [],
        completionRatio: 0,
        tierCounts: {},
      },
      summary: {
        inputSections: 0,
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
      },
      topics: [],
    };
  }
}

function buildZohoTopicIndex(snippets: ZohoCrmJsSnippet[]): Array<{ topic: string; count: number }> {
  const grouped = new Map<string, number>();
  for (const snippet of snippets) {
    const topic = (snippet.canonicalKey || snippet.topic || "general:usage").toLowerCase();
    grouped.set(topic, (grouped.get(topic) ?? 0) + 1);
  }
  return [...grouped.entries()]
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count || a.topic.localeCompare(b.topic));
}

function searchZohoCrmJsSnippets(
  snippets: ZohoCrmJsSnippet[],
  input: {
    topic?: string;
    query?: string;
    tag?: string;
    canonicalKey?: string;
    tier?: "A" | "B" | "C";
    includeVariants?: boolean;
    maxResults: number;
  }
): Array<{ snippet: ZohoCrmJsSnippet; score: number }> {
  const topicNeedle = (input.topic ?? "").trim().toLowerCase();
  const query = (input.query ?? "").trim().toLowerCase();
  const queryTokens = tokenize(query, 2);
  const tagNeedle = (input.tag ?? "").trim().toLowerCase();
  const canonicalKeyNeedle = (input.canonicalKey ?? "").trim().toLowerCase();
  const requestedTier = (input.tier ?? "").trim().toUpperCase();
  const includeVariants = input.includeVariants ?? false;
  const maxResults = Math.max(1, Math.min(input.maxResults, 20));

  return snippets
    .filter((snippet) => !tagNeedle || snippet.tags.some((tag) => tag.toLowerCase() === tagNeedle))
    .filter((snippet) => !canonicalKeyNeedle || (snippet.canonicalKey ?? "").toLowerCase().includes(canonicalKeyNeedle))
    .filter((snippet) => !requestedTier || snippet.tier === requestedTier)
    .map((snippet) => {
      let score = snippet.qualityScore;
      const title = snippet.title.toLowerCase();
      const topic = snippet.topic.toLowerCase();
      const canonical = (snippet.canonicalKey ?? "").toLowerCase();
      const textTokens = tokenize(
        `${snippet.title} ${snippet.topic} ${snippet.canonicalKey} ${snippet.code} ${snippet.tags.join(" ")}`
      );

      if (topicNeedle) {
        if (topic.includes(topicNeedle)) {
          score += 5;
        }
        if (title.includes(topicNeedle)) {
          score += 2;
        }
        if (canonical.includes(topicNeedle)) {
          score += 4;
        }
      }

      if (query) {
        if (title.includes(query) || snippet.code.toLowerCase().includes(query)) {
          score += 2;
        }
        score += overlapScore(queryTokens, textTokens, "ratio") * 1.25;
      }

      if (!topicNeedle && !query && !tagNeedle) {
        score += 0.25;
      }
      if (snippet.tier === "A") {
        score += 0.3;
      } else if (snippet.tier === "B") {
        score += 0.1;
      }
      if (includeVariants && (snippet.variantCount ?? 0) > 0) {
        score += 0.2;
      }

      return {
        snippet,
        score,
      };
    })
    .sort((a, b) => b.score - a.score || b.snippet.qualityScore - a.snippet.qualityScore)
    .slice(0, maxResults);
}

function countByTier(snippets: ZohoCrmJsSnippet[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const snippet of snippets) {
    const tier = snippet.tier ?? "unknown";
    counts[tier] = (counts[tier] ?? 0) + 1;
  }
  return counts;
}

async function main(): Promise<void> {
  const server = await createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  process.stdin.resume();
  // Keep process alive for stdio clients; handle graceful shutdown on signals.
  const keepAlive = setInterval(() => {}, 1 << 30);
  let shuttingDown = false;
  const shutdown = async () => {
    if (shuttingDown) {
      return;
    }
    shuttingDown = true;
    clearInterval(keepAlive);
    await transport.close();
    process.exit(0);
  };
  process.once("SIGTERM", () => {
    void shutdown();
  });
  process.once("SIGINT", () => {
    void shutdown();
  });
}

function isDirectRun(): boolean {
  const entry = process.argv[1];
  if (!entry) {
    return false;
  }
  const entryUrl = pathToFileURL(path.resolve(entry)).href;
  return import.meta.url === entryUrl;
}

if (isDirectRun()) {
  main().catch((error: unknown) => {
    const message = error instanceof Error ? (error.stack ?? error.message) : String(error);
    process.stderr.write(`${message}\n`);
    process.exit(1);
  });
}
