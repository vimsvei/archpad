import { InterfaceGeneric } from '@/model/archimate/core/interface.generic';
import { Collection, Entity, ManyToOne, OneToMany } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { ApplicationInterfaceFunctionMap } from '@/model/maps/application-interface-function.map';

@Entity({ discriminatorValue: LayerKind.APPLICATION })
export class ApplicationInterface extends InterfaceGeneric {
  @ManyToOne({
    entity: () => ApplicationComponent,
    fieldName: 'component_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;

  @OneToMany({
    entity: () => ApplicationInterfaceFunctionMap,
    mappedBy: 'interface',
  })
  functions = new Collection<ApplicationInterfaceFunctionMap>(this);
}
