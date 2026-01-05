import { HasuraTable } from '@archpad/models';
import { Entity, Enum } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';
import { ArchimateCode } from '@archpad/models';
import { ArchimateElementGeneric } from '@/model/archimate/core/archimate-element.generic';

@HasuraTable()
@Entity({
  tableName: 'flows',
  abstract: true,
  discriminatorColumn: 'layer',
})
export abstract class FlowGeneric extends ArchimateElementGeneric {
  @Enum({ items: () => LayerKind, nativeEnumName: 'layer_kind_enum' })
  layer!: LayerKind;

  @ArchimateCode('FLOW')
  override code: string = undefined as any;
}
