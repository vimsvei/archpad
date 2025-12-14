import { Logger } from '@nestjs/common';
import { HasuraClientService } from '../hasura-client/hasura-client.service';
import { getSchemaTables } from '../db/get-schema-tables';
import { DbTableRef } from '../db/types';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchDbTables(args: {
  hasura: HasuraClientService;
  logger: Logger;
  retries?: number;
  delayMs?: number;
}): Promise<DbTableRef[]> {
  const { hasura, logger } = args;
  const retries = args.retries ?? 10;
  const delayMs = args.delayMs ?? 500;

  for (let attempt = 1; attempt <= retries; attempt++) {
    const tables = await getSchemaTables(hasura);
    if (tables.length) {
      logger.log(`Fetched ${tables.length} tables from DB (attempt ${attempt}/${retries}).`);
      return tables;
    }

    logger.warn(
      `No tables found in DB schema "${hasura.schema}" (attempt ${attempt}/${retries}). Retrying in ${delayMs}ms...`,
    );
    await delay(delayMs);
  }

  const tables = await getSchemaTables(hasura);
  logger.log(`Fetched ${tables.length} tables from DB (final attempt).`);
  return tables;
}

