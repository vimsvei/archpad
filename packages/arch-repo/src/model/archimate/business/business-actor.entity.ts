import { NamedObject } from '../../abstract/named-object.abstract';
import { Entity } from '@mikro-orm/core';

@Entity({ tableName: 'business-actors' })
export class BusinessActor extends NamedObject {}
