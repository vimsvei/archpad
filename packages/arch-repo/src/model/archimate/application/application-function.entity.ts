import { FunctionGeneric } from '@/model/archimate/core/function.generic';
import { Collection, Entity, OneToMany } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';
import { ApplicationComponentFunctionMap } from '@/model/maps/application-component-function.map';
import { ApplicationInterfaceFunctionMap } from '@/model/maps/application-interface-function.map';

@Entity({ discriminatorValue: LayerKind.APPLICATION })
export class ApplicationFunction extends FunctionGeneric {
  @OneToMany({
    entity: () => ApplicationComponentFunctionMap,
    mappedBy: 'function',
  })
  components = new Collection<ApplicationComponentFunctionMap>(this);

  @OneToMany({
    entity: () => ApplicationInterfaceFunctionMap,
    mappedBy: 'function',
  })
  interfaces = new Collection<ApplicationInterfaceFunctionMap>(this);
}
