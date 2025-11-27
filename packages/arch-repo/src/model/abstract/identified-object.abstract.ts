import { BaseObject } from './base-object.abstract';
import { Entity, PrimaryKey } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ abstract: true })
export abstract class IdentifiedObject extends BaseObject {
  @ApiProperty({ description: 'identified object' })
  @PrimaryKey({ type: 'uuid' })
  id: string = crypto.randomUUID();
}
