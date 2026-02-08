import { Function } from '@/model/archimate/common/function.entity';
import { Entity } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';

@Entity({ discriminatorValue: LayerKind.BUSINESS })
export class BusinessFunction extends Function {}
