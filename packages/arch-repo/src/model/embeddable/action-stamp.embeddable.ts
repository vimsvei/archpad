import { Embeddable, Property } from '@mikro-orm/core';

@Embeddable()
export class ActionStamp {
  @Property({ onCreate: () => new Date() })
  at: Date;

  @Property({ type: 'uuid', nullable: true })
  by: string;

  protected constructor(by: string) {
    this.by = by;
  }

  static now(by: string) {
    return new ActionStamp(by);
  }
}
