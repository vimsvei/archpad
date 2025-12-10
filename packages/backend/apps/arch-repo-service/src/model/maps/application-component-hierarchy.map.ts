import { MappedObject } from '@archpad/models';
import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';

@Entity({ tableName: 'map_application_component_hierarchy' })
export class ApplicationComponentHierarchyMap extends MappedObject {
  @ManyToOne({
    entity: () => ApplicationComponent,
    primary: true,
    fieldName: 'component_parent_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  parent!: ApplicationComponent;

  @ManyToOne({
    entity: () => ApplicationComponent,
    primary: true,
    fieldName: 'component_child_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  child!: ApplicationComponent;

  @Property({ type: 'int', nullable: true })
  order?: number;
}
