import { Logger } from '@nestjs/common';
import { HasuraClientService } from '../hasura-client/hasura-client.service';
import { DbTableRef } from '../db/types';

export async function trackTables(args: {
  hasura: HasuraClientService;
  logger: Logger;
  tables: DbTableRef[];
}): Promise<void> {
  const { hasura, logger, tables } = args;

  if (!tables.length) {
    logger.warn('No tables found in DB. Nothing to track.');
    return;
  }

  logger.log(`Tracking ${tables.length} tables...`);

  for (const t of tables) {
    logger.log(`Tracking table ${t.schema}.${t.name}...`);
    try {
      await hasura.postMetadata({
        type: 'pg_track_table',
        args: { source: hasura.source, table: { schema: t.schema, name: t.name } },
      });
    } catch (e) {
      logger.warn(`Failed to track table ${t.schema}.${t.name}: ${e}`);
    }
  }
}

