import { PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { randomUUID } from 'node:crypto';

export abstract class BaseObject {
  @PrimaryKey({ type: 'uuid' })
  id: string = randomUUID();
  
  @Property({ type: 'text' })
  @Unique()
  code!: string;
  
  @Property({ type: 'text' })
  @Unique()
  name!: string;
  
  
}
