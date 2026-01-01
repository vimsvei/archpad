import { ArchimateElementGeneric } from '@/model/archimate/core/archimate-element.generic';
import { Entity, Enum } from '@mikro-orm/core';
import { MotivationStatus } from '@/model/enums/motivation-status.enum';
import { MotivationPriority } from '@/model/enums/motivation-priority.enum';
import { MotivationKind } from '@/model/enums/motivation-kind.enum';
import { HasuraTable } from '@archpad/models';

@HasuraTable()
@Entity({
  abstract: true,
  tableName: 'motivations',
  discriminatorColumn: 'kind',
})
export abstract class MotivationElementGeneric extends ArchimateElementGeneric {
  @Enum({
    items: () => MotivationKind,
    nativeEnumName: 'motivation_kind_enum',
  })
  kind!: MotivationKind;

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
