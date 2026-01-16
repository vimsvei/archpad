import {
  Collection,
  Embedded,
  Entity,
  Enum,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import {
  ActionStamp,
  ArchimateCode,
  HasuraRefCollection,
  HasuraTable,
} from '@archpad/models';
import { ArchimateElementGeneric } from '../archimate/core/archimate-element.generic';
import { SolutionApplicationComponentMap } from '../maps/solution-application-component.map';
import { SolutionFlowMap } from '@/model/maps/solution-flow.map';
import { SolutionDataObjectMap } from '@/model/maps/solution-data-object.map';
import { SolutionApplicationFunctionMap } from '@/model/maps/solution-application-function.map';
import { SolutionMotivationElementMap } from '@/model/maps/solution-motivation-item.map';
import { SolutionLifecycle } from '@/model/enums/solution-life-cycle.enum';
import { SolutionImplementationStatus } from '@/model/enums/solution-implementation-status.enum';

@HasuraTable()
@Entity({ tableName: 'solutions' })
export class Solution extends ArchimateElementGeneric {
  @ArchimateCode('SOLUTION')
  override code: string = undefined as any;

  @ApiProperty()
  @Property({ type: 'text' })
  context!: string;

  @ApiProperty()
  @Property({ type: 'text' })
  decision!: string;

  @ApiProperty()
  @Property({ type: 'text' })
  consequences!: string;

  @ApiProperty()
  @Property({ type: 'text' })
  alternatives!: string;

  @ApiProperty({
    enum: SolutionLifecycle,
    description: 'Статус решения',
  })
  @Enum({
    items: () => SolutionLifecycle,
    nativeEnumName: 'solution_life_cycle_enum',
    default: SolutionLifecycle.PROPOSED,
  })
  decisionStatus!: SolutionLifecycle;

  @ApiProperty({
    enum: SolutionImplementationStatus,
    description: 'Статус реализации решения',
  })
  @Enum({
    items: () => SolutionImplementationStatus,
    nativeEnumName: 'solution_implementation_status_enum',
    default: SolutionImplementationStatus.NOT_STARTED,
  })
  ImplementationStatus!: SolutionImplementationStatus;

  @Embedded({
    entity: () => ActionStamp,
    prefix: 'accepted_',
    prefixMode: 'absolute',
    nullable: true,
  })
  accepted!: ActionStamp;

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
