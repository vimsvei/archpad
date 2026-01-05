import { ProcessGeneric } from '@/model/archimate/core/process.generic';
import { Entity } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';

@Entity({ discriminatorValue: LayerKind.BUSINESS })
export class BusinessProcess extends ProcessGeneric {}
