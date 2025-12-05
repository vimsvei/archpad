import { Entity, Enum } from '@mikro-orm/core';
import { AssessmentType } from '@/model/enums/assessment-type.enum';
import { MotivationElementGeneric } from '@/model/archimate/core/motivation-element.generic';
import { MotivationKind } from '@/model/enums/motivation-kind.enum';

@Entity({ discriminatorValue: MotivationKind.ASSESSMENT })
export class Assessment extends MotivationElementGeneric {
  @Enum({ items: () => AssessmentType, nativeEnumName: 'assessment_type_enum' })
  typeAssessment!: AssessmentType;
}
