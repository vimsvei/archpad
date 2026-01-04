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

  constructor(
    private readonly hasura: HasuraClientService,
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
  ) {
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
  }

  async syncAll(options?: { renameColumnsToCamelCase?: boolean }) {
    this.logger.log('Starting Hasura repo sync...', HasuraSyncService.name);
    const renameToCamelCase =
      options?.renameColumnsToCamelCase ?? this.renameToCamelCase;

    const exportResult = await this.hasura.exportMetadata();
    const metadata = exportResult?.metadata ?? exportResult;
    const sources: any[] = metadata?.sources ?? [];
    const source =
      sources.find((s) => s?.name === this.hasura.source) ?? sources[0] ?? null;
    if (!source) {
      this.logger.warn(
        `Source "${this.hasura.source}" not found in metadata.`,
        HasuraSyncService.name,
      );
      return;
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

    // 2) Pull updated table list from DB (archpad) and track again
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
    this.logger.log('Hasura repo sync finished.', HasuraSyncService.name);
  }
}
