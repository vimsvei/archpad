import { Process } from '@/model/archimate/common/process.entity';
import { Entity } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';

@Entity({ discriminatorValue: LayerKind.BUSINESS })
export class BusinessProcess extends Process {}
