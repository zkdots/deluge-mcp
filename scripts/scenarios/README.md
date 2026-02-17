# MCP Smoke Matrix Scenarios

Scenarios define reusable MCP validation flows for this server.

## Run

Default scenario:

```bash
npm run smoke:matrix
```

Run via stdio transport:

```bash
npm run smoke:matrix:stdio
```

Run a custom scenario file:

```bash
npm run build
node scripts/smoke-matrix.mjs --scenario scripts/scenarios/my-scenario.json
```

## File Format

Top-level fields:

- `name`: scenario name
- `requiredTools`: tool names that must exist
- `requiredResources`: resource URIs that must be readable
- `steps`: ordered checks

Each step must be one of:

- Tool step:
  - `type`: `"tool"`
  - `name`: label in output
  - `tool`: tool name
  - `args`: tool arguments
  - `assert`:
    - `isError`: boolean
    - `structuredHasKeys`: list of keys in `structuredContent`
    - `structuredPathEqualsOneOf`: list of `{ "path": "...", "oneOf": [...] }`
    - `textIncludes`: list of strings that must appear in text content
- Resource step:
  - `type`: `"resource"`
  - `name`: label in output
  - `uri`: resource URI
  - `assert`:
    - `resourceTextIncludes`: list of strings that must appear in resource text

Use `default-smoke.json` as the baseline template.
