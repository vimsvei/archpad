import { Entity, Property, Unique } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { IdentifiedObject } from './identified-object.abstract';

@Entity({ abstract: true })
export abstract class NamedObject extends IdentifiedObject {
  @ApiProperty({ description: 'System name', required: true })
  @Property({ type: 'string' })
  @Unique()
  code!: string;

  @ApiProperty({ description: 'Item name', required: true })
  @Property({ type: 'string' })
  name!: string;

  @ApiProperty({ description: 'Description' })
  @Property({ type: 'text', nullable: true })
  description?: string;
}
