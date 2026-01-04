import { InterfaceGeneric } from '@/model/archimate/core/interface.generic';
import { Collection, Entity, Enum, OneToMany } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';
import { ApplicationInterfaceFunctionMap } from '@/model/maps/application-interface-function.map';
import { ApplicationComponentInterfaceMap } from '@/model/maps/application-component-interface.map';
import { HasuraRefCollection } from '@archpad/models';
import {InterfaceMethodEnum} from "@/model/enums/interface-method.enum";

@Entity({ discriminatorValue: LayerKind.APPLICATION })
export class ApplicationInterface extends InterfaceGeneric {
  @Enum({
    items: () => InterfaceMethodEnum,
    nativeEnumName: 'interface_method_enum',
    array: true,
  })
  methods!: InterfaceMethodEnum[];
  
  @HasuraRefCollection()
  @OneToMany({
    entity: () => ApplicationComponentInterfaceMap,
    mappedBy: 'interface',
  })
  components = new Collection<ApplicationComponentInterfaceMap>(this);

  @HasuraRefCollection()
  @OneToMany({
    entity: () => ApplicationInterfaceFunctionMap,
    mappedBy: 'interface',
  })
  functions = new Collection<ApplicationInterfaceFunctionMap>(this);
}
