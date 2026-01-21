import { ArchimateCode, HasuraTable } from '@archpad/models';
import { Entity, ManyToOne } from '@mikro-orm/core';
import { Solution } from '@/model/solution/solution.entity';
import { Variant } from '@/model/solution/variant.entity';
import { SolutionElementGeneric } from '@/model/solution/solution-element.generic';

@HasuraTable()
@Entity({ tableName: 'views' })
export class View extends SolutionElementGeneric {
  @ArchimateCode('VIEW')
  override code: string = undefined as any;

  @ManyToOne({
    entity: () => Solution,
    fieldName: 'solution_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  solution!: Solution;

  @ManyToOne({
    entity: () => Variant,
    fieldName: 'variant_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  variant!: Variant;
}
