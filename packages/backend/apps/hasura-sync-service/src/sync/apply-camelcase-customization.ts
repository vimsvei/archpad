import { Logger } from '@nestjs/common';
import { HasuraClientService } from '../hasura-client/hasura-client.service';
import { getTableColumns } from '../db/get-table-columns';
import { DbTableRef } from '../db/types';
import { toCamelCase } from '../utils/naming.util';

export async function applyCamelCaseCustomization(args: {
  hasura: HasuraClientService;
  logger: Logger;
  tables: DbTableRef[];
}): Promise<void> {
  const { hasura, logger, tables } = args;

  logger.log('Applying camelCase custom names for tables and columns...');

  for (const table of tables) {
    const columns = await getTableColumns({
      hasura,
      schema: table.schema,
      table: table.name,
    });

    const columnConfig: Record<string, { custom_name: string }> = {};
    for (const col of columns) {
      const camel = toCamelCase(col);
      if (camel !== col) {
        columnConfig[col] = { custom_name: camel };
      }
    }

    const customTableName = toCamelCase(table.name);

    const args: any = {
      source: hasura.source,
      table: { schema: table.schema, name: table.name },
    };

    if (customTableName !== table.name) {
      args.custom_name = customTableName;
    }
    if (Object.keys(columnConfig).length) {
      args.column_config = columnConfig;
    }

    if (!args.custom_name && !args.column_config) continue;

    logger.log(
      `Setting customization for ${table.schema}.${table.name} (custom_name=${
        args.custom_name ?? '—'
      }, columns=${Object.keys(columnConfig).length})`,
    );

    try {
      await hasura.postMetadata({
        type: 'pg_set_table_customization',
        args,
      });
    } catch (e) {
      logger.warn(`Failed to set customization for ${table.schema}.${table.name}: ${e}`);
    }
  }
}

