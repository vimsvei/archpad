import { Collection, Entity, Enum, OneToMany, Property } from '@mikro-orm/core';
import { AssessmentType } from '@/model/enums/assessment-type.enum';
import { AssessmentLink } from '@/model/entities/links/assessment-link.entity';
import { MotivationObject } from '@/model/abstract/motivation-object.abstract';

@Entity({
  tableName: 'assessments',
  abstract: true,
  discriminatorColumn: 'type',
})
export abstract class Assessment extends MotivationObject {
  @Enum(() => AssessmentType)
  type: AssessmentType;

  @OneToMany(() => AssessmentLink, (link) => link.assessment)
  objects = new Collection<AssessmentLink>(this);
}
