import {
  ArchimateCode,
  HasuraReference,
  HasuraTable,
} from '@archpad/models';
import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
} from '@mikro-orm/core';
import { TechnologyNode } from './technology-node.entity';
import { NetworkAbstractionLevel } from '@/model/enums/network-abstraction-level.enum.';
import { ArchimateElementGeneric } from '@/model/archimate/core/archimate-element.generic';
import { ApplicationComponentTechnologyLogicalNetworkMap } from '@/model/maps/application-component-technology-logical-network.map';

@HasuraTable()
@Entity({
  abstract: true,
  tableName: 'technology_networks',
  discriminatorColumn: 'level',
})
export class TechnologyNetwork extends ArchimateElementGeneric {
  @Enum({
    items: () => NetworkAbstractionLevel,
    nativeEnumName: 'network_abstraction_level_enum',
  })
  level!: NetworkAbstractionLevel;

  @ArchimateCode('NET')
  override code: string = undefined as any;

  @HasuraReference({ objectName: 'network', collectionName: 'nodes' })
  @OneToMany({
    entity: () => TechnologyNode,
    mappedBy: 'network',
  })
  nodes = new Collection<TechnologyNode>(this);
}

@Entity({ discriminatorValue: NetworkAbstractionLevel.LOGICAL })
export class TechnologyLogicalNetwork extends TechnologyNetwork {
  @HasuraReference({ objectName: 'logicalNetwork', collectionName: 'components' })
  @OneToMany({
    entity: () => ApplicationComponentTechnologyLogicalNetworkMap,
    mappedBy: 'logicalNetwork',
  })
  components = new Collection<ApplicationComponentTechnologyLogicalNetworkMap>(
    this,
  );
}
