import { Embeddable, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { HasuraEmbeddable } from '../decorators/hasura-embeddable.decorator';

@HasuraEmbeddable()
@Embeddable()
export class ActionStamp {
  @ApiProperty({ format: 'date-time' })
  @Property({ type: Date, onCreate: () => new Date() })
  at!: Date;

  @ApiProperty({ format: 'uuid' })
  @Property({ type: 'uuid', nullable: true })
  by: string | null = null;

  protected constructor(by?: string | null) {
    const v = typeof by === 'string' ? by.trim() : '';
    this.by = v.length ? v : null;
  }

  static now(by?: string | null) {
    return new ActionStamp(by);
  }
}
