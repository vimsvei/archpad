import { Injectable, Logger } from '@nestjs/common';
import { HasuraClientService } from './hasura-client/hasura-client.service';
import { ConfigService } from '@nestjs/config';
import { toCamelCase, toPlural } from './utils/naming.util';

interface ForeignKeyInfo {
  fk_table_schema: string;
  fk_table_name: string;
  pk_table_schema: string;
  pk_table_name: string;
  fk_columns: string[];
  constraint_name: string;
}

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private readonly renameColumnsToCamelCase: boolean;
  private readonly untrackFunctions: boolean;

  constructor(
    private readonly hasura: HasuraClientService,
    private readonly config: ConfigService,
  ) {
    this.renameColumnsToCamelCase = this.readBool(
      'HASURA_RENAME_COLUMNS_CAMELCASE',
      true,
    );
    this.untrackFunctions = this.readBool('HASURA_UNTRACK_FUNCTIONS', true);

    this.logger.log(
      `Config: renameColumnsToCamelCase=${this.renameColumnsToCamelCase}, untrackFunctions=${this.untrackFunctions}`,
    );
  }

  async syncAll(options?: { renameColumnsToCamelCase?: boolean }) {
    this.logger.log('Starting Hasura repo sync...');

    if (this.untrackFunctions) {
      await this.untrackAll();
    } else {
      this.logger.log(
        'Skipping untrack of functions (HASURA_UNTRACK_FUNCTIONS=false)',
      );
    }

    const tables = await this.trackAllTables();
    // await this.trackAllRelationships();
    //
    // if (this.renameColumnsToCamelCase) {
    //   await this.applyCamelCaseColumnNames(tables);
    // } else {
    //   this.logger.log(
    //     'Skipping column customization to camelCase (HASURA_RENAME_COLUMNS_CAMELCASE=false)',
    //   );
    // }

    await this.reloadMetadata();
    this.logger.log('Hasura repo sync finished.');
  }

  private async untrackAll() {
    this.logger.log(
      'Untracking all tracked items (tables and relationships)...',
    );
    const md = await this.hasura.exportMetadata();
    const metadata = md.metadata ?? md;

    const sourceName = this.hasura.source;
    const source =
      (metadata.sources || []).find((s: any) => s.name === sourceName) ??
      (metadata.sources || [])[0];

    if (!source) {
      this.logger.warn(`Source "${sourceName}" not found in metadata.`);
      return;
    }

    const tables: any[] = source.tables || [];
    this.logger.log(`Source "${JSON.stringify(tables)}`);
    if (!tables.length) {
      this.logger.log('No tracked tables found. Skipping.');
      return;
    }
    
    for (const f of tables) {
      const fn = f.table || f;
      const schema = fn.schema;
      const name = fn.name;
      this.logger.log(`Untracking table ${schema}.${name}...`);
      try {
        await this.hasura.postMetadata({
          type: 'pg_untrack_table',
          args: { source: sourceName, table: { schema, name }, cascade: true },
        });
      } catch (e) {
        this.logger.warn(`Failed to untrack table ${schema}.${name}: ${e}`);
      }
    }
  }

  private async trackAllTables(): Promise<{ schema: string; name: string }[]> {
    this.logger.log(`Tracking all tables in schema "${this.hasura.schema}"...`);

    const sql = `
      SELECT table_schema, table_name
      FROM information_schema.tables
      WHERE table_type = 'BASE TABLE'
        AND table_schema = '${this.hasura.schema}'
      ORDER BY table_schema, table_name;
    `;

    const res = await this.hasura.runSql(sql);
    const rows = res.result?.slice(1) ?? [];

    const tables = rows.map(([schema, name]) => ({ schema, name }));

    if (!tables.length) {
      this.logger.warn('No tables found. Nothing to track.');
      return [];
    }

    for (const t of tables) {
      this.logger.log(`Tracking table ${t.schema}.${t.name}...`);
      try {
        await this.hasura.postMetadata({
          type: 'pg_track_table',
          args: {
            source: this.hasura.source,
            table: { schema: t.schema, name: t.name },
          },
        });
      } catch (e) {
        this.logger.warn(`Failed to track table ${t.schema}.${t.name}: ${e}`);
      }
    }

    return tables;
  }

  private async trackAllRelationships() {
    this.logger.log(
      `Tracking FK-based relationships in schema "${this.hasura.schema}"...`,
    );

    const sql = `
      SELECT json_build_object(
        'fk_table_schema', kcu.table_schema,
        'fk_table_name',   kcu.table_name,
        'pk_table_schema', rel_tco.table_schema,
        'pk_table_name',   rel_tco.table_name,
        'fk_columns',      array_agg(kcu.column_name ORDER BY kcu.ordinal_position),
        'constraint_name', kcu.constraint_name
      )
      FROM information_schema.table_constraints tco
      JOIN information_schema.key_column_usage kcu
        ON tco.constraint_schema = kcu.constraint_schema
       AND tco.constraint_name   = kcu.constraint_name
      JOIN information_schema.referential_constraints rco
        ON tco.constraint_schema = rco.constraint_schema
       AND tco.constraint_name   = rco.constraint_name
      JOIN information_schema.table_constraints rel_tco
        ON rco.unique_constraint_schema = rel_tco.constraint_schema
       AND rco.unique_constraint_name   = rel_tco.constraint_name
      WHERE tco.constraint_type = 'FOREIGN KEY'
        AND kcu.table_schema = '${this.hasura.schema}'
      GROUP BY
        kcu.table_schema,
        kcu.table_name,
        rel_tco.table_name,
        rel_tco.table_schema,
        kcu.constraint_name
      ORDER BY
        kcu.table_schema,
        kcu.table_name;
    `;

    const res = await this.hasura.runSql(sql);
    const rows = res.result?.slice(1) ?? [];

    const fks: ForeignKeyInfo[] = rows.map(([json]) => JSON.parse(json));

    if (!fks.length) {
      this.logger.log('No foreign keys found. Skipping relationship tracking.');
      return;
    }

    for (const fk of fks) {
      await this.trackRelationshipForFk(fk);
    }
  }

  private async trackRelationshipForFk(fk: ForeignKeyInfo) {
    const {
      fk_table_schema,
      fk_table_name,
      pk_table_schema,
      pk_table_name,
      fk_columns,
      constraint_name,
    } = fk;

    // object-rel: дочерняя таблица, имя из FK-колонки (license_type_id -> licenseType)
    let objectRelName: string;
    if (fk_columns.length === 1) {
      const col = fk_columns[0];
      const base = col.endsWith('_id') ? col.slice(0, -3) : col;
      objectRelName = toCamelCase(base);
    } else {
      objectRelName = toCamelCase(
        `${pk_table_name}_by_${constraint_name}`,
      );
    }

    // array-rel: родительская таблица, имя = plural(childTable) -> camelCase
    const pluralChild = toPlural(fk_table_name);
    const arrayRelName = toCamelCase(pluralChild);

    this.logger.log(
      `FK ${constraint_name}: ${fk_table_schema}.${fk_table_name} -> ${pk_table_schema}.${pk_table_name}`,
    );
    this.logger.log(
      `  object: ${fk_table_name}.${objectRelName}, array: ${pk_table_name}.${arrayRelName}`,
    );

    try {
      await this.hasura.postMetadata({
        type: 'pg_create_object_relationship',
        args: {
          source: this.hasura.source,
          table: { schema: fk_table_schema, name: fk_table_name },
          name: objectRelName,
          using: {
            foreign_key_constraint_on:
              fk_columns.length === 1 ? fk_columns[0] : fk_columns,
          },
        },
      });
    } catch (e) {
      this.logger.warn(
        `Failed to create object relationship "${objectRelName}" on ${fk_table_schema}.${fk_table_name}: ${e}`,
      );
    }

    try {
      await this.hasura.postMetadata({
        type: 'pg_create_array_relationship',
        args: {
          source: this.hasura.source,
          table: { schema: pk_table_schema, name: pk_table_name },
          name: arrayRelName,
          using: {
            foreign_key_constraint_on: {
              table: { schema: fk_table_schema, name: fk_table_name },
              columns: fk_columns,
            },
          },
        },
      });
    } catch (e) {
      this.logger.warn(
        `Failed to create array relationship "${arrayRelName}" on ${pk_table_schema}.${pk_table_name}: ${e}`,
      );
    }
  }

  private async applyCamelCaseColumnNames(
    tables: { schema: string; name: string }[],
  ) {
    this.logger.log('Applying camelCase custom names for columns...');

    for (const table of tables) {
      await this.applyCamelCaseForTableColumns(table.schema, table.name);
    }
  }

  private async applyCamelCaseForTableColumns(schema: string, table: string) {
    const sql = `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = '${schema}'
        AND table_name = '${table}';
    `;

    const res = await this.hasura.runSql(sql);
    const rows = res.result?.slice(1) ?? [];
    const columns = rows.map(([name]) => name);

    const columnConfig: Record<string, { custom_name: string }> = {};

    for (const col of columns) {
      const camel = toCamelCase(col);
      if (camel !== col) {
        columnConfig[col] = { custom_name: camel };
      }
    }

    if (!Object.keys(columnConfig).length) return;

    this.logger.log(
      `Setting camelCase column_config for ${schema}.${table}: ${JSON.stringify(
        columnConfig,
      )}`,
    );

    try {
      await this.hasura.postMetadata({
        type: 'pg_set_table_customization',
        args: {
          source: this.hasura.source,
          table: { schema, name: table },
          column_config: columnConfig,
        },
      });
    } catch (e) {
      this.logger.warn(
        `Failed to set column_config for ${schema}.${table}: ${e}`,
      );
    }
  }

  private async reloadMetadata() {
    this.logger.log('Reloading Hasura metadata...');
    try {
      await this.hasura.postMetadata({
        type: 'reload_metadata',
        args: { reload_remote_schemas: true, reload_sources: true },
      });
    } catch (e) {
      this.logger.warn(`Failed to reload metadata: ${e}`);
    }
  }

  private readBool(key: string, defaultValue: boolean): boolean {
    const raw = this.config.get<string | boolean | undefined>(key);
    if (raw === undefined || raw === null) return defaultValue;

    if (typeof raw === 'boolean') return raw;

    const norm = String(raw).trim().toLowerCase();
    if (['1', 'true', 'yes', 'on'].includes(norm)) return true;
    if (['0', 'false', 'no', 'off'].includes(norm)) return false;

    return defaultValue;
  }
}
