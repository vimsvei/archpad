import { MappedObject } from '@/model/abstract/mapped-object.abstract';
import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { TechnologyNode } from '@/model/entities/archimate/technology/technology-node.entity';
import { SystemSoftware } from '@/model/entities/archimate/technology/system-software.entity';

@Entity({ tableName: 'map_technology_node_system_software' })
@Unique({ properties: ['node', 'systemSoftware'] })
export class TechnologyNodeSystemSoftwareMap extends MappedObject {
  @ManyToOne({
    entity: () => TechnologyNode,
    fieldName: 'node_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  node!: TechnologyNode;

  @ManyToOne({
    entity: () => SystemSoftware,
    fieldName: 'system_software_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  systemSoftware!: SystemSoftware;
}
