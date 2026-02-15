# NullBlock SDK

Client libraries for integrating with NullBlock services via Erebus (port 3000).

## Packages

| Package | Language | Path |
|---------|----------|------|
| `@nullblock/sdk` | TypeScript | `typescript/` |
| `nullblock-sdk` | Python | `python/` |

## API Surface

All requests route through **Erebus** (`localhost:3000`). No direct service connections.

| Path | Service | Description |
|------|---------|-------------|
| `/api/agents/*` | Agents (9003) | Chat, tasks, models |
| `/api/engrams/*` | Engrams (9004) | Memory/context CRUD |
| `/api/marketplace/*` | Crossroads | Listings, search, discovery |
| `/api/wallets/*` | Erebus | Auth, sessions |
| `/api/v1/chat/completions` | LLM Proxy | OpenAI-compatible |
| `/mcp/jsonrpc` | Protocols (8001) | MCP 2025-11-25 JSON-RPC |
| `/api/discovery/*` | Erebus | Service/tool discovery |

## Quick Start (TypeScript)

```typescript
import { NullblockClient } from '@nullblock/sdk';

const nb = new NullblockClient({ baseUrl: 'http://localhost:3000' });

const status = await nb.agents.status('hecate');
const tools = await nb.mcp.listTools();
const engrams = await nb.engrams.list({ wallet_address: '...' });
```

## Quick Start (Python)

```python
from nullblock import NullblockClient

nb = NullblockClient(base_url="http://localhost:3000")

status = nb.agent_status("hecate")
tools = nb.mcp_list_tools()
engrams = nb.list_engrams(wallet_address="...")
```
