import { NamedObject } from '@/model/abstract/named-object.abstract';
import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { NodeTypeDirectory } from '../../directories/node-type.directory';
import { TechnologyNetwork } from './technology-network.entity';
import { NodeKind } from '@/model/enums/node-kind.enum';

@Entity({
  tableName: 'technology_nodes',
  abstract: true,
  discriminatorColumn: 'kind',
})
export abstract class TechnologyNode extends NamedObject {
  @Enum({ items: () => NodeKind, nativeEnumName: 'node_kind_enum' })
  kind: NodeKind;

  @ManyToOne(() => NodeTypeDirectory, {
    name: 'type_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  type: NodeTypeDirectory;

  @ManyToOne(() => TechnologyNetwork, {
    name: 'network_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  network: TechnologyNetwork;
}

@Entity({ discriminatorValue: NodeKind.HOST })
export class TechnologyHostNode extends TechnologyNode {}

@Entity({ discriminatorValue: NodeKind.CLUSTER })
export class TechnologyClusterNode extends TechnologyNode {
  @Property({ nullable: true })
  nodeCount?: number;
}
