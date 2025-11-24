import { NamedObject } from '../abstract/named-object.abstract';
import { Entity } from '@mikro-orm/core';

@Entity({ tableName: 'critical_levels' })
export class CriticalLevelDirectory extends NamedObject {}
