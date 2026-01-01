import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { ApplicationFunction } from '@/model/archimate/application/application-function.entity';
import { HasuraRefName, HasuraTable, MappedObject } from '@archpad/models';

@HasuraTable()
@Entity({ tableName: 'map_application_component_function' })
export class ApplicationComponentFunctionMap extends MappedObject {
  @HasuraRefName()
  @ManyToOne({
    entity: () => ApplicationComponent,
    primary: true,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;

  @HasuraRefName()
  @ManyToOne({
    entity: () => ApplicationFunction,
    primary: true,
    fieldName: 'function_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  function!: ApplicationFunction;
}
