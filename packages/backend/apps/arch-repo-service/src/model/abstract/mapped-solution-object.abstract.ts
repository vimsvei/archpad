import { Entity, Enum, Property } from '@mikro-orm/core';
import { MappedObject } from '@archpad/models';
import {SolutionItemImpactTypeEnum } from '@/model/enums/solution-item-impact-type.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ abstract: true })
export abstract class MappedSolutionObject extends MappedObject {
  @ApiProperty({ description: 'Описание изменений' })
  @Property({ type: 'text', nullable: true })
  description!: string;

  @Enum({
    items: () => SolutionItemImpactTypeEnum,
    nativeEnumName: 'solution_item_impact_type_enum',
    default: SolutionItemImpactTypeEnum.DEPENDS_ON,
  })
  state!: SolutionItemImpactTypeEnum;
}
