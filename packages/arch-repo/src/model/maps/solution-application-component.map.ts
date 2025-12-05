import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { Solution } from '@/model/solution/solution.entity';
import { MappedSolutionObject } from '@/model/abstract/mapped-solution-object.abstract';

@Entity({ tableName: 'map_solution_application_component' })
@Unique({ properties: ['component', 'solution'] })
export class SolutionApplicationComponentMap extends MappedSolutionObject {
  @ManyToOne({
    entity: () => Solution,
    primary: true,
    fieldName: 'solution_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  solution!: Solution;

  @ManyToOne({
    entity: () => ApplicationComponent,
    primary: true,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;
}
