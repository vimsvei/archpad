import { LoggerService } from '@archpad/logger';
import { HasuraClientService } from '../hasura-client/hasura-client.service';
import { DbTableRef } from '../db/types';
import { getSchemaTableColumns } from '../db/get-schema-table-columns';
import { formatHasuraError } from '../utils/hasura-error';
import {
  applyMetadataOps,
  opCreateSelectPermission,
} from '../utils/metadata-ops';

export async function applyDefaultSelectPermissions(args: {
  hasura: HasuraClientService;
  logger: LoggerService;
  role: string;
  tables: DbTableRef[];
}): Promise<void> {
  const { hasura, logger, role, tables } = args;

  if (!tables.length) return;

  logger.log(`Applying default select permissions for role="${role}"...`);

  const columnsByTable = await getSchemaTableColumns(hasura).catch((e) => {
    logger.warn(`Failed to fetch schema columns: ${formatHasuraError(e)}`);
    return new Map<string, string[]>();
  });

  const ops: any[] = [];
  for (const t of tables) {
    const columns = columnsByTable.get(t.name) ?? [];

    if (!columns.length) {
      logger.warn(
        `No columns found for ${t.schema}.${t.name}. Skipping select permission.`,
      );
      continue;
    }

    logger.log(
      `Ensuring select permission for ${t.schema}.${t.name} role="${role}" columns=${columns.length} allow_aggregations=true`,
    );

    ops.push(
      opCreateSelectPermission({
        source: hasura.source,
        table: t,
        role,
        columns,
        allowAggregations: true,
      }),
    );
  }

  await applyMetadataOps({
    hasura,
    logger,
    label: 'pg_create_select_permission',
    ops,
  });
}
