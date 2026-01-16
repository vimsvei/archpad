import { HasuraRefName, HasuraTable, MappedObject } from '@archpad/models';
import { Entity, ManyToOne } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { BusinessActorRoleMap } from '@/model/maps/business-actor-role.map';

@HasuraTable()
@Entity({ tableName: 'map_application_component_actor_role' })
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
