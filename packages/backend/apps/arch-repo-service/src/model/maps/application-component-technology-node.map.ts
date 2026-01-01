import { HasuraTable, MappedObject } from '@archpad/models';
import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { TechnologyNode } from '@/model/archimate/technology/technology-node.entity';
import { HasuraRefName } from '@archpad/models';

@HasuraTable()
@Entity({ tableName: 'map_application_component_technology_node' })
export class ApplicationComponentTechnologyNodeMap extends MappedObject {
  @HasuraRefName('node')
  @ManyToOne({
    entity: () => ApplicationComponent,
    primary: true,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;

  @HasuraRefName('components')
  @ManyToOne({
    entity: () => TechnologyNode,
    primary: true,
    fieldName: 'node_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  node!: TechnologyNode;
}
