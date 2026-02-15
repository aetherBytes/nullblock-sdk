from __future__ import annotations
from typing import Any
import httpx

DEFAULT_BASE_URL = "http://localhost:3000"
DEFAULT_TIMEOUT = 30.0


class NullblockError(Exception):
    def __init__(self, status: int, body: str, path: str):
        self.status = status
        self.body = body
        self.path = path
        super().__init__(f"NullBlock API error {status} on {path}: {body}")


class NullblockClient:
    def __init__(
        self,
        base_url: str = DEFAULT_BASE_URL,
        wallet_address: str | None = None,
        wallet_chain: str | None = None,
        timeout: float = DEFAULT_TIMEOUT,
    ):
        self.base_url = base_url.rstrip("/")
        self.wallet_address = wallet_address
        self.wallet_chain = wallet_chain
        self._http = httpx.Client(base_url=self.base_url, timeout=timeout)

    def _headers(self) -> dict[str, str]:
        h: dict[str, str] = {}
        if self.wallet_address:
            h["x-wallet-address"] = self.wallet_address
        if self.wallet_chain:
            h["x-wallet-chain"] = self.wallet_chain
        return h

    def _request(self, method: str, path: str, **kwargs: Any) -> Any:
        headers = {**self._headers(), **kwargs.pop("headers", {})}
        res = self._http.request(method, path, headers=headers, **kwargs)
        if res.status_code >= 400:
            raise NullblockError(res.status_code, res.text, path)
        if res.headers.get("content-type", "").startswith("application/json"):
            return res.json()
        return res.text

    def get(self, path: str, **params: Any) -> Any:
        return self._request("GET", path, params=params or None)

    def post(self, path: str, body: Any = None) -> Any:
        return self._request("POST", path, json=body)

    def put(self, path: str, body: Any = None) -> Any:
        return self._request("PUT", path, json=body)

    def delete(self, path: str) -> None:
        self._request("DELETE", path)

    def health(self) -> dict[str, Any]:
        return self.get("/health")

    # --- Agents ---

    def agent_chat(self, agent: str, message: str, **kwargs: Any) -> dict[str, Any]:
        return self.post(f"/api/agents/{agent}/chat", {"message": message, **kwargs})

    def agent_status(self, agent: str = "hecate") -> dict[str, Any]:
        return self.get(f"/api/agents/{agent}/status")

    def agent_tools(self, agent: str = "hecate") -> list[dict[str, Any]]:
        return self.get(f"/api/agents/{agent}/tools")

    # --- Engrams ---

    def list_engrams(self, **params: Any) -> list[dict[str, Any]]:
        return self.get("/api/engrams", **params)

    def get_engram(self, engram_id: str) -> dict[str, Any]:
        return self.get(f"/api/engrams/{engram_id}")

    def create_engram(self, wallet_address: str, engram_type: str, content: dict[str, Any], tags: list[str] | None = None) -> dict[str, Any]:
        body: dict[str, Any] = {"wallet_address": wallet_address, "engram_type": engram_type, "content": content}
        if tags:
            body["tags"] = tags
        return self.post("/api/engrams", body)

    def update_engram(self, engram_id: str, **updates: Any) -> dict[str, Any]:
        return self.put(f"/api/engrams/{engram_id}", updates)

    def delete_engram(self, engram_id: str) -> None:
        self.delete(f"/api/engrams/{engram_id}")

    # --- MCP ---

    def mcp_list_tools(self) -> list[dict[str, Any]]:
        return self.get("/mcp/tools")

    def mcp_call_tool(self, name: str, arguments: dict[str, Any] | None = None) -> Any:
        return self.post("/mcp/jsonrpc", {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "tools/call",
            "params": {"name": name, "arguments": arguments or {}},
        })

    # --- Marketplace ---

    def list_listings(self) -> list[dict[str, Any]]:
        return self.get("/api/marketplace/listings")

    def search_listings(self, query: str | None = None, listing_type: str | None = None) -> list[dict[str, Any]]:
        body: dict[str, Any] = {}
        if query:
            body["query"] = query
        if listing_type:
            body["listing_type"] = listing_type
        return self.post("/api/marketplace/search", body)

    # --- Discovery ---

    def discover_all(self) -> dict[str, Any]:
        return self.get("/api/discovery/all")

    def close(self) -> None:
        self._http.close()

    def __enter__(self) -> NullblockClient:
        return self

    def __exit__(self, *_: Any) -> None:
        self.close()
