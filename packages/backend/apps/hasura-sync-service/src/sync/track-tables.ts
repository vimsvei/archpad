import { LoggerService } from '@archpad/logger';
import { HasuraClientService } from '../hasura-client/hasura-client.service';
import { DbTableRef } from '../db/types';
import { applyMetadataOps, opTrackTable } from '../utils/metadata-ops';

export async function trackTables(args: {
  hasura: HasuraClientService;
  logger: LoggerService;
  tables: DbTableRef[];
}): Promise<void> {
  const { hasura, logger, tables } = args;

  if (!tables.length) {
    logger.warn('No tables found in DB. Nothing to track.');
    return;
  }

  logger.log(`Tracking ${tables.length} tables...`);
  const ops = tables.map((t) => opTrackTable(hasura.source, t));
  await applyMetadataOps({
    hasura,
    logger,
    label: 'pg_track_table',
    chunkSize: 80,
    ops,
  });
}
