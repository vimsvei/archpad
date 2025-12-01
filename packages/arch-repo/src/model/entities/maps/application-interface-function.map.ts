import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { ApplicationFunction } from '@/model/entities/archimate/application/application-function.entity';
import { ApplicationInterface } from '@/model/entities/archimate/application/application-interface.entity';
import { MappedObject } from '@/model/abstract/mapped-object.abstract';

@Entity({ tableName: 'map_application_interface_function' })
@Unique({ properties: ['function', 'interface'] })
export class ApplicationInterfaceFunctionMap extends MappedObject {
  @ManyToOne({
    entity: () => ApplicationFunction,
    fieldName: 'function_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  function!: ApplicationFunction;

  @ManyToOne({
    entity: () => ApplicationInterface,
    fieldName: 'interface_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  interface!: ApplicationInterface;
}
