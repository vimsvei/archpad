import { ArchimateElementGeneric } from '@/model/archimate/core/archimate-element.generic';
import { Entity } from '@mikro-orm/core';

@Entity({ tableName: 'stakeholders' })
export class Stakeholder extends ArchimateElementGeneric {}
