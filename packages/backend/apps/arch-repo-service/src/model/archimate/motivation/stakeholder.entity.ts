import { ArchimateElementGeneric } from '@/model/archimate/core/archimate-element.generic';
import { Entity } from '@mikro-orm/core';
import { HasuraTable } from '@archpad/models';

@HasuraTable()
@Entity({ tableName: 'stakeholders' })
export class Stakeholder extends ArchimateElementGeneric {}
