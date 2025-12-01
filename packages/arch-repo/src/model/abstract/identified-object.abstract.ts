import { BaseObject } from './base-object.abstract';
import { Entity, PrimaryKey } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ abstract: true })
export abstract class IdentifiedObject extends BaseObject {
  @ApiProperty({
    description: 'identified object',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryKey({ type: 'uuid' })
  id: string = crypto.randomUUID();
}
