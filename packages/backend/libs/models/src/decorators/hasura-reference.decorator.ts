export type HasuraReferenceUsage = {
  entity: Function;
  propertyKey: string | symbol;
  objectName: string;
  collectionName: string;
};

const HASURA_REFERENCES: HasuraReferenceUsage[] = [];

export function getHasuraReferences(): HasuraReferenceUsage[] {
  return HASURA_REFERENCES.slice();
}

/**
 * Declares both sides of a DB FK relationship for Hasura sync:
 *
 * - objectName: name of the object relationship on the FK table (many -> one)
 * - collectionName: name of the array relationship on the referenced (PK) table (one -> many)
 *
 * IMPORTANT:
 * Prefer placing this decorator on the owning side (ManyToOne/OneToOne) where FK columns exist.
 * If you place it on the inverse side (OneToMany), the bootstrap may still resolve it, but will
 * emit a warning and treat it as less reliable.
 */
export function HasuraReference(args: {
  objectName: string;
  collectionName: string;
}): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    HASURA_REFERENCES.push({
      entity: (target as any).constructor,
      propertyKey,
      objectName: args.objectName,
      collectionName: args.collectionName,
    });
  };
}
