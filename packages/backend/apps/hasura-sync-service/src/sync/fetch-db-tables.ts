import { LoggerService } from '@archpad/logger';
import { HasuraClientService } from '../hasura-client/hasura-client.service';
import { getSchemaTables } from '../db/get-schema-tables';
import { DbTableRef } from '../db/types';
import { retry } from '../utils/retry';

export async function fetchDbTables(args: {
  hasura: HasuraClientService;
  logger: LoggerService;
  retries?: number;
  delayMs?: number;
}): Promise<DbTableRef[]> {
  const { hasura, logger } = args;
  const retries = args.retries ?? 5;
  const delayMs = args.delayMs ?? 300;

  return await retry<DbTableRef[]>({
    retries,
    delayMs,
    fn: async (attempt) => {
      const t = await getSchemaTables(hasura);
      logger.log(
        `Fetched ${t.length} tables from DB (attempt ${attempt}/${retries}).`,
      );
      return t;
    },
    shouldRetry: (t) => t.length === 0,
    onRetry: ({ attempt, nextDelayMs }) => {
      logger.warn(
        `No tables found in DB schema "${hasura.schema}" (attempt ${attempt}/${retries}). Retrying in ${nextDelayMs}ms...`,
      );
    },
  });
}
