import { ActionStamp } from '../embeddable/action-stamp.embeddable';
import { BeforeCreate, BeforeUpdate, Embedded, Entity } from '@mikro-orm/core';

@Entity({ abstract: true })
export abstract class BaseObject {
  @Embedded(() => ActionStamp, { prefix: 'created_', prefixMode: 'absolute' })
  created: ActionStamp;

  @Embedded(() => ActionStamp, { prefix: 'updated_', prefixMode: 'absolute' })
  updated: ActionStamp;

  @BeforeCreate()
  protected setCreatedStamp(by: string) {
    this.created = ActionStamp.now(by);
  }

  @BeforeUpdate()
  protected setUpdatedStamp(by: string) {
    this.updated = ActionStamp.now(by);
  }
}
