import { NamedObject } from '@/model/abstract/named-object.abstract';
import { Collection, Entity, ManyToOne, OneToMany } from '@mikro-orm/core';
import { TechnologyNode } from './technology-node.entity';
import { PhysicalLocation } from '@/model/entities/archimate/physical/physical-location.entity';

@Entity({ tableName: 'technology_networks' })
export class TechnologyNetwork extends NamedObject {
  @OneToMany({
    entity: () => TechnologyNode,
    mappedBy: 'network',
  })
  nodes = new Collection<TechnologyNode>(this);

  @ManyToOne({
    entity: () => PhysicalLocation,
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  location!: PhysicalLocation;
}
