import { ArchimateElementGeneric } from '@/model/entities/archimate/core/archimate-element.generic';
import { Entity, Enum } from '@mikro-orm/core';
import { MotivationStatus } from '@/model/enums/motivation-status.enum';
import { MotivationPriority } from '@/model/enums/motivation-priority.enum';

@Entity({ abstract: true })
export abstract class MotivationObject extends ArchimateElementGeneric {
  @Enum(() => MotivationStatus)
  state?: MotivationStatus;

  @Enum({ items: () => MotivationPriority, nullable: true })
  priority?: MotivationPriority;
}
