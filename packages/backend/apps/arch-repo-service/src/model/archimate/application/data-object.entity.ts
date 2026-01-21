import { ArchimateElementGeneric } from '@/model/archimate/core/archimate-element.generic';
import { Collection, Entity, OneToMany } from '@mikro-orm/core';
import {
  ArchimateCode,
  HasuraReference,
  HasuraTable,
} from '@archpad/models';
import { ApplicationComponentDataObjectMap } from '@/model/maps/application-component-data-object.map';
import { ApplicationFunctionDataObjectMap } from '@/model/maps/application-function-data-object.map';

@HasuraTable()
@Entity({ tableName: 'data_objects' })
export class DataObject extends ArchimateElementGeneric {
  @ArchimateCode('DATA_OBJECT')
  override code: string = undefined as any;

  @HasuraReference({ objectName: 'dataObject', collectionName: 'components' })
  @OneToMany({
    entity: () => ApplicationComponentDataObjectMap,
    mappedBy: 'dataObject',
  })
  components = new Collection<ApplicationComponentDataObjectMap>(this);

  @HasuraReference({ objectName: 'dataObject', collectionName: 'useInFunctions' })
  @OneToMany({
    entity: () => ApplicationFunctionDataObjectMap,
    mappedBy: 'dataObject',
  })
  useInFunctions = new Collection<ApplicationFunctionDataObjectMap>(this);
}
