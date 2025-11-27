import { Entity, Property } from '@mikro-orm/core';
import { DirectoryObject } from '../../abstract/directory-object.abstract';

@Entity({ tableName: 'architecture_style' })
export class ArchitectureStyleDirectory extends DirectoryObject {}
