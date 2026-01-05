import {HasuraRefName, HasuraTable, MappedObject} from "@archpad/models";
import {Entity, ManyToOne} from "@mikro-orm/core";
import {Capability} from "@/model/archimate/strategy/capability.entity";
import {ApplicationComponent} from "@/model/archimate/application/application-component.entity";

@HasuraTable()
@Entity({ tableName: 'map_capability_application_component' })
export class CapabilityApplicationComponentMap extends MappedObject{
  
  @HasuraRefName('components')
  @ManyToOne({
    entity: () => Capability,
    primary: true,
    fieldName: 'capability_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  capability!: Capability;
  
  @HasuraRefName('capabilities')
  @ManyToOne({
    entity: () => ApplicationComponent,
    primary: true,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;

  
}
