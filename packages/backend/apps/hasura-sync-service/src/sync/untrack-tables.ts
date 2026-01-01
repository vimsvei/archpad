import { LoggerService } from '@archpad/logger';
import { HasuraClientService } from '../hasura-client/hasura-client.service';
import { DbTableRef } from '../db/types';

export async function untrackTables(args: {
  hasura: HasuraClientService;
  logger: LoggerService;
  tables: DbTableRef[];
}): Promise<void> {
  const { hasura, logger, tables } = args;

  if (!tables.length) {
    logger.log('No tracked tables found to untrack. Skipping.');
    return;
  }

  logger.log(`Untracking ${tables.length} tracked tables (cascade=true)...`);

  for (const t of tables) {
    logger.log(`Untracking table ${t.schema}.${t.name}...`);
    try {
      await hasura.postMetadata({
        type: 'pg_untrack_table',
        args: {
          source: hasura.source,
          table: { schema: t.schema, name: t.name },
          cascade: true,
        },
      });
    } catch (e) {
      logger.warn(`Failed to untrack table ${t.schema}.${t.name}: ${e}`);
    }
  }
}
