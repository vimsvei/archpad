export type HasuraRefNameUsage = {
  entity: Function;
  propertyKey: string | symbol;
  name: string;
  explicit: boolean;
};

const HASURA_REF_NAMES: HasuraRefNameUsage[] = [];

/**
 * Returns all registered @HasuraName usages in the current process.
 * Note: to populate this registry you must import the entities where the decorator is used.
 */
export function getHasuraRefNames(): HasuraRefNameUsage[] {
  return HASURA_REF_NAMES.slice();
}

/**
 * Marks a relation field (typically on the "many" side) with the desired Hasura relationship name
 * for the reverse (array) relationship on the referenced table.
 *
 * Implementation detail: we store usages in an in-memory registry, similar to ArchimateCode.
 * Another service can materialize this into DB comments or an artifact consumed by hasura-sync-service.
 */
export function HasuraRefName(name?: string): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    HASURA_REF_NAMES.push({
      entity: (target as any).constructor,
      propertyKey,
      name: name ?? String(propertyKey),
      explicit: typeof name === 'string',
    });
  };
}

/**
 * Backward compatibility alias for older name.
 * Prefer using HasuraRefName().
 */
export const HasuraName = HasuraRefName;


