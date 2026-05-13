from __future__ import annotations
from dataclasses import dataclass, field
from typing import Any, Literal

EngramType = Literal["persona", "preference", "strategy", "knowledge", "compliance"]


@dataclass
class ChatRequest:
    message: str
    wallet_address: str | None = None
    context: dict[str, Any] | None = None


@dataclass
class ChatResponse:
    response: str
    agent: str
    conversation_id: str | None = None


@dataclass
class Engram:
    id: str
    wallet_address: str
    engram_type: EngramType
    content: dict[str, Any]
    tags: list[str] = field(default_factory=list)
    created_at: str = ""
    updated_at: str = ""


@dataclass
class EngramCreateRequest:
    wallet_address: str
    engram_type: EngramType
    content: dict[str, Any]
    tags: list[str] | None = None


@dataclass
class MCPToolInfo:
    name: str
    description: str
    input_schema: dict[str, Any] = field(default_factory=dict)


@dataclass
class MarketplaceListing:
    id: str
    name: str
    description: str
    listing_type: str
    creator_wallet: str
    status: str = "pending"
    metadata: dict[str, Any] = field(default_factory=dict)
    created_at: str = ""


@dataclass
class Task:
    id: str
    title: str
    status: str = "pending"
    description: str | None = None
    agent: str | None = None
    created_at: str = ""
    updated_at: str = ""


@dataclass
class User:
    id: str
    wallet_address: str
    username: str | None = None
    created_at: str = ""


@dataclass
class SkillSummary:
    """Frontmatter + install hints from `GET /api/skills`."""
    name: str
    description: str
    skill_md_url: str
    license: str | None = None
    compatibility: str | None = None
    metadata: dict[str, str] | None = None
    install_hint: dict[str, str] = field(default_factory=dict)


@dataclass
class SkillManifest(SkillSummary):
    """Full manifest from `GET /api/skills/:name`."""
    files: list[str] = field(default_factory=list)
    body_chars: int = 0
