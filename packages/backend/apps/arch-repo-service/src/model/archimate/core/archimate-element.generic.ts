import { Entity, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { NamedObject } from '@archpad/models';

@Entity({ abstract: true })
export abstract class ArchimateElementGeneric extends NamedObject {
  @ApiProperty({
    description: 'tenant object',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Property({
    type: 'uuid',
    name: 'tenant_id',
    nullable: false,
  })
  tenantId!: string;
}
