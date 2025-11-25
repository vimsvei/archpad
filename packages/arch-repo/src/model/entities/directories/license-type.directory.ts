import { Entity } from '@mikro-orm/core';
import { DirectoryObject } from '../../abstract/directory-object.abstract';

@Entity({ tableName: 'license_types' })
export class LicenseTypeDirectory extends DirectoryObject {}
