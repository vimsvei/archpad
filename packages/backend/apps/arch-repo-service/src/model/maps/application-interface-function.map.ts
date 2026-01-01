import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { ApplicationInterface } from '@/model/archimate/application/application-interface.entity';
import { HasuraTable, MappedObject } from '@archpad/models';
import { ApplicationComponentFunctionMap } from '@/model/maps/application-component-function.map';
import { HasuraRefName } from '@archpad/models';

@HasuraTable()
@Entity({ tableName: 'map_application_interface_function' })
export class ApplicationInterfaceFunctionMap extends MappedObject {
  
  @HasuraRefName('interfaces')
  @ManyToOne({
    entity: () => ApplicationComponentFunctionMap,
    primary: true,
    joinColumns: ['component_id', 'function_id'],
    referencedColumnNames: ['component_id', 'function_id'],
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  function!: ApplicationComponentFunctionMap;

  @HasuraRefName('componentFunctions')
  @ManyToOne({
    entity: () => ApplicationInterface,
    primary: true,
    fieldName: 'interface_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  interface!: ApplicationInterface;
}
