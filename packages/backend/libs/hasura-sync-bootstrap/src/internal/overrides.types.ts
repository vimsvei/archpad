import type {
  HasuraReferenceUsage,
  HasuraSyncArrayRelationshipOverride,
  HasuraSyncColumnOverride,
  HasuraSyncObjectRelationshipOverride,
  HasuraSyncTableOverride,
} from '@archpad/models';

export type ResolvedHasuraReference = {
  usage: HasuraReferenceUsage;
  fkSchema: string;
  fkTable: string;
  fkColumns: string[];
  pkSchema: string;
  pkTable: string;
  objectName: string;
  collectionName: string;
};

export type TableOverrideRow = Pick<
  HasuraSyncTableOverride,
  'tableSchema' | 'tableName' | 'customName' | 'camelCase' | 'updatedAt'
>;

export type ColumnOverrideRow = Pick<
  HasuraSyncColumnOverride,
  'tableSchema' | 'tableName' | 'columnName' | 'customName' | 'updatedAt'
>;

export type ObjectRelationshipOverrideRow = Pick<
  HasuraSyncObjectRelationshipOverride,
  'fkTableSchema' | 'fkTableName' | 'fkColumns' | 'name' | 'updatedAt'
>;

export type ArrayRelationshipOverrideRow = Pick<
  HasuraSyncArrayRelationshipOverride,
  | 'pkTableSchema'
  | 'pkTableName'
  | 'fkTableSchema'
  | 'fkTableName'
  | 'fkColumns'
  | 'name'
  | 'updatedAt'
>;

export type OverridesAccumulator = {
  tableOverrides: Map<string, TableOverrideRow>;
  columnOverrides: Map<string, ColumnOverrideRow>;
  objectRelationshipOverrides: Map<string, ObjectRelationshipOverrideRow>;
  arrayRelationshipOverrides: Map<string, ArrayRelationshipOverrideRow>;
};

export function createOverridesAccumulator(): OverridesAccumulator {
  return {
    tableOverrides: new Map(),
    columnOverrides: new Map(),
    objectRelationshipOverrides: new Map(),
    arrayRelationshipOverrides: new Map(),
  };
}

