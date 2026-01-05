import { Collection, Entity, ManyToOne, OneToMany } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArchimateCode,
  HasuraRefCollection,
  HasuraRefName,
  HasuraTable,
} from '@archpad/models';
import { ArchimateElementGeneric } from '../archimate/core/archimate-element.generic';
import { SolutionApplicationComponentMap } from '../maps/solution-application-component.map';
import { SolutionStateDirectory } from '@/model/directories/directories';
import { SolutionFlowMap } from '@/model/maps/solution-flow.map';
import { SolutionDataObjectMap } from '@/model/maps/solution-data-object.map';
import { SolutionApplicationFunctionMap } from '@/model/maps/solution-application-function.map';
import { SolutionMotivationElementMap } from '@/model/maps/solution-motivation-item.map';

@HasuraTable()
@Entity({ tableName: 'solutions' })
export class Solution extends ArchimateElementGeneric {
  @ArchimateCode('SOLUTION')
  override code: string = undefined as any;

  @ApiProperty({
    format: 'uuid',
    type: SolutionStateDirectory,
    description: 'Статус решения',
  })
  @HasuraRefName()
  @ManyToOne({
    entity: () => SolutionStateDirectory,
    name: 'state_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  state!: SolutionStateDirectory;

  @HasuraRefCollection()
  @OneToMany({
    entity: () => SolutionApplicationComponentMap,
    mappedBy: 'solution',
  })
  components = new Collection<SolutionApplicationComponentMap>(this);

  @HasuraRefCollection()
  @OneToMany({
    entity: () => SolutionApplicationFunctionMap,
    mappedBy: 'solution',
  })
  functions = new Collection<SolutionApplicationFunctionMap>(this);

  @HasuraRefCollection()
  @OneToMany({
    entity: () => SolutionDataObjectMap,
    mappedBy: 'solution',
  })
  dataObjects = new Collection<SolutionDataObjectMap>(this);

  @HasuraRefCollection()
  @OneToMany({
    entity: () => SolutionFlowMap,
    mappedBy: 'solution',
  })
  flows = new Collection<SolutionFlowMap>(this);

  @HasuraRefCollection()
  @OneToMany({
    entity: () => SolutionMotivationElementMap,
    mappedBy: 'solution',
  })
  motivations = new Collection<SolutionMotivationElementMap>(this);
}
