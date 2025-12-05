import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { ApplicationFunction } from '@/model/archimate/application/application-function.entity';
import { MappedObject } from '@/model/abstract/mapped-object.abstract';

@Entity({ tableName: 'map_application_component_function' })
export class ApplicationComponentFunctionMap extends MappedObject {
  @ManyToOne({
    entity: () => ApplicationComponent,
    primary: true,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;

  @ManyToOne({
    entity: () => ApplicationFunction,
    primary: true,
    fieldName: 'function_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  function!: ApplicationFunction;
}
