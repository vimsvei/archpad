import { HasuraTable, MappedObject } from '@archpad/models';
import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { TechnologyNode } from '@/model/archimate/technology/technology-node.entity';
import { HasuraRefName } from '@archpad/models';
import { Capability } from '@/model/archimate/strategy/capability.entity';

@HasuraTable()
@Entity({ tableName: 'map_capability_hierarchy' })
@Unique({ properties: ['parent', 'child'] })
export class CapabilityHierarchyMap extends MappedObject {
  @HasuraRefName()
  @ManyToOne({
    entity: () => Capability,
    primary: true,
    fieldName: 'parent_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  parent!: Capability;

  @HasuraRefName()
  @ManyToOne({
    entity: () => Capability,
    primary: true,
    fieldName: 'child_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  child!: Capability;

  @Property({ type: 'int', nullable: true })
  order?: number;
}
