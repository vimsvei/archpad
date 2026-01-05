import { HasuraRefName, MappedObject } from '@archpad/models';
import { ManyToOne } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { BusinessActorRoleMap } from '@/model/maps/business-actor-role.map';

export class ApplicationComponentBusinessActorRoleMap extends MappedObject {
  @HasuraRefName('actorRole')
  @ManyToOne({
    entity: () => ApplicationComponent,
    primary: true,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;

  @HasuraRefName('components')
  @ManyToOne({
    entity: () => BusinessActorRoleMap,
    primary: true,
    joinColumns: ['actor_id', 'role_id'],
    referencedColumnNames: ['actor_id', 'role_id'],
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  actorRole!: BusinessActorRoleMap;
}
