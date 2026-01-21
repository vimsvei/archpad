import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { ApplicationFunction } from '@/model/archimate/application/application-function.entity';
import { HasuraReference, HasuraTable, MappedObject } from '@archpad/models';

@HasuraTable()
@Entity({ tableName: 'map_application_component_function' })
export class ApplicationComponentFunctionMap extends MappedObject {
  @HasuraReference({ objectName: 'component', collectionName: 'functions' })
  @ManyToOne({
    entity: () => ApplicationComponent,
    primary: true,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;

  @HasuraReference({ objectName: 'function', collectionName: 'components' })
  @ManyToOne({
    entity: () => ApplicationFunction,
    primary: true,
    fieldName: 'function_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  function!: ApplicationFunction;
}
