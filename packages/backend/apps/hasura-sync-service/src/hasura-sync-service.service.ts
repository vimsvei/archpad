import { Injectable } from '@nestjs/common';
import { HasuraClientService } from './hasura-client/hasura-client.service';
import { ConfigService } from '@nestjs/config';
import { readBool } from './config/read-bool';
import { getSchemaForeignKeys } from './db/get-schema-foreign-keys';
import { DbTableRef } from './db/types';
import { applyCamelCaseCustomization } from './sync/apply-camelcase-customization';
import { applyDefaultSelectPermissions } from './sync/apply-default-permissions';
import { fetchDbTables } from './sync/fetch-db-tables';
import { reloadMetadata } from './sync/reload-metadata';
import { syncForeignKeyRelationships } from './sync/sync-foreign-key-relationships';
import { trackTables } from './sync/track-tables';
import { untrackTables } from './sync/untrack-tables';
import { LoggerService } from '@archpad/logger';

@Injectable()
export class HasuraSyncService {
  private readonly renameToCamelCase: boolean;
  private readonly applyDefaultPermissions: boolean;
  private readonly defaultRole: string;
  private readonly sourcesToSync: string[];

  constructor(
    private readonly hasura: HasuraClientService,
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
  ) {
    const sourcesRaw = (
      this.config.get<string>('HASURA_SOURCES') ??
      this.config.get<string>('HASURA_SOURCE') ??
      ''
    ).trim();
    this.sourcesToSync = sourcesRaw
      .split(/\s+/)
      .map((s) => s.trim())
      .filter(Boolean);

    this.renameToCamelCase = readBool(
      this.config,
      'HASURA_RENAME_COLUMNS_CAMELCASE',
      true,
    );

    this.applyDefaultPermissions = readBool(
      this.config,
      'HASURA_APPLY_DEFAULT_PERMISSIONS',
      true,
    );
    this.defaultRole = this.config.get<string>('HASURA_DEFAULT_ROLE') ?? 'user';

    this.logger.log(
      `Config: renameToCamelCase=${this.renameToCamelCase}`,
      HasuraSyncService.name,
    );
    this.logger.log(
      `Config: applyDefaultPermissions=${this.applyDefaultPermissions} defaultRole=${this.defaultRole}`,
      HasuraSyncService.name,
    );
    this.logger.log(
      `Config: sources=${this.sourcesToSync.join(' ') || '(none)'}`,
      HasuraSyncService.name,
    );
  }

  async syncAll(options?: { renameColumnsToCamelCase?: boolean }) {
    this.logger.log('Starting Hasura repo sync...', HasuraSyncService.name);
    if (this.sourcesToSync.length === 0) {
      this.logger.warn(
        'No sources configured. Set HASURA_SOURCES (space-separated) or HASURA_SOURCE.',
        HasuraSyncService.name,
      );
      return;
    }
    const renameToCamelCase =
      options?.renameColumnsToCamelCase ?? this.renameToCamelCase;

    for (const sourceName of this.sourcesToSync) {
      this.logger.log(
        `Syncing source="${sourceName}" schema="${this.hasura.schema || '*'}"...`,
        HasuraSyncService.name,
      );

      // Switch active source in Hasura client (used by run_sql etc.)
      this.hasura.source = sourceName;

      const exportResult = await this.hasura.exportMetadata();
      const metadata = exportResult?.metadata ?? exportResult;
      const sources: any[] = metadata?.sources ?? [];
      const source =
        sources.find((s) => s?.name === this.hasura.source) ?? null;
      if (!source) {
        this.logger.warn(
          `Source "${this.hasura.source}" not found in metadata (skip).`,
          HasuraSyncService.name,
        );
        continue;
      }

      const tables: any[] = source?.tables ?? [];
      const trackedTables: DbTableRef[] = tables
        .map((t) => t?.table ?? t)
        .filter(Boolean)
        .map((t) => ({ schema: t.schema, name: t.name }))
        .filter((t) => !!t.schema && !!t.name)
        .filter((t) => !this.hasura.schema || t.schema === this.hasura.schema);

      // 1) Full reset: untrack everything first (cascade removes relationships too)
      await untrackTables({
        hasura: this.hasura,
        logger: this.logger,
        tables: trackedTables,
      });

      // 2) Pull updated table list from DB (current source) and track again
      const dbTables = await fetchDbTables({
        hasura: this.hasura,
        logger: this.logger,
      });
      await trackTables({
        hasura: this.hasura,
        logger: this.logger,
        tables: dbTables,
      });

      const foreignKeys = await getSchemaForeignKeys(this.hasura);
      await syncForeignKeyRelationships({
        hasura: this.hasura,
        logger: this.logger,
        foreignKeys,
      });

      if (this.applyDefaultPermissions) {
        await applyDefaultSelectPermissions({
          hasura: this.hasura,
          logger: this.logger,
          role: this.defaultRole,
          tables: dbTables,
        });
      } else {
        this.logger.log(
          'Skipping default permissions (HASURA_APPLY_DEFAULT_PERMISSIONS=false)',
          HasuraSyncService.name,
        );
      }

      await applyCamelCaseCustomization({
        hasura: this.hasura,
        logger: this.logger,
        tables: dbTables,
        // If false: still apply decorator-driven naming (from hasura_sync registry), but do not auto-camelcase everything.
        fallbackCamelCase: renameToCamelCase,
      });

      await reloadMetadata({ hasura: this.hasura, logger: this.logger });
      this.logger.log(
        `Source "${sourceName}" sync finished.`,
        HasuraSyncService.name,
      );
    }

    this.logger.log('Hasura repo sync finished.', HasuraSyncService.name);
  }
}
