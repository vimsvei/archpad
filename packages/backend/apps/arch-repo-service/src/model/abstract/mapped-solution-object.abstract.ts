import { Entity, Enum, Property } from '@mikro-orm/core';
import { MappedObject } from '@archpad/models';
import { SolutionItemState } from '@/model/enums/solution-item-state.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ abstract: true })
export abstract class MappedSolutionObject extends MappedObject {
  
  @ApiProperty({ description: 'Описание изменений' })
  @Property({ type: 'text', nullable: true })
  description!: string;
  
  @Enum({
    items: () => SolutionItemState,
    nativeEnumName: 'solution_item_state',
    default: SolutionItemState.USE,
  })
  state!: SolutionItemState;
}
