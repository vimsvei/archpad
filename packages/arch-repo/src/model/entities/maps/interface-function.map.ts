import { NamedObject } from '@/model/abstract/named-object.abstract';
import { Entity, ManyToOne } from '@mikro-orm/core';
import { ApplicationFunction } from '@/model/entities/archimate/application/application-function.entity';
import { ApplicationInterface } from '@/model/entities/archimate/application/application-interface.entity';

@Entity({ tableName: 'map_interface_function' })
export class InterfaceFunctionMap extends NamedObject {
  @ManyToOne({
    entity: () => ApplicationFunction,
    name: 'function_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  function: ApplicationFunction;

  @ManyToOne({
    entity: () => ApplicationInterface,
    name: 'interface_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  interface: ApplicationInterface;
}
