import { IdentifiedObject } from '@archpad/models';
import { State } from '@/model/state-schema/state.entity';
import { Entity } from '@mikro-orm/core';

@Entity({ tableName: 'transitions' })
export class Transition extends IdentifiedObject {
  from!: State;

  to!: State;
}
