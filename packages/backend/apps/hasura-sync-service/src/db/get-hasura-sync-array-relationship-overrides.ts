import { HasuraClientService } from '../hasura-client/hasura-client.service';
import { runSqlJsonRows } from './run-sql';

export type HasuraSyncArrayRelationshipOverride = {
  pk_table_schema: string;
  pk_table_name: string;
  fk_table_schema: string;
  fk_table_name: string;
  fk_columns: string[];
  name: string;
};

export async function getHasuraSyncArrayRelationshipOverrides(
  hasura: HasuraClientService,
): Promise<HasuraSyncArrayRelationshipOverride[]> {
  const sql = `
    SELECT json_build_object(
      'pk_table_schema', pk_table_schema,
      'pk_table_name',   pk_table_name,
      'fk_table_schema', fk_table_schema,
      'fk_table_name',   fk_table_name,
      'fk_columns',      fk_columns,
      'name',            name
    )
    FROM hasura_sync.array_relationship_overrides;
  `;
  return runSqlJsonRows<HasuraSyncArrayRelationshipOverride>(hasura, sql);
}
