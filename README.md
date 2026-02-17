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

Local test shortcut (runs stdio smoke):

```bash
npm run test:local
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
