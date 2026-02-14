import {HasuraReference, HasuraTable, MappedObject} from "@archpad/models";
import {Entity, ManyToOne, Property} from "@mikro-orm/core";
import {TechnologyFlow} from "@/model/archimate/relationships/technology-flow.entity";
import {TechnologyNode} from "@/model/archimate/technology/technology-node.entity";

@HasuraTable()
@Entity({ tableName: 'map_technology_flow_proxy_nodes' })
export class TechnologyFlowProxyNodesMap extends MappedObject {
  
  @HasuraReference({ objectName: 'flow', collectionName: 'technologyFlowProxies' })
  @ManyToOne({
    entity: () => TechnologyFlow,
    primary: true,
    fieldName: 'flow_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  flow!: TechnologyFlow;
  
  @HasuraReference({ objectName: 'node', collectionName: 'technologyFlowProxies' })
  @ManyToOne({
    entity: () => TechnologyNode,
    primary: true,
    fieldName: 'node_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  node!: TechnologyNode;
  
  @Property({ columnType: 'int4', default: 0 })
  order: number = 0;
}
