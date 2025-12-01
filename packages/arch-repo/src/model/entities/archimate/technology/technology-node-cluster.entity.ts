import { Entity, Property } from '@mikro-orm/core';
import { NodeKind } from '@/model/enums/node-kind.enum';
import { TechnologyNode } from '@/model/entities/archimate/technology/technology-node.entity';

@Entity({ discriminatorValue: NodeKind.CLUSTER })
export class TechnologyClusterNode extends TechnologyNode {
  @Property({ nullable: true })
  nodeCount?: number;

  @Property({ nullable: true })
  totalCpuCores?: number;

  @Property({ nullable: true })
  totalRamGb?: number;

  @Property({ nullable: true })
  totalStorageGb?: number;
}
