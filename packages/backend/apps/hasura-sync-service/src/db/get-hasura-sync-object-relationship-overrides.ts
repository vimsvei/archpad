import { HasuraClientService } from '../hasura-client/hasura-client.service';

export type HasuraSyncObjectRelationshipOverride = {
  fk_table_schema: string;
  fk_table_name: string;
  fk_columns: string[];
  name: string;
};

export async function getHasuraSyncObjectRelationshipOverrides(
  hasura: HasuraClientService,
): Promise<HasuraSyncObjectRelationshipOverride[]> {
  const sql = `
    SELECT json_build_object(
      'fk_table_schema', fk_table_schema,
      'fk_table_name',   fk_table_name,
      'fk_columns',      fk_columns,
      'name',            name
    )
    FROM hasura_sync.object_relationship_overrides;
  `;

  const res = await hasura.runSql(sql);
  const rows = res.result?.slice(1) ?? [];
  return rows.map(
    ([json]) => JSON.parse(json) as HasuraSyncObjectRelationshipOverride,
  );
}
