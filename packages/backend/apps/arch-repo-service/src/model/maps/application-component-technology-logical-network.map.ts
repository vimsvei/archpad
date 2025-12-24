import { MappedObject } from '@archpad/models';
import { Entity, ManyToOne } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { TechnologyLogicalNetwork } from '@/model/archimate/technology/technology-network.entity';

@Entity({ tableName: 'map_application_component_technology_logical_network' })
export class ApplicationComponentTechnologyLogicalNetworkMap extends MappedObject {
  @ManyToOne({
    entity: () => ApplicationComponent,
    primary: true,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;

  @ManyToOne({
    entity: () => TechnologyLogicalNetwork,
    primary: true,
    fieldName: 'logical_network_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  logicalNetwork!: TechnologyLogicalNetwork;
}
