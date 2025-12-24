import { MappedObject } from '@archpad/models';
import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core';
import {TechnologyNetwork} from "@/model/archimate/technology/technology-network.entity";

@Entity({ tableName: 'map_technology_network_hierarchy' })
@Unique({ properties: ['parent', 'child'] })
export class TechnologyNetworkHierarchyMap extends MappedObject {
  @ManyToOne({
    entity: () => TechnologyNetwork,
    primary: true,
    fieldName: 'network_parent_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  parent!: TechnologyNetwork;

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
