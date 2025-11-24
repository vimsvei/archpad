import { BaseObject } from './base-object.abstract';
import { PrimaryKey } from '@mikro-orm/core';

export abstract class IdentifiedObject extends BaseObject{
  @PrimaryKey({ type: 'uuid'})
  id: string = crypto.randomUUID();
}
