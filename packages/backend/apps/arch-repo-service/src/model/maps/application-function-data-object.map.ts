import { HasuraRefName, HasuraTable, MappedObject } from '@archpad/models';
import { Entity, Enum, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { ApplicationComponentFunctionMap } from '@/model/maps/application-component-function.map';
import { ApplicationComponentDataObjectMap } from '@/model/maps/application-component-data-object.map';
import { DataAccessKind } from '@/model/enums/data-access-kind.enum';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { DataObject } from '@/model/archimate/application/data-object.entity';

@HasuraTable()
@Entity({ tableName: 'map_application_function_data_object' })
export class ApplicationFunctionDataObjectMap extends MappedObject {
  @ManyToOne({
    entity: () => ApplicationComponentFunctionMap,
    primary: true,
    joinColumns: ['component_id', 'function_id'],
    referencedColumnNames: ['component_id', 'function_id'],
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  componentFunction!: ApplicationComponentFunctionMap;

  @ManyToOne({
    entity: () => ApplicationComponentDataObjectMap,
    primary: true,
    joinColumns: ['component_id', 'data_object_id'],
    referencedColumnNames: ['component_id', 'data_object_id'],
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  componentDataObject!: ApplicationComponentDataObjectMap;

  @HasuraRefName('dataObjectsInFunctions')
  @ManyToOne({
    entity: () => ApplicationComponent,
    fieldName: 'component_id',
    referenceColumnName: 'id',
    nullable: false,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;

  @HasuraRefName('useInFunctions')
  @ManyToOne({
    entity: () => DataObject,
    fieldName: 'data_object_id',
    referenceColumnName: 'id',
    nullable: false,
    updateRule: 'cascade',
    deleteRule: 'no action',
    inversedBy: 'useInFunctions',
  })
  dataObject!: DataObject;

  @Enum({
    items: () => DataAccessKind,
    nativeEnumName: 'data_access_kind_enum',
  })
  accessKind!: DataAccessKind;
}
