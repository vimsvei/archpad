import { Entity, Property } from '@mikro-orm/core';
import { BaseObject } from './base-object.abstract';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ abstract: true })
export abstract class MappedObject extends BaseObject {
  @ApiProperty({
    description: 'tenant object',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Property({
    type: 'uuid',
    name: 'tenant_id',
    nullable: false,
    default: '102153b6-28d4-40c2-ac27-11e419b639e0'
  })
  tenantId!: string;
}
