import { ArchimateElementGeneric } from '@/model/archimate/core/archimate-element.generic';
import { Entity, Enum } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';
import { ArchimateCode } from '@/model/decorators/archimate-code.decorator';

@Entity({
  tableName: 'functions',
  abstract: true,
  discriminatorColumn: 'layer',
})
export abstract class FunctionGeneric extends ArchimateElementGeneric {
  @Enum({ items: () => LayerKind, nativeEnumName: 'layer_kind_enum' })
  layer!: LayerKind;

  @ArchimateCode('FUNC')
  override code: string = undefined as any;
}
