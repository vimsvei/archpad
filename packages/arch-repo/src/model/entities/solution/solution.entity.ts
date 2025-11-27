import { ArchimateElementGeneric } from '@/model/entities/archimate/core/archimate-element.generic';
import { Entity } from '@mikro-orm/core';

@Entity({ tableName: 'solution' })
export class Solution extends ArchimateElementGeneric {}
