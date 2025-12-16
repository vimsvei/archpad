import { DbTableRef } from '../db/types';

export type HasuraRelationshipKind = 'object' | 'array';

export interface HasuraRelationshipRef {
  kind: HasuraRelationshipKind;
  table: DbTableRef;
  name: string;
  using: any;
}
