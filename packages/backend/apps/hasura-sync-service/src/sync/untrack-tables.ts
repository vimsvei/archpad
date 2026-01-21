import { LoggerService } from '@archpad/logger';
import { HasuraClientService } from '../hasura-client/hasura-client.service';
import { DbTableRef } from '../db/types';
import { applyMetadataOps, opUntrackTable } from '../utils/metadata-ops';

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
  const ops = tables.map((t) => opUntrackTable(hasura.source, t, { cascade: true }));
  await applyMetadataOps({
    hasura,
    logger,
    label: 'pg_untrack_table',
    chunkSize: 50,
    ops,
  });
}
