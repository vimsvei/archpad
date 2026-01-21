import { ArchimateCode, HasuraTable } from '@archpad/models';
import { Entity, ManyToOne } from '@mikro-orm/core';
import { Solution } from '@/model/solution/solution.entity';
import { SolutionElementGeneric } from '@/model/solution/solution-element.generic';

@HasuraTable()
@Entity({ tableName: 'variants' })
export class Variant  extends SolutionElementGeneric {
  
  @ArchimateCode('VARIANT')
  override code: string = undefined as any;
  
  @ManyToOne({
    entity: () => Solution,
    fieldName: 'solution_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  solution!: Solution;
  
}
