import { Embeddable, Property } from '@mikro-orm/core';

@Embeddable()
export class ActionStamp {
  @Property({ onCreate: () => new Date() })
  at: Date;

  @Property({ nullable: true })
  by: string;

  protected constructor(by: string) {
    this.by = by;
  }

  static now(by: string) {
    return new ActionStamp(by);
  }
}
