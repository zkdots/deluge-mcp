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
  - `zoho_crm_js_examples`
- MCP resources:
  - `deluge://rules/v1`
  - `deluge://cheatsheet/beginner`
  - `deluge://topics/v1`
  - `deluge://snippets/v1`
  - `deluge://canonical-index/v1`
  - `deluge://coverage/v1`
  - `zoho://crm-js-sdk/snippets/v1`
  - `zoho://crm-js-sdk/topics/v1`
  - `zoho://crm-js-sdk/canonical-index/v1`
  - `zoho://crm-js-sdk/coverage/v1`

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

Build/refresh curated Deluge KB metadata (canonical index, tiers, coverage):

```bash
npm run kb:deluge
```

One-click helper:

```bash
npm run ingest:oneclick -- data/raw/context7.md data/processed/snippets.json
```

After ingest, re-apply Deluge curation:

```bash
npm run kb:deluge
```

## Deluge Knowledge Curation

Schema: `deluge-kb/v1`

Curated Deluge snippets include:

- `canonicalKey` (`api_family.operation`)
- `apiFamily`, `operation`
- `version`, `stability`
- `requiresScopes`, `requiresModule`
- `sampleVsReference`
- `confidence` and `tier` (`A|B|C`)
- `variants` (merged alternates)

Tier policy:

- `A`: high-confidence production-safe references
- `B`: standard examples and usage patterns
- `C`: risky/error-path or lower-confidence references

Commands:

```bash
npm run kb:deluge
npm run kb:deluge:refresh
npm run kb:deluge:refresh:allow-tier-a
npm run kb:deluge:diff
```

## Zoho CRM JS SDK Knowledge Pack (Context7)

The repo includes a curated knowledge pack for Context7 library:

- Library ID: `/zoho/zohocrm-javascript-sdk-8.0`
- Raw seed file: `data/raw/zoho-crm-js-sdk-context7.md`
- Processed output: `data/processed/zoho-crm-js-sdk-snippets.json`
- Diff reports:
  - `data/reports/zoho-crm-js-sdk-diff-report.json`
  - `data/reports/zoho-crm-js-sdk-diff-report.md`

### Curation Model

Schema: `zoho-crm-js-sdk-kb/v1`

Each canonical snippet includes:

- `canonicalKey` (`api_family.operation`)
- `apiFamily`, `operation`
- `version`, `stability`
- `requiresScopes`, `requiresModule`
- `sampleVsReference`
- `confidence` and `tier` (`A|B|C`)
- `variants` (merged alternates)

Tier policy:

- `A`: production-safe reference patterns
- `B`: sample/demo usage
- `C`: structural reference fragments (APIDOC-heavy)

Build the pack:

```bash
npm run kb:zoho-crm-js-sdk
```

Refresh + diff + manual-review gate:

```bash
npm run kb:zoho-crm-js-sdk:refresh
```

Allow Tier A promotions after human review:

```bash
npm run kb:zoho-crm-js-sdk:refresh:allow-tier-a
```

Run diff only:

```bash
npm run kb:zoho-crm-js-sdk:diff
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

Zoho retrieval quality scenario:

```bash
npm run smoke:zoho-retrieval
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
