import { HasuraTable, MappedObject } from '@archpad/models';
import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { Solution } from '@/model/solution/solution.entity';
import { Constraint } from '@/model/archimate/motivation/constraint.entity';

@HasuraTable()
@Entity({ tableName: 'map_solution_constraint' })
@Unique({ properties: ['solution', 'constraint'] })
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
    fieldName: 'motivation_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  constraint!: Constraint; // motivation_id references motivations.id (Constraint discriminator)
}
