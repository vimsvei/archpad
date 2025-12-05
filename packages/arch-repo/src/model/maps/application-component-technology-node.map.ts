import { MappedObject } from '@/model/abstract/mapped-object.abstract';
import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { TechnologyNode } from '@/model/archimate/technology/technology-node.entity';

@Entity({ tableName: 'map_application_component_technology_node' })
@Unique({ properties: ['component', 'node'] })
export class ApplicationComponentTechnologyNodeMap extends MappedObject {
  @ManyToOne({
    entity: () => ApplicationComponent,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;

  @ManyToOne({
    entity: () => TechnologyNode,
    fieldName: 'data_object_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  node!: TechnologyNode;
}
