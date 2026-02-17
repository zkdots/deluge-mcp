import fs from "node:fs/promises";
import path from "node:path";
import type { ProcessedSnippet } from "../types.js";

interface SnippetFile {
  snippets: ProcessedSnippet[];
}

export class KnowledgeStore {
  private snippets: ProcessedSnippet[] = [];

  async load(filePath = "data/processed/snippets.json"): Promise<void> {
    const absolute = path.resolve(filePath);
    try {
      const payload = JSON.parse(await fs.readFile(absolute, "utf8")) as SnippetFile;
      this.snippets = Array.isArray(payload.snippets) ? payload.snippets : [];
    } catch {
      this.snippets = [];
    }
  }

  all(): ProcessedSnippet[] {
    return this.snippets;
  }

  findByTopic(topic: string, limit = 5): ProcessedSnippet[] {
    const normalized = topic.trim().toLowerCase();
    return this.snippets
      .filter((s) => s.qualityScore >= 0.7)
      .filter(
        (s) =>
          s.topic.toLowerCase().includes(normalized) ||
          s.functionName.toLowerCase().includes(normalized) ||
          s.title.toLowerCase().includes(normalized)
      )
      .slice(0, limit);
  }

  findRelatedByCode(code: string, limit = 3): ProcessedSnippet[] {
    const tokens = tokenize(code);
    if (tokens.length === 0) {
      return [];
    }

    const ranked = this.snippets
      .filter((s) => s.qualityScore >= 0.7)
      .map((snippet) => ({ snippet, score: overlapScore(tokens, tokenize(snippet.code + " " + snippet.title)) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.snippet);

    return ranked;
  }
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
