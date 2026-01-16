import { LoggerService } from '@archpad/logger';
import { HasuraClientService } from '../hasura-client/hasura-client.service';
import { DbTableRef } from '../db/types';

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
  const ops = tables.map((t) => ({
    type: 'pg_track_table',
    args: {
      source: hasura.source,
      table: { schema: t.schema, name: t.name },
    },
  }));

  await hasura.postMetadataBulkAtomicChunked(ops, {
    chunkSize: 30,
    label: 'pg_track_table',
  });
}
