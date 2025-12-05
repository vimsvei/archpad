import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { MappedObject } from '@/model/abstract/mapped-object.abstract';
import { ApplicationEvent } from '@/model/archimate/application/application-event.entity';

@Entity({ tableName: 'map_application_component_event' })
@Unique({ properties: ['component', 'event'] })
export class ApplicationComponentEventMap extends MappedObject {
  @ManyToOne({
    entity: () => ApplicationComponent,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;

  @ManyToOne({
    entity: () => ApplicationEvent,
    fieldName: 'event_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  event!: ApplicationEvent;
}
