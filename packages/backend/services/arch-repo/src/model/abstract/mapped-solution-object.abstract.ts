import { Entity, Enum } from '@mikro-orm/core';
import { BaseObject } from '@/model/abstract/base-object.abstract';
import { SolutionItemState } from '@/model/enums/solution-item-state.enum';

@Entity({ abstract: true })
export abstract class MappedSolutionObject extends BaseObject {
  @Enum({
    items: () => SolutionItemState,
    nativeEnumName: 'solution_item_state',
    default: SolutionItemState.USE,
  })
  state!: SolutionItemState;
}
