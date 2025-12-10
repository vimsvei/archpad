import { MappedObject } from '@archpad/models';
import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { Solution } from '@/model/solution/solution.entity';
import { Constraint } from '@/model/archimate/motivation/constraint.entity';

@Entity({ tableName: 'map_solution_constraint' })
@Unique({ properties: ['constraint', 'solution'] })
export class SolutionConstraintMap extends MappedObject {
  @ManyToOne({
    entity: () => Solution,
    primary: true,
    fieldName: 'solution_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  solution!: Solution;

  @ManyToOne({
    entity: () => Constraint,
    primary: true,
    fieldName: 'constraint_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  constraint!: Constraint;
}
