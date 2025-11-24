import { NamedObject } from '../../abstract/named-object.abstract';
import { Entity, ManyToOne } from '@mikro-orm/core';
import { NodeTypeDirectory } from '../../directories/node-type.directory';
import { TechnologyNetwork } from './technology-network.entity';

@Entity({ tableName: 'technology_nodes' })
export class TechnologyNode extends NamedObject {
  
  @ManyToOne(
    () => NodeTypeDirectory,
    {
      name: 'type_id',
      updateRule: "cascade",
      deleteRule: "no action"
    },
  )
  type: NodeTypeDirectory;
  
  @ManyToOne(
    () => TechnologyNetwork,
    {
      name: 'network_id',
      updateRule: "cascade",
      deleteRule: "no action"
    },
  )
  network: TechnologyNetwork;
  
  
}
