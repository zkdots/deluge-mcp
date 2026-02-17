import type { FixChange } from "../types.js";

export function fixDeluge(
  code: string,
  style: "minimal-change" | "readable" = "minimal-change"
): { fixedCode: string; changes: FixChange[] } {
  const lines = code.split(/\r?\n/);
  const changes: FixChange[] = [];

  const updated = lines.map((line) => {
    let next = line;

    const trimmed = next.trim();
    if (!trimmed || trimmed.startsWith("//") || trimmed.endsWith("{") || trimmed.endsWith("}")) {
      return next;
    }

    if (/^(if|else if|else|for each|try|catch)\b/.test(trimmed)) {
      return next;
    }

    if (!trimmed.endsWith(";")) {
      const before = next;
      next = `${next.trimEnd()};`;
      changes.push({ before, after: next, reason: "Added missing semicolon." });
    }

    if (style === "readable" && /\t/.test(next)) {
      const before = next;
      next = next.replace(/\t/g, "    ");
      changes.push({ before, after: next, reason: "Replaced tabs with spaces for readability." });
    }

    return next;
  });

  const fixedCode = closeUnmatchedBraces(updated.join("\n"), changes);
  return { fixedCode, changes };
}

function closeUnmatchedBraces(code: string, changes: FixChange[]): string {
  const open = (code.match(/\{/g) ?? []).length;
  const close = (code.match(/\}/g) ?? []).length;

  if (open <= close) {
    return code;
  }

  const missing = open - close;
  let fixed = code;
  for (let i = 0; i < missing; i += 1) {
    fixed += "\n}";
  }

  changes.push({
    before: "<eof>",
    after: "}".repeat(missing),
    reason: "Added missing closing brace(s).",
  });

  return fixed;
}
