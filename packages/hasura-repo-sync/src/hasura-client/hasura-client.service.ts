import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HasuraClientService {
  private readonly logger = new Logger(HasuraClientService.name);

  readonly endpoint: string;
  readonly secret: string;
  readonly source: string;
  readonly schema: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.endpoint = this.config.get<string>('HASURA_ENDPOINT')!;
    this.secret = this.config.get<string>('HASURA_ADMIN_SECRET')!;
    this.source = this.config.get<string>('HASURA_SOURCE')!;
    this.schema = this.config.get<string>('HASURA_SCHEMA')!;
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
    this.logger.debug(`POST /v1/metadata type=${body?.type}`);
    const res = await firstValueFrom(
      this.http.post<T>(`${this.endpoint}/v1/metadata`, body, {
        headers: this.buildHeaders(),
      }),
    );
    return res.data;
  }

  async postQuery<T = any>(body: any): Promise<T> {
    this.logger.debug(`POST /v2/query type=${body?.type}`);
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
