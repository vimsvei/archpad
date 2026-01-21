import { HasuraClientService } from '../hasura-client/hasura-client.service';

/**
 * Fetch columns for all tables in a schema in a single query.
 * Returns a map: table_name -> [column_name, ...] ordered by ordinal_position.
 */
export async function getSchemaTableColumns(
  hasura: HasuraClientService,
): Promise<Map<string, string[]>> {
  const schema = hasura.schema;
  const sql = `
    SELECT table_name, column_name
    FROM information_schema.columns
    WHERE table_schema = '${schema}'
    ORDER BY table_name, ordinal_position;
  `;

  const res = await hasura.runSql(sql);
  const rows = res.result?.slice(1) ?? [];
  const out = new Map<string, string[]>();
  for (const [tableName, colName] of rows) {
    if (!tableName || !colName) continue;
    const list = out.get(tableName) ?? [];
    list.push(colName);
    out.set(tableName, list);
  }
  return out;
}
