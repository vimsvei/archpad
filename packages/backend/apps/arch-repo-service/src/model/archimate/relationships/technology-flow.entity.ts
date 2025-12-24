import { FlowGeneric } from '@/model/archimate/core/flow.generic';
import { Entity, Enum } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';
import { Environment } from '@/model/enums/environment.enum';

@Entity({ discriminatorValue: LayerKind.TECHNOLOGY })
export class TechnologyFlow extends FlowGeneric {
  @Enum({
    items: () => Environment,
    nativeEnumName: 'environment_enum',
    default: Environment.DEV,
  })
  environment!: Environment;
}
