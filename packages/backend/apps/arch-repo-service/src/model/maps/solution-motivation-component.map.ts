import { HasuraReference, HasuraTable } from '@archpad/models';
import { Entity, ManyToOne } from '@mikro-orm/core';
import { SolutionMotivationElementMap } from '@/model/maps/solution-motivation-item.map';
import { SolutionApplicationComponentMap } from '@/model/maps/solution-application-component.map';
import { MappedSolutionObject } from '@/model/abstract/mapped-solution-object.abstract';

@HasuraTable()
@Entity({ tableName: 'map_solution_motivation_component' })
export class SolutionMotivationComponentMap extends MappedSolutionObject {
  @HasuraReference({
    objectName: 'componentSolution',
    collectionName: 'motivationsInSolution',
  })
  @ManyToOne({
    entity: () => SolutionApplicationComponentMap,
    primary: true,
    joinColumns: ['solution_id', 'component_id'],
    referencedColumnNames: ['solution_id', 'component_id'],
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  componentSolution!: SolutionApplicationComponentMap;

  @HasuraReference({
    objectName: 'motivationSolution',
    collectionName: 'componentsInSolution',
  })
  @ManyToOne({
    entity: () => SolutionMotivationElementMap,
    primary: true,
    joinColumns: ['solution_id', 'motivation_id'],
    referencedColumnNames: ['solution_id', 'motivation_id'],
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  motivationSolution!: SolutionMotivationElementMap;
}
