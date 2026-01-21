import { FunctionGeneric } from '@/model/archimate/core/function.generic';
import { Collection, Entity, OneToMany } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';
import { ApplicationComponentFunctionMap } from '@/model/maps/application-component-function.map';
import { ApplicationFunctionInterfaceMap } from '@/model/maps/application-function-interface.map';
import { HasuraReference } from '@archpad/models';

@Entity({ discriminatorValue: LayerKind.APPLICATION })
export class ApplicationFunction extends FunctionGeneric {
  @HasuraReference({ objectName: 'function', collectionName: 'components' })
  @OneToMany({
    entity: () => ApplicationComponentFunctionMap,
    mappedBy: 'function',
  })
  components = new Collection<ApplicationComponentFunctionMap>(this);

  // @OneToMany({
  //   entity: () => ApplicationFunctionInterfaceMap,
  //   mappedBy: 'function',
  // })
  // interfaces = new Collection<ApplicationFunctionInterfaceMap>(this);
}
