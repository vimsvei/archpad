import {
  Injectable,
  OnApplicationBootstrap,
  Logger,
  Inject,
  Optional,
} from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { getArchimateSequences } from '@archpad/models';
import type { SchemaInitializerOptions } from './schema-initializer-options.interface';
import { SCHEMA_INITIALIZER_OPTIONS } from './schema-initializer-options.interface';

@Injectable()
export class SchemaInitializer implements OnApplicationBootstrap {
  private readonly logger = new Logger(SchemaInitializer.name);

  constructor(
    private readonly orm: MikroORM,
    @Optional()
    @Inject(SCHEMA_INITIALIZER_OPTIONS)
    private readonly options?: SchemaInitializerOptions,
  ) {}

  async onApplicationBootstrap() {
    const generator = this.orm.getSchemaGenerator();
    const conn = this.orm.em.getConnection();
    const config = this.orm.config as any;
    const schema =
      this.options?.schema ??
      config.get?.('schema') ??
      config.get?.('schemaName') ??
      'public';

    // Always create additional sequences (they are required by entities)
    // If skipSequenceCreation is true, we still need to create additionalSequences
    // because they are explicitly required by entities
    if (
      this.options?.additionalSequences &&
      this.options.additionalSequences.length > 0
    ) {
      await this.createAdditionalSequences(conn, schema);
    }

    // Create sequences from @ArchimateCode decorators if not skipped
    if (!this.options?.skipSequenceCreation) {
      await this.createArchimateSequences(conn, schema);
    }

    // Run pre-update migrations if provided
    // These should be used for data migrations that need to happen before schema changes
    // (e.g., filling NULL values before setting a column to NOT NULL)
    if (this.options?.preUpdateMigrations) {
      this.logger.log('Running pre-update migrations...');
      await this.options.preUpdateMigrations(conn);
      this.logger.log('Pre-update migrations completed');
    }

    // Update database schema based on entities
    // This will create tables, sequences, enums, and other database objects automatically
    try {
      await generator.updateSchema({ safe: true, dropTables: false } as any);
      this.logger.log('Database schema updated successfully');
    } catch (error: any) {
      if (error.code === '42501') {
        this.logger.error(
          `Permission denied: Unable to create database objects in schema "${schema}". ` +
            `Please grant CREATE privileges to the database user or create the schema manually.`,
        );
        throw error;
      }
      throw error;
    }

    // Run custom migrations if provided
    if (this.options?.customMigrations) {
      this.logger.log('Running custom migrations...');
      await this.options.customMigrations(conn);
      this.logger.log('Custom migrations completed');
    }
  }

  private async createAdditionalSequences(conn: any, schema: string) {
    const additionalSeqs = this.options?.additionalSequences ?? [];
    if (additionalSeqs.length === 0) {
      return;
    }

    this.logger.log(
      `Creating ${additionalSeqs.length} additional sequence(s)...`,
    );

    for (const seq of additionalSeqs) {
      try {
        const sql = `
          CREATE SEQUENCE IF NOT EXISTS "${schema}"."${seq}"
          START WITH 1
          INCREMENT BY 1
          NO MINVALUE
          NO MAXVALUE
          CACHE 1;
        `;
        await conn.execute(sql);
        this.logger.debug(`Created additional sequence: ${schema}.${seq}`);
      } catch (error: any) {
        // If we don't have permission to create sequences, updateSchema will create them
        if (error.code === '42501') {
          this.logger.warn(
            `Permission denied creating sequence ${schema}.${seq}. It will be created by updateSchema if needed.`,
          );
        } else {
          this.logger.error(
            `Failed to create sequence ${schema}.${seq}: ${error.message}`,
            error.stack,
          );
          // Re-throw if it's not a permission error - we need this sequence
          if (error.code !== '42501') {
            throw error;
          }
        }
      }
    }

    this.logger.log('Additional sequences creation completed');
  }

  private async createArchimateSequences(conn: any, schema: string) {
    // Get sequences from @ArchimateCode decorators
    const seqNames = getArchimateSequences();

    if (seqNames.length === 0) {
      return;
    }

    this.logger.log(`Creating ${seqNames.length} Archimate sequence(s)...`);

    for (const seq of seqNames) {
      try {
        const sql = `
          CREATE SEQUENCE IF NOT EXISTS "${schema}"."${seq}"
          START WITH 1
          INCREMENT BY 1
          NO MINVALUE
          NO MAXVALUE
          CACHE 1;
        `;
        await conn.execute(sql);
        this.logger.debug(`Created Archimate sequence: ${schema}.${seq}`);
      } catch (error: any) {
        // If we don't have permission to create sequences, updateSchema will create them
        if (error.code === '42501') {
          this.logger.warn(
            `Permission denied creating sequence ${schema}.${seq}. It will be created by updateSchema if needed.`,
          );
        } else {
          this.logger.error(
            `Failed to create sequence ${schema}.${seq}: ${error.message}`,
            error.stack,
          );
        }
      }
    }

    this.logger.log('Archimate sequences creation completed');
  }
}
