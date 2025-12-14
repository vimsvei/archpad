import { DbTableRef } from '../db/types';

export function getTrackedTablesFromSource(
  source: any,
  options?: { schema?: string },
): DbTableRef[] {
  const schemaFilter = options?.schema;
  const tables: any[] = source?.tables ?? [];

  const tracked = tables
    .map((t) => t?.table ?? t)
    .filter(Boolean)
    .map((t) => ({ schema: t.schema, name: t.name }))
    .filter((t) => !!t.schema && !!t.name);

  if (!schemaFilter) return tracked;
  return tracked.filter((t) => t.schema === schemaFilter);
}

