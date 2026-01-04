import { HasuraTable } from '@archpad/models';
import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { Solution } from '@/model/solution/solution.entity';
import { MappedSolutionObject } from '@/model/abstract/mapped-solution-object.abstract';
import { HasuraRefName } from '@archpad/models';
import { ApplicationFunction } from '@/model/archimate/application/application-function.entity';

@HasuraTable()
@Entity({ tableName: 'map_solution_application_function' })
@Unique({ properties: ['function', 'solution'] })
export class SolutionApplicationComponentMap extends MappedSolutionObject {
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
    entity: () => ApplicationFunction,
    primary: true,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  function!: ApplicationFunction;
}
