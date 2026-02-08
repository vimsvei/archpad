import { Interface } from '@/model/archimate/common/interface.entity';
import { Collection, Entity, Enum, OneToMany } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';
import { ApplicationFunctionInterfaceMap } from '@/model/maps/application-function-interface.map';
import { ApplicationComponentInterfaceMap } from '@/model/maps/application-component-interface.map';
import { HasuraReference } from '@archpad/models';
import { InterfaceMethodEnum } from '@/model/enums/interface-method.enum';

@Entity({ discriminatorValue: LayerKind.APPLICATION })
export class ApplicationInterface extends Interface {
  @Enum({
    items: () => InterfaceMethodEnum,
    nativeEnumName: 'interface_method_enum',
    array: true,
  })
  methods!: InterfaceMethodEnum[];

  @HasuraReference({ objectName: 'interface', collectionName: 'components' })
  @OneToMany({
    entity: () => ApplicationComponentInterfaceMap,
    mappedBy: 'interface',
  })
  components = new Collection<ApplicationComponentInterfaceMap>(this);

  @HasuraReference({ objectName: 'interface', collectionName: 'functions' })
  @OneToMany({
    entity: () => ApplicationFunctionInterfaceMap,
    mappedBy: 'interface',
  })
  functions = new Collection<ApplicationFunctionInterfaceMap>(this);
}
