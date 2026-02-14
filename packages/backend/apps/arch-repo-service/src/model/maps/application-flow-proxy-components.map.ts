import {HasuraReference, HasuraTable, MappedObject} from "@archpad/models";
import {Entity, ManyToOne, Property} from "@mikro-orm/core";
import {ApplicationFlow} from "@/model/archimate/relationships/application-flow.entity";
import {ApplicationComponent} from "@/model/archimate/application/application-component.entity";

@HasuraTable()
@Entity({ tableName: 'map_application_flow_proxy_components' })
export class ApplicationFlowProxyComponentsMap extends MappedObject {
  
  @HasuraReference({ objectName: 'flow', collectionName: 'flowProxies' })
  @ManyToOne({
    entity: () => ApplicationFlow,
    primary: true,
    fieldName: 'flow_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  flow!: ApplicationFlow;
  
  @HasuraReference({ objectName: 'component', collectionName: 'flowProxies' })
  @ManyToOne({
    entity: () => ApplicationComponent,
    primary: true,
    fieldName: 'component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  component!: ApplicationComponent;
  
  @Property({ columnType: 'int4', default: 0 })
  order: number = 0;
}
