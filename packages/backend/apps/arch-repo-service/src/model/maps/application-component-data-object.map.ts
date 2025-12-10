import { MappedObject } from '@archpad/models';
import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { DataObject } from '@/model/archimate/application/data-object.entity';

@Entity({ tableName: 'map_application_component_data_object' })
export class ApplicationComponentDataObjectMap extends MappedObject {
  @ManyToOne({
    entity: () => ApplicationComponent,
    primary: true,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;

  @ManyToOne({
    entity: () => DataObject,
    primary: true,
    fieldName: 'data_object_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  dataObject!: DataObject;
}
