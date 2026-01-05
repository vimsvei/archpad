import { HasuraRefName, HasuraTable, MappedObject } from '@archpad/models';
import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { Solution } from '@/model/solution/solution.entity';
import {MotivationElementGeneric} from "@/model/archimate/core/motivation-element.generic";

@HasuraTable()
@Entity({ tableName: 'map_solution_motivation' })
@Unique({ properties: ['motivation', 'solution'] })
export class SolutionMotivationElementMap extends MappedObject {
  @HasuraRefName('motivation')
  @ManyToOne({
    entity: () => Solution,
    primary: true,
    fieldName: 'solution_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  solution!: Solution;

  @HasuraRefName('solutions')
  @ManyToOne({
    entity: () => MotivationElementGeneric,
    primary: true,
    fieldName: 'motivation_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  motivation!: MotivationElementGeneric;
}
