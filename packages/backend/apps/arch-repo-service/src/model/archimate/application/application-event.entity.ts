import { Collection, Entity, OneToMany } from '@mikro-orm/core';
import {EventGeneric} from "../core/event.generic";
import {LayerKind} from "../../enums/layer-kind.enum";
import {ApplicationComponentEventMap} from "../../maps/application-component-event.map";

@Entity({ discriminatorValue: LayerKind.APPLICATION })
export class ApplicationEvent extends EventGeneric {
  @OneToMany({
    entity: () => ApplicationComponentEventMap,
    mappedBy: 'event',
  })
  components = new Collection<ApplicationComponentEventMap>(this);
}
