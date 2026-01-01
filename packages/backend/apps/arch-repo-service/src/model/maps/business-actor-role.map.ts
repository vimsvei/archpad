import { HasuraRefName, HasuraTable, MappedObject } from '@archpad/models';
import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { BusinessActor } from '@/model/archimate/business/business-actor.entity';
import { BusinessRole } from '@/model/archimate/business/business-role.entity';

@HasuraTable()
@Entity({ tableName: 'map_business_actor_role' })
@Unique({ properties: ['actor', 'role'] })
export class BusinessActorRoleMap extends MappedObject {
  @HasuraRefName()
  @ManyToOne({
    entity: () => BusinessActor,
    primary: true,
    fieldName: 'actor_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  actor!: BusinessActor;

  @HasuraRefName()
  @ManyToOne({
    entity: () => BusinessRole,
    primary: true,
    fieldName: 'role_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  role!: BusinessRole;
}
