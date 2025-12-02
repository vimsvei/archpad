import { NamedObject } from '@/model/abstract/named-object.abstract';
import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { NodeTypeDirectory } from '../../directories/node-type.directory';
import { TechnologyNetwork } from './technology-network.entity';
import { NodeKind } from '@/model/enums/node-kind.enum';
import { TechnologyNodeSystemSoftwareMap } from '@/model/entities/maps/technology-node-system-software.map';
import { SystemSoftwareVersion } from '@/model/entities/archimate/technology/system-software-version.entity';
import { SystemArchitectureKind } from '@/model/enums/system-architecture-kind.enum';
import { ArchimateCode } from '@/model/decorators/archimate-code.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { ApplicationComponentTechnologyNodeMap } from '@/model/entities/maps/application-component-technology-node.map';

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
  @ManyToOne(() => NodeTypeDirectory, {
    name: 'type_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  type!: NodeTypeDirectory;

  @ApiProperty({ format: 'uuid', type: TechnologyNetwork })
  @ManyToOne(() => TechnologyNetwork, {
    fieldName: 'network_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  network!: TechnologyNetwork;

  @ApiProperty({ format: 'uuid', type: SystemSoftwareVersion })
  @ManyToOne(() => SystemSoftwareVersion, {
    fieldName: 'os_version_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  osVersion!: SystemSoftwareVersion;

  @OneToMany({
    entity: () => TechnologyNodeSystemSoftwareMap,
    mappedBy: 'node',
  })
  systemSoftware = new Collection<TechnologyNodeSystemSoftwareMap>(this);

  @OneToMany({
    entity: () => ApplicationComponentTechnologyNodeMap,
    mappedBy: 'node',
  })
  components = new Collection<ApplicationComponentTechnologyNodeMap>(this);
}

@Entity({ discriminatorValue: NodeKind.HOST })
export class TechnologyHostNode extends TechnologyNode {}
