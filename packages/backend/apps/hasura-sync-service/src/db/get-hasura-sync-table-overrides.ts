import { HasuraClientService } from '../hasura-client/hasura-client.service';

export type HasuraSyncTableOverride = {
  table_schema: string;
  table_name: string;
  custom_name: string;
  camel_case: boolean;
};

export async function getHasuraSyncTableOverrides(
  hasura: HasuraClientService,
): Promise<HasuraSyncTableOverride[]> {
  // Backward-compatible: older DBs may not have `camel_case` column yet.
  try {
    const res = await hasura.runSql(`
      SELECT table_schema, table_name, custom_name, camel_case
      FROM hasura_sync.table_overrides;
    `);
    const rows = res.result?.slice(1) ?? [];
    return rows.map(([table_schema, table_name, custom_name, camel_case]) => ({
      table_schema,
      table_name,
      custom_name,
      camel_case: String(camel_case) === 'false' ? false : Boolean(camel_case),
    }));
  } catch {
    const res = await hasura.runSql(`
      SELECT table_schema, table_name, custom_name
      FROM hasura_sync.table_overrides;
    `);
    const rows = res.result?.slice(1) ?? [];
    return rows.map(([table_schema, table_name, custom_name]) => ({
      table_schema,
      table_name,
      custom_name,
      camel_case: true,
    }));
  }
}
