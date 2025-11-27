import { ArchimateElementGeneric } from '@/model/entities/archimate/core/archimate-element.generic';
import { Entity, Enum } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';

@Entity({
  tableName: 'functions',
  abstract: true,
  discriminatorColumn: 'layer'
})
export abstract class FunctionGeneric extends ArchimateElementGeneric {
  @Enum(() => LayerKind)
  layer: LayerKind;
}
