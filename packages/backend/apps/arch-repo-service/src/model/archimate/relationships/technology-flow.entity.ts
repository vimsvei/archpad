import { FlowGeneric } from '@/model/archimate/core/flow.generic';
import { Entity, Enum, ManyToOne } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';
import { Environment } from '@/model/enums/environment.enum';
import { TechnologyNode } from '@/model/archimate/technology/technology-node.entity';
import { HasuraRefName } from '@archpad/models';
import { TechnologyInterface } from '@/model/archimate/technology/technology-interface.entity';

@Entity({ discriminatorValue: LayerKind.TECHNOLOGY })
export class TechnologyFlow extends FlowGeneric {
  @Enum({
    items: () => Environment,
    nativeEnumName: 'environment_enum',
    default: Environment.DEV,
  })
  environment!: Environment;

  @HasuraRefName()
  @ManyToOne({
    entity: () => TechnologyNode,
    nullable: false,
    fieldName: 'source_node_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  sourceNode!: TechnologyNode;

  @HasuraRefName()
  @ManyToOne({
    entity: () => TechnologyInterface,
    nullable: false,
    fieldName: 'source_port_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  sourcePort!: TechnologyInterface;

  @HasuraRefName()
  @ManyToOne({
    entity: () => TechnologyNode,
    nullable: false,
    fieldName: 'target_node_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  targetNode!: TechnologyNode;

  @HasuraRefName()
  @ManyToOne({
    entity: () => TechnologyInterface,
    nullable: false,
    fieldName: 'target_port_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  targetPort!: TechnologyInterface;
}
