import { Entity } from '@mikro-orm/core';
import { IdentifiedObject } from '@/model/abstract/identified-object.abstract';

@Entity({ abstract: true })
export abstract class MappedObject extends IdentifiedObject {}
