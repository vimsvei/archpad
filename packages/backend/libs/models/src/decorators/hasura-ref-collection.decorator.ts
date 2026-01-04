export type HasuraRefCollectionUsage = {
  entity: Function;
  propertyKey: string | symbol;
  name: string;
  explicit: boolean;
};

const HASURA_REF_COLLECTIONS: HasuraRefCollectionUsage[] = [];

export function getHasuraRefCollections(): HasuraRefCollectionUsage[] {
  return HASURA_REF_COLLECTIONS.slice();
}

/**
 * Marks a collection relation field on the "one" side with desired Hasura array relationship name.
 *
 * If name is not provided, uses the property name.
 */
export function HasuraRefCollection(name?: string): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    HASURA_REF_COLLECTIONS.push({
      entity: (target as any).constructor,
      propertyKey,
      name: name ?? String(propertyKey),
      explicit: typeof name === 'string',
    });
  };
}
