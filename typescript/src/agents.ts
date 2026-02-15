import type { NullblockClient } from './client.js';
import type {
  AgentStatus,
  ChatRequest,
  ChatResponse,
  ModelInfo,
  Task,
  TaskCreateRequest,
  MCPToolInfo,
  LLMCompletionRequest,
  LLMCompletionResponse,
} from './types.js';

export class AgentsClient {
  constructor(private client: NullblockClient) {}

  async health(): Promise<{ status: string }> {
    return this.client.get('/api/agents/health');
  }

  // --- Chat ---

  async chat(agent: string, request: ChatRequest): Promise<ChatResponse> {
    return this.client.post(`/api/agents/${agent}/chat`, request);
  }

  async hecateChat(request: ChatRequest): Promise<ChatResponse> {
    return this.chat('hecate', request);
  }

  async clearHistory(agent = 'hecate'): Promise<void> {
    await this.client.post(`/api/agents/${agent}/clear`);
  }

  async getHistory(agent = 'hecate'): Promise<unknown[]> {
    return this.client.get(`/api/agents/${agent}/history`);
  }

  // --- Status & Models ---

  async status(agent = 'hecate'): Promise<AgentStatus> {
    return this.client.get(`/api/agents/${agent}/status`);
  }

  async availableModels(agent = 'hecate'): Promise<ModelInfo[]> {
    return this.client.get(`/api/agents/${agent}/available-models`);
  }

  async modelInfo(agent = 'hecate'): Promise<ModelInfo> {
    return this.client.get(`/api/agents/${agent}/model-info`);
  }

  async setModel(agent: string, modelId: string): Promise<void> {
    await this.client.post(`/api/agents/${agent}/set-model`, { model: modelId });
  }

  async searchModels(agent = 'hecate', query?: string): Promise<ModelInfo[]> {
    const qs = query ? `?q=${encodeURIComponent(query)}` : '';
    return this.client.get(`/api/agents/${agent}/search-models${qs}`);
  }

  // --- Tools ---

  async tools(agent = 'hecate'): Promise<MCPToolInfo[]> {
    return this.client.get(`/api/agents/${agent}/tools`);
  }

  // --- Personality ---

  async getPersonality(agent = 'hecate'): Promise<{ personality: string }> {
    return this.client.get(`/api/agents/${agent}/personality`);
  }

  async setPersonality(agent: string, personality: string): Promise<void> {
    await this.client.post(`/api/agents/${agent}/personality`, { personality });
  }

  // --- Tasks ---

  async createTask(request: TaskCreateRequest): Promise<Task> {
    return this.client.post('/api/agents/tasks', request);
  }

  async listTasks(): Promise<Task[]> {
    return this.client.get('/api/agents/tasks');
  }

  async getTask(taskId: string): Promise<Task> {
    return this.client.get(`/api/agents/tasks/${taskId}`);
  }

  async updateTask(taskId: string, updates: Partial<TaskCreateRequest>): Promise<Task> {
    return this.client.put(`/api/agents/tasks/${taskId}`, updates);
  }

  async deleteTask(taskId: string): Promise<void> {
    await this.client.delete(`/api/agents/tasks/${taskId}`);
  }

  async startTask(taskId: string): Promise<Task> {
    return this.client.post(`/api/agents/tasks/${taskId}/start`);
  }

  async cancelTask(taskId: string): Promise<Task> {
    return this.client.post(`/api/agents/tasks/${taskId}/cancel`);
  }

  async taskStats(): Promise<unknown> {
    return this.client.get('/api/agents/tasks/stats');
  }

  // --- OpenAI-compatible LLM proxy ---

  async chatCompletion(request: LLMCompletionRequest): Promise<LLMCompletionResponse> {
    return this.client.post('/api/v1/chat/completions', request);
  }

  async listModels(): Promise<{ data: ModelInfo[] }> {
    return this.client.get('/api/v1/models');
  }
}
