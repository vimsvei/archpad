import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { HasuraReference, HasuraTable, MappedObject } from '@archpad/models';
import { ApplicationEvent } from '@/model/archimate/application/application-event.entity';

@HasuraTable()
@Entity({ tableName: 'map_application_component_event' })
export class ApplicationComponentEventMap extends MappedObject {
  @HasuraReference({ objectName: 'component', collectionName: 'events' })
  @ManyToOne({
    entity: () => ApplicationComponent,
    primary: true,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;

  @HasuraReference({ objectName: 'event', collectionName: 'components' })
  @ManyToOne({
    entity: () => ApplicationEvent,
    primary: true,
    fieldName: 'event_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  event!: ApplicationEvent;
}
