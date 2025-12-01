import { InterfaceGeneric } from '@/model/entities/archimate/core/interface.generic';
import { Entity } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';

@Entity({ discriminatorValue: LayerKind.APPLICATION })
export class ApplicationInterface extends InterfaceGeneric {}
