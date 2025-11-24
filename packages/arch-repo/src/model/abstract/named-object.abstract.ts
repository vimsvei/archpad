import { Property, Unique } from '@mikro-orm/core';

export abstract class NamedObject {
  
  @Property({ type: 'text' })
  @Unique()
  code!: string;
  
  @Property({ type: 'text' })
  name!: string;
  
  @Property({ nullable: true })
  description?: string;
}
