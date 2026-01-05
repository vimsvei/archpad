import { HasuraTable } from '@archpad/models';
import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { Solution } from '@/model/solution/solution.entity';
import { MappedSolutionObject } from '@/model/abstract/mapped-solution-object.abstract';
import { HasuraRefName } from '@archpad/models';
import { ApplicationFunction } from '@/model/archimate/application/application-function.entity';
import { ApplicationComponentFunctionMap } from '@/model/maps/application-component-function.map';

@HasuraTable()
@Entity({ tableName: 'map_solution_application_function' })
export class SolutionApplicationFunctionMap extends MappedSolutionObject {
  @HasuraRefName()
  @ManyToOne({
    entity: () => Solution,
    primary: true,
    fieldName: 'solution_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  solution!: Solution;

  @HasuraRefName()
  @ManyToOne({
    entity: () => ApplicationComponentFunctionMap,
    primary: true,
    joinColumns: ['component_id', 'function_id'],
    referencedColumnNames: ['component_id', 'function_id'],
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  functionComponent!: ApplicationComponentFunctionMap;
}
