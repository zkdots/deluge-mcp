# Contributing

Thanks for contributing to `deluge-mcp`.

## Development Flow

1. Create a branch from `main`.
2. Make changes in small commits.
3. Ensure local quality gates pass:

```bash
npm run verify
```

4. Open a Pull Request targeting `main`.
5. Resolve review comments/conversations.
6. Merge via PR.

## Local Quality Gates

- Pre-commit runs lint+format on staged JS/TS files using Biome.
- Run manually when needed:

```bash
npm run lint
npm run lint:fix
npm run format
npm run verify
```

## Release Policy (SemVer)

Use the release helper and semantic versioning:

- `patch`: bug fixes and small non-breaking corrections.
- `minor`: backward-compatible features and improvements.
- `major`: breaking changes.
- `prerelease` (`alpha`, `beta`, `rc`): testing releases before stable.

Examples:

```bash
npm run release:patch
npm run release:minor
npm run release:major
npm run release:beta
```

For custom flags:

```bash
npm run release -- --help
```

## Labels and Triage

Base labels used in this repo:

- `bug`
- `enhancement`
- `documentation`
- `ci`
- `security`
- `good first issue`
- `blocked`

To sync labels from repo config:

```bash
npm run labels:sync
```

Requires GitHub CLI (`gh`) authenticated for this repository.
