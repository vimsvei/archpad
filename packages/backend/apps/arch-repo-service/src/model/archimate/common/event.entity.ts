import { ArchimateElementGeneric } from '@/model/archimate/core/archimate-element.generic';
import { Entity, Enum } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';
import { ArchimateCode, HasuraTable } from '@archpad/models';

@HasuraTable()
@Entity({
  tableName: 'events',
  abstract: true,
  discriminatorColumn: 'layer',
})
export abstract class Event extends ArchimateElementGeneric {
  @Enum({ items: () => LayerKind, nativeEnumName: 'layer_kind_enum' })
  layer!: LayerKind;

  @ArchimateCode('EVENT')
  override code: string = undefined as any;
}
