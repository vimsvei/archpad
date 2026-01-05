import { Entity, ManyToOne } from '@mikro-orm/core';
import { ArchimateCode, NamedObject } from '@archpad/models';
import { UserProfile } from './user-profile.entity';

@Entity({
  tableName: 'tenants',
})
export class Tenant extends NamedObject {
  @ArchimateCode('TENANT')
  override code: string = undefined as any;

  @ManyToOne({
    entity: () => UserProfile,
    fieldName: 'owner_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  owner!: UserProfile;
}
