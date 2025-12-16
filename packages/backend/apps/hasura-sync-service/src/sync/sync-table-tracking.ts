import { Logger } from '@nestjs/common';
import { HasuraClientService } from '../hasura-client/hasura-client.service';
import { DbTableRef } from '../db/types';

function keyOf(t: DbTableRef): string {
  return `${t.schema}.${t.name}`;
}

export async function syncTableTracking(args: {
  hasura: HasuraClientService;
  logger: Logger;
  dbTables: DbTableRef[];
  trackedTables: DbTableRef[];
}): Promise<{ tracked: DbTableRef[]; untracked: DbTableRef[] }> {
  const { hasura, logger, dbTables, trackedTables } = args;

  const dbKeys = new Set(dbTables.map(keyOf));
  const trackedKeys = new Set(trackedTables.map(keyOf));

  const toTrack = dbTables.filter((t) => !trackedKeys.has(keyOf(t)));
  const toUntrack = trackedTables.filter((t) => !dbKeys.has(keyOf(t)));

  if (!toTrack.length && !toUntrack.length) {
    logger.log('Tables are already in sync (no track/untrack needed).');
    return { tracked: [], untracked: [] };
  }

  for (const t of toUntrack) {
    logger.log(`Untracking missing table ${t.schema}.${t.name}...`);
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
      logger.warn(`Failed to untrack ${t.schema}.${t.name}: ${e}`);
    }
  }

  for (const t of toTrack) {
    logger.log(`Tracking new table ${t.schema}.${t.name}...`);
    try {
      await hasura.postMetadata({
        type: 'pg_track_table',
        args: {
          source: hasura.source,
          table: { schema: t.schema, name: t.name },
        },
      });
    } catch (e) {
      logger.warn(`Failed to track ${t.schema}.${t.name}: ${e}`);
    }
  }

  return { tracked: toTrack, untracked: toUntrack };
}
