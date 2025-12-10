import { Entity } from '@mikro-orm/core';
import { BaseObject } from './base-object.abstract';

@Entity({ abstract: true })
export abstract class MappedObject extends BaseObject {}
