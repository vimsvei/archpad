import { InterfaceGeneric } from '@/model/archimate/core/interface.generic';
import { Entity } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';

@Entity({ discriminatorValue: LayerKind.TECHNOLOGY })
export class TechnologyInterface extends InterfaceGeneric {}
