import { HasuraTable, MappedObject } from '@archpad/models';
import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { TechnologyNode } from '@/model/archimate/technology/technology-node.entity';
import { HasuraReference } from '@archpad/models';
import { Capability } from '@/model/archimate/strategy/capability.entity';

@HasuraTable()
@Entity({ tableName: 'map_capability_hierarchy' })
@Unique({ properties: ['parent', 'child'] })
export class CapabilityHierarchyMap extends MappedObject {
  @HasuraReference({ objectName: 'parent', collectionName: 'children' })
  @ManyToOne({
    entity: () => Capability,
    primary: true,
    fieldName: 'parent_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  parent!: Capability;

  @HasuraReference({ objectName: 'child', collectionName: 'parents' })
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
