import { ArchimateElementGeneric } from '@/model/archimate/core/archimate-element.generic';
import { Collection, Entity, OneToMany } from '@mikro-orm/core';
import { ArchimateCode, HasuraTable } from '@archpad/models';
import { BusinessActorRoleMap } from '@/model/maps/business-actor-role.map';
import { HasuraReference } from '@archpad/models';

@HasuraTable()
@Entity({ tableName: 'roles' })
export class BusinessRole extends ArchimateElementGeneric {
  @ArchimateCode('ROLE')
  override code: string = undefined as any;

  @HasuraReference({ objectName: 'role', collectionName: 'actors' })
  @OneToMany(() => BusinessActorRoleMap, (map) => map.role)
  actors = new Collection<BusinessActorRoleMap>(this);
}
