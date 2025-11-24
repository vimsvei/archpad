import { NamedObject } from '../abstract/named-object.abstract';
import { Entity } from '@mikro-orm/core';

@Entity({ tableName: 'license_types' })
export class LicenseTypeDirectory extends NamedObject {}
