import { HasuraReference, HasuraTable, MappedObject } from '@archpad/models';
import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { MotivationElementGeneric } from '@/model/archimate/core/motivation-element.generic';

@HasuraTable()
@Entity({ tableName: 'map_motivation_item_hierarchy' })
@Unique({ properties: ['parent', 'child'] })
export class MotivationItemHierarchyMap extends MappedObject {
  @HasuraReference({ objectName: 'parent', collectionName: 'children' })
  @ManyToOne({
    entity: () => MotivationElementGeneric,
    primary: true,
    fieldName: 'parent_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  parent!: MotivationElementGeneric;

  @HasuraReference({ objectName: 'child', collectionName: 'parents' })
  @ManyToOne({
    entity: () => MotivationElementGeneric,
    primary: true,
    fieldName: 'child_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  child!: MotivationElementGeneric;
}
