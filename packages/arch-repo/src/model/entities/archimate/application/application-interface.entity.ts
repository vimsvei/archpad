import { InterfaceGeneric } from '@/model/entities/archimate/core/interface.generic';
import { Collection, Entity, ManyToOne, OneToMany } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';
import { ApplicationComponent } from '@/model/entities/archimate/application/application-component.entity';
import { InterfaceFunctionMap } from '@/model/entities/maps/interface-function.map';

@Entity({ discriminatorValue: LayerKind.APPLICATION })
export class ApplicationInterface extends InterfaceGeneric {
  @ManyToOne({ entity: () => ApplicationComponent, name: 'component_id' })
  component: ApplicationComponent;

  @OneToMany({ entity: () => InterfaceFunctionMap, mappedBy: 'interface' })
  functions = new Collection<InterfaceFunctionMap>(this);
}
