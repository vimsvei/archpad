import { EventGeneric } from '@/model/archimate/core/event.generic';
import { Collection, Entity, OneToMany } from '@mikro-orm/core';
import { ApplicationComponentEventMap } from '@/model/maps/application-component-event.map';
import { LayerKind } from '@/model/enums/layer-kind.enum';

@Entity({ discriminatorValue: LayerKind.APPLICATION })
export class ApplicationEvent extends EventGeneric {
  @OneToMany({
    entity: () => ApplicationComponentEventMap,
    mappedBy: 'event',
  })
  components = new Collection<ApplicationComponentEventMap>(this);
}
