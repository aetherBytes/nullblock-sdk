# Changelog

All notable changes to the NullBlock SDK are tracked here.

The SDK and the NullBlock wire contract (`schemas/openapi.yaml`) are
versioned independently. SDK version tracks client-code changes;
schema version tracks the wire contract. See `schemas/README.md`.

## 0.2.1 — 2026-05-13

Wire contract is now an explicit, versioned schema layer.

### Added

- **`schemas/openapi.yaml`** — OpenAPI 3.1 spec covering every public
  Erebus endpoint. Started at **schema v1.0.0**. Mirrors the canonical
  copy in the (private) main repo.
- **`schemas/README.md`** — versioning rules, sync model, coverage matrix.
- **`NullblockClient.schemaVersion`** (TS) / `client.schema_version`
  (Python) — wire-contract version this SDK was built against.
- **`nb.serverSchemaVersion()`** / `nb.server_schema_version()` — fetches
  what Erebus is serving from `GET /api/schema/version`.
- **`nb.checkSchemaCompat()`** / `nb.check_schema_compat()` —
  returns `'match' | 'server-newer' | 'sdk-newer' | 'major-mismatch'`
  so SDK consumers can refuse incompatible servers.

### Changed

- README references `schemas/` and the contract rule.

## 0.2.0 — 2026-05-13

The first big face-lift. The SDK now reflects NullBlock's actual
service surface and joins the agentskills.io open standard.

### Added

- **`skills/`** at the repo root — portable
  [agentskills.io](https://agentskills.io)-compliant skills, drop-in
  for any compatible agent (Claude Code, OpenClaw, Cursor, Goose,
  OpenHands, Codex, …). No NullBlock harness needed.
  - First shipped skill: [`null-audit`](./skills/null-audit) — three-stage
    security & compliance audit for MCP tools.
- **`SkillsClient`** in both TypeScript and Python — talks to Erebus's
  new `/api/skills/*` endpoints:
  - `nb.skills.list()` — JSON index with parsed frontmatter
  - `nb.skills.get(name)` — full manifest (frontmatter + files + body size)
  - `nb.skills.getSkillMd(name)` — raw SKILL.md
  - `nb.skills.getFile(name, path)` — bundled refs/scripts/assets
  - `nb.skills.fetchBundle(name)` — convenience: full skill in one call
- **New types**: `SkillSummary`, `SkillManifest`, `SkillsListResponse`.
- **`docs/index.html`** — landing page now reflects the layering story
  (distribution / capability / consumer) and links to GitHub, TS+Python
  packages, the skills index, and CHANGELOG.
- **`CHANGELOG.md`** (this file).
- **Multi-auth quick-start examples** — wallet, email, and Google OAuth
  flows are all surfaced in the README.

### Changed

- README is now the comprehensive face-of-the-SDK doc with the three-layer
  model up top, full API surface table, current-version install snippets,
  and the skills section.
- TypeScript package marked `"type": "module"` to match the ESM `.js`
  imports already used in source.
- Both packages now declare `repository`, `homepage`, `bugs` metadata
  for npm and PyPI listings.

### Surface coverage

| Layer | Method on TS client | Method on Python client |
|-------|--------------------|--------------------------|
| Agents (chat, models, tools) | `nb.agents.*` | `nb.agent_*` |
| Engrams (memory CRUD) | `nb.engrams.*` | `nb.list_engrams / create_engram / …` |
| MCP (tool list/call) | `nb.mcp.*` | `nb.mcp_*` |
| Marketplace (Crossroads) | `nb.marketplace.*` | `nb.list_listings / search_listings` |
| **Skills** (new) | `nb.skills.*` | `nb.list_skills / get_skill / fetch_skill_bundle` |
| Wallets (auth) | `nb.wallets.*` | (via headers) |

### Known gaps (in active development)

- Email + Google OAuth helper methods (the endpoints exist on Erebus;
  the SDK lets you call them via `nb.post` directly but typed wrappers
  are pending).
- Sessions API (`/api/agents/:name/sessions/*`).
- Streaming chat helper (`chat/stream` SSE consumption).
- Content service (`/api/content/*`).
- Stage 2 npm probe recipe in `null-audit` (`references/probe-stdio-mcp.md`
  describes it; the orchestration is implemented in NullBlock's
  WebContainer-backed `nb` CLI, not yet in the SDK).

## 0.1.0 — 2026-04

Initial skeletons:

- TypeScript: `NullblockClient` with `agents`, `engrams`, `mcp`,
  `marketplace`, `wallets` sub-clients.
- Python: `NullblockClient` with the equivalent methods.
- GitHub Pages landing with the manifesto.
