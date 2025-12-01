import { NamedObject } from '@/model/abstract/named-object.abstract';
import { ArchimateCode } from '@/model/decorators/archimate-code.decorator';
import { Collection, Entity, OneToMany } from '@mikro-orm/core';
import { TechnologyNetwork } from '@/model/entities/archimate/technology/technology-network.entity';

@Entity({ tableName: 'locations' })
export class Location extends NamedObject {
  @ArchimateCode('LOCATION')
  override code: string = undefined as any;

  @OneToMany({ entity: () => TechnologyNetwork, mappedBy: 'location' })
  networks = new Collection<TechnologyNetwork>(this);
}
