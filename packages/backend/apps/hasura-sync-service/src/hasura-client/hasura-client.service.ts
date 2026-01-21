import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { LoggerService } from '@archpad/logger';
import { retry } from '../utils/retry';
import { formatHasuraError } from '../utils/hasura-error';

@Injectable()
export class HasuraClientService {
  // Selected base URL (no trailing slash).
  endpoint: string;
  readonly secret: string;
  // Active source for run_sql etc. Set by sync service loop.
  source: string;
  readonly schema: string;
  private endpointSelected?: Promise<void>;
  private readonly requestTimeoutMs: number;
  private readonly requestRetries: number;
  private readonly internalEndpointCandidate?: string;
  private readonly externalEndpointCandidates: string[];

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
  ) {
    const nodeEnv =
      this.config.get<string>('NODE_ENV') ?? process.env.NODE_ENV ?? '';

    // Defaults:
    // - Local dev: prefer public apim (HASURA_HOST/HASURA_ENDPOINT).
    // - Production/k8s: prefer internal service DNS.
    const internalCandidate = (
      this.config.get<string>('HASURA_INTERNAL_CANDIDATE') ??
      'http://hasura.platform.svc:8080'
    ).trim();
    const externalCandidates = [
      this.config.get<string>('HASURA_HOST'),
      this.config.get<string>('HASURA_ENDPOINT'),
      this.config.get<string>('HASURA_INTERNAL_URL'),
    ]
      .map((v) => (v ?? '').trim())
      .filter(Boolean);

    const preferInternalDefault = nodeEnv === 'production';
    const preferInternal =
      ((this.config.get<string>('HASURA_PREFER_INTERNAL') ?? '')
        .trim()
        .toLowerCase() || (preferInternalDefault ? 'true' : 'false')) ===
      'true';
    const tryInternal =
      ((this.config.get<string>('HASURA_TRY_INTERNAL') ?? '')
        .trim()
        .toLowerCase() || (preferInternalDefault ? 'true' : 'false')) ===
      'true';

    const internalList = internalCandidate ? [internalCandidate] : [];
    const candidates = preferInternal
      ? [...internalList, ...externalCandidates]
      : [...externalCandidates, ...(tryInternal ? internalList : [])];

    if (!candidates.length) {
      throw new Error(
        'No Hasura endpoint configured. Set HASURA_HOST (e.g. https://apim.archpad.pro) or HASURA_ENDPOINT.',
      );
    }

    this.internalEndpointCandidate = internalCandidate
      ? normalizeHasuraEndpoint(internalCandidate)
      : undefined;
    this.externalEndpointCandidates = externalCandidates.map((c) =>
      normalizeHasuraEndpoint(c),
    );
    this.logger.log(
      `Hasura endpoint candidates: preferInternal=${preferInternal} tryInternal=${tryInternal} internal=${this.internalEndpointCandidate ?? '-'} external=[${this.externalEndpointCandidates.join(
        ', ',
      )}]`,
      HasuraClientService.name,
    );

    // Start with the first candidate; validate lazily (once) before first request.
    this.endpoint = normalizeHasuraEndpoint(candidates[0]!);
    this.endpointSelected = this.selectReachableEndpoint(candidates, nodeEnv);

    const timeoutRaw =
      (this.config.get<string>('HASURA_HTTP_TIMEOUT_MS') ?? '').trim() ||
      '30000';
    const retriesRaw =
      (this.config.get<string>('HASURA_HTTP_RETRIES') ?? '').trim() || '3';
    this.requestTimeoutMs = clampInt(parseInt(timeoutRaw, 10), 1000, 300000);
    this.requestRetries = clampInt(parseInt(retriesRaw, 10), 0, 20);
    this.secret = (
      this.config.get<string>('HASURA_GRAPHQL_ADMIN_SECRET') ?? ''
    ).trim();
    if (!this.secret) {
      throw new Error(
        'HASURA_GRAPHQL_ADMIN_SECRET is not set. It is required for /v1/metadata and /v2/query. (Vault: kv/data/archpad/demo/hasura/secret)',
      );
    }
    // Back-compat: support both HASURA_SOURCES and HASURA_SOURCE.
    // If HASURA_SOURCES is provided, sync service will override `source` for each entry.
    this.source =
      (this.config.get<string>('HASURA_SOURCE') ?? '').trim() ||
      ((this.config.get<string>('HASURA_SOURCES') ?? '')
        .trim()
        .split(/\s+/)
        .filter(Boolean)[0] ??
        '');
    this.schema = this.config.get<string>('HASURA_SCHEMA')!;

    this.logger.log(
      `Hasura endpoint=${this.endpoint} source=${this.source} schema=${this.schema} NODE_ENV=${nodeEnv}`,
      HasuraClientService.name,
    );
  }

  private buildHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.secret) {
      headers['x-hasura-admin-secret'] = this.secret;
    }
    return headers;
  }

  private async postHasura<T>(args: {
    path: '/v1/metadata' | '/v2/query';
    label: string;
    body: any;
  }): Promise<T> {
    await this.ensureEndpointSelected();
    const type = args.body?.type;
    this.logger.debug(
      `POST ${args.path} type=${type}`,
      HasuraClientService.name,
    );
    return this.postJsonWithRetry<T>(
      `${this.endpoint}${args.path}`,
      args.body,
      {
        label: args.label,
      },
    );
  }

  async postMetadata<T = any>(body: any): Promise<T> {
    return this.postHasura<T>({
      path: '/v1/metadata',
      label: 'metadata',
      body,
    });
  }

  async postQuery<T = any>(body: any): Promise<T> {
    return this.postHasura<T>({
      path: '/v2/query',
      label: 'query',
      body,
    });
  }

  async runSql(
    sql: string,
  ): Promise<{ result_type: string; result: string[][] }> {
    return this.postQuery({
      type: 'run_sql',
      args: {
        source: this.source,
        sql,
      },
    });
  }

  async exportMetadata(): Promise<any> {
    return this.postMetadata({
      type: 'export_metadata',
      version: 2,
      args: {},
    });
  }

  async postMetadataBulk(args: any[]): Promise<any> {
    return this.postMetadata({
      type: 'bulk',
      args,
    });
  }

  async postMetadataBulkAtomic(args: any[]): Promise<any> {
    return this.postMetadata({
      type: 'bulk_atomic',
      args,
    });
  }

  /**
   * Chunked metadata apply using Hasura `bulk` (not atomic).
   *
   * Important: not all metadata commands are supported in `bulk_atomic`.
   * We use `bulk` as the default for broad compatibility.
   */
  async postMetadataBulkChunked(
    ops: any[],
    options?: { chunkSize?: number; label?: string },
  ): Promise<void> {
    const chunkSize = options?.chunkSize ?? 50;
    const label = options?.label ?? 'bulk';

    const chunks: any[][] = [];
    for (let i = 0; i < ops.length; i += chunkSize) {
      chunks.push(ops.slice(i, i + chunkSize));
    }

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i]!;
      try {
        this.logger.log(
          `Applying ${label}: chunk ${i + 1}/${chunks.length} ops=${chunk.length} source=${this.source}`,
          HasuraClientService.name,
        );
        await this.postMetadataBulk(chunk);
      } catch (e: any) {
        // If a chunk fails, split it to isolate a bad op (keeps total requests bounded).
        if (chunk.length <= 1) throw e;
        this.logger.warn(
          `Failed ${label} chunk (source=${this.source}, ops=${chunk.length}). Splitting...`,
          HasuraClientService.name,
        );
        const mid = Math.floor(chunk.length / 2);
        await this.postMetadataBulkChunked(chunk.slice(0, mid), {
          chunkSize: Math.max(1, Math.floor(chunkSize / 2)),
          label,
        });
        await this.postMetadataBulkChunked(chunk.slice(mid), {
          chunkSize: Math.max(1, Math.floor(chunkSize / 2)),
          label,
        });
      }
    }
  }

  private async selectReachableEndpoint(
    candidatesRaw: string[],
    nodeEnv: string,
  ) {
    const candidates = candidatesRaw
      .map((c) => (c ?? '').trim())
      .filter(Boolean)
      .map((c) => normalizeHasuraEndpoint(c));

    const check = async (base: string) => {
      try {
        await firstValueFrom(
          this.http.get(`${base}/healthz`, {
            timeout: 1500,
            validateStatus: (s) => s >= 200 && s < 500,
          }),
        );
        return true;
      } catch {
        return false;
      }
    };

    for (const base of candidates) {
      const ok = await check(base);
      if (ok) {
        const kind =
          this.internalEndpointCandidate &&
          base === this.internalEndpointCandidate
            ? 'internal'
            : 'external';
        this.logger.log(
          `Selected Hasura endpoint=${base} kind=${kind} (NODE_ENV=${nodeEnv})`,
          HasuraClientService.name,
        );
        this.endpoint = base;
        return;
      }
    }

    this.logger.warn(
      `No Hasura endpoint candidates are reachable; keeping endpoint=${this.endpoint}. Candidates: ${candidates.join(', ')}`,
      HasuraClientService.name,
    );
  }

  private async ensureEndpointSelected() {
    if (!this.endpointSelected) return;
    await this.endpointSelected;
    this.endpointSelected = undefined;
  }

  private async postJsonWithRetry<T>(
    url: string,
    body: any,
    options?: { label?: string },
  ): Promise<T> {
    const label = options?.label ?? 'request';
    const maxAttempts = this.requestRetries + 1;

    return await retry<T>({
      retries: maxAttempts,
      fn: async () => {
        const res = await firstValueFrom(
          this.http.post<T>(url, body, {
            headers: this.buildHeaders(),
            timeout: this.requestTimeoutMs,
          }),
        );
        return res.data;
      },
      retryOnError: (e) => isRetryableAxiosError(e),
      getDelayMs: (attempt) => Math.min(5000, 250 * Math.pow(2, attempt - 1)),
      onRetry: ({ attempt, nextDelayMs, error }) => {
        this.logger.warn(
          `Hasura ${label} failed (attempt ${attempt}/${maxAttempts}): ${formatHasuraError(
            error,
          )}; retrying in ${nextDelayMs}ms`,
          HasuraClientService.name,
        );
      },
    });
  }
}

function normalizeHasuraEndpoint(input: string): string {
  let url = input.trim();

  // If someone passed a bare host (no scheme), assume https.
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }

  // Strip known GraphQL paths if user accidentally passed them.
  url = url.replace(/\/graphql\/v1\/graphql\/?$/i, '');
  url = url.replace(/\/v1\/graphql\/?$/i, '');
  url = url.replace(/\/graphql\/?$/i, '');

  // Remove trailing slashes.
  url = url.replace(/\/+$/g, '');

  return url;
}

function clampInt(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, n));
}

function isRetryableAxiosError(e: any): boolean {
  const status = e?.response?.status;
  if (typeof status === 'number') {
    return status === 429 || status === 502 || status === 503 || status === 504;
  }
  const code = (e?.code ?? '').toString().toUpperCase();
  return (
    code === 'ECONNRESET' ||
    code === 'ETIMEDOUT' ||
    code === 'EAI_AGAIN' ||
    code === 'ENOTFOUND'
  );
}
