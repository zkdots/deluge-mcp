# deluge-mcp

A strict, beginner-friendly MCP server for Deluge syntax support.

## Features

- Strict source curation (`www.zoho.com/deluge/help/**` only)
- Corrupt/noisy snippet rejection
- Tooling for:
  - `deluge_health`
  - `deluge_explain`
  - `deluge_validate`
  - `deluge_fix`
  - `deluge_examples`
- MCP resources:
  - `deluge://rules/v1`
  - `deluge://cheatsheet/beginner`

## Setup

```bash
npm install
```

## Ingest Context Data

Place your Context7 export in `data/raw/context7.md` and run:

```bash
npm run ingest -- data/raw/context7.md
```

Output is written to `data/processed/snippets.json`.

One-click helper:

```bash
npm run ingest:oneclick -- data/raw/context7.md data/processed/snippets.json
```

## Run Server

```bash
npm run dev
```

or

```bash
npm run build && npm start
```

## Smoke Tests

Primary smoke (in-memory MCP client/server):

```bash
npm run smoke
```

Optional stdio smoke (environment-dependent):

```bash
npm run smoke:stdio
```

Matrix smoke (extensible scenario-based checks):

```bash
npm run smoke:matrix
```

Matrix smoke over stdio:

```bash
npm run smoke:matrix:stdio
```

Deep stdio diagnosis (pinpoints failing step):

```bash
npm run diagnose:stdio
```

Diagnose against a specific cwd/timeout:

```bash
npm run diagnose:stdio -- --cwd /absolute/path/to/project --timeout 180000
```

Diagnose an MCP config that starts with npm:

```bash
npm run diagnose:stdio -- --command npm --args-json '["run","dev"]' --cwd /absolute/path/to/project
```

Run a custom scenario file:

```bash
npm run build
node scripts/smoke-matrix.mjs --scenario scripts/scenarios/default-smoke.json
```

Local test shortcut (runs stdio smoke):

```bash
npm run test:local
```

Run both core smoke and matrix smoke:

```bash
npm run test:mcp
```

## Example MCP client config (stdio)

```json
{
  "mcpServers": {
    "deluge": {
      "command": "node",
      "args": ["/absolute/path/to/deluge-mcp/dist/src/index.js"]
    }
  }
}
```

## Troubleshooting

If you see `ENOENT` or `Could not read package.json`, your MCP client is running the command in the wrong working directory.

- If using `npm run dev`, set the MCP server `cwd` to this repo root.
- For a portable setup, prefer direct node command:

```json
{
  "mcpServers": {
    "deluge": {
      "command": "node",
      "args": ["/absolute/path/to/deluge-mcp/dist/src/index.js"]
    }
  }
}
```
