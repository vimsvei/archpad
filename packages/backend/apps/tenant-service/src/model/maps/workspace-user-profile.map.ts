import { Entity, ManyToOne } from '@mikro-orm/core';
import { MappedObject } from '@archpad/models';
import { UserProfile } from '../entities/user-profile.entity';
import { Workspace } from '../entities/workspace.entity';

@Entity({ tableName: 'map_workspace_user_profiles' })
export class WorkspaceUserProfileMap extends MappedObject {
  @ManyToOne({
    entity: () => Workspace,
    primary: true,
    fieldName: 'workspace_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  workspace!: Workspace;

  @ManyToOne({
    entity: () => UserProfile,
    primary: true,
    fieldName: 'user_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  user!: UserProfile;
}
