import { EventGeneric } from '@/model/entities/archimate/core/event.generic';
import { Collection, OneToMany } from '@mikro-orm/core';
import { ApplicationComponentFunctionMap } from '@/model/entities/maps/application-component-function.map';
import { ApplicationComponentEventMap } from '@/model/entities/maps/application-component-event.map';

export class ApplicationEvent extends EventGeneric {
  @OneToMany({
    entity: () => ApplicationComponentEventMap,
    mappedBy: 'event',
  })
  components = new Collection<ApplicationComponentEventMap>(this);
}
