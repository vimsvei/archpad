import { Entity } from '@mikro-orm/core';
import { DirectoryObject } from '../../abstract/directory-object.abstract';

@Entity({ tableName: 'software_types' })
export class SoftwareTypeDirectory extends DirectoryObject {}
