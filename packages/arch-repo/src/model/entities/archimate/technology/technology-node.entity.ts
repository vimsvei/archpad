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

@Entity({
  tableName: 'technology_nodes',
  abstract: true,
  discriminatorColumn: 'kind',
})
export abstract class TechnologyNode extends NamedObject {
  @Enum({ items: () => NodeKind, nativeEnumName: 'node_kind_enum' })
  kind: NodeKind;

  @Property({ nullable: true })
  cpuCores?: number;

  @Property({ nullable: true })
  ramGb?: number;

  @Property({ nullable: true })
  storageGb?: number;

  @ManyToOne(() => NodeTypeDirectory, {
    name: 'type_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  type: NodeTypeDirectory;

  @ManyToOne(() => TechnologyNetwork, {
    fieldName: 'network_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  network: TechnologyNetwork;

  @OneToMany({
    entity: () => TechnologyNodeSystemSoftwareMap,
    mappedBy: 'node',
  })
  systemSoftware = new Collection<TechnologyNodeSystemSoftwareMap>(this);
}

@Entity({ discriminatorValue: NodeKind.HOST })
export class TechnologyHostNode extends TechnologyNode {}
