import { Entity, Property } from '@mikro-orm/core';
import { NodeKind } from '@/model/enums/node-kind.enum';
import { TechnologyNode } from '@/model/entities/archimate/technology/technology-node.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ discriminatorValue: NodeKind.CLUSTER })
export class TechnologyClusterNode extends TechnologyNode {
  @ApiProperty({ description: 'Total', minimum: 0 })
  @Property({ nullable: true })
  nodeCount?: number;

  @ApiProperty({ description: 'Total CPU', minimum: 0 })
  @Property({ nullable: true })
  totalCpuCores?: number;

  @ApiProperty({ description: 'Total RAM, Gb', minimum: 0 })
  @Property({ nullable: true })
  totalRamGb?: number;

  @ApiProperty({ description: 'Total Storage, Gb', minimum: 0 })
  @Property({ nullable: true })
  totalStorageGb?: number;
}
