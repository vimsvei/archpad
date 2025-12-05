import { Entity, Enum, Property } from '@mikro-orm/core';
import { RiskCategory } from '@/model/enums/risk-category.enum';
import { RiskStatus } from '@/model/enums/risk-status.enum';
import { MotivationElementGeneric } from '@/model/archimate/core/motivation-element.generic';
import { MotivationKind } from '@/model/enums/motivation-kind.enum';

@Entity({ discriminatorValue: MotivationKind.RISK })
export class RiskAssessment extends MotivationElementGeneric {
  @Enum({
    items: () => RiskCategory,
    nativeEnumName: 'risk_category_enum',
    nullable: true,
  })
  riskCategory?: RiskCategory;

  @Property({
    nullable: true,
    type: 'smallint',
    default: 0,
  })
  probability?: number;

  @Property({
    columnType: 'smallint',
    nullable: true,
    default: 0,
  })
  impact?: number;

  @Property({
    columnType: 'smallint',
    nullable: true,
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
