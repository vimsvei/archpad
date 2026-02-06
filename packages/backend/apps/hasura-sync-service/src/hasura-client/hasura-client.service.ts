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

    const bulkChunkSize =
      (this.config.get<string>('HASURA_SYNC_BULK_CHUNK_SIZE') ?? '').trim() ||
      '80';
    const useBulkKeepGoing =
      (this.config.get<string>('HASURA_SYNC_USE_BULK_KEEP_GOING') ?? 'true')
        .trim()
        .toLowerCase() !== 'false';
    this.logger.log(
      `Hasura endpoint=${this.endpoint} source=${this.source} schema=${this.schema} bulkChunkSize=${bulkChunkSize} bulkKeepGoing=${useBulkKeepGoing} NODE_ENV=${nodeEnv}`,
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

  /**
   * bulk_keep_going: like bulk, but individual ops can fail without failing the batch.
   * Used to avoid recursive split-on-failure and reduce round-trips.
   */
  async postMetadataBulkKeepGoing(args: any[]): Promise<any> {
    return this.postMetadata({
      type: 'bulk_keep_going',
      version: 1,
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
   * Chunked metadata apply. Uses bulk_keep_going by default (individual ops can fail without
   * failing the batch) to avoid recursive split-on-failure and reduce round-trips.
   *
   * Chunk size is configurable via HASURA_SYNC_BULK_CHUNK_SIZE (default 80).
   */
  async postMetadataBulkChunked(
    ops: any[],
    options?: { chunkSize?: number; label?: string; useBulkKeepGoing?: boolean },
  ): Promise<void> {
    const defaultChunk = Math.max(
      10,
      Math.min(
        200,
        parseInt(
          (this.config.get<string>('HASURA_SYNC_BULK_CHUNK_SIZE') ?? '').trim() ||
            '80',
          10,
        ) || 80,
      ),
    );
    const chunkSize = options?.chunkSize ?? defaultChunk;
    const label = options?.label ?? 'bulk';
    const useBulkKeepGoing =
      options?.useBulkKeepGoing ??
      ((this.config.get<string>('HASURA_SYNC_USE_BULK_KEEP_GOING') ?? 'true')
        .trim()
        .toLowerCase() !== 'false');

    const postChunk = useBulkKeepGoing
      ? (chunk: any[]) => this.postMetadataBulkKeepGoing(chunk)
      : (chunk: any[]) => this.postMetadataBulk(chunk);

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
        await postChunk(chunk);
      } catch (e: any) {
        if (useBulkKeepGoing) {
          // bulk_keep_going should not throw for individual op failures; if we get here, it's a real error.
          throw e;
        }
        // bulk mode: recursive split to isolate bad op. Limit recursion to avoid 30+ min runs.
        const minChunkBeforeSplit = 5;
        if (chunk.length <= minChunkBeforeSplit) {
          if (isIgnorableMetadataError(e, label)) {
            const code = getHasuraErrorCode(e) ?? '-';
            const msg = getHasuraErrorMessage(e) ?? formatHasuraError(e);
            this.logger.warn(
              `Ignoring Hasura metadata error for ${label} (code=${code}): ${msg}`,
              HasuraClientService.name,
            );
            continue;
          }
          throw e;
        }
        this.logger.warn(
          `Failed ${label} chunk (source=${this.source}, ops=${chunk.length}). Splitting (min=${minChunkBeforeSplit})...`,
          HasuraClientService.name,
        );
        const mid = Math.floor(chunk.length / 2);
        await this.postMetadataBulkChunked(chunk.slice(0, mid), {
          chunkSize: Math.max(minChunkBeforeSplit, Math.floor(chunkSize / 2)),
          label,
          useBulkKeepGoing: false,
        });
        await this.postMetadataBulkChunked(chunk.slice(mid), {
          chunkSize: Math.max(minChunkBeforeSplit, Math.floor(chunkSize / 2)),
          label,
          useBulkKeepGoing: false,
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

function getHasuraErrorCode(e: any): string | undefined {
  const code = e?.response?.data?.code;
  return typeof code === 'string' ? code : undefined;
}

function getHasuraErrorMessage(e: any): string | undefined {
  const msg = e?.response?.data?.error ?? e?.response?.data?.message;
  return typeof msg === 'string' ? msg : undefined;
}

function isIgnorableMetadataError(e: any, label: string): boolean {
  const code = (getHasuraErrorCode(e) ?? '').toLowerCase();
  // Common Hasura idempotency errors:
  // - pg_track_table: already-tracked
  // - pg_untrack_table: already-untracked
  // - permissions/relationships: already-exists
  if (label === 'pg_track_table' && code === 'already-tracked') return true;
  if (label === 'pg_untrack_table' && code === 'already-untracked') return true;
  if (code === 'already-exists') {
    // `applyMetadataOps` may group multiple relationship ops under a custom label
    // (e.g. 'pg_create_relationships'). Hasura bulk is non-atomic, so splitting can
    // re-apply already-created relationships/permissions. Treat as success.
    if (
      label === 'pg_create_select_permission' ||
      label === 'pg_create_object_relationship' ||
      label === 'pg_create_array_relationship' ||
      label === 'pg_create_relationships'
    ) {
      return true;
    }
  }
  return false;
}

function isRetryableAxiosError(e: any): boolean {
  const status = e?.response?.status;
  if (typeof status === 'number') {
    return status === 429 || status === 502 || status === 503 || status === 504;
  }
  const code = (e?.code ?? '').toString().toUpperCase();
  return (
    code === 'ECONNREFUSED' ||
    code === 'ECONNRESET' ||
    code === 'ETIMEDOUT' ||
    code === 'EAI_AGAIN' ||
    code === 'ENOTFOUND'
  );
}
