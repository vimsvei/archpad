import { LoggerService } from '@archpad/logger';
import { HasuraClientService } from '../hasura-client/hasura-client.service';
import { getHasuraSyncColumnOverrides } from '../db/get-hasura-sync-column-overrides';
import { getHasuraSyncTableOverrides } from '../db/get-hasura-sync-table-overrides';
import { getTableColumns } from '../db/get-table-columns';
import { DbTableRef } from '../db/types';
import { toCamelCase } from '../utils/naming.util';

export async function applyCamelCaseCustomization(args: {
  hasura: HasuraClientService;
  logger: LoggerService;
  tables: DbTableRef[];
  fallbackCamelCase?: boolean;
}): Promise<void> {
  const { hasura, logger, tables, fallbackCamelCase = true } = args;

  logger.log(
    'Applying table/column custom names (decorators via hasura_sync registry + optional camelCase fallback)...',
  );

  const [tableOverrides, columnOverrides] = await Promise.all([
    getHasuraSyncTableOverrides(hasura).catch(() => []),
    getHasuraSyncColumnOverrides(hasura).catch(() => []),
  ]);

  const tableOverrideByKey = new Map<string, string>();
  for (const o of tableOverrides) {
    tableOverrideByKey.set(`${o.table_schema}.${o.table_name}`, o.custom_name);
  }

  const colOverrideByKey = new Map<string, string>();
  for (const o of columnOverrides) {
    colOverrideByKey.set(
      `${o.table_schema}.${o.table_name}.${o.column_name}`,
      o.custom_name,
    );
  }

  for (const table of tables) {
    const hasuraTableName = tableOverrideByKey.get(
      `${table.schema}.${table.name}`,
    );

    const columns = await getTableColumns({
      hasura,
      schema: table.schema,
      table: table.name,
    });

    const columnConfig: Record<string, { custom_name: string }> = {};

    for (const col of columns) {
      const override = colOverrideByKey.get(
        `${table.schema}.${table.name}.${col}`,
      );
      if (override) {
        if (override !== col) {
          columnConfig[col] = { custom_name: override };
        }
        continue;
      }

      if (fallbackCamelCase) {
        const camel = toCamelCase(col);
        if (camel !== col) {
          columnConfig[col] = { custom_name: camel };
        }
      }
    }

    const customTableName =
      hasuraTableName ?? (fallbackCamelCase ? toCamelCase(table.name) : table.name);

    const configuration: any = {};
    const metadataArgs: any = {
      source: hasura.source,
      table: { schema: table.schema, name: table.name },
    };

    if (customTableName !== table.name) {
      // Hasura expects the table custom name under configuration.identifier
      configuration.identifier = customTableName;
    }
    if (Object.keys(columnConfig).length) {
      configuration.column_config = columnConfig;
    }

    if (!configuration.identifier && !configuration.column_config) continue;
    metadataArgs.configuration = configuration;

    logger.log(
      `Setting customization for ${table.schema}.${table.name} (table=${
        configuration.identifier ?? '—'
      }, columns=${Object.keys(columnConfig).length})`,
    );

    try {
      await hasura.postMetadata({
        type: 'pg_set_table_customization',
        args: metadataArgs,
      });
    } catch (e) {
      logger.warn(
        `Failed to set customization for ${table.schema}.${table.name}: ${e}`,
      );
    }
  }
}
