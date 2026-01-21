import { ArchimateElementGeneric } from '@/model/archimate/core/archimate-element.generic';
import { Entity, ManyToOne } from '@mikro-orm/core';
import { ArchimateCode, HasuraTable } from '@archpad/models';
import { ApiProperty } from '@nestjs/swagger';

@HasuraTable()
@Entity({ tableName: 'capabilities' })
export class Capability extends ArchimateElementGeneric {
  @ArchimateCode('CPB')
  override code: string = undefined as any;

  @ApiProperty({
    format: 'uuid',
    type: 'string',
    description: 'Родительский объект',
  })
  @ManyToOne({
    entity: () => Capability,
    fieldName: 'parent_id',
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  parent?: Capability;
}
