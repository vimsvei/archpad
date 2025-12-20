import { ActionStamp } from '../embeddable/action-stamp.embeddable';
import { BeforeCreate, Embedded, Entity } from '@mikro-orm/core';

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
    // Never accept arguments here: MikroORM passes lifecycle EventArgs to hook params,
    // which can accidentally end up persisted (and even be circular).
    // Actor (user id) should be set by an app-level subscriber (e.g. AuditSubscriber).
    if (!this.created) {
      this.created = ActionStamp.now(null);
    }
    // Some environments may not apply onCreate hooks on embeddable properties reliably
    // (e.g. missing reflection metadata). Ensure created.at is always present.
    if (!this.created.at) {
      this.created.at = new Date();
    }
  }
}
