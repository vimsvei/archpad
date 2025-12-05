import { MappedObject } from '@/model/abstract/mapped-object.abstract';
import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { BusinessActor } from '@/model/archimate/business/business-actor.entity';
import { BusinessRole } from '@/model/archimate/business/business-role.entity';

@Entity({ tableName: 'map_business_actor_role' })
@Unique({ properties: ['actor', 'role'] })
export class BusinessActorRoleMap extends MappedObject {
  @ManyToOne({
    entity: () => BusinessActor,
    primary: true,
    fieldName: 'actor_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  actor!: BusinessActor;

  @ManyToOne({
    entity: () => BusinessRole,
    primary: true,
    fieldName: 'role_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  role!: BusinessRole;
}
