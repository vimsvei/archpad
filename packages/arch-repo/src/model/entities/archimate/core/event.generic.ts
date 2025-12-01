import { ArchimateElementGeneric } from '@/model/entities/archimate/core/archimate-element.generic';
import { Entity, Enum } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';
import { ArchimateCode } from '@/model/decorators/archimate-code.decorator';

@Entity({
  tableName: 'events',
  abstract: true,
  discriminatorColumn: 'layer',
})
export abstract class InterfaceGeneric extends ArchimateElementGeneric {
  @Enum(() => LayerKind)
  layer: LayerKind;
  
  @ArchimateCode('EVENT')
  override code: string = undefined as any;
}
