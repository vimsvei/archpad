import { ArchimateElementGeneric } from '@/model/entities/archimate/core/archimate-element.generic';
import { Entity, Enum } from '@mikro-orm/core';
import { MotivationStatus } from '@/model/enums/motivation-status.enum';
import { MotivationPriority } from '@/model/enums/motivation-priority.enum';

@Entity({ abstract: true })
export abstract class MotivationElementGeneric extends ArchimateElementGeneric {
  @Enum({
    items: () => MotivationStatus,
    nativeEnumName: 'motivation_status_enum',
  })
  state?: MotivationStatus;

  @Enum({
    items: () => MotivationPriority,
    nullable: true,
    nativeEnumName: 'motivation_priority_enum',
  })
  priority?: MotivationPriority;
}
