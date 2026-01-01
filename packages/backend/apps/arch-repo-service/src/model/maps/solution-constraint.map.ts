import { HasuraRefName, HasuraTable, MappedObject } from '@archpad/models';
import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { Solution } from '@/model/solution/solution.entity';
import { Constraint } from '@/model/archimate/motivation/constraint.entity';

@HasuraTable()
@Entity({ tableName: 'map_solution_constraint' })
@Unique({ properties: ['constraint', 'solution'] })
export class SolutionConstraintMap extends MappedObject {
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
    entity: () => Constraint,
    primary: true,
    fieldName: 'constraint_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  constraint!: Constraint;
}
