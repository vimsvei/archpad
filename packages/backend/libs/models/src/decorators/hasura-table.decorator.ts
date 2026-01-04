export type HasuraTableUsage = {
  entity: Function;
};

const HASURA_TABLES: HasuraTableUsage[] = [];

export function getHasuraTables(): HasuraTableUsage[] {
  return HASURA_TABLES.slice();
}

/**
 * Marks an entity table as Hasura-exposed with naming based on class/property names.
 *
 * - Table custom name in Hasura should be the entity class name.
 * - Column custom names should follow the mapped property names.
 *
 * Materialization is done by application bootstrap (arch-repo-service / tenant-service),
 * typically by writing DB comments that hasura-sync-service can read.
 */
export function HasuraTable(): ClassDecorator {
  return (target: Function) => {
    HASURA_TABLES.push({ entity: target });
  };
}
