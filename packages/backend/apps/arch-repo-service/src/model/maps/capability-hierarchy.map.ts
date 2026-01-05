import { HasuraTable, MappedObject } from '@archpad/models';
import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { TechnologyNode } from '@/model/archimate/technology/technology-node.entity';
import { HasuraRefName } from '@archpad/models';

@HasuraTable()
@Entity({ tableName: 'map_technology_node_hierarchy' })
@Unique({ properties: ['parent', 'child'] })
export class TechnologyNodeHierarchyMap extends MappedObject {
  @HasuraRefName()
  @ManyToOne({
    entity: () => TechnologyNode,
    primary: true,
    fieldName: 'node_parent_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  parent!: TechnologyNode;

  @HasuraRefName()
  @ManyToOne({
    entity: () => TechnologyNode,
    primary: true,
    fieldName: 'node_child_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  child!: TechnologyNode;

  @Property({ type: 'int', nullable: true })
  order?: number;
}
