import { Embeddable, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

@Embeddable()
export class ActionStamp {
  @ApiProperty({ format: 'date-time' })
  @Property({ onCreate: () => new Date() })
  at: Date;

  @ApiProperty({ format: 'uuid' })
  @Property({ type: 'uuid', nullable: true })
  by: string;

  protected constructor(by: string) {
    this.by = by;
  }

  static now(by: string) {
    return new ActionStamp(by);
  }
}
