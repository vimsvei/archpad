import { FunctionGeneric } from '@/model/entities/archimate/core/function.generic';
import { Entity } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';
import { ArchimateCode } from '@/model/decorators/archimate-code.decorator';

@Entity({ discriminatorValue: LayerKind.APPLICATION})
export class ApplicationFunction extends FunctionGeneric {}
