import { ArchimateElementGeneric } from '@/model/archimate/core/archimate-element.generic';
import { Entity, Enum } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';
import { ArchimateCode, HasuraTable } from '@archpad/models';

@HasuraTable()
@Entity({
  tableName: 'interfaces',
  abstract: true,
  discriminatorColumn: 'layer',
})
export abstract class InterfaceGeneric extends ArchimateElementGeneric {
  @Enum({ items: () => LayerKind, nativeEnumName: 'layer_kind_enum' })
  layer!: LayerKind;

  @ArchimateCode('INT')
  override code: string = undefined as any;
}
