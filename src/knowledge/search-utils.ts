export function tokenize(input: string, minimumTokenLength = 2): string[] {
  const normalized = input
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, " ")
    .trim();

  if (!normalized) {
    return [];
  }

  return normalized.split(/\s+/).filter((token) => token.length >= minimumTokenLength);
}

export function overlapScore(source: string[], target: string[], mode: "count" | "ratio" = "count"): number {
  if (source.length === 0 || target.length === 0) {
    return 0;
  }

  const targetSet = new Set(target);
  let hits = 0;
  for (const token of source) {
    if (targetSet.has(token)) {
      hits += 1;
    }
  }

  if (mode === "ratio") {
    return hits / source.length;
  }

  return hits;
}
