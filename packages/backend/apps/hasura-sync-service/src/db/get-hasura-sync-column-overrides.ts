import { HasuraClientService } from '../hasura-client/hasura-client.service';
import { rowsFromRunSql } from './run-sql';

export type HasuraSyncColumnOverride = {
  table_schema: string;
  table_name: string;
  column_name: string;
  custom_name: string;
};

export async function getHasuraSyncColumnOverrides(
  hasura: HasuraClientService,
): Promise<HasuraSyncColumnOverride[]> {
  const sql = `
    SELECT table_schema, table_name, column_name, custom_name
    FROM hasura_sync.column_overrides;
  `;

  const res = await hasura.runSql(sql);
  const rows = rowsFromRunSql(res);
  return rows.map(([table_schema, table_name, column_name, custom_name]) => ({
    table_schema,
    table_name,
    column_name,
    custom_name,
  }));
}
