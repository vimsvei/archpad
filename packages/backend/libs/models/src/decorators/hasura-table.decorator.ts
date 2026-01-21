export type HasuraTableUsage = {
  entity: Function;
  options: {
    /**
     * Hasura custom table name (custom_name).
     * If omitted, defaults to the entity class name.
     */
    name?: string;
    /**
     * When true (default), apply custom column names (custom_name) for scalar columns
     * based on entity property names (typically camelCase).
     *
     * When false, only table override is applied; column names are left as DB columns.
     */
    camelCase: boolean;
  };
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
export function HasuraTable(options: {
  name?: string;
  camelCase?: boolean;
} = {}): ClassDecorator {
  return (target: Function) => {
    HASURA_TABLES.push({
      entity: target,
      options: {
        name: options.name,
        camelCase: options.camelCase ?? true,
      },
    });
  };
}
