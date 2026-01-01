import {
  HasuraRefCollection,
  HasuraRefName,
  HasuraTable,
  NamedObject,
} from '@archpad/models';
import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { TechnologyNetwork } from './technology-network.entity';
import { NodeKind } from '@/model/enums/node-kind.enum';
import { TechnologyNodeSystemSoftwareMap } from '@/model/maps/technology-node-system-software.map';
import { SystemArchitectureKind } from '@/model/enums/system-architecture-kind.enum';
import { ArchimateCode } from '@archpad/models';
import { ApiProperty } from '@nestjs/swagger';
import { ApplicationComponentTechnologyNodeMap } from '@/model/maps/application-component-technology-node.map';
import { NodeTypeDirectory } from '@/model/directories/directories';
import { Environment } from '@/model/enums/environment.enum';
import { OperatingSystem } from './operating-system.entity';

@HasuraTable()
@Entity({
  tableName: 'technology_nodes',
  abstract: true,
  discriminatorColumn: 'kind',
})
export abstract class TechnologyNode extends NamedObject {
  @Enum({ items: () => NodeKind, nativeEnumName: 'node_kind_enum' })
  kind!: NodeKind;

  @ArchimateCode('NODE')
  override code: string = undefined as any;

  @Enum({
    items: () => Environment,
    nativeEnumName: 'environment_enum',
    default: Environment.DEV,
  })
  environment!: Environment;

  @Enum({
    items: () => SystemArchitectureKind,
    default: SystemArchitectureKind.X86,
    nativeEnumName: 'system_architecture_kind_enum',
  })
  architecture!: SystemArchitectureKind;

  @ApiProperty({ description: 'CPU', minimum: 0 })
  @Property({ nullable: true })
  cpuCores?: number;

  @ApiProperty({ description: 'RAM, Gb', minimum: 0 })
  @Property({ nullable: true })
  ramGb?: number;

  @ApiProperty({ description: 'Storage, Gb', minimum: 0 })
  @Property({ nullable: true })
  storageGb?: number;

  @ApiProperty({ format: 'uuid', type: NodeTypeDirectory })
  @HasuraRefName()
  @ManyToOne({
    entity: () => NodeTypeDirectory,
    name: 'type_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  type!: NodeTypeDirectory;

  @ApiProperty({ format: 'uuid', type: TechnologyNetwork })
  @HasuraRefName()
  @ManyToOne({
    entity: () => TechnologyNetwork,
    fieldName: 'network_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  network!: TechnologyNetwork;
  
  @HasuraRefName()
  @ManyToOne({
    entity: () => OperatingSystem,
    name: 'operating_system_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  operatingSystem!: OperatingSystem;

  @HasuraRefCollection()
  @OneToMany({
    entity: () => TechnologyNodeSystemSoftwareMap,
    mappedBy: 'node',
  })
  systemSoftware = new Collection<TechnologyNodeSystemSoftwareMap>(this);

  @HasuraRefCollection()
  @OneToMany({
    entity: () => ApplicationComponentTechnologyNodeMap,
    mappedBy: 'node',
  })
  components = new Collection<ApplicationComponentTechnologyNodeMap>(this);
}

@Entity({ discriminatorValue: NodeKind.HOST })
export class TechnologyHostNode extends TechnologyNode {}
