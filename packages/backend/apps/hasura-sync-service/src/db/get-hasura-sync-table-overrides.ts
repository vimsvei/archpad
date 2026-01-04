import { HasuraClientService } from '../hasura-client/hasura-client.service';

export type HasuraSyncTableOverride = {
  table_schema: string;
  table_name: string;
  custom_name: string;
};

export async function getHasuraSyncTableOverrides(
  hasura: HasuraClientService,
): Promise<HasuraSyncTableOverride[]> {
  const sql = `
    SELECT table_schema, table_name, custom_name
    FROM hasura_sync.table_overrides;
  `;

  const res = await hasura.runSql(sql);
  const rows = res.result?.slice(1) ?? [];
  return rows.map(([table_schema, table_name, custom_name]) => ({
    table_schema,
    table_name,
    custom_name,
  }));
}
