import type { NullblockClient } from './client.js';
import type { Engram, EngramCreateRequest, EngramUpdateRequest } from './types.js';

export class EngramsClient {
  constructor(private client: NullblockClient) {}

  async health(): Promise<{ status: string }> {
    return this.client.get('/api/engrams/health');
  }

  async list(params?: { wallet_address?: string; engram_type?: string; tags?: string[] }): Promise<Engram[]> {
    const qs = new URLSearchParams();
    if (params?.wallet_address) qs.set('wallet_address', params.wallet_address);
    if (params?.engram_type) qs.set('engram_type', params.engram_type);
    if (params?.tags) qs.set('tags', params.tags.join(','));
    const query = qs.toString();
    return this.client.get(`/api/engrams${query ? `?${query}` : ''}`);
  }

  async get(id: string): Promise<Engram> {
    return this.client.get(`/api/engrams/${id}`);
  }

  async create(request: EngramCreateRequest): Promise<Engram> {
    return this.client.post('/api/engrams', request);
  }

  async update(id: string, request: EngramUpdateRequest): Promise<Engram> {
    return this.client.put(`/api/engrams/${id}`, request);
  }

  async delete(id: string): Promise<void> {
    await this.client.delete(`/api/engrams/${id}`);
  }
}
