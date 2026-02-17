import fs from "node:fs/promises";
import path from "node:path";
import { parseContext7Markdown } from "./parser.js";
import { sanitizeSectionsStrict } from "./sanitize.js";

async function main(): Promise<void> {
  const inputPath = process.argv[2] ?? "data/raw/context7.md";
  const outPath = process.argv[3] ?? "data/processed/snippets.json";

  const markdown = await fs.readFile(inputPath, "utf8");
  const sections = parseContext7Markdown(markdown);
  const { snippets, summary } = sanitizeSectionsStrict(sections);

  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(
    outPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        policy: {
          host: "www.zoho.com",
          pathPrefix: "/deluge/help/",
          strictAllowlist: true,
        },
        summary,
        snippets,
      },
      null,
      2
    ),
    "utf8"
  );

  process.stdout.write(`Ingest complete: ${snippets.length} snippets written to ${outPath}\n`);
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`Ingestion failed: ${message}\n`);
  process.exit(1);
});
