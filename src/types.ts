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
  topic: string;
  functionName: string;
  title: string;
  sourceUrl: string;
  sourceTitle: string;
  code: string;
  explanation: string;
  qualityScore: number;
  flags: string[];
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
