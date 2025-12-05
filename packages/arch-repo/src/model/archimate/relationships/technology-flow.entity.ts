import { FlowGeneric } from '@/model/archimate/core/flow.generic';
import { Entity } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';

@Entity({ discriminatorValue: LayerKind.TECHNOLOGY })
export class TechnologyFlow extends FlowGeneric {}
