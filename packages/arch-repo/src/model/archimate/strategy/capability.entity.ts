import { ArchimateElementGeneric } from '@/model/archimate/core/archimate-element.generic';
import { Entity } from '@mikro-orm/core';
import { ArchimateCode } from '@/model/decorators/archimate-code.decorator';

@Entity({ tableName: 'capabilities' })
export class Capability extends ArchimateElementGeneric {
  @ArchimateCode('CPB')
  override code: string = undefined as any;
}
