import { HasuraRefName, HasuraTable, MappedObject } from '@archpad/models';
import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { DataObject } from '@/model/archimate/application/data-object.entity';

@HasuraTable()
@Entity({ tableName: 'map_application_component_data_object' })
export class ApplicationComponentDataObjectMap extends MappedObject {
  // Hasura array relationship name on `components` table (reverse side of this FK):
  // component { dataObjects { dataObject { ... } } }
  @HasuraRefName('dataObjects')
  @ManyToOne({
    entity: () => ApplicationComponent,
    primary: true,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;

  // Hasura array relationship name on `data_objects` table (reverse side of this FK):
  // dataObject { components { component { ... } } }
  @HasuraRefName('components')
  @ManyToOne({
    entity: () => DataObject,
    primary: true,
    fieldName: 'data_object_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  dataObject!: DataObject;
}
