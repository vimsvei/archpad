import { HasuraClientService } from '../hasura-client/hasura-client.service';
import { ForeignKeyInfo } from './types';

export async function getSchemaForeignKeys(
  hasura: HasuraClientService,
): Promise<ForeignKeyInfo[]> {
  const sql = `
    SELECT json_build_object(
      'fk_table_schema', kcu.table_schema,
      'fk_table_name',   kcu.table_name,
      'pk_table_schema', rel_tco.table_schema,
      'pk_table_name',   rel_tco.table_name,
      'fk_columns',      array_agg(kcu.column_name ORDER BY kcu.ordinal_position),
      'constraint_name', kcu.constraint_name
    )
    FROM information_schema.table_constraints tco
    JOIN information_schema.key_column_usage kcu
      ON tco.constraint_schema = kcu.constraint_schema
     AND tco.constraint_name   = kcu.constraint_name
    JOIN information_schema.referential_constraints rco
      ON tco.constraint_schema = rco.constraint_schema
     AND tco.constraint_name   = rco.constraint_name
    JOIN information_schema.table_constraints rel_tco
      ON rco.unique_constraint_schema = rel_tco.constraint_schema
     AND rco.unique_constraint_name   = rel_tco.constraint_name
    WHERE tco.constraint_type = 'FOREIGN KEY'
      AND kcu.table_schema = '${hasura.schema}'
    GROUP BY
      kcu.table_schema,
      kcu.table_name,
      rel_tco.table_name,
      rel_tco.table_schema,
      kcu.constraint_name
    ORDER BY
      kcu.table_schema,
      kcu.table_name;
  `;

  const res = await hasura.runSql(sql);
  const rows = res.result?.slice(1) ?? [];
  return rows.map(([json]) => JSON.parse(json) as ForeignKeyInfo);
}
