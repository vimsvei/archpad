import { Injectable, Logger } from '@nestjs/common';
import { HasuraClientService } from './hasura-client/hasura-client.service';
import { ConfigService } from '@nestjs/config';
import { readBool } from './config/read-bool';
import { getSchemaForeignKeys } from './db/get-schema-foreign-keys';
import { getHasuraSource } from './metadata/get-source';
import { getTrackedTablesFromSource } from './metadata/get-tracked-tables';
import { normalizeHasuraMetadata } from './metadata/normalize-metadata';
import { applyCamelCaseCustomization } from './sync/apply-camelcase-customization';
import { fetchDbTables } from './sync/fetch-db-tables';
import { reloadMetadata } from './sync/reload-metadata';
import { syncForeignKeyRelationships } from './sync/sync-foreign-key-relationships';
import { trackTables } from './sync/track-tables';
import { untrackTables } from './sync/untrack-tables';

@Injectable()
export class HasuraSyncService {
  private readonly logger = new Logger(HasuraSyncService.name);
  private readonly renameToCamelCase: boolean;

  constructor(
    private readonly hasura: HasuraClientService,
    private readonly config: ConfigService,
  ) {
    this.renameToCamelCase = readBool(
      this.config,
      'HASURA_RENAME_COLUMNS_CAMELCASE',
      true,
    );

    this.logger.log(`Config: renameToCamelCase=${this.renameToCamelCase}`);
  }

  async syncAll(options?: { renameColumnsToCamelCase?: boolean }) {
    this.logger.log('Starting Hasura repo sync...');
    const renameToCamelCase =
      options?.renameColumnsToCamelCase ?? this.renameToCamelCase;

    const exportResult = await this.hasura.exportMetadata();
    const metadata = normalizeHasuraMetadata(exportResult);
    const source = getHasuraSource(metadata, this.hasura.source);
    if (!source) {
      this.logger.warn(`Source "${this.hasura.source}" not found in metadata.`);
      return;
    }

    const trackedTables = getTrackedTablesFromSource(source, {
      schema: this.hasura.schema,
    });

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
    await trackTables({ hasura: this.hasura, logger: this.logger, tables: dbTables });

    const foreignKeys = await getSchemaForeignKeys(this.hasura);
    // After full reset we can just create relationships from scratch.
    const existingRelationships: never[] = [];
    const allTableNames = new Set(dbTables.map((t) => t.name));

    await syncForeignKeyRelationships({
      hasura: this.hasura,
      logger: this.logger,
      foreignKeys,
      existingRelationships,
      allTableNames,
    });

    if (renameToCamelCase) {
      await applyCamelCaseCustomization({
        hasura: this.hasura,
        logger: this.logger,
        tables: dbTables,
      });
    } else {
      this.logger.log(
        'Skipping camelCase customization (HASURA_RENAME_COLUMNS_CAMELCASE=false)',
      );
    }

    await reloadMetadata({ hasura: this.hasura, logger: this.logger });
    this.logger.log('Hasura repo sync finished.');
  }
}
