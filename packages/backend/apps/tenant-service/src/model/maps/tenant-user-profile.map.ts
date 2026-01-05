import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { MappedObject } from '@archpad/models';
import { UserProfile } from '../entities/user-profile.entity';
import { Tenant } from '../entities/tenant.entity';

@Entity({ tableName: 'map_user_tenant' })
@Unique({ properties: ['user', 'tenant'] })
export class UserTenantMap extends MappedObject {
  @ManyToOne({
    entity: () => UserProfile,
    primary: true,
    fieldName: 'user_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  user!: UserProfile;

  @ManyToOne({
    entity: () => Tenant,
    primary: true,
    fieldName: 'tenant_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  tenant!: Tenant;
}
