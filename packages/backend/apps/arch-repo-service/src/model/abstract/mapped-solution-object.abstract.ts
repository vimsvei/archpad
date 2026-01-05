import { Entity, Enum, Property} from '@mikro-orm/core';
import { BaseObject } from '@archpad/models';
import { SolutionItemState } from '@/model/enums/solution-item-state.enum';
import {ApiProperty} from "@nestjs/swagger";

@Entity({ abstract: true })
export abstract class MappedSolutionObject extends BaseObject {
  
  @ApiProperty({
    description: 'tenant object',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Property({
    type: 'uuid',
    name: 'tenant_id',
    nullable: false,
  })
  tenantId!: string;
  
  @Enum({
    items: () => SolutionItemState,
    nativeEnumName: 'solution_item_state',
    default: SolutionItemState.USE,
  })
  state!: SolutionItemState;
}
