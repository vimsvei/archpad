export type HasuraCamelCaseUsage = {
  entity: Function;
  propertyKey: string | symbol;
};

const HASURA_CAMELCASE: HasuraCamelCaseUsage[] = [];

export function getHasuraCamelCaseFields(): HasuraCamelCaseUsage[] {
  return HASURA_CAMELCASE.slice();
}

/**
 * Marks a scalar DB column to be exposed in Hasura GraphQL with camelCase custom_name
 * derived from the actual DB column name (field_name -> fieldName).
 */
export function HasuraCamelCase(): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    HASURA_CAMELCASE.push({
      entity: (target as any).constructor,
      propertyKey,
    });
  };
}


