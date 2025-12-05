import { Entity } from '@mikro-orm/core';
import { MotivationElementGeneric } from '@/model/archimate/core/motivation-element.generic';
import { MotivationKind } from '@/model/enums/motivation-kind.enum';

@Entity({ discriminatorValue: MotivationKind.PRINCIPLE })
export class Principle extends MotivationElementGeneric {}
