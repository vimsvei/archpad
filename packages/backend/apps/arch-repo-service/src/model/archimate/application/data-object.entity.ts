import { ArchimateElementGeneric } from '@/model/archimate/core/archimate-element.generic';
import { Collection, Entity, OneToMany } from '@mikro-orm/core';
import { ArchimateCode } from '@/model/decorators/archimate-code.decorator';
import { ApplicationComponentDataObjectMap } from '@/model/maps/application-component-data-object.map';
import { ApplicationFunctionDataObjectMap } from '@/model/maps/application-function-data-object.map';

@Entity({ tableName: 'data_objects' })
export class DataObject extends ArchimateElementGeneric {
  @ArchimateCode('DATA_OBJECT')
  override code: string = undefined as any;

  @OneToMany({
    entity: () => ApplicationComponentDataObjectMap,
    mappedBy: 'dataObject',
  })
  components = new Collection<ApplicationComponentDataObjectMap>(this);

  @OneToMany({
    entity: () => ApplicationFunctionDataObjectMap,
    mappedBy: 'dataObject',
  })
  useInFunctions = new Collection<ApplicationFunctionDataObjectMap>(this);
}
