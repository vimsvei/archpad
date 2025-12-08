import { ArchimateElementGeneric } from '@/model/archimate/core/archimate-element.generic';
import { Collection, Entity, OneToMany } from '@mikro-orm/core';
import { ArchimateCode } from '@/model/decorators/archimate-code.decorator';
import { BusinessActorRoleMap } from '@/model/maps/business-actor-role.map';

@Entity({ tableName: 'roles' })
export class BusinessRole extends ArchimateElementGeneric {
  @ArchimateCode('ROLE')
  override code: string = undefined as any;

  @OneToMany(() => BusinessActorRoleMap, (map) => map.role)
  actors = new Collection<BusinessActorRoleMap>(this);
}
