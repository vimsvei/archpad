import { NamedObject } from '@/model/abstract/named-object.abstract';
import { Entity, ManyToOne } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/entities/archimate/application/application-component.entity';
import { ApplicationFunction } from '@/model/entities/archimate/application/application-function.entity';

@Entity({ tableName: 'map_component_function' })
export class ComponentFunctionMap extends NamedObject {
  @ManyToOne({ entity: () => ApplicationComponent })
  component: ApplicationComponent;

  @ManyToOne({ entity: () => ApplicationFunction })
  function: ApplicationFunction;
}
