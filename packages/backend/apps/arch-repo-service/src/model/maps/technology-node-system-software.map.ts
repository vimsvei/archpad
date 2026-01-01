import { HasuraRefName, HasuraTable, MappedObject } from '@archpad/models';
import { Entity, Enum, ManyToOne, Unique } from '@mikro-orm/core';
import { TechnologyNode } from '@/model/archimate/technology/technology-node.entity';
import { SystemSoftware } from '@/model/archimate/technology/system-software.entity';
import { SystemSoftwareKind } from '@/model/enums/system-software-kind.enum';

@HasuraTable()
@Entity({ tableName: 'map_technology_node_system_software' })
@Unique({ properties: ['node', 'systemSoftware'] })
export class TechnologyNodeSystemSoftwareMap extends MappedObject {
  @HasuraRefName()
  @ManyToOne({
    entity: () => TechnologyNode,
    primary: true,
    fieldName: 'node_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  node!: TechnologyNode;

  @HasuraRefName()
  @ManyToOne({
    entity: () => SystemSoftware,
    primary: true,
    fieldName: 'system_software_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  systemSoftware!: SystemSoftware;

  @Enum({
    items: () => SystemSoftwareKind,
    nativeEnumName: 'system_software_kind_enum',
    default: SystemSoftwareKind.RUNTIME,
  })
  kind!: SystemSoftwareKind;
}
