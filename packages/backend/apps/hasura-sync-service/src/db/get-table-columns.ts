import { HasuraClientService } from '../hasura-client/hasura-client.service';

export async function getTableColumns(args: {
  hasura: HasuraClientService;
  schema: string;
  table: string;
}): Promise<string[]> {
  const { hasura, schema, table } = args;

  const sql = `
    SELECT column_name
    FROM information_schema.columns
    WHERE table_schema = '${schema}'
      AND table_name = '${table}';
  `;

  const res = await hasura.runSql(sql);
  const rows = res.result?.slice(1) ?? [];
  return rows.map(([name]) => name);
}
