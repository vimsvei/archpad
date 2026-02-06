import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { MikroORM, type EntityManager } from '@mikro-orm/core';
import {
  HasuraSyncArrayRelationshipOverride,
  HasuraSyncColumnOverride,
  HasuraSyncObjectRelationshipOverride,
  HasuraSyncTableOverride,
  getHasuraProperties,
  getHasuraReferences,
  getHasuraTables,
} from '@archpad/models';
import { LoggerService } from '@archpad/logger';
import { HasuraSyncOverridesCollector } from './internal/overrides.collector';
import { materializeOverrides } from './internal/overrides.materializer';

/**
 * Creates and materializes `hasura_sync.*` registry tables from @archpad/models decorators.
 *
 * This is needed for Hasura metadata sync (custom table/column names and relationship overrides).
 * Tenant DB previously missed this, so `hasura_sync` schema did not exist.
 */
@Injectable()
export class HasuraRelationshipNameInitializer
  implements OnApplicationBootstrap
{
  private readonly loggerContext = HasuraRelationshipNameInitializer.name;

  constructor(
    private readonly orm: MikroORM,
    private readonly logger: LoggerService,
  ) {}

  async onApplicationBootstrap() {
    const references = getHasuraReferences();
    const tableUsages = getHasuraTables();
    const hasuraProperties = getHasuraProperties();

    const hasAny =
      references.length || tableUsages.length || hasuraProperties.length;
    if (!hasAny) return;

    await this.ensureRegistry();

    const em = this.orm.em.fork();

    await em.transactional(async (tx) => {
      await this.clearHasuraSyncOverrides(tx);

      const collector = new HasuraSyncOverridesCollector(
        this.orm,
        this.logger,
        this.loggerContext,
      );
      const acc = collector.collect({
        references,
        tableUsages,
        hasuraProperties,
      });

      await materializeOverrides(tx, acc);

      this.logger.log(
        `Materialized Hasura sync overrides: tables=${acc.tableOverrides.size}, columns=${acc.columnOverrides.size}, objectRels=${acc.objectRelationshipOverrides.size}, arrayRels=${acc.arrayRelationshipOverrides.size}`,
        this.loggerContext,
      );
    });
  }

  private async ensureRegistry() {
    // Create `hasura_sync.*` tables via MikroORM metadata (no handwritten SQL).
    // Safe: true, no drops.
    await this.orm
      .getSchemaGenerator()
      .updateSchema({ safe: true, dropTables: false } as any);
  }

  private async clearHasuraSyncOverrides(em: EntityManager) {
    // Clear all override tables to avoid conflicts with stale data
    const deletedArray = await em.nativeDelete(
      HasuraSyncArrayRelationshipOverride,
      {},
    );
    const deletedObject = await em.nativeDelete(
      HasuraSyncObjectRelationshipOverride,
      {},
    );
    const deletedTables = await em.nativeDelete(HasuraSyncTableOverride, {});
    const deletedColumns = await em.nativeDelete(HasuraSyncColumnOverride, {});

    this.logger.log(
      `Cleared Hasura sync override tables: array=${String(
        deletedArray,
      )}, object=${String(deletedObject)}, tables=${String(
        deletedTables,
      )}, columns=${String(deletedColumns)}`,
      this.loggerContext,
    );
  }
}

