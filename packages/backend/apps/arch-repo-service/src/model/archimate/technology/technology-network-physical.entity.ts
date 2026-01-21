import { Entity, Enum, ManyToOne } from '@mikro-orm/core';
import { PhysicalLocation } from '@/model/archimate/physical/physical-location.entity';
import { Environment } from '@/model/enums/environment.enum';
import { NetworkScope } from '@/model/enums/network-scope.enum';
import { NetworkAbstractionLevel } from '@/model/enums/network-abstraction-level.enum.';
import { TechnologyNetwork } from '@/model/archimate/technology/technology-network.entity';

@Entity({ discriminatorValue: NetworkAbstractionLevel.PHYSICAL })
export class TechnologyPhysicalNetwork extends TechnologyNetwork {
  @Enum({
    items: () => NetworkScope,
    nativeEnumName: 'network_scope_enum',
    default: NetworkScope.ON_PREM,
  })
  scope!: NetworkScope;

  @Enum({
    items: () => Environment,
    nativeEnumName: 'environment_enum',
    default: Environment.DEV,
  })
  environment!: Environment;

  @ManyToOne({
    entity: () => PhysicalLocation,
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  location!: PhysicalLocation;
}
