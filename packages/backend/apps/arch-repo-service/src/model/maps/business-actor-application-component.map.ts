import { HasuraRefName, HasuraTable, MappedObject } from '@archpad/models';
import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { BusinessActor } from '@/model/archimate/business/business-actor.entity';
import { BusinessRole } from '@/model/archimate/business/business-role.entity';
import {ApplicationComponent} from "@/model/archimate/application/application-component.entity";

@HasuraTable()
@Entity({ tableName: 'map_business_actor_application_component' })
@Unique({ properties: ['actor', 'component'] })
export class BusinessActorApplicationComponentMap extends MappedObject {
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
    entity: () => ApplicationComponent,
    primary: true,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;
}
