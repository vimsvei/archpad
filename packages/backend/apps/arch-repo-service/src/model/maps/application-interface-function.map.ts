import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { ApplicationInterface } from '@/model/archimate/application/application-interface.entity';
import { MappedObject } from '@archpad/models';
import { ApplicationComponentFunctionMap } from '@/model/maps/application-component-function.map';

@Entity({ tableName: 'map_application_interface_function' })
export class ApplicationInterfaceFunctionMap extends MappedObject {
  @ManyToOne({
    entity: () => ApplicationComponentFunctionMap,
    primary: true,
    joinColumns: ['component_id', 'function_id'],
    referencedColumnNames: ['component_id', 'function_id'],
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  function!: ApplicationComponentFunctionMap;

  @ManyToOne({
    entity: () => ApplicationInterface,
    primary: true,
    fieldName: 'interface_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  interface!: ApplicationInterface;
}
