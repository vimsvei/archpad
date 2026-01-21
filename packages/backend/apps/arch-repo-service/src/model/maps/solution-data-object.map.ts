import { HasuraReference, HasuraTable } from '@archpad/models';
import { Entity, ManyToOne } from '@mikro-orm/core';
import { Solution } from '@/model/solution/solution.entity';
import { MappedSolutionObject } from '@/model/abstract/mapped-solution-object.abstract';
import { ApplicationComponentDataObjectMap } from '@/model/maps/application-component-data-object.map';

@HasuraTable()
@Entity({ tableName: 'map_solution_data_object' })
export class SolutionDataObjectMap extends MappedSolutionObject {
  @HasuraReference({ objectName: 'solution', collectionName: 'dataObjectsInComponent' })
  @ManyToOne({
    entity: () => Solution,
    primary: true,
    fieldName: 'solution_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  solution!: Solution;

  @HasuraReference({ objectName: 'functionComponent', collectionName: 'solutions' })
  @ManyToOne({
    entity: () => ApplicationComponentDataObjectMap,
    primary: true,
    joinColumns: ['component_id', 'data_object_id'],
    referencedColumnNames: ['component_id', 'data_object_id'],
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  functionComponent!: ApplicationComponentDataObjectMap;
}
