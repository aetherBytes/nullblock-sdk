# NullBlock SDK

> Picks and shovels for the new age. The public, agent-friendly surface
> of [NullBlock](https://nullblock.io) — agents, engrams, MCP tools,
> Crossroads marketplace, and portable agentskills.io skills.

```
 _   _       _ _ ____  _            _
| \ | |_   _| | | __ )| | ___   ___| | __
|  \| | | | | | |  _ \| |/ _ \ / __| |/ /
| |\  | |_| | | | |_) | | (_) | (__|   <
|_| \_|\__,_|_|_|____/|_|\___/ \___|_|\_\
```

This repo contains:

- **`schemas/`** — OpenAPI 3.1 wire contract. Single source of truth.
  Versioned per semver. Mirrored from the (private) main repo.
- **`typescript/`** — `@nullblock/sdk` for browsers + Node
- **`python/`** — `nullblock-sdk` for Python 3.10+
- **`skills/`** — portable [agentskills.io](https://agentskills.io) skills
  authored by NullBlock; drop into any compatible agent
- **`docs/`** — landing page (served via GitHub Pages)

## The three layers

NullBlock is structured as a clean separation of concerns. The SDK
exposes all three to anything talking to Erebus.

| Layer | What it is | NullBlock surface | Open standard |
|-------|------------|-------------------|---------------|
| **Distribution** | Portable SKILL.md folders that teach an agent how to perform a workflow | `skills/` in this repo + `GET /api/skills/*` on Erebus | [agentskills.io](https://agentskills.io) |
| **Capability** | Callable MCP tools — `null_audit`, `create_engram`, … | `nullblock-protocols` on port 8001, JSON-RPC at `/mcp/jsonrpc` | [MCP 2025-11-25](https://spec.modelcontextprotocol.io) |
| **Consumer** | The agent or CLI that actually runs the workflow | Hex (browser), `nb` CLI (terminal/WebContainer), Claude Code, Cursor, Goose, OpenClaw, … | n/a — any agent |

> Skills **teach**. MCP tools are **what** they call. Consumers **run** the workflow.

## Quick start — TypeScript

```bash
npm install @nullblock/sdk
```

```typescript
import { NullblockClient } from '@nullblock/sdk';

const nb = new NullblockClient({ baseUrl: 'http://localhost:3000' });

// Discover skills (public, no auth)
const { skills } = await nb.skills.list();
console.log(skills.map(s => `${s.name}: ${s.description}`));

// Read a skill end-to-end
const audit = await nb.skills.get('null-audit');
const md = await nb.skills.getSkillMd('null-audit');

// Talk to Hex
const reply = await nb.agents.chat('hecate', 'audit Math-MCP');

// CRUD an engram (requires wallet auth)
nb.setWallet('your-wallet-address', 'solana');
const engram = await nb.engrams.create({
  wallet_address: 'your-wallet-address',
  engram_type: 'strategy',
  content: { goal: 'avoid sketchy MCPs' },
  tags: ['vetting'],
});
```

## Quick start — Python

```bash
pip install nullblock-sdk
```

```python
from nullblock import NullblockClient

nb = NullblockClient(base_url="http://localhost:3000")

# Discover skills
skills = nb.list_skills()
print(skills["count"], "skills available")

# Read a skill bundle (SKILL.md + every referenced file)
bundle = nb.fetch_skill_bundle("null-audit")
for path, content in bundle.items():
    print(f"--- {path} ({len(content)}c) ---")

# Talk to Hex
reply = nb.agent_chat("hecate", "audit Math-MCP")

nb.close()
```

## Skills — the cross-agent portability layer

Every skill in [`skills/`](./skills) is a self-contained folder
following the [agentskills.io spec](https://agentskills.io/specification).
Any compatible agent loads it; no NullBlock harness needed.

### Currently published

| Skill | What it does | Folder |
|-------|--------------|--------|
| [`null-audit`](./skills/null-audit) | Security & compliance audit for MCP tools. Three-stage flow: heuristic scan → optional sandboxed probe → engram persistence. Returns a clear "safe to use / how" or "found these vulns" verdict. | `skills/null-audit/` |

### Install in your agent

**Claude Code** (`~/.claude/skills/`):
```bash
mkdir -p ~/.claude/skills/null-audit
curl -fsSL https://raw.githubusercontent.com/aetherBytes/nullblock-sdk/main/skills/null-audit/SKILL.md \
  -o ~/.claude/skills/null-audit/SKILL.md
# For bundled refs/scripts/assets, sparse-checkout the folder:
git clone --filter=blob:none --no-checkout https://github.com/aetherBytes/nullblock-sdk.git /tmp/nb && \
  cd /tmp/nb && git sparse-checkout init --cone && git sparse-checkout set skills/null-audit && \
  git checkout main && cp -r skills/null-audit ~/.claude/skills/
```

**OpenClaw** (`~/.openclaw/workspace/skills/`): replace
`~/.claude/skills/` with `~/.openclaw/workspace/skills/` in the snippets above.

**Cursor**, **Goose**, **OpenHands**, **Codex**, or any other
[agentskills.io-compatible client](https://agentskills.io) — same drop-in
pattern, just point at that client's skills directory.

### Or fetch live from any Erebus instance

```bash
# List
curl https://erebus.nullblock.io/api/skills | jq

# Detail (frontmatter + file list + install hints)
curl https://erebus.nullblock.io/api/skills/null-audit | jq

# Raw SKILL.md
curl https://erebus.nullblock.io/api/skills/null-audit/SKILL.md

# Bundled file
curl https://erebus.nullblock.io/api/skills/null-audit/references/probe-stdio-mcp.md
```

All skill endpoints are CORS-open. No auth required.

## Wire contract — `schemas/openapi.yaml`

The SDK and Erebus share one source of truth: the OpenAPI 3.1 spec in
[`schemas/openapi.yaml`](./schemas/openapi.yaml). It's versioned per
semver and served live by Erebus at `/api/schema`.

### Drift check

```typescript
const nb = new NullblockClient({ baseUrl: 'https://erebus.nullblock.io' });

// What this SDK was built against:
console.log(nb.schemaVersion);                  // "1.0.0"

// What the server is currently serving:
console.log(await nb.serverSchemaVersion());    // { version: "1.0.0", ... }

// One-shot compatibility check:
const compat = await nb.checkSchemaCompat();
// 'match' | 'server-newer' | 'sdk-newer' | 'major-mismatch'
```

Treat `major-mismatch` as a hard stop. Treat `sdk-newer` as a warning
(you may be calling features the server doesn't have yet). Treat
`server-newer` as fine to proceed — additive changes are backward-compat.

### Versioning rule

Mirrors the main repo's `CLAUDE.md` "Public Surface Contract":

| Bump | When |
|------|------|
| **major** | Breaking — removed endpoints, removed fields, type changes |
| **minor** | Additive — new endpoints, new optional fields |
| **patch** | Documentation only |

See [`schemas/README.md`](./schemas/README.md) for the full rule + coverage matrix.

## API surface (via Erebus, port 3000)

Erebus is the unified router. Every NullBlock request goes through it —
the SDK never connects to backend services directly.

| Path | Service | Auth | Description |
|------|---------|------|-------------|
| `/health` | Erebus | none | Liveness |
| `/api/info` | Erebus | none | Full route map + auth flow |
| `/llms.txt` | Erebus | none | Friendly LLM-readable index |
| `/api/skills/*` | Erebus | none | First-party agentskills.io skills |
| `/api/marketplace/*` | Crossroads | none | Third-party tool/skill listings (ClawHub, Smithery) |
| `/api/discovery/*` | Erebus | none | Tools / agents / protocols / hot lists |
| `/api/agents/:name/chat` | Agents (9003) | optional | Non-stream chat with an agent |
| `/api/agents/:name/chat/stream` | Agents | optional | Server-sent event chat stream |
| `/api/engrams/*` | Engrams (9004) | wallet sig | Memory/context CRUD (wallet-scoped) |
| `/api/wallets/{challenge,verify}` | Erebus | none | Challenge-response wallet auth |
| `/api/auth/email/{register,login,verify}` | Erebus | none | Email + password auth |
| `/api/auth/google/{start,callback}` | Erebus | none | Google OAuth |
| `/api/auth/{refresh,token}` | Erebus | varies | JWT issue/refresh |
| `/api/v1/chat/completions` | LLM Proxy | api-key | OpenAI-compatible completions |
| `/mcp/jsonrpc` | Protocols (8001) | varies | MCP 2025-11-25 JSON-RPC |
| `/api/content/*` | Content (8002) | wallet | Social content gen + posting |

Auth model: wallet users sign challenges, email/Google users use
password/OAuth; in both cases the SDK only sees a JWT in
sessionStorage / a token argument. See `/api/info` on any Erebus
instance for the canonical, always-current route map.

## Repository layout

```
nullblock-sdk/
├── README.md            # this file
├── LICENSE              # MIT
├── CHANGELOG.md
├── skills/              # portable agentskills.io skills
│   ├── README.md
│   └── null-audit/
├── typescript/          # @nullblock/sdk
│   ├── package.json
│   ├── src/
│   │   ├── client.ts    # NullblockClient (entry point)
│   │   ├── agents.ts
│   │   ├── engrams.ts
│   │   ├── mcp.ts
│   │   ├── marketplace.ts
│   │   ├── skills.ts    # NEW in 0.2.0
│   │   ├── wallets.ts
│   │   └── types.ts
│   └── tsconfig.json
├── python/              # nullblock-sdk
│   ├── pyproject.toml
│   └── src/nullblock/
│       ├── __init__.py
│       ├── client.py
│       └── types.py
├── docs/                # GitHub Pages landing
│   └── index.html
└── .github/workflows/
    └── pages.yml
```

## Contributing

The SDK is the public, agent-friendly mirror of NullBlock's services.
Skills authored against the agentskills.io spec are especially welcome —
open a PR with `skills/<your-skill>/SKILL.md` and we'll review.

Source of truth for service code is in the (private) main NullBlock repo.
`skills/` is sync'd here on each release.

## Versioning

The TS package, the Python package, and `skills/` share one semver line
in [CHANGELOG.md](./CHANGELOG.md). When the SDK ships, all three move
together.

## License

MIT. See [LICENSE](./LICENSE).
