import type { NullblockConfig, HealthResponse } from './types.js';
import { AgentsClient } from './agents.js';
import { EngramsClient } from './engrams.js';
import { MCPClient } from './mcp.js';
import { MarketplaceClient } from './marketplace.js';
import { WalletsClient } from './wallets.js';

const DEFAULT_BASE_URL = 'http://localhost:3000';
const DEFAULT_TIMEOUT = 30_000;

export class NullblockClient {
  readonly baseUrl: string;
  readonly timeout: number;
  private walletAddress?: string;
  private walletChain?: string;

  readonly agents: AgentsClient;
  readonly engrams: EngramsClient;
  readonly mcp: MCPClient;
  readonly marketplace: MarketplaceClient;
  readonly wallets: WalletsClient;

  constructor(config: Partial<NullblockConfig> = {}) {
    this.baseUrl = (config.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, '');
    this.timeout = config.timeout ?? DEFAULT_TIMEOUT;
    this.walletAddress = config.walletAddress;
    this.walletChain = config.walletChain;

    this.agents = new AgentsClient(this);
    this.engrams = new EngramsClient(this);
    this.mcp = new MCPClient(this);
    this.marketplace = new MarketplaceClient(this);
    this.wallets = new WalletsClient(this);
  }

  setWallet(address: string, chain = 'solana'): void {
    this.walletAddress = address;
    this.walletChain = chain;
  }

  async fetch(path: string, init: RequestInit = {}): Promise<Response> {
    const url = `${this.baseUrl}${path}`;
    const headers = new Headers(init.headers);

    if (!headers.has('Content-Type') && init.body) {
      headers.set('Content-Type', 'application/json');
    }
    if (this.walletAddress) {
      headers.set('x-wallet-address', this.walletAddress);
    }
    if (this.walletChain) {
      headers.set('x-wallet-chain', this.walletChain);
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeout);

    try {
      const res = await globalThis.fetch(url, {
        ...init,
        headers,
        signal: init.signal ?? controller.signal,
      });
      if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new NullblockError(res.status, body, path);
      }
      return res;
    } finally {
      clearTimeout(timer);
    }
  }

  async get<T = unknown>(path: string): Promise<T> {
    const res = await this.fetch(path);
    return res.json() as Promise<T>;
  }

  async post<T = unknown>(path: string, body?: unknown): Promise<T> {
    const res = await this.fetch(path, {
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    return res.json() as Promise<T>;
  }

  async put<T = unknown>(path: string, body?: unknown): Promise<T> {
    const res = await this.fetch(path, {
      method: 'PUT',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    return res.json() as Promise<T>;
  }

  async delete(path: string): Promise<void> {
    await this.fetch(path, { method: 'DELETE' });
  }

  async health(): Promise<HealthResponse> {
    return this.get('/health');
  }
}

export class NullblockError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: string,
    public readonly path: string,
  ) {
    super(`NullBlock API error ${status} on ${path}: ${body}`);
    this.name = 'NullblockError';
  }
}
