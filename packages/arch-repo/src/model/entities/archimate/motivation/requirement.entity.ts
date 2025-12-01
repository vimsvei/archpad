import { Entity } from '@mikro-orm/core';
import { MotivationElementGeneric } from '@/model/entities/archimate/core/motivation-element.generic';

@Entity({ tableName: 'requirements' })
export class Requirement extends MotivationElementGeneric {}
