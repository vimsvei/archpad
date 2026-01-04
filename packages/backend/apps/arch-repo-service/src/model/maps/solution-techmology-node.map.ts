import { HasuraTable } from '@archpad/models';
import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { Solution } from '@/model/solution/solution.entity';
import { MappedSolutionObject } from '@/model/abstract/mapped-solution-object.abstract';
import { HasuraRefName } from '@archpad/models';
import { ApplicationFunction } from '@/model/archimate/application/application-function.entity';
import {TechnologyNode} from "@/model/archimate/technology/technology-node.entity";

@HasuraTable()
@Entity({ tableName: 'map_solution_technology_node' })
@Unique({ properties: ['node', 'solution'] })
export class SolutionTechnologyNodeMap extends MappedSolutionObject {
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
    entity: () => TechnologyNode,
    primary: true,
    fieldName: 'node_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  node!: TechnologyNode;
}
