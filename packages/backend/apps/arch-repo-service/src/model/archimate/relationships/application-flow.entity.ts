import { FlowGeneric } from '@/model/archimate/core/flow.generic';
import { Entity, ManyToOne } from '@mikro-orm/core';
import { LayerKind } from '@/model/enums/layer-kind.enum';
import { ApplicationComponent } from '@/model/archimate/application/application-component.entity';
import { ApplicationComponentFunctionMap } from '@/model/maps/application-component-function.map';
import { HasuraRefName } from '@archpad/models';
import {ApplicationComponentDataObjectMap} from "@/model/maps/application-component-data-object.map";

@Entity({ discriminatorValue: LayerKind.APPLICATION })
export class ApplicationFlow extends FlowGeneric {
  @HasuraRefName()
  @ManyToOne({
    entity: () => ApplicationComponent,
    nullable: false,
    fieldName: 'source_component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  sourceComponent!: ApplicationComponent;

  @HasuraRefName()
  @ManyToOne({
    entity: () => ApplicationComponentFunctionMap,
    nullable: true,
    joinColumns: ['source_component_id', 'source_function_id'],
    referencedColumnNames: ['component_id', 'function_id'],
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  sourceFunction!: ApplicationComponentFunctionMap;

  @HasuraRefName()
  @ManyToOne({
    entity: () => ApplicationComponent,
    nullable: false,
    fieldName: 'target_component_id',
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  targetComponent!: ApplicationComponent;

  @HasuraRefName()
  @ManyToOne({
    entity: () => ApplicationComponentFunctionMap,
    nullable: true,
    joinColumns: ['target_component_id', 'target_function_id'],
    referencedColumnNames: ['component_id', 'function_id'],
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  targetFunction!: ApplicationComponentFunctionMap;
  
  @HasuraRefName()
  @ManyToOne({
    entity: () => ApplicationComponentDataObjectMap,
    nullable: true,
    joinColumns: ['source_component_id', 'request_data_object_id'],
    referencedColumnNames: ['component_id', 'data_object_id'],
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  requestDataObject!: ApplicationComponentDataObjectMap;
  
  @HasuraRefName()
  @ManyToOne({
    entity: () => ApplicationComponentDataObjectMap,
    nullable: true,
    joinColumns: ['source_component_id', 'response_data_object_id'],
    referencedColumnNames: ['component_id', 'data_object_id'],
    updateRule: 'cascade',
    deleteRule: 'no action',
  })
  responseDataObject!: ApplicationComponentDataObjectMap
}
