import { InterfaceGeneric } from '@/model/archimate/core/interface.generic';
import { Collection, Entity, OneToMany } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';
import { ApplicationInterfaceFunctionMap } from '@/model/maps/application-interface-function.map';
import { ApplicationComponentInterfaceMap } from '@/model/maps/application-component-interface.map';

@Entity({ discriminatorValue: LayerKind.APPLICATION })
export class ApplicationInterface extends InterfaceGeneric {
  @OneToMany({
    entity: () => ApplicationComponentInterfaceMap,
    mappedBy: 'interface',
  })
  components = new Collection<ApplicationComponentInterfaceMap>(this);

  @OneToMany({
    entity: () => ApplicationInterfaceFunctionMap,
    mappedBy: 'interface',
  })
  functions = new Collection<ApplicationInterfaceFunctionMap>(this);
}
