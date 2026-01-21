import { HasuraClientService } from '../hasura-client/hasura-client.service';

type RunSqlResult = { result_type: string; result: string[][] };

export function rowsFromRunSql(res: RunSqlResult): string[][] {
  return res.result?.slice(1) ?? [];
}

/**
 * Helper for `run_sql` queries that return a single JSON column per row.
 * The query should return 1 column where each cell is JSON text.
 */
export async function runSqlJsonRows<T>(
  hasura: HasuraClientService,
  sql: string,
): Promise<T[]> {
  const res = await hasura.runSql(sql);
  return rowsFromRunSql(res).map(([json]) => JSON.parse(json) as T);
}

