export interface ParsedCodeBlock {
  language: string;
  code: string;
}

export interface ParsedSection {
  title: string;
  sourceUrl?: string;
  rawBody: string;
  codeBlocks: ParsedCodeBlock[];
}

export interface ProcessedSnippet {
  id: string;
  snippetId?: string;
  topic: string;
  normalizedTopic?: string;
  functionName: string;
  functionAliases?: string[];
  serviceScope?: string;
  title: string;
  sourceUrl: string;
  sourceTitle: string;
  code: string;
  codeFingerprint?: string;
  explanation: string;
  qualityScore: number;
  flags: string[];
  qualityFlags?: string[];
  sourceAllowlisted?: boolean;
  ingestedAt: string;
}

export interface IngestionSummary {
  inputSections: number;
  keptSnippets: number;
  rejected: {
    sourceNotAllowed: number;
    noCode: number;
    notDelugeLike: number;
    noisy: number;
    duplicate: number;
  };
}

export interface Diagnostic {
  [key: string]: unknown;
  line?: number;
  message: string;
  ruleId: string;
  severity: "error" | "warning";
}

export interface ValidationResult {
  [key: string]: unknown;
  valid: boolean;
  errors: Diagnostic[];
  warnings: Diagnostic[];
}

export interface FixChange {
  [key: string]: unknown;
  before: string;
  after: string;
  reason: string;
}

export interface ExampleSearchInput {
  topic?: string;
  query?: string;
  maxResults?: number;
  serviceScope?: string;
  requireSourceAllowlist?: boolean;
  includeMatchDebug?: boolean;
}

export interface ExampleSearchMatch {
  snippet: ProcessedSnippet;
  score: number;
  matchReasons: string[];
  sourceConfidence: "high" | "medium";
  dedupeGroup?: string;
  debug?: Record<string, unknown>;
}

export interface TopicIndexItem {
  normalizedTopic: string;
  functionName: string;
  serviceScope: string;
  count: number;
}
