import { FunctionGeneric } from '@/model/entities/archimate/core/function.generic';
import { Collection, Entity, OneToOne } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';
import { ComponentFunctionMap } from '@/model/entities/maps/component-function.map';
import { InterfaceFunctionMap } from '@/model/entities/maps/interface-function.map';

@Entity({ discriminatorValue: LayerKind.APPLICATION })
export class ApplicationFunction extends FunctionGeneric {
  @OneToOne({ entity: () => ComponentFunctionMap, mappedBy: 'function' })
  components = new Collection<ComponentFunctionMap>(this);
  
  @OneToOne({ entity: () => InterfaceFunctionMap, mappedBy: 'function' })
  interfaces = new Collection<InterfaceFunctionMap>(this)
}
