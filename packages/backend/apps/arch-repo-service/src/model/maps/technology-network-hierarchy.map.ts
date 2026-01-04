import { HasuraRefName, HasuraTable, MappedObject } from '@archpad/models';
import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { TechnologyNetwork } from '@/model/archimate/technology/technology-network.entity';

@HasuraTable()
@Entity({ tableName: 'map_technology_network_hierarchy' })
@Unique({ properties: ['parent', 'child'] })
export class TechnologyNetworkHierarchyMap extends MappedObject {
  @HasuraRefName()
  @ManyToOne({
    entity: () => TechnologyNetwork,
    primary: true,
    fieldName: 'network_parent_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  parent!: TechnologyNetwork;

  @HasuraRefName()
  @ManyToOne({
    entity: () => TechnologyNetwork,
    primary: true,
    fieldName: 'network_child_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  child!: TechnologyNetwork;

  @Property({ type: 'int', nullable: true })
  order?: number;
}
