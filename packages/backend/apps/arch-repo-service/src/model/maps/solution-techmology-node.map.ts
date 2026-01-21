import { HasuraReference, HasuraTable } from '@archpad/models';
import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { Solution } from '@/model/solution/solution.entity';
import { MappedSolutionObject } from '@/model/abstract/mapped-solution-object.abstract';
import { TechnologyNode } from '@/model/archimate/technology/technology-node.entity';

@HasuraTable()
@Entity({ tableName: 'map_solution_technology_node' })
@Unique({ properties: ['node', 'solution'] })
export class SolutionTechnologyNodeMap extends MappedSolutionObject {
  @HasuraReference({ objectName: 'solution', collectionName: 'nodes' })
  @ManyToOne({
    entity: () => Solution,
    primary: true,
    fieldName: 'solution_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  solution!: Solution;

  @HasuraReference({ objectName: 'node', collectionName: 'solutions' })
  @ManyToOne({
    entity: () => TechnologyNode,
    primary: true,
    fieldName: 'node_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  node!: TechnologyNode;
}
