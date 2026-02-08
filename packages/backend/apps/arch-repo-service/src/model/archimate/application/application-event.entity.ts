import { Collection, Entity, OneToMany } from '@mikro-orm/core';
import { Event } from '../common/event.entity';
import { LayerKind } from '../../enums/layer-kind.enum';
import { ApplicationComponentEventMap } from '../../maps/application-component-event.map';
import { HasuraReference } from '@archpad/models';

@Entity({ discriminatorValue: LayerKind.APPLICATION })
export class ApplicationEvent extends Event {
  @HasuraReference({ objectName: 'event', collectionName: 'components' })
  @OneToMany({
    entity: () => ApplicationComponentEventMap,
    mappedBy: 'event',
  })
  components = new Collection<ApplicationComponentEventMap>(this);
}
