import { HasuraRelationshipRef } from './types';

export function getExistingRelationshipsFromSource(
  source: any,
  options?: { schema?: string },
): HasuraRelationshipRef[] {
  const schemaFilter = options?.schema;
  const tables: any[] = source?.tables ?? [];

  const out: HasuraRelationshipRef[] = [];

  for (const t of tables) {
    const table = t?.table ?? t;
    if (!table?.schema || !table?.name) continue;
    if (schemaFilter && table.schema !== schemaFilter) continue;

    const objectRels: any[] = t?.object_relationships ?? [];
    for (const r of objectRels) {
      if (!r?.name || !r?.using) continue;
      out.push({
        kind: 'object',
        table: { schema: table.schema, name: table.name },
        name: r.name,
        using: r.using,
      });
    }

    const arrayRels: any[] = t?.array_relationships ?? [];
    for (const r of arrayRels) {
      if (!r?.name || !r?.using) continue;
      out.push({
        kind: 'array',
        table: { schema: table.schema, name: table.name },
        name: r.name,
        using: r.using,
      });
    }
  }

  return out;
}

