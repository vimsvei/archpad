import { HasuraClientService } from '../hasura-client/hasura-client.service';
import { DbTableRef } from './types';
import { rowsFromRunSql } from './run-sql';

export async function getSchemaTables(
  hasura: HasuraClientService,
): Promise<DbTableRef[]> {
  const sql = `
    SELECT table_schema, table_name
    FROM information_schema.tables
    WHERE table_type = 'BASE TABLE'
      AND table_schema = '${hasura.schema}'
    ORDER BY table_schema, table_name;
  `;

  const res = await hasura.runSql(sql);
  const rows = rowsFromRunSql(res);
  return rows.map(([schema, name]) => ({ schema, name }));
}
