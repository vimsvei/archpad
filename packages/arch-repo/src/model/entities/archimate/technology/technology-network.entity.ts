import { NamedObject } from '../../../abstract/named-object.abstract';
import { Collection, Entity, OneToMany } from '@mikro-orm/core';
import { NodeTypeDirectory } from '../../directories/node-type.directory';
import { TechnologyNode } from './technology-node.entity';

@Entity({ tableName: 'technology_networks' })
export class TechnologyNetwork extends NamedObject {
  @OneToMany(() => TechnologyNode, (node) => node.network)
  nodes = new Collection<TechnologyNode>(this);
}
