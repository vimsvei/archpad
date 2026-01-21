import { LoggerService } from '@archpad/logger';
import { HasuraClientService } from '../hasura-client/hasura-client.service';
import { DbTableRef } from '../db/types';
import { getSchemaTableColumns } from '../db/get-schema-table-columns';

function isAlreadyExistsError(e: unknown): boolean {
  const msg = (e as any)?.message ?? '';
  return typeof msg === 'string' && msg.toLowerCase().includes('already');
}

function formatHasuraError(e: unknown): string {
  const anyErr = e as any;
  const status = anyErr?.response?.status;
  const data = anyErr?.response?.data;
  const message = anyErr?.message;

  if (data !== undefined) {
    try {
      return `status=${status ?? '-'} ${JSON.stringify(data)}`;
    } catch {
      return `status=${status ?? '-'} ${String(data)}`;
    }
  }

  return String(message ?? e);
}

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

    ops.push({
      type: 'pg_create_select_permission',
      args: {
        source: hasura.source,
        table: { schema: t.schema, name: t.name },
        role,
        permission: {
          columns,
          filter: {},
          allow_aggregations: true,
        },
      },
    });
  }

  if (ops.length === 0) return;
  await hasura.postMetadataBulkAtomicChunked(ops, {
    chunkSize: 20,
    label: 'pg_create_select_permission',
  });
}
