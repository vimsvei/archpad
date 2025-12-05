import { MappedObject } from '@/model/abstract/mapped-object.abstract';
import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { Solution } from '@/model/solution/solution.entity';

@Entity({ tableName: 'map_solution_application_component' })
@Unique({ properties: ['component', 'solution'] })
export class SolutionApplicationComponentMap extends MappedObject {
  @ManyToOne({
    entity: () => Solution,
    fieldName: 'solution_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  solution!: Solution;
  
  @ManyToOne({
    entity: () => ApplicationComponent,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;
}
