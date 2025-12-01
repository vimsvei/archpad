import { ArchimateElementGeneric } from '@/model/entities/archimate/core/archimate-element.generic';
import { Entity } from '@mikro-orm/core';

@Entity({ tableName: 'business_roles' })
export class BusinessRole extends ArchimateElementGeneric {}
