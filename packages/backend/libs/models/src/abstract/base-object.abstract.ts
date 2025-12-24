import { ActionStamp } from '../embeddable/action-stamp.embeddable';
import { BeforeCreate, BeforeUpdate, Embedded, Entity } from '@mikro-orm/core';

@Entity({ abstract: true })
export abstract class BaseObject {
  @Embedded(() => ActionStamp, { prefix: 'created_', prefixMode: 'absolute' })
  created!: ActionStamp;

  @Embedded(() => ActionStamp, {
    prefix: 'updated_',
    prefixMode: 'absolute',
    nullable: true,
  })
  updated?: ActionStamp;

  @Embedded(() => ActionStamp, {
    prefix: 'deleted_',
    prefixMode: 'absolute',
    nullable: true,
  })
  deleted?: ActionStamp;

  @BeforeCreate()
  protected ensureCreatedStamp() {
    if (!this.created) {
      this.created = ActionStamp.now(null);
    }
    if (!this.created.at) {
      this.created.at = new Date();
    }
  }

  @BeforeUpdate()
  protected ensureUpdatedStamp() {
    if (!this.updated) {
      this.updated = ActionStamp.now(null);
    }
    if (!this.updated.at) {
      this.updated.at = new Date();
    }
  }
}
