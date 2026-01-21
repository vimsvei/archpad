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
  HasuraReference,
  HasuraTable,
} from '@archpad/models';
import { SolutionApplicationComponentMap } from '../maps/solution-application-component.map';
import { SolutionFlowMap } from '@/model/maps/solution-flow.map';
import { SolutionDataObjectMap } from '@/model/maps/solution-data-object.map';
import { SolutionApplicationFunctionMap } from '@/model/maps/solution-application-function.map';
import { SolutionMotivationElementMap } from '@/model/maps/solution-motivation-item.map';
import { SolutionImplementationStatus } from '@/model/enums/solution-implementation-status.enum';
import {SolutionElementGeneric} from "@/model/solution/solution-element.generic";
import {Variant} from "@/model/solution/variant.entity";
import {View} from "@/model/solution/view.entity";
import {SolutionLifecycle} from "@/model/enums/solution-life-cycle.enum";

@HasuraTable()
@Entity({ tableName: 'solutions' })
export class Solution extends SolutionElementGeneric {
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
  
  @HasuraReference({ objectName: 'solution', collectionName: 'variants' })
  @OneToMany({
    entity: () => Variant,
    mappedBy: 'solution',
  })
  variants = new Collection<Variant>(this);
  
  @HasuraReference({ objectName: 'solution', collectionName: 'views' })
  @OneToMany({
    entity: () => View,
    mappedBy: 'solution',
  })
  views = new Collection<View>(this);

  @HasuraReference({ objectName: 'solution', collectionName: 'components' })
  @OneToMany({
    entity: () => SolutionApplicationComponentMap,
    mappedBy: 'solution',
  })
  components = new Collection<SolutionApplicationComponentMap>(this);

  @HasuraReference({ objectName: 'solution', collectionName: 'functions' })
  @OneToMany({
    entity: () => SolutionApplicationFunctionMap,
    mappedBy: 'solution',
  })
  functions = new Collection<SolutionApplicationFunctionMap>(this);

  @HasuraReference({ objectName: 'solution', collectionName: 'dataObjects' })
  @OneToMany({
    entity: () => SolutionDataObjectMap,
    mappedBy: 'solution',
  })
  dataObjects = new Collection<SolutionDataObjectMap>(this);

  @HasuraReference({ objectName: 'solution', collectionName: 'flows' })
  @OneToMany({
    entity: () => SolutionFlowMap,
    mappedBy: 'solution',
  })
  flows = new Collection<SolutionFlowMap>(this);

  @HasuraReference({ objectName: 'solution', collectionName: 'motivations' })
  @OneToMany({
    entity: () => SolutionMotivationElementMap,
    mappedBy: 'solution',
  })
  motivations = new Collection<SolutionMotivationElementMap>(this);
}
