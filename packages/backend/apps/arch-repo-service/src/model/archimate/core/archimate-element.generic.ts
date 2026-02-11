import { Entity, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { NamedObject } from '@archpad/models';

@Entity({ abstract: true })
export abstract class ArchimateElementGeneric extends NamedObject {
  @ApiProperty({
    description: 'tenant object',
    format: 'uuid',
    example: '102153b6-28d4-40c2-ac27-11e419b639e0',
  })
  @Property({
    type: 'uuid',
    name: 'tenant_id',
    // No default: tenant must come from request context (x-archpad-tenant-ids).
    // Legacy default was 102153b6-... which caused components to not appear in filtered lists.
  })
  tenantId!: string;
}
