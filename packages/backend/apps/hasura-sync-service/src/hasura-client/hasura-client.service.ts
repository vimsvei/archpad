import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { LoggerService } from '@archpad/logger';

@Injectable()
export class HasuraClientService {
  readonly endpoint: string;
  readonly secret: string;
  readonly source: string;
  readonly schema: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
  ) {
    const nodeEnv =
      this.config.get<string>('NODE_ENV') ?? process.env.NODE_ENV ?? '';

    // Policy:
    // - NODE_ENV=local  -> use HASURA_HOST (host-friendly, with TLS + local CA)
    // - otherwise       -> use HASURA_ENDPOINT (docker-network-friendly)
    const rawEndpoint =
      nodeEnv === 'local'
        ? this.config.get<string>('HASURA_HOST')
        : this.config.get<string>('HASURA_ENDPOINT');

    if (!rawEndpoint) {
      throw new Error(
        nodeEnv === 'local'
          ? 'NODE_ENV=local: HASURA_HOST is not set. Set HASURA_HOST to something like "hasura.192-168-1-119.sslip.io".'
          : 'HASURA_ENDPOINT is not set. Inside Docker use "http://hasura:8080".',
      );
    }

    this.endpoint = normalizeHasuraEndpoint(rawEndpoint);
    this.secret = this.config.get<string>('HASURA_GRAPHQL_ADMIN_SECRET')!;
    this.source = this.config.get<string>('HASURA_SOURCE')!;
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

  async postMetadata<T = any>(body: any): Promise<T> {
    this.logger.debug(
      `POST /v1/metadata type=${body?.type}`,
      HasuraClientService.name,
    );
    const res = await firstValueFrom(
      this.http.post<T>(`${this.endpoint}/v1/metadata`, body, {
        headers: this.buildHeaders(),
      }),
    );
    return res.data;
  }

  async postQuery<T = any>(body: any): Promise<T> {
    this.logger.debug(
      `POST /v2/query type=${body?.type}`,
      HasuraClientService.name,
    );
    const res = await firstValueFrom(
      this.http.post<T>(`${this.endpoint}/v2/query`, body, {
        headers: this.buildHeaders(),
      }),
    );
    return res.data;
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
