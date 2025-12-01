import { MappedObject } from '@/model/abstract/mapped-object.abstract';
import { Entity, ManyToOne } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/entities/archimate/application/application-component.entity';
import { DataObject } from '@/model/entities/archimate/application/data-object.entity';

@Entity({ tableName: 'map_application_component_data_object' })
export class ApplicationComponentDataObjectMap extends MappedObject {
  @ManyToOne({
    entity: () => ApplicationComponent,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;

  @ManyToOne({
    entity: () => DataObject,
    fieldName: 'data_object_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  dataObject: DataObject;
}
