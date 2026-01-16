import { LoggerService } from '@archpad/logger';
import { HasuraClientService } from '../hasura-client/hasura-client.service';
import { getHasuraSyncColumnOverrides } from '../db/get-hasura-sync-column-overrides';
import { getHasuraSyncTableOverrides } from '../db/get-hasura-sync-table-overrides';
import { getTableColumns } from '../db/get-table-columns';
import { DbTableRef } from '../db/types';
import { toCamelCase } from '../utils/naming.util';

function buildDefaultRootFields(customName: string): Record<string, string> {
  return {
    select: customName,
    select_by_pk: `${customName}ByPk`,
    select_aggregate: `${customName}Aggregate`,
    insert: `insert${customName}`,
    insert_one: `insert${customName}One`,
    update: `update${customName}`,
    update_by_pk: `update${customName}ByPk`,
    delete: `delete${customName}`,
    delete_by_pk: `delete${customName}ByPk`,
  };
}

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

  const ops: any[] = [];
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
    const customColumnNames: Record<string, string> = {};

    for (const col of columns) {
      const override = colOverrideByKey.get(
        `${table.schema}.${table.name}.${col}`,
      );
      if (override) {
        if (override !== col) {
          columnConfig[col] = { custom_name: override };
          customColumnNames[col] = override;
        }
        continue;
      }

      if (fallbackCamelCase) {
        const camel = toCamelCase(col);
        if (camel !== col) {
          columnConfig[col] = { custom_name: camel };
          customColumnNames[col] = camel;
        }
      }
    }

    const customTableName =
      hasuraTableName ??
      (fallbackCamelCase ? toCamelCase(table.name) : table.name);

    const configuration: any = {};
    const metadataArgs: any = {
      source: hasura.source,
      table: { schema: table.schema, name: table.name },
    };

    if (customTableName !== table.name) {
      // Depending on Hasura version/metadata shape, table custom name can be expressed
      // either as `custom_name` or under `identifier`. We set both to be safe.
      configuration.custom_name = customTableName;
      configuration.identifier = customTableName;
    }
    if (Object.keys(columnConfig).length) {
      // Same story for column customization: some shapes use `custom_column_names`,
      // others use `column_config`. We set both consistently.
      configuration.custom_column_names = customColumnNames;
      configuration.column_config = columnConfig;
    }

    // If table is explicitly overridden (decorated via @HasuraTable), also rename root fields
    // so the change is visible in GraphQL queries.
    if (hasuraTableName) {
      configuration.custom_root_fields = buildDefaultRootFields(
        configuration.custom_name ??
          configuration.identifier ??
          hasuraTableName,
      );
    }

    if (
      !configuration.custom_name &&
      !configuration.identifier &&
      !configuration.custom_column_names &&
      !configuration.column_config &&
      !configuration.custom_root_fields
    ) {
      continue;
    }
    metadataArgs.configuration = configuration;

    logger.log(
      `Setting customization for ${table.schema}.${table.name} (table=${
        configuration.custom_name ?? configuration.identifier ?? '—'
      }, columns=${Object.keys(columnConfig).length})`,
    );

    ops.push({
      type: 'pg_set_table_customization',
      args: metadataArgs,
    });
  }

  if (ops.length === 0) return;
  await hasura.postMetadataBulkAtomicChunked(ops, {
    chunkSize: 25,
    label: 'pg_set_table_customization',
  });
}
