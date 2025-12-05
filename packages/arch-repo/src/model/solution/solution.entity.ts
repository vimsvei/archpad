import { ArchimateElementGeneric } from '@/model/archimate/core/archimate-element.generic';
import { Entity } from '@mikro-orm/core';

@Entity({ tableName: 'solutions' })
export class Solution extends ArchimateElementGeneric {}
