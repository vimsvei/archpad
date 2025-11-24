import { NamedObject } from '../abstract/named-object.abstract';
import { Entity } from '@mikro-orm/core';

@Entity({ tableName: 'software_types' })
export class SoftwareTypeDirectory extends NamedObject {}
