import { HasuraRefCollection, HasuraTable, NamedObject } from '@archpad/models';
import { ArchimateCode } from '@archpad/models';
import { Collection, Entity, OneToMany } from '@mikro-orm/core';
import { TechnologyPhysicalNetwork } from '@/model/archimate/technology/technology-network-physical.entity';

@HasuraTable()
@Entity({ tableName: 'locations' })
export class PhysicalLocation extends NamedObject {
  @ArchimateCode('LOCATION')
  override code: string = undefined as any;

  @HasuraRefCollection()
  @OneToMany({ entity: () => TechnologyPhysicalNetwork, mappedBy: 'location' })
  networks = new Collection<TechnologyPhysicalNetwork>(this);
}
