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
  - `deluge://topics/v1`

## Setup

```bash
npm install
```

Install git hooks (usually auto-run via `prepare` on install):

```bash
npm run prepare
```

## Project Governance

Repository policy and contribution docs:

- `CONTRIBUTING.md`
- `CONTRIBUTORS.md`
- `SECURITY.md`

GitHub metadata files:

- `.github/CODEOWNERS`
- `.github/pull_request_template.md`
- `.github/ISSUE_TEMPLATE/*`
- `.github/dependabot.yml`
- `.github/labels.json`

## Code Quality Automation

This repo uses Biome + lint-staged + Husky:

- Pre-commit hook runs on staged `*.ts|*.tsx|*.js|*.mjs|*.cjs`
- Each staged file is linted and auto-formatted via `biome check --write`

Manual commands:

```bash
npm run lint
npm run lint:fix
npm run format
```

Single command for the stable full suite:

```bash
npm run verify
```

Full suite including stdio checks:

```bash
npm run verify:full
```

Sync GitHub labels from repo config:

```bash
npm run labels:sync
```

## Release

This repo includes a release helper with flags:

```bash
npm run release -- --help
```

Common release commands:

```bash
npm run release:patch
npm run release:minor
npm run release:major
npm run release:alpha
npm run release:beta
npm run release:rc
```

Flag-based examples:

```bash
npm run release -- --type prerelease --preid beta
npm run release -- --type minor --no-push
npm run release -- --type patch --skip-verify
npm run release -- --type patch --dry-run
```

Supported flags:

- `--type <patch|minor|major|prerelease>`
- `--preid <alpha|beta|rc|...>` (used with `--type prerelease`)
- `--skip-verify` (skip `npm run verify`)
- `--no-push` (create version commit/tag locally only)
- `--allow-dirty` (allow release on dirty working tree)
- `--remote <name>` (default `origin`)
- `--dry-run` (print planned commands only)

Notes:

- Release flow runs `npm version ...` (creates commit + tag), then pushes branch and tags.
- This package is marked `"private": true`, so this flow manages git versions/tags, not npm publish.

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

Retrieval quality scenario:

```bash
npm run smoke:retrieval
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
