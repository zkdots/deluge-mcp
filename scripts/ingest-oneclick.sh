#!/usr/bin/env bash
set -euo pipefail

INPUT_PATH="${1:-data/raw/context7.md}"
OUTPUT_PATH="${2:-data/processed/snippets.json}"

if [[ ! -f "$INPUT_PATH" ]]; then
  echo "Input file not found: $INPUT_PATH" >&2
  exit 1
fi

npm run build >/dev/null
node dist/src/ingestion/cli.js "$INPUT_PATH" "$OUTPUT_PATH"

node -e 'const fs=require("fs");const p=process.argv[1];const j=JSON.parse(fs.readFileSync(p,"utf8"));console.log(`Summary: sections=${j.summary.inputSections}, kept=${j.summary.keptSnippets}, rejected=${JSON.stringify(j.summary.rejected)}`);' "$OUTPUT_PATH"
