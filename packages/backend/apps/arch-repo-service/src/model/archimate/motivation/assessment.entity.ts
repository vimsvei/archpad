import { Entity, Enum } from '@mikro-orm/core';
import { AssessmentType } from '@/model/enums/assessment-type.enum';
import { MotivationElementGeneric } from '@/model/archimate/core/motivation-element.generic';
import { MotivationKind } from '@/model/enums/motivation-kind.enum';
import { CapabilityAssessmentType } from '@/model/enums/capability-assessment-type.enum';

@Entity({ discriminatorValue: MotivationKind.ASSESSMENT })
export class Assessment extends MotivationElementGeneric {
  @Enum({
    items: () => AssessmentType,
    nativeEnumName: 'assessment_type_enum',
    name: 'assessment_type',
  })
  type!: AssessmentType;
}

@Entity({ discriminatorValue: MotivationKind.CAPABILITY_ASSESSMENT })
export class CapabilityAssessment extends MotivationElementGeneric {
  @Enum({
    items: () => CapabilityAssessmentType,
    nativeEnumName: 'capability_assessment_type_enum',
    name: 'capability_assessment_type',
  })
  type!: CapabilityAssessmentType;
}
