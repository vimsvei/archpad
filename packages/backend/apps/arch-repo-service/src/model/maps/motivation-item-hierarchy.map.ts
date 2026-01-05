import { HasuraRefName, HasuraTable, MappedObject } from '@archpad/models';
import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { MotivationElementGeneric } from '@/model/archimate/core/motivation-element.generic';

@HasuraTable()
@Entity({ tableName: 'map_motivation_item_hierarchy' })
@Unique({ properties: ['parent', 'child'] })
export class MotivationItemHierarchyMap extends MappedObject {
  @HasuraRefName('children')
  @ManyToOne({
    entity: () => MotivationElementGeneric,
    primary: true,
    fieldName: 'parent_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  parent!: MotivationElementGeneric;

  @HasuraRefName('parents')
  @ManyToOne({
    entity: () => MotivationElementGeneric,
    primary: true,
    fieldName: 'child_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  child!: MotivationElementGeneric;
}
