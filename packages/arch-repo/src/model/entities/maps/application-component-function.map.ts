import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/entities/archimate/application/application-component.entity';
import { ApplicationFunction } from '@/model/entities/archimate/application/application-function.entity';
import { MappedObject } from '@/model/abstract/mapped-object.abstract';

@Entity({ tableName: 'map_application_component_function' })
@Unique({ properties: ['component', 'function'] })
export class ApplicationComponentFunctionMap extends MappedObject {
  @ManyToOne({
    entity: () => ApplicationComponent,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;

  @ManyToOne({
    entity: () => ApplicationFunction,
    fieldName: 'function_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  function!: ApplicationFunction;
}
