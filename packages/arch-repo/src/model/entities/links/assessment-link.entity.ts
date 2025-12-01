import { Assessment } from '@/model/entities/archimate/motivation/assessment.entity';
import { Entity, ManyToOne } from '@mikro-orm/core';
import { IdentifiedObject } from '@/model/abstract/identified-object.abstract';

@Entity({ tableName: 'assessment-links' })
export class AssessmentLink extends IdentifiedObject {
  @ManyToOne(() => Assessment)
  assessment!: Assessment;
}
