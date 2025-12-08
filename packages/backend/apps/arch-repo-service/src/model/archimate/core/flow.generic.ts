import { NamedObject } from '@/model/abstract/named-object.abstract';
import { Entity, Enum } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';
import { ArchimateCode } from '@/model/decorators/archimate-code.decorator';

@Entity({
  tableName: 'flows',
  abstract: true,
  discriminatorColumn: 'layer',
})
export abstract class FlowGeneric extends NamedObject {
  @Enum({ items: () => LayerKind, nativeEnumName: 'layer_kind_enum' })
  layer!: LayerKind;

  @ArchimateCode('FLOW')
  override code: string = undefined as any;
}
