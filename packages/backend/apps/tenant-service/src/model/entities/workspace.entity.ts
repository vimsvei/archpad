import { Entity, ManyToOne } from '@mikro-orm/core';
import { ArchimateCode, HasuraTable, NamedObject } from '@archpad/models';
import { UserProfile } from './user-profile.entity';
import { Tenant } from './tenant.entity';

@HasuraTable()
@Entity({
  tableName: 'workspaces',
})
export class Workspace extends NamedObject {
  @ArchimateCode('SPACE')
  override code: string = undefined as any;
  
  @ManyToOne({
    entity: () => Tenant,
    fieldName: 'tenant_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  tenant!: Tenant;

  @ManyToOne({
    entity: () => UserProfile,
    fieldName: 'owner_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
    nullable: true,
  })
  owner?: UserProfile;
}
