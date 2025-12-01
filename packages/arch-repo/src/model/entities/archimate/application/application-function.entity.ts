import { FunctionGeneric } from '@/model/entities/archimate/core/function.generic';
import { Entity } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';

@Entity({ discriminatorValue: LayerKind.APPLICATION })
export class ApplicationFunction extends FunctionGeneric {}
