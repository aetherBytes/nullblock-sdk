# NullBlock Skills

First-party, [agentskills.io](https://agentskills.io)-compliant skills
authored by NullBlock. Drop the folder into any compatible agent and it
just works.

## What's in here

| Skill | What it does | Stage |
|-------|--------------|-------|
| [`null-audit/`](./null-audit/SKILL.md) | Security & compliance audit for MCP tools, agents, and skills. Three-stage flow (heuristic scan → optional sandboxed probe → engram persistence). | MVP shipped |

More on the way. Open an issue or PR if you have a workflow you want to
package and share.

## Installing a skill

Every skill here is a self-contained folder. Three ways to install it:

### 1. From the live Erebus registry (recommended for dev)

```bash
# List everything we publish
curl -s http://localhost:3000/api/skills | jq

# Get one skill's manifest (frontmatter + file list + install hints)
curl -s http://localhost:3000/api/skills/null-audit | jq

# Fetch the SKILL.md and bundled files
mkdir -p ~/.claude/skills/null-audit
curl -fsSL http://localhost:3000/api/skills/null-audit/SKILL.md \
  -o ~/.claude/skills/null-audit/SKILL.md
curl -fsSL http://localhost:3000/api/skills/null-audit/references/audit-engram-schema.md \
  --create-dirs -o ~/.claude/skills/null-audit/references/audit-engram-schema.md
```

Replace `http://localhost:3000` with NullBlock's hosted Erebus URL in prod.
CORS-open, no auth.

### 2. From the public GitHub mirror (works without any NullBlock service)

```bash
# Single SKILL.md
curl -fsSL https://raw.githubusercontent.com/aetherBytes/nullblock-sdk/main/skills/null-audit/SKILL.md \
  -o ~/.claude/skills/null-audit/SKILL.md

# Whole folder with bundled refs/scripts/assets — sparse-checkout
git clone --filter=blob:none --no-checkout \
  https://github.com/aetherBytes/nullblock-sdk.git /tmp/nb-sdk
cd /tmp/nb-sdk
git sparse-checkout init --cone
git sparse-checkout set skills/null-audit
git checkout main
cp -r skills/null-audit ~/.claude/skills/
```

### 3. Clone the whole NullBlock repo (for contributors)

```bash
git clone https://github.com/aetherBytes/nullblock.git
ln -s "$PWD/nullblock/skills/null-audit" ~/.claude/skills/null-audit
```

## Compatibility matrix

| Agent | Skills directory | Tested |
|-------|------------------|--------|
| Claude Code | `~/.claude/skills/` | ✅ symlinked locally |
| OpenClaw | `~/.openclaw/workspace/skills/` | ⏳ |
| Cursor | per `cursor.com/docs/context/skills` | ⏳ |
| Goose | per Goose skills docs | ⏳ |
| OpenHands | `~/.openhands/skills/` | ⏳ |
| Codex CLI | per Codex skills docs | ⏳ |

Any agent that implements the [agentskills.io specification](https://agentskills.io/specification)
can load these as-is.

## Authoring a new skill

```
skills/your-skill/
├── SKILL.md          # required — YAML frontmatter + body
├── references/       # optional — extra docs loaded on demand
├── scripts/          # optional — executable code the skill calls
└── assets/           # optional — templates, schemas, etc.
```

Frontmatter must include:

```yaml
---
name: your-skill                   # lowercase, hyphens only, ≤64 chars, matches dir name
description: One sentence describing what this does and when to invoke it. ≤1024 chars.
license: MIT                       # optional but recommended
compatibility: "Requires X, Y"     # optional, ≤500 chars
metadata:                          # optional, free-form string→string map
  author: your-handle
  version: "0.1.0"
---
```

Validate with the upstream reference tool:

```bash
npx -y @agentskills/cli validate skills/your-skill
```

Or roundtrip via our Erebus API (returns 200 + parsed manifest if valid):

```bash
curl -s http://localhost:3000/api/skills/your-skill
```

## Discovery surface

The Erebus endpoints `/api/skills`, `/api/skills/:name`, and
`/api/skills/:name/SKILL.md` are listed in:

- `GET /api/info` — top-level "skills" section
- `GET /llms.txt` — friendly index for any LLM crawling the public surface

CORS is open on all skills endpoints. Auth is never required.

## Layers (so the model is clear)

| Layer | What | NullBlock surface | Spec |
|-------|------|-------------------|------|
| Distribution | Portable SKILL.md folders | `skills/` in this repo + `/api/skills/*` | [agentskills.io](https://agentskills.io) |
| Capability | Callable MCP tools | `nullblock-protocols` (port 8001), e.g. `null_audit`, `create_engram` | [MCP 2025-11-25](https://spec.modelcontextprotocol.io) |
| Consumer | The thing running the skill | Hex (browser), `nb` (terminal/WebContainer), Claude Code, Cursor, Goose, … | n/a — any agent |

The skill **teaches** the agent how to do something. The MCP tools are
**what** the skill calls. The consumer **runs** the workflow. Don't conflate.
