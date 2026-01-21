import { HasuraClientService } from '../hasura-client/hasura-client.service';
import { runSqlJsonRows } from './run-sql';

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
  return runSqlJsonRows<HasuraSyncObjectRelationshipOverride>(hasura, sql);
}
