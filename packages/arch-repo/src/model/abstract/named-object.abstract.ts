import { Property, Unique } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

export abstract class NamedObject {
  @ApiProperty({ description: 'System name', required: true })
  @Property({ type: 'text' })
  @Unique()
  code!: string;

  @ApiProperty({ description: 'Item name', required: true })
  @Property({ type: 'text' })
  name!: string;

  @ApiProperty({ description: 'Description', required: false })
  @Property({ nullable: true })
  description?: string;
}
