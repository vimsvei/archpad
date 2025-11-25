import { Entity } from '@mikro-orm/core';
import { DirectoryObject } from '../../abstract/directory-object.abstract';

@Entity({ tableName: 'critical_levels' })
export class CriticalLevelDirectory extends DirectoryObject {}
