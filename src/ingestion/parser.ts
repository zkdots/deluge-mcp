import type { ParsedCodeBlock, ParsedSection } from "../types.js";

export function parseContext7Markdown(markdown: string): ParsedSection[] {
  const lines = markdown.split(/\r?\n/);
  const sections: ParsedSection[] = [];

  let currentTitle = "";
  let bodyLines: string[] = [];

  const flushSection = () => {
    if (!currentTitle) {
      return;
    }
    const rawBody = bodyLines.join("\n").trim();
    const sourceMatch = rawBody.match(/Source:\s*(https?:\/\/\S+)/i);
    const codeBlocks = extractCodeBlocks(rawBody);
    sections.push({
      title: currentTitle,
      sourceUrl: sourceMatch?.[1],
      rawBody,
      codeBlocks,
    });
  };

  for (const line of lines) {
    if (line.startsWith("### ")) {
      flushSection();
      currentTitle = line.replace(/^###\s+/, "").trim();
      bodyLines = [];
      continue;
    }
    if (!currentTitle) {
      continue;
    }
    bodyLines.push(line);
  }

  flushSection();
  return sections;
}

function extractCodeBlocks(rawBody: string): ParsedCodeBlock[] {
  const codeBlocks: ParsedCodeBlock[] = [];
  const regex = /```([^\n]*)\n([\s\S]*?)```/g;
  while (true) {
    const match = regex.exec(rawBody);
    if (match === null) {
      break;
    }
    codeBlocks.push({
      language: (match[1] || "").trim().toLowerCase(),
      code: match[2].trim(),
    });
  }

  return codeBlocks;
}
