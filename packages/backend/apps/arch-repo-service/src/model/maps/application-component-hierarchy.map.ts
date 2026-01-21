import { HasuraReference, HasuraTable, MappedObject } from '@archpad/models';
import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';

@HasuraTable()
@Entity({ tableName: 'map_application_component_hierarchy' })
export class ApplicationComponentHierarchyMap extends MappedObject {
  @HasuraReference({ objectName: 'parent', collectionName: 'children' })
  @ManyToOne({
    entity: () => ApplicationComponent,
    primary: true,
    fieldName: 'component_parent_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  parent!: ApplicationComponent;

  @HasuraReference({ objectName: 'child', collectionName: 'parents' })
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
