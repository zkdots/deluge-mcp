import type { Diagnostic, ValidationResult } from "../types.js";

export function validateDeluge(code: string, strict = true): ValidationResult {
  const diagnostics: Diagnostic[] = [];
  const lines = code.split(/\r?\n/);

  checkBalance(code, diagnostics);
  checkLiteralGetBounds(lines, diagnostics);
  checkLikelyTypos(lines, diagnostics);

  if (strict) {
    checkSemicolonStyle(lines, diagnostics);
  }

  const errors = diagnostics.filter((d) => d.severity === "error");
  const warnings = diagnostics.filter((d) => d.severity === "warning");

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

function checkBalance(code: string, diagnostics: Diagnostic[]): void {
  const pairs: Record<string, string> = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  const openings = new Set(Object.values(pairs));
  const stack: Array<{ ch: string; index: number }> = [];
  let inString = false;

  for (let i = 0; i < code.length; i += 1) {
    const ch = code[i];

    if (ch === '"' && code[i - 1] !== "\\") {
      inString = !inString;
      continue;
    }

    if (inString) {
      continue;
    }

    if (openings.has(ch)) {
      stack.push({ ch, index: i });
      continue;
    }

    if (pairs[ch]) {
      const last = stack.at(-1);
      if (!last || last.ch !== pairs[ch]) {
        diagnostics.push({
          message: `Unmatched '${ch}' detected.`,
          ruleId: "syntax.unmatched_delimiter",
          severity: "error",
        });
        return;
      }
      stack.pop();
    }
  }

  if (inString) {
    diagnostics.push({
      message: "Unclosed string literal detected.",
      ruleId: "syntax.unclosed_string",
      severity: "error",
    });
  }

  if (stack.length > 0) {
    diagnostics.push({
      message: `Unclosed delimiter '${stack[stack.length - 1].ch}' detected.`,
      ruleId: "syntax.unclosed_delimiter",
      severity: "error",
    });
  }
}

function checkLiteralGetBounds(lines: string[], diagnostics: Diagnostic[]): void {
  const listSizes = new Map<string, number>();

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();
    const assignment = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*\{(.+)\}\s*;?$/);
    if (assignment) {
      const varName = assignment[1];
      const body = assignment[2];
      const count = splitTopLevel(body).length;
      if (count > 0) {
        listSizes.set(varName, count);
      }
    }

    const getCall = line.match(/([A-Za-z_][A-Za-z0-9_]*)\.get\((\d+)\)/);
    if (getCall) {
      const varName = getCall[1];
      const idx = Number(getCall[2]);
      const size = listSizes.get(varName);
      if (size !== undefined && idx >= size) {
        diagnostics.push({
          line: i + 1,
          message: `Index ${idx} may exceed list size ${size - 1} for '${varName}'.`,
          ruleId: "runtime.index_out_of_bounds",
          severity: "error",
        });
      }
    }
  }
}

function checkLikelyTypos(lines: string[], diagnostics: Diagnostic[]): void {
  const typoPatterns: Array<{ re: RegExp; msg: string; ruleId: string }> = [
    {
      re: /\bfor\s+each\w+/i,
      msg: "Likely missing space in 'for each' loop declaration.",
      ruleId: "syntax.for_each_spacing",
    },
    { re: /\bif\s*\([^)]*$/i, msg: "Likely incomplete if-condition.", ruleId: "syntax.if_incomplete" },
  ];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    for (const typo of typoPatterns) {
      if (typo.re.test(line)) {
        diagnostics.push({
          line: i + 1,
          message: typo.msg,
          ruleId: typo.ruleId,
          severity: "warning",
        });
      }
    }
  }
}

function checkSemicolonStyle(lines: string[], diagnostics: Diagnostic[]): void {
  for (let i = 0; i < lines.length; i += 1) {
    const raw = lines[i];
    const line = raw.trim();
    if (!line || line.startsWith("//") || line.endsWith("{") || line.endsWith("}") || line.endsWith(";")) {
      continue;
    }

    if (/^(if|else if|else|for each|try|catch)\b/.test(line)) {
      continue;
    }

    diagnostics.push({
      line: i + 1,
      message: "Missing semicolon for consistency with Deluge examples.",
      ruleId: "style.semicolon",
      severity: "warning",
    });
  }
}

function splitTopLevel(body: string): string[] {
  const out: string[] = [];
  let current = "";
  let depth = 0;
  let inString = false;

  for (let i = 0; i < body.length; i += 1) {
    const ch = body[i];
    if (ch === '"' && body[i - 1] !== "\\") {
      inString = !inString;
    }

    if (!inString) {
      if (ch === "{" || ch === "[" || ch === "(") {
        depth += 1;
      } else if (ch === "}" || ch === "]" || ch === ")") {
        depth = Math.max(0, depth - 1);
      } else if (ch === "," && depth === 0) {
        if (current.trim()) {
          out.push(current.trim());
        }
        current = "";
        continue;
      }
    }

    current += ch;
  }

  if (current.trim()) {
    out.push(current.trim());
  }

  return out;
}
