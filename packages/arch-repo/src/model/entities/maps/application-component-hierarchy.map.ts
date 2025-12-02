import { MappedObject } from '@/model/abstract/mapped-object.abstract';
import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/entities/archimate/application/application-component.entity';

@Entity({ tableName: 'map_application_component_hierarchy' })
@Unique({ properties: ['parent', 'child'] })
export class ApplicationComponentHierarchyMap extends MappedObject {
  @ManyToOne({
    entity: () => ApplicationComponent,
    fieldName: 'component_parent_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  parent!: ApplicationComponent;

  @ManyToOne({
    entity: () => ApplicationComponent,
    fieldName: 'component_child_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  child!: ApplicationComponent;

  @Property({ type: 'int', nullable: true })
  order?: number;
}
