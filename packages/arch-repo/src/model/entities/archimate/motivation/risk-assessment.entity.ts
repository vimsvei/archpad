import { Entity, Enum, Property } from '@mikro-orm/core';
import { AssessmentType } from '@/model/enums/assessment-type.enum';
import { RiskCategory } from '@/model/enums/risk-category.enum';
import { RiskStatus } from '@/model/enums/risk-status.enum';
import { Assessment } from '@/model/entities/archimate/motivation/assessment.entity';

@Entity({ discriminatorValue: AssessmentType.RISK })
export class RiskAssessment extends Assessment {
  @Enum({
    items: () => RiskCategory,
    nativeEnumName: 'risk_category_enum',
    nullable: true,
  })
  riskCategory?: RiskCategory;

  @Property({
    nullable: true,
    type: 'smallint',
    check: 'probability BETWEEN 0 AND 5',
    default: 0,
  })
  probability?: number;

  @Property({
    columnType: 'smallint',
    nullable: true,
    check: 'impact BETWEEN 0 AND 5',
    default: 0,
  })
  impact?: number;

  @Property({
    columnType: 'smallint',
    nullable: true,
    check: 'severity BETWEEN 0 AND 5',
    default: 0,
  })
  severity?: number;

  @Enum({
    items: () => RiskStatus,
    nullable: true,
    nativeEnumName: 'risk_status_enum',
  })
  status?: RiskStatus;

  @Property({ columnType: 'text', nullable: true })
  mitigationNotes?: string;

  updateSeverity() {
    if (this.probability && this.impact) {
      this.severity = this.probability * this.impact;
    } else {
      this.severity = 0;
    }
  }
}
