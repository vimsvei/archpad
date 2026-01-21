export type HasuraPropertyUsage = {
  entity: Function;
  propertyKey: string | symbol;
  options: {
    /**
     * Hasura custom column name (custom_name).
     * If omitted and camelCase=true, name is derived from DB column name (snake_case -> camelCase).
     */
    name?: string;
    /**
     * When true (default), derive custom column name from DB column name (snake_case -> camelCase).
     * When false, no column override is applied (unless `name` is provided).
     */
    camelCase: boolean;
  };
};

const HASURA_PROPERTIES: HasuraPropertyUsage[] = [];

export function getHasuraProperties(): HasuraPropertyUsage[] {
  return HASURA_PROPERTIES.slice();
}

/**
 * Declares Hasura column naming override for a scalar column.
 *
 * Primary use-cases:
 * - A DB column is snake_case (field_name) and you want Hasura to expose it as camelCase (fieldName)
 * - You want to explicitly override Hasura column name (custom_name)
 *
 * Note: table-level defaults are handled by `@HasuraTable({ camelCase: true })`.
 */
export function HasuraProperty(
  options: { name?: string; camelCase?: boolean } = {},
): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    HASURA_PROPERTIES.push({
      entity: (target as any).constructor,
      propertyKey,
      options: {
        name: options.name,
        camelCase: options.camelCase ?? true,
      },
    });
  };
}

