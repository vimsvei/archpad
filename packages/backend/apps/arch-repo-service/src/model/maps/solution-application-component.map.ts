import { HasuraTable } from '@archpad/models';
import { Entity, Enum, ManyToOne, Unique } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { Solution } from '@/model/solution/solution.entity';
import { MappedSolutionObject } from '@/model/abstract/mapped-solution-object.abstract';
import { HasuraRefName } from '@archpad/models';

@HasuraTable()
@Entity({ tableName: 'map_solution_application_component' })
@Unique({ properties: ['component', 'solution'] })
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
    entity: () => ApplicationComponent,
    primary: true,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;
}
