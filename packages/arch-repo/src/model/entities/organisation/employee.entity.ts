import { IdentifiedObject } from '@/model/abstract/identified-object.abstract';
import { Entity, Property, Unique } from '@mikro-orm/core';

@Entity({
  tableName: 'employees',
})
@Unique({ properties: ['userID'] })
export class Employee extends IdentifiedObject {
  @Property({ name: 'first_name', type: 'string' })
  firstName: string;

  @Property({ name: 'last_name', type: 'string' })
  lastName: string;

  @Property({ name: 'user_id', type: 'uuid'})
  userID: string;
  
}
