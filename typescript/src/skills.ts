import type { NullblockClient } from './client.js';
import type {
  SkillSummary,
  SkillManifest,
  SkillsListResponse,
} from './types.js';

/**
 * Discovery client for NullBlock-authored agentskills.io skills.
 *
 * Skills are portable SKILL.md folders served from `/api/skills/*`.
 * CORS-open, no auth required — any agent can list, read, and install
 * skills without credentials.
 *
 * See https://agentskills.io for the open standard.
 */
export class SkillsClient {
  constructor(private client: NullblockClient) {}

  /** List all first-party NullBlock skills with parsed frontmatter + install hints. */
  async list(): Promise<SkillsListResponse> {
    return this.client.get('/api/skills');
  }

  /** Full manifest for one skill: frontmatter, file list, body size, install hints. */
  async get(name: string): Promise<SkillManifest> {
    return this.client.get(`/api/skills/${encodeURIComponent(name)}`);
  }

  /** Raw SKILL.md content as a string (text/markdown). */
  async getSkillMd(name: string): Promise<string> {
    const res = await this.client.fetch(`/api/skills/${encodeURIComponent(name)}/SKILL.md`);
    return res.text();
  }

  /**
   * Raw bundled file (e.g. `references/foo.md`, `scripts/probe.sh`).
   * Returns text for markdown/script files; use getFileBytes for binary.
   */
  async getFile(name: string, path: string): Promise<string> {
    const res = await this.client.fetch(
      `/api/skills/${encodeURIComponent(name)}/${path.split('/').map(encodeURIComponent).join('/')}`,
    );
    return res.text();
  }

  /** Raw bundled file as bytes — for binary assets. */
  async getFileBytes(name: string, path: string): Promise<ArrayBuffer> {
    const res = await this.client.fetch(
      `/api/skills/${encodeURIComponent(name)}/${path.split('/').map(encodeURIComponent).join('/')}`,
    );
    return res.arrayBuffer();
  }

  /**
   * Convenience helper: fetch the SKILL.md and all bundled files for one skill.
   * Returns a record of relative-path → file content (text only).
   */
  async fetchBundle(name: string): Promise<Record<string, string>> {
    const manifest = await this.get(name);
    const out: Record<string, string> = {};
    for (const file of manifest.files) {
      out[file] = await this.getFile(name, file);
    }
    return out;
  }
}

/** Summary returned in the `/api/skills` list response. */
export type { SkillSummary } from './types.js';
