import { MappedObject } from '@/model/abstract/mapped-object.abstract';
import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { TechnologyNode } from '@/model/archimate/technology/technology-node.entity';

@Entity({ tableName: 'map_technology_node_hierarchy' })
@Unique({ properties: ['parent', 'child'] })
export class TechnologyNodeHierarchyMap extends MappedObject {
  @ManyToOne({
    entity: () => TechnologyNode,
    fieldName: 'node_parent_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  parent!: TechnologyNode;

  @ManyToOne({
    entity: () => TechnologyNode,
    fieldName: 'node_child_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  child!: TechnologyNode;

  @Property({ type: 'int', nullable: true })
  order?: number;
}
