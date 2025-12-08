import { FunctionGeneric } from '@/model/archimate/core/function.generic';
import { Entity } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';

@Entity({ discriminatorValue: LayerKind.BUSINESS })
export class BusinessFunction extends FunctionGeneric {}
