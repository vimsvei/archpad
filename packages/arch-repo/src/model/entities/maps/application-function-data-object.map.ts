import { MappedObject } from '@/model/abstract/mapped-object.abstract';
import { Entity, Enum, ManyToOne } from '@mikro-orm/core';
import { ApplicationComponentFunctionMap } from '@/model/entities/maps/application-component-function.map';
import { ApplicationComponentDataObjectMap } from '@/model/entities/maps/application-component-data-object.map';
import { DataAccessKind } from '@/model/enums/data-access-kind.enum';
import { ApplicationComponent } from '@/model/entities/archimate/application/application-component.entity';
import { DataObject } from '@/model/entities/archimate/application/data-object.entity';

@Entity({ tableName: 'map_application_function_data_object' })
export class ApplicationFunctionDataObject extends MappedObject {
  @ManyToOne(() => ApplicationComponent)
  component!: ApplicationComponent;

  @ManyToOne(() => DataObject)
  dataObject!: DataObject;

  @ManyToOne({
    entity: () => ApplicationComponentFunctionMap,
    fieldName: 'component_function_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  functionMap!: ApplicationComponentFunctionMap;

  @ManyToOne({
    entity: () => ApplicationComponentDataObjectMap,
    fieldName: 'component_data_object_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  dataObjectMap!: ApplicationComponentDataObjectMap;

  @Enum({
    items: () => DataAccessKind,
    default: DataAccessKind.READ_WRITE,
    nativeEnumName: 'data_access_kind_enum',
  })
  accessKind!: DataAccessKind;
}
