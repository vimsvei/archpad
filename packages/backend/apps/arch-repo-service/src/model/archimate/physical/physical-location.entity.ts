import { NamedObject } from '@archpad/models';
import { ArchimateCode } from '@archpad/models';
import { Collection, Entity, OneToMany } from '@mikro-orm/core';
import { TechnologyNetwork } from '@/model/archimate/technology/technology-network.entity';

@Entity({ tableName: 'locations' })
export class PhysicalLocation extends NamedObject {
  @ArchimateCode('LOCATION')
  override code: string = undefined as any;

  @OneToMany({ entity: () => TechnologyNetwork, mappedBy: 'location' })
  networks = new Collection<TechnologyNetwork>(this);
}
