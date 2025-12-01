import { NamedObject } from '@/model/abstract/named-object.abstract';
import { Collection, Entity, ManyToOne, OneToMany } from '@mikro-orm/core';
import { TechnologyNode } from './technology-node.entity';

@Entity({ tableName: 'technology_networks' })
export class TechnologyNetwork extends NamedObject {
  @OneToMany(() => TechnologyNode, (node) => node.network)
  nodes = new Collection<TechnologyNode>(this);

  @ManyToOne(() => Location, {
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  location: Location;
}
