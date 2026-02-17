import { ValidationResult } from "../types.js";

export function explainDeluge(code: string, validation: ValidationResult): { summary: string; lineByLine: string[]; keyRules: string[] } {
  const lineByLine = code
    .split(/\r?\n/)
    .map((line, idx) => `L${idx + 1}: ${line.trim() || "(blank)"}`)
    .slice(0, 30);

  const keyRules = [
    "Keep delimiters balanced: (), {}, []",
    "Use explicit semicolons for consistency",
    "Treat map keys as case-sensitive",
    "Verify list indexes before using get(index)",
    "Use `info` for simple debug output"
  ];

  const summary = validation.valid
    ? "The snippet is syntactically valid under current checks."
    : `The snippet has ${validation.errors.length} error(s) and ${validation.warnings.length} warning(s).`;

  return {
    summary,
    lineByLine,
    keyRules
  };
}
