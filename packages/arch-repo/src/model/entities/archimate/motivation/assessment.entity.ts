import { Collection, Entity, Enum, OneToMany, Property } from '@mikro-orm/core';
import { AssessmentType } from '@/model/enums/assessment-type.enum';
import { AssessmentLink } from '@/model/entities/maps/assessment-link.entity';
import { MotivationElementGeneric } from '@/model/entities/archimate/core/motivation-element.generic';

@Entity({
  tableName: 'assessments',
  abstract: true,
  discriminatorColumn: 'type',
})
export abstract class Assessment extends MotivationElementGeneric {
  @Enum({ items: () => AssessmentType, nativeEnumName: 'assessment_type_enum' })
  type: AssessmentType;

  @OneToMany(() => AssessmentLink, (link) => link.assessment)
  objects = new Collection<AssessmentLink>(this);
}
