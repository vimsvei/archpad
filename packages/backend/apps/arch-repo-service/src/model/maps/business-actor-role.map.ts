import { HasuraReference, HasuraTable, MappedObject } from '@archpad/models';
import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { BusinessActor } from '@/model/archimate/business/business-actor.entity';
import { Role } from '@/model/archimate/common/role.entity';

@HasuraTable()
@Entity({ tableName: 'map_business_actor_role' })
@Unique({ properties: ['actor', 'role'] })
export class BusinessActorRoleMap extends MappedObject {
  @HasuraReference({ objectName: 'actor', collectionName: 'roles' })
  @ManyToOne({
    entity: () => BusinessActor,
    primary: true,
    fieldName: 'actor_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  actor!: BusinessActor;

  @HasuraReference({ objectName: 'role', collectionName: 'actors' })
  @ManyToOne({
    entity: () => Role,
    primary: true,
    fieldName: 'role_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  role!: Role;
}
