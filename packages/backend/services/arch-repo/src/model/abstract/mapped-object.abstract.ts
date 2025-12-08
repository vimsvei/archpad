import { Entity } from '@mikro-orm/core';
import { BaseObject } from '@/model/abstract/base-object.abstract';

@Entity({ abstract: true })
export abstract class MappedObject extends BaseObject {}
