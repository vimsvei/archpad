export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  assessment_type_enum: { input: any; output: any; }
  data_access_kind_enum: { input: any; output: any; }
  directory_kind_enum: { input: any; output: any; }
  directory_link_type_enum: { input: any; output: any; }
  environment_enum: { input: any; output: any; }
  layer_kind_enum: { input: any; output: any; }
  motivation_kind_enum: { input: any; output: any; }
  motivation_priority_enum: { input: any; output: any; }
  motivation_status_enum: { input: any; output: any; }
  network_abstraction_level_enum: { input: any; output: any; }
  network_scope_enum: { input: any; output: any; }
  node_kind_enum: { input: any; output: any; }
  risk_category_enum: { input: any; output: any; }
  risk_status_enum: { input: any; output: any; }
  smallint: { input: any; output: any; }
  solution_item_state: { input: any; output: any; }
  system_architecture_kind_enum: { input: any; output: any; }
  system_software_kind_enum: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
  uuid: { input: any; output: any; }
};

/** columns and relationships of "components" */
export type ApplicationComponent = {
  __typename?: 'ApplicationComponent';
  /** An array relationship */
  child: Array<ApplicationComponentHierarchyMap>;
  /** An aggregate relationship */
  child_aggregate: ApplicationComponentHierarchyMap_Aggregate;
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  criticalLevel?: Maybe<DirectoryObject>;
  criticalLevelId?: Maybe<Scalars['uuid']['output']>;
  /** An array relationship */
  dataObjects: Array<ApplicationComponentDataObjectMap>;
  /** An array relationship */
  dataObjectsInFunctions: Array<ApplicationFunctionDataObjectMap>;
  /** An aggregate relationship */
  dataObjectsInFunctions_aggregate: ApplicationFunctionDataObjectMap_Aggregate;
  /** An aggregate relationship */
  dataObjects_aggregate: ApplicationComponentDataObjectMap_Aggregate;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  events: Array<ApplicationComponentEventMap>;
  /** An aggregate relationship */
  events_aggregate: ApplicationComponentEventMap_Aggregate;
  /** An object relationship */
  failoverType?: Maybe<DirectoryObject>;
  failoverTypeId?: Maybe<Scalars['uuid']['output']>;
  /** An array relationship */
  functions: Array<ApplicationComponentFunctionMap>;
  /** An aggregate relationship */
  functions_aggregate: ApplicationComponentFunctionMap_Aggregate;
  id: Scalars['uuid']['output'];
  /** An array relationship */
  interfaces: Array<ApplicationComponentInterfaceMap>;
  /** An aggregate relationship */
  interfaces_aggregate: ApplicationComponentInterfaceMap_Aggregate;
  /** An object relationship */
  licenseType?: Maybe<DirectoryObject>;
  licenseTypeId?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  monitoringLevel?: Maybe<DirectoryObject>;
  monitoringLevelId?: Maybe<Scalars['uuid']['output']>;
  name: Scalars['String']['output'];
  /** An array relationship */
  networks: Array<ApplicationComponentTechnologyLogicalNetworkMap>;
  /** An aggregate relationship */
  networks_aggregate: ApplicationComponentTechnologyLogicalNetworkMap_Aggregate;
  /** An array relationship */
  nodes: Array<ApplicationComponentTechnologyNodeMap>;
  /** An aggregate relationship */
  nodes_aggregate: ApplicationComponentTechnologyNodeMap_Aggregate;
  /** An array relationship */
  parent: Array<ApplicationComponentHierarchyMap>;
  /** An aggregate relationship */
  parent_aggregate: ApplicationComponentHierarchyMap_Aggregate;
  /** An array relationship */
  products: Array<ApplicationComponentProductMap>;
  /** An aggregate relationship */
  products_aggregate: ApplicationComponentProductMap_Aggregate;
  /** An object relationship */
  recoveryTime?: Maybe<DirectoryObject>;
  recoveryTimeId?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  redundancyType?: Maybe<DirectoryObject>;
  redundancyTypeId?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  scalingType?: Maybe<DirectoryObject>;
  scalingTypeId?: Maybe<Scalars['uuid']['output']>;
  /** An array relationship */
  solutions: Array<SolutionApplicationComponentMap>;
  /** An aggregate relationship */
  solutions_aggregate: SolutionApplicationComponentMap_Aggregate;
  /** An array relationship */
  sourceComponent: Array<FlowGeneric>;
  /** An aggregate relationship */
  sourceComponent_aggregate: FlowGeneric_Aggregate;
  /** An array relationship */
  stakeholders: Array<ApplicationComponentStakeholderMap>;
  /** An aggregate relationship */
  stakeholders_aggregate: ApplicationComponentStakeholderMap_Aggregate;
  /** An object relationship */
  state?: Maybe<DirectoryObject>;
  stateId?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  style?: Maybe<DirectoryObject>;
  styleId?: Maybe<Scalars['uuid']['output']>;
  /** An array relationship */
  systemSoftware: Array<ApplicationComponentSystemSoftwareMap>;
  /** An aggregate relationship */
  systemSoftware_aggregate: ApplicationComponentSystemSoftwareMap_Aggregate;
  /** An array relationship */
  targetComponent: Array<FlowGeneric>;
  /** An aggregate relationship */
  targetComponent_aggregate: FlowGeneric_Aggregate;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "components" */
export type ApplicationComponentChildArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentHierarchyMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentChild_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentHierarchyMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentDataObjectsArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentDataObjectMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentDataObjectMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentDataObjectsInFunctionsArgs = {
  distinct_on?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Order_By>>;
  where?: InputMaybe<ApplicationFunctionDataObjectMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentDataObjectsInFunctions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Order_By>>;
  where?: InputMaybe<ApplicationFunctionDataObjectMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentDataObjects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentDataObjectMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentDataObjectMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentEventsArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentEventMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentEventMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentEventMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentEventMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentEventMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentEventMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentFunctionsArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentFunctionMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentFunctionMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentFunctions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentFunctionMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentFunctionMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentInterfacesArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentInterfaceMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentInterfaceMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentInterfaceMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentInterfaces_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentInterfaceMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentInterfaceMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentInterfaceMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentNetworksArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentTechnologyLogicalNetworkMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentTechnologyLogicalNetworkMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentNetworks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentTechnologyLogicalNetworkMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentTechnologyLogicalNetworkMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentNodesArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentTechnologyNodeMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentTechnologyNodeMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentTechnologyNodeMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentNodes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentTechnologyNodeMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentTechnologyNodeMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentTechnologyNodeMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentParentArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentHierarchyMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentParent_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentHierarchyMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentProductsArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentProductMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentProductMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentProductMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentProducts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentProductMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentProductMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentProductMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentSolutionsArgs = {
  distinct_on?: InputMaybe<Array<SolutionApplicationComponentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionApplicationComponentMap_Order_By>>;
  where?: InputMaybe<SolutionApplicationComponentMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentSolutions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionApplicationComponentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionApplicationComponentMap_Order_By>>;
  where?: InputMaybe<SolutionApplicationComponentMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentSourceComponentArgs = {
  distinct_on?: InputMaybe<Array<FlowGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<FlowGeneric_Order_By>>;
  where?: InputMaybe<FlowGeneric_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentSourceComponent_AggregateArgs = {
  distinct_on?: InputMaybe<Array<FlowGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<FlowGeneric_Order_By>>;
  where?: InputMaybe<FlowGeneric_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentStakeholdersArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentStakeholderMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentStakeholderMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentStakeholderMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentStakeholders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentStakeholderMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentStakeholderMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentStakeholderMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentSystemSoftwareArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentSystemSoftwareMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentSystemSoftwareMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentSystemSoftwareMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentSystemSoftware_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentSystemSoftwareMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentSystemSoftwareMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentSystemSoftwareMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentTargetComponentArgs = {
  distinct_on?: InputMaybe<Array<FlowGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<FlowGeneric_Order_By>>;
  where?: InputMaybe<FlowGeneric_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentTargetComponent_AggregateArgs = {
  distinct_on?: InputMaybe<Array<FlowGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<FlowGeneric_Order_By>>;
  where?: InputMaybe<FlowGeneric_Bool_Exp>;
};

/** columns and relationships of "map_application_component_data_object" */
export type ApplicationComponentDataObjectMap = {
  __typename?: 'ApplicationComponentDataObjectMap';
  /** An object relationship */
  component: ApplicationComponent;
  /** An array relationship */
  componentDataObject: Array<ApplicationFunctionDataObjectMap>;
  /** An aggregate relationship */
  componentDataObject_aggregate: ApplicationFunctionDataObjectMap_Aggregate;
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  dataObject: DataObject;
  dataObjectId: Scalars['uuid']['output'];
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "map_application_component_data_object" */
export type ApplicationComponentDataObjectMapComponentDataObjectArgs = {
  distinct_on?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Order_By>>;
  where?: InputMaybe<ApplicationFunctionDataObjectMap_Bool_Exp>;
};


/** columns and relationships of "map_application_component_data_object" */
export type ApplicationComponentDataObjectMapComponentDataObject_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Order_By>>;
  where?: InputMaybe<ApplicationFunctionDataObjectMap_Bool_Exp>;
};

/** aggregated selection of "map_application_component_data_object" */
export type ApplicationComponentDataObjectMap_Aggregate = {
  __typename?: 'ApplicationComponentDataObjectMap_aggregate';
  aggregate?: Maybe<ApplicationComponentDataObjectMap_Aggregate_Fields>;
  nodes: Array<ApplicationComponentDataObjectMap>;
};

export type ApplicationComponentDataObjectMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<ApplicationComponentDataObjectMap_Aggregate_Bool_Exp_Count>;
};

export type ApplicationComponentDataObjectMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<ApplicationComponentDataObjectMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ApplicationComponentDataObjectMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_application_component_data_object" */
export type ApplicationComponentDataObjectMap_Aggregate_Fields = {
  __typename?: 'ApplicationComponentDataObjectMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<ApplicationComponentDataObjectMap_Max_Fields>;
  min?: Maybe<ApplicationComponentDataObjectMap_Min_Fields>;
};


/** aggregate fields of "map_application_component_data_object" */
export type ApplicationComponentDataObjectMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ApplicationComponentDataObjectMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_application_component_data_object" */
export type ApplicationComponentDataObjectMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ApplicationComponentDataObjectMap_Max_Order_By>;
  min?: InputMaybe<ApplicationComponentDataObjectMap_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_application_component_data_object" */
export type ApplicationComponentDataObjectMap_Arr_Rel_Insert_Input = {
  data: Array<ApplicationComponentDataObjectMap_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ApplicationComponentDataObjectMap_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_application_component_data_object". All fields are combined with a logical 'AND'. */
export type ApplicationComponentDataObjectMap_Bool_Exp = {
  _and?: InputMaybe<Array<ApplicationComponentDataObjectMap_Bool_Exp>>;
  _not?: InputMaybe<ApplicationComponentDataObjectMap_Bool_Exp>;
  _or?: InputMaybe<Array<ApplicationComponentDataObjectMap_Bool_Exp>>;
  component?: InputMaybe<ApplicationComponent_Bool_Exp>;
  componentDataObject?: InputMaybe<ApplicationFunctionDataObjectMap_Bool_Exp>;
  componentDataObject_aggregate?: InputMaybe<ApplicationFunctionDataObjectMap_Aggregate_Bool_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  dataObject?: InputMaybe<DataObject_Bool_Exp>;
  dataObjectId?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_application_component_data_object" */
export enum ApplicationComponentDataObjectMap_Constraint {
  /** unique or primary key constraint on columns "data_object_id", "component_id" */
  MapApplicationComponentDataObjectPkey = 'map_application_component_data_object_pkey'
}

/** input type for inserting data into table "map_application_component_data_object" */
export type ApplicationComponentDataObjectMap_Insert_Input = {
  component?: InputMaybe<ApplicationComponent_Obj_Rel_Insert_Input>;
  componentDataObject?: InputMaybe<ApplicationFunctionDataObjectMap_Arr_Rel_Insert_Input>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  dataObject?: InputMaybe<DataObject_Obj_Rel_Insert_Input>;
  dataObjectId?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type ApplicationComponentDataObjectMap_Max_Fields = {
  __typename?: 'ApplicationComponentDataObjectMap_max_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  dataObjectId?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_application_component_data_object" */
export type ApplicationComponentDataObjectMap_Max_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  dataObjectId?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type ApplicationComponentDataObjectMap_Min_Fields = {
  __typename?: 'ApplicationComponentDataObjectMap_min_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  dataObjectId?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_application_component_data_object" */
export type ApplicationComponentDataObjectMap_Min_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  dataObjectId?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "map_application_component_data_object" */
export type ApplicationComponentDataObjectMap_Mutation_Response = {
  __typename?: 'ApplicationComponentDataObjectMap_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<ApplicationComponentDataObjectMap>;
};

/** on_conflict condition type for table "map_application_component_data_object" */
export type ApplicationComponentDataObjectMap_On_Conflict = {
  constraint: ApplicationComponentDataObjectMap_Constraint;
  update_columns?: Array<ApplicationComponentDataObjectMap_Update_Column>;
  where?: InputMaybe<ApplicationComponentDataObjectMap_Bool_Exp>;
};

/** Ordering options when selecting data from "map_application_component_data_object". */
export type ApplicationComponentDataObjectMap_Order_By = {
  component?: InputMaybe<ApplicationComponent_Order_By>;
  componentDataObject_aggregate?: InputMaybe<ApplicationFunctionDataObjectMap_Aggregate_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  dataObject?: InputMaybe<DataObject_Order_By>;
  dataObjectId?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_application_component_data_object */
export type ApplicationComponentDataObjectMap_Pk_Columns_Input = {
  componentId: Scalars['uuid']['input'];
  dataObjectId: Scalars['uuid']['input'];
};

/** select columns of table "map_application_component_data_object" */
export enum ApplicationComponentDataObjectMap_Select_Column {
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DataObjectId = 'dataObjectId',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "map_application_component_data_object" */
export type ApplicationComponentDataObjectMap_Set_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  dataObjectId?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "ApplicationComponentDataObjectMap" */
export type ApplicationComponentDataObjectMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: ApplicationComponentDataObjectMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ApplicationComponentDataObjectMap_Stream_Cursor_Value_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  dataObjectId?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "map_application_component_data_object" */
export enum ApplicationComponentDataObjectMap_Update_Column {
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DataObjectId = 'dataObjectId',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type ApplicationComponentDataObjectMap_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<ApplicationComponentDataObjectMap_Set_Input>;
  /** filter the rows which have to be updated */
  where: ApplicationComponentDataObjectMap_Bool_Exp;
};

/** columns and relationships of "map_application_component_event" */
export type ApplicationComponentEventMap = {
  __typename?: 'ApplicationComponentEventMap';
  /** An object relationship */
  component: ApplicationComponent;
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  event: EventGeneric;
  eventId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_application_component_event" */
export type ApplicationComponentEventMap_Aggregate = {
  __typename?: 'ApplicationComponentEventMap_aggregate';
  aggregate?: Maybe<ApplicationComponentEventMap_Aggregate_Fields>;
  nodes: Array<ApplicationComponentEventMap>;
};

export type ApplicationComponentEventMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<ApplicationComponentEventMap_Aggregate_Bool_Exp_Count>;
};

export type ApplicationComponentEventMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<ApplicationComponentEventMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ApplicationComponentEventMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_application_component_event" */
export type ApplicationComponentEventMap_Aggregate_Fields = {
  __typename?: 'ApplicationComponentEventMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<ApplicationComponentEventMap_Max_Fields>;
  min?: Maybe<ApplicationComponentEventMap_Min_Fields>;
};


/** aggregate fields of "map_application_component_event" */
export type ApplicationComponentEventMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ApplicationComponentEventMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_application_component_event" */
export type ApplicationComponentEventMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ApplicationComponentEventMap_Max_Order_By>;
  min?: InputMaybe<ApplicationComponentEventMap_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_application_component_event" */
export type ApplicationComponentEventMap_Arr_Rel_Insert_Input = {
  data: Array<ApplicationComponentEventMap_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ApplicationComponentEventMap_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_application_component_event". All fields are combined with a logical 'AND'. */
export type ApplicationComponentEventMap_Bool_Exp = {
  _and?: InputMaybe<Array<ApplicationComponentEventMap_Bool_Exp>>;
  _not?: InputMaybe<ApplicationComponentEventMap_Bool_Exp>;
  _or?: InputMaybe<Array<ApplicationComponentEventMap_Bool_Exp>>;
  component?: InputMaybe<ApplicationComponent_Bool_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  event?: InputMaybe<EventGeneric_Bool_Exp>;
  eventId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_application_component_event" */
export enum ApplicationComponentEventMap_Constraint {
  /** unique or primary key constraint on columns "component_id", "event_id" */
  MapApplicationComponentEventPkey = 'map_application_component_event_pkey'
}

/** input type for inserting data into table "map_application_component_event" */
export type ApplicationComponentEventMap_Insert_Input = {
  component?: InputMaybe<ApplicationComponent_Obj_Rel_Insert_Input>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  event?: InputMaybe<EventGeneric_Obj_Rel_Insert_Input>;
  eventId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type ApplicationComponentEventMap_Max_Fields = {
  __typename?: 'ApplicationComponentEventMap_max_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  eventId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_application_component_event" */
export type ApplicationComponentEventMap_Max_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  eventId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type ApplicationComponentEventMap_Min_Fields = {
  __typename?: 'ApplicationComponentEventMap_min_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  eventId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_application_component_event" */
export type ApplicationComponentEventMap_Min_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  eventId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "map_application_component_event" */
export type ApplicationComponentEventMap_Mutation_Response = {
  __typename?: 'ApplicationComponentEventMap_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<ApplicationComponentEventMap>;
};

/** on_conflict condition type for table "map_application_component_event" */
export type ApplicationComponentEventMap_On_Conflict = {
  constraint: ApplicationComponentEventMap_Constraint;
  update_columns?: Array<ApplicationComponentEventMap_Update_Column>;
  where?: InputMaybe<ApplicationComponentEventMap_Bool_Exp>;
};

/** Ordering options when selecting data from "map_application_component_event". */
export type ApplicationComponentEventMap_Order_By = {
  component?: InputMaybe<ApplicationComponent_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  event?: InputMaybe<EventGeneric_Order_By>;
  eventId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_application_component_event */
export type ApplicationComponentEventMap_Pk_Columns_Input = {
  componentId: Scalars['uuid']['input'];
  eventId: Scalars['uuid']['input'];
};

/** select columns of table "map_application_component_event" */
export enum ApplicationComponentEventMap_Select_Column {
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  EventId = 'eventId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "map_application_component_event" */
export type ApplicationComponentEventMap_Set_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  eventId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "ApplicationComponentEventMap" */
export type ApplicationComponentEventMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: ApplicationComponentEventMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ApplicationComponentEventMap_Stream_Cursor_Value_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  eventId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "map_application_component_event" */
export enum ApplicationComponentEventMap_Update_Column {
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  EventId = 'eventId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type ApplicationComponentEventMap_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<ApplicationComponentEventMap_Set_Input>;
  /** filter the rows which have to be updated */
  where: ApplicationComponentEventMap_Bool_Exp;
};

/** columns and relationships of "map_application_component_function" */
export type ApplicationComponentFunctionMap = {
  __typename?: 'ApplicationComponentFunctionMap';
  /** An object relationship */
  component: ApplicationComponent;
  /** An array relationship */
  componentFunction: Array<ApplicationFunctionDataObjectMap>;
  /** An aggregate relationship */
  componentFunction_aggregate: ApplicationFunctionDataObjectMap_Aggregate;
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  function: FunctionGeneric;
  functionId: Scalars['uuid']['output'];
  /** An array relationship */
  interfaces: Array<ApplicationInterfaceFunctionMap>;
  /** An aggregate relationship */
  interfaces_aggregate: ApplicationInterfaceFunctionMap_Aggregate;
  /** An array relationship */
  sourceFunction: Array<FlowGeneric>;
  /** An aggregate relationship */
  sourceFunction_aggregate: FlowGeneric_Aggregate;
  /** An array relationship */
  targetFunction: Array<FlowGeneric>;
  /** An aggregate relationship */
  targetFunction_aggregate: FlowGeneric_Aggregate;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "map_application_component_function" */
export type ApplicationComponentFunctionMapComponentFunctionArgs = {
  distinct_on?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Order_By>>;
  where?: InputMaybe<ApplicationFunctionDataObjectMap_Bool_Exp>;
};


/** columns and relationships of "map_application_component_function" */
export type ApplicationComponentFunctionMapComponentFunction_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Order_By>>;
  where?: InputMaybe<ApplicationFunctionDataObjectMap_Bool_Exp>;
};


/** columns and relationships of "map_application_component_function" */
export type ApplicationComponentFunctionMapInterfacesArgs = {
  distinct_on?: InputMaybe<Array<ApplicationInterfaceFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationInterfaceFunctionMap_Order_By>>;
  where?: InputMaybe<ApplicationInterfaceFunctionMap_Bool_Exp>;
};


/** columns and relationships of "map_application_component_function" */
export type ApplicationComponentFunctionMapInterfaces_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationInterfaceFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationInterfaceFunctionMap_Order_By>>;
  where?: InputMaybe<ApplicationInterfaceFunctionMap_Bool_Exp>;
};


/** columns and relationships of "map_application_component_function" */
export type ApplicationComponentFunctionMapSourceFunctionArgs = {
  distinct_on?: InputMaybe<Array<FlowGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<FlowGeneric_Order_By>>;
  where?: InputMaybe<FlowGeneric_Bool_Exp>;
};


/** columns and relationships of "map_application_component_function" */
export type ApplicationComponentFunctionMapSourceFunction_AggregateArgs = {
  distinct_on?: InputMaybe<Array<FlowGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<FlowGeneric_Order_By>>;
  where?: InputMaybe<FlowGeneric_Bool_Exp>;
};


/** columns and relationships of "map_application_component_function" */
export type ApplicationComponentFunctionMapTargetFunctionArgs = {
  distinct_on?: InputMaybe<Array<FlowGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<FlowGeneric_Order_By>>;
  where?: InputMaybe<FlowGeneric_Bool_Exp>;
};


/** columns and relationships of "map_application_component_function" */
export type ApplicationComponentFunctionMapTargetFunction_AggregateArgs = {
  distinct_on?: InputMaybe<Array<FlowGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<FlowGeneric_Order_By>>;
  where?: InputMaybe<FlowGeneric_Bool_Exp>;
};

/** aggregated selection of "map_application_component_function" */
export type ApplicationComponentFunctionMap_Aggregate = {
  __typename?: 'ApplicationComponentFunctionMap_aggregate';
  aggregate?: Maybe<ApplicationComponentFunctionMap_Aggregate_Fields>;
  nodes: Array<ApplicationComponentFunctionMap>;
};

export type ApplicationComponentFunctionMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<ApplicationComponentFunctionMap_Aggregate_Bool_Exp_Count>;
};

export type ApplicationComponentFunctionMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<ApplicationComponentFunctionMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ApplicationComponentFunctionMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_application_component_function" */
export type ApplicationComponentFunctionMap_Aggregate_Fields = {
  __typename?: 'ApplicationComponentFunctionMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<ApplicationComponentFunctionMap_Max_Fields>;
  min?: Maybe<ApplicationComponentFunctionMap_Min_Fields>;
};


/** aggregate fields of "map_application_component_function" */
export type ApplicationComponentFunctionMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ApplicationComponentFunctionMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_application_component_function" */
export type ApplicationComponentFunctionMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ApplicationComponentFunctionMap_Max_Order_By>;
  min?: InputMaybe<ApplicationComponentFunctionMap_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_application_component_function" */
export type ApplicationComponentFunctionMap_Arr_Rel_Insert_Input = {
  data: Array<ApplicationComponentFunctionMap_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ApplicationComponentFunctionMap_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_application_component_function". All fields are combined with a logical 'AND'. */
export type ApplicationComponentFunctionMap_Bool_Exp = {
  _and?: InputMaybe<Array<ApplicationComponentFunctionMap_Bool_Exp>>;
  _not?: InputMaybe<ApplicationComponentFunctionMap_Bool_Exp>;
  _or?: InputMaybe<Array<ApplicationComponentFunctionMap_Bool_Exp>>;
  component?: InputMaybe<ApplicationComponent_Bool_Exp>;
  componentFunction?: InputMaybe<ApplicationFunctionDataObjectMap_Bool_Exp>;
  componentFunction_aggregate?: InputMaybe<ApplicationFunctionDataObjectMap_Aggregate_Bool_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  function?: InputMaybe<FunctionGeneric_Bool_Exp>;
  functionId?: InputMaybe<Uuid_Comparison_Exp>;
  interfaces?: InputMaybe<ApplicationInterfaceFunctionMap_Bool_Exp>;
  interfaces_aggregate?: InputMaybe<ApplicationInterfaceFunctionMap_Aggregate_Bool_Exp>;
  sourceFunction?: InputMaybe<FlowGeneric_Bool_Exp>;
  sourceFunction_aggregate?: InputMaybe<FlowGeneric_Aggregate_Bool_Exp>;
  targetFunction?: InputMaybe<FlowGeneric_Bool_Exp>;
  targetFunction_aggregate?: InputMaybe<FlowGeneric_Aggregate_Bool_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_application_component_function" */
export enum ApplicationComponentFunctionMap_Constraint {
  /** unique or primary key constraint on columns "component_id", "function_id" */
  MapApplicationComponentFunctionPkey = 'map_application_component_function_pkey'
}

/** input type for inserting data into table "map_application_component_function" */
export type ApplicationComponentFunctionMap_Insert_Input = {
  component?: InputMaybe<ApplicationComponent_Obj_Rel_Insert_Input>;
  componentFunction?: InputMaybe<ApplicationFunctionDataObjectMap_Arr_Rel_Insert_Input>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  function?: InputMaybe<FunctionGeneric_Obj_Rel_Insert_Input>;
  functionId?: InputMaybe<Scalars['uuid']['input']>;
  interfaces?: InputMaybe<ApplicationInterfaceFunctionMap_Arr_Rel_Insert_Input>;
  sourceFunction?: InputMaybe<FlowGeneric_Arr_Rel_Insert_Input>;
  targetFunction?: InputMaybe<FlowGeneric_Arr_Rel_Insert_Input>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type ApplicationComponentFunctionMap_Max_Fields = {
  __typename?: 'ApplicationComponentFunctionMap_max_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  functionId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_application_component_function" */
export type ApplicationComponentFunctionMap_Max_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  functionId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type ApplicationComponentFunctionMap_Min_Fields = {
  __typename?: 'ApplicationComponentFunctionMap_min_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  functionId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_application_component_function" */
export type ApplicationComponentFunctionMap_Min_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  functionId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "map_application_component_function" */
export type ApplicationComponentFunctionMap_Mutation_Response = {
  __typename?: 'ApplicationComponentFunctionMap_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<ApplicationComponentFunctionMap>;
};

/** on_conflict condition type for table "map_application_component_function" */
export type ApplicationComponentFunctionMap_On_Conflict = {
  constraint: ApplicationComponentFunctionMap_Constraint;
  update_columns?: Array<ApplicationComponentFunctionMap_Update_Column>;
  where?: InputMaybe<ApplicationComponentFunctionMap_Bool_Exp>;
};

/** Ordering options when selecting data from "map_application_component_function". */
export type ApplicationComponentFunctionMap_Order_By = {
  component?: InputMaybe<ApplicationComponent_Order_By>;
  componentFunction_aggregate?: InputMaybe<ApplicationFunctionDataObjectMap_Aggregate_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  function?: InputMaybe<FunctionGeneric_Order_By>;
  functionId?: InputMaybe<Order_By>;
  interfaces_aggregate?: InputMaybe<ApplicationInterfaceFunctionMap_Aggregate_Order_By>;
  sourceFunction_aggregate?: InputMaybe<FlowGeneric_Aggregate_Order_By>;
  targetFunction_aggregate?: InputMaybe<FlowGeneric_Aggregate_Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_application_component_function */
export type ApplicationComponentFunctionMap_Pk_Columns_Input = {
  componentId: Scalars['uuid']['input'];
  functionId: Scalars['uuid']['input'];
};

/** select columns of table "map_application_component_function" */
export enum ApplicationComponentFunctionMap_Select_Column {
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  FunctionId = 'functionId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "map_application_component_function" */
export type ApplicationComponentFunctionMap_Set_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  functionId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "ApplicationComponentFunctionMap" */
export type ApplicationComponentFunctionMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: ApplicationComponentFunctionMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ApplicationComponentFunctionMap_Stream_Cursor_Value_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  functionId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "map_application_component_function" */
export enum ApplicationComponentFunctionMap_Update_Column {
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  FunctionId = 'functionId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type ApplicationComponentFunctionMap_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<ApplicationComponentFunctionMap_Set_Input>;
  /** filter the rows which have to be updated */
  where: ApplicationComponentFunctionMap_Bool_Exp;
};

/** columns and relationships of "map_application_component_hierarchy" */
export type ApplicationComponentHierarchyMap = {
  __typename?: 'ApplicationComponentHierarchyMap';
  /** An object relationship */
  componentChild: ApplicationComponent;
  componentChildId: Scalars['uuid']['output'];
  /** An object relationship */
  componentParent: ApplicationComponent;
  componentParentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_application_component_hierarchy" */
export type ApplicationComponentHierarchyMap_Aggregate = {
  __typename?: 'ApplicationComponentHierarchyMap_aggregate';
  aggregate?: Maybe<ApplicationComponentHierarchyMap_Aggregate_Fields>;
  nodes: Array<ApplicationComponentHierarchyMap>;
};

export type ApplicationComponentHierarchyMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<ApplicationComponentHierarchyMap_Aggregate_Bool_Exp_Count>;
};

export type ApplicationComponentHierarchyMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<ApplicationComponentHierarchyMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ApplicationComponentHierarchyMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_application_component_hierarchy" */
export type ApplicationComponentHierarchyMap_Aggregate_Fields = {
  __typename?: 'ApplicationComponentHierarchyMap_aggregate_fields';
  avg?: Maybe<ApplicationComponentHierarchyMap_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<ApplicationComponentHierarchyMap_Max_Fields>;
  min?: Maybe<ApplicationComponentHierarchyMap_Min_Fields>;
  stddev?: Maybe<ApplicationComponentHierarchyMap_Stddev_Fields>;
  stddev_pop?: Maybe<ApplicationComponentHierarchyMap_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<ApplicationComponentHierarchyMap_Stddev_Samp_Fields>;
  sum?: Maybe<ApplicationComponentHierarchyMap_Sum_Fields>;
  var_pop?: Maybe<ApplicationComponentHierarchyMap_Var_Pop_Fields>;
  var_samp?: Maybe<ApplicationComponentHierarchyMap_Var_Samp_Fields>;
  variance?: Maybe<ApplicationComponentHierarchyMap_Variance_Fields>;
};


/** aggregate fields of "map_application_component_hierarchy" */
export type ApplicationComponentHierarchyMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ApplicationComponentHierarchyMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_application_component_hierarchy" */
export type ApplicationComponentHierarchyMap_Aggregate_Order_By = {
  avg?: InputMaybe<ApplicationComponentHierarchyMap_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ApplicationComponentHierarchyMap_Max_Order_By>;
  min?: InputMaybe<ApplicationComponentHierarchyMap_Min_Order_By>;
  stddev?: InputMaybe<ApplicationComponentHierarchyMap_Stddev_Order_By>;
  stddev_pop?: InputMaybe<ApplicationComponentHierarchyMap_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<ApplicationComponentHierarchyMap_Stddev_Samp_Order_By>;
  sum?: InputMaybe<ApplicationComponentHierarchyMap_Sum_Order_By>;
  var_pop?: InputMaybe<ApplicationComponentHierarchyMap_Var_Pop_Order_By>;
  var_samp?: InputMaybe<ApplicationComponentHierarchyMap_Var_Samp_Order_By>;
  variance?: InputMaybe<ApplicationComponentHierarchyMap_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "map_application_component_hierarchy" */
export type ApplicationComponentHierarchyMap_Arr_Rel_Insert_Input = {
  data: Array<ApplicationComponentHierarchyMap_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ApplicationComponentHierarchyMap_On_Conflict>;
};

/** aggregate avg on columns */
export type ApplicationComponentHierarchyMap_Avg_Fields = {
  __typename?: 'ApplicationComponentHierarchyMap_avg_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "map_application_component_hierarchy" */
export type ApplicationComponentHierarchyMap_Avg_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "map_application_component_hierarchy". All fields are combined with a logical 'AND'. */
export type ApplicationComponentHierarchyMap_Bool_Exp = {
  _and?: InputMaybe<Array<ApplicationComponentHierarchyMap_Bool_Exp>>;
  _not?: InputMaybe<ApplicationComponentHierarchyMap_Bool_Exp>;
  _or?: InputMaybe<Array<ApplicationComponentHierarchyMap_Bool_Exp>>;
  componentChild?: InputMaybe<ApplicationComponent_Bool_Exp>;
  componentChildId?: InputMaybe<Uuid_Comparison_Exp>;
  componentParent?: InputMaybe<ApplicationComponent_Bool_Exp>;
  componentParentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  order?: InputMaybe<Int_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_application_component_hierarchy" */
export enum ApplicationComponentHierarchyMap_Constraint {
  /** unique or primary key constraint on columns "component_child_id", "component_parent_id" */
  MapApplicationComponentHierarchyPkey = 'map_application_component_hierarchy_pkey'
}

/** input type for incrementing numeric columns in table "map_application_component_hierarchy" */
export type ApplicationComponentHierarchyMap_Inc_Input = {
  order?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "map_application_component_hierarchy" */
export type ApplicationComponentHierarchyMap_Insert_Input = {
  componentChild?: InputMaybe<ApplicationComponent_Obj_Rel_Insert_Input>;
  componentChildId?: InputMaybe<Scalars['uuid']['input']>;
  componentParent?: InputMaybe<ApplicationComponent_Obj_Rel_Insert_Input>;
  componentParentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type ApplicationComponentHierarchyMap_Max_Fields = {
  __typename?: 'ApplicationComponentHierarchyMap_max_fields';
  componentChildId?: Maybe<Scalars['uuid']['output']>;
  componentParentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_application_component_hierarchy" */
export type ApplicationComponentHierarchyMap_Max_Order_By = {
  componentChildId?: InputMaybe<Order_By>;
  componentParentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type ApplicationComponentHierarchyMap_Min_Fields = {
  __typename?: 'ApplicationComponentHierarchyMap_min_fields';
  componentChildId?: Maybe<Scalars['uuid']['output']>;
  componentParentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_application_component_hierarchy" */
export type ApplicationComponentHierarchyMap_Min_Order_By = {
  componentChildId?: InputMaybe<Order_By>;
  componentParentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "map_application_component_hierarchy" */
export type ApplicationComponentHierarchyMap_Mutation_Response = {
  __typename?: 'ApplicationComponentHierarchyMap_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<ApplicationComponentHierarchyMap>;
};

/** on_conflict condition type for table "map_application_component_hierarchy" */
export type ApplicationComponentHierarchyMap_On_Conflict = {
  constraint: ApplicationComponentHierarchyMap_Constraint;
  update_columns?: Array<ApplicationComponentHierarchyMap_Update_Column>;
  where?: InputMaybe<ApplicationComponentHierarchyMap_Bool_Exp>;
};

/** Ordering options when selecting data from "map_application_component_hierarchy". */
export type ApplicationComponentHierarchyMap_Order_By = {
  componentChild?: InputMaybe<ApplicationComponent_Order_By>;
  componentChildId?: InputMaybe<Order_By>;
  componentParent?: InputMaybe<ApplicationComponent_Order_By>;
  componentParentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_application_component_hierarchy */
export type ApplicationComponentHierarchyMap_Pk_Columns_Input = {
  componentChildId: Scalars['uuid']['input'];
  componentParentId: Scalars['uuid']['input'];
};

/** select columns of table "map_application_component_hierarchy" */
export enum ApplicationComponentHierarchyMap_Select_Column {
  /** column name */
  ComponentChildId = 'componentChildId',
  /** column name */
  ComponentParentId = 'componentParentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Order = 'order',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "map_application_component_hierarchy" */
export type ApplicationComponentHierarchyMap_Set_Input = {
  componentChildId?: InputMaybe<Scalars['uuid']['input']>;
  componentParentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type ApplicationComponentHierarchyMap_Stddev_Fields = {
  __typename?: 'ApplicationComponentHierarchyMap_stddev_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "map_application_component_hierarchy" */
export type ApplicationComponentHierarchyMap_Stddev_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type ApplicationComponentHierarchyMap_Stddev_Pop_Fields = {
  __typename?: 'ApplicationComponentHierarchyMap_stddev_pop_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "map_application_component_hierarchy" */
export type ApplicationComponentHierarchyMap_Stddev_Pop_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type ApplicationComponentHierarchyMap_Stddev_Samp_Fields = {
  __typename?: 'ApplicationComponentHierarchyMap_stddev_samp_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "map_application_component_hierarchy" */
export type ApplicationComponentHierarchyMap_Stddev_Samp_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "ApplicationComponentHierarchyMap" */
export type ApplicationComponentHierarchyMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: ApplicationComponentHierarchyMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ApplicationComponentHierarchyMap_Stream_Cursor_Value_Input = {
  componentChildId?: InputMaybe<Scalars['uuid']['input']>;
  componentParentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type ApplicationComponentHierarchyMap_Sum_Fields = {
  __typename?: 'ApplicationComponentHierarchyMap_sum_fields';
  order?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "map_application_component_hierarchy" */
export type ApplicationComponentHierarchyMap_Sum_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** update columns of table "map_application_component_hierarchy" */
export enum ApplicationComponentHierarchyMap_Update_Column {
  /** column name */
  ComponentChildId = 'componentChildId',
  /** column name */
  ComponentParentId = 'componentParentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Order = 'order',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type ApplicationComponentHierarchyMap_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<ApplicationComponentHierarchyMap_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<ApplicationComponentHierarchyMap_Set_Input>;
  /** filter the rows which have to be updated */
  where: ApplicationComponentHierarchyMap_Bool_Exp;
};

/** aggregate var_pop on columns */
export type ApplicationComponentHierarchyMap_Var_Pop_Fields = {
  __typename?: 'ApplicationComponentHierarchyMap_var_pop_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "map_application_component_hierarchy" */
export type ApplicationComponentHierarchyMap_Var_Pop_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type ApplicationComponentHierarchyMap_Var_Samp_Fields = {
  __typename?: 'ApplicationComponentHierarchyMap_var_samp_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "map_application_component_hierarchy" */
export type ApplicationComponentHierarchyMap_Var_Samp_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type ApplicationComponentHierarchyMap_Variance_Fields = {
  __typename?: 'ApplicationComponentHierarchyMap_variance_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "map_application_component_hierarchy" */
export type ApplicationComponentHierarchyMap_Variance_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** columns and relationships of "map_application_component_interface" */
export type ApplicationComponentInterfaceMap = {
  __typename?: 'ApplicationComponentInterfaceMap';
  /** An object relationship */
  component: ApplicationComponent;
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  interface: InterfaceGeneric;
  interfaceId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_application_component_interface" */
export type ApplicationComponentInterfaceMap_Aggregate = {
  __typename?: 'ApplicationComponentInterfaceMap_aggregate';
  aggregate?: Maybe<ApplicationComponentInterfaceMap_Aggregate_Fields>;
  nodes: Array<ApplicationComponentInterfaceMap>;
};

export type ApplicationComponentInterfaceMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<ApplicationComponentInterfaceMap_Aggregate_Bool_Exp_Count>;
};

export type ApplicationComponentInterfaceMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<ApplicationComponentInterfaceMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ApplicationComponentInterfaceMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_application_component_interface" */
export type ApplicationComponentInterfaceMap_Aggregate_Fields = {
  __typename?: 'ApplicationComponentInterfaceMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<ApplicationComponentInterfaceMap_Max_Fields>;
  min?: Maybe<ApplicationComponentInterfaceMap_Min_Fields>;
};


/** aggregate fields of "map_application_component_interface" */
export type ApplicationComponentInterfaceMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ApplicationComponentInterfaceMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_application_component_interface" */
export type ApplicationComponentInterfaceMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ApplicationComponentInterfaceMap_Max_Order_By>;
  min?: InputMaybe<ApplicationComponentInterfaceMap_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_application_component_interface" */
export type ApplicationComponentInterfaceMap_Arr_Rel_Insert_Input = {
  data: Array<ApplicationComponentInterfaceMap_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ApplicationComponentInterfaceMap_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_application_component_interface". All fields are combined with a logical 'AND'. */
export type ApplicationComponentInterfaceMap_Bool_Exp = {
  _and?: InputMaybe<Array<ApplicationComponentInterfaceMap_Bool_Exp>>;
  _not?: InputMaybe<ApplicationComponentInterfaceMap_Bool_Exp>;
  _or?: InputMaybe<Array<ApplicationComponentInterfaceMap_Bool_Exp>>;
  component?: InputMaybe<ApplicationComponent_Bool_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  interface?: InputMaybe<InterfaceGeneric_Bool_Exp>;
  interfaceId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_application_component_interface" */
export enum ApplicationComponentInterfaceMap_Constraint {
  /** unique or primary key constraint on columns "interface_id", "component_id" */
  MapApplicationComponentInterfacePkey = 'map_application_component_interface_pkey'
}

/** input type for inserting data into table "map_application_component_interface" */
export type ApplicationComponentInterfaceMap_Insert_Input = {
  component?: InputMaybe<ApplicationComponent_Obj_Rel_Insert_Input>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  interface?: InputMaybe<InterfaceGeneric_Obj_Rel_Insert_Input>;
  interfaceId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type ApplicationComponentInterfaceMap_Max_Fields = {
  __typename?: 'ApplicationComponentInterfaceMap_max_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  interfaceId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_application_component_interface" */
export type ApplicationComponentInterfaceMap_Max_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  interfaceId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type ApplicationComponentInterfaceMap_Min_Fields = {
  __typename?: 'ApplicationComponentInterfaceMap_min_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  interfaceId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_application_component_interface" */
export type ApplicationComponentInterfaceMap_Min_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  interfaceId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "map_application_component_interface" */
export type ApplicationComponentInterfaceMap_Mutation_Response = {
  __typename?: 'ApplicationComponentInterfaceMap_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<ApplicationComponentInterfaceMap>;
};

/** on_conflict condition type for table "map_application_component_interface" */
export type ApplicationComponentInterfaceMap_On_Conflict = {
  constraint: ApplicationComponentInterfaceMap_Constraint;
  update_columns?: Array<ApplicationComponentInterfaceMap_Update_Column>;
  where?: InputMaybe<ApplicationComponentInterfaceMap_Bool_Exp>;
};

/** Ordering options when selecting data from "map_application_component_interface". */
export type ApplicationComponentInterfaceMap_Order_By = {
  component?: InputMaybe<ApplicationComponent_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  interface?: InputMaybe<InterfaceGeneric_Order_By>;
  interfaceId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_application_component_interface */
export type ApplicationComponentInterfaceMap_Pk_Columns_Input = {
  componentId: Scalars['uuid']['input'];
  interfaceId: Scalars['uuid']['input'];
};

/** select columns of table "map_application_component_interface" */
export enum ApplicationComponentInterfaceMap_Select_Column {
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  InterfaceId = 'interfaceId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "map_application_component_interface" */
export type ApplicationComponentInterfaceMap_Set_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  interfaceId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "ApplicationComponentInterfaceMap" */
export type ApplicationComponentInterfaceMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: ApplicationComponentInterfaceMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ApplicationComponentInterfaceMap_Stream_Cursor_Value_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  interfaceId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "map_application_component_interface" */
export enum ApplicationComponentInterfaceMap_Update_Column {
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  InterfaceId = 'interfaceId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type ApplicationComponentInterfaceMap_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<ApplicationComponentInterfaceMap_Set_Input>;
  /** filter the rows which have to be updated */
  where: ApplicationComponentInterfaceMap_Bool_Exp;
};

/** columns and relationships of "map_application_component_product" */
export type ApplicationComponentProductMap = {
  __typename?: 'ApplicationComponentProductMap';
  /** An object relationship */
  component: ApplicationComponent;
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  product: BusinessProduct;
  productId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_application_component_product" */
export type ApplicationComponentProductMap_Aggregate = {
  __typename?: 'ApplicationComponentProductMap_aggregate';
  aggregate?: Maybe<ApplicationComponentProductMap_Aggregate_Fields>;
  nodes: Array<ApplicationComponentProductMap>;
};

export type ApplicationComponentProductMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<ApplicationComponentProductMap_Aggregate_Bool_Exp_Count>;
};

export type ApplicationComponentProductMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<ApplicationComponentProductMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ApplicationComponentProductMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_application_component_product" */
export type ApplicationComponentProductMap_Aggregate_Fields = {
  __typename?: 'ApplicationComponentProductMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<ApplicationComponentProductMap_Max_Fields>;
  min?: Maybe<ApplicationComponentProductMap_Min_Fields>;
};


/** aggregate fields of "map_application_component_product" */
export type ApplicationComponentProductMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ApplicationComponentProductMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_application_component_product" */
export type ApplicationComponentProductMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ApplicationComponentProductMap_Max_Order_By>;
  min?: InputMaybe<ApplicationComponentProductMap_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_application_component_product" */
export type ApplicationComponentProductMap_Arr_Rel_Insert_Input = {
  data: Array<ApplicationComponentProductMap_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ApplicationComponentProductMap_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_application_component_product". All fields are combined with a logical 'AND'. */
export type ApplicationComponentProductMap_Bool_Exp = {
  _and?: InputMaybe<Array<ApplicationComponentProductMap_Bool_Exp>>;
  _not?: InputMaybe<ApplicationComponentProductMap_Bool_Exp>;
  _or?: InputMaybe<Array<ApplicationComponentProductMap_Bool_Exp>>;
  component?: InputMaybe<ApplicationComponent_Bool_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  product?: InputMaybe<BusinessProduct_Bool_Exp>;
  productId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_application_component_product" */
export enum ApplicationComponentProductMap_Constraint {
  /** unique or primary key constraint on columns "product_id", "component_id" */
  MapApplicationComponentProductPkey = 'map_application_component_product_pkey'
}

/** input type for inserting data into table "map_application_component_product" */
export type ApplicationComponentProductMap_Insert_Input = {
  component?: InputMaybe<ApplicationComponent_Obj_Rel_Insert_Input>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  product?: InputMaybe<BusinessProduct_Obj_Rel_Insert_Input>;
  productId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type ApplicationComponentProductMap_Max_Fields = {
  __typename?: 'ApplicationComponentProductMap_max_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  productId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_application_component_product" */
export type ApplicationComponentProductMap_Max_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  productId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type ApplicationComponentProductMap_Min_Fields = {
  __typename?: 'ApplicationComponentProductMap_min_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  productId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_application_component_product" */
export type ApplicationComponentProductMap_Min_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  productId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "map_application_component_product" */
export type ApplicationComponentProductMap_Mutation_Response = {
  __typename?: 'ApplicationComponentProductMap_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<ApplicationComponentProductMap>;
};

/** on_conflict condition type for table "map_application_component_product" */
export type ApplicationComponentProductMap_On_Conflict = {
  constraint: ApplicationComponentProductMap_Constraint;
  update_columns?: Array<ApplicationComponentProductMap_Update_Column>;
  where?: InputMaybe<ApplicationComponentProductMap_Bool_Exp>;
};

/** Ordering options when selecting data from "map_application_component_product". */
export type ApplicationComponentProductMap_Order_By = {
  component?: InputMaybe<ApplicationComponent_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  product?: InputMaybe<BusinessProduct_Order_By>;
  productId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_application_component_product */
export type ApplicationComponentProductMap_Pk_Columns_Input = {
  componentId: Scalars['uuid']['input'];
  productId: Scalars['uuid']['input'];
};

/** select columns of table "map_application_component_product" */
export enum ApplicationComponentProductMap_Select_Column {
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  ProductId = 'productId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "map_application_component_product" */
export type ApplicationComponentProductMap_Set_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  productId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "ApplicationComponentProductMap" */
export type ApplicationComponentProductMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: ApplicationComponentProductMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ApplicationComponentProductMap_Stream_Cursor_Value_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  productId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "map_application_component_product" */
export enum ApplicationComponentProductMap_Update_Column {
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  ProductId = 'productId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type ApplicationComponentProductMap_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<ApplicationComponentProductMap_Set_Input>;
  /** filter the rows which have to be updated */
  where: ApplicationComponentProductMap_Bool_Exp;
};

/** columns and relationships of "map_application_component_stakeholder" */
export type ApplicationComponentStakeholderMap = {
  __typename?: 'ApplicationComponentStakeholderMap';
  /** An object relationship */
  component: ApplicationComponent;
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  role: DirectoryObject;
  roleId: Scalars['uuid']['output'];
  /** An object relationship */
  stakeholder: Stakeholder;
  stakeholderId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_application_component_stakeholder" */
export type ApplicationComponentStakeholderMap_Aggregate = {
  __typename?: 'ApplicationComponentStakeholderMap_aggregate';
  aggregate?: Maybe<ApplicationComponentStakeholderMap_Aggregate_Fields>;
  nodes: Array<ApplicationComponentStakeholderMap>;
};

export type ApplicationComponentStakeholderMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<ApplicationComponentStakeholderMap_Aggregate_Bool_Exp_Count>;
};

export type ApplicationComponentStakeholderMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<ApplicationComponentStakeholderMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ApplicationComponentStakeholderMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_application_component_stakeholder" */
export type ApplicationComponentStakeholderMap_Aggregate_Fields = {
  __typename?: 'ApplicationComponentStakeholderMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<ApplicationComponentStakeholderMap_Max_Fields>;
  min?: Maybe<ApplicationComponentStakeholderMap_Min_Fields>;
};


/** aggregate fields of "map_application_component_stakeholder" */
export type ApplicationComponentStakeholderMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ApplicationComponentStakeholderMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_application_component_stakeholder" */
export type ApplicationComponentStakeholderMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ApplicationComponentStakeholderMap_Max_Order_By>;
  min?: InputMaybe<ApplicationComponentStakeholderMap_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_application_component_stakeholder" */
export type ApplicationComponentStakeholderMap_Arr_Rel_Insert_Input = {
  data: Array<ApplicationComponentStakeholderMap_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ApplicationComponentStakeholderMap_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_application_component_stakeholder". All fields are combined with a logical 'AND'. */
export type ApplicationComponentStakeholderMap_Bool_Exp = {
  _and?: InputMaybe<Array<ApplicationComponentStakeholderMap_Bool_Exp>>;
  _not?: InputMaybe<ApplicationComponentStakeholderMap_Bool_Exp>;
  _or?: InputMaybe<Array<ApplicationComponentStakeholderMap_Bool_Exp>>;
  component?: InputMaybe<ApplicationComponent_Bool_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  role?: InputMaybe<DirectoryObject_Bool_Exp>;
  roleId?: InputMaybe<Uuid_Comparison_Exp>;
  stakeholder?: InputMaybe<Stakeholder_Bool_Exp>;
  stakeholderId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_application_component_stakeholder" */
export enum ApplicationComponentStakeholderMap_Constraint {
  /** unique or primary key constraint on columns "component_id", "stakeholder_id", "role_id" */
  MapApplicationComponentStakeholderPkey = 'map_application_component_stakeholder_pkey'
}

/** input type for inserting data into table "map_application_component_stakeholder" */
export type ApplicationComponentStakeholderMap_Insert_Input = {
  component?: InputMaybe<ApplicationComponent_Obj_Rel_Insert_Input>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  role?: InputMaybe<DirectoryObject_Obj_Rel_Insert_Input>;
  roleId?: InputMaybe<Scalars['uuid']['input']>;
  stakeholder?: InputMaybe<Stakeholder_Obj_Rel_Insert_Input>;
  stakeholderId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type ApplicationComponentStakeholderMap_Max_Fields = {
  __typename?: 'ApplicationComponentStakeholderMap_max_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  roleId?: Maybe<Scalars['uuid']['output']>;
  stakeholderId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_application_component_stakeholder" */
export type ApplicationComponentStakeholderMap_Max_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  roleId?: InputMaybe<Order_By>;
  stakeholderId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type ApplicationComponentStakeholderMap_Min_Fields = {
  __typename?: 'ApplicationComponentStakeholderMap_min_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  roleId?: Maybe<Scalars['uuid']['output']>;
  stakeholderId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_application_component_stakeholder" */
export type ApplicationComponentStakeholderMap_Min_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  roleId?: InputMaybe<Order_By>;
  stakeholderId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "map_application_component_stakeholder" */
export type ApplicationComponentStakeholderMap_Mutation_Response = {
  __typename?: 'ApplicationComponentStakeholderMap_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<ApplicationComponentStakeholderMap>;
};

/** on_conflict condition type for table "map_application_component_stakeholder" */
export type ApplicationComponentStakeholderMap_On_Conflict = {
  constraint: ApplicationComponentStakeholderMap_Constraint;
  update_columns?: Array<ApplicationComponentStakeholderMap_Update_Column>;
  where?: InputMaybe<ApplicationComponentStakeholderMap_Bool_Exp>;
};

/** Ordering options when selecting data from "map_application_component_stakeholder". */
export type ApplicationComponentStakeholderMap_Order_By = {
  component?: InputMaybe<ApplicationComponent_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  role?: InputMaybe<DirectoryObject_Order_By>;
  roleId?: InputMaybe<Order_By>;
  stakeholder?: InputMaybe<Stakeholder_Order_By>;
  stakeholderId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_application_component_stakeholder */
export type ApplicationComponentStakeholderMap_Pk_Columns_Input = {
  componentId: Scalars['uuid']['input'];
  roleId: Scalars['uuid']['input'];
  stakeholderId: Scalars['uuid']['input'];
};

/** select columns of table "map_application_component_stakeholder" */
export enum ApplicationComponentStakeholderMap_Select_Column {
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  RoleId = 'roleId',
  /** column name */
  StakeholderId = 'stakeholderId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "map_application_component_stakeholder" */
export type ApplicationComponentStakeholderMap_Set_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  roleId?: InputMaybe<Scalars['uuid']['input']>;
  stakeholderId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "ApplicationComponentStakeholderMap" */
export type ApplicationComponentStakeholderMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: ApplicationComponentStakeholderMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ApplicationComponentStakeholderMap_Stream_Cursor_Value_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  roleId?: InputMaybe<Scalars['uuid']['input']>;
  stakeholderId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "map_application_component_stakeholder" */
export enum ApplicationComponentStakeholderMap_Update_Column {
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  RoleId = 'roleId',
  /** column name */
  StakeholderId = 'stakeholderId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type ApplicationComponentStakeholderMap_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<ApplicationComponentStakeholderMap_Set_Input>;
  /** filter the rows which have to be updated */
  where: ApplicationComponentStakeholderMap_Bool_Exp;
};

/** columns and relationships of "map_application_component_system_software" */
export type ApplicationComponentSystemSoftwareMap = {
  __typename?: 'ApplicationComponentSystemSoftwareMap';
  /** An object relationship */
  component: ApplicationComponent;
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  kind: Scalars['system_software_kind_enum']['output'];
  /** An object relationship */
  systemSoftware: SystemSoftware;
  systemSoftwareId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_application_component_system_software" */
export type ApplicationComponentSystemSoftwareMap_Aggregate = {
  __typename?: 'ApplicationComponentSystemSoftwareMap_aggregate';
  aggregate?: Maybe<ApplicationComponentSystemSoftwareMap_Aggregate_Fields>;
  nodes: Array<ApplicationComponentSystemSoftwareMap>;
};

export type ApplicationComponentSystemSoftwareMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<ApplicationComponentSystemSoftwareMap_Aggregate_Bool_Exp_Count>;
};

export type ApplicationComponentSystemSoftwareMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<ApplicationComponentSystemSoftwareMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ApplicationComponentSystemSoftwareMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_application_component_system_software" */
export type ApplicationComponentSystemSoftwareMap_Aggregate_Fields = {
  __typename?: 'ApplicationComponentSystemSoftwareMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<ApplicationComponentSystemSoftwareMap_Max_Fields>;
  min?: Maybe<ApplicationComponentSystemSoftwareMap_Min_Fields>;
};


/** aggregate fields of "map_application_component_system_software" */
export type ApplicationComponentSystemSoftwareMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ApplicationComponentSystemSoftwareMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_application_component_system_software" */
export type ApplicationComponentSystemSoftwareMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ApplicationComponentSystemSoftwareMap_Max_Order_By>;
  min?: InputMaybe<ApplicationComponentSystemSoftwareMap_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_application_component_system_software" */
export type ApplicationComponentSystemSoftwareMap_Arr_Rel_Insert_Input = {
  data: Array<ApplicationComponentSystemSoftwareMap_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ApplicationComponentSystemSoftwareMap_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_application_component_system_software". All fields are combined with a logical 'AND'. */
export type ApplicationComponentSystemSoftwareMap_Bool_Exp = {
  _and?: InputMaybe<Array<ApplicationComponentSystemSoftwareMap_Bool_Exp>>;
  _not?: InputMaybe<ApplicationComponentSystemSoftwareMap_Bool_Exp>;
  _or?: InputMaybe<Array<ApplicationComponentSystemSoftwareMap_Bool_Exp>>;
  component?: InputMaybe<ApplicationComponent_Bool_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  kind?: InputMaybe<System_Software_Kind_Enum_Comparison_Exp>;
  systemSoftware?: InputMaybe<SystemSoftware_Bool_Exp>;
  systemSoftwareId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_application_component_system_software" */
export enum ApplicationComponentSystemSoftwareMap_Constraint {
  /** unique or primary key constraint on columns "system_software_id", "component_id" */
  MapApplicationComponentSystemSoftwarePkey = 'map_application_component_system_software_pkey'
}

/** input type for inserting data into table "map_application_component_system_software" */
export type ApplicationComponentSystemSoftwareMap_Insert_Input = {
  component?: InputMaybe<ApplicationComponent_Obj_Rel_Insert_Input>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  kind?: InputMaybe<Scalars['system_software_kind_enum']['input']>;
  systemSoftware?: InputMaybe<SystemSoftware_Obj_Rel_Insert_Input>;
  systemSoftwareId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type ApplicationComponentSystemSoftwareMap_Max_Fields = {
  __typename?: 'ApplicationComponentSystemSoftwareMap_max_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  kind?: Maybe<Scalars['system_software_kind_enum']['output']>;
  systemSoftwareId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_application_component_system_software" */
export type ApplicationComponentSystemSoftwareMap_Max_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  systemSoftwareId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type ApplicationComponentSystemSoftwareMap_Min_Fields = {
  __typename?: 'ApplicationComponentSystemSoftwareMap_min_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  kind?: Maybe<Scalars['system_software_kind_enum']['output']>;
  systemSoftwareId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_application_component_system_software" */
export type ApplicationComponentSystemSoftwareMap_Min_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  systemSoftwareId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "map_application_component_system_software" */
export type ApplicationComponentSystemSoftwareMap_Mutation_Response = {
  __typename?: 'ApplicationComponentSystemSoftwareMap_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<ApplicationComponentSystemSoftwareMap>;
};

/** on_conflict condition type for table "map_application_component_system_software" */
export type ApplicationComponentSystemSoftwareMap_On_Conflict = {
  constraint: ApplicationComponentSystemSoftwareMap_Constraint;
  update_columns?: Array<ApplicationComponentSystemSoftwareMap_Update_Column>;
  where?: InputMaybe<ApplicationComponentSystemSoftwareMap_Bool_Exp>;
};

/** Ordering options when selecting data from "map_application_component_system_software". */
export type ApplicationComponentSystemSoftwareMap_Order_By = {
  component?: InputMaybe<ApplicationComponent_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  systemSoftware?: InputMaybe<SystemSoftware_Order_By>;
  systemSoftwareId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_application_component_system_software */
export type ApplicationComponentSystemSoftwareMap_Pk_Columns_Input = {
  componentId: Scalars['uuid']['input'];
  systemSoftwareId: Scalars['uuid']['input'];
};

/** select columns of table "map_application_component_system_software" */
export enum ApplicationComponentSystemSoftwareMap_Select_Column {
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Kind = 'kind',
  /** column name */
  SystemSoftwareId = 'systemSoftwareId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "map_application_component_system_software" */
export type ApplicationComponentSystemSoftwareMap_Set_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  kind?: InputMaybe<Scalars['system_software_kind_enum']['input']>;
  systemSoftwareId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "ApplicationComponentSystemSoftwareMap" */
export type ApplicationComponentSystemSoftwareMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: ApplicationComponentSystemSoftwareMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ApplicationComponentSystemSoftwareMap_Stream_Cursor_Value_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  kind?: InputMaybe<Scalars['system_software_kind_enum']['input']>;
  systemSoftwareId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "map_application_component_system_software" */
export enum ApplicationComponentSystemSoftwareMap_Update_Column {
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Kind = 'kind',
  /** column name */
  SystemSoftwareId = 'systemSoftwareId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type ApplicationComponentSystemSoftwareMap_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<ApplicationComponentSystemSoftwareMap_Set_Input>;
  /** filter the rows which have to be updated */
  where: ApplicationComponentSystemSoftwareMap_Bool_Exp;
};

/** columns and relationships of "map_application_component_technology_logical_network" */
export type ApplicationComponentTechnologyLogicalNetworkMap = {
  __typename?: 'ApplicationComponentTechnologyLogicalNetworkMap';
  /** An object relationship */
  component: ApplicationComponent;
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  logicalNetwork: TechnologyNetwork;
  logicalNetworkId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_application_component_technology_logical_network" */
export type ApplicationComponentTechnologyLogicalNetworkMap_Aggregate = {
  __typename?: 'ApplicationComponentTechnologyLogicalNetworkMap_aggregate';
  aggregate?: Maybe<ApplicationComponentTechnologyLogicalNetworkMap_Aggregate_Fields>;
  nodes: Array<ApplicationComponentTechnologyLogicalNetworkMap>;
};

export type ApplicationComponentTechnologyLogicalNetworkMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_Aggregate_Bool_Exp_Count>;
};

export type ApplicationComponentTechnologyLogicalNetworkMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<ApplicationComponentTechnologyLogicalNetworkMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_application_component_technology_logical_network" */
export type ApplicationComponentTechnologyLogicalNetworkMap_Aggregate_Fields = {
  __typename?: 'ApplicationComponentTechnologyLogicalNetworkMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<ApplicationComponentTechnologyLogicalNetworkMap_Max_Fields>;
  min?: Maybe<ApplicationComponentTechnologyLogicalNetworkMap_Min_Fields>;
};


/** aggregate fields of "map_application_component_technology_logical_network" */
export type ApplicationComponentTechnologyLogicalNetworkMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ApplicationComponentTechnologyLogicalNetworkMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_application_component_technology_logical_network" */
export type ApplicationComponentTechnologyLogicalNetworkMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_Max_Order_By>;
  min?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_application_component_technology_logical_network" */
export type ApplicationComponentTechnologyLogicalNetworkMap_Arr_Rel_Insert_Input = {
  data: Array<ApplicationComponentTechnologyLogicalNetworkMap_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_application_component_technology_logical_network". All fields are combined with a logical 'AND'. */
export type ApplicationComponentTechnologyLogicalNetworkMap_Bool_Exp = {
  _and?: InputMaybe<Array<ApplicationComponentTechnologyLogicalNetworkMap_Bool_Exp>>;
  _not?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_Bool_Exp>;
  _or?: InputMaybe<Array<ApplicationComponentTechnologyLogicalNetworkMap_Bool_Exp>>;
  component?: InputMaybe<ApplicationComponent_Bool_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  logicalNetwork?: InputMaybe<TechnologyNetwork_Bool_Exp>;
  logicalNetworkId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_application_component_technology_logical_network" */
export enum ApplicationComponentTechnologyLogicalNetworkMap_Constraint {
  /** unique or primary key constraint on columns "logical_network_id", "component_id" */
  MapApplicationComponentTechnologyLogicalNetworkPkey = 'map_application_component_technology_logical_network_pkey'
}

/** input type for inserting data into table "map_application_component_technology_logical_network" */
export type ApplicationComponentTechnologyLogicalNetworkMap_Insert_Input = {
  component?: InputMaybe<ApplicationComponent_Obj_Rel_Insert_Input>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  logicalNetwork?: InputMaybe<TechnologyNetwork_Obj_Rel_Insert_Input>;
  logicalNetworkId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type ApplicationComponentTechnologyLogicalNetworkMap_Max_Fields = {
  __typename?: 'ApplicationComponentTechnologyLogicalNetworkMap_max_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  logicalNetworkId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_application_component_technology_logical_network" */
export type ApplicationComponentTechnologyLogicalNetworkMap_Max_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  logicalNetworkId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type ApplicationComponentTechnologyLogicalNetworkMap_Min_Fields = {
  __typename?: 'ApplicationComponentTechnologyLogicalNetworkMap_min_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  logicalNetworkId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_application_component_technology_logical_network" */
export type ApplicationComponentTechnologyLogicalNetworkMap_Min_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  logicalNetworkId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "map_application_component_technology_logical_network" */
export type ApplicationComponentTechnologyLogicalNetworkMap_Mutation_Response = {
  __typename?: 'ApplicationComponentTechnologyLogicalNetworkMap_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<ApplicationComponentTechnologyLogicalNetworkMap>;
};

/** on_conflict condition type for table "map_application_component_technology_logical_network" */
export type ApplicationComponentTechnologyLogicalNetworkMap_On_Conflict = {
  constraint: ApplicationComponentTechnologyLogicalNetworkMap_Constraint;
  update_columns?: Array<ApplicationComponentTechnologyLogicalNetworkMap_Update_Column>;
  where?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_Bool_Exp>;
};

/** Ordering options when selecting data from "map_application_component_technology_logical_network". */
export type ApplicationComponentTechnologyLogicalNetworkMap_Order_By = {
  component?: InputMaybe<ApplicationComponent_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  logicalNetwork?: InputMaybe<TechnologyNetwork_Order_By>;
  logicalNetworkId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_application_component_technology_logical_network */
export type ApplicationComponentTechnologyLogicalNetworkMap_Pk_Columns_Input = {
  componentId: Scalars['uuid']['input'];
  logicalNetworkId: Scalars['uuid']['input'];
};

/** select columns of table "map_application_component_technology_logical_network" */
export enum ApplicationComponentTechnologyLogicalNetworkMap_Select_Column {
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  LogicalNetworkId = 'logicalNetworkId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "map_application_component_technology_logical_network" */
export type ApplicationComponentTechnologyLogicalNetworkMap_Set_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  logicalNetworkId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "ApplicationComponentTechnologyLogicalNetworkMap" */
export type ApplicationComponentTechnologyLogicalNetworkMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: ApplicationComponentTechnologyLogicalNetworkMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ApplicationComponentTechnologyLogicalNetworkMap_Stream_Cursor_Value_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  logicalNetworkId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "map_application_component_technology_logical_network" */
export enum ApplicationComponentTechnologyLogicalNetworkMap_Update_Column {
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  LogicalNetworkId = 'logicalNetworkId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type ApplicationComponentTechnologyLogicalNetworkMap_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_Set_Input>;
  /** filter the rows which have to be updated */
  where: ApplicationComponentTechnologyLogicalNetworkMap_Bool_Exp;
};

/** columns and relationships of "map_application_component_technology_node" */
export type ApplicationComponentTechnologyNodeMap = {
  __typename?: 'ApplicationComponentTechnologyNodeMap';
  /** An object relationship */
  component: ApplicationComponent;
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  node: TechnologyNode;
  nodeId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_application_component_technology_node" */
export type ApplicationComponentTechnologyNodeMap_Aggregate = {
  __typename?: 'ApplicationComponentTechnologyNodeMap_aggregate';
  aggregate?: Maybe<ApplicationComponentTechnologyNodeMap_Aggregate_Fields>;
  nodes: Array<ApplicationComponentTechnologyNodeMap>;
};

export type ApplicationComponentTechnologyNodeMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<ApplicationComponentTechnologyNodeMap_Aggregate_Bool_Exp_Count>;
};

export type ApplicationComponentTechnologyNodeMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<ApplicationComponentTechnologyNodeMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ApplicationComponentTechnologyNodeMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_application_component_technology_node" */
export type ApplicationComponentTechnologyNodeMap_Aggregate_Fields = {
  __typename?: 'ApplicationComponentTechnologyNodeMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<ApplicationComponentTechnologyNodeMap_Max_Fields>;
  min?: Maybe<ApplicationComponentTechnologyNodeMap_Min_Fields>;
};


/** aggregate fields of "map_application_component_technology_node" */
export type ApplicationComponentTechnologyNodeMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ApplicationComponentTechnologyNodeMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_application_component_technology_node" */
export type ApplicationComponentTechnologyNodeMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ApplicationComponentTechnologyNodeMap_Max_Order_By>;
  min?: InputMaybe<ApplicationComponentTechnologyNodeMap_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_application_component_technology_node" */
export type ApplicationComponentTechnologyNodeMap_Arr_Rel_Insert_Input = {
  data: Array<ApplicationComponentTechnologyNodeMap_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ApplicationComponentTechnologyNodeMap_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_application_component_technology_node". All fields are combined with a logical 'AND'. */
export type ApplicationComponentTechnologyNodeMap_Bool_Exp = {
  _and?: InputMaybe<Array<ApplicationComponentTechnologyNodeMap_Bool_Exp>>;
  _not?: InputMaybe<ApplicationComponentTechnologyNodeMap_Bool_Exp>;
  _or?: InputMaybe<Array<ApplicationComponentTechnologyNodeMap_Bool_Exp>>;
  component?: InputMaybe<ApplicationComponent_Bool_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  node?: InputMaybe<TechnologyNode_Bool_Exp>;
  nodeId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_application_component_technology_node" */
export enum ApplicationComponentTechnologyNodeMap_Constraint {
  /** unique or primary key constraint on columns "node_id", "component_id" */
  MapApplicationComponentTechnologyNodePkey = 'map_application_component_technology_node_pkey'
}

/** input type for inserting data into table "map_application_component_technology_node" */
export type ApplicationComponentTechnologyNodeMap_Insert_Input = {
  component?: InputMaybe<ApplicationComponent_Obj_Rel_Insert_Input>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  node?: InputMaybe<TechnologyNode_Obj_Rel_Insert_Input>;
  nodeId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type ApplicationComponentTechnologyNodeMap_Max_Fields = {
  __typename?: 'ApplicationComponentTechnologyNodeMap_max_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  nodeId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_application_component_technology_node" */
export type ApplicationComponentTechnologyNodeMap_Max_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  nodeId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type ApplicationComponentTechnologyNodeMap_Min_Fields = {
  __typename?: 'ApplicationComponentTechnologyNodeMap_min_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  nodeId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_application_component_technology_node" */
export type ApplicationComponentTechnologyNodeMap_Min_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  nodeId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "map_application_component_technology_node" */
export type ApplicationComponentTechnologyNodeMap_Mutation_Response = {
  __typename?: 'ApplicationComponentTechnologyNodeMap_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<ApplicationComponentTechnologyNodeMap>;
};

/** on_conflict condition type for table "map_application_component_technology_node" */
export type ApplicationComponentTechnologyNodeMap_On_Conflict = {
  constraint: ApplicationComponentTechnologyNodeMap_Constraint;
  update_columns?: Array<ApplicationComponentTechnologyNodeMap_Update_Column>;
  where?: InputMaybe<ApplicationComponentTechnologyNodeMap_Bool_Exp>;
};

/** Ordering options when selecting data from "map_application_component_technology_node". */
export type ApplicationComponentTechnologyNodeMap_Order_By = {
  component?: InputMaybe<ApplicationComponent_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  node?: InputMaybe<TechnologyNode_Order_By>;
  nodeId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_application_component_technology_node */
export type ApplicationComponentTechnologyNodeMap_Pk_Columns_Input = {
  componentId: Scalars['uuid']['input'];
  nodeId: Scalars['uuid']['input'];
};

/** select columns of table "map_application_component_technology_node" */
export enum ApplicationComponentTechnologyNodeMap_Select_Column {
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  NodeId = 'nodeId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "map_application_component_technology_node" */
export type ApplicationComponentTechnologyNodeMap_Set_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  nodeId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "ApplicationComponentTechnologyNodeMap" */
export type ApplicationComponentTechnologyNodeMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: ApplicationComponentTechnologyNodeMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ApplicationComponentTechnologyNodeMap_Stream_Cursor_Value_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  nodeId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "map_application_component_technology_node" */
export enum ApplicationComponentTechnologyNodeMap_Update_Column {
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  NodeId = 'nodeId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type ApplicationComponentTechnologyNodeMap_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<ApplicationComponentTechnologyNodeMap_Set_Input>;
  /** filter the rows which have to be updated */
  where: ApplicationComponentTechnologyNodeMap_Bool_Exp;
};

/** aggregated selection of "components" */
export type ApplicationComponent_Aggregate = {
  __typename?: 'ApplicationComponent_aggregate';
  aggregate?: Maybe<ApplicationComponent_Aggregate_Fields>;
  nodes: Array<ApplicationComponent>;
};

export type ApplicationComponent_Aggregate_Bool_Exp = {
  count?: InputMaybe<ApplicationComponent_Aggregate_Bool_Exp_Count>;
};

export type ApplicationComponent_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<ApplicationComponent_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ApplicationComponent_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "components" */
export type ApplicationComponent_Aggregate_Fields = {
  __typename?: 'ApplicationComponent_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<ApplicationComponent_Max_Fields>;
  min?: Maybe<ApplicationComponent_Min_Fields>;
};


/** aggregate fields of "components" */
export type ApplicationComponent_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ApplicationComponent_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "components" */
export type ApplicationComponent_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ApplicationComponent_Max_Order_By>;
  min?: InputMaybe<ApplicationComponent_Min_Order_By>;
};

/** input type for inserting array relation for remote table "components" */
export type ApplicationComponent_Arr_Rel_Insert_Input = {
  data: Array<ApplicationComponent_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ApplicationComponent_On_Conflict>;
};

/** Boolean expression to filter rows from the table "components". All fields are combined with a logical 'AND'. */
export type ApplicationComponent_Bool_Exp = {
  _and?: InputMaybe<Array<ApplicationComponent_Bool_Exp>>;
  _not?: InputMaybe<ApplicationComponent_Bool_Exp>;
  _or?: InputMaybe<Array<ApplicationComponent_Bool_Exp>>;
  child?: InputMaybe<ApplicationComponentHierarchyMap_Bool_Exp>;
  child_aggregate?: InputMaybe<ApplicationComponentHierarchyMap_Aggregate_Bool_Exp>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  criticalLevel?: InputMaybe<DirectoryObject_Bool_Exp>;
  criticalLevelId?: InputMaybe<Uuid_Comparison_Exp>;
  dataObjects?: InputMaybe<ApplicationComponentDataObjectMap_Bool_Exp>;
  dataObjectsInFunctions?: InputMaybe<ApplicationFunctionDataObjectMap_Bool_Exp>;
  dataObjectsInFunctions_aggregate?: InputMaybe<ApplicationFunctionDataObjectMap_Aggregate_Bool_Exp>;
  dataObjects_aggregate?: InputMaybe<ApplicationComponentDataObjectMap_Aggregate_Bool_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  events?: InputMaybe<ApplicationComponentEventMap_Bool_Exp>;
  events_aggregate?: InputMaybe<ApplicationComponentEventMap_Aggregate_Bool_Exp>;
  failoverType?: InputMaybe<DirectoryObject_Bool_Exp>;
  failoverTypeId?: InputMaybe<Uuid_Comparison_Exp>;
  functions?: InputMaybe<ApplicationComponentFunctionMap_Bool_Exp>;
  functions_aggregate?: InputMaybe<ApplicationComponentFunctionMap_Aggregate_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  interfaces?: InputMaybe<ApplicationComponentInterfaceMap_Bool_Exp>;
  interfaces_aggregate?: InputMaybe<ApplicationComponentInterfaceMap_Aggregate_Bool_Exp>;
  licenseType?: InputMaybe<DirectoryObject_Bool_Exp>;
  licenseTypeId?: InputMaybe<Uuid_Comparison_Exp>;
  monitoringLevel?: InputMaybe<DirectoryObject_Bool_Exp>;
  monitoringLevelId?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  networks?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_Bool_Exp>;
  networks_aggregate?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_Aggregate_Bool_Exp>;
  nodes?: InputMaybe<ApplicationComponentTechnologyNodeMap_Bool_Exp>;
  nodes_aggregate?: InputMaybe<ApplicationComponentTechnologyNodeMap_Aggregate_Bool_Exp>;
  parent?: InputMaybe<ApplicationComponentHierarchyMap_Bool_Exp>;
  parent_aggregate?: InputMaybe<ApplicationComponentHierarchyMap_Aggregate_Bool_Exp>;
  products?: InputMaybe<ApplicationComponentProductMap_Bool_Exp>;
  products_aggregate?: InputMaybe<ApplicationComponentProductMap_Aggregate_Bool_Exp>;
  recoveryTime?: InputMaybe<DirectoryObject_Bool_Exp>;
  recoveryTimeId?: InputMaybe<Uuid_Comparison_Exp>;
  redundancyType?: InputMaybe<DirectoryObject_Bool_Exp>;
  redundancyTypeId?: InputMaybe<Uuid_Comparison_Exp>;
  scalingType?: InputMaybe<DirectoryObject_Bool_Exp>;
  scalingTypeId?: InputMaybe<Uuid_Comparison_Exp>;
  solutions?: InputMaybe<SolutionApplicationComponentMap_Bool_Exp>;
  solutions_aggregate?: InputMaybe<SolutionApplicationComponentMap_Aggregate_Bool_Exp>;
  sourceComponent?: InputMaybe<FlowGeneric_Bool_Exp>;
  sourceComponent_aggregate?: InputMaybe<FlowGeneric_Aggregate_Bool_Exp>;
  stakeholders?: InputMaybe<ApplicationComponentStakeholderMap_Bool_Exp>;
  stakeholders_aggregate?: InputMaybe<ApplicationComponentStakeholderMap_Aggregate_Bool_Exp>;
  state?: InputMaybe<DirectoryObject_Bool_Exp>;
  stateId?: InputMaybe<Uuid_Comparison_Exp>;
  style?: InputMaybe<DirectoryObject_Bool_Exp>;
  styleId?: InputMaybe<Uuid_Comparison_Exp>;
  systemSoftware?: InputMaybe<ApplicationComponentSystemSoftwareMap_Bool_Exp>;
  systemSoftware_aggregate?: InputMaybe<ApplicationComponentSystemSoftwareMap_Aggregate_Bool_Exp>;
  targetComponent?: InputMaybe<FlowGeneric_Bool_Exp>;
  targetComponent_aggregate?: InputMaybe<FlowGeneric_Aggregate_Bool_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "components" */
export enum ApplicationComponent_Constraint {
  /** unique or primary key constraint on columns "code" */
  ComponentsCodeUnique = 'components_code_unique',
  /** unique or primary key constraint on columns "id" */
  ComponentsPkey = 'components_pkey'
}

/** input type for inserting data into table "components" */
export type ApplicationComponent_Insert_Input = {
  child?: InputMaybe<ApplicationComponentHierarchyMap_Arr_Rel_Insert_Input>;
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  criticalLevel?: InputMaybe<DirectoryObject_Obj_Rel_Insert_Input>;
  criticalLevelId?: InputMaybe<Scalars['uuid']['input']>;
  dataObjects?: InputMaybe<ApplicationComponentDataObjectMap_Arr_Rel_Insert_Input>;
  dataObjectsInFunctions?: InputMaybe<ApplicationFunctionDataObjectMap_Arr_Rel_Insert_Input>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  events?: InputMaybe<ApplicationComponentEventMap_Arr_Rel_Insert_Input>;
  failoverType?: InputMaybe<DirectoryObject_Obj_Rel_Insert_Input>;
  failoverTypeId?: InputMaybe<Scalars['uuid']['input']>;
  functions?: InputMaybe<ApplicationComponentFunctionMap_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  interfaces?: InputMaybe<ApplicationComponentInterfaceMap_Arr_Rel_Insert_Input>;
  licenseType?: InputMaybe<DirectoryObject_Obj_Rel_Insert_Input>;
  licenseTypeId?: InputMaybe<Scalars['uuid']['input']>;
  monitoringLevel?: InputMaybe<DirectoryObject_Obj_Rel_Insert_Input>;
  monitoringLevelId?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  networks?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_Arr_Rel_Insert_Input>;
  nodes?: InputMaybe<ApplicationComponentTechnologyNodeMap_Arr_Rel_Insert_Input>;
  parent?: InputMaybe<ApplicationComponentHierarchyMap_Arr_Rel_Insert_Input>;
  products?: InputMaybe<ApplicationComponentProductMap_Arr_Rel_Insert_Input>;
  recoveryTime?: InputMaybe<DirectoryObject_Obj_Rel_Insert_Input>;
  recoveryTimeId?: InputMaybe<Scalars['uuid']['input']>;
  redundancyType?: InputMaybe<DirectoryObject_Obj_Rel_Insert_Input>;
  redundancyTypeId?: InputMaybe<Scalars['uuid']['input']>;
  scalingType?: InputMaybe<DirectoryObject_Obj_Rel_Insert_Input>;
  scalingTypeId?: InputMaybe<Scalars['uuid']['input']>;
  solutions?: InputMaybe<SolutionApplicationComponentMap_Arr_Rel_Insert_Input>;
  sourceComponent?: InputMaybe<FlowGeneric_Arr_Rel_Insert_Input>;
  stakeholders?: InputMaybe<ApplicationComponentStakeholderMap_Arr_Rel_Insert_Input>;
  state?: InputMaybe<DirectoryObject_Obj_Rel_Insert_Input>;
  stateId?: InputMaybe<Scalars['uuid']['input']>;
  style?: InputMaybe<DirectoryObject_Obj_Rel_Insert_Input>;
  styleId?: InputMaybe<Scalars['uuid']['input']>;
  systemSoftware?: InputMaybe<ApplicationComponentSystemSoftwareMap_Arr_Rel_Insert_Input>;
  targetComponent?: InputMaybe<FlowGeneric_Arr_Rel_Insert_Input>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type ApplicationComponent_Max_Fields = {
  __typename?: 'ApplicationComponent_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  criticalLevelId?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  failoverTypeId?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  licenseTypeId?: Maybe<Scalars['uuid']['output']>;
  monitoringLevelId?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  recoveryTimeId?: Maybe<Scalars['uuid']['output']>;
  redundancyTypeId?: Maybe<Scalars['uuid']['output']>;
  scalingTypeId?: Maybe<Scalars['uuid']['output']>;
  stateId?: Maybe<Scalars['uuid']['output']>;
  styleId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "components" */
export type ApplicationComponent_Max_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  criticalLevelId?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  failoverTypeId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  licenseTypeId?: InputMaybe<Order_By>;
  monitoringLevelId?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  recoveryTimeId?: InputMaybe<Order_By>;
  redundancyTypeId?: InputMaybe<Order_By>;
  scalingTypeId?: InputMaybe<Order_By>;
  stateId?: InputMaybe<Order_By>;
  styleId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type ApplicationComponent_Min_Fields = {
  __typename?: 'ApplicationComponent_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  criticalLevelId?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  failoverTypeId?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  licenseTypeId?: Maybe<Scalars['uuid']['output']>;
  monitoringLevelId?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  recoveryTimeId?: Maybe<Scalars['uuid']['output']>;
  redundancyTypeId?: Maybe<Scalars['uuid']['output']>;
  scalingTypeId?: Maybe<Scalars['uuid']['output']>;
  stateId?: Maybe<Scalars['uuid']['output']>;
  styleId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "components" */
export type ApplicationComponent_Min_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  criticalLevelId?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  failoverTypeId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  licenseTypeId?: InputMaybe<Order_By>;
  monitoringLevelId?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  recoveryTimeId?: InputMaybe<Order_By>;
  redundancyTypeId?: InputMaybe<Order_By>;
  scalingTypeId?: InputMaybe<Order_By>;
  stateId?: InputMaybe<Order_By>;
  styleId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "components" */
export type ApplicationComponent_Mutation_Response = {
  __typename?: 'ApplicationComponent_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<ApplicationComponent>;
};

/** input type for inserting object relation for remote table "components" */
export type ApplicationComponent_Obj_Rel_Insert_Input = {
  data: ApplicationComponent_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<ApplicationComponent_On_Conflict>;
};

/** on_conflict condition type for table "components" */
export type ApplicationComponent_On_Conflict = {
  constraint: ApplicationComponent_Constraint;
  update_columns?: Array<ApplicationComponent_Update_Column>;
  where?: InputMaybe<ApplicationComponent_Bool_Exp>;
};

/** Ordering options when selecting data from "components". */
export type ApplicationComponent_Order_By = {
  child_aggregate?: InputMaybe<ApplicationComponentHierarchyMap_Aggregate_Order_By>;
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  criticalLevel?: InputMaybe<DirectoryObject_Order_By>;
  criticalLevelId?: InputMaybe<Order_By>;
  dataObjectsInFunctions_aggregate?: InputMaybe<ApplicationFunctionDataObjectMap_Aggregate_Order_By>;
  dataObjects_aggregate?: InputMaybe<ApplicationComponentDataObjectMap_Aggregate_Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  events_aggregate?: InputMaybe<ApplicationComponentEventMap_Aggregate_Order_By>;
  failoverType?: InputMaybe<DirectoryObject_Order_By>;
  failoverTypeId?: InputMaybe<Order_By>;
  functions_aggregate?: InputMaybe<ApplicationComponentFunctionMap_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  interfaces_aggregate?: InputMaybe<ApplicationComponentInterfaceMap_Aggregate_Order_By>;
  licenseType?: InputMaybe<DirectoryObject_Order_By>;
  licenseTypeId?: InputMaybe<Order_By>;
  monitoringLevel?: InputMaybe<DirectoryObject_Order_By>;
  monitoringLevelId?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  networks_aggregate?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_Aggregate_Order_By>;
  nodes_aggregate?: InputMaybe<ApplicationComponentTechnologyNodeMap_Aggregate_Order_By>;
  parent_aggregate?: InputMaybe<ApplicationComponentHierarchyMap_Aggregate_Order_By>;
  products_aggregate?: InputMaybe<ApplicationComponentProductMap_Aggregate_Order_By>;
  recoveryTime?: InputMaybe<DirectoryObject_Order_By>;
  recoveryTimeId?: InputMaybe<Order_By>;
  redundancyType?: InputMaybe<DirectoryObject_Order_By>;
  redundancyTypeId?: InputMaybe<Order_By>;
  scalingType?: InputMaybe<DirectoryObject_Order_By>;
  scalingTypeId?: InputMaybe<Order_By>;
  solutions_aggregate?: InputMaybe<SolutionApplicationComponentMap_Aggregate_Order_By>;
  sourceComponent_aggregate?: InputMaybe<FlowGeneric_Aggregate_Order_By>;
  stakeholders_aggregate?: InputMaybe<ApplicationComponentStakeholderMap_Aggregate_Order_By>;
  state?: InputMaybe<DirectoryObject_Order_By>;
  stateId?: InputMaybe<Order_By>;
  style?: InputMaybe<DirectoryObject_Order_By>;
  styleId?: InputMaybe<Order_By>;
  systemSoftware_aggregate?: InputMaybe<ApplicationComponentSystemSoftwareMap_Aggregate_Order_By>;
  targetComponent_aggregate?: InputMaybe<FlowGeneric_Aggregate_Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: components */
export type ApplicationComponent_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "components" */
export enum ApplicationComponent_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  CriticalLevelId = 'criticalLevelId',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  FailoverTypeId = 'failoverTypeId',
  /** column name */
  Id = 'id',
  /** column name */
  LicenseTypeId = 'licenseTypeId',
  /** column name */
  MonitoringLevelId = 'monitoringLevelId',
  /** column name */
  Name = 'name',
  /** column name */
  RecoveryTimeId = 'recoveryTimeId',
  /** column name */
  RedundancyTypeId = 'redundancyTypeId',
  /** column name */
  ScalingTypeId = 'scalingTypeId',
  /** column name */
  StateId = 'stateId',
  /** column name */
  StyleId = 'styleId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "components" */
export type ApplicationComponent_Set_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  criticalLevelId?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  failoverTypeId?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  licenseTypeId?: InputMaybe<Scalars['uuid']['input']>;
  monitoringLevelId?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  recoveryTimeId?: InputMaybe<Scalars['uuid']['input']>;
  redundancyTypeId?: InputMaybe<Scalars['uuid']['input']>;
  scalingTypeId?: InputMaybe<Scalars['uuid']['input']>;
  stateId?: InputMaybe<Scalars['uuid']['input']>;
  styleId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "ApplicationComponent" */
export type ApplicationComponent_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: ApplicationComponent_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ApplicationComponent_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  criticalLevelId?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  failoverTypeId?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  licenseTypeId?: InputMaybe<Scalars['uuid']['input']>;
  monitoringLevelId?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  recoveryTimeId?: InputMaybe<Scalars['uuid']['input']>;
  redundancyTypeId?: InputMaybe<Scalars['uuid']['input']>;
  scalingTypeId?: InputMaybe<Scalars['uuid']['input']>;
  stateId?: InputMaybe<Scalars['uuid']['input']>;
  styleId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "components" */
export enum ApplicationComponent_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  CriticalLevelId = 'criticalLevelId',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  FailoverTypeId = 'failoverTypeId',
  /** column name */
  Id = 'id',
  /** column name */
  LicenseTypeId = 'licenseTypeId',
  /** column name */
  MonitoringLevelId = 'monitoringLevelId',
  /** column name */
  Name = 'name',
  /** column name */
  RecoveryTimeId = 'recoveryTimeId',
  /** column name */
  RedundancyTypeId = 'redundancyTypeId',
  /** column name */
  ScalingTypeId = 'scalingTypeId',
  /** column name */
  StateId = 'stateId',
  /** column name */
  StyleId = 'styleId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type ApplicationComponent_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<ApplicationComponent_Set_Input>;
  /** filter the rows which have to be updated */
  where: ApplicationComponent_Bool_Exp;
};

/** columns and relationships of "map_application_function_data_object" */
export type ApplicationFunctionDataObjectMap = {
  __typename?: 'ApplicationFunctionDataObjectMap';
  accessKind: Scalars['data_access_kind_enum']['output'];
  /** An object relationship */
  component: ApplicationComponent;
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  dataObject: DataObject;
  dataObjectId: Scalars['uuid']['output'];
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  functionId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_application_function_data_object" */
export type ApplicationFunctionDataObjectMap_Aggregate = {
  __typename?: 'ApplicationFunctionDataObjectMap_aggregate';
  aggregate?: Maybe<ApplicationFunctionDataObjectMap_Aggregate_Fields>;
  nodes: Array<ApplicationFunctionDataObjectMap>;
};

export type ApplicationFunctionDataObjectMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<ApplicationFunctionDataObjectMap_Aggregate_Bool_Exp_Count>;
};

export type ApplicationFunctionDataObjectMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ApplicationFunctionDataObjectMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_application_function_data_object" */
export type ApplicationFunctionDataObjectMap_Aggregate_Fields = {
  __typename?: 'ApplicationFunctionDataObjectMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<ApplicationFunctionDataObjectMap_Max_Fields>;
  min?: Maybe<ApplicationFunctionDataObjectMap_Min_Fields>;
};


/** aggregate fields of "map_application_function_data_object" */
export type ApplicationFunctionDataObjectMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_application_function_data_object" */
export type ApplicationFunctionDataObjectMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ApplicationFunctionDataObjectMap_Max_Order_By>;
  min?: InputMaybe<ApplicationFunctionDataObjectMap_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_application_function_data_object" */
export type ApplicationFunctionDataObjectMap_Arr_Rel_Insert_Input = {
  data: Array<ApplicationFunctionDataObjectMap_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ApplicationFunctionDataObjectMap_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_application_function_data_object". All fields are combined with a logical 'AND'. */
export type ApplicationFunctionDataObjectMap_Bool_Exp = {
  _and?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Bool_Exp>>;
  _not?: InputMaybe<ApplicationFunctionDataObjectMap_Bool_Exp>;
  _or?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Bool_Exp>>;
  accessKind?: InputMaybe<Data_Access_Kind_Enum_Comparison_Exp>;
  component?: InputMaybe<ApplicationComponent_Bool_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  dataObject?: InputMaybe<DataObject_Bool_Exp>;
  dataObjectId?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  functionId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_application_function_data_object" */
export enum ApplicationFunctionDataObjectMap_Constraint {
  /** unique or primary key constraint on columns "data_object_id", "component_id", "function_id" */
  MapApplicationFunctionDataObjectPkey = 'map_application_function_data_object_pkey'
}

/** input type for inserting data into table "map_application_function_data_object" */
export type ApplicationFunctionDataObjectMap_Insert_Input = {
  accessKind?: InputMaybe<Scalars['data_access_kind_enum']['input']>;
  component?: InputMaybe<ApplicationComponent_Obj_Rel_Insert_Input>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  dataObject?: InputMaybe<DataObject_Obj_Rel_Insert_Input>;
  dataObjectId?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  functionId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type ApplicationFunctionDataObjectMap_Max_Fields = {
  __typename?: 'ApplicationFunctionDataObjectMap_max_fields';
  accessKind?: Maybe<Scalars['data_access_kind_enum']['output']>;
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  dataObjectId?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  functionId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_application_function_data_object" */
export type ApplicationFunctionDataObjectMap_Max_Order_By = {
  accessKind?: InputMaybe<Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  dataObjectId?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  functionId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type ApplicationFunctionDataObjectMap_Min_Fields = {
  __typename?: 'ApplicationFunctionDataObjectMap_min_fields';
  accessKind?: Maybe<Scalars['data_access_kind_enum']['output']>;
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  dataObjectId?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  functionId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_application_function_data_object" */
export type ApplicationFunctionDataObjectMap_Min_Order_By = {
  accessKind?: InputMaybe<Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  dataObjectId?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  functionId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "map_application_function_data_object" */
export type ApplicationFunctionDataObjectMap_Mutation_Response = {
  __typename?: 'ApplicationFunctionDataObjectMap_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<ApplicationFunctionDataObjectMap>;
};

/** on_conflict condition type for table "map_application_function_data_object" */
export type ApplicationFunctionDataObjectMap_On_Conflict = {
  constraint: ApplicationFunctionDataObjectMap_Constraint;
  update_columns?: Array<ApplicationFunctionDataObjectMap_Update_Column>;
  where?: InputMaybe<ApplicationFunctionDataObjectMap_Bool_Exp>;
};

/** Ordering options when selecting data from "map_application_function_data_object". */
export type ApplicationFunctionDataObjectMap_Order_By = {
  accessKind?: InputMaybe<Order_By>;
  component?: InputMaybe<ApplicationComponent_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  dataObject?: InputMaybe<DataObject_Order_By>;
  dataObjectId?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  functionId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_application_function_data_object */
export type ApplicationFunctionDataObjectMap_Pk_Columns_Input = {
  componentId: Scalars['uuid']['input'];
  dataObjectId: Scalars['uuid']['input'];
  functionId: Scalars['uuid']['input'];
};

/** select columns of table "map_application_function_data_object" */
export enum ApplicationFunctionDataObjectMap_Select_Column {
  /** column name */
  AccessKind = 'accessKind',
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DataObjectId = 'dataObjectId',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  FunctionId = 'functionId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "map_application_function_data_object" */
export type ApplicationFunctionDataObjectMap_Set_Input = {
  accessKind?: InputMaybe<Scalars['data_access_kind_enum']['input']>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  dataObjectId?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  functionId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "ApplicationFunctionDataObjectMap" */
export type ApplicationFunctionDataObjectMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: ApplicationFunctionDataObjectMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ApplicationFunctionDataObjectMap_Stream_Cursor_Value_Input = {
  accessKind?: InputMaybe<Scalars['data_access_kind_enum']['input']>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  dataObjectId?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  functionId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "map_application_function_data_object" */
export enum ApplicationFunctionDataObjectMap_Update_Column {
  /** column name */
  AccessKind = 'accessKind',
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DataObjectId = 'dataObjectId',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  FunctionId = 'functionId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type ApplicationFunctionDataObjectMap_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<ApplicationFunctionDataObjectMap_Set_Input>;
  /** filter the rows which have to be updated */
  where: ApplicationFunctionDataObjectMap_Bool_Exp;
};

/** columns and relationships of "map_application_interface_function" */
export type ApplicationInterfaceFunctionMap = {
  __typename?: 'ApplicationInterfaceFunctionMap';
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  functionId: Scalars['uuid']['output'];
  /** An object relationship */
  interface: InterfaceGeneric;
  interfaceId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_application_interface_function" */
export type ApplicationInterfaceFunctionMap_Aggregate = {
  __typename?: 'ApplicationInterfaceFunctionMap_aggregate';
  aggregate?: Maybe<ApplicationInterfaceFunctionMap_Aggregate_Fields>;
  nodes: Array<ApplicationInterfaceFunctionMap>;
};

export type ApplicationInterfaceFunctionMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<ApplicationInterfaceFunctionMap_Aggregate_Bool_Exp_Count>;
};

export type ApplicationInterfaceFunctionMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<ApplicationInterfaceFunctionMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ApplicationInterfaceFunctionMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_application_interface_function" */
export type ApplicationInterfaceFunctionMap_Aggregate_Fields = {
  __typename?: 'ApplicationInterfaceFunctionMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<ApplicationInterfaceFunctionMap_Max_Fields>;
  min?: Maybe<ApplicationInterfaceFunctionMap_Min_Fields>;
};


/** aggregate fields of "map_application_interface_function" */
export type ApplicationInterfaceFunctionMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ApplicationInterfaceFunctionMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_application_interface_function" */
export type ApplicationInterfaceFunctionMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ApplicationInterfaceFunctionMap_Max_Order_By>;
  min?: InputMaybe<ApplicationInterfaceFunctionMap_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_application_interface_function" */
export type ApplicationInterfaceFunctionMap_Arr_Rel_Insert_Input = {
  data: Array<ApplicationInterfaceFunctionMap_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ApplicationInterfaceFunctionMap_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_application_interface_function". All fields are combined with a logical 'AND'. */
export type ApplicationInterfaceFunctionMap_Bool_Exp = {
  _and?: InputMaybe<Array<ApplicationInterfaceFunctionMap_Bool_Exp>>;
  _not?: InputMaybe<ApplicationInterfaceFunctionMap_Bool_Exp>;
  _or?: InputMaybe<Array<ApplicationInterfaceFunctionMap_Bool_Exp>>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  functionId?: InputMaybe<Uuid_Comparison_Exp>;
  interface?: InputMaybe<InterfaceGeneric_Bool_Exp>;
  interfaceId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_application_interface_function" */
export enum ApplicationInterfaceFunctionMap_Constraint {
  /** unique or primary key constraint on columns "interface_id", "component_id", "function_id" */
  MapApplicationInterfaceFunctionPkey = 'map_application_interface_function_pkey'
}

/** input type for inserting data into table "map_application_interface_function" */
export type ApplicationInterfaceFunctionMap_Insert_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  functionId?: InputMaybe<Scalars['uuid']['input']>;
  interface?: InputMaybe<InterfaceGeneric_Obj_Rel_Insert_Input>;
  interfaceId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type ApplicationInterfaceFunctionMap_Max_Fields = {
  __typename?: 'ApplicationInterfaceFunctionMap_max_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  functionId?: Maybe<Scalars['uuid']['output']>;
  interfaceId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_application_interface_function" */
export type ApplicationInterfaceFunctionMap_Max_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  functionId?: InputMaybe<Order_By>;
  interfaceId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type ApplicationInterfaceFunctionMap_Min_Fields = {
  __typename?: 'ApplicationInterfaceFunctionMap_min_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  functionId?: Maybe<Scalars['uuid']['output']>;
  interfaceId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_application_interface_function" */
export type ApplicationInterfaceFunctionMap_Min_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  functionId?: InputMaybe<Order_By>;
  interfaceId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "map_application_interface_function" */
export type ApplicationInterfaceFunctionMap_Mutation_Response = {
  __typename?: 'ApplicationInterfaceFunctionMap_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<ApplicationInterfaceFunctionMap>;
};

/** on_conflict condition type for table "map_application_interface_function" */
export type ApplicationInterfaceFunctionMap_On_Conflict = {
  constraint: ApplicationInterfaceFunctionMap_Constraint;
  update_columns?: Array<ApplicationInterfaceFunctionMap_Update_Column>;
  where?: InputMaybe<ApplicationInterfaceFunctionMap_Bool_Exp>;
};

/** Ordering options when selecting data from "map_application_interface_function". */
export type ApplicationInterfaceFunctionMap_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  functionId?: InputMaybe<Order_By>;
  interface?: InputMaybe<InterfaceGeneric_Order_By>;
  interfaceId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_application_interface_function */
export type ApplicationInterfaceFunctionMap_Pk_Columns_Input = {
  componentId: Scalars['uuid']['input'];
  functionId: Scalars['uuid']['input'];
  interfaceId: Scalars['uuid']['input'];
};

/** select columns of table "map_application_interface_function" */
export enum ApplicationInterfaceFunctionMap_Select_Column {
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  FunctionId = 'functionId',
  /** column name */
  InterfaceId = 'interfaceId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "map_application_interface_function" */
export type ApplicationInterfaceFunctionMap_Set_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  functionId?: InputMaybe<Scalars['uuid']['input']>;
  interfaceId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "ApplicationInterfaceFunctionMap" */
export type ApplicationInterfaceFunctionMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: ApplicationInterfaceFunctionMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ApplicationInterfaceFunctionMap_Stream_Cursor_Value_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  functionId?: InputMaybe<Scalars['uuid']['input']>;
  interfaceId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "map_application_interface_function" */
export enum ApplicationInterfaceFunctionMap_Update_Column {
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  FunctionId = 'functionId',
  /** column name */
  InterfaceId = 'interfaceId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type ApplicationInterfaceFunctionMap_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<ApplicationInterfaceFunctionMap_Set_Input>;
  /** filter the rows which have to be updated */
  where: ApplicationInterfaceFunctionMap_Bool_Exp;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** columns and relationships of "actors" */
export type BusinessActor = {
  __typename?: 'BusinessActor';
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  /** An array relationship */
  roles: Array<BusinessActorRoleMap>;
  /** An aggregate relationship */
  roles_aggregate: BusinessActorRoleMap_Aggregate;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "actors" */
export type BusinessActorRolesArgs = {
  distinct_on?: InputMaybe<Array<BusinessActorRoleMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessActorRoleMap_Order_By>>;
  where?: InputMaybe<BusinessActorRoleMap_Bool_Exp>;
};


/** columns and relationships of "actors" */
export type BusinessActorRoles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<BusinessActorRoleMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessActorRoleMap_Order_By>>;
  where?: InputMaybe<BusinessActorRoleMap_Bool_Exp>;
};

/** columns and relationships of "map_business_actor_role" */
export type BusinessActorRoleMap = {
  __typename?: 'BusinessActorRoleMap';
  /** An object relationship */
  actor: BusinessActor;
  actorId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  role: BusinessRole;
  roleId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_business_actor_role" */
export type BusinessActorRoleMap_Aggregate = {
  __typename?: 'BusinessActorRoleMap_aggregate';
  aggregate?: Maybe<BusinessActorRoleMap_Aggregate_Fields>;
  nodes: Array<BusinessActorRoleMap>;
};

export type BusinessActorRoleMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<BusinessActorRoleMap_Aggregate_Bool_Exp_Count>;
};

export type BusinessActorRoleMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<BusinessActorRoleMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<BusinessActorRoleMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_business_actor_role" */
export type BusinessActorRoleMap_Aggregate_Fields = {
  __typename?: 'BusinessActorRoleMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<BusinessActorRoleMap_Max_Fields>;
  min?: Maybe<BusinessActorRoleMap_Min_Fields>;
};


/** aggregate fields of "map_business_actor_role" */
export type BusinessActorRoleMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<BusinessActorRoleMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_business_actor_role" */
export type BusinessActorRoleMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<BusinessActorRoleMap_Max_Order_By>;
  min?: InputMaybe<BusinessActorRoleMap_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_business_actor_role" */
export type BusinessActorRoleMap_Arr_Rel_Insert_Input = {
  data: Array<BusinessActorRoleMap_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<BusinessActorRoleMap_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_business_actor_role". All fields are combined with a logical 'AND'. */
export type BusinessActorRoleMap_Bool_Exp = {
  _and?: InputMaybe<Array<BusinessActorRoleMap_Bool_Exp>>;
  _not?: InputMaybe<BusinessActorRoleMap_Bool_Exp>;
  _or?: InputMaybe<Array<BusinessActorRoleMap_Bool_Exp>>;
  actor?: InputMaybe<BusinessActor_Bool_Exp>;
  actorId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  role?: InputMaybe<BusinessRole_Bool_Exp>;
  roleId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_business_actor_role" */
export enum BusinessActorRoleMap_Constraint {
  /** unique or primary key constraint on columns "actor_id", "role_id" */
  MapBusinessActorRoleActorIdRoleIdUnique = 'map_business_actor_role_actor_id_role_id_unique',
  /** unique or primary key constraint on columns "actor_id", "role_id" */
  MapBusinessActorRolePkey = 'map_business_actor_role_pkey'
}

/** input type for inserting data into table "map_business_actor_role" */
export type BusinessActorRoleMap_Insert_Input = {
  actor?: InputMaybe<BusinessActor_Obj_Rel_Insert_Input>;
  actorId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  role?: InputMaybe<BusinessRole_Obj_Rel_Insert_Input>;
  roleId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type BusinessActorRoleMap_Max_Fields = {
  __typename?: 'BusinessActorRoleMap_max_fields';
  actorId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  roleId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_business_actor_role" */
export type BusinessActorRoleMap_Max_Order_By = {
  actorId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  roleId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type BusinessActorRoleMap_Min_Fields = {
  __typename?: 'BusinessActorRoleMap_min_fields';
  actorId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  roleId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_business_actor_role" */
export type BusinessActorRoleMap_Min_Order_By = {
  actorId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  roleId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "map_business_actor_role" */
export type BusinessActorRoleMap_Mutation_Response = {
  __typename?: 'BusinessActorRoleMap_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<BusinessActorRoleMap>;
};

/** on_conflict condition type for table "map_business_actor_role" */
export type BusinessActorRoleMap_On_Conflict = {
  constraint: BusinessActorRoleMap_Constraint;
  update_columns?: Array<BusinessActorRoleMap_Update_Column>;
  where?: InputMaybe<BusinessActorRoleMap_Bool_Exp>;
};

/** Ordering options when selecting data from "map_business_actor_role". */
export type BusinessActorRoleMap_Order_By = {
  actor?: InputMaybe<BusinessActor_Order_By>;
  actorId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  role?: InputMaybe<BusinessRole_Order_By>;
  roleId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_business_actor_role */
export type BusinessActorRoleMap_Pk_Columns_Input = {
  actorId: Scalars['uuid']['input'];
  roleId: Scalars['uuid']['input'];
};

/** select columns of table "map_business_actor_role" */
export enum BusinessActorRoleMap_Select_Column {
  /** column name */
  ActorId = 'actorId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  RoleId = 'roleId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "map_business_actor_role" */
export type BusinessActorRoleMap_Set_Input = {
  actorId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  roleId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "BusinessActorRoleMap" */
export type BusinessActorRoleMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: BusinessActorRoleMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BusinessActorRoleMap_Stream_Cursor_Value_Input = {
  actorId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  roleId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "map_business_actor_role" */
export enum BusinessActorRoleMap_Update_Column {
  /** column name */
  ActorId = 'actorId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  RoleId = 'roleId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type BusinessActorRoleMap_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<BusinessActorRoleMap_Set_Input>;
  /** filter the rows which have to be updated */
  where: BusinessActorRoleMap_Bool_Exp;
};

/** aggregated selection of "actors" */
export type BusinessActor_Aggregate = {
  __typename?: 'BusinessActor_aggregate';
  aggregate?: Maybe<BusinessActor_Aggregate_Fields>;
  nodes: Array<BusinessActor>;
};

/** aggregate fields of "actors" */
export type BusinessActor_Aggregate_Fields = {
  __typename?: 'BusinessActor_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<BusinessActor_Max_Fields>;
  min?: Maybe<BusinessActor_Min_Fields>;
};


/** aggregate fields of "actors" */
export type BusinessActor_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<BusinessActor_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "actors". All fields are combined with a logical 'AND'. */
export type BusinessActor_Bool_Exp = {
  _and?: InputMaybe<Array<BusinessActor_Bool_Exp>>;
  _not?: InputMaybe<BusinessActor_Bool_Exp>;
  _or?: InputMaybe<Array<BusinessActor_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  roles?: InputMaybe<BusinessActorRoleMap_Bool_Exp>;
  roles_aggregate?: InputMaybe<BusinessActorRoleMap_Aggregate_Bool_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "actors" */
export enum BusinessActor_Constraint {
  /** unique or primary key constraint on columns "code" */
  ActorsCodeUnique = 'actors_code_unique',
  /** unique or primary key constraint on columns "id" */
  ActorsPkey = 'actors_pkey'
}

/** input type for inserting data into table "actors" */
export type BusinessActor_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<BusinessActorRoleMap_Arr_Rel_Insert_Input>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type BusinessActor_Max_Fields = {
  __typename?: 'BusinessActor_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type BusinessActor_Min_Fields = {
  __typename?: 'BusinessActor_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "actors" */
export type BusinessActor_Mutation_Response = {
  __typename?: 'BusinessActor_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<BusinessActor>;
};

/** input type for inserting object relation for remote table "actors" */
export type BusinessActor_Obj_Rel_Insert_Input = {
  data: BusinessActor_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<BusinessActor_On_Conflict>;
};

/** on_conflict condition type for table "actors" */
export type BusinessActor_On_Conflict = {
  constraint: BusinessActor_Constraint;
  update_columns?: Array<BusinessActor_Update_Column>;
  where?: InputMaybe<BusinessActor_Bool_Exp>;
};

/** Ordering options when selecting data from "actors". */
export type BusinessActor_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  roles_aggregate?: InputMaybe<BusinessActorRoleMap_Aggregate_Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: actors */
export type BusinessActor_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "actors" */
export enum BusinessActor_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "actors" */
export type BusinessActor_Set_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "BusinessActor" */
export type BusinessActor_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: BusinessActor_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BusinessActor_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "actors" */
export enum BusinessActor_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type BusinessActor_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<BusinessActor_Set_Input>;
  /** filter the rows which have to be updated */
  where: BusinessActor_Bool_Exp;
};

/** columns and relationships of "products" */
export type BusinessProduct = {
  __typename?: 'BusinessProduct';
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  ownerId?: Maybe<Scalars['uuid']['output']>;
  /** An array relationship */
  products: Array<ApplicationComponentProductMap>;
  /** An aggregate relationship */
  products_aggregate: ApplicationComponentProductMap_Aggregate;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "products" */
export type BusinessProductProductsArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentProductMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentProductMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentProductMap_Bool_Exp>;
};


/** columns and relationships of "products" */
export type BusinessProductProducts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentProductMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentProductMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentProductMap_Bool_Exp>;
};

/** aggregated selection of "products" */
export type BusinessProduct_Aggregate = {
  __typename?: 'BusinessProduct_aggregate';
  aggregate?: Maybe<BusinessProduct_Aggregate_Fields>;
  nodes: Array<BusinessProduct>;
};

/** aggregate fields of "products" */
export type BusinessProduct_Aggregate_Fields = {
  __typename?: 'BusinessProduct_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<BusinessProduct_Max_Fields>;
  min?: Maybe<BusinessProduct_Min_Fields>;
};


/** aggregate fields of "products" */
export type BusinessProduct_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<BusinessProduct_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "products". All fields are combined with a logical 'AND'. */
export type BusinessProduct_Bool_Exp = {
  _and?: InputMaybe<Array<BusinessProduct_Bool_Exp>>;
  _not?: InputMaybe<BusinessProduct_Bool_Exp>;
  _or?: InputMaybe<Array<BusinessProduct_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  ownerId?: InputMaybe<Uuid_Comparison_Exp>;
  products?: InputMaybe<ApplicationComponentProductMap_Bool_Exp>;
  products_aggregate?: InputMaybe<ApplicationComponentProductMap_Aggregate_Bool_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "products" */
export enum BusinessProduct_Constraint {
  /** unique or primary key constraint on columns "code" */
  ProductsCodeUnique = 'products_code_unique',
  /** unique or primary key constraint on columns "id" */
  ProductsPkey = 'products_pkey'
}

/** input type for inserting data into table "products" */
export type BusinessProduct_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  products?: InputMaybe<ApplicationComponentProductMap_Arr_Rel_Insert_Input>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type BusinessProduct_Max_Fields = {
  __typename?: 'BusinessProduct_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type BusinessProduct_Min_Fields = {
  __typename?: 'BusinessProduct_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "products" */
export type BusinessProduct_Mutation_Response = {
  __typename?: 'BusinessProduct_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<BusinessProduct>;
};

/** input type for inserting object relation for remote table "products" */
export type BusinessProduct_Obj_Rel_Insert_Input = {
  data: BusinessProduct_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<BusinessProduct_On_Conflict>;
};

/** on_conflict condition type for table "products" */
export type BusinessProduct_On_Conflict = {
  constraint: BusinessProduct_Constraint;
  update_columns?: Array<BusinessProduct_Update_Column>;
  where?: InputMaybe<BusinessProduct_Bool_Exp>;
};

/** Ordering options when selecting data from "products". */
export type BusinessProduct_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  ownerId?: InputMaybe<Order_By>;
  products_aggregate?: InputMaybe<ApplicationComponentProductMap_Aggregate_Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: products */
export type BusinessProduct_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "products" */
export enum BusinessProduct_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'ownerId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "products" */
export type BusinessProduct_Set_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "BusinessProduct" */
export type BusinessProduct_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: BusinessProduct_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BusinessProduct_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "products" */
export enum BusinessProduct_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'ownerId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type BusinessProduct_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<BusinessProduct_Set_Input>;
  /** filter the rows which have to be updated */
  where: BusinessProduct_Bool_Exp;
};

/** columns and relationships of "roles" */
export type BusinessRole = {
  __typename?: 'BusinessRole';
  /** An array relationship */
  actors: Array<BusinessActorRoleMap>;
  /** An aggregate relationship */
  actors_aggregate: BusinessActorRoleMap_Aggregate;
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "roles" */
export type BusinessRoleActorsArgs = {
  distinct_on?: InputMaybe<Array<BusinessActorRoleMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessActorRoleMap_Order_By>>;
  where?: InputMaybe<BusinessActorRoleMap_Bool_Exp>;
};


/** columns and relationships of "roles" */
export type BusinessRoleActors_AggregateArgs = {
  distinct_on?: InputMaybe<Array<BusinessActorRoleMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessActorRoleMap_Order_By>>;
  where?: InputMaybe<BusinessActorRoleMap_Bool_Exp>;
};

/** aggregated selection of "roles" */
export type BusinessRole_Aggregate = {
  __typename?: 'BusinessRole_aggregate';
  aggregate?: Maybe<BusinessRole_Aggregate_Fields>;
  nodes: Array<BusinessRole>;
};

/** aggregate fields of "roles" */
export type BusinessRole_Aggregate_Fields = {
  __typename?: 'BusinessRole_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<BusinessRole_Max_Fields>;
  min?: Maybe<BusinessRole_Min_Fields>;
};


/** aggregate fields of "roles" */
export type BusinessRole_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<BusinessRole_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "roles". All fields are combined with a logical 'AND'. */
export type BusinessRole_Bool_Exp = {
  _and?: InputMaybe<Array<BusinessRole_Bool_Exp>>;
  _not?: InputMaybe<BusinessRole_Bool_Exp>;
  _or?: InputMaybe<Array<BusinessRole_Bool_Exp>>;
  actors?: InputMaybe<BusinessActorRoleMap_Bool_Exp>;
  actors_aggregate?: InputMaybe<BusinessActorRoleMap_Aggregate_Bool_Exp>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  ownerId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "roles" */
export enum BusinessRole_Constraint {
  /** unique or primary key constraint on columns "code" */
  RolesCodeUnique = 'roles_code_unique',
  /** unique or primary key constraint on columns "id" */
  RolesPkey = 'roles_pkey'
}

/** input type for inserting data into table "roles" */
export type BusinessRole_Insert_Input = {
  actors?: InputMaybe<BusinessActorRoleMap_Arr_Rel_Insert_Input>;
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type BusinessRole_Max_Fields = {
  __typename?: 'BusinessRole_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type BusinessRole_Min_Fields = {
  __typename?: 'BusinessRole_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "roles" */
export type BusinessRole_Mutation_Response = {
  __typename?: 'BusinessRole_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<BusinessRole>;
};

/** input type for inserting object relation for remote table "roles" */
export type BusinessRole_Obj_Rel_Insert_Input = {
  data: BusinessRole_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<BusinessRole_On_Conflict>;
};

/** on_conflict condition type for table "roles" */
export type BusinessRole_On_Conflict = {
  constraint: BusinessRole_Constraint;
  update_columns?: Array<BusinessRole_Update_Column>;
  where?: InputMaybe<BusinessRole_Bool_Exp>;
};

/** Ordering options when selecting data from "roles". */
export type BusinessRole_Order_By = {
  actors_aggregate?: InputMaybe<BusinessActorRoleMap_Aggregate_Order_By>;
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  ownerId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: roles */
export type BusinessRole_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "roles" */
export enum BusinessRole_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'ownerId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "roles" */
export type BusinessRole_Set_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "BusinessRole" */
export type BusinessRole_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: BusinessRole_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BusinessRole_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "roles" */
export enum BusinessRole_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'ownerId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type BusinessRole_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<BusinessRole_Set_Input>;
  /** filter the rows which have to be updated */
  where: BusinessRole_Bool_Exp;
};

/** columns and relationships of "capabilities" */
export type Capability = {
  __typename?: 'Capability';
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  /** An object relationship */
  parent?: Maybe<Capability>;
  parentId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "capabilities" */
export type Capability_Aggregate = {
  __typename?: 'Capability_aggregate';
  aggregate?: Maybe<Capability_Aggregate_Fields>;
  nodes: Array<Capability>;
};

/** aggregate fields of "capabilities" */
export type Capability_Aggregate_Fields = {
  __typename?: 'Capability_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Capability_Max_Fields>;
  min?: Maybe<Capability_Min_Fields>;
};


/** aggregate fields of "capabilities" */
export type Capability_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Capability_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "capabilities". All fields are combined with a logical 'AND'. */
export type Capability_Bool_Exp = {
  _and?: InputMaybe<Array<Capability_Bool_Exp>>;
  _not?: InputMaybe<Capability_Bool_Exp>;
  _or?: InputMaybe<Array<Capability_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  parent?: InputMaybe<Capability_Bool_Exp>;
  parentId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "capabilities" */
export enum Capability_Constraint {
  /** unique or primary key constraint on columns "code" */
  CapabilitiesCodeUnique = 'capabilities_code_unique',
  /** unique or primary key constraint on columns "id" */
  CapabilitiesPkey = 'capabilities_pkey'
}

/** input type for inserting data into table "capabilities" */
export type Capability_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Capability_Obj_Rel_Insert_Input>;
  parentId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Capability_Max_Fields = {
  __typename?: 'Capability_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parentId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type Capability_Min_Fields = {
  __typename?: 'Capability_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parentId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "capabilities" */
export type Capability_Mutation_Response = {
  __typename?: 'Capability_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Capability>;
};

/** input type for inserting object relation for remote table "capabilities" */
export type Capability_Obj_Rel_Insert_Input = {
  data: Capability_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Capability_On_Conflict>;
};

/** on_conflict condition type for table "capabilities" */
export type Capability_On_Conflict = {
  constraint: Capability_Constraint;
  update_columns?: Array<Capability_Update_Column>;
  where?: InputMaybe<Capability_Bool_Exp>;
};

/** Ordering options when selecting data from "capabilities". */
export type Capability_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  parent?: InputMaybe<Capability_Order_By>;
  parentId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: capabilities */
export type Capability_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "capabilities" */
export enum Capability_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  ParentId = 'parentId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "capabilities" */
export type Capability_Set_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "Capability" */
export type Capability_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Capability_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Capability_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "capabilities" */
export enum Capability_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  ParentId = 'parentId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type Capability_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Capability_Set_Input>;
  /** filter the rows which have to be updated */
  where: Capability_Bool_Exp;
};

/** columns and relationships of "data_objects" */
export type DataObject = {
  __typename?: 'DataObject';
  code: Scalars['String']['output'];
  /** An array relationship */
  components: Array<ApplicationComponentDataObjectMap>;
  /** An aggregate relationship */
  components_aggregate: ApplicationComponentDataObjectMap_Aggregate;
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
  /** An array relationship */
  useInFunctions: Array<ApplicationFunctionDataObjectMap>;
  /** An aggregate relationship */
  useInFunctions_aggregate: ApplicationFunctionDataObjectMap_Aggregate;
};


/** columns and relationships of "data_objects" */
export type DataObjectComponentsArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentDataObjectMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentDataObjectMap_Bool_Exp>;
};


/** columns and relationships of "data_objects" */
export type DataObjectComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentDataObjectMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentDataObjectMap_Bool_Exp>;
};


/** columns and relationships of "data_objects" */
export type DataObjectUseInFunctionsArgs = {
  distinct_on?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Order_By>>;
  where?: InputMaybe<ApplicationFunctionDataObjectMap_Bool_Exp>;
};


/** columns and relationships of "data_objects" */
export type DataObjectUseInFunctions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Order_By>>;
  where?: InputMaybe<ApplicationFunctionDataObjectMap_Bool_Exp>;
};

/** aggregated selection of "data_objects" */
export type DataObject_Aggregate = {
  __typename?: 'DataObject_aggregate';
  aggregate?: Maybe<DataObject_Aggregate_Fields>;
  nodes: Array<DataObject>;
};

/** aggregate fields of "data_objects" */
export type DataObject_Aggregate_Fields = {
  __typename?: 'DataObject_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<DataObject_Max_Fields>;
  min?: Maybe<DataObject_Min_Fields>;
};


/** aggregate fields of "data_objects" */
export type DataObject_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<DataObject_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "data_objects". All fields are combined with a logical 'AND'. */
export type DataObject_Bool_Exp = {
  _and?: InputMaybe<Array<DataObject_Bool_Exp>>;
  _not?: InputMaybe<DataObject_Bool_Exp>;
  _or?: InputMaybe<Array<DataObject_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  components?: InputMaybe<ApplicationComponentDataObjectMap_Bool_Exp>;
  components_aggregate?: InputMaybe<ApplicationComponentDataObjectMap_Aggregate_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  ownerId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
  useInFunctions?: InputMaybe<ApplicationFunctionDataObjectMap_Bool_Exp>;
  useInFunctions_aggregate?: InputMaybe<ApplicationFunctionDataObjectMap_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "data_objects" */
export enum DataObject_Constraint {
  /** unique or primary key constraint on columns "code" */
  DataObjectsCodeUnique = 'data_objects_code_unique',
  /** unique or primary key constraint on columns "id" */
  DataObjectsPkey = 'data_objects_pkey'
}

/** input type for inserting data into table "data_objects" */
export type DataObject_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  components?: InputMaybe<ApplicationComponentDataObjectMap_Arr_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
  useInFunctions?: InputMaybe<ApplicationFunctionDataObjectMap_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type DataObject_Max_Fields = {
  __typename?: 'DataObject_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type DataObject_Min_Fields = {
  __typename?: 'DataObject_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "data_objects" */
export type DataObject_Mutation_Response = {
  __typename?: 'DataObject_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<DataObject>;
};

/** input type for inserting object relation for remote table "data_objects" */
export type DataObject_Obj_Rel_Insert_Input = {
  data: DataObject_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<DataObject_On_Conflict>;
};

/** on_conflict condition type for table "data_objects" */
export type DataObject_On_Conflict = {
  constraint: DataObject_Constraint;
  update_columns?: Array<DataObject_Update_Column>;
  where?: InputMaybe<DataObject_Bool_Exp>;
};

/** Ordering options when selecting data from "data_objects". */
export type DataObject_Order_By = {
  code?: InputMaybe<Order_By>;
  components_aggregate?: InputMaybe<ApplicationComponentDataObjectMap_Aggregate_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  ownerId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
  useInFunctions_aggregate?: InputMaybe<ApplicationFunctionDataObjectMap_Aggregate_Order_By>;
};

/** primary key columns input for table: data_objects */
export type DataObject_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "data_objects" */
export enum DataObject_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'ownerId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "data_objects" */
export type DataObject_Set_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "DataObject" */
export type DataObject_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: DataObject_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type DataObject_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "data_objects" */
export enum DataObject_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'ownerId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type DataObject_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<DataObject_Set_Input>;
  /** filter the rows which have to be updated */
  where: DataObject_Bool_Exp;
};

/** columns and relationships of "map_directory_items" */
export type DirectoryItemsMap = {
  __typename?: 'DirectoryItemsMap';
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  source: DirectoryObject;
  sourceId: Scalars['uuid']['output'];
  /** An object relationship */
  target: DirectoryObject;
  targetId: Scalars['uuid']['output'];
  type: Scalars['directory_link_type_enum']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_directory_items" */
export type DirectoryItemsMap_Aggregate = {
  __typename?: 'DirectoryItemsMap_aggregate';
  aggregate?: Maybe<DirectoryItemsMap_Aggregate_Fields>;
  nodes: Array<DirectoryItemsMap>;
};

export type DirectoryItemsMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<DirectoryItemsMap_Aggregate_Bool_Exp_Count>;
};

export type DirectoryItemsMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<DirectoryItemsMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<DirectoryItemsMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_directory_items" */
export type DirectoryItemsMap_Aggregate_Fields = {
  __typename?: 'DirectoryItemsMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<DirectoryItemsMap_Max_Fields>;
  min?: Maybe<DirectoryItemsMap_Min_Fields>;
};


/** aggregate fields of "map_directory_items" */
export type DirectoryItemsMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<DirectoryItemsMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_directory_items" */
export type DirectoryItemsMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<DirectoryItemsMap_Max_Order_By>;
  min?: InputMaybe<DirectoryItemsMap_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_directory_items" */
export type DirectoryItemsMap_Arr_Rel_Insert_Input = {
  data: Array<DirectoryItemsMap_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<DirectoryItemsMap_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_directory_items". All fields are combined with a logical 'AND'. */
export type DirectoryItemsMap_Bool_Exp = {
  _and?: InputMaybe<Array<DirectoryItemsMap_Bool_Exp>>;
  _not?: InputMaybe<DirectoryItemsMap_Bool_Exp>;
  _or?: InputMaybe<Array<DirectoryItemsMap_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  source?: InputMaybe<DirectoryObject_Bool_Exp>;
  sourceId?: InputMaybe<Uuid_Comparison_Exp>;
  target?: InputMaybe<DirectoryObject_Bool_Exp>;
  targetId?: InputMaybe<Uuid_Comparison_Exp>;
  type?: InputMaybe<Directory_Link_Type_Enum_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_directory_items" */
export enum DirectoryItemsMap_Constraint {
  /** unique or primary key constraint on columns "target_id", "source_id" */
  MapDirectoryItemsPkey = 'map_directory_items_pkey',
  /** unique or primary key constraint on columns "target_id", "source_id" */
  MapDirectoryItemsSourceIdTargetIdUnique = 'map_directory_items_source_id_target_id_unique'
}

/** input type for inserting data into table "map_directory_items" */
export type DirectoryItemsMap_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  source?: InputMaybe<DirectoryObject_Obj_Rel_Insert_Input>;
  sourceId?: InputMaybe<Scalars['uuid']['input']>;
  target?: InputMaybe<DirectoryObject_Obj_Rel_Insert_Input>;
  targetId?: InputMaybe<Scalars['uuid']['input']>;
  type?: InputMaybe<Scalars['directory_link_type_enum']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type DirectoryItemsMap_Max_Fields = {
  __typename?: 'DirectoryItemsMap_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  sourceId?: Maybe<Scalars['uuid']['output']>;
  targetId?: Maybe<Scalars['uuid']['output']>;
  type?: Maybe<Scalars['directory_link_type_enum']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_directory_items" */
export type DirectoryItemsMap_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  sourceId?: InputMaybe<Order_By>;
  targetId?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type DirectoryItemsMap_Min_Fields = {
  __typename?: 'DirectoryItemsMap_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  sourceId?: Maybe<Scalars['uuid']['output']>;
  targetId?: Maybe<Scalars['uuid']['output']>;
  type?: Maybe<Scalars['directory_link_type_enum']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_directory_items" */
export type DirectoryItemsMap_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  sourceId?: InputMaybe<Order_By>;
  targetId?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "map_directory_items" */
export type DirectoryItemsMap_Mutation_Response = {
  __typename?: 'DirectoryItemsMap_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<DirectoryItemsMap>;
};

/** on_conflict condition type for table "map_directory_items" */
export type DirectoryItemsMap_On_Conflict = {
  constraint: DirectoryItemsMap_Constraint;
  update_columns?: Array<DirectoryItemsMap_Update_Column>;
  where?: InputMaybe<DirectoryItemsMap_Bool_Exp>;
};

/** Ordering options when selecting data from "map_directory_items". */
export type DirectoryItemsMap_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  source?: InputMaybe<DirectoryObject_Order_By>;
  sourceId?: InputMaybe<Order_By>;
  target?: InputMaybe<DirectoryObject_Order_By>;
  targetId?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_directory_items */
export type DirectoryItemsMap_Pk_Columns_Input = {
  sourceId: Scalars['uuid']['input'];
  targetId: Scalars['uuid']['input'];
};

/** select columns of table "map_directory_items" */
export enum DirectoryItemsMap_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  SourceId = 'sourceId',
  /** column name */
  TargetId = 'targetId',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "map_directory_items" */
export type DirectoryItemsMap_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  sourceId?: InputMaybe<Scalars['uuid']['input']>;
  targetId?: InputMaybe<Scalars['uuid']['input']>;
  type?: InputMaybe<Scalars['directory_link_type_enum']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "DirectoryItemsMap" */
export type DirectoryItemsMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: DirectoryItemsMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type DirectoryItemsMap_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  sourceId?: InputMaybe<Scalars['uuid']['input']>;
  targetId?: InputMaybe<Scalars['uuid']['input']>;
  type?: InputMaybe<Scalars['directory_link_type_enum']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "map_directory_items" */
export enum DirectoryItemsMap_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  SourceId = 'sourceId',
  /** column name */
  TargetId = 'targetId',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type DirectoryItemsMap_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<DirectoryItemsMap_Set_Input>;
  /** filter the rows which have to be updated */
  where: DirectoryItemsMap_Bool_Exp;
};

/** columns and relationships of "directories" */
export type DirectoryObject = {
  __typename?: 'DirectoryObject';
  /** An array relationship */
  architectureStyle: Array<ApplicationComponent>;
  /** An aggregate relationship */
  architectureStyle_aggregate: ApplicationComponent_Aggregate;
  byDefault: Scalars['Boolean']['output'];
  code: Scalars['String']['output'];
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  /** An array relationship */
  criticalLevel: Array<ApplicationComponent>;
  /** An aggregate relationship */
  criticalLevel_aggregate: ApplicationComponent_Aggregate;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  failoverType: Array<ApplicationComponent>;
  /** An aggregate relationship */
  failoverType_aggregate: ApplicationComponent_Aggregate;
  id: Scalars['uuid']['output'];
  kind: Scalars['directory_kind_enum']['output'];
  /** An array relationship */
  license: Array<SystemSoftware>;
  /** An array relationship */
  licenseComponents: Array<ApplicationComponent>;
  /** An aggregate relationship */
  licenseComponents_aggregate: ApplicationComponent_Aggregate;
  /** An aggregate relationship */
  license_aggregate: SystemSoftware_Aggregate;
  /** An array relationship */
  monitoringLevel: Array<ApplicationComponent>;
  /** An aggregate relationship */
  monitoringLevel_aggregate: ApplicationComponent_Aggregate;
  name: Scalars['String']['output'];
  /** An array relationship */
  recoveryTime: Array<ApplicationComponent>;
  /** An aggregate relationship */
  recoveryTime_aggregate: ApplicationComponent_Aggregate;
  /** An array relationship */
  redundancyType: Array<ApplicationComponent>;
  /** An aggregate relationship */
  redundancyType_aggregate: ApplicationComponent_Aggregate;
  /** An array relationship */
  role: Array<ApplicationComponentStakeholderMap>;
  /** An aggregate relationship */
  role_aggregate: ApplicationComponentStakeholderMap_Aggregate;
  /** An array relationship */
  scalingType: Array<ApplicationComponent>;
  /** An aggregate relationship */
  scalingType_aggregate: ApplicationComponent_Aggregate;
  /** An array relationship */
  source: Array<DirectoryItemsMap>;
  /** An aggregate relationship */
  source_aggregate: DirectoryItemsMap_Aggregate;
  /** An array relationship */
  state: Array<Solution>;
  /** An array relationship */
  stateComponents: Array<ApplicationComponent>;
  /** An aggregate relationship */
  stateComponents_aggregate: ApplicationComponent_Aggregate;
  /** An aggregate relationship */
  state_aggregate: Solution_Aggregate;
  /** An array relationship */
  target: Array<DirectoryItemsMap>;
  /** An aggregate relationship */
  target_aggregate: DirectoryItemsMap_Aggregate;
  /** An array relationship */
  type: Array<SystemSoftware>;
  /** An array relationship */
  typeTechnologyNodes: Array<TechnologyNode>;
  /** An aggregate relationship */
  typeTechnologyNodes_aggregate: TechnologyNode_Aggregate;
  /** An aggregate relationship */
  type_aggregate: SystemSoftware_Aggregate;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectArchitectureStyleArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponent_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponent_Order_By>>;
  where?: InputMaybe<ApplicationComponent_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectArchitectureStyle_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponent_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponent_Order_By>>;
  where?: InputMaybe<ApplicationComponent_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectCriticalLevelArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponent_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponent_Order_By>>;
  where?: InputMaybe<ApplicationComponent_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectCriticalLevel_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponent_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponent_Order_By>>;
  where?: InputMaybe<ApplicationComponent_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectFailoverTypeArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponent_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponent_Order_By>>;
  where?: InputMaybe<ApplicationComponent_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectFailoverType_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponent_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponent_Order_By>>;
  where?: InputMaybe<ApplicationComponent_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectLicenseArgs = {
  distinct_on?: InputMaybe<Array<SystemSoftware_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SystemSoftware_Order_By>>;
  where?: InputMaybe<SystemSoftware_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectLicenseComponentsArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponent_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponent_Order_By>>;
  where?: InputMaybe<ApplicationComponent_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectLicenseComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponent_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponent_Order_By>>;
  where?: InputMaybe<ApplicationComponent_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectLicense_AggregateArgs = {
  distinct_on?: InputMaybe<Array<SystemSoftware_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SystemSoftware_Order_By>>;
  where?: InputMaybe<SystemSoftware_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectMonitoringLevelArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponent_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponent_Order_By>>;
  where?: InputMaybe<ApplicationComponent_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectMonitoringLevel_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponent_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponent_Order_By>>;
  where?: InputMaybe<ApplicationComponent_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectRecoveryTimeArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponent_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponent_Order_By>>;
  where?: InputMaybe<ApplicationComponent_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectRecoveryTime_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponent_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponent_Order_By>>;
  where?: InputMaybe<ApplicationComponent_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectRedundancyTypeArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponent_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponent_Order_By>>;
  where?: InputMaybe<ApplicationComponent_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectRedundancyType_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponent_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponent_Order_By>>;
  where?: InputMaybe<ApplicationComponent_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectRoleArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentStakeholderMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentStakeholderMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentStakeholderMap_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectRole_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentStakeholderMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentStakeholderMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentStakeholderMap_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectScalingTypeArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponent_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponent_Order_By>>;
  where?: InputMaybe<ApplicationComponent_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectScalingType_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponent_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponent_Order_By>>;
  where?: InputMaybe<ApplicationComponent_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectSourceArgs = {
  distinct_on?: InputMaybe<Array<DirectoryItemsMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<DirectoryItemsMap_Order_By>>;
  where?: InputMaybe<DirectoryItemsMap_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectSource_AggregateArgs = {
  distinct_on?: InputMaybe<Array<DirectoryItemsMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<DirectoryItemsMap_Order_By>>;
  where?: InputMaybe<DirectoryItemsMap_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectStateArgs = {
  distinct_on?: InputMaybe<Array<Solution_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Solution_Order_By>>;
  where?: InputMaybe<Solution_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectStateComponentsArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponent_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponent_Order_By>>;
  where?: InputMaybe<ApplicationComponent_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectStateComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponent_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponent_Order_By>>;
  where?: InputMaybe<ApplicationComponent_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectState_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Solution_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Solution_Order_By>>;
  where?: InputMaybe<Solution_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectTargetArgs = {
  distinct_on?: InputMaybe<Array<DirectoryItemsMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<DirectoryItemsMap_Order_By>>;
  where?: InputMaybe<DirectoryItemsMap_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectTarget_AggregateArgs = {
  distinct_on?: InputMaybe<Array<DirectoryItemsMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<DirectoryItemsMap_Order_By>>;
  where?: InputMaybe<DirectoryItemsMap_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectTypeArgs = {
  distinct_on?: InputMaybe<Array<SystemSoftware_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SystemSoftware_Order_By>>;
  where?: InputMaybe<SystemSoftware_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectTypeTechnologyNodesArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNode_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNode_Order_By>>;
  where?: InputMaybe<TechnologyNode_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectTypeTechnologyNodes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNode_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNode_Order_By>>;
  where?: InputMaybe<TechnologyNode_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectType_AggregateArgs = {
  distinct_on?: InputMaybe<Array<SystemSoftware_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SystemSoftware_Order_By>>;
  where?: InputMaybe<SystemSoftware_Bool_Exp>;
};

/** aggregated selection of "directories" */
export type DirectoryObject_Aggregate = {
  __typename?: 'DirectoryObject_aggregate';
  aggregate?: Maybe<DirectoryObject_Aggregate_Fields>;
  nodes: Array<DirectoryObject>;
};

/** aggregate fields of "directories" */
export type DirectoryObject_Aggregate_Fields = {
  __typename?: 'DirectoryObject_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<DirectoryObject_Max_Fields>;
  min?: Maybe<DirectoryObject_Min_Fields>;
};


/** aggregate fields of "directories" */
export type DirectoryObject_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<DirectoryObject_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "directories". All fields are combined with a logical 'AND'. */
export type DirectoryObject_Bool_Exp = {
  _and?: InputMaybe<Array<DirectoryObject_Bool_Exp>>;
  _not?: InputMaybe<DirectoryObject_Bool_Exp>;
  _or?: InputMaybe<Array<DirectoryObject_Bool_Exp>>;
  architectureStyle?: InputMaybe<ApplicationComponent_Bool_Exp>;
  architectureStyle_aggregate?: InputMaybe<ApplicationComponent_Aggregate_Bool_Exp>;
  byDefault?: InputMaybe<Boolean_Comparison_Exp>;
  code?: InputMaybe<String_Comparison_Exp>;
  color?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  criticalLevel?: InputMaybe<ApplicationComponent_Bool_Exp>;
  criticalLevel_aggregate?: InputMaybe<ApplicationComponent_Aggregate_Bool_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  failoverType?: InputMaybe<ApplicationComponent_Bool_Exp>;
  failoverType_aggregate?: InputMaybe<ApplicationComponent_Aggregate_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  kind?: InputMaybe<Directory_Kind_Enum_Comparison_Exp>;
  license?: InputMaybe<SystemSoftware_Bool_Exp>;
  licenseComponents?: InputMaybe<ApplicationComponent_Bool_Exp>;
  licenseComponents_aggregate?: InputMaybe<ApplicationComponent_Aggregate_Bool_Exp>;
  license_aggregate?: InputMaybe<SystemSoftware_Aggregate_Bool_Exp>;
  monitoringLevel?: InputMaybe<ApplicationComponent_Bool_Exp>;
  monitoringLevel_aggregate?: InputMaybe<ApplicationComponent_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  recoveryTime?: InputMaybe<ApplicationComponent_Bool_Exp>;
  recoveryTime_aggregate?: InputMaybe<ApplicationComponent_Aggregate_Bool_Exp>;
  redundancyType?: InputMaybe<ApplicationComponent_Bool_Exp>;
  redundancyType_aggregate?: InputMaybe<ApplicationComponent_Aggregate_Bool_Exp>;
  role?: InputMaybe<ApplicationComponentStakeholderMap_Bool_Exp>;
  role_aggregate?: InputMaybe<ApplicationComponentStakeholderMap_Aggregate_Bool_Exp>;
  scalingType?: InputMaybe<ApplicationComponent_Bool_Exp>;
  scalingType_aggregate?: InputMaybe<ApplicationComponent_Aggregate_Bool_Exp>;
  source?: InputMaybe<DirectoryItemsMap_Bool_Exp>;
  source_aggregate?: InputMaybe<DirectoryItemsMap_Aggregate_Bool_Exp>;
  state?: InputMaybe<Solution_Bool_Exp>;
  stateComponents?: InputMaybe<ApplicationComponent_Bool_Exp>;
  stateComponents_aggregate?: InputMaybe<ApplicationComponent_Aggregate_Bool_Exp>;
  state_aggregate?: InputMaybe<Solution_Aggregate_Bool_Exp>;
  target?: InputMaybe<DirectoryItemsMap_Bool_Exp>;
  target_aggregate?: InputMaybe<DirectoryItemsMap_Aggregate_Bool_Exp>;
  type?: InputMaybe<SystemSoftware_Bool_Exp>;
  typeTechnologyNodes?: InputMaybe<TechnologyNode_Bool_Exp>;
  typeTechnologyNodes_aggregate?: InputMaybe<TechnologyNode_Aggregate_Bool_Exp>;
  type_aggregate?: InputMaybe<SystemSoftware_Aggregate_Bool_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "directories" */
export enum DirectoryObject_Constraint {
  /** unique or primary key constraint on columns "code" */
  DirectoriesCodeUnique = 'directories_code_unique',
  /** unique or primary key constraint on columns "id" */
  DirectoriesPkey = 'directories_pkey'
}

/** input type for inserting data into table "directories" */
export type DirectoryObject_Insert_Input = {
  architectureStyle?: InputMaybe<ApplicationComponent_Arr_Rel_Insert_Input>;
  byDefault?: InputMaybe<Scalars['Boolean']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  criticalLevel?: InputMaybe<ApplicationComponent_Arr_Rel_Insert_Input>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  failoverType?: InputMaybe<ApplicationComponent_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  kind?: InputMaybe<Scalars['directory_kind_enum']['input']>;
  license?: InputMaybe<SystemSoftware_Arr_Rel_Insert_Input>;
  licenseComponents?: InputMaybe<ApplicationComponent_Arr_Rel_Insert_Input>;
  monitoringLevel?: InputMaybe<ApplicationComponent_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  recoveryTime?: InputMaybe<ApplicationComponent_Arr_Rel_Insert_Input>;
  redundancyType?: InputMaybe<ApplicationComponent_Arr_Rel_Insert_Input>;
  role?: InputMaybe<ApplicationComponentStakeholderMap_Arr_Rel_Insert_Input>;
  scalingType?: InputMaybe<ApplicationComponent_Arr_Rel_Insert_Input>;
  source?: InputMaybe<DirectoryItemsMap_Arr_Rel_Insert_Input>;
  state?: InputMaybe<Solution_Arr_Rel_Insert_Input>;
  stateComponents?: InputMaybe<ApplicationComponent_Arr_Rel_Insert_Input>;
  target?: InputMaybe<DirectoryItemsMap_Arr_Rel_Insert_Input>;
  type?: InputMaybe<SystemSoftware_Arr_Rel_Insert_Input>;
  typeTechnologyNodes?: InputMaybe<TechnologyNode_Arr_Rel_Insert_Input>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type DirectoryObject_Max_Fields = {
  __typename?: 'DirectoryObject_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  kind?: Maybe<Scalars['directory_kind_enum']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type DirectoryObject_Min_Fields = {
  __typename?: 'DirectoryObject_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  kind?: Maybe<Scalars['directory_kind_enum']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "directories" */
export type DirectoryObject_Mutation_Response = {
  __typename?: 'DirectoryObject_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<DirectoryObject>;
};

/** input type for inserting object relation for remote table "directories" */
export type DirectoryObject_Obj_Rel_Insert_Input = {
  data: DirectoryObject_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<DirectoryObject_On_Conflict>;
};

/** on_conflict condition type for table "directories" */
export type DirectoryObject_On_Conflict = {
  constraint: DirectoryObject_Constraint;
  update_columns?: Array<DirectoryObject_Update_Column>;
  where?: InputMaybe<DirectoryObject_Bool_Exp>;
};

/** Ordering options when selecting data from "directories". */
export type DirectoryObject_Order_By = {
  architectureStyle_aggregate?: InputMaybe<ApplicationComponent_Aggregate_Order_By>;
  byDefault?: InputMaybe<Order_By>;
  code?: InputMaybe<Order_By>;
  color?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  criticalLevel_aggregate?: InputMaybe<ApplicationComponent_Aggregate_Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  failoverType_aggregate?: InputMaybe<ApplicationComponent_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  licenseComponents_aggregate?: InputMaybe<ApplicationComponent_Aggregate_Order_By>;
  license_aggregate?: InputMaybe<SystemSoftware_Aggregate_Order_By>;
  monitoringLevel_aggregate?: InputMaybe<ApplicationComponent_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  recoveryTime_aggregate?: InputMaybe<ApplicationComponent_Aggregate_Order_By>;
  redundancyType_aggregate?: InputMaybe<ApplicationComponent_Aggregate_Order_By>;
  role_aggregate?: InputMaybe<ApplicationComponentStakeholderMap_Aggregate_Order_By>;
  scalingType_aggregate?: InputMaybe<ApplicationComponent_Aggregate_Order_By>;
  source_aggregate?: InputMaybe<DirectoryItemsMap_Aggregate_Order_By>;
  stateComponents_aggregate?: InputMaybe<ApplicationComponent_Aggregate_Order_By>;
  state_aggregate?: InputMaybe<Solution_Aggregate_Order_By>;
  target_aggregate?: InputMaybe<DirectoryItemsMap_Aggregate_Order_By>;
  typeTechnologyNodes_aggregate?: InputMaybe<TechnologyNode_Aggregate_Order_By>;
  type_aggregate?: InputMaybe<SystemSoftware_Aggregate_Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: directories */
export type DirectoryObject_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "directories" */
export enum DirectoryObject_Select_Column {
  /** column name */
  ByDefault = 'byDefault',
  /** column name */
  Code = 'code',
  /** column name */
  Color = 'color',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Kind = 'kind',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "directories" */
export type DirectoryObject_Set_Input = {
  byDefault?: InputMaybe<Scalars['Boolean']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  kind?: InputMaybe<Scalars['directory_kind_enum']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "DirectoryObject" */
export type DirectoryObject_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: DirectoryObject_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type DirectoryObject_Stream_Cursor_Value_Input = {
  byDefault?: InputMaybe<Scalars['Boolean']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  kind?: InputMaybe<Scalars['directory_kind_enum']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "directories" */
export enum DirectoryObject_Update_Column {
  /** column name */
  ByDefault = 'byDefault',
  /** column name */
  Code = 'code',
  /** column name */
  Color = 'color',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Kind = 'kind',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type DirectoryObject_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<DirectoryObject_Set_Input>;
  /** filter the rows which have to be updated */
  where: DirectoryObject_Bool_Exp;
};

/** columns and relationships of "employees" */
export type Employee = {
  __typename?: 'Employee';
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  firstName: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  lastName: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
  userId: Scalars['uuid']['output'];
};

/** aggregated selection of "employees" */
export type Employee_Aggregate = {
  __typename?: 'Employee_aggregate';
  aggregate?: Maybe<Employee_Aggregate_Fields>;
  nodes: Array<Employee>;
};

/** aggregate fields of "employees" */
export type Employee_Aggregate_Fields = {
  __typename?: 'Employee_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Employee_Max_Fields>;
  min?: Maybe<Employee_Min_Fields>;
};


/** aggregate fields of "employees" */
export type Employee_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Employee_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "employees". All fields are combined with a logical 'AND'. */
export type Employee_Bool_Exp = {
  _and?: InputMaybe<Array<Employee_Bool_Exp>>;
  _not?: InputMaybe<Employee_Bool_Exp>;
  _or?: InputMaybe<Array<Employee_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  firstName?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  lastName?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "employees" */
export enum Employee_Constraint {
  /** unique or primary key constraint on columns "id" */
  EmployeesPkey = 'employees_pkey',
  /** unique or primary key constraint on columns "user_id" */
  EmployeesUserIdUnique = 'employees_user_id_unique'
}

/** input type for inserting data into table "employees" */
export type Employee_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Employee_Max_Fields = {
  __typename?: 'Employee_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type Employee_Min_Fields = {
  __typename?: 'Employee_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "employees" */
export type Employee_Mutation_Response = {
  __typename?: 'Employee_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Employee>;
};

/** on_conflict condition type for table "employees" */
export type Employee_On_Conflict = {
  constraint: Employee_Constraint;
  update_columns?: Array<Employee_Update_Column>;
  where?: InputMaybe<Employee_Bool_Exp>;
};

/** Ordering options when selecting data from "employees". */
export type Employee_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  firstName?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastName?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: employees */
export type Employee_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "employees" */
export enum Employee_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  FirstName = 'firstName',
  /** column name */
  Id = 'id',
  /** column name */
  LastName = 'lastName',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "employees" */
export type Employee_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "Employee" */
export type Employee_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Employee_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Employee_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "employees" */
export enum Employee_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  FirstName = 'firstName',
  /** column name */
  Id = 'id',
  /** column name */
  LastName = 'lastName',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy',
  /** column name */
  UserId = 'userId'
}

export type Employee_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Employee_Set_Input>;
  /** filter the rows which have to be updated */
  where: Employee_Bool_Exp;
};

/** columns and relationships of "events" */
export type EventGeneric = {
  __typename?: 'EventGeneric';
  code: Scalars['String']['output'];
  /** An array relationship */
  components: Array<ApplicationComponentEventMap>;
  /** An aggregate relationship */
  components_aggregate: ApplicationComponentEventMap_Aggregate;
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  layer: Scalars['layer_kind_enum']['output'];
  name: Scalars['String']['output'];
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "events" */
export type EventGenericComponentsArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentEventMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentEventMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentEventMap_Bool_Exp>;
};


/** columns and relationships of "events" */
export type EventGenericComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentEventMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentEventMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentEventMap_Bool_Exp>;
};

/** aggregated selection of "events" */
export type EventGeneric_Aggregate = {
  __typename?: 'EventGeneric_aggregate';
  aggregate?: Maybe<EventGeneric_Aggregate_Fields>;
  nodes: Array<EventGeneric>;
};

/** aggregate fields of "events" */
export type EventGeneric_Aggregate_Fields = {
  __typename?: 'EventGeneric_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<EventGeneric_Max_Fields>;
  min?: Maybe<EventGeneric_Min_Fields>;
};


/** aggregate fields of "events" */
export type EventGeneric_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<EventGeneric_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "events". All fields are combined with a logical 'AND'. */
export type EventGeneric_Bool_Exp = {
  _and?: InputMaybe<Array<EventGeneric_Bool_Exp>>;
  _not?: InputMaybe<EventGeneric_Bool_Exp>;
  _or?: InputMaybe<Array<EventGeneric_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  components?: InputMaybe<ApplicationComponentEventMap_Bool_Exp>;
  components_aggregate?: InputMaybe<ApplicationComponentEventMap_Aggregate_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  layer?: InputMaybe<Layer_Kind_Enum_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  ownerId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "events" */
export enum EventGeneric_Constraint {
  /** unique or primary key constraint on columns "code" */
  EventsCodeUnique = 'events_code_unique',
  /** unique or primary key constraint on columns "id" */
  EventsPkey = 'events_pkey'
}

/** input type for inserting data into table "events" */
export type EventGeneric_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  components?: InputMaybe<ApplicationComponentEventMap_Arr_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  layer?: InputMaybe<Scalars['layer_kind_enum']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type EventGeneric_Max_Fields = {
  __typename?: 'EventGeneric_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  layer?: Maybe<Scalars['layer_kind_enum']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type EventGeneric_Min_Fields = {
  __typename?: 'EventGeneric_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  layer?: Maybe<Scalars['layer_kind_enum']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "events" */
export type EventGeneric_Mutation_Response = {
  __typename?: 'EventGeneric_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<EventGeneric>;
};

/** input type for inserting object relation for remote table "events" */
export type EventGeneric_Obj_Rel_Insert_Input = {
  data: EventGeneric_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<EventGeneric_On_Conflict>;
};

/** on_conflict condition type for table "events" */
export type EventGeneric_On_Conflict = {
  constraint: EventGeneric_Constraint;
  update_columns?: Array<EventGeneric_Update_Column>;
  where?: InputMaybe<EventGeneric_Bool_Exp>;
};

/** Ordering options when selecting data from "events". */
export type EventGeneric_Order_By = {
  code?: InputMaybe<Order_By>;
  components_aggregate?: InputMaybe<ApplicationComponentEventMap_Aggregate_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  layer?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  ownerId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: events */
export type EventGeneric_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "events" */
export enum EventGeneric_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Layer = 'layer',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'ownerId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "events" */
export type EventGeneric_Set_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  layer?: InputMaybe<Scalars['layer_kind_enum']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "EventGeneric" */
export type EventGeneric_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: EventGeneric_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type EventGeneric_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  layer?: InputMaybe<Scalars['layer_kind_enum']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "events" */
export enum EventGeneric_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Layer = 'layer',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'ownerId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type EventGeneric_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<EventGeneric_Set_Input>;
  /** filter the rows which have to be updated */
  where: EventGeneric_Bool_Exp;
};

/** columns and relationships of "flows" */
export type FlowGeneric = {
  __typename?: 'FlowGeneric';
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  environment?: Maybe<Scalars['environment_enum']['output']>;
  id: Scalars['uuid']['output'];
  layer: Scalars['layer_kind_enum']['output'];
  name: Scalars['String']['output'];
  /** An object relationship */
  sourceComponent?: Maybe<ApplicationComponent>;
  sourceComponentId?: Maybe<Scalars['uuid']['output']>;
  sourceFunctionId?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  targetComponent?: Maybe<ApplicationComponent>;
  targetComponentId?: Maybe<Scalars['uuid']['output']>;
  targetFunctionId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "flows" */
export type FlowGeneric_Aggregate = {
  __typename?: 'FlowGeneric_aggregate';
  aggregate?: Maybe<FlowGeneric_Aggregate_Fields>;
  nodes: Array<FlowGeneric>;
};

export type FlowGeneric_Aggregate_Bool_Exp = {
  count?: InputMaybe<FlowGeneric_Aggregate_Bool_Exp_Count>;
};

export type FlowGeneric_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<FlowGeneric_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<FlowGeneric_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "flows" */
export type FlowGeneric_Aggregate_Fields = {
  __typename?: 'FlowGeneric_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<FlowGeneric_Max_Fields>;
  min?: Maybe<FlowGeneric_Min_Fields>;
};


/** aggregate fields of "flows" */
export type FlowGeneric_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<FlowGeneric_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "flows" */
export type FlowGeneric_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<FlowGeneric_Max_Order_By>;
  min?: InputMaybe<FlowGeneric_Min_Order_By>;
};

/** input type for inserting array relation for remote table "flows" */
export type FlowGeneric_Arr_Rel_Insert_Input = {
  data: Array<FlowGeneric_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<FlowGeneric_On_Conflict>;
};

/** Boolean expression to filter rows from the table "flows". All fields are combined with a logical 'AND'. */
export type FlowGeneric_Bool_Exp = {
  _and?: InputMaybe<Array<FlowGeneric_Bool_Exp>>;
  _not?: InputMaybe<FlowGeneric_Bool_Exp>;
  _or?: InputMaybe<Array<FlowGeneric_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  environment?: InputMaybe<Environment_Enum_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  layer?: InputMaybe<Layer_Kind_Enum_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  sourceComponent?: InputMaybe<ApplicationComponent_Bool_Exp>;
  sourceComponentId?: InputMaybe<Uuid_Comparison_Exp>;
  sourceFunctionId?: InputMaybe<Uuid_Comparison_Exp>;
  targetComponent?: InputMaybe<ApplicationComponent_Bool_Exp>;
  targetComponentId?: InputMaybe<Uuid_Comparison_Exp>;
  targetFunctionId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "flows" */
export enum FlowGeneric_Constraint {
  /** unique or primary key constraint on columns "code" */
  FlowsCodeUnique = 'flows_code_unique',
  /** unique or primary key constraint on columns "id" */
  FlowsPkey = 'flows_pkey'
}

/** input type for inserting data into table "flows" */
export type FlowGeneric_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  environment?: InputMaybe<Scalars['environment_enum']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  layer?: InputMaybe<Scalars['layer_kind_enum']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sourceComponent?: InputMaybe<ApplicationComponent_Obj_Rel_Insert_Input>;
  sourceComponentId?: InputMaybe<Scalars['uuid']['input']>;
  sourceFunctionId?: InputMaybe<Scalars['uuid']['input']>;
  targetComponent?: InputMaybe<ApplicationComponent_Obj_Rel_Insert_Input>;
  targetComponentId?: InputMaybe<Scalars['uuid']['input']>;
  targetFunctionId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type FlowGeneric_Max_Fields = {
  __typename?: 'FlowGeneric_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  environment?: Maybe<Scalars['environment_enum']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  layer?: Maybe<Scalars['layer_kind_enum']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  sourceComponentId?: Maybe<Scalars['uuid']['output']>;
  sourceFunctionId?: Maybe<Scalars['uuid']['output']>;
  targetComponentId?: Maybe<Scalars['uuid']['output']>;
  targetFunctionId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "flows" */
export type FlowGeneric_Max_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  environment?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  layer?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  sourceComponentId?: InputMaybe<Order_By>;
  sourceFunctionId?: InputMaybe<Order_By>;
  targetComponentId?: InputMaybe<Order_By>;
  targetFunctionId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type FlowGeneric_Min_Fields = {
  __typename?: 'FlowGeneric_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  environment?: Maybe<Scalars['environment_enum']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  layer?: Maybe<Scalars['layer_kind_enum']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  sourceComponentId?: Maybe<Scalars['uuid']['output']>;
  sourceFunctionId?: Maybe<Scalars['uuid']['output']>;
  targetComponentId?: Maybe<Scalars['uuid']['output']>;
  targetFunctionId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "flows" */
export type FlowGeneric_Min_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  environment?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  layer?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  sourceComponentId?: InputMaybe<Order_By>;
  sourceFunctionId?: InputMaybe<Order_By>;
  targetComponentId?: InputMaybe<Order_By>;
  targetFunctionId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "flows" */
export type FlowGeneric_Mutation_Response = {
  __typename?: 'FlowGeneric_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<FlowGeneric>;
};

/** on_conflict condition type for table "flows" */
export type FlowGeneric_On_Conflict = {
  constraint: FlowGeneric_Constraint;
  update_columns?: Array<FlowGeneric_Update_Column>;
  where?: InputMaybe<FlowGeneric_Bool_Exp>;
};

/** Ordering options when selecting data from "flows". */
export type FlowGeneric_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  environment?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  layer?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  sourceComponent?: InputMaybe<ApplicationComponent_Order_By>;
  sourceComponentId?: InputMaybe<Order_By>;
  sourceFunctionId?: InputMaybe<Order_By>;
  targetComponent?: InputMaybe<ApplicationComponent_Order_By>;
  targetComponentId?: InputMaybe<Order_By>;
  targetFunctionId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: flows */
export type FlowGeneric_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "flows" */
export enum FlowGeneric_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Environment = 'environment',
  /** column name */
  Id = 'id',
  /** column name */
  Layer = 'layer',
  /** column name */
  Name = 'name',
  /** column name */
  SourceComponentId = 'sourceComponentId',
  /** column name */
  SourceFunctionId = 'sourceFunctionId',
  /** column name */
  TargetComponentId = 'targetComponentId',
  /** column name */
  TargetFunctionId = 'targetFunctionId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "flows" */
export type FlowGeneric_Set_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  environment?: InputMaybe<Scalars['environment_enum']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  layer?: InputMaybe<Scalars['layer_kind_enum']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sourceComponentId?: InputMaybe<Scalars['uuid']['input']>;
  sourceFunctionId?: InputMaybe<Scalars['uuid']['input']>;
  targetComponentId?: InputMaybe<Scalars['uuid']['input']>;
  targetFunctionId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "FlowGeneric" */
export type FlowGeneric_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: FlowGeneric_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type FlowGeneric_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  environment?: InputMaybe<Scalars['environment_enum']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  layer?: InputMaybe<Scalars['layer_kind_enum']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sourceComponentId?: InputMaybe<Scalars['uuid']['input']>;
  sourceFunctionId?: InputMaybe<Scalars['uuid']['input']>;
  targetComponentId?: InputMaybe<Scalars['uuid']['input']>;
  targetFunctionId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "flows" */
export enum FlowGeneric_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Environment = 'environment',
  /** column name */
  Id = 'id',
  /** column name */
  Layer = 'layer',
  /** column name */
  Name = 'name',
  /** column name */
  SourceComponentId = 'sourceComponentId',
  /** column name */
  SourceFunctionId = 'sourceFunctionId',
  /** column name */
  TargetComponentId = 'targetComponentId',
  /** column name */
  TargetFunctionId = 'targetFunctionId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type FlowGeneric_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<FlowGeneric_Set_Input>;
  /** filter the rows which have to be updated */
  where: FlowGeneric_Bool_Exp;
};

/** columns and relationships of "functions" */
export type FunctionGeneric = {
  __typename?: 'FunctionGeneric';
  code: Scalars['String']['output'];
  /** An array relationship */
  components: Array<ApplicationComponentFunctionMap>;
  /** An aggregate relationship */
  components_aggregate: ApplicationComponentFunctionMap_Aggregate;
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  layer: Scalars['layer_kind_enum']['output'];
  name: Scalars['String']['output'];
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "functions" */
export type FunctionGenericComponentsArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentFunctionMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentFunctionMap_Bool_Exp>;
};


/** columns and relationships of "functions" */
export type FunctionGenericComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentFunctionMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentFunctionMap_Bool_Exp>;
};

/** aggregated selection of "functions" */
export type FunctionGeneric_Aggregate = {
  __typename?: 'FunctionGeneric_aggregate';
  aggregate?: Maybe<FunctionGeneric_Aggregate_Fields>;
  nodes: Array<FunctionGeneric>;
};

/** aggregate fields of "functions" */
export type FunctionGeneric_Aggregate_Fields = {
  __typename?: 'FunctionGeneric_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<FunctionGeneric_Max_Fields>;
  min?: Maybe<FunctionGeneric_Min_Fields>;
};


/** aggregate fields of "functions" */
export type FunctionGeneric_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<FunctionGeneric_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "functions". All fields are combined with a logical 'AND'. */
export type FunctionGeneric_Bool_Exp = {
  _and?: InputMaybe<Array<FunctionGeneric_Bool_Exp>>;
  _not?: InputMaybe<FunctionGeneric_Bool_Exp>;
  _or?: InputMaybe<Array<FunctionGeneric_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  components?: InputMaybe<ApplicationComponentFunctionMap_Bool_Exp>;
  components_aggregate?: InputMaybe<ApplicationComponentFunctionMap_Aggregate_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  layer?: InputMaybe<Layer_Kind_Enum_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  ownerId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "functions" */
export enum FunctionGeneric_Constraint {
  /** unique or primary key constraint on columns "code" */
  FunctionsCodeUnique = 'functions_code_unique',
  /** unique or primary key constraint on columns "id" */
  FunctionsPkey = 'functions_pkey'
}

/** input type for inserting data into table "functions" */
export type FunctionGeneric_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  components?: InputMaybe<ApplicationComponentFunctionMap_Arr_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  layer?: InputMaybe<Scalars['layer_kind_enum']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type FunctionGeneric_Max_Fields = {
  __typename?: 'FunctionGeneric_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  layer?: Maybe<Scalars['layer_kind_enum']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type FunctionGeneric_Min_Fields = {
  __typename?: 'FunctionGeneric_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  layer?: Maybe<Scalars['layer_kind_enum']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "functions" */
export type FunctionGeneric_Mutation_Response = {
  __typename?: 'FunctionGeneric_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<FunctionGeneric>;
};

/** input type for inserting object relation for remote table "functions" */
export type FunctionGeneric_Obj_Rel_Insert_Input = {
  data: FunctionGeneric_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<FunctionGeneric_On_Conflict>;
};

/** on_conflict condition type for table "functions" */
export type FunctionGeneric_On_Conflict = {
  constraint: FunctionGeneric_Constraint;
  update_columns?: Array<FunctionGeneric_Update_Column>;
  where?: InputMaybe<FunctionGeneric_Bool_Exp>;
};

/** Ordering options when selecting data from "functions". */
export type FunctionGeneric_Order_By = {
  code?: InputMaybe<Order_By>;
  components_aggregate?: InputMaybe<ApplicationComponentFunctionMap_Aggregate_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  layer?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  ownerId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: functions */
export type FunctionGeneric_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "functions" */
export enum FunctionGeneric_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Layer = 'layer',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'ownerId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "functions" */
export type FunctionGeneric_Set_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  layer?: InputMaybe<Scalars['layer_kind_enum']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "FunctionGeneric" */
export type FunctionGeneric_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: FunctionGeneric_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type FunctionGeneric_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  layer?: InputMaybe<Scalars['layer_kind_enum']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "functions" */
export enum FunctionGeneric_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Layer = 'layer',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'ownerId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type FunctionGeneric_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<FunctionGeneric_Set_Input>;
  /** filter the rows which have to be updated */
  where: FunctionGeneric_Bool_Exp;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** columns and relationships of "interfaces" */
export type InterfaceGeneric = {
  __typename?: 'InterfaceGeneric';
  code: Scalars['String']['output'];
  componentId?: Maybe<Scalars['uuid']['output']>;
  /** An array relationship */
  components: Array<ApplicationComponentInterfaceMap>;
  /** An aggregate relationship */
  components_aggregate: ApplicationComponentInterfaceMap_Aggregate;
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  functions: Array<ApplicationInterfaceFunctionMap>;
  /** An aggregate relationship */
  functions_aggregate: ApplicationInterfaceFunctionMap_Aggregate;
  id: Scalars['uuid']['output'];
  layer: Scalars['layer_kind_enum']['output'];
  name: Scalars['String']['output'];
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "interfaces" */
export type InterfaceGenericComponentsArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentInterfaceMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentInterfaceMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentInterfaceMap_Bool_Exp>;
};


/** columns and relationships of "interfaces" */
export type InterfaceGenericComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentInterfaceMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentInterfaceMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentInterfaceMap_Bool_Exp>;
};


/** columns and relationships of "interfaces" */
export type InterfaceGenericFunctionsArgs = {
  distinct_on?: InputMaybe<Array<ApplicationInterfaceFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationInterfaceFunctionMap_Order_By>>;
  where?: InputMaybe<ApplicationInterfaceFunctionMap_Bool_Exp>;
};


/** columns and relationships of "interfaces" */
export type InterfaceGenericFunctions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationInterfaceFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationInterfaceFunctionMap_Order_By>>;
  where?: InputMaybe<ApplicationInterfaceFunctionMap_Bool_Exp>;
};

/** aggregated selection of "interfaces" */
export type InterfaceGeneric_Aggregate = {
  __typename?: 'InterfaceGeneric_aggregate';
  aggregate?: Maybe<InterfaceGeneric_Aggregate_Fields>;
  nodes: Array<InterfaceGeneric>;
};

/** aggregate fields of "interfaces" */
export type InterfaceGeneric_Aggregate_Fields = {
  __typename?: 'InterfaceGeneric_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<InterfaceGeneric_Max_Fields>;
  min?: Maybe<InterfaceGeneric_Min_Fields>;
};


/** aggregate fields of "interfaces" */
export type InterfaceGeneric_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<InterfaceGeneric_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "interfaces". All fields are combined with a logical 'AND'. */
export type InterfaceGeneric_Bool_Exp = {
  _and?: InputMaybe<Array<InterfaceGeneric_Bool_Exp>>;
  _not?: InputMaybe<InterfaceGeneric_Bool_Exp>;
  _or?: InputMaybe<Array<InterfaceGeneric_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  components?: InputMaybe<ApplicationComponentInterfaceMap_Bool_Exp>;
  components_aggregate?: InputMaybe<ApplicationComponentInterfaceMap_Aggregate_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  functions?: InputMaybe<ApplicationInterfaceFunctionMap_Bool_Exp>;
  functions_aggregate?: InputMaybe<ApplicationInterfaceFunctionMap_Aggregate_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  layer?: InputMaybe<Layer_Kind_Enum_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  ownerId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "interfaces" */
export enum InterfaceGeneric_Constraint {
  /** unique or primary key constraint on columns "code" */
  InterfacesCodeUnique = 'interfaces_code_unique',
  /** unique or primary key constraint on columns "id" */
  InterfacesPkey = 'interfaces_pkey'
}

/** input type for inserting data into table "interfaces" */
export type InterfaceGeneric_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  components?: InputMaybe<ApplicationComponentInterfaceMap_Arr_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  functions?: InputMaybe<ApplicationInterfaceFunctionMap_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  layer?: InputMaybe<Scalars['layer_kind_enum']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type InterfaceGeneric_Max_Fields = {
  __typename?: 'InterfaceGeneric_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  layer?: Maybe<Scalars['layer_kind_enum']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type InterfaceGeneric_Min_Fields = {
  __typename?: 'InterfaceGeneric_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  layer?: Maybe<Scalars['layer_kind_enum']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "interfaces" */
export type InterfaceGeneric_Mutation_Response = {
  __typename?: 'InterfaceGeneric_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<InterfaceGeneric>;
};

/** input type for inserting object relation for remote table "interfaces" */
export type InterfaceGeneric_Obj_Rel_Insert_Input = {
  data: InterfaceGeneric_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<InterfaceGeneric_On_Conflict>;
};

/** on_conflict condition type for table "interfaces" */
export type InterfaceGeneric_On_Conflict = {
  constraint: InterfaceGeneric_Constraint;
  update_columns?: Array<InterfaceGeneric_Update_Column>;
  where?: InputMaybe<InterfaceGeneric_Bool_Exp>;
};

/** Ordering options when selecting data from "interfaces". */
export type InterfaceGeneric_Order_By = {
  code?: InputMaybe<Order_By>;
  componentId?: InputMaybe<Order_By>;
  components_aggregate?: InputMaybe<ApplicationComponentInterfaceMap_Aggregate_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  functions_aggregate?: InputMaybe<ApplicationInterfaceFunctionMap_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  layer?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  ownerId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: interfaces */
export type InterfaceGeneric_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "interfaces" */
export enum InterfaceGeneric_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Layer = 'layer',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'ownerId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "interfaces" */
export type InterfaceGeneric_Set_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  layer?: InputMaybe<Scalars['layer_kind_enum']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "InterfaceGeneric" */
export type InterfaceGeneric_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: InterfaceGeneric_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type InterfaceGeneric_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  layer?: InputMaybe<Scalars['layer_kind_enum']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "interfaces" */
export enum InterfaceGeneric_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Layer = 'layer',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'ownerId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type InterfaceGeneric_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<InterfaceGeneric_Set_Input>;
  /** filter the rows which have to be updated */
  where: InterfaceGeneric_Bool_Exp;
};

/** columns and relationships of "motivations" */
export type MotivationElementGeneric = {
  __typename?: 'MotivationElementGeneric';
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  impact?: Maybe<Scalars['smallint']['output']>;
  kind: Scalars['motivation_kind_enum']['output'];
  mitigationNotes?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  ownerId?: Maybe<Scalars['uuid']['output']>;
  priority?: Maybe<Scalars['motivation_priority_enum']['output']>;
  probability?: Maybe<Scalars['smallint']['output']>;
  riskCategory?: Maybe<Scalars['risk_category_enum']['output']>;
  severity?: Maybe<Scalars['smallint']['output']>;
  /** An array relationship */
  solutions: Array<SolutionConstraintMap>;
  /** An aggregate relationship */
  solutions_aggregate: SolutionConstraintMap_Aggregate;
  state: Scalars['motivation_status_enum']['output'];
  status?: Maybe<Scalars['risk_status_enum']['output']>;
  typeAssessment?: Maybe<Scalars['assessment_type_enum']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "motivations" */
export type MotivationElementGenericSolutionsArgs = {
  distinct_on?: InputMaybe<Array<SolutionConstraintMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionConstraintMap_Order_By>>;
  where?: InputMaybe<SolutionConstraintMap_Bool_Exp>;
};


/** columns and relationships of "motivations" */
export type MotivationElementGenericSolutions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionConstraintMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionConstraintMap_Order_By>>;
  where?: InputMaybe<SolutionConstraintMap_Bool_Exp>;
};

/** aggregated selection of "motivations" */
export type MotivationElementGeneric_Aggregate = {
  __typename?: 'MotivationElementGeneric_aggregate';
  aggregate?: Maybe<MotivationElementGeneric_Aggregate_Fields>;
  nodes: Array<MotivationElementGeneric>;
};

/** aggregate fields of "motivations" */
export type MotivationElementGeneric_Aggregate_Fields = {
  __typename?: 'MotivationElementGeneric_aggregate_fields';
  avg?: Maybe<MotivationElementGeneric_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<MotivationElementGeneric_Max_Fields>;
  min?: Maybe<MotivationElementGeneric_Min_Fields>;
  stddev?: Maybe<MotivationElementGeneric_Stddev_Fields>;
  stddev_pop?: Maybe<MotivationElementGeneric_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<MotivationElementGeneric_Stddev_Samp_Fields>;
  sum?: Maybe<MotivationElementGeneric_Sum_Fields>;
  var_pop?: Maybe<MotivationElementGeneric_Var_Pop_Fields>;
  var_samp?: Maybe<MotivationElementGeneric_Var_Samp_Fields>;
  variance?: Maybe<MotivationElementGeneric_Variance_Fields>;
};


/** aggregate fields of "motivations" */
export type MotivationElementGeneric_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<MotivationElementGeneric_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type MotivationElementGeneric_Avg_Fields = {
  __typename?: 'MotivationElementGeneric_avg_fields';
  impact?: Maybe<Scalars['Float']['output']>;
  probability?: Maybe<Scalars['Float']['output']>;
  severity?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "motivations". All fields are combined with a logical 'AND'. */
export type MotivationElementGeneric_Bool_Exp = {
  _and?: InputMaybe<Array<MotivationElementGeneric_Bool_Exp>>;
  _not?: InputMaybe<MotivationElementGeneric_Bool_Exp>;
  _or?: InputMaybe<Array<MotivationElementGeneric_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  impact?: InputMaybe<Smallint_Comparison_Exp>;
  kind?: InputMaybe<Motivation_Kind_Enum_Comparison_Exp>;
  mitigationNotes?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  ownerId?: InputMaybe<Uuid_Comparison_Exp>;
  priority?: InputMaybe<Motivation_Priority_Enum_Comparison_Exp>;
  probability?: InputMaybe<Smallint_Comparison_Exp>;
  riskCategory?: InputMaybe<Risk_Category_Enum_Comparison_Exp>;
  severity?: InputMaybe<Smallint_Comparison_Exp>;
  solutions?: InputMaybe<SolutionConstraintMap_Bool_Exp>;
  solutions_aggregate?: InputMaybe<SolutionConstraintMap_Aggregate_Bool_Exp>;
  state?: InputMaybe<Motivation_Status_Enum_Comparison_Exp>;
  status?: InputMaybe<Risk_Status_Enum_Comparison_Exp>;
  typeAssessment?: InputMaybe<Assessment_Type_Enum_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "motivations" */
export enum MotivationElementGeneric_Constraint {
  /** unique or primary key constraint on columns "code" */
  MotivationsCodeUnique = 'motivations_code_unique',
  /** unique or primary key constraint on columns "id" */
  MotivationsPkey = 'motivations_pkey'
}

/** input type for incrementing numeric columns in table "motivations" */
export type MotivationElementGeneric_Inc_Input = {
  impact?: InputMaybe<Scalars['smallint']['input']>;
  probability?: InputMaybe<Scalars['smallint']['input']>;
  severity?: InputMaybe<Scalars['smallint']['input']>;
};

/** input type for inserting data into table "motivations" */
export type MotivationElementGeneric_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  impact?: InputMaybe<Scalars['smallint']['input']>;
  kind?: InputMaybe<Scalars['motivation_kind_enum']['input']>;
  mitigationNotes?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  priority?: InputMaybe<Scalars['motivation_priority_enum']['input']>;
  probability?: InputMaybe<Scalars['smallint']['input']>;
  riskCategory?: InputMaybe<Scalars['risk_category_enum']['input']>;
  severity?: InputMaybe<Scalars['smallint']['input']>;
  solutions?: InputMaybe<SolutionConstraintMap_Arr_Rel_Insert_Input>;
  state?: InputMaybe<Scalars['motivation_status_enum']['input']>;
  status?: InputMaybe<Scalars['risk_status_enum']['input']>;
  typeAssessment?: InputMaybe<Scalars['assessment_type_enum']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type MotivationElementGeneric_Max_Fields = {
  __typename?: 'MotivationElementGeneric_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  impact?: Maybe<Scalars['smallint']['output']>;
  kind?: Maybe<Scalars['motivation_kind_enum']['output']>;
  mitigationNotes?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  priority?: Maybe<Scalars['motivation_priority_enum']['output']>;
  probability?: Maybe<Scalars['smallint']['output']>;
  riskCategory?: Maybe<Scalars['risk_category_enum']['output']>;
  severity?: Maybe<Scalars['smallint']['output']>;
  state?: Maybe<Scalars['motivation_status_enum']['output']>;
  status?: Maybe<Scalars['risk_status_enum']['output']>;
  typeAssessment?: Maybe<Scalars['assessment_type_enum']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type MotivationElementGeneric_Min_Fields = {
  __typename?: 'MotivationElementGeneric_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  impact?: Maybe<Scalars['smallint']['output']>;
  kind?: Maybe<Scalars['motivation_kind_enum']['output']>;
  mitigationNotes?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  priority?: Maybe<Scalars['motivation_priority_enum']['output']>;
  probability?: Maybe<Scalars['smallint']['output']>;
  riskCategory?: Maybe<Scalars['risk_category_enum']['output']>;
  severity?: Maybe<Scalars['smallint']['output']>;
  state?: Maybe<Scalars['motivation_status_enum']['output']>;
  status?: Maybe<Scalars['risk_status_enum']['output']>;
  typeAssessment?: Maybe<Scalars['assessment_type_enum']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "motivations" */
export type MotivationElementGeneric_Mutation_Response = {
  __typename?: 'MotivationElementGeneric_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<MotivationElementGeneric>;
};

/** input type for inserting object relation for remote table "motivations" */
export type MotivationElementGeneric_Obj_Rel_Insert_Input = {
  data: MotivationElementGeneric_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<MotivationElementGeneric_On_Conflict>;
};

/** on_conflict condition type for table "motivations" */
export type MotivationElementGeneric_On_Conflict = {
  constraint: MotivationElementGeneric_Constraint;
  update_columns?: Array<MotivationElementGeneric_Update_Column>;
  where?: InputMaybe<MotivationElementGeneric_Bool_Exp>;
};

/** Ordering options when selecting data from "motivations". */
export type MotivationElementGeneric_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  impact?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  mitigationNotes?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  ownerId?: InputMaybe<Order_By>;
  priority?: InputMaybe<Order_By>;
  probability?: InputMaybe<Order_By>;
  riskCategory?: InputMaybe<Order_By>;
  severity?: InputMaybe<Order_By>;
  solutions_aggregate?: InputMaybe<SolutionConstraintMap_Aggregate_Order_By>;
  state?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  typeAssessment?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: motivations */
export type MotivationElementGeneric_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "motivations" */
export enum MotivationElementGeneric_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Impact = 'impact',
  /** column name */
  Kind = 'kind',
  /** column name */
  MitigationNotes = 'mitigationNotes',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'ownerId',
  /** column name */
  Priority = 'priority',
  /** column name */
  Probability = 'probability',
  /** column name */
  RiskCategory = 'riskCategory',
  /** column name */
  Severity = 'severity',
  /** column name */
  State = 'state',
  /** column name */
  Status = 'status',
  /** column name */
  TypeAssessment = 'typeAssessment',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "motivations" */
export type MotivationElementGeneric_Set_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  impact?: InputMaybe<Scalars['smallint']['input']>;
  kind?: InputMaybe<Scalars['motivation_kind_enum']['input']>;
  mitigationNotes?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  priority?: InputMaybe<Scalars['motivation_priority_enum']['input']>;
  probability?: InputMaybe<Scalars['smallint']['input']>;
  riskCategory?: InputMaybe<Scalars['risk_category_enum']['input']>;
  severity?: InputMaybe<Scalars['smallint']['input']>;
  state?: InputMaybe<Scalars['motivation_status_enum']['input']>;
  status?: InputMaybe<Scalars['risk_status_enum']['input']>;
  typeAssessment?: InputMaybe<Scalars['assessment_type_enum']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type MotivationElementGeneric_Stddev_Fields = {
  __typename?: 'MotivationElementGeneric_stddev_fields';
  impact?: Maybe<Scalars['Float']['output']>;
  probability?: Maybe<Scalars['Float']['output']>;
  severity?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type MotivationElementGeneric_Stddev_Pop_Fields = {
  __typename?: 'MotivationElementGeneric_stddev_pop_fields';
  impact?: Maybe<Scalars['Float']['output']>;
  probability?: Maybe<Scalars['Float']['output']>;
  severity?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type MotivationElementGeneric_Stddev_Samp_Fields = {
  __typename?: 'MotivationElementGeneric_stddev_samp_fields';
  impact?: Maybe<Scalars['Float']['output']>;
  probability?: Maybe<Scalars['Float']['output']>;
  severity?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "MotivationElementGeneric" */
export type MotivationElementGeneric_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: MotivationElementGeneric_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type MotivationElementGeneric_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  impact?: InputMaybe<Scalars['smallint']['input']>;
  kind?: InputMaybe<Scalars['motivation_kind_enum']['input']>;
  mitigationNotes?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  priority?: InputMaybe<Scalars['motivation_priority_enum']['input']>;
  probability?: InputMaybe<Scalars['smallint']['input']>;
  riskCategory?: InputMaybe<Scalars['risk_category_enum']['input']>;
  severity?: InputMaybe<Scalars['smallint']['input']>;
  state?: InputMaybe<Scalars['motivation_status_enum']['input']>;
  status?: InputMaybe<Scalars['risk_status_enum']['input']>;
  typeAssessment?: InputMaybe<Scalars['assessment_type_enum']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type MotivationElementGeneric_Sum_Fields = {
  __typename?: 'MotivationElementGeneric_sum_fields';
  impact?: Maybe<Scalars['smallint']['output']>;
  probability?: Maybe<Scalars['smallint']['output']>;
  severity?: Maybe<Scalars['smallint']['output']>;
};

/** update columns of table "motivations" */
export enum MotivationElementGeneric_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Impact = 'impact',
  /** column name */
  Kind = 'kind',
  /** column name */
  MitigationNotes = 'mitigationNotes',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'ownerId',
  /** column name */
  Priority = 'priority',
  /** column name */
  Probability = 'probability',
  /** column name */
  RiskCategory = 'riskCategory',
  /** column name */
  Severity = 'severity',
  /** column name */
  State = 'state',
  /** column name */
  Status = 'status',
  /** column name */
  TypeAssessment = 'typeAssessment',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type MotivationElementGeneric_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<MotivationElementGeneric_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<MotivationElementGeneric_Set_Input>;
  /** filter the rows which have to be updated */
  where: MotivationElementGeneric_Bool_Exp;
};

/** aggregate var_pop on columns */
export type MotivationElementGeneric_Var_Pop_Fields = {
  __typename?: 'MotivationElementGeneric_var_pop_fields';
  impact?: Maybe<Scalars['Float']['output']>;
  probability?: Maybe<Scalars['Float']['output']>;
  severity?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type MotivationElementGeneric_Var_Samp_Fields = {
  __typename?: 'MotivationElementGeneric_var_samp_fields';
  impact?: Maybe<Scalars['Float']['output']>;
  probability?: Maybe<Scalars['Float']['output']>;
  severity?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type MotivationElementGeneric_Variance_Fields = {
  __typename?: 'MotivationElementGeneric_variance_fields';
  impact?: Maybe<Scalars['Float']['output']>;
  probability?: Maybe<Scalars['Float']['output']>;
  severity?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "locations" */
export type PhysicalLocation = {
  __typename?: 'PhysicalLocation';
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  /** An array relationship */
  networks: Array<TechnologyNetwork>;
  /** An aggregate relationship */
  networks_aggregate: TechnologyNetwork_Aggregate;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "locations" */
export type PhysicalLocationNetworksArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNetwork_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNetwork_Order_By>>;
  where?: InputMaybe<TechnologyNetwork_Bool_Exp>;
};


/** columns and relationships of "locations" */
export type PhysicalLocationNetworks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNetwork_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNetwork_Order_By>>;
  where?: InputMaybe<TechnologyNetwork_Bool_Exp>;
};

/** aggregated selection of "locations" */
export type PhysicalLocation_Aggregate = {
  __typename?: 'PhysicalLocation_aggregate';
  aggregate?: Maybe<PhysicalLocation_Aggregate_Fields>;
  nodes: Array<PhysicalLocation>;
};

/** aggregate fields of "locations" */
export type PhysicalLocation_Aggregate_Fields = {
  __typename?: 'PhysicalLocation_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<PhysicalLocation_Max_Fields>;
  min?: Maybe<PhysicalLocation_Min_Fields>;
};


/** aggregate fields of "locations" */
export type PhysicalLocation_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<PhysicalLocation_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "locations". All fields are combined with a logical 'AND'. */
export type PhysicalLocation_Bool_Exp = {
  _and?: InputMaybe<Array<PhysicalLocation_Bool_Exp>>;
  _not?: InputMaybe<PhysicalLocation_Bool_Exp>;
  _or?: InputMaybe<Array<PhysicalLocation_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  networks?: InputMaybe<TechnologyNetwork_Bool_Exp>;
  networks_aggregate?: InputMaybe<TechnologyNetwork_Aggregate_Bool_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "locations" */
export enum PhysicalLocation_Constraint {
  /** unique or primary key constraint on columns "code" */
  LocationsCodeUnique = 'locations_code_unique',
  /** unique or primary key constraint on columns "id" */
  LocationsPkey = 'locations_pkey'
}

/** input type for inserting data into table "locations" */
export type PhysicalLocation_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  networks?: InputMaybe<TechnologyNetwork_Arr_Rel_Insert_Input>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type PhysicalLocation_Max_Fields = {
  __typename?: 'PhysicalLocation_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type PhysicalLocation_Min_Fields = {
  __typename?: 'PhysicalLocation_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "locations" */
export type PhysicalLocation_Mutation_Response = {
  __typename?: 'PhysicalLocation_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<PhysicalLocation>;
};

/** input type for inserting object relation for remote table "locations" */
export type PhysicalLocation_Obj_Rel_Insert_Input = {
  data: PhysicalLocation_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<PhysicalLocation_On_Conflict>;
};

/** on_conflict condition type for table "locations" */
export type PhysicalLocation_On_Conflict = {
  constraint: PhysicalLocation_Constraint;
  update_columns?: Array<PhysicalLocation_Update_Column>;
  where?: InputMaybe<PhysicalLocation_Bool_Exp>;
};

/** Ordering options when selecting data from "locations". */
export type PhysicalLocation_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  networks_aggregate?: InputMaybe<TechnologyNetwork_Aggregate_Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: locations */
export type PhysicalLocation_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "locations" */
export enum PhysicalLocation_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "locations" */
export type PhysicalLocation_Set_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "PhysicalLocation" */
export type PhysicalLocation_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: PhysicalLocation_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type PhysicalLocation_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "locations" */
export enum PhysicalLocation_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type PhysicalLocation_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<PhysicalLocation_Set_Input>;
  /** filter the rows which have to be updated */
  where: PhysicalLocation_Bool_Exp;
};

/** columns and relationships of "solutions" */
export type Solution = {
  __typename?: 'Solution';
  code: Scalars['String']['output'];
  /** An array relationship */
  components: Array<SolutionApplicationComponentMap>;
  /** An aggregate relationship */
  components_aggregate: SolutionApplicationComponentMap_Aggregate;
  /** An array relationship */
  constraints: Array<SolutionConstraintMap>;
  /** An aggregate relationship */
  constraints_aggregate: SolutionConstraintMap_Aggregate;
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  ownerId?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  state: DirectoryObject;
  stateId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "solutions" */
export type SolutionComponentsArgs = {
  distinct_on?: InputMaybe<Array<SolutionApplicationComponentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionApplicationComponentMap_Order_By>>;
  where?: InputMaybe<SolutionApplicationComponentMap_Bool_Exp>;
};


/** columns and relationships of "solutions" */
export type SolutionComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionApplicationComponentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionApplicationComponentMap_Order_By>>;
  where?: InputMaybe<SolutionApplicationComponentMap_Bool_Exp>;
};


/** columns and relationships of "solutions" */
export type SolutionConstraintsArgs = {
  distinct_on?: InputMaybe<Array<SolutionConstraintMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionConstraintMap_Order_By>>;
  where?: InputMaybe<SolutionConstraintMap_Bool_Exp>;
};


/** columns and relationships of "solutions" */
export type SolutionConstraints_AggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionConstraintMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionConstraintMap_Order_By>>;
  where?: InputMaybe<SolutionConstraintMap_Bool_Exp>;
};

/** columns and relationships of "map_solution_application_component" */
export type SolutionApplicationComponentMap = {
  __typename?: 'SolutionApplicationComponentMap';
  /** An object relationship */
  component: ApplicationComponent;
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  solution: Solution;
  solutionId: Scalars['uuid']['output'];
  state: Scalars['solution_item_state']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_solution_application_component" */
export type SolutionApplicationComponentMap_Aggregate = {
  __typename?: 'SolutionApplicationComponentMap_aggregate';
  aggregate?: Maybe<SolutionApplicationComponentMap_Aggregate_Fields>;
  nodes: Array<SolutionApplicationComponentMap>;
};

export type SolutionApplicationComponentMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<SolutionApplicationComponentMap_Aggregate_Bool_Exp_Count>;
};

export type SolutionApplicationComponentMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<SolutionApplicationComponentMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<SolutionApplicationComponentMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_solution_application_component" */
export type SolutionApplicationComponentMap_Aggregate_Fields = {
  __typename?: 'SolutionApplicationComponentMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<SolutionApplicationComponentMap_Max_Fields>;
  min?: Maybe<SolutionApplicationComponentMap_Min_Fields>;
};


/** aggregate fields of "map_solution_application_component" */
export type SolutionApplicationComponentMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<SolutionApplicationComponentMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_solution_application_component" */
export type SolutionApplicationComponentMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<SolutionApplicationComponentMap_Max_Order_By>;
  min?: InputMaybe<SolutionApplicationComponentMap_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_solution_application_component" */
export type SolutionApplicationComponentMap_Arr_Rel_Insert_Input = {
  data: Array<SolutionApplicationComponentMap_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<SolutionApplicationComponentMap_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_solution_application_component". All fields are combined with a logical 'AND'. */
export type SolutionApplicationComponentMap_Bool_Exp = {
  _and?: InputMaybe<Array<SolutionApplicationComponentMap_Bool_Exp>>;
  _not?: InputMaybe<SolutionApplicationComponentMap_Bool_Exp>;
  _or?: InputMaybe<Array<SolutionApplicationComponentMap_Bool_Exp>>;
  component?: InputMaybe<ApplicationComponent_Bool_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  solution?: InputMaybe<Solution_Bool_Exp>;
  solutionId?: InputMaybe<Uuid_Comparison_Exp>;
  state?: InputMaybe<Solution_Item_State_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_solution_application_component" */
export enum SolutionApplicationComponentMap_Constraint {
  /** unique or primary key constraint on columns "component_id", "solution_id" */
  MapSolutionApplicationComponentComponentIdS_23157Unique = 'map_solution_application_component_component_id_s_23157_unique',
  /** unique or primary key constraint on columns "component_id", "solution_id" */
  MapSolutionApplicationComponentPkey = 'map_solution_application_component_pkey'
}

/** input type for inserting data into table "map_solution_application_component" */
export type SolutionApplicationComponentMap_Insert_Input = {
  component?: InputMaybe<ApplicationComponent_Obj_Rel_Insert_Input>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  solution?: InputMaybe<Solution_Obj_Rel_Insert_Input>;
  solutionId?: InputMaybe<Scalars['uuid']['input']>;
  state?: InputMaybe<Scalars['solution_item_state']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type SolutionApplicationComponentMap_Max_Fields = {
  __typename?: 'SolutionApplicationComponentMap_max_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  solutionId?: Maybe<Scalars['uuid']['output']>;
  state?: Maybe<Scalars['solution_item_state']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_solution_application_component" */
export type SolutionApplicationComponentMap_Max_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  solutionId?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type SolutionApplicationComponentMap_Min_Fields = {
  __typename?: 'SolutionApplicationComponentMap_min_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  solutionId?: Maybe<Scalars['uuid']['output']>;
  state?: Maybe<Scalars['solution_item_state']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_solution_application_component" */
export type SolutionApplicationComponentMap_Min_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  solutionId?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "map_solution_application_component" */
export type SolutionApplicationComponentMap_Mutation_Response = {
  __typename?: 'SolutionApplicationComponentMap_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<SolutionApplicationComponentMap>;
};

/** on_conflict condition type for table "map_solution_application_component" */
export type SolutionApplicationComponentMap_On_Conflict = {
  constraint: SolutionApplicationComponentMap_Constraint;
  update_columns?: Array<SolutionApplicationComponentMap_Update_Column>;
  where?: InputMaybe<SolutionApplicationComponentMap_Bool_Exp>;
};

/** Ordering options when selecting data from "map_solution_application_component". */
export type SolutionApplicationComponentMap_Order_By = {
  component?: InputMaybe<ApplicationComponent_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  solution?: InputMaybe<Solution_Order_By>;
  solutionId?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_solution_application_component */
export type SolutionApplicationComponentMap_Pk_Columns_Input = {
  componentId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};

/** select columns of table "map_solution_application_component" */
export enum SolutionApplicationComponentMap_Select_Column {
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  SolutionId = 'solutionId',
  /** column name */
  State = 'state',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "map_solution_application_component" */
export type SolutionApplicationComponentMap_Set_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  solutionId?: InputMaybe<Scalars['uuid']['input']>;
  state?: InputMaybe<Scalars['solution_item_state']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "SolutionApplicationComponentMap" */
export type SolutionApplicationComponentMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: SolutionApplicationComponentMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type SolutionApplicationComponentMap_Stream_Cursor_Value_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  solutionId?: InputMaybe<Scalars['uuid']['input']>;
  state?: InputMaybe<Scalars['solution_item_state']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "map_solution_application_component" */
export enum SolutionApplicationComponentMap_Update_Column {
  /** column name */
  ComponentId = 'componentId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  SolutionId = 'solutionId',
  /** column name */
  State = 'state',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type SolutionApplicationComponentMap_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<SolutionApplicationComponentMap_Set_Input>;
  /** filter the rows which have to be updated */
  where: SolutionApplicationComponentMap_Bool_Exp;
};

/** columns and relationships of "map_solution_constraint" */
export type SolutionConstraintMap = {
  __typename?: 'SolutionConstraintMap';
  /** An object relationship */
  constraint: MotivationElementGeneric;
  constraintId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  solution: Solution;
  solutionId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_solution_constraint" */
export type SolutionConstraintMap_Aggregate = {
  __typename?: 'SolutionConstraintMap_aggregate';
  aggregate?: Maybe<SolutionConstraintMap_Aggregate_Fields>;
  nodes: Array<SolutionConstraintMap>;
};

export type SolutionConstraintMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<SolutionConstraintMap_Aggregate_Bool_Exp_Count>;
};

export type SolutionConstraintMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<SolutionConstraintMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<SolutionConstraintMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_solution_constraint" */
export type SolutionConstraintMap_Aggregate_Fields = {
  __typename?: 'SolutionConstraintMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<SolutionConstraintMap_Max_Fields>;
  min?: Maybe<SolutionConstraintMap_Min_Fields>;
};


/** aggregate fields of "map_solution_constraint" */
export type SolutionConstraintMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<SolutionConstraintMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_solution_constraint" */
export type SolutionConstraintMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<SolutionConstraintMap_Max_Order_By>;
  min?: InputMaybe<SolutionConstraintMap_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_solution_constraint" */
export type SolutionConstraintMap_Arr_Rel_Insert_Input = {
  data: Array<SolutionConstraintMap_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<SolutionConstraintMap_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_solution_constraint". All fields are combined with a logical 'AND'. */
export type SolutionConstraintMap_Bool_Exp = {
  _and?: InputMaybe<Array<SolutionConstraintMap_Bool_Exp>>;
  _not?: InputMaybe<SolutionConstraintMap_Bool_Exp>;
  _or?: InputMaybe<Array<SolutionConstraintMap_Bool_Exp>>;
  constraint?: InputMaybe<MotivationElementGeneric_Bool_Exp>;
  constraintId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  solution?: InputMaybe<Solution_Bool_Exp>;
  solutionId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_solution_constraint" */
export enum SolutionConstraintMap_Constraint {
  /** unique or primary key constraint on columns "constraint_id", "solution_id" */
  MapSolutionConstraintConstraintIdSolutionIdUnique = 'map_solution_constraint_constraint_id_solution_id_unique',
  /** unique or primary key constraint on columns "constraint_id", "solution_id" */
  MapSolutionConstraintPkey = 'map_solution_constraint_pkey'
}

/** input type for inserting data into table "map_solution_constraint" */
export type SolutionConstraintMap_Insert_Input = {
  constraint?: InputMaybe<MotivationElementGeneric_Obj_Rel_Insert_Input>;
  constraintId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  solution?: InputMaybe<Solution_Obj_Rel_Insert_Input>;
  solutionId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type SolutionConstraintMap_Max_Fields = {
  __typename?: 'SolutionConstraintMap_max_fields';
  constraintId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  solutionId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_solution_constraint" */
export type SolutionConstraintMap_Max_Order_By = {
  constraintId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  solutionId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type SolutionConstraintMap_Min_Fields = {
  __typename?: 'SolutionConstraintMap_min_fields';
  constraintId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  solutionId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_solution_constraint" */
export type SolutionConstraintMap_Min_Order_By = {
  constraintId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  solutionId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "map_solution_constraint" */
export type SolutionConstraintMap_Mutation_Response = {
  __typename?: 'SolutionConstraintMap_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<SolutionConstraintMap>;
};

/** on_conflict condition type for table "map_solution_constraint" */
export type SolutionConstraintMap_On_Conflict = {
  constraint: SolutionConstraintMap_Constraint;
  update_columns?: Array<SolutionConstraintMap_Update_Column>;
  where?: InputMaybe<SolutionConstraintMap_Bool_Exp>;
};

/** Ordering options when selecting data from "map_solution_constraint". */
export type SolutionConstraintMap_Order_By = {
  constraint?: InputMaybe<MotivationElementGeneric_Order_By>;
  constraintId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  solution?: InputMaybe<Solution_Order_By>;
  solutionId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_solution_constraint */
export type SolutionConstraintMap_Pk_Columns_Input = {
  constraintId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};

/** select columns of table "map_solution_constraint" */
export enum SolutionConstraintMap_Select_Column {
  /** column name */
  ConstraintId = 'constraintId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  SolutionId = 'solutionId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "map_solution_constraint" */
export type SolutionConstraintMap_Set_Input = {
  constraintId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  solutionId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "SolutionConstraintMap" */
export type SolutionConstraintMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: SolutionConstraintMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type SolutionConstraintMap_Stream_Cursor_Value_Input = {
  constraintId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  solutionId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "map_solution_constraint" */
export enum SolutionConstraintMap_Update_Column {
  /** column name */
  ConstraintId = 'constraintId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  SolutionId = 'solutionId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type SolutionConstraintMap_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<SolutionConstraintMap_Set_Input>;
  /** filter the rows which have to be updated */
  where: SolutionConstraintMap_Bool_Exp;
};

/** aggregated selection of "solutions" */
export type Solution_Aggregate = {
  __typename?: 'Solution_aggregate';
  aggregate?: Maybe<Solution_Aggregate_Fields>;
  nodes: Array<Solution>;
};

export type Solution_Aggregate_Bool_Exp = {
  count?: InputMaybe<Solution_Aggregate_Bool_Exp_Count>;
};

export type Solution_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Solution_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Solution_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "solutions" */
export type Solution_Aggregate_Fields = {
  __typename?: 'Solution_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Solution_Max_Fields>;
  min?: Maybe<Solution_Min_Fields>;
};


/** aggregate fields of "solutions" */
export type Solution_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Solution_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "solutions" */
export type Solution_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Solution_Max_Order_By>;
  min?: InputMaybe<Solution_Min_Order_By>;
};

/** input type for inserting array relation for remote table "solutions" */
export type Solution_Arr_Rel_Insert_Input = {
  data: Array<Solution_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Solution_On_Conflict>;
};

/** Boolean expression to filter rows from the table "solutions". All fields are combined with a logical 'AND'. */
export type Solution_Bool_Exp = {
  _and?: InputMaybe<Array<Solution_Bool_Exp>>;
  _not?: InputMaybe<Solution_Bool_Exp>;
  _or?: InputMaybe<Array<Solution_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  components?: InputMaybe<SolutionApplicationComponentMap_Bool_Exp>;
  components_aggregate?: InputMaybe<SolutionApplicationComponentMap_Aggregate_Bool_Exp>;
  constraints?: InputMaybe<SolutionConstraintMap_Bool_Exp>;
  constraints_aggregate?: InputMaybe<SolutionConstraintMap_Aggregate_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  ownerId?: InputMaybe<Uuid_Comparison_Exp>;
  state?: InputMaybe<DirectoryObject_Bool_Exp>;
  stateId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "solutions" */
export enum Solution_Constraint {
  /** unique or primary key constraint on columns "code" */
  SolutionsCodeUnique = 'solutions_code_unique',
  /** unique or primary key constraint on columns "id" */
  SolutionsPkey = 'solutions_pkey'
}

/** input type for inserting data into table "solutions" */
export type Solution_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  components?: InputMaybe<SolutionApplicationComponentMap_Arr_Rel_Insert_Input>;
  constraints?: InputMaybe<SolutionConstraintMap_Arr_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  state?: InputMaybe<DirectoryObject_Obj_Rel_Insert_Input>;
  stateId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Solution_Max_Fields = {
  __typename?: 'Solution_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  stateId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "solutions" */
export type Solution_Max_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  ownerId?: InputMaybe<Order_By>;
  stateId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Solution_Min_Fields = {
  __typename?: 'Solution_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  stateId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "solutions" */
export type Solution_Min_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  ownerId?: InputMaybe<Order_By>;
  stateId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "solutions" */
export type Solution_Mutation_Response = {
  __typename?: 'Solution_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Solution>;
};

/** input type for inserting object relation for remote table "solutions" */
export type Solution_Obj_Rel_Insert_Input = {
  data: Solution_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Solution_On_Conflict>;
};

/** on_conflict condition type for table "solutions" */
export type Solution_On_Conflict = {
  constraint: Solution_Constraint;
  update_columns?: Array<Solution_Update_Column>;
  where?: InputMaybe<Solution_Bool_Exp>;
};

/** Ordering options when selecting data from "solutions". */
export type Solution_Order_By = {
  code?: InputMaybe<Order_By>;
  components_aggregate?: InputMaybe<SolutionApplicationComponentMap_Aggregate_Order_By>;
  constraints_aggregate?: InputMaybe<SolutionConstraintMap_Aggregate_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  ownerId?: InputMaybe<Order_By>;
  state?: InputMaybe<DirectoryObject_Order_By>;
  stateId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: solutions */
export type Solution_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "solutions" */
export enum Solution_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'ownerId',
  /** column name */
  StateId = 'stateId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "solutions" */
export type Solution_Set_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  stateId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "Solution" */
export type Solution_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Solution_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Solution_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  stateId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "solutions" */
export enum Solution_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'ownerId',
  /** column name */
  StateId = 'stateId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type Solution_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Solution_Set_Input>;
  /** filter the rows which have to be updated */
  where: Solution_Bool_Exp;
};

/** columns and relationships of "stakeholders" */
export type Stakeholder = {
  __typename?: 'Stakeholder';
  code: Scalars['String']['output'];
  /** An array relationship */
  components: Array<ApplicationComponentStakeholderMap>;
  /** An aggregate relationship */
  components_aggregate: ApplicationComponentStakeholderMap_Aggregate;
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "stakeholders" */
export type StakeholderComponentsArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentStakeholderMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentStakeholderMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentStakeholderMap_Bool_Exp>;
};


/** columns and relationships of "stakeholders" */
export type StakeholderComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentStakeholderMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentStakeholderMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentStakeholderMap_Bool_Exp>;
};

/** aggregated selection of "stakeholders" */
export type Stakeholder_Aggregate = {
  __typename?: 'Stakeholder_aggregate';
  aggregate?: Maybe<Stakeholder_Aggregate_Fields>;
  nodes: Array<Stakeholder>;
};

/** aggregate fields of "stakeholders" */
export type Stakeholder_Aggregate_Fields = {
  __typename?: 'Stakeholder_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Stakeholder_Max_Fields>;
  min?: Maybe<Stakeholder_Min_Fields>;
};


/** aggregate fields of "stakeholders" */
export type Stakeholder_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Stakeholder_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "stakeholders". All fields are combined with a logical 'AND'. */
export type Stakeholder_Bool_Exp = {
  _and?: InputMaybe<Array<Stakeholder_Bool_Exp>>;
  _not?: InputMaybe<Stakeholder_Bool_Exp>;
  _or?: InputMaybe<Array<Stakeholder_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  components?: InputMaybe<ApplicationComponentStakeholderMap_Bool_Exp>;
  components_aggregate?: InputMaybe<ApplicationComponentStakeholderMap_Aggregate_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  ownerId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "stakeholders" */
export enum Stakeholder_Constraint {
  /** unique or primary key constraint on columns "code" */
  StakeholdersCodeUnique = 'stakeholders_code_unique',
  /** unique or primary key constraint on columns "id" */
  StakeholdersPkey = 'stakeholders_pkey'
}

/** input type for inserting data into table "stakeholders" */
export type Stakeholder_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  components?: InputMaybe<ApplicationComponentStakeholderMap_Arr_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Stakeholder_Max_Fields = {
  __typename?: 'Stakeholder_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type Stakeholder_Min_Fields = {
  __typename?: 'Stakeholder_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "stakeholders" */
export type Stakeholder_Mutation_Response = {
  __typename?: 'Stakeholder_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Stakeholder>;
};

/** input type for inserting object relation for remote table "stakeholders" */
export type Stakeholder_Obj_Rel_Insert_Input = {
  data: Stakeholder_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Stakeholder_On_Conflict>;
};

/** on_conflict condition type for table "stakeholders" */
export type Stakeholder_On_Conflict = {
  constraint: Stakeholder_Constraint;
  update_columns?: Array<Stakeholder_Update_Column>;
  where?: InputMaybe<Stakeholder_Bool_Exp>;
};

/** Ordering options when selecting data from "stakeholders". */
export type Stakeholder_Order_By = {
  code?: InputMaybe<Order_By>;
  components_aggregate?: InputMaybe<ApplicationComponentStakeholderMap_Aggregate_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  ownerId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: stakeholders */
export type Stakeholder_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "stakeholders" */
export enum Stakeholder_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'ownerId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "stakeholders" */
export type Stakeholder_Set_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "Stakeholder" */
export type Stakeholder_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Stakeholder_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Stakeholder_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "stakeholders" */
export enum Stakeholder_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'ownerId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type Stakeholder_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Stakeholder_Set_Input>;
  /** filter the rows which have to be updated */
  where: Stakeholder_Bool_Exp;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "system_software" */
export type SystemSoftware = {
  __typename?: 'SystemSoftware';
  code: Scalars['String']['output'];
  /** An array relationship */
  components: Array<ApplicationComponentSystemSoftwareMap>;
  /** An aggregate relationship */
  components_aggregate: ApplicationComponentSystemSoftwareMap_Aggregate;
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  kind: Scalars['system_software_kind_enum']['output'];
  /** An object relationship */
  licenseType?: Maybe<DirectoryObject>;
  licenseTypeId?: Maybe<Scalars['uuid']['output']>;
  name: Scalars['String']['output'];
  /** An array relationship */
  nodes: Array<TechnologyNodeSystemSoftwareMap>;
  /** An aggregate relationship */
  nodes_aggregate: TechnologyNodeSystemSoftwareMap_Aggregate;
  /** An array relationship */
  operatingSystem: Array<TechnologyNode>;
  /** An aggregate relationship */
  operatingSystem_aggregate: TechnologyNode_Aggregate;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  type?: Maybe<DirectoryObject>;
  typeId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};


/** columns and relationships of "system_software" */
export type SystemSoftwareComponentsArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentSystemSoftwareMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentSystemSoftwareMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentSystemSoftwareMap_Bool_Exp>;
};


/** columns and relationships of "system_software" */
export type SystemSoftwareComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentSystemSoftwareMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentSystemSoftwareMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentSystemSoftwareMap_Bool_Exp>;
};


/** columns and relationships of "system_software" */
export type SystemSoftwareNodesArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNodeSystemSoftwareMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNodeSystemSoftwareMap_Order_By>>;
  where?: InputMaybe<TechnologyNodeSystemSoftwareMap_Bool_Exp>;
};


/** columns and relationships of "system_software" */
export type SystemSoftwareNodes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNodeSystemSoftwareMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNodeSystemSoftwareMap_Order_By>>;
  where?: InputMaybe<TechnologyNodeSystemSoftwareMap_Bool_Exp>;
};


/** columns and relationships of "system_software" */
export type SystemSoftwareOperatingSystemArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNode_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNode_Order_By>>;
  where?: InputMaybe<TechnologyNode_Bool_Exp>;
};


/** columns and relationships of "system_software" */
export type SystemSoftwareOperatingSystem_AggregateArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNode_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNode_Order_By>>;
  where?: InputMaybe<TechnologyNode_Bool_Exp>;
};

/** aggregated selection of "system_software" */
export type SystemSoftware_Aggregate = {
  __typename?: 'SystemSoftware_aggregate';
  aggregate?: Maybe<SystemSoftware_Aggregate_Fields>;
  nodes: Array<SystemSoftware>;
};

export type SystemSoftware_Aggregate_Bool_Exp = {
  count?: InputMaybe<SystemSoftware_Aggregate_Bool_Exp_Count>;
};

export type SystemSoftware_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<SystemSoftware_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<SystemSoftware_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "system_software" */
export type SystemSoftware_Aggregate_Fields = {
  __typename?: 'SystemSoftware_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<SystemSoftware_Max_Fields>;
  min?: Maybe<SystemSoftware_Min_Fields>;
};


/** aggregate fields of "system_software" */
export type SystemSoftware_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<SystemSoftware_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "system_software" */
export type SystemSoftware_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<SystemSoftware_Max_Order_By>;
  min?: InputMaybe<SystemSoftware_Min_Order_By>;
};

/** input type for inserting array relation for remote table "system_software" */
export type SystemSoftware_Arr_Rel_Insert_Input = {
  data: Array<SystemSoftware_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<SystemSoftware_On_Conflict>;
};

/** Boolean expression to filter rows from the table "system_software". All fields are combined with a logical 'AND'. */
export type SystemSoftware_Bool_Exp = {
  _and?: InputMaybe<Array<SystemSoftware_Bool_Exp>>;
  _not?: InputMaybe<SystemSoftware_Bool_Exp>;
  _or?: InputMaybe<Array<SystemSoftware_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  components?: InputMaybe<ApplicationComponentSystemSoftwareMap_Bool_Exp>;
  components_aggregate?: InputMaybe<ApplicationComponentSystemSoftwareMap_Aggregate_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  kind?: InputMaybe<System_Software_Kind_Enum_Comparison_Exp>;
  licenseType?: InputMaybe<DirectoryObject_Bool_Exp>;
  licenseTypeId?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  nodes?: InputMaybe<TechnologyNodeSystemSoftwareMap_Bool_Exp>;
  nodes_aggregate?: InputMaybe<TechnologyNodeSystemSoftwareMap_Aggregate_Bool_Exp>;
  operatingSystem?: InputMaybe<TechnologyNode_Bool_Exp>;
  operatingSystem_aggregate?: InputMaybe<TechnologyNode_Aggregate_Bool_Exp>;
  ownerId?: InputMaybe<Uuid_Comparison_Exp>;
  type?: InputMaybe<DirectoryObject_Bool_Exp>;
  typeId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
  version?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "system_software" */
export enum SystemSoftware_Constraint {
  /** unique or primary key constraint on columns "code" */
  SystemSoftwareCodeUnique = 'system_software_code_unique',
  /** unique or primary key constraint on columns "id" */
  SystemSoftwarePkey = 'system_software_pkey'
}

/** input type for inserting data into table "system_software" */
export type SystemSoftware_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  components?: InputMaybe<ApplicationComponentSystemSoftwareMap_Arr_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  kind?: InputMaybe<Scalars['system_software_kind_enum']['input']>;
  licenseType?: InputMaybe<DirectoryObject_Obj_Rel_Insert_Input>;
  licenseTypeId?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nodes?: InputMaybe<TechnologyNodeSystemSoftwareMap_Arr_Rel_Insert_Input>;
  operatingSystem?: InputMaybe<TechnologyNode_Arr_Rel_Insert_Input>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  type?: InputMaybe<DirectoryObject_Obj_Rel_Insert_Input>;
  typeId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type SystemSoftware_Max_Fields = {
  __typename?: 'SystemSoftware_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  kind?: Maybe<Scalars['system_software_kind_enum']['output']>;
  licenseTypeId?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  typeId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "system_software" */
export type SystemSoftware_Max_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  licenseTypeId?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  ownerId?: InputMaybe<Order_By>;
  typeId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type SystemSoftware_Min_Fields = {
  __typename?: 'SystemSoftware_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  kind?: Maybe<Scalars['system_software_kind_enum']['output']>;
  licenseTypeId?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  typeId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "system_software" */
export type SystemSoftware_Min_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  licenseTypeId?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  ownerId?: InputMaybe<Order_By>;
  typeId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "system_software" */
export type SystemSoftware_Mutation_Response = {
  __typename?: 'SystemSoftware_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<SystemSoftware>;
};

/** input type for inserting object relation for remote table "system_software" */
export type SystemSoftware_Obj_Rel_Insert_Input = {
  data: SystemSoftware_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<SystemSoftware_On_Conflict>;
};

/** on_conflict condition type for table "system_software" */
export type SystemSoftware_On_Conflict = {
  constraint: SystemSoftware_Constraint;
  update_columns?: Array<SystemSoftware_Update_Column>;
  where?: InputMaybe<SystemSoftware_Bool_Exp>;
};

/** Ordering options when selecting data from "system_software". */
export type SystemSoftware_Order_By = {
  code?: InputMaybe<Order_By>;
  components_aggregate?: InputMaybe<ApplicationComponentSystemSoftwareMap_Aggregate_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  licenseType?: InputMaybe<DirectoryObject_Order_By>;
  licenseTypeId?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  nodes_aggregate?: InputMaybe<TechnologyNodeSystemSoftwareMap_Aggregate_Order_By>;
  operatingSystem_aggregate?: InputMaybe<TechnologyNode_Aggregate_Order_By>;
  ownerId?: InputMaybe<Order_By>;
  type?: InputMaybe<DirectoryObject_Order_By>;
  typeId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** primary key columns input for table: system_software */
export type SystemSoftware_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "system_software" */
export enum SystemSoftware_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Kind = 'kind',
  /** column name */
  LicenseTypeId = 'licenseTypeId',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'ownerId',
  /** column name */
  TypeId = 'typeId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy',
  /** column name */
  Version = 'version'
}

/** input type for updating data in table "system_software" */
export type SystemSoftware_Set_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  kind?: InputMaybe<Scalars['system_software_kind_enum']['input']>;
  licenseTypeId?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  typeId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "SystemSoftware" */
export type SystemSoftware_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: SystemSoftware_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type SystemSoftware_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  kind?: InputMaybe<Scalars['system_software_kind_enum']['input']>;
  licenseTypeId?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  typeId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "system_software" */
export enum SystemSoftware_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Kind = 'kind',
  /** column name */
  LicenseTypeId = 'licenseTypeId',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'ownerId',
  /** column name */
  TypeId = 'typeId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy',
  /** column name */
  Version = 'version'
}

export type SystemSoftware_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<SystemSoftware_Set_Input>;
  /** filter the rows which have to be updated */
  where: SystemSoftware_Bool_Exp;
};

/** columns and relationships of "technology_networks" */
export type TechnologyNetwork = {
  __typename?: 'TechnologyNetwork';
  /** An array relationship */
  child: Array<TechnologyNetworkHierarchyMap>;
  /** An aggregate relationship */
  child_aggregate: TechnologyNetworkHierarchyMap_Aggregate;
  code: Scalars['String']['output'];
  /** An array relationship */
  components: Array<ApplicationComponentTechnologyLogicalNetworkMap>;
  /** An aggregate relationship */
  components_aggregate: ApplicationComponentTechnologyLogicalNetworkMap_Aggregate;
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  environment?: Maybe<Scalars['environment_enum']['output']>;
  id: Scalars['uuid']['output'];
  level: Scalars['network_abstraction_level_enum']['output'];
  /** An object relationship */
  location?: Maybe<PhysicalLocation>;
  locationId?: Maybe<Scalars['uuid']['output']>;
  name: Scalars['String']['output'];
  /** An array relationship */
  nodes: Array<TechnologyNode>;
  /** An aggregate relationship */
  nodes_aggregate: TechnologyNode_Aggregate;
  /** An array relationship */
  parent: Array<TechnologyNetworkHierarchyMap>;
  /** An aggregate relationship */
  parent_aggregate: TechnologyNetworkHierarchyMap_Aggregate;
  scope?: Maybe<Scalars['network_scope_enum']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "technology_networks" */
export type TechnologyNetworkChildArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNetworkHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNetworkHierarchyMap_Order_By>>;
  where?: InputMaybe<TechnologyNetworkHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "technology_networks" */
export type TechnologyNetworkChild_AggregateArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNetworkHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNetworkHierarchyMap_Order_By>>;
  where?: InputMaybe<TechnologyNetworkHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "technology_networks" */
export type TechnologyNetworkComponentsArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentTechnologyLogicalNetworkMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentTechnologyLogicalNetworkMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_Bool_Exp>;
};


/** columns and relationships of "technology_networks" */
export type TechnologyNetworkComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentTechnologyLogicalNetworkMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentTechnologyLogicalNetworkMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_Bool_Exp>;
};


/** columns and relationships of "technology_networks" */
export type TechnologyNetworkNodesArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNode_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNode_Order_By>>;
  where?: InputMaybe<TechnologyNode_Bool_Exp>;
};


/** columns and relationships of "technology_networks" */
export type TechnologyNetworkNodes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNode_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNode_Order_By>>;
  where?: InputMaybe<TechnologyNode_Bool_Exp>;
};


/** columns and relationships of "technology_networks" */
export type TechnologyNetworkParentArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNetworkHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNetworkHierarchyMap_Order_By>>;
  where?: InputMaybe<TechnologyNetworkHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "technology_networks" */
export type TechnologyNetworkParent_AggregateArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNetworkHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNetworkHierarchyMap_Order_By>>;
  where?: InputMaybe<TechnologyNetworkHierarchyMap_Bool_Exp>;
};

/** columns and relationships of "map_technology_network_hierarchy" */
export type TechnologyNetworkHierarchyMap = {
  __typename?: 'TechnologyNetworkHierarchyMap';
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  networkChild: TechnologyNetwork;
  networkChildId: Scalars['uuid']['output'];
  /** An object relationship */
  networkParent: TechnologyNetwork;
  networkParentId: Scalars['uuid']['output'];
  order?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_technology_network_hierarchy" */
export type TechnologyNetworkHierarchyMap_Aggregate = {
  __typename?: 'TechnologyNetworkHierarchyMap_aggregate';
  aggregate?: Maybe<TechnologyNetworkHierarchyMap_Aggregate_Fields>;
  nodes: Array<TechnologyNetworkHierarchyMap>;
};

export type TechnologyNetworkHierarchyMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<TechnologyNetworkHierarchyMap_Aggregate_Bool_Exp_Count>;
};

export type TechnologyNetworkHierarchyMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<TechnologyNetworkHierarchyMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<TechnologyNetworkHierarchyMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_technology_network_hierarchy" */
export type TechnologyNetworkHierarchyMap_Aggregate_Fields = {
  __typename?: 'TechnologyNetworkHierarchyMap_aggregate_fields';
  avg?: Maybe<TechnologyNetworkHierarchyMap_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<TechnologyNetworkHierarchyMap_Max_Fields>;
  min?: Maybe<TechnologyNetworkHierarchyMap_Min_Fields>;
  stddev?: Maybe<TechnologyNetworkHierarchyMap_Stddev_Fields>;
  stddev_pop?: Maybe<TechnologyNetworkHierarchyMap_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<TechnologyNetworkHierarchyMap_Stddev_Samp_Fields>;
  sum?: Maybe<TechnologyNetworkHierarchyMap_Sum_Fields>;
  var_pop?: Maybe<TechnologyNetworkHierarchyMap_Var_Pop_Fields>;
  var_samp?: Maybe<TechnologyNetworkHierarchyMap_Var_Samp_Fields>;
  variance?: Maybe<TechnologyNetworkHierarchyMap_Variance_Fields>;
};


/** aggregate fields of "map_technology_network_hierarchy" */
export type TechnologyNetworkHierarchyMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<TechnologyNetworkHierarchyMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_technology_network_hierarchy" */
export type TechnologyNetworkHierarchyMap_Aggregate_Order_By = {
  avg?: InputMaybe<TechnologyNetworkHierarchyMap_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<TechnologyNetworkHierarchyMap_Max_Order_By>;
  min?: InputMaybe<TechnologyNetworkHierarchyMap_Min_Order_By>;
  stddev?: InputMaybe<TechnologyNetworkHierarchyMap_Stddev_Order_By>;
  stddev_pop?: InputMaybe<TechnologyNetworkHierarchyMap_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<TechnologyNetworkHierarchyMap_Stddev_Samp_Order_By>;
  sum?: InputMaybe<TechnologyNetworkHierarchyMap_Sum_Order_By>;
  var_pop?: InputMaybe<TechnologyNetworkHierarchyMap_Var_Pop_Order_By>;
  var_samp?: InputMaybe<TechnologyNetworkHierarchyMap_Var_Samp_Order_By>;
  variance?: InputMaybe<TechnologyNetworkHierarchyMap_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "map_technology_network_hierarchy" */
export type TechnologyNetworkHierarchyMap_Arr_Rel_Insert_Input = {
  data: Array<TechnologyNetworkHierarchyMap_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<TechnologyNetworkHierarchyMap_On_Conflict>;
};

/** aggregate avg on columns */
export type TechnologyNetworkHierarchyMap_Avg_Fields = {
  __typename?: 'TechnologyNetworkHierarchyMap_avg_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "map_technology_network_hierarchy" */
export type TechnologyNetworkHierarchyMap_Avg_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "map_technology_network_hierarchy". All fields are combined with a logical 'AND'. */
export type TechnologyNetworkHierarchyMap_Bool_Exp = {
  _and?: InputMaybe<Array<TechnologyNetworkHierarchyMap_Bool_Exp>>;
  _not?: InputMaybe<TechnologyNetworkHierarchyMap_Bool_Exp>;
  _or?: InputMaybe<Array<TechnologyNetworkHierarchyMap_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  networkChild?: InputMaybe<TechnologyNetwork_Bool_Exp>;
  networkChildId?: InputMaybe<Uuid_Comparison_Exp>;
  networkParent?: InputMaybe<TechnologyNetwork_Bool_Exp>;
  networkParentId?: InputMaybe<Uuid_Comparison_Exp>;
  order?: InputMaybe<Int_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_technology_network_hierarchy" */
export enum TechnologyNetworkHierarchyMap_Constraint {
  /** unique or primary key constraint on columns "network_child_id", "network_parent_id" */
  MapTechnologyNetworkHierarchyNetworkParentI_7f01cUnique = 'map_technology_network_hierarchy_network_parent_i_7f01c_unique',
  /** unique or primary key constraint on columns "network_child_id", "network_parent_id" */
  MapTechnologyNetworkHierarchyPkey = 'map_technology_network_hierarchy_pkey'
}

/** input type for incrementing numeric columns in table "map_technology_network_hierarchy" */
export type TechnologyNetworkHierarchyMap_Inc_Input = {
  order?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "map_technology_network_hierarchy" */
export type TechnologyNetworkHierarchyMap_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  networkChild?: InputMaybe<TechnologyNetwork_Obj_Rel_Insert_Input>;
  networkChildId?: InputMaybe<Scalars['uuid']['input']>;
  networkParent?: InputMaybe<TechnologyNetwork_Obj_Rel_Insert_Input>;
  networkParentId?: InputMaybe<Scalars['uuid']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type TechnologyNetworkHierarchyMap_Max_Fields = {
  __typename?: 'TechnologyNetworkHierarchyMap_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  networkChildId?: Maybe<Scalars['uuid']['output']>;
  networkParentId?: Maybe<Scalars['uuid']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_technology_network_hierarchy" */
export type TechnologyNetworkHierarchyMap_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  networkChildId?: InputMaybe<Order_By>;
  networkParentId?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type TechnologyNetworkHierarchyMap_Min_Fields = {
  __typename?: 'TechnologyNetworkHierarchyMap_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  networkChildId?: Maybe<Scalars['uuid']['output']>;
  networkParentId?: Maybe<Scalars['uuid']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_technology_network_hierarchy" */
export type TechnologyNetworkHierarchyMap_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  networkChildId?: InputMaybe<Order_By>;
  networkParentId?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "map_technology_network_hierarchy" */
export type TechnologyNetworkHierarchyMap_Mutation_Response = {
  __typename?: 'TechnologyNetworkHierarchyMap_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<TechnologyNetworkHierarchyMap>;
};

/** on_conflict condition type for table "map_technology_network_hierarchy" */
export type TechnologyNetworkHierarchyMap_On_Conflict = {
  constraint: TechnologyNetworkHierarchyMap_Constraint;
  update_columns?: Array<TechnologyNetworkHierarchyMap_Update_Column>;
  where?: InputMaybe<TechnologyNetworkHierarchyMap_Bool_Exp>;
};

/** Ordering options when selecting data from "map_technology_network_hierarchy". */
export type TechnologyNetworkHierarchyMap_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  networkChild?: InputMaybe<TechnologyNetwork_Order_By>;
  networkChildId?: InputMaybe<Order_By>;
  networkParent?: InputMaybe<TechnologyNetwork_Order_By>;
  networkParentId?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_technology_network_hierarchy */
export type TechnologyNetworkHierarchyMap_Pk_Columns_Input = {
  networkChildId: Scalars['uuid']['input'];
  networkParentId: Scalars['uuid']['input'];
};

/** select columns of table "map_technology_network_hierarchy" */
export enum TechnologyNetworkHierarchyMap_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  NetworkChildId = 'networkChildId',
  /** column name */
  NetworkParentId = 'networkParentId',
  /** column name */
  Order = 'order',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "map_technology_network_hierarchy" */
export type TechnologyNetworkHierarchyMap_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  networkChildId?: InputMaybe<Scalars['uuid']['input']>;
  networkParentId?: InputMaybe<Scalars['uuid']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type TechnologyNetworkHierarchyMap_Stddev_Fields = {
  __typename?: 'TechnologyNetworkHierarchyMap_stddev_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "map_technology_network_hierarchy" */
export type TechnologyNetworkHierarchyMap_Stddev_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type TechnologyNetworkHierarchyMap_Stddev_Pop_Fields = {
  __typename?: 'TechnologyNetworkHierarchyMap_stddev_pop_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "map_technology_network_hierarchy" */
export type TechnologyNetworkHierarchyMap_Stddev_Pop_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type TechnologyNetworkHierarchyMap_Stddev_Samp_Fields = {
  __typename?: 'TechnologyNetworkHierarchyMap_stddev_samp_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "map_technology_network_hierarchy" */
export type TechnologyNetworkHierarchyMap_Stddev_Samp_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "TechnologyNetworkHierarchyMap" */
export type TechnologyNetworkHierarchyMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: TechnologyNetworkHierarchyMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type TechnologyNetworkHierarchyMap_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  networkChildId?: InputMaybe<Scalars['uuid']['input']>;
  networkParentId?: InputMaybe<Scalars['uuid']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type TechnologyNetworkHierarchyMap_Sum_Fields = {
  __typename?: 'TechnologyNetworkHierarchyMap_sum_fields';
  order?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "map_technology_network_hierarchy" */
export type TechnologyNetworkHierarchyMap_Sum_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** update columns of table "map_technology_network_hierarchy" */
export enum TechnologyNetworkHierarchyMap_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  NetworkChildId = 'networkChildId',
  /** column name */
  NetworkParentId = 'networkParentId',
  /** column name */
  Order = 'order',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type TechnologyNetworkHierarchyMap_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<TechnologyNetworkHierarchyMap_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<TechnologyNetworkHierarchyMap_Set_Input>;
  /** filter the rows which have to be updated */
  where: TechnologyNetworkHierarchyMap_Bool_Exp;
};

/** aggregate var_pop on columns */
export type TechnologyNetworkHierarchyMap_Var_Pop_Fields = {
  __typename?: 'TechnologyNetworkHierarchyMap_var_pop_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "map_technology_network_hierarchy" */
export type TechnologyNetworkHierarchyMap_Var_Pop_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type TechnologyNetworkHierarchyMap_Var_Samp_Fields = {
  __typename?: 'TechnologyNetworkHierarchyMap_var_samp_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "map_technology_network_hierarchy" */
export type TechnologyNetworkHierarchyMap_Var_Samp_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type TechnologyNetworkHierarchyMap_Variance_Fields = {
  __typename?: 'TechnologyNetworkHierarchyMap_variance_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "map_technology_network_hierarchy" */
export type TechnologyNetworkHierarchyMap_Variance_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregated selection of "technology_networks" */
export type TechnologyNetwork_Aggregate = {
  __typename?: 'TechnologyNetwork_aggregate';
  aggregate?: Maybe<TechnologyNetwork_Aggregate_Fields>;
  nodes: Array<TechnologyNetwork>;
};

export type TechnologyNetwork_Aggregate_Bool_Exp = {
  count?: InputMaybe<TechnologyNetwork_Aggregate_Bool_Exp_Count>;
};

export type TechnologyNetwork_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<TechnologyNetwork_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<TechnologyNetwork_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "technology_networks" */
export type TechnologyNetwork_Aggregate_Fields = {
  __typename?: 'TechnologyNetwork_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<TechnologyNetwork_Max_Fields>;
  min?: Maybe<TechnologyNetwork_Min_Fields>;
};


/** aggregate fields of "technology_networks" */
export type TechnologyNetwork_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<TechnologyNetwork_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "technology_networks" */
export type TechnologyNetwork_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<TechnologyNetwork_Max_Order_By>;
  min?: InputMaybe<TechnologyNetwork_Min_Order_By>;
};

/** input type for inserting array relation for remote table "technology_networks" */
export type TechnologyNetwork_Arr_Rel_Insert_Input = {
  data: Array<TechnologyNetwork_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<TechnologyNetwork_On_Conflict>;
};

/** Boolean expression to filter rows from the table "technology_networks". All fields are combined with a logical 'AND'. */
export type TechnologyNetwork_Bool_Exp = {
  _and?: InputMaybe<Array<TechnologyNetwork_Bool_Exp>>;
  _not?: InputMaybe<TechnologyNetwork_Bool_Exp>;
  _or?: InputMaybe<Array<TechnologyNetwork_Bool_Exp>>;
  child?: InputMaybe<TechnologyNetworkHierarchyMap_Bool_Exp>;
  child_aggregate?: InputMaybe<TechnologyNetworkHierarchyMap_Aggregate_Bool_Exp>;
  code?: InputMaybe<String_Comparison_Exp>;
  components?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_Bool_Exp>;
  components_aggregate?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_Aggregate_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  environment?: InputMaybe<Environment_Enum_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  level?: InputMaybe<Network_Abstraction_Level_Enum_Comparison_Exp>;
  location?: InputMaybe<PhysicalLocation_Bool_Exp>;
  locationId?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  nodes?: InputMaybe<TechnologyNode_Bool_Exp>;
  nodes_aggregate?: InputMaybe<TechnologyNode_Aggregate_Bool_Exp>;
  parent?: InputMaybe<TechnologyNetworkHierarchyMap_Bool_Exp>;
  parent_aggregate?: InputMaybe<TechnologyNetworkHierarchyMap_Aggregate_Bool_Exp>;
  scope?: InputMaybe<Network_Scope_Enum_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "technology_networks" */
export enum TechnologyNetwork_Constraint {
  /** unique or primary key constraint on columns "code" */
  TechnologyNetworksCodeUnique = 'technology_networks_code_unique',
  /** unique or primary key constraint on columns "id" */
  TechnologyNetworksPkey = 'technology_networks_pkey'
}

/** input type for inserting data into table "technology_networks" */
export type TechnologyNetwork_Insert_Input = {
  child?: InputMaybe<TechnologyNetworkHierarchyMap_Arr_Rel_Insert_Input>;
  code?: InputMaybe<Scalars['String']['input']>;
  components?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_Arr_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  environment?: InputMaybe<Scalars['environment_enum']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  level?: InputMaybe<Scalars['network_abstraction_level_enum']['input']>;
  location?: InputMaybe<PhysicalLocation_Obj_Rel_Insert_Input>;
  locationId?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nodes?: InputMaybe<TechnologyNode_Arr_Rel_Insert_Input>;
  parent?: InputMaybe<TechnologyNetworkHierarchyMap_Arr_Rel_Insert_Input>;
  scope?: InputMaybe<Scalars['network_scope_enum']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type TechnologyNetwork_Max_Fields = {
  __typename?: 'TechnologyNetwork_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  environment?: Maybe<Scalars['environment_enum']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  level?: Maybe<Scalars['network_abstraction_level_enum']['output']>;
  locationId?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  scope?: Maybe<Scalars['network_scope_enum']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "technology_networks" */
export type TechnologyNetwork_Max_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  environment?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  level?: InputMaybe<Order_By>;
  locationId?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  scope?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type TechnologyNetwork_Min_Fields = {
  __typename?: 'TechnologyNetwork_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  environment?: Maybe<Scalars['environment_enum']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  level?: Maybe<Scalars['network_abstraction_level_enum']['output']>;
  locationId?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  scope?: Maybe<Scalars['network_scope_enum']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "technology_networks" */
export type TechnologyNetwork_Min_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  environment?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  level?: InputMaybe<Order_By>;
  locationId?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  scope?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "technology_networks" */
export type TechnologyNetwork_Mutation_Response = {
  __typename?: 'TechnologyNetwork_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<TechnologyNetwork>;
};

/** input type for inserting object relation for remote table "technology_networks" */
export type TechnologyNetwork_Obj_Rel_Insert_Input = {
  data: TechnologyNetwork_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<TechnologyNetwork_On_Conflict>;
};

/** on_conflict condition type for table "technology_networks" */
export type TechnologyNetwork_On_Conflict = {
  constraint: TechnologyNetwork_Constraint;
  update_columns?: Array<TechnologyNetwork_Update_Column>;
  where?: InputMaybe<TechnologyNetwork_Bool_Exp>;
};

/** Ordering options when selecting data from "technology_networks". */
export type TechnologyNetwork_Order_By = {
  child_aggregate?: InputMaybe<TechnologyNetworkHierarchyMap_Aggregate_Order_By>;
  code?: InputMaybe<Order_By>;
  components_aggregate?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_Aggregate_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  environment?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  level?: InputMaybe<Order_By>;
  location?: InputMaybe<PhysicalLocation_Order_By>;
  locationId?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  nodes_aggregate?: InputMaybe<TechnologyNode_Aggregate_Order_By>;
  parent_aggregate?: InputMaybe<TechnologyNetworkHierarchyMap_Aggregate_Order_By>;
  scope?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: technology_networks */
export type TechnologyNetwork_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "technology_networks" */
export enum TechnologyNetwork_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Environment = 'environment',
  /** column name */
  Id = 'id',
  /** column name */
  Level = 'level',
  /** column name */
  LocationId = 'locationId',
  /** column name */
  Name = 'name',
  /** column name */
  Scope = 'scope',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "technology_networks" */
export type TechnologyNetwork_Set_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  environment?: InputMaybe<Scalars['environment_enum']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  level?: InputMaybe<Scalars['network_abstraction_level_enum']['input']>;
  locationId?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['network_scope_enum']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "TechnologyNetwork" */
export type TechnologyNetwork_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: TechnologyNetwork_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type TechnologyNetwork_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  environment?: InputMaybe<Scalars['environment_enum']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  level?: InputMaybe<Scalars['network_abstraction_level_enum']['input']>;
  locationId?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['network_scope_enum']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "technology_networks" */
export enum TechnologyNetwork_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Environment = 'environment',
  /** column name */
  Id = 'id',
  /** column name */
  Level = 'level',
  /** column name */
  LocationId = 'locationId',
  /** column name */
  Name = 'name',
  /** column name */
  Scope = 'scope',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type TechnologyNetwork_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<TechnologyNetwork_Set_Input>;
  /** filter the rows which have to be updated */
  where: TechnologyNetwork_Bool_Exp;
};

/** columns and relationships of "technology_nodes" */
export type TechnologyNode = {
  __typename?: 'TechnologyNode';
  architecture: Scalars['system_architecture_kind_enum']['output'];
  /** An array relationship */
  child: Array<TechnologyNodeHierarchyMap>;
  /** An aggregate relationship */
  child_aggregate: TechnologyNodeHierarchyMap_Aggregate;
  code: Scalars['String']['output'];
  /** An array relationship */
  components: Array<ApplicationComponentTechnologyNodeMap>;
  /** An aggregate relationship */
  components_aggregate: ApplicationComponentTechnologyNodeMap_Aggregate;
  cpuCores?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  environment: Scalars['environment_enum']['output'];
  id: Scalars['uuid']['output'];
  kind: Scalars['node_kind_enum']['output'];
  name: Scalars['String']['output'];
  /** An object relationship */
  network?: Maybe<TechnologyNetwork>;
  networkId?: Maybe<Scalars['uuid']['output']>;
  nodeCount?: Maybe<Scalars['Int']['output']>;
  /** An object relationship */
  operatingSystem: SystemSoftware;
  operatingSystemId: Scalars['uuid']['output'];
  /** An array relationship */
  parent: Array<TechnologyNodeHierarchyMap>;
  /** An aggregate relationship */
  parent_aggregate: TechnologyNodeHierarchyMap_Aggregate;
  ramGb?: Maybe<Scalars['Int']['output']>;
  storageGb?: Maybe<Scalars['Int']['output']>;
  /** An array relationship */
  systemSoftware: Array<TechnologyNodeSystemSoftwareMap>;
  /** An aggregate relationship */
  systemSoftware_aggregate: TechnologyNodeSystemSoftwareMap_Aggregate;
  totalCpuCores?: Maybe<Scalars['Int']['output']>;
  totalRamGb?: Maybe<Scalars['Int']['output']>;
  totalStorageGb?: Maybe<Scalars['Int']['output']>;
  /** An object relationship */
  type: DirectoryObject;
  typeId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "technology_nodes" */
export type TechnologyNodeChildArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNodeHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNodeHierarchyMap_Order_By>>;
  where?: InputMaybe<TechnologyNodeHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "technology_nodes" */
export type TechnologyNodeChild_AggregateArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNodeHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNodeHierarchyMap_Order_By>>;
  where?: InputMaybe<TechnologyNodeHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "technology_nodes" */
export type TechnologyNodeComponentsArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentTechnologyNodeMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentTechnologyNodeMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentTechnologyNodeMap_Bool_Exp>;
};


/** columns and relationships of "technology_nodes" */
export type TechnologyNodeComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentTechnologyNodeMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentTechnologyNodeMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentTechnologyNodeMap_Bool_Exp>;
};


/** columns and relationships of "technology_nodes" */
export type TechnologyNodeParentArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNodeHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNodeHierarchyMap_Order_By>>;
  where?: InputMaybe<TechnologyNodeHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "technology_nodes" */
export type TechnologyNodeParent_AggregateArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNodeHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNodeHierarchyMap_Order_By>>;
  where?: InputMaybe<TechnologyNodeHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "technology_nodes" */
export type TechnologyNodeSystemSoftwareArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNodeSystemSoftwareMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNodeSystemSoftwareMap_Order_By>>;
  where?: InputMaybe<TechnologyNodeSystemSoftwareMap_Bool_Exp>;
};


/** columns and relationships of "technology_nodes" */
export type TechnologyNodeSystemSoftware_AggregateArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNodeSystemSoftwareMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNodeSystemSoftwareMap_Order_By>>;
  where?: InputMaybe<TechnologyNodeSystemSoftwareMap_Bool_Exp>;
};

/** columns and relationships of "map_technology_node_hierarchy" */
export type TechnologyNodeHierarchyMap = {
  __typename?: 'TechnologyNodeHierarchyMap';
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  nodeChild: TechnologyNode;
  nodeChildId: Scalars['uuid']['output'];
  /** An object relationship */
  nodeParent: TechnologyNode;
  nodeParentId: Scalars['uuid']['output'];
  order?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_technology_node_hierarchy" */
export type TechnologyNodeHierarchyMap_Aggregate = {
  __typename?: 'TechnologyNodeHierarchyMap_aggregate';
  aggregate?: Maybe<TechnologyNodeHierarchyMap_Aggregate_Fields>;
  nodes: Array<TechnologyNodeHierarchyMap>;
};

export type TechnologyNodeHierarchyMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<TechnologyNodeHierarchyMap_Aggregate_Bool_Exp_Count>;
};

export type TechnologyNodeHierarchyMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<TechnologyNodeHierarchyMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<TechnologyNodeHierarchyMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_technology_node_hierarchy" */
export type TechnologyNodeHierarchyMap_Aggregate_Fields = {
  __typename?: 'TechnologyNodeHierarchyMap_aggregate_fields';
  avg?: Maybe<TechnologyNodeHierarchyMap_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<TechnologyNodeHierarchyMap_Max_Fields>;
  min?: Maybe<TechnologyNodeHierarchyMap_Min_Fields>;
  stddev?: Maybe<TechnologyNodeHierarchyMap_Stddev_Fields>;
  stddev_pop?: Maybe<TechnologyNodeHierarchyMap_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<TechnologyNodeHierarchyMap_Stddev_Samp_Fields>;
  sum?: Maybe<TechnologyNodeHierarchyMap_Sum_Fields>;
  var_pop?: Maybe<TechnologyNodeHierarchyMap_Var_Pop_Fields>;
  var_samp?: Maybe<TechnologyNodeHierarchyMap_Var_Samp_Fields>;
  variance?: Maybe<TechnologyNodeHierarchyMap_Variance_Fields>;
};


/** aggregate fields of "map_technology_node_hierarchy" */
export type TechnologyNodeHierarchyMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<TechnologyNodeHierarchyMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_technology_node_hierarchy" */
export type TechnologyNodeHierarchyMap_Aggregate_Order_By = {
  avg?: InputMaybe<TechnologyNodeHierarchyMap_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<TechnologyNodeHierarchyMap_Max_Order_By>;
  min?: InputMaybe<TechnologyNodeHierarchyMap_Min_Order_By>;
  stddev?: InputMaybe<TechnologyNodeHierarchyMap_Stddev_Order_By>;
  stddev_pop?: InputMaybe<TechnologyNodeHierarchyMap_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<TechnologyNodeHierarchyMap_Stddev_Samp_Order_By>;
  sum?: InputMaybe<TechnologyNodeHierarchyMap_Sum_Order_By>;
  var_pop?: InputMaybe<TechnologyNodeHierarchyMap_Var_Pop_Order_By>;
  var_samp?: InputMaybe<TechnologyNodeHierarchyMap_Var_Samp_Order_By>;
  variance?: InputMaybe<TechnologyNodeHierarchyMap_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "map_technology_node_hierarchy" */
export type TechnologyNodeHierarchyMap_Arr_Rel_Insert_Input = {
  data: Array<TechnologyNodeHierarchyMap_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<TechnologyNodeHierarchyMap_On_Conflict>;
};

/** aggregate avg on columns */
export type TechnologyNodeHierarchyMap_Avg_Fields = {
  __typename?: 'TechnologyNodeHierarchyMap_avg_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "map_technology_node_hierarchy" */
export type TechnologyNodeHierarchyMap_Avg_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "map_technology_node_hierarchy". All fields are combined with a logical 'AND'. */
export type TechnologyNodeHierarchyMap_Bool_Exp = {
  _and?: InputMaybe<Array<TechnologyNodeHierarchyMap_Bool_Exp>>;
  _not?: InputMaybe<TechnologyNodeHierarchyMap_Bool_Exp>;
  _or?: InputMaybe<Array<TechnologyNodeHierarchyMap_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  nodeChild?: InputMaybe<TechnologyNode_Bool_Exp>;
  nodeChildId?: InputMaybe<Uuid_Comparison_Exp>;
  nodeParent?: InputMaybe<TechnologyNode_Bool_Exp>;
  nodeParentId?: InputMaybe<Uuid_Comparison_Exp>;
  order?: InputMaybe<Int_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_technology_node_hierarchy" */
export enum TechnologyNodeHierarchyMap_Constraint {
  /** unique or primary key constraint on columns "node_parent_id", "node_child_id" */
  MapTechnologyNodeHierarchyNodeParentIdNodeAea06Unique = 'map_technology_node_hierarchy_node_parent_id_node_aea06_unique',
  /** unique or primary key constraint on columns "node_parent_id", "node_child_id" */
  MapTechnologyNodeHierarchyPkey = 'map_technology_node_hierarchy_pkey'
}

/** input type for incrementing numeric columns in table "map_technology_node_hierarchy" */
export type TechnologyNodeHierarchyMap_Inc_Input = {
  order?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "map_technology_node_hierarchy" */
export type TechnologyNodeHierarchyMap_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  nodeChild?: InputMaybe<TechnologyNode_Obj_Rel_Insert_Input>;
  nodeChildId?: InputMaybe<Scalars['uuid']['input']>;
  nodeParent?: InputMaybe<TechnologyNode_Obj_Rel_Insert_Input>;
  nodeParentId?: InputMaybe<Scalars['uuid']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type TechnologyNodeHierarchyMap_Max_Fields = {
  __typename?: 'TechnologyNodeHierarchyMap_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  nodeChildId?: Maybe<Scalars['uuid']['output']>;
  nodeParentId?: Maybe<Scalars['uuid']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_technology_node_hierarchy" */
export type TechnologyNodeHierarchyMap_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  nodeChildId?: InputMaybe<Order_By>;
  nodeParentId?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type TechnologyNodeHierarchyMap_Min_Fields = {
  __typename?: 'TechnologyNodeHierarchyMap_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  nodeChildId?: Maybe<Scalars['uuid']['output']>;
  nodeParentId?: Maybe<Scalars['uuid']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_technology_node_hierarchy" */
export type TechnologyNodeHierarchyMap_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  nodeChildId?: InputMaybe<Order_By>;
  nodeParentId?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "map_technology_node_hierarchy" */
export type TechnologyNodeHierarchyMap_Mutation_Response = {
  __typename?: 'TechnologyNodeHierarchyMap_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<TechnologyNodeHierarchyMap>;
};

/** on_conflict condition type for table "map_technology_node_hierarchy" */
export type TechnologyNodeHierarchyMap_On_Conflict = {
  constraint: TechnologyNodeHierarchyMap_Constraint;
  update_columns?: Array<TechnologyNodeHierarchyMap_Update_Column>;
  where?: InputMaybe<TechnologyNodeHierarchyMap_Bool_Exp>;
};

/** Ordering options when selecting data from "map_technology_node_hierarchy". */
export type TechnologyNodeHierarchyMap_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  nodeChild?: InputMaybe<TechnologyNode_Order_By>;
  nodeChildId?: InputMaybe<Order_By>;
  nodeParent?: InputMaybe<TechnologyNode_Order_By>;
  nodeParentId?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_technology_node_hierarchy */
export type TechnologyNodeHierarchyMap_Pk_Columns_Input = {
  nodeChildId: Scalars['uuid']['input'];
  nodeParentId: Scalars['uuid']['input'];
};

/** select columns of table "map_technology_node_hierarchy" */
export enum TechnologyNodeHierarchyMap_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  NodeChildId = 'nodeChildId',
  /** column name */
  NodeParentId = 'nodeParentId',
  /** column name */
  Order = 'order',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "map_technology_node_hierarchy" */
export type TechnologyNodeHierarchyMap_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  nodeChildId?: InputMaybe<Scalars['uuid']['input']>;
  nodeParentId?: InputMaybe<Scalars['uuid']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type TechnologyNodeHierarchyMap_Stddev_Fields = {
  __typename?: 'TechnologyNodeHierarchyMap_stddev_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "map_technology_node_hierarchy" */
export type TechnologyNodeHierarchyMap_Stddev_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type TechnologyNodeHierarchyMap_Stddev_Pop_Fields = {
  __typename?: 'TechnologyNodeHierarchyMap_stddev_pop_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "map_technology_node_hierarchy" */
export type TechnologyNodeHierarchyMap_Stddev_Pop_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type TechnologyNodeHierarchyMap_Stddev_Samp_Fields = {
  __typename?: 'TechnologyNodeHierarchyMap_stddev_samp_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "map_technology_node_hierarchy" */
export type TechnologyNodeHierarchyMap_Stddev_Samp_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "TechnologyNodeHierarchyMap" */
export type TechnologyNodeHierarchyMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: TechnologyNodeHierarchyMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type TechnologyNodeHierarchyMap_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  nodeChildId?: InputMaybe<Scalars['uuid']['input']>;
  nodeParentId?: InputMaybe<Scalars['uuid']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type TechnologyNodeHierarchyMap_Sum_Fields = {
  __typename?: 'TechnologyNodeHierarchyMap_sum_fields';
  order?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "map_technology_node_hierarchy" */
export type TechnologyNodeHierarchyMap_Sum_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** update columns of table "map_technology_node_hierarchy" */
export enum TechnologyNodeHierarchyMap_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  NodeChildId = 'nodeChildId',
  /** column name */
  NodeParentId = 'nodeParentId',
  /** column name */
  Order = 'order',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type TechnologyNodeHierarchyMap_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<TechnologyNodeHierarchyMap_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<TechnologyNodeHierarchyMap_Set_Input>;
  /** filter the rows which have to be updated */
  where: TechnologyNodeHierarchyMap_Bool_Exp;
};

/** aggregate var_pop on columns */
export type TechnologyNodeHierarchyMap_Var_Pop_Fields = {
  __typename?: 'TechnologyNodeHierarchyMap_var_pop_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "map_technology_node_hierarchy" */
export type TechnologyNodeHierarchyMap_Var_Pop_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type TechnologyNodeHierarchyMap_Var_Samp_Fields = {
  __typename?: 'TechnologyNodeHierarchyMap_var_samp_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "map_technology_node_hierarchy" */
export type TechnologyNodeHierarchyMap_Var_Samp_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type TechnologyNodeHierarchyMap_Variance_Fields = {
  __typename?: 'TechnologyNodeHierarchyMap_variance_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "map_technology_node_hierarchy" */
export type TechnologyNodeHierarchyMap_Variance_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** columns and relationships of "map_technology_node_system_software" */
export type TechnologyNodeSystemSoftwareMap = {
  __typename?: 'TechnologyNodeSystemSoftwareMap';
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  kind: Scalars['system_software_kind_enum']['output'];
  /** An object relationship */
  node: TechnologyNode;
  nodeId: Scalars['uuid']['output'];
  /** An object relationship */
  systemSoftware: SystemSoftware;
  systemSoftwareId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_technology_node_system_software" */
export type TechnologyNodeSystemSoftwareMap_Aggregate = {
  __typename?: 'TechnologyNodeSystemSoftwareMap_aggregate';
  aggregate?: Maybe<TechnologyNodeSystemSoftwareMap_Aggregate_Fields>;
  nodes: Array<TechnologyNodeSystemSoftwareMap>;
};

export type TechnologyNodeSystemSoftwareMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<TechnologyNodeSystemSoftwareMap_Aggregate_Bool_Exp_Count>;
};

export type TechnologyNodeSystemSoftwareMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<TechnologyNodeSystemSoftwareMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<TechnologyNodeSystemSoftwareMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_technology_node_system_software" */
export type TechnologyNodeSystemSoftwareMap_Aggregate_Fields = {
  __typename?: 'TechnologyNodeSystemSoftwareMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<TechnologyNodeSystemSoftwareMap_Max_Fields>;
  min?: Maybe<TechnologyNodeSystemSoftwareMap_Min_Fields>;
};


/** aggregate fields of "map_technology_node_system_software" */
export type TechnologyNodeSystemSoftwareMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<TechnologyNodeSystemSoftwareMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_technology_node_system_software" */
export type TechnologyNodeSystemSoftwareMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<TechnologyNodeSystemSoftwareMap_Max_Order_By>;
  min?: InputMaybe<TechnologyNodeSystemSoftwareMap_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_technology_node_system_software" */
export type TechnologyNodeSystemSoftwareMap_Arr_Rel_Insert_Input = {
  data: Array<TechnologyNodeSystemSoftwareMap_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<TechnologyNodeSystemSoftwareMap_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_technology_node_system_software". All fields are combined with a logical 'AND'. */
export type TechnologyNodeSystemSoftwareMap_Bool_Exp = {
  _and?: InputMaybe<Array<TechnologyNodeSystemSoftwareMap_Bool_Exp>>;
  _not?: InputMaybe<TechnologyNodeSystemSoftwareMap_Bool_Exp>;
  _or?: InputMaybe<Array<TechnologyNodeSystemSoftwareMap_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  kind?: InputMaybe<System_Software_Kind_Enum_Comparison_Exp>;
  node?: InputMaybe<TechnologyNode_Bool_Exp>;
  nodeId?: InputMaybe<Uuid_Comparison_Exp>;
  systemSoftware?: InputMaybe<SystemSoftware_Bool_Exp>;
  systemSoftwareId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_technology_node_system_software" */
export enum TechnologyNodeSystemSoftwareMap_Constraint {
  /** unique or primary key constraint on columns "node_id", "system_software_id" */
  MapTechnologyNodeSystemSoftwareNodeIdSyste_37a00Unique = 'map_technology_node_system_software_node_id_syste_37a00_unique',
  /** unique or primary key constraint on columns "node_id", "system_software_id" */
  MapTechnologyNodeSystemSoftwarePkey = 'map_technology_node_system_software_pkey'
}

/** input type for inserting data into table "map_technology_node_system_software" */
export type TechnologyNodeSystemSoftwareMap_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  kind?: InputMaybe<Scalars['system_software_kind_enum']['input']>;
  node?: InputMaybe<TechnologyNode_Obj_Rel_Insert_Input>;
  nodeId?: InputMaybe<Scalars['uuid']['input']>;
  systemSoftware?: InputMaybe<SystemSoftware_Obj_Rel_Insert_Input>;
  systemSoftwareId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type TechnologyNodeSystemSoftwareMap_Max_Fields = {
  __typename?: 'TechnologyNodeSystemSoftwareMap_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  kind?: Maybe<Scalars['system_software_kind_enum']['output']>;
  nodeId?: Maybe<Scalars['uuid']['output']>;
  systemSoftwareId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_technology_node_system_software" */
export type TechnologyNodeSystemSoftwareMap_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  nodeId?: InputMaybe<Order_By>;
  systemSoftwareId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type TechnologyNodeSystemSoftwareMap_Min_Fields = {
  __typename?: 'TechnologyNodeSystemSoftwareMap_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  kind?: Maybe<Scalars['system_software_kind_enum']['output']>;
  nodeId?: Maybe<Scalars['uuid']['output']>;
  systemSoftwareId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_technology_node_system_software" */
export type TechnologyNodeSystemSoftwareMap_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  nodeId?: InputMaybe<Order_By>;
  systemSoftwareId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "map_technology_node_system_software" */
export type TechnologyNodeSystemSoftwareMap_Mutation_Response = {
  __typename?: 'TechnologyNodeSystemSoftwareMap_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<TechnologyNodeSystemSoftwareMap>;
};

/** on_conflict condition type for table "map_technology_node_system_software" */
export type TechnologyNodeSystemSoftwareMap_On_Conflict = {
  constraint: TechnologyNodeSystemSoftwareMap_Constraint;
  update_columns?: Array<TechnologyNodeSystemSoftwareMap_Update_Column>;
  where?: InputMaybe<TechnologyNodeSystemSoftwareMap_Bool_Exp>;
};

/** Ordering options when selecting data from "map_technology_node_system_software". */
export type TechnologyNodeSystemSoftwareMap_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  node?: InputMaybe<TechnologyNode_Order_By>;
  nodeId?: InputMaybe<Order_By>;
  systemSoftware?: InputMaybe<SystemSoftware_Order_By>;
  systemSoftwareId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_technology_node_system_software */
export type TechnologyNodeSystemSoftwareMap_Pk_Columns_Input = {
  nodeId: Scalars['uuid']['input'];
  systemSoftwareId: Scalars['uuid']['input'];
};

/** select columns of table "map_technology_node_system_software" */
export enum TechnologyNodeSystemSoftwareMap_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Kind = 'kind',
  /** column name */
  NodeId = 'nodeId',
  /** column name */
  SystemSoftwareId = 'systemSoftwareId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "map_technology_node_system_software" */
export type TechnologyNodeSystemSoftwareMap_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  kind?: InputMaybe<Scalars['system_software_kind_enum']['input']>;
  nodeId?: InputMaybe<Scalars['uuid']['input']>;
  systemSoftwareId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "TechnologyNodeSystemSoftwareMap" */
export type TechnologyNodeSystemSoftwareMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: TechnologyNodeSystemSoftwareMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type TechnologyNodeSystemSoftwareMap_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  kind?: InputMaybe<Scalars['system_software_kind_enum']['input']>;
  nodeId?: InputMaybe<Scalars['uuid']['input']>;
  systemSoftwareId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "map_technology_node_system_software" */
export enum TechnologyNodeSystemSoftwareMap_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Kind = 'kind',
  /** column name */
  NodeId = 'nodeId',
  /** column name */
  SystemSoftwareId = 'systemSoftwareId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type TechnologyNodeSystemSoftwareMap_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<TechnologyNodeSystemSoftwareMap_Set_Input>;
  /** filter the rows which have to be updated */
  where: TechnologyNodeSystemSoftwareMap_Bool_Exp;
};

/** aggregated selection of "technology_nodes" */
export type TechnologyNode_Aggregate = {
  __typename?: 'TechnologyNode_aggregate';
  aggregate?: Maybe<TechnologyNode_Aggregate_Fields>;
  nodes: Array<TechnologyNode>;
};

export type TechnologyNode_Aggregate_Bool_Exp = {
  count?: InputMaybe<TechnologyNode_Aggregate_Bool_Exp_Count>;
};

export type TechnologyNode_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<TechnologyNode_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<TechnologyNode_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "technology_nodes" */
export type TechnologyNode_Aggregate_Fields = {
  __typename?: 'TechnologyNode_aggregate_fields';
  avg?: Maybe<TechnologyNode_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<TechnologyNode_Max_Fields>;
  min?: Maybe<TechnologyNode_Min_Fields>;
  stddev?: Maybe<TechnologyNode_Stddev_Fields>;
  stddev_pop?: Maybe<TechnologyNode_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<TechnologyNode_Stddev_Samp_Fields>;
  sum?: Maybe<TechnologyNode_Sum_Fields>;
  var_pop?: Maybe<TechnologyNode_Var_Pop_Fields>;
  var_samp?: Maybe<TechnologyNode_Var_Samp_Fields>;
  variance?: Maybe<TechnologyNode_Variance_Fields>;
};


/** aggregate fields of "technology_nodes" */
export type TechnologyNode_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<TechnologyNode_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "technology_nodes" */
export type TechnologyNode_Aggregate_Order_By = {
  avg?: InputMaybe<TechnologyNode_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<TechnologyNode_Max_Order_By>;
  min?: InputMaybe<TechnologyNode_Min_Order_By>;
  stddev?: InputMaybe<TechnologyNode_Stddev_Order_By>;
  stddev_pop?: InputMaybe<TechnologyNode_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<TechnologyNode_Stddev_Samp_Order_By>;
  sum?: InputMaybe<TechnologyNode_Sum_Order_By>;
  var_pop?: InputMaybe<TechnologyNode_Var_Pop_Order_By>;
  var_samp?: InputMaybe<TechnologyNode_Var_Samp_Order_By>;
  variance?: InputMaybe<TechnologyNode_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "technology_nodes" */
export type TechnologyNode_Arr_Rel_Insert_Input = {
  data: Array<TechnologyNode_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<TechnologyNode_On_Conflict>;
};

/** aggregate avg on columns */
export type TechnologyNode_Avg_Fields = {
  __typename?: 'TechnologyNode_avg_fields';
  cpuCores?: Maybe<Scalars['Float']['output']>;
  nodeCount?: Maybe<Scalars['Float']['output']>;
  ramGb?: Maybe<Scalars['Float']['output']>;
  storageGb?: Maybe<Scalars['Float']['output']>;
  totalCpuCores?: Maybe<Scalars['Float']['output']>;
  totalRamGb?: Maybe<Scalars['Float']['output']>;
  totalStorageGb?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "technology_nodes" */
export type TechnologyNode_Avg_Order_By = {
  cpuCores?: InputMaybe<Order_By>;
  nodeCount?: InputMaybe<Order_By>;
  ramGb?: InputMaybe<Order_By>;
  storageGb?: InputMaybe<Order_By>;
  totalCpuCores?: InputMaybe<Order_By>;
  totalRamGb?: InputMaybe<Order_By>;
  totalStorageGb?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "technology_nodes". All fields are combined with a logical 'AND'. */
export type TechnologyNode_Bool_Exp = {
  _and?: InputMaybe<Array<TechnologyNode_Bool_Exp>>;
  _not?: InputMaybe<TechnologyNode_Bool_Exp>;
  _or?: InputMaybe<Array<TechnologyNode_Bool_Exp>>;
  architecture?: InputMaybe<System_Architecture_Kind_Enum_Comparison_Exp>;
  child?: InputMaybe<TechnologyNodeHierarchyMap_Bool_Exp>;
  child_aggregate?: InputMaybe<TechnologyNodeHierarchyMap_Aggregate_Bool_Exp>;
  code?: InputMaybe<String_Comparison_Exp>;
  components?: InputMaybe<ApplicationComponentTechnologyNodeMap_Bool_Exp>;
  components_aggregate?: InputMaybe<ApplicationComponentTechnologyNodeMap_Aggregate_Bool_Exp>;
  cpuCores?: InputMaybe<Int_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  environment?: InputMaybe<Environment_Enum_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  kind?: InputMaybe<Node_Kind_Enum_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  network?: InputMaybe<TechnologyNetwork_Bool_Exp>;
  networkId?: InputMaybe<Uuid_Comparison_Exp>;
  nodeCount?: InputMaybe<Int_Comparison_Exp>;
  operatingSystem?: InputMaybe<SystemSoftware_Bool_Exp>;
  operatingSystemId?: InputMaybe<Uuid_Comparison_Exp>;
  parent?: InputMaybe<TechnologyNodeHierarchyMap_Bool_Exp>;
  parent_aggregate?: InputMaybe<TechnologyNodeHierarchyMap_Aggregate_Bool_Exp>;
  ramGb?: InputMaybe<Int_Comparison_Exp>;
  storageGb?: InputMaybe<Int_Comparison_Exp>;
  systemSoftware?: InputMaybe<TechnologyNodeSystemSoftwareMap_Bool_Exp>;
  systemSoftware_aggregate?: InputMaybe<TechnologyNodeSystemSoftwareMap_Aggregate_Bool_Exp>;
  totalCpuCores?: InputMaybe<Int_Comparison_Exp>;
  totalRamGb?: InputMaybe<Int_Comparison_Exp>;
  totalStorageGb?: InputMaybe<Int_Comparison_Exp>;
  type?: InputMaybe<DirectoryObject_Bool_Exp>;
  typeId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "technology_nodes" */
export enum TechnologyNode_Constraint {
  /** unique or primary key constraint on columns "code" */
  TechnologyNodesCodeUnique = 'technology_nodes_code_unique',
  /** unique or primary key constraint on columns "id" */
  TechnologyNodesPkey = 'technology_nodes_pkey'
}

/** input type for incrementing numeric columns in table "technology_nodes" */
export type TechnologyNode_Inc_Input = {
  cpuCores?: InputMaybe<Scalars['Int']['input']>;
  nodeCount?: InputMaybe<Scalars['Int']['input']>;
  ramGb?: InputMaybe<Scalars['Int']['input']>;
  storageGb?: InputMaybe<Scalars['Int']['input']>;
  totalCpuCores?: InputMaybe<Scalars['Int']['input']>;
  totalRamGb?: InputMaybe<Scalars['Int']['input']>;
  totalStorageGb?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "technology_nodes" */
export type TechnologyNode_Insert_Input = {
  architecture?: InputMaybe<Scalars['system_architecture_kind_enum']['input']>;
  child?: InputMaybe<TechnologyNodeHierarchyMap_Arr_Rel_Insert_Input>;
  code?: InputMaybe<Scalars['String']['input']>;
  components?: InputMaybe<ApplicationComponentTechnologyNodeMap_Arr_Rel_Insert_Input>;
  cpuCores?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  environment?: InputMaybe<Scalars['environment_enum']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  kind?: InputMaybe<Scalars['node_kind_enum']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  network?: InputMaybe<TechnologyNetwork_Obj_Rel_Insert_Input>;
  networkId?: InputMaybe<Scalars['uuid']['input']>;
  nodeCount?: InputMaybe<Scalars['Int']['input']>;
  operatingSystem?: InputMaybe<SystemSoftware_Obj_Rel_Insert_Input>;
  operatingSystemId?: InputMaybe<Scalars['uuid']['input']>;
  parent?: InputMaybe<TechnologyNodeHierarchyMap_Arr_Rel_Insert_Input>;
  ramGb?: InputMaybe<Scalars['Int']['input']>;
  storageGb?: InputMaybe<Scalars['Int']['input']>;
  systemSoftware?: InputMaybe<TechnologyNodeSystemSoftwareMap_Arr_Rel_Insert_Input>;
  totalCpuCores?: InputMaybe<Scalars['Int']['input']>;
  totalRamGb?: InputMaybe<Scalars['Int']['input']>;
  totalStorageGb?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<DirectoryObject_Obj_Rel_Insert_Input>;
  typeId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type TechnologyNode_Max_Fields = {
  __typename?: 'TechnologyNode_max_fields';
  architecture?: Maybe<Scalars['system_architecture_kind_enum']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  cpuCores?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  environment?: Maybe<Scalars['environment_enum']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  kind?: Maybe<Scalars['node_kind_enum']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  networkId?: Maybe<Scalars['uuid']['output']>;
  nodeCount?: Maybe<Scalars['Int']['output']>;
  operatingSystemId?: Maybe<Scalars['uuid']['output']>;
  ramGb?: Maybe<Scalars['Int']['output']>;
  storageGb?: Maybe<Scalars['Int']['output']>;
  totalCpuCores?: Maybe<Scalars['Int']['output']>;
  totalRamGb?: Maybe<Scalars['Int']['output']>;
  totalStorageGb?: Maybe<Scalars['Int']['output']>;
  typeId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "technology_nodes" */
export type TechnologyNode_Max_Order_By = {
  architecture?: InputMaybe<Order_By>;
  code?: InputMaybe<Order_By>;
  cpuCores?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  environment?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  networkId?: InputMaybe<Order_By>;
  nodeCount?: InputMaybe<Order_By>;
  operatingSystemId?: InputMaybe<Order_By>;
  ramGb?: InputMaybe<Order_By>;
  storageGb?: InputMaybe<Order_By>;
  totalCpuCores?: InputMaybe<Order_By>;
  totalRamGb?: InputMaybe<Order_By>;
  totalStorageGb?: InputMaybe<Order_By>;
  typeId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type TechnologyNode_Min_Fields = {
  __typename?: 'TechnologyNode_min_fields';
  architecture?: Maybe<Scalars['system_architecture_kind_enum']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  cpuCores?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  environment?: Maybe<Scalars['environment_enum']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  kind?: Maybe<Scalars['node_kind_enum']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  networkId?: Maybe<Scalars['uuid']['output']>;
  nodeCount?: Maybe<Scalars['Int']['output']>;
  operatingSystemId?: Maybe<Scalars['uuid']['output']>;
  ramGb?: Maybe<Scalars['Int']['output']>;
  storageGb?: Maybe<Scalars['Int']['output']>;
  totalCpuCores?: Maybe<Scalars['Int']['output']>;
  totalRamGb?: Maybe<Scalars['Int']['output']>;
  totalStorageGb?: Maybe<Scalars['Int']['output']>;
  typeId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "technology_nodes" */
export type TechnologyNode_Min_Order_By = {
  architecture?: InputMaybe<Order_By>;
  code?: InputMaybe<Order_By>;
  cpuCores?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  environment?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  networkId?: InputMaybe<Order_By>;
  nodeCount?: InputMaybe<Order_By>;
  operatingSystemId?: InputMaybe<Order_By>;
  ramGb?: InputMaybe<Order_By>;
  storageGb?: InputMaybe<Order_By>;
  totalCpuCores?: InputMaybe<Order_By>;
  totalRamGb?: InputMaybe<Order_By>;
  totalStorageGb?: InputMaybe<Order_By>;
  typeId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "technology_nodes" */
export type TechnologyNode_Mutation_Response = {
  __typename?: 'TechnologyNode_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<TechnologyNode>;
};

/** input type for inserting object relation for remote table "technology_nodes" */
export type TechnologyNode_Obj_Rel_Insert_Input = {
  data: TechnologyNode_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<TechnologyNode_On_Conflict>;
};

/** on_conflict condition type for table "technology_nodes" */
export type TechnologyNode_On_Conflict = {
  constraint: TechnologyNode_Constraint;
  update_columns?: Array<TechnologyNode_Update_Column>;
  where?: InputMaybe<TechnologyNode_Bool_Exp>;
};

/** Ordering options when selecting data from "technology_nodes". */
export type TechnologyNode_Order_By = {
  architecture?: InputMaybe<Order_By>;
  child_aggregate?: InputMaybe<TechnologyNodeHierarchyMap_Aggregate_Order_By>;
  code?: InputMaybe<Order_By>;
  components_aggregate?: InputMaybe<ApplicationComponentTechnologyNodeMap_Aggregate_Order_By>;
  cpuCores?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  environment?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  network?: InputMaybe<TechnologyNetwork_Order_By>;
  networkId?: InputMaybe<Order_By>;
  nodeCount?: InputMaybe<Order_By>;
  operatingSystem?: InputMaybe<SystemSoftware_Order_By>;
  operatingSystemId?: InputMaybe<Order_By>;
  parent_aggregate?: InputMaybe<TechnologyNodeHierarchyMap_Aggregate_Order_By>;
  ramGb?: InputMaybe<Order_By>;
  storageGb?: InputMaybe<Order_By>;
  systemSoftware_aggregate?: InputMaybe<TechnologyNodeSystemSoftwareMap_Aggregate_Order_By>;
  totalCpuCores?: InputMaybe<Order_By>;
  totalRamGb?: InputMaybe<Order_By>;
  totalStorageGb?: InputMaybe<Order_By>;
  type?: InputMaybe<DirectoryObject_Order_By>;
  typeId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: technology_nodes */
export type TechnologyNode_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "technology_nodes" */
export enum TechnologyNode_Select_Column {
  /** column name */
  Architecture = 'architecture',
  /** column name */
  Code = 'code',
  /** column name */
  CpuCores = 'cpuCores',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Environment = 'environment',
  /** column name */
  Id = 'id',
  /** column name */
  Kind = 'kind',
  /** column name */
  Name = 'name',
  /** column name */
  NetworkId = 'networkId',
  /** column name */
  NodeCount = 'nodeCount',
  /** column name */
  OperatingSystemId = 'operatingSystemId',
  /** column name */
  RamGb = 'ramGb',
  /** column name */
  StorageGb = 'storageGb',
  /** column name */
  TotalCpuCores = 'totalCpuCores',
  /** column name */
  TotalRamGb = 'totalRamGb',
  /** column name */
  TotalStorageGb = 'totalStorageGb',
  /** column name */
  TypeId = 'typeId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** input type for updating data in table "technology_nodes" */
export type TechnologyNode_Set_Input = {
  architecture?: InputMaybe<Scalars['system_architecture_kind_enum']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  cpuCores?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  environment?: InputMaybe<Scalars['environment_enum']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  kind?: InputMaybe<Scalars['node_kind_enum']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  networkId?: InputMaybe<Scalars['uuid']['input']>;
  nodeCount?: InputMaybe<Scalars['Int']['input']>;
  operatingSystemId?: InputMaybe<Scalars['uuid']['input']>;
  ramGb?: InputMaybe<Scalars['Int']['input']>;
  storageGb?: InputMaybe<Scalars['Int']['input']>;
  totalCpuCores?: InputMaybe<Scalars['Int']['input']>;
  totalRamGb?: InputMaybe<Scalars['Int']['input']>;
  totalStorageGb?: InputMaybe<Scalars['Int']['input']>;
  typeId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type TechnologyNode_Stddev_Fields = {
  __typename?: 'TechnologyNode_stddev_fields';
  cpuCores?: Maybe<Scalars['Float']['output']>;
  nodeCount?: Maybe<Scalars['Float']['output']>;
  ramGb?: Maybe<Scalars['Float']['output']>;
  storageGb?: Maybe<Scalars['Float']['output']>;
  totalCpuCores?: Maybe<Scalars['Float']['output']>;
  totalRamGb?: Maybe<Scalars['Float']['output']>;
  totalStorageGb?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "technology_nodes" */
export type TechnologyNode_Stddev_Order_By = {
  cpuCores?: InputMaybe<Order_By>;
  nodeCount?: InputMaybe<Order_By>;
  ramGb?: InputMaybe<Order_By>;
  storageGb?: InputMaybe<Order_By>;
  totalCpuCores?: InputMaybe<Order_By>;
  totalRamGb?: InputMaybe<Order_By>;
  totalStorageGb?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type TechnologyNode_Stddev_Pop_Fields = {
  __typename?: 'TechnologyNode_stddev_pop_fields';
  cpuCores?: Maybe<Scalars['Float']['output']>;
  nodeCount?: Maybe<Scalars['Float']['output']>;
  ramGb?: Maybe<Scalars['Float']['output']>;
  storageGb?: Maybe<Scalars['Float']['output']>;
  totalCpuCores?: Maybe<Scalars['Float']['output']>;
  totalRamGb?: Maybe<Scalars['Float']['output']>;
  totalStorageGb?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "technology_nodes" */
export type TechnologyNode_Stddev_Pop_Order_By = {
  cpuCores?: InputMaybe<Order_By>;
  nodeCount?: InputMaybe<Order_By>;
  ramGb?: InputMaybe<Order_By>;
  storageGb?: InputMaybe<Order_By>;
  totalCpuCores?: InputMaybe<Order_By>;
  totalRamGb?: InputMaybe<Order_By>;
  totalStorageGb?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type TechnologyNode_Stddev_Samp_Fields = {
  __typename?: 'TechnologyNode_stddev_samp_fields';
  cpuCores?: Maybe<Scalars['Float']['output']>;
  nodeCount?: Maybe<Scalars['Float']['output']>;
  ramGb?: Maybe<Scalars['Float']['output']>;
  storageGb?: Maybe<Scalars['Float']['output']>;
  totalCpuCores?: Maybe<Scalars['Float']['output']>;
  totalRamGb?: Maybe<Scalars['Float']['output']>;
  totalStorageGb?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "technology_nodes" */
export type TechnologyNode_Stddev_Samp_Order_By = {
  cpuCores?: InputMaybe<Order_By>;
  nodeCount?: InputMaybe<Order_By>;
  ramGb?: InputMaybe<Order_By>;
  storageGb?: InputMaybe<Order_By>;
  totalCpuCores?: InputMaybe<Order_By>;
  totalRamGb?: InputMaybe<Order_By>;
  totalStorageGb?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "TechnologyNode" */
export type TechnologyNode_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: TechnologyNode_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type TechnologyNode_Stream_Cursor_Value_Input = {
  architecture?: InputMaybe<Scalars['system_architecture_kind_enum']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  cpuCores?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  environment?: InputMaybe<Scalars['environment_enum']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  kind?: InputMaybe<Scalars['node_kind_enum']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  networkId?: InputMaybe<Scalars['uuid']['input']>;
  nodeCount?: InputMaybe<Scalars['Int']['input']>;
  operatingSystemId?: InputMaybe<Scalars['uuid']['input']>;
  ramGb?: InputMaybe<Scalars['Int']['input']>;
  storageGb?: InputMaybe<Scalars['Int']['input']>;
  totalCpuCores?: InputMaybe<Scalars['Int']['input']>;
  totalRamGb?: InputMaybe<Scalars['Int']['input']>;
  totalStorageGb?: InputMaybe<Scalars['Int']['input']>;
  typeId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type TechnologyNode_Sum_Fields = {
  __typename?: 'TechnologyNode_sum_fields';
  cpuCores?: Maybe<Scalars['Int']['output']>;
  nodeCount?: Maybe<Scalars['Int']['output']>;
  ramGb?: Maybe<Scalars['Int']['output']>;
  storageGb?: Maybe<Scalars['Int']['output']>;
  totalCpuCores?: Maybe<Scalars['Int']['output']>;
  totalRamGb?: Maybe<Scalars['Int']['output']>;
  totalStorageGb?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "technology_nodes" */
export type TechnologyNode_Sum_Order_By = {
  cpuCores?: InputMaybe<Order_By>;
  nodeCount?: InputMaybe<Order_By>;
  ramGb?: InputMaybe<Order_By>;
  storageGb?: InputMaybe<Order_By>;
  totalCpuCores?: InputMaybe<Order_By>;
  totalRamGb?: InputMaybe<Order_By>;
  totalStorageGb?: InputMaybe<Order_By>;
};

/** update columns of table "technology_nodes" */
export enum TechnologyNode_Update_Column {
  /** column name */
  Architecture = 'architecture',
  /** column name */
  Code = 'code',
  /** column name */
  CpuCores = 'cpuCores',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Environment = 'environment',
  /** column name */
  Id = 'id',
  /** column name */
  Kind = 'kind',
  /** column name */
  Name = 'name',
  /** column name */
  NetworkId = 'networkId',
  /** column name */
  NodeCount = 'nodeCount',
  /** column name */
  OperatingSystemId = 'operatingSystemId',
  /** column name */
  RamGb = 'ramGb',
  /** column name */
  StorageGb = 'storageGb',
  /** column name */
  TotalCpuCores = 'totalCpuCores',
  /** column name */
  TotalRamGb = 'totalRamGb',
  /** column name */
  TotalStorageGb = 'totalStorageGb',
  /** column name */
  TypeId = 'typeId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

export type TechnologyNode_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<TechnologyNode_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<TechnologyNode_Set_Input>;
  /** filter the rows which have to be updated */
  where: TechnologyNode_Bool_Exp;
};

/** aggregate var_pop on columns */
export type TechnologyNode_Var_Pop_Fields = {
  __typename?: 'TechnologyNode_var_pop_fields';
  cpuCores?: Maybe<Scalars['Float']['output']>;
  nodeCount?: Maybe<Scalars['Float']['output']>;
  ramGb?: Maybe<Scalars['Float']['output']>;
  storageGb?: Maybe<Scalars['Float']['output']>;
  totalCpuCores?: Maybe<Scalars['Float']['output']>;
  totalRamGb?: Maybe<Scalars['Float']['output']>;
  totalStorageGb?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "technology_nodes" */
export type TechnologyNode_Var_Pop_Order_By = {
  cpuCores?: InputMaybe<Order_By>;
  nodeCount?: InputMaybe<Order_By>;
  ramGb?: InputMaybe<Order_By>;
  storageGb?: InputMaybe<Order_By>;
  totalCpuCores?: InputMaybe<Order_By>;
  totalRamGb?: InputMaybe<Order_By>;
  totalStorageGb?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type TechnologyNode_Var_Samp_Fields = {
  __typename?: 'TechnologyNode_var_samp_fields';
  cpuCores?: Maybe<Scalars['Float']['output']>;
  nodeCount?: Maybe<Scalars['Float']['output']>;
  ramGb?: Maybe<Scalars['Float']['output']>;
  storageGb?: Maybe<Scalars['Float']['output']>;
  totalCpuCores?: Maybe<Scalars['Float']['output']>;
  totalRamGb?: Maybe<Scalars['Float']['output']>;
  totalStorageGb?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "technology_nodes" */
export type TechnologyNode_Var_Samp_Order_By = {
  cpuCores?: InputMaybe<Order_By>;
  nodeCount?: InputMaybe<Order_By>;
  ramGb?: InputMaybe<Order_By>;
  storageGb?: InputMaybe<Order_By>;
  totalCpuCores?: InputMaybe<Order_By>;
  totalRamGb?: InputMaybe<Order_By>;
  totalStorageGb?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type TechnologyNode_Variance_Fields = {
  __typename?: 'TechnologyNode_variance_fields';
  cpuCores?: Maybe<Scalars['Float']['output']>;
  nodeCount?: Maybe<Scalars['Float']['output']>;
  ramGb?: Maybe<Scalars['Float']['output']>;
  storageGb?: Maybe<Scalars['Float']['output']>;
  totalCpuCores?: Maybe<Scalars['Float']['output']>;
  totalRamGb?: Maybe<Scalars['Float']['output']>;
  totalStorageGb?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "technology_nodes" */
export type TechnologyNode_Variance_Order_By = {
  cpuCores?: InputMaybe<Order_By>;
  nodeCount?: InputMaybe<Order_By>;
  ramGb?: InputMaybe<Order_By>;
  storageGb?: InputMaybe<Order_By>;
  totalCpuCores?: InputMaybe<Order_By>;
  totalRamGb?: InputMaybe<Order_By>;
  totalStorageGb?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "assessment_type_enum". All fields are combined with logical 'AND'. */
export type Assessment_Type_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['assessment_type_enum']['input']>;
  _gt?: InputMaybe<Scalars['assessment_type_enum']['input']>;
  _gte?: InputMaybe<Scalars['assessment_type_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['assessment_type_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['assessment_type_enum']['input']>;
  _lte?: InputMaybe<Scalars['assessment_type_enum']['input']>;
  _neq?: InputMaybe<Scalars['assessment_type_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['assessment_type_enum']['input']>>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** Boolean expression to compare columns of type "data_access_kind_enum". All fields are combined with logical 'AND'. */
export type Data_Access_Kind_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['data_access_kind_enum']['input']>;
  _gt?: InputMaybe<Scalars['data_access_kind_enum']['input']>;
  _gte?: InputMaybe<Scalars['data_access_kind_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['data_access_kind_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['data_access_kind_enum']['input']>;
  _lte?: InputMaybe<Scalars['data_access_kind_enum']['input']>;
  _neq?: InputMaybe<Scalars['data_access_kind_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['data_access_kind_enum']['input']>>;
};

/** Boolean expression to compare columns of type "directory_kind_enum". All fields are combined with logical 'AND'. */
export type Directory_Kind_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['directory_kind_enum']['input']>;
  _gt?: InputMaybe<Scalars['directory_kind_enum']['input']>;
  _gte?: InputMaybe<Scalars['directory_kind_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['directory_kind_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['directory_kind_enum']['input']>;
  _lte?: InputMaybe<Scalars['directory_kind_enum']['input']>;
  _neq?: InputMaybe<Scalars['directory_kind_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['directory_kind_enum']['input']>>;
};

/** Boolean expression to compare columns of type "directory_link_type_enum". All fields are combined with logical 'AND'. */
export type Directory_Link_Type_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['directory_link_type_enum']['input']>;
  _gt?: InputMaybe<Scalars['directory_link_type_enum']['input']>;
  _gte?: InputMaybe<Scalars['directory_link_type_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['directory_link_type_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['directory_link_type_enum']['input']>;
  _lte?: InputMaybe<Scalars['directory_link_type_enum']['input']>;
  _neq?: InputMaybe<Scalars['directory_link_type_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['directory_link_type_enum']['input']>>;
};

/** Boolean expression to compare columns of type "environment_enum". All fields are combined with logical 'AND'. */
export type Environment_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['environment_enum']['input']>;
  _gt?: InputMaybe<Scalars['environment_enum']['input']>;
  _gte?: InputMaybe<Scalars['environment_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['environment_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['environment_enum']['input']>;
  _lte?: InputMaybe<Scalars['environment_enum']['input']>;
  _neq?: InputMaybe<Scalars['environment_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['environment_enum']['input']>>;
};

/** Boolean expression to compare columns of type "layer_kind_enum". All fields are combined with logical 'AND'. */
export type Layer_Kind_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['layer_kind_enum']['input']>;
  _gt?: InputMaybe<Scalars['layer_kind_enum']['input']>;
  _gte?: InputMaybe<Scalars['layer_kind_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['layer_kind_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['layer_kind_enum']['input']>;
  _lte?: InputMaybe<Scalars['layer_kind_enum']['input']>;
  _neq?: InputMaybe<Scalars['layer_kind_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['layer_kind_enum']['input']>>;
};

/** Boolean expression to compare columns of type "motivation_kind_enum". All fields are combined with logical 'AND'. */
export type Motivation_Kind_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['motivation_kind_enum']['input']>;
  _gt?: InputMaybe<Scalars['motivation_kind_enum']['input']>;
  _gte?: InputMaybe<Scalars['motivation_kind_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['motivation_kind_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['motivation_kind_enum']['input']>;
  _lte?: InputMaybe<Scalars['motivation_kind_enum']['input']>;
  _neq?: InputMaybe<Scalars['motivation_kind_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['motivation_kind_enum']['input']>>;
};

/** Boolean expression to compare columns of type "motivation_priority_enum". All fields are combined with logical 'AND'. */
export type Motivation_Priority_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['motivation_priority_enum']['input']>;
  _gt?: InputMaybe<Scalars['motivation_priority_enum']['input']>;
  _gte?: InputMaybe<Scalars['motivation_priority_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['motivation_priority_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['motivation_priority_enum']['input']>;
  _lte?: InputMaybe<Scalars['motivation_priority_enum']['input']>;
  _neq?: InputMaybe<Scalars['motivation_priority_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['motivation_priority_enum']['input']>>;
};

/** Boolean expression to compare columns of type "motivation_status_enum". All fields are combined with logical 'AND'. */
export type Motivation_Status_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['motivation_status_enum']['input']>;
  _gt?: InputMaybe<Scalars['motivation_status_enum']['input']>;
  _gte?: InputMaybe<Scalars['motivation_status_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['motivation_status_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['motivation_status_enum']['input']>;
  _lte?: InputMaybe<Scalars['motivation_status_enum']['input']>;
  _neq?: InputMaybe<Scalars['motivation_status_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['motivation_status_enum']['input']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "components" */
  deleteApplicationComponent?: Maybe<ApplicationComponent_Mutation_Response>;
  /** delete single row from the table: "components" */
  deleteApplicationComponentByPk?: Maybe<ApplicationComponent>;
  /** delete data from the table: "map_application_component_data_object" */
  deleteApplicationComponentDataObjectMap?: Maybe<ApplicationComponentDataObjectMap_Mutation_Response>;
  /** delete single row from the table: "map_application_component_data_object" */
  deleteApplicationComponentDataObjectMapByPk?: Maybe<ApplicationComponentDataObjectMap>;
  /** delete data from the table: "map_application_component_event" */
  deleteApplicationComponentEventMap?: Maybe<ApplicationComponentEventMap_Mutation_Response>;
  /** delete single row from the table: "map_application_component_event" */
  deleteApplicationComponentEventMapByPk?: Maybe<ApplicationComponentEventMap>;
  /** delete data from the table: "map_application_component_function" */
  deleteApplicationComponentFunctionMap?: Maybe<ApplicationComponentFunctionMap_Mutation_Response>;
  /** delete single row from the table: "map_application_component_function" */
  deleteApplicationComponentFunctionMapByPk?: Maybe<ApplicationComponentFunctionMap>;
  /** delete data from the table: "map_application_component_hierarchy" */
  deleteApplicationComponentHierarchyMap?: Maybe<ApplicationComponentHierarchyMap_Mutation_Response>;
  /** delete single row from the table: "map_application_component_hierarchy" */
  deleteApplicationComponentHierarchyMapByPk?: Maybe<ApplicationComponentHierarchyMap>;
  /** delete data from the table: "map_application_component_interface" */
  deleteApplicationComponentInterfaceMap?: Maybe<ApplicationComponentInterfaceMap_Mutation_Response>;
  /** delete single row from the table: "map_application_component_interface" */
  deleteApplicationComponentInterfaceMapByPk?: Maybe<ApplicationComponentInterfaceMap>;
  /** delete data from the table: "map_application_component_product" */
  deleteApplicationComponentProductMap?: Maybe<ApplicationComponentProductMap_Mutation_Response>;
  /** delete single row from the table: "map_application_component_product" */
  deleteApplicationComponentProductMapByPk?: Maybe<ApplicationComponentProductMap>;
  /** delete data from the table: "map_application_component_stakeholder" */
  deleteApplicationComponentStakeholderMap?: Maybe<ApplicationComponentStakeholderMap_Mutation_Response>;
  /** delete single row from the table: "map_application_component_stakeholder" */
  deleteApplicationComponentStakeholderMapByPk?: Maybe<ApplicationComponentStakeholderMap>;
  /** delete data from the table: "map_application_component_system_software" */
  deleteApplicationComponentSystemSoftwareMap?: Maybe<ApplicationComponentSystemSoftwareMap_Mutation_Response>;
  /** delete single row from the table: "map_application_component_system_software" */
  deleteApplicationComponentSystemSoftwareMapByPk?: Maybe<ApplicationComponentSystemSoftwareMap>;
  /** delete data from the table: "map_application_component_technology_logical_network" */
  deleteApplicationComponentTechnologyLogicalNetworkMap?: Maybe<ApplicationComponentTechnologyLogicalNetworkMap_Mutation_Response>;
  /** delete single row from the table: "map_application_component_technology_logical_network" */
  deleteApplicationComponentTechnologyLogicalNetworkMapByPk?: Maybe<ApplicationComponentTechnologyLogicalNetworkMap>;
  /** delete data from the table: "map_application_component_technology_node" */
  deleteApplicationComponentTechnologyNodeMap?: Maybe<ApplicationComponentTechnologyNodeMap_Mutation_Response>;
  /** delete single row from the table: "map_application_component_technology_node" */
  deleteApplicationComponentTechnologyNodeMapByPk?: Maybe<ApplicationComponentTechnologyNodeMap>;
  /** delete data from the table: "map_application_function_data_object" */
  deleteApplicationFunctionDataObjectMap?: Maybe<ApplicationFunctionDataObjectMap_Mutation_Response>;
  /** delete single row from the table: "map_application_function_data_object" */
  deleteApplicationFunctionDataObjectMapByPk?: Maybe<ApplicationFunctionDataObjectMap>;
  /** delete data from the table: "map_application_interface_function" */
  deleteApplicationInterfaceFunctionMap?: Maybe<ApplicationInterfaceFunctionMap_Mutation_Response>;
  /** delete single row from the table: "map_application_interface_function" */
  deleteApplicationInterfaceFunctionMapByPk?: Maybe<ApplicationInterfaceFunctionMap>;
  /** delete data from the table: "actors" */
  deleteBusinessActor?: Maybe<BusinessActor_Mutation_Response>;
  /** delete single row from the table: "actors" */
  deleteBusinessActorByPk?: Maybe<BusinessActor>;
  /** delete data from the table: "map_business_actor_role" */
  deleteBusinessActorRoleMap?: Maybe<BusinessActorRoleMap_Mutation_Response>;
  /** delete single row from the table: "map_business_actor_role" */
  deleteBusinessActorRoleMapByPk?: Maybe<BusinessActorRoleMap>;
  /** delete data from the table: "products" */
  deleteBusinessProduct?: Maybe<BusinessProduct_Mutation_Response>;
  /** delete single row from the table: "products" */
  deleteBusinessProductByPk?: Maybe<BusinessProduct>;
  /** delete data from the table: "roles" */
  deleteBusinessRole?: Maybe<BusinessRole_Mutation_Response>;
  /** delete single row from the table: "roles" */
  deleteBusinessRoleByPk?: Maybe<BusinessRole>;
  /** delete data from the table: "capabilities" */
  deleteCapability?: Maybe<Capability_Mutation_Response>;
  /** delete single row from the table: "capabilities" */
  deleteCapabilityByPk?: Maybe<Capability>;
  /** delete data from the table: "data_objects" */
  deleteDataObject?: Maybe<DataObject_Mutation_Response>;
  /** delete single row from the table: "data_objects" */
  deleteDataObjectByPk?: Maybe<DataObject>;
  /** delete data from the table: "map_directory_items" */
  deleteDirectoryItemsMap?: Maybe<DirectoryItemsMap_Mutation_Response>;
  /** delete single row from the table: "map_directory_items" */
  deleteDirectoryItemsMapByPk?: Maybe<DirectoryItemsMap>;
  /** delete data from the table: "directories" */
  deleteDirectoryObject?: Maybe<DirectoryObject_Mutation_Response>;
  /** delete single row from the table: "directories" */
  deleteDirectoryObjectByPk?: Maybe<DirectoryObject>;
  /** delete data from the table: "employees" */
  deleteEmployee?: Maybe<Employee_Mutation_Response>;
  /** delete single row from the table: "employees" */
  deleteEmployeeByPk?: Maybe<Employee>;
  /** delete data from the table: "events" */
  deleteEventGeneric?: Maybe<EventGeneric_Mutation_Response>;
  /** delete single row from the table: "events" */
  deleteEventGenericByPk?: Maybe<EventGeneric>;
  /** delete data from the table: "flows" */
  deleteFlowGeneric?: Maybe<FlowGeneric_Mutation_Response>;
  /** delete single row from the table: "flows" */
  deleteFlowGenericByPk?: Maybe<FlowGeneric>;
  /** delete data from the table: "functions" */
  deleteFunctionGeneric?: Maybe<FunctionGeneric_Mutation_Response>;
  /** delete single row from the table: "functions" */
  deleteFunctionGenericByPk?: Maybe<FunctionGeneric>;
  /** delete data from the table: "interfaces" */
  deleteInterfaceGeneric?: Maybe<InterfaceGeneric_Mutation_Response>;
  /** delete single row from the table: "interfaces" */
  deleteInterfaceGenericByPk?: Maybe<InterfaceGeneric>;
  /** delete data from the table: "motivations" */
  deleteMotivationElementGeneric?: Maybe<MotivationElementGeneric_Mutation_Response>;
  /** delete single row from the table: "motivations" */
  deleteMotivationElementGenericByPk?: Maybe<MotivationElementGeneric>;
  /** delete data from the table: "locations" */
  deletePhysicalLocation?: Maybe<PhysicalLocation_Mutation_Response>;
  /** delete single row from the table: "locations" */
  deletePhysicalLocationByPk?: Maybe<PhysicalLocation>;
  /** delete data from the table: "solutions" */
  deleteSolution?: Maybe<Solution_Mutation_Response>;
  /** delete data from the table: "map_solution_application_component" */
  deleteSolutionApplicationComponentMap?: Maybe<SolutionApplicationComponentMap_Mutation_Response>;
  /** delete single row from the table: "map_solution_application_component" */
  deleteSolutionApplicationComponentMapByPk?: Maybe<SolutionApplicationComponentMap>;
  /** delete single row from the table: "solutions" */
  deleteSolutionByPk?: Maybe<Solution>;
  /** delete data from the table: "map_solution_constraint" */
  deleteSolutionConstraintMap?: Maybe<SolutionConstraintMap_Mutation_Response>;
  /** delete single row from the table: "map_solution_constraint" */
  deleteSolutionConstraintMapByPk?: Maybe<SolutionConstraintMap>;
  /** delete data from the table: "stakeholders" */
  deleteStakeholder?: Maybe<Stakeholder_Mutation_Response>;
  /** delete single row from the table: "stakeholders" */
  deleteStakeholderByPk?: Maybe<Stakeholder>;
  /** delete data from the table: "system_software" */
  deleteSystemSoftware?: Maybe<SystemSoftware_Mutation_Response>;
  /** delete single row from the table: "system_software" */
  deleteSystemSoftwareByPk?: Maybe<SystemSoftware>;
  /** delete data from the table: "technology_networks" */
  deleteTechnologyNetwork?: Maybe<TechnologyNetwork_Mutation_Response>;
  /** delete single row from the table: "technology_networks" */
  deleteTechnologyNetworkByPk?: Maybe<TechnologyNetwork>;
  /** delete data from the table: "map_technology_network_hierarchy" */
  deleteTechnologyNetworkHierarchyMap?: Maybe<TechnologyNetworkHierarchyMap_Mutation_Response>;
  /** delete single row from the table: "map_technology_network_hierarchy" */
  deleteTechnologyNetworkHierarchyMapByPk?: Maybe<TechnologyNetworkHierarchyMap>;
  /** delete data from the table: "technology_nodes" */
  deleteTechnologyNode?: Maybe<TechnologyNode_Mutation_Response>;
  /** delete single row from the table: "technology_nodes" */
  deleteTechnologyNodeByPk?: Maybe<TechnologyNode>;
  /** delete data from the table: "map_technology_node_hierarchy" */
  deleteTechnologyNodeHierarchyMap?: Maybe<TechnologyNodeHierarchyMap_Mutation_Response>;
  /** delete single row from the table: "map_technology_node_hierarchy" */
  deleteTechnologyNodeHierarchyMapByPk?: Maybe<TechnologyNodeHierarchyMap>;
  /** delete data from the table: "map_technology_node_system_software" */
  deleteTechnologyNodeSystemSoftwareMap?: Maybe<TechnologyNodeSystemSoftwareMap_Mutation_Response>;
  /** delete single row from the table: "map_technology_node_system_software" */
  deleteTechnologyNodeSystemSoftwareMapByPk?: Maybe<TechnologyNodeSystemSoftwareMap>;
  /** insert data into the table: "components" */
  insertApplicationComponent?: Maybe<ApplicationComponent_Mutation_Response>;
  /** insert data into the table: "map_application_component_data_object" */
  insertApplicationComponentDataObjectMap?: Maybe<ApplicationComponentDataObjectMap_Mutation_Response>;
  /** insert a single row into the table: "map_application_component_data_object" */
  insertApplicationComponentDataObjectMapOne?: Maybe<ApplicationComponentDataObjectMap>;
  /** insert data into the table: "map_application_component_event" */
  insertApplicationComponentEventMap?: Maybe<ApplicationComponentEventMap_Mutation_Response>;
  /** insert a single row into the table: "map_application_component_event" */
  insertApplicationComponentEventMapOne?: Maybe<ApplicationComponentEventMap>;
  /** insert data into the table: "map_application_component_function" */
  insertApplicationComponentFunctionMap?: Maybe<ApplicationComponentFunctionMap_Mutation_Response>;
  /** insert a single row into the table: "map_application_component_function" */
  insertApplicationComponentFunctionMapOne?: Maybe<ApplicationComponentFunctionMap>;
  /** insert data into the table: "map_application_component_hierarchy" */
  insertApplicationComponentHierarchyMap?: Maybe<ApplicationComponentHierarchyMap_Mutation_Response>;
  /** insert a single row into the table: "map_application_component_hierarchy" */
  insertApplicationComponentHierarchyMapOne?: Maybe<ApplicationComponentHierarchyMap>;
  /** insert data into the table: "map_application_component_interface" */
  insertApplicationComponentInterfaceMap?: Maybe<ApplicationComponentInterfaceMap_Mutation_Response>;
  /** insert a single row into the table: "map_application_component_interface" */
  insertApplicationComponentInterfaceMapOne?: Maybe<ApplicationComponentInterfaceMap>;
  /** insert a single row into the table: "components" */
  insertApplicationComponentOne?: Maybe<ApplicationComponent>;
  /** insert data into the table: "map_application_component_product" */
  insertApplicationComponentProductMap?: Maybe<ApplicationComponentProductMap_Mutation_Response>;
  /** insert a single row into the table: "map_application_component_product" */
  insertApplicationComponentProductMapOne?: Maybe<ApplicationComponentProductMap>;
  /** insert data into the table: "map_application_component_stakeholder" */
  insertApplicationComponentStakeholderMap?: Maybe<ApplicationComponentStakeholderMap_Mutation_Response>;
  /** insert a single row into the table: "map_application_component_stakeholder" */
  insertApplicationComponentStakeholderMapOne?: Maybe<ApplicationComponentStakeholderMap>;
  /** insert data into the table: "map_application_component_system_software" */
  insertApplicationComponentSystemSoftwareMap?: Maybe<ApplicationComponentSystemSoftwareMap_Mutation_Response>;
  /** insert a single row into the table: "map_application_component_system_software" */
  insertApplicationComponentSystemSoftwareMapOne?: Maybe<ApplicationComponentSystemSoftwareMap>;
  /** insert data into the table: "map_application_component_technology_logical_network" */
  insertApplicationComponentTechnologyLogicalNetworkMap?: Maybe<ApplicationComponentTechnologyLogicalNetworkMap_Mutation_Response>;
  /** insert a single row into the table: "map_application_component_technology_logical_network" */
  insertApplicationComponentTechnologyLogicalNetworkMapOne?: Maybe<ApplicationComponentTechnologyLogicalNetworkMap>;
  /** insert data into the table: "map_application_component_technology_node" */
  insertApplicationComponentTechnologyNodeMap?: Maybe<ApplicationComponentTechnologyNodeMap_Mutation_Response>;
  /** insert a single row into the table: "map_application_component_technology_node" */
  insertApplicationComponentTechnologyNodeMapOne?: Maybe<ApplicationComponentTechnologyNodeMap>;
  /** insert data into the table: "map_application_function_data_object" */
  insertApplicationFunctionDataObjectMap?: Maybe<ApplicationFunctionDataObjectMap_Mutation_Response>;
  /** insert a single row into the table: "map_application_function_data_object" */
  insertApplicationFunctionDataObjectMapOne?: Maybe<ApplicationFunctionDataObjectMap>;
  /** insert data into the table: "map_application_interface_function" */
  insertApplicationInterfaceFunctionMap?: Maybe<ApplicationInterfaceFunctionMap_Mutation_Response>;
  /** insert a single row into the table: "map_application_interface_function" */
  insertApplicationInterfaceFunctionMapOne?: Maybe<ApplicationInterfaceFunctionMap>;
  /** insert data into the table: "actors" */
  insertBusinessActor?: Maybe<BusinessActor_Mutation_Response>;
  /** insert a single row into the table: "actors" */
  insertBusinessActorOne?: Maybe<BusinessActor>;
  /** insert data into the table: "map_business_actor_role" */
  insertBusinessActorRoleMap?: Maybe<BusinessActorRoleMap_Mutation_Response>;
  /** insert a single row into the table: "map_business_actor_role" */
  insertBusinessActorRoleMapOne?: Maybe<BusinessActorRoleMap>;
  /** insert data into the table: "products" */
  insertBusinessProduct?: Maybe<BusinessProduct_Mutation_Response>;
  /** insert a single row into the table: "products" */
  insertBusinessProductOne?: Maybe<BusinessProduct>;
  /** insert data into the table: "roles" */
  insertBusinessRole?: Maybe<BusinessRole_Mutation_Response>;
  /** insert a single row into the table: "roles" */
  insertBusinessRoleOne?: Maybe<BusinessRole>;
  /** insert data into the table: "capabilities" */
  insertCapability?: Maybe<Capability_Mutation_Response>;
  /** insert a single row into the table: "capabilities" */
  insertCapabilityOne?: Maybe<Capability>;
  /** insert data into the table: "data_objects" */
  insertDataObject?: Maybe<DataObject_Mutation_Response>;
  /** insert a single row into the table: "data_objects" */
  insertDataObjectOne?: Maybe<DataObject>;
  /** insert data into the table: "map_directory_items" */
  insertDirectoryItemsMap?: Maybe<DirectoryItemsMap_Mutation_Response>;
  /** insert a single row into the table: "map_directory_items" */
  insertDirectoryItemsMapOne?: Maybe<DirectoryItemsMap>;
  /** insert data into the table: "directories" */
  insertDirectoryObject?: Maybe<DirectoryObject_Mutation_Response>;
  /** insert a single row into the table: "directories" */
  insertDirectoryObjectOne?: Maybe<DirectoryObject>;
  /** insert data into the table: "employees" */
  insertEmployee?: Maybe<Employee_Mutation_Response>;
  /** insert a single row into the table: "employees" */
  insertEmployeeOne?: Maybe<Employee>;
  /** insert data into the table: "events" */
  insertEventGeneric?: Maybe<EventGeneric_Mutation_Response>;
  /** insert a single row into the table: "events" */
  insertEventGenericOne?: Maybe<EventGeneric>;
  /** insert data into the table: "flows" */
  insertFlowGeneric?: Maybe<FlowGeneric_Mutation_Response>;
  /** insert a single row into the table: "flows" */
  insertFlowGenericOne?: Maybe<FlowGeneric>;
  /** insert data into the table: "functions" */
  insertFunctionGeneric?: Maybe<FunctionGeneric_Mutation_Response>;
  /** insert a single row into the table: "functions" */
  insertFunctionGenericOne?: Maybe<FunctionGeneric>;
  /** insert data into the table: "interfaces" */
  insertInterfaceGeneric?: Maybe<InterfaceGeneric_Mutation_Response>;
  /** insert a single row into the table: "interfaces" */
  insertInterfaceGenericOne?: Maybe<InterfaceGeneric>;
  /** insert data into the table: "motivations" */
  insertMotivationElementGeneric?: Maybe<MotivationElementGeneric_Mutation_Response>;
  /** insert a single row into the table: "motivations" */
  insertMotivationElementGenericOne?: Maybe<MotivationElementGeneric>;
  /** insert data into the table: "locations" */
  insertPhysicalLocation?: Maybe<PhysicalLocation_Mutation_Response>;
  /** insert a single row into the table: "locations" */
  insertPhysicalLocationOne?: Maybe<PhysicalLocation>;
  /** insert data into the table: "solutions" */
  insertSolution?: Maybe<Solution_Mutation_Response>;
  /** insert data into the table: "map_solution_application_component" */
  insertSolutionApplicationComponentMap?: Maybe<SolutionApplicationComponentMap_Mutation_Response>;
  /** insert a single row into the table: "map_solution_application_component" */
  insertSolutionApplicationComponentMapOne?: Maybe<SolutionApplicationComponentMap>;
  /** insert data into the table: "map_solution_constraint" */
  insertSolutionConstraintMap?: Maybe<SolutionConstraintMap_Mutation_Response>;
  /** insert a single row into the table: "map_solution_constraint" */
  insertSolutionConstraintMapOne?: Maybe<SolutionConstraintMap>;
  /** insert a single row into the table: "solutions" */
  insertSolutionOne?: Maybe<Solution>;
  /** insert data into the table: "stakeholders" */
  insertStakeholder?: Maybe<Stakeholder_Mutation_Response>;
  /** insert a single row into the table: "stakeholders" */
  insertStakeholderOne?: Maybe<Stakeholder>;
  /** insert data into the table: "system_software" */
  insertSystemSoftware?: Maybe<SystemSoftware_Mutation_Response>;
  /** insert a single row into the table: "system_software" */
  insertSystemSoftwareOne?: Maybe<SystemSoftware>;
  /** insert data into the table: "technology_networks" */
  insertTechnologyNetwork?: Maybe<TechnologyNetwork_Mutation_Response>;
  /** insert data into the table: "map_technology_network_hierarchy" */
  insertTechnologyNetworkHierarchyMap?: Maybe<TechnologyNetworkHierarchyMap_Mutation_Response>;
  /** insert a single row into the table: "map_technology_network_hierarchy" */
  insertTechnologyNetworkHierarchyMapOne?: Maybe<TechnologyNetworkHierarchyMap>;
  /** insert a single row into the table: "technology_networks" */
  insertTechnologyNetworkOne?: Maybe<TechnologyNetwork>;
  /** insert data into the table: "technology_nodes" */
  insertTechnologyNode?: Maybe<TechnologyNode_Mutation_Response>;
  /** insert data into the table: "map_technology_node_hierarchy" */
  insertTechnologyNodeHierarchyMap?: Maybe<TechnologyNodeHierarchyMap_Mutation_Response>;
  /** insert a single row into the table: "map_technology_node_hierarchy" */
  insertTechnologyNodeHierarchyMapOne?: Maybe<TechnologyNodeHierarchyMap>;
  /** insert a single row into the table: "technology_nodes" */
  insertTechnologyNodeOne?: Maybe<TechnologyNode>;
  /** insert data into the table: "map_technology_node_system_software" */
  insertTechnologyNodeSystemSoftwareMap?: Maybe<TechnologyNodeSystemSoftwareMap_Mutation_Response>;
  /** insert a single row into the table: "map_technology_node_system_software" */
  insertTechnologyNodeSystemSoftwareMapOne?: Maybe<TechnologyNodeSystemSoftwareMap>;
  /** update data of the table: "components" */
  updateApplicationComponent?: Maybe<ApplicationComponent_Mutation_Response>;
  /** update single row of the table: "components" */
  updateApplicationComponentByPk?: Maybe<ApplicationComponent>;
  /** update data of the table: "map_application_component_data_object" */
  updateApplicationComponentDataObjectMap?: Maybe<ApplicationComponentDataObjectMap_Mutation_Response>;
  /** update single row of the table: "map_application_component_data_object" */
  updateApplicationComponentDataObjectMapByPk?: Maybe<ApplicationComponentDataObjectMap>;
  /** update data of the table: "map_application_component_event" */
  updateApplicationComponentEventMap?: Maybe<ApplicationComponentEventMap_Mutation_Response>;
  /** update single row of the table: "map_application_component_event" */
  updateApplicationComponentEventMapByPk?: Maybe<ApplicationComponentEventMap>;
  /** update data of the table: "map_application_component_function" */
  updateApplicationComponentFunctionMap?: Maybe<ApplicationComponentFunctionMap_Mutation_Response>;
  /** update single row of the table: "map_application_component_function" */
  updateApplicationComponentFunctionMapByPk?: Maybe<ApplicationComponentFunctionMap>;
  /** update data of the table: "map_application_component_hierarchy" */
  updateApplicationComponentHierarchyMap?: Maybe<ApplicationComponentHierarchyMap_Mutation_Response>;
  /** update single row of the table: "map_application_component_hierarchy" */
  updateApplicationComponentHierarchyMapByPk?: Maybe<ApplicationComponentHierarchyMap>;
  /** update data of the table: "map_application_component_interface" */
  updateApplicationComponentInterfaceMap?: Maybe<ApplicationComponentInterfaceMap_Mutation_Response>;
  /** update single row of the table: "map_application_component_interface" */
  updateApplicationComponentInterfaceMapByPk?: Maybe<ApplicationComponentInterfaceMap>;
  /** update data of the table: "map_application_component_product" */
  updateApplicationComponentProductMap?: Maybe<ApplicationComponentProductMap_Mutation_Response>;
  /** update single row of the table: "map_application_component_product" */
  updateApplicationComponentProductMapByPk?: Maybe<ApplicationComponentProductMap>;
  /** update data of the table: "map_application_component_stakeholder" */
  updateApplicationComponentStakeholderMap?: Maybe<ApplicationComponentStakeholderMap_Mutation_Response>;
  /** update single row of the table: "map_application_component_stakeholder" */
  updateApplicationComponentStakeholderMapByPk?: Maybe<ApplicationComponentStakeholderMap>;
  /** update data of the table: "map_application_component_system_software" */
  updateApplicationComponentSystemSoftwareMap?: Maybe<ApplicationComponentSystemSoftwareMap_Mutation_Response>;
  /** update single row of the table: "map_application_component_system_software" */
  updateApplicationComponentSystemSoftwareMapByPk?: Maybe<ApplicationComponentSystemSoftwareMap>;
  /** update data of the table: "map_application_component_technology_logical_network" */
  updateApplicationComponentTechnologyLogicalNetworkMap?: Maybe<ApplicationComponentTechnologyLogicalNetworkMap_Mutation_Response>;
  /** update single row of the table: "map_application_component_technology_logical_network" */
  updateApplicationComponentTechnologyLogicalNetworkMapByPk?: Maybe<ApplicationComponentTechnologyLogicalNetworkMap>;
  /** update data of the table: "map_application_component_technology_node" */
  updateApplicationComponentTechnologyNodeMap?: Maybe<ApplicationComponentTechnologyNodeMap_Mutation_Response>;
  /** update single row of the table: "map_application_component_technology_node" */
  updateApplicationComponentTechnologyNodeMapByPk?: Maybe<ApplicationComponentTechnologyNodeMap>;
  /** update data of the table: "map_application_function_data_object" */
  updateApplicationFunctionDataObjectMap?: Maybe<ApplicationFunctionDataObjectMap_Mutation_Response>;
  /** update single row of the table: "map_application_function_data_object" */
  updateApplicationFunctionDataObjectMapByPk?: Maybe<ApplicationFunctionDataObjectMap>;
  /** update data of the table: "map_application_interface_function" */
  updateApplicationInterfaceFunctionMap?: Maybe<ApplicationInterfaceFunctionMap_Mutation_Response>;
  /** update single row of the table: "map_application_interface_function" */
  updateApplicationInterfaceFunctionMapByPk?: Maybe<ApplicationInterfaceFunctionMap>;
  /** update data of the table: "actors" */
  updateBusinessActor?: Maybe<BusinessActor_Mutation_Response>;
  /** update single row of the table: "actors" */
  updateBusinessActorByPk?: Maybe<BusinessActor>;
  /** update data of the table: "map_business_actor_role" */
  updateBusinessActorRoleMap?: Maybe<BusinessActorRoleMap_Mutation_Response>;
  /** update single row of the table: "map_business_actor_role" */
  updateBusinessActorRoleMapByPk?: Maybe<BusinessActorRoleMap>;
  /** update data of the table: "products" */
  updateBusinessProduct?: Maybe<BusinessProduct_Mutation_Response>;
  /** update single row of the table: "products" */
  updateBusinessProductByPk?: Maybe<BusinessProduct>;
  /** update data of the table: "roles" */
  updateBusinessRole?: Maybe<BusinessRole_Mutation_Response>;
  /** update single row of the table: "roles" */
  updateBusinessRoleByPk?: Maybe<BusinessRole>;
  /** update data of the table: "capabilities" */
  updateCapability?: Maybe<Capability_Mutation_Response>;
  /** update single row of the table: "capabilities" */
  updateCapabilityByPk?: Maybe<Capability>;
  /** update data of the table: "data_objects" */
  updateDataObject?: Maybe<DataObject_Mutation_Response>;
  /** update single row of the table: "data_objects" */
  updateDataObjectByPk?: Maybe<DataObject>;
  /** update data of the table: "map_directory_items" */
  updateDirectoryItemsMap?: Maybe<DirectoryItemsMap_Mutation_Response>;
  /** update single row of the table: "map_directory_items" */
  updateDirectoryItemsMapByPk?: Maybe<DirectoryItemsMap>;
  /** update data of the table: "directories" */
  updateDirectoryObject?: Maybe<DirectoryObject_Mutation_Response>;
  /** update single row of the table: "directories" */
  updateDirectoryObjectByPk?: Maybe<DirectoryObject>;
  /** update data of the table: "employees" */
  updateEmployee?: Maybe<Employee_Mutation_Response>;
  /** update single row of the table: "employees" */
  updateEmployeeByPk?: Maybe<Employee>;
  /** update data of the table: "events" */
  updateEventGeneric?: Maybe<EventGeneric_Mutation_Response>;
  /** update single row of the table: "events" */
  updateEventGenericByPk?: Maybe<EventGeneric>;
  /** update data of the table: "flows" */
  updateFlowGeneric?: Maybe<FlowGeneric_Mutation_Response>;
  /** update single row of the table: "flows" */
  updateFlowGenericByPk?: Maybe<FlowGeneric>;
  /** update data of the table: "functions" */
  updateFunctionGeneric?: Maybe<FunctionGeneric_Mutation_Response>;
  /** update single row of the table: "functions" */
  updateFunctionGenericByPk?: Maybe<FunctionGeneric>;
  /** update data of the table: "interfaces" */
  updateInterfaceGeneric?: Maybe<InterfaceGeneric_Mutation_Response>;
  /** update single row of the table: "interfaces" */
  updateInterfaceGenericByPk?: Maybe<InterfaceGeneric>;
  /** update data of the table: "motivations" */
  updateMotivationElementGeneric?: Maybe<MotivationElementGeneric_Mutation_Response>;
  /** update single row of the table: "motivations" */
  updateMotivationElementGenericByPk?: Maybe<MotivationElementGeneric>;
  /** update data of the table: "locations" */
  updatePhysicalLocation?: Maybe<PhysicalLocation_Mutation_Response>;
  /** update single row of the table: "locations" */
  updatePhysicalLocationByPk?: Maybe<PhysicalLocation>;
  /** update data of the table: "solutions" */
  updateSolution?: Maybe<Solution_Mutation_Response>;
  /** update data of the table: "map_solution_application_component" */
  updateSolutionApplicationComponentMap?: Maybe<SolutionApplicationComponentMap_Mutation_Response>;
  /** update single row of the table: "map_solution_application_component" */
  updateSolutionApplicationComponentMapByPk?: Maybe<SolutionApplicationComponentMap>;
  /** update single row of the table: "solutions" */
  updateSolutionByPk?: Maybe<Solution>;
  /** update data of the table: "map_solution_constraint" */
  updateSolutionConstraintMap?: Maybe<SolutionConstraintMap_Mutation_Response>;
  /** update single row of the table: "map_solution_constraint" */
  updateSolutionConstraintMapByPk?: Maybe<SolutionConstraintMap>;
  /** update data of the table: "stakeholders" */
  updateStakeholder?: Maybe<Stakeholder_Mutation_Response>;
  /** update single row of the table: "stakeholders" */
  updateStakeholderByPk?: Maybe<Stakeholder>;
  /** update data of the table: "system_software" */
  updateSystemSoftware?: Maybe<SystemSoftware_Mutation_Response>;
  /** update single row of the table: "system_software" */
  updateSystemSoftwareByPk?: Maybe<SystemSoftware>;
  /** update data of the table: "technology_networks" */
  updateTechnologyNetwork?: Maybe<TechnologyNetwork_Mutation_Response>;
  /** update single row of the table: "technology_networks" */
  updateTechnologyNetworkByPk?: Maybe<TechnologyNetwork>;
  /** update data of the table: "map_technology_network_hierarchy" */
  updateTechnologyNetworkHierarchyMap?: Maybe<TechnologyNetworkHierarchyMap_Mutation_Response>;
  /** update single row of the table: "map_technology_network_hierarchy" */
  updateTechnologyNetworkHierarchyMapByPk?: Maybe<TechnologyNetworkHierarchyMap>;
  /** update data of the table: "technology_nodes" */
  updateTechnologyNode?: Maybe<TechnologyNode_Mutation_Response>;
  /** update single row of the table: "technology_nodes" */
  updateTechnologyNodeByPk?: Maybe<TechnologyNode>;
  /** update data of the table: "map_technology_node_hierarchy" */
  updateTechnologyNodeHierarchyMap?: Maybe<TechnologyNodeHierarchyMap_Mutation_Response>;
  /** update single row of the table: "map_technology_node_hierarchy" */
  updateTechnologyNodeHierarchyMapByPk?: Maybe<TechnologyNodeHierarchyMap>;
  /** update data of the table: "map_technology_node_system_software" */
  updateTechnologyNodeSystemSoftwareMap?: Maybe<TechnologyNodeSystemSoftwareMap_Mutation_Response>;
  /** update single row of the table: "map_technology_node_system_software" */
  updateTechnologyNodeSystemSoftwareMapByPk?: Maybe<TechnologyNodeSystemSoftwareMap>;
  /** update multiples rows of table: "map_application_component_data_object" */
  update_ApplicationComponentDataObjectMap_many?: Maybe<Array<Maybe<ApplicationComponentDataObjectMap_Mutation_Response>>>;
  /** update multiples rows of table: "map_application_component_event" */
  update_ApplicationComponentEventMap_many?: Maybe<Array<Maybe<ApplicationComponentEventMap_Mutation_Response>>>;
  /** update multiples rows of table: "map_application_component_function" */
  update_ApplicationComponentFunctionMap_many?: Maybe<Array<Maybe<ApplicationComponentFunctionMap_Mutation_Response>>>;
  /** update multiples rows of table: "map_application_component_hierarchy" */
  update_ApplicationComponentHierarchyMap_many?: Maybe<Array<Maybe<ApplicationComponentHierarchyMap_Mutation_Response>>>;
  /** update multiples rows of table: "map_application_component_interface" */
  update_ApplicationComponentInterfaceMap_many?: Maybe<Array<Maybe<ApplicationComponentInterfaceMap_Mutation_Response>>>;
  /** update multiples rows of table: "map_application_component_product" */
  update_ApplicationComponentProductMap_many?: Maybe<Array<Maybe<ApplicationComponentProductMap_Mutation_Response>>>;
  /** update multiples rows of table: "map_application_component_stakeholder" */
  update_ApplicationComponentStakeholderMap_many?: Maybe<Array<Maybe<ApplicationComponentStakeholderMap_Mutation_Response>>>;
  /** update multiples rows of table: "map_application_component_system_software" */
  update_ApplicationComponentSystemSoftwareMap_many?: Maybe<Array<Maybe<ApplicationComponentSystemSoftwareMap_Mutation_Response>>>;
  /** update multiples rows of table: "map_application_component_technology_logical_network" */
  update_ApplicationComponentTechnologyLogicalNetworkMap_many?: Maybe<Array<Maybe<ApplicationComponentTechnologyLogicalNetworkMap_Mutation_Response>>>;
  /** update multiples rows of table: "map_application_component_technology_node" */
  update_ApplicationComponentTechnologyNodeMap_many?: Maybe<Array<Maybe<ApplicationComponentTechnologyNodeMap_Mutation_Response>>>;
  /** update multiples rows of table: "components" */
  update_ApplicationComponent_many?: Maybe<Array<Maybe<ApplicationComponent_Mutation_Response>>>;
  /** update multiples rows of table: "map_application_function_data_object" */
  update_ApplicationFunctionDataObjectMap_many?: Maybe<Array<Maybe<ApplicationFunctionDataObjectMap_Mutation_Response>>>;
  /** update multiples rows of table: "map_application_interface_function" */
  update_ApplicationInterfaceFunctionMap_many?: Maybe<Array<Maybe<ApplicationInterfaceFunctionMap_Mutation_Response>>>;
  /** update multiples rows of table: "map_business_actor_role" */
  update_BusinessActorRoleMap_many?: Maybe<Array<Maybe<BusinessActorRoleMap_Mutation_Response>>>;
  /** update multiples rows of table: "actors" */
  update_BusinessActor_many?: Maybe<Array<Maybe<BusinessActor_Mutation_Response>>>;
  /** update multiples rows of table: "products" */
  update_BusinessProduct_many?: Maybe<Array<Maybe<BusinessProduct_Mutation_Response>>>;
  /** update multiples rows of table: "roles" */
  update_BusinessRole_many?: Maybe<Array<Maybe<BusinessRole_Mutation_Response>>>;
  /** update multiples rows of table: "capabilities" */
  update_Capability_many?: Maybe<Array<Maybe<Capability_Mutation_Response>>>;
  /** update multiples rows of table: "data_objects" */
  update_DataObject_many?: Maybe<Array<Maybe<DataObject_Mutation_Response>>>;
  /** update multiples rows of table: "map_directory_items" */
  update_DirectoryItemsMap_many?: Maybe<Array<Maybe<DirectoryItemsMap_Mutation_Response>>>;
  /** update multiples rows of table: "directories" */
  update_DirectoryObject_many?: Maybe<Array<Maybe<DirectoryObject_Mutation_Response>>>;
  /** update multiples rows of table: "employees" */
  update_Employee_many?: Maybe<Array<Maybe<Employee_Mutation_Response>>>;
  /** update multiples rows of table: "events" */
  update_EventGeneric_many?: Maybe<Array<Maybe<EventGeneric_Mutation_Response>>>;
  /** update multiples rows of table: "flows" */
  update_FlowGeneric_many?: Maybe<Array<Maybe<FlowGeneric_Mutation_Response>>>;
  /** update multiples rows of table: "functions" */
  update_FunctionGeneric_many?: Maybe<Array<Maybe<FunctionGeneric_Mutation_Response>>>;
  /** update multiples rows of table: "interfaces" */
  update_InterfaceGeneric_many?: Maybe<Array<Maybe<InterfaceGeneric_Mutation_Response>>>;
  /** update multiples rows of table: "motivations" */
  update_MotivationElementGeneric_many?: Maybe<Array<Maybe<MotivationElementGeneric_Mutation_Response>>>;
  /** update multiples rows of table: "locations" */
  update_PhysicalLocation_many?: Maybe<Array<Maybe<PhysicalLocation_Mutation_Response>>>;
  /** update multiples rows of table: "map_solution_application_component" */
  update_SolutionApplicationComponentMap_many?: Maybe<Array<Maybe<SolutionApplicationComponentMap_Mutation_Response>>>;
  /** update multiples rows of table: "map_solution_constraint" */
  update_SolutionConstraintMap_many?: Maybe<Array<Maybe<SolutionConstraintMap_Mutation_Response>>>;
  /** update multiples rows of table: "solutions" */
  update_Solution_many?: Maybe<Array<Maybe<Solution_Mutation_Response>>>;
  /** update multiples rows of table: "stakeholders" */
  update_Stakeholder_many?: Maybe<Array<Maybe<Stakeholder_Mutation_Response>>>;
  /** update multiples rows of table: "system_software" */
  update_SystemSoftware_many?: Maybe<Array<Maybe<SystemSoftware_Mutation_Response>>>;
  /** update multiples rows of table: "map_technology_network_hierarchy" */
  update_TechnologyNetworkHierarchyMap_many?: Maybe<Array<Maybe<TechnologyNetworkHierarchyMap_Mutation_Response>>>;
  /** update multiples rows of table: "technology_networks" */
  update_TechnologyNetwork_many?: Maybe<Array<Maybe<TechnologyNetwork_Mutation_Response>>>;
  /** update multiples rows of table: "map_technology_node_hierarchy" */
  update_TechnologyNodeHierarchyMap_many?: Maybe<Array<Maybe<TechnologyNodeHierarchyMap_Mutation_Response>>>;
  /** update multiples rows of table: "map_technology_node_system_software" */
  update_TechnologyNodeSystemSoftwareMap_many?: Maybe<Array<Maybe<TechnologyNodeSystemSoftwareMap_Mutation_Response>>>;
  /** update multiples rows of table: "technology_nodes" */
  update_TechnologyNode_many?: Maybe<Array<Maybe<TechnologyNode_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDeleteApplicationComponentArgs = {
  where: ApplicationComponent_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteApplicationComponentByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteApplicationComponentDataObjectMapArgs = {
  where: ApplicationComponentDataObjectMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteApplicationComponentDataObjectMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  dataObjectId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteApplicationComponentEventMapArgs = {
  where: ApplicationComponentEventMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteApplicationComponentEventMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  eventId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteApplicationComponentFunctionMapArgs = {
  where: ApplicationComponentFunctionMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteApplicationComponentFunctionMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  functionId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteApplicationComponentHierarchyMapArgs = {
  where: ApplicationComponentHierarchyMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteApplicationComponentHierarchyMapByPkArgs = {
  componentChildId: Scalars['uuid']['input'];
  componentParentId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteApplicationComponentInterfaceMapArgs = {
  where: ApplicationComponentInterfaceMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteApplicationComponentInterfaceMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  interfaceId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteApplicationComponentProductMapArgs = {
  where: ApplicationComponentProductMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteApplicationComponentProductMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  productId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteApplicationComponentStakeholderMapArgs = {
  where: ApplicationComponentStakeholderMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteApplicationComponentStakeholderMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  roleId: Scalars['uuid']['input'];
  stakeholderId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteApplicationComponentSystemSoftwareMapArgs = {
  where: ApplicationComponentSystemSoftwareMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteApplicationComponentSystemSoftwareMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  systemSoftwareId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteApplicationComponentTechnologyLogicalNetworkMapArgs = {
  where: ApplicationComponentTechnologyLogicalNetworkMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteApplicationComponentTechnologyLogicalNetworkMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  logicalNetworkId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteApplicationComponentTechnologyNodeMapArgs = {
  where: ApplicationComponentTechnologyNodeMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteApplicationComponentTechnologyNodeMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  nodeId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteApplicationFunctionDataObjectMapArgs = {
  where: ApplicationFunctionDataObjectMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteApplicationFunctionDataObjectMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  dataObjectId: Scalars['uuid']['input'];
  functionId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteApplicationInterfaceFunctionMapArgs = {
  where: ApplicationInterfaceFunctionMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteApplicationInterfaceFunctionMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  functionId: Scalars['uuid']['input'];
  interfaceId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteBusinessActorArgs = {
  where: BusinessActor_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteBusinessActorByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteBusinessActorRoleMapArgs = {
  where: BusinessActorRoleMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteBusinessActorRoleMapByPkArgs = {
  actorId: Scalars['uuid']['input'];
  roleId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteBusinessProductArgs = {
  where: BusinessProduct_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteBusinessProductByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteBusinessRoleArgs = {
  where: BusinessRole_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteBusinessRoleByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteCapabilityArgs = {
  where: Capability_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteCapabilityByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteDataObjectArgs = {
  where: DataObject_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteDataObjectByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteDirectoryItemsMapArgs = {
  where: DirectoryItemsMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteDirectoryItemsMapByPkArgs = {
  sourceId: Scalars['uuid']['input'];
  targetId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteDirectoryObjectArgs = {
  where: DirectoryObject_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteDirectoryObjectByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteEmployeeArgs = {
  where: Employee_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteEmployeeByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteEventGenericArgs = {
  where: EventGeneric_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteEventGenericByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteFlowGenericArgs = {
  where: FlowGeneric_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteFlowGenericByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteFunctionGenericArgs = {
  where: FunctionGeneric_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteFunctionGenericByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteInterfaceGenericArgs = {
  where: InterfaceGeneric_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteInterfaceGenericByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteMotivationElementGenericArgs = {
  where: MotivationElementGeneric_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteMotivationElementGenericByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeletePhysicalLocationArgs = {
  where: PhysicalLocation_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeletePhysicalLocationByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteSolutionArgs = {
  where: Solution_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteSolutionApplicationComponentMapArgs = {
  where: SolutionApplicationComponentMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteSolutionApplicationComponentMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteSolutionByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteSolutionConstraintMapArgs = {
  where: SolutionConstraintMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteSolutionConstraintMapByPkArgs = {
  constraintId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteStakeholderArgs = {
  where: Stakeholder_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteStakeholderByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteSystemSoftwareArgs = {
  where: SystemSoftware_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteSystemSoftwareByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteTechnologyNetworkArgs = {
  where: TechnologyNetwork_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteTechnologyNetworkByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteTechnologyNetworkHierarchyMapArgs = {
  where: TechnologyNetworkHierarchyMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteTechnologyNetworkHierarchyMapByPkArgs = {
  networkChildId: Scalars['uuid']['input'];
  networkParentId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteTechnologyNodeArgs = {
  where: TechnologyNode_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteTechnologyNodeByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteTechnologyNodeHierarchyMapArgs = {
  where: TechnologyNodeHierarchyMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteTechnologyNodeHierarchyMapByPkArgs = {
  nodeChildId: Scalars['uuid']['input'];
  nodeParentId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteTechnologyNodeSystemSoftwareMapArgs = {
  where: TechnologyNodeSystemSoftwareMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteTechnologyNodeSystemSoftwareMapByPkArgs = {
  nodeId: Scalars['uuid']['input'];
  systemSoftwareId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootInsertApplicationComponentArgs = {
  objects: Array<ApplicationComponent_Insert_Input>;
  on_conflict?: InputMaybe<ApplicationComponent_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertApplicationComponentDataObjectMapArgs = {
  objects: Array<ApplicationComponentDataObjectMap_Insert_Input>;
  on_conflict?: InputMaybe<ApplicationComponentDataObjectMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertApplicationComponentDataObjectMapOneArgs = {
  object: ApplicationComponentDataObjectMap_Insert_Input;
  on_conflict?: InputMaybe<ApplicationComponentDataObjectMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertApplicationComponentEventMapArgs = {
  objects: Array<ApplicationComponentEventMap_Insert_Input>;
  on_conflict?: InputMaybe<ApplicationComponentEventMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertApplicationComponentEventMapOneArgs = {
  object: ApplicationComponentEventMap_Insert_Input;
  on_conflict?: InputMaybe<ApplicationComponentEventMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertApplicationComponentFunctionMapArgs = {
  objects: Array<ApplicationComponentFunctionMap_Insert_Input>;
  on_conflict?: InputMaybe<ApplicationComponentFunctionMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertApplicationComponentFunctionMapOneArgs = {
  object: ApplicationComponentFunctionMap_Insert_Input;
  on_conflict?: InputMaybe<ApplicationComponentFunctionMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertApplicationComponentHierarchyMapArgs = {
  objects: Array<ApplicationComponentHierarchyMap_Insert_Input>;
  on_conflict?: InputMaybe<ApplicationComponentHierarchyMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertApplicationComponentHierarchyMapOneArgs = {
  object: ApplicationComponentHierarchyMap_Insert_Input;
  on_conflict?: InputMaybe<ApplicationComponentHierarchyMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertApplicationComponentInterfaceMapArgs = {
  objects: Array<ApplicationComponentInterfaceMap_Insert_Input>;
  on_conflict?: InputMaybe<ApplicationComponentInterfaceMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertApplicationComponentInterfaceMapOneArgs = {
  object: ApplicationComponentInterfaceMap_Insert_Input;
  on_conflict?: InputMaybe<ApplicationComponentInterfaceMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertApplicationComponentOneArgs = {
  object: ApplicationComponent_Insert_Input;
  on_conflict?: InputMaybe<ApplicationComponent_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertApplicationComponentProductMapArgs = {
  objects: Array<ApplicationComponentProductMap_Insert_Input>;
  on_conflict?: InputMaybe<ApplicationComponentProductMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertApplicationComponentProductMapOneArgs = {
  object: ApplicationComponentProductMap_Insert_Input;
  on_conflict?: InputMaybe<ApplicationComponentProductMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertApplicationComponentStakeholderMapArgs = {
  objects: Array<ApplicationComponentStakeholderMap_Insert_Input>;
  on_conflict?: InputMaybe<ApplicationComponentStakeholderMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertApplicationComponentStakeholderMapOneArgs = {
  object: ApplicationComponentStakeholderMap_Insert_Input;
  on_conflict?: InputMaybe<ApplicationComponentStakeholderMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertApplicationComponentSystemSoftwareMapArgs = {
  objects: Array<ApplicationComponentSystemSoftwareMap_Insert_Input>;
  on_conflict?: InputMaybe<ApplicationComponentSystemSoftwareMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertApplicationComponentSystemSoftwareMapOneArgs = {
  object: ApplicationComponentSystemSoftwareMap_Insert_Input;
  on_conflict?: InputMaybe<ApplicationComponentSystemSoftwareMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertApplicationComponentTechnologyLogicalNetworkMapArgs = {
  objects: Array<ApplicationComponentTechnologyLogicalNetworkMap_Insert_Input>;
  on_conflict?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertApplicationComponentTechnologyLogicalNetworkMapOneArgs = {
  object: ApplicationComponentTechnologyLogicalNetworkMap_Insert_Input;
  on_conflict?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertApplicationComponentTechnologyNodeMapArgs = {
  objects: Array<ApplicationComponentTechnologyNodeMap_Insert_Input>;
  on_conflict?: InputMaybe<ApplicationComponentTechnologyNodeMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertApplicationComponentTechnologyNodeMapOneArgs = {
  object: ApplicationComponentTechnologyNodeMap_Insert_Input;
  on_conflict?: InputMaybe<ApplicationComponentTechnologyNodeMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertApplicationFunctionDataObjectMapArgs = {
  objects: Array<ApplicationFunctionDataObjectMap_Insert_Input>;
  on_conflict?: InputMaybe<ApplicationFunctionDataObjectMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertApplicationFunctionDataObjectMapOneArgs = {
  object: ApplicationFunctionDataObjectMap_Insert_Input;
  on_conflict?: InputMaybe<ApplicationFunctionDataObjectMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertApplicationInterfaceFunctionMapArgs = {
  objects: Array<ApplicationInterfaceFunctionMap_Insert_Input>;
  on_conflict?: InputMaybe<ApplicationInterfaceFunctionMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertApplicationInterfaceFunctionMapOneArgs = {
  object: ApplicationInterfaceFunctionMap_Insert_Input;
  on_conflict?: InputMaybe<ApplicationInterfaceFunctionMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertBusinessActorArgs = {
  objects: Array<BusinessActor_Insert_Input>;
  on_conflict?: InputMaybe<BusinessActor_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertBusinessActorOneArgs = {
  object: BusinessActor_Insert_Input;
  on_conflict?: InputMaybe<BusinessActor_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertBusinessActorRoleMapArgs = {
  objects: Array<BusinessActorRoleMap_Insert_Input>;
  on_conflict?: InputMaybe<BusinessActorRoleMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertBusinessActorRoleMapOneArgs = {
  object: BusinessActorRoleMap_Insert_Input;
  on_conflict?: InputMaybe<BusinessActorRoleMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertBusinessProductArgs = {
  objects: Array<BusinessProduct_Insert_Input>;
  on_conflict?: InputMaybe<BusinessProduct_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertBusinessProductOneArgs = {
  object: BusinessProduct_Insert_Input;
  on_conflict?: InputMaybe<BusinessProduct_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertBusinessRoleArgs = {
  objects: Array<BusinessRole_Insert_Input>;
  on_conflict?: InputMaybe<BusinessRole_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertBusinessRoleOneArgs = {
  object: BusinessRole_Insert_Input;
  on_conflict?: InputMaybe<BusinessRole_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertCapabilityArgs = {
  objects: Array<Capability_Insert_Input>;
  on_conflict?: InputMaybe<Capability_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertCapabilityOneArgs = {
  object: Capability_Insert_Input;
  on_conflict?: InputMaybe<Capability_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertDataObjectArgs = {
  objects: Array<DataObject_Insert_Input>;
  on_conflict?: InputMaybe<DataObject_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertDataObjectOneArgs = {
  object: DataObject_Insert_Input;
  on_conflict?: InputMaybe<DataObject_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertDirectoryItemsMapArgs = {
  objects: Array<DirectoryItemsMap_Insert_Input>;
  on_conflict?: InputMaybe<DirectoryItemsMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertDirectoryItemsMapOneArgs = {
  object: DirectoryItemsMap_Insert_Input;
  on_conflict?: InputMaybe<DirectoryItemsMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertDirectoryObjectArgs = {
  objects: Array<DirectoryObject_Insert_Input>;
  on_conflict?: InputMaybe<DirectoryObject_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertDirectoryObjectOneArgs = {
  object: DirectoryObject_Insert_Input;
  on_conflict?: InputMaybe<DirectoryObject_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertEmployeeArgs = {
  objects: Array<Employee_Insert_Input>;
  on_conflict?: InputMaybe<Employee_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertEmployeeOneArgs = {
  object: Employee_Insert_Input;
  on_conflict?: InputMaybe<Employee_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertEventGenericArgs = {
  objects: Array<EventGeneric_Insert_Input>;
  on_conflict?: InputMaybe<EventGeneric_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertEventGenericOneArgs = {
  object: EventGeneric_Insert_Input;
  on_conflict?: InputMaybe<EventGeneric_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertFlowGenericArgs = {
  objects: Array<FlowGeneric_Insert_Input>;
  on_conflict?: InputMaybe<FlowGeneric_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertFlowGenericOneArgs = {
  object: FlowGeneric_Insert_Input;
  on_conflict?: InputMaybe<FlowGeneric_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertFunctionGenericArgs = {
  objects: Array<FunctionGeneric_Insert_Input>;
  on_conflict?: InputMaybe<FunctionGeneric_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertFunctionGenericOneArgs = {
  object: FunctionGeneric_Insert_Input;
  on_conflict?: InputMaybe<FunctionGeneric_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertInterfaceGenericArgs = {
  objects: Array<InterfaceGeneric_Insert_Input>;
  on_conflict?: InputMaybe<InterfaceGeneric_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertInterfaceGenericOneArgs = {
  object: InterfaceGeneric_Insert_Input;
  on_conflict?: InputMaybe<InterfaceGeneric_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertMotivationElementGenericArgs = {
  objects: Array<MotivationElementGeneric_Insert_Input>;
  on_conflict?: InputMaybe<MotivationElementGeneric_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertMotivationElementGenericOneArgs = {
  object: MotivationElementGeneric_Insert_Input;
  on_conflict?: InputMaybe<MotivationElementGeneric_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertPhysicalLocationArgs = {
  objects: Array<PhysicalLocation_Insert_Input>;
  on_conflict?: InputMaybe<PhysicalLocation_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertPhysicalLocationOneArgs = {
  object: PhysicalLocation_Insert_Input;
  on_conflict?: InputMaybe<PhysicalLocation_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertSolutionArgs = {
  objects: Array<Solution_Insert_Input>;
  on_conflict?: InputMaybe<Solution_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertSolutionApplicationComponentMapArgs = {
  objects: Array<SolutionApplicationComponentMap_Insert_Input>;
  on_conflict?: InputMaybe<SolutionApplicationComponentMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertSolutionApplicationComponentMapOneArgs = {
  object: SolutionApplicationComponentMap_Insert_Input;
  on_conflict?: InputMaybe<SolutionApplicationComponentMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertSolutionConstraintMapArgs = {
  objects: Array<SolutionConstraintMap_Insert_Input>;
  on_conflict?: InputMaybe<SolutionConstraintMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertSolutionConstraintMapOneArgs = {
  object: SolutionConstraintMap_Insert_Input;
  on_conflict?: InputMaybe<SolutionConstraintMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertSolutionOneArgs = {
  object: Solution_Insert_Input;
  on_conflict?: InputMaybe<Solution_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertStakeholderArgs = {
  objects: Array<Stakeholder_Insert_Input>;
  on_conflict?: InputMaybe<Stakeholder_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertStakeholderOneArgs = {
  object: Stakeholder_Insert_Input;
  on_conflict?: InputMaybe<Stakeholder_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertSystemSoftwareArgs = {
  objects: Array<SystemSoftware_Insert_Input>;
  on_conflict?: InputMaybe<SystemSoftware_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertSystemSoftwareOneArgs = {
  object: SystemSoftware_Insert_Input;
  on_conflict?: InputMaybe<SystemSoftware_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertTechnologyNetworkArgs = {
  objects: Array<TechnologyNetwork_Insert_Input>;
  on_conflict?: InputMaybe<TechnologyNetwork_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertTechnologyNetworkHierarchyMapArgs = {
  objects: Array<TechnologyNetworkHierarchyMap_Insert_Input>;
  on_conflict?: InputMaybe<TechnologyNetworkHierarchyMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertTechnologyNetworkHierarchyMapOneArgs = {
  object: TechnologyNetworkHierarchyMap_Insert_Input;
  on_conflict?: InputMaybe<TechnologyNetworkHierarchyMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertTechnologyNetworkOneArgs = {
  object: TechnologyNetwork_Insert_Input;
  on_conflict?: InputMaybe<TechnologyNetwork_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertTechnologyNodeArgs = {
  objects: Array<TechnologyNode_Insert_Input>;
  on_conflict?: InputMaybe<TechnologyNode_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertTechnologyNodeHierarchyMapArgs = {
  objects: Array<TechnologyNodeHierarchyMap_Insert_Input>;
  on_conflict?: InputMaybe<TechnologyNodeHierarchyMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertTechnologyNodeHierarchyMapOneArgs = {
  object: TechnologyNodeHierarchyMap_Insert_Input;
  on_conflict?: InputMaybe<TechnologyNodeHierarchyMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertTechnologyNodeOneArgs = {
  object: TechnologyNode_Insert_Input;
  on_conflict?: InputMaybe<TechnologyNode_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertTechnologyNodeSystemSoftwareMapArgs = {
  objects: Array<TechnologyNodeSystemSoftwareMap_Insert_Input>;
  on_conflict?: InputMaybe<TechnologyNodeSystemSoftwareMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertTechnologyNodeSystemSoftwareMapOneArgs = {
  object: TechnologyNodeSystemSoftwareMap_Insert_Input;
  on_conflict?: InputMaybe<TechnologyNodeSystemSoftwareMap_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdateApplicationComponentArgs = {
  _set?: InputMaybe<ApplicationComponent_Set_Input>;
  where: ApplicationComponent_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateApplicationComponentByPkArgs = {
  _set?: InputMaybe<ApplicationComponent_Set_Input>;
  pk_columns: ApplicationComponent_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateApplicationComponentDataObjectMapArgs = {
  _set?: InputMaybe<ApplicationComponentDataObjectMap_Set_Input>;
  where: ApplicationComponentDataObjectMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateApplicationComponentDataObjectMapByPkArgs = {
  _set?: InputMaybe<ApplicationComponentDataObjectMap_Set_Input>;
  pk_columns: ApplicationComponentDataObjectMap_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateApplicationComponentEventMapArgs = {
  _set?: InputMaybe<ApplicationComponentEventMap_Set_Input>;
  where: ApplicationComponentEventMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateApplicationComponentEventMapByPkArgs = {
  _set?: InputMaybe<ApplicationComponentEventMap_Set_Input>;
  pk_columns: ApplicationComponentEventMap_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateApplicationComponentFunctionMapArgs = {
  _set?: InputMaybe<ApplicationComponentFunctionMap_Set_Input>;
  where: ApplicationComponentFunctionMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateApplicationComponentFunctionMapByPkArgs = {
  _set?: InputMaybe<ApplicationComponentFunctionMap_Set_Input>;
  pk_columns: ApplicationComponentFunctionMap_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateApplicationComponentHierarchyMapArgs = {
  _inc?: InputMaybe<ApplicationComponentHierarchyMap_Inc_Input>;
  _set?: InputMaybe<ApplicationComponentHierarchyMap_Set_Input>;
  where: ApplicationComponentHierarchyMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateApplicationComponentHierarchyMapByPkArgs = {
  _inc?: InputMaybe<ApplicationComponentHierarchyMap_Inc_Input>;
  _set?: InputMaybe<ApplicationComponentHierarchyMap_Set_Input>;
  pk_columns: ApplicationComponentHierarchyMap_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateApplicationComponentInterfaceMapArgs = {
  _set?: InputMaybe<ApplicationComponentInterfaceMap_Set_Input>;
  where: ApplicationComponentInterfaceMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateApplicationComponentInterfaceMapByPkArgs = {
  _set?: InputMaybe<ApplicationComponentInterfaceMap_Set_Input>;
  pk_columns: ApplicationComponentInterfaceMap_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateApplicationComponentProductMapArgs = {
  _set?: InputMaybe<ApplicationComponentProductMap_Set_Input>;
  where: ApplicationComponentProductMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateApplicationComponentProductMapByPkArgs = {
  _set?: InputMaybe<ApplicationComponentProductMap_Set_Input>;
  pk_columns: ApplicationComponentProductMap_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateApplicationComponentStakeholderMapArgs = {
  _set?: InputMaybe<ApplicationComponentStakeholderMap_Set_Input>;
  where: ApplicationComponentStakeholderMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateApplicationComponentStakeholderMapByPkArgs = {
  _set?: InputMaybe<ApplicationComponentStakeholderMap_Set_Input>;
  pk_columns: ApplicationComponentStakeholderMap_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateApplicationComponentSystemSoftwareMapArgs = {
  _set?: InputMaybe<ApplicationComponentSystemSoftwareMap_Set_Input>;
  where: ApplicationComponentSystemSoftwareMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateApplicationComponentSystemSoftwareMapByPkArgs = {
  _set?: InputMaybe<ApplicationComponentSystemSoftwareMap_Set_Input>;
  pk_columns: ApplicationComponentSystemSoftwareMap_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateApplicationComponentTechnologyLogicalNetworkMapArgs = {
  _set?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_Set_Input>;
  where: ApplicationComponentTechnologyLogicalNetworkMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateApplicationComponentTechnologyLogicalNetworkMapByPkArgs = {
  _set?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_Set_Input>;
  pk_columns: ApplicationComponentTechnologyLogicalNetworkMap_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateApplicationComponentTechnologyNodeMapArgs = {
  _set?: InputMaybe<ApplicationComponentTechnologyNodeMap_Set_Input>;
  where: ApplicationComponentTechnologyNodeMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateApplicationComponentTechnologyNodeMapByPkArgs = {
  _set?: InputMaybe<ApplicationComponentTechnologyNodeMap_Set_Input>;
  pk_columns: ApplicationComponentTechnologyNodeMap_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateApplicationFunctionDataObjectMapArgs = {
  _set?: InputMaybe<ApplicationFunctionDataObjectMap_Set_Input>;
  where: ApplicationFunctionDataObjectMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateApplicationFunctionDataObjectMapByPkArgs = {
  _set?: InputMaybe<ApplicationFunctionDataObjectMap_Set_Input>;
  pk_columns: ApplicationFunctionDataObjectMap_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateApplicationInterfaceFunctionMapArgs = {
  _set?: InputMaybe<ApplicationInterfaceFunctionMap_Set_Input>;
  where: ApplicationInterfaceFunctionMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateApplicationInterfaceFunctionMapByPkArgs = {
  _set?: InputMaybe<ApplicationInterfaceFunctionMap_Set_Input>;
  pk_columns: ApplicationInterfaceFunctionMap_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateBusinessActorArgs = {
  _set?: InputMaybe<BusinessActor_Set_Input>;
  where: BusinessActor_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateBusinessActorByPkArgs = {
  _set?: InputMaybe<BusinessActor_Set_Input>;
  pk_columns: BusinessActor_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateBusinessActorRoleMapArgs = {
  _set?: InputMaybe<BusinessActorRoleMap_Set_Input>;
  where: BusinessActorRoleMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateBusinessActorRoleMapByPkArgs = {
  _set?: InputMaybe<BusinessActorRoleMap_Set_Input>;
  pk_columns: BusinessActorRoleMap_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateBusinessProductArgs = {
  _set?: InputMaybe<BusinessProduct_Set_Input>;
  where: BusinessProduct_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateBusinessProductByPkArgs = {
  _set?: InputMaybe<BusinessProduct_Set_Input>;
  pk_columns: BusinessProduct_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateBusinessRoleArgs = {
  _set?: InputMaybe<BusinessRole_Set_Input>;
  where: BusinessRole_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateBusinessRoleByPkArgs = {
  _set?: InputMaybe<BusinessRole_Set_Input>;
  pk_columns: BusinessRole_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateCapabilityArgs = {
  _set?: InputMaybe<Capability_Set_Input>;
  where: Capability_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateCapabilityByPkArgs = {
  _set?: InputMaybe<Capability_Set_Input>;
  pk_columns: Capability_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateDataObjectArgs = {
  _set?: InputMaybe<DataObject_Set_Input>;
  where: DataObject_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateDataObjectByPkArgs = {
  _set?: InputMaybe<DataObject_Set_Input>;
  pk_columns: DataObject_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateDirectoryItemsMapArgs = {
  _set?: InputMaybe<DirectoryItemsMap_Set_Input>;
  where: DirectoryItemsMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateDirectoryItemsMapByPkArgs = {
  _set?: InputMaybe<DirectoryItemsMap_Set_Input>;
  pk_columns: DirectoryItemsMap_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateDirectoryObjectArgs = {
  _set?: InputMaybe<DirectoryObject_Set_Input>;
  where: DirectoryObject_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateDirectoryObjectByPkArgs = {
  _set?: InputMaybe<DirectoryObject_Set_Input>;
  pk_columns: DirectoryObject_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateEmployeeArgs = {
  _set?: InputMaybe<Employee_Set_Input>;
  where: Employee_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateEmployeeByPkArgs = {
  _set?: InputMaybe<Employee_Set_Input>;
  pk_columns: Employee_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateEventGenericArgs = {
  _set?: InputMaybe<EventGeneric_Set_Input>;
  where: EventGeneric_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateEventGenericByPkArgs = {
  _set?: InputMaybe<EventGeneric_Set_Input>;
  pk_columns: EventGeneric_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateFlowGenericArgs = {
  _set?: InputMaybe<FlowGeneric_Set_Input>;
  where: FlowGeneric_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateFlowGenericByPkArgs = {
  _set?: InputMaybe<FlowGeneric_Set_Input>;
  pk_columns: FlowGeneric_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateFunctionGenericArgs = {
  _set?: InputMaybe<FunctionGeneric_Set_Input>;
  where: FunctionGeneric_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateFunctionGenericByPkArgs = {
  _set?: InputMaybe<FunctionGeneric_Set_Input>;
  pk_columns: FunctionGeneric_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateInterfaceGenericArgs = {
  _set?: InputMaybe<InterfaceGeneric_Set_Input>;
  where: InterfaceGeneric_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateInterfaceGenericByPkArgs = {
  _set?: InputMaybe<InterfaceGeneric_Set_Input>;
  pk_columns: InterfaceGeneric_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateMotivationElementGenericArgs = {
  _inc?: InputMaybe<MotivationElementGeneric_Inc_Input>;
  _set?: InputMaybe<MotivationElementGeneric_Set_Input>;
  where: MotivationElementGeneric_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateMotivationElementGenericByPkArgs = {
  _inc?: InputMaybe<MotivationElementGeneric_Inc_Input>;
  _set?: InputMaybe<MotivationElementGeneric_Set_Input>;
  pk_columns: MotivationElementGeneric_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdatePhysicalLocationArgs = {
  _set?: InputMaybe<PhysicalLocation_Set_Input>;
  where: PhysicalLocation_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdatePhysicalLocationByPkArgs = {
  _set?: InputMaybe<PhysicalLocation_Set_Input>;
  pk_columns: PhysicalLocation_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateSolutionArgs = {
  _set?: InputMaybe<Solution_Set_Input>;
  where: Solution_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateSolutionApplicationComponentMapArgs = {
  _set?: InputMaybe<SolutionApplicationComponentMap_Set_Input>;
  where: SolutionApplicationComponentMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateSolutionApplicationComponentMapByPkArgs = {
  _set?: InputMaybe<SolutionApplicationComponentMap_Set_Input>;
  pk_columns: SolutionApplicationComponentMap_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateSolutionByPkArgs = {
  _set?: InputMaybe<Solution_Set_Input>;
  pk_columns: Solution_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateSolutionConstraintMapArgs = {
  _set?: InputMaybe<SolutionConstraintMap_Set_Input>;
  where: SolutionConstraintMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateSolutionConstraintMapByPkArgs = {
  _set?: InputMaybe<SolutionConstraintMap_Set_Input>;
  pk_columns: SolutionConstraintMap_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateStakeholderArgs = {
  _set?: InputMaybe<Stakeholder_Set_Input>;
  where: Stakeholder_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateStakeholderByPkArgs = {
  _set?: InputMaybe<Stakeholder_Set_Input>;
  pk_columns: Stakeholder_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateSystemSoftwareArgs = {
  _set?: InputMaybe<SystemSoftware_Set_Input>;
  where: SystemSoftware_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateSystemSoftwareByPkArgs = {
  _set?: InputMaybe<SystemSoftware_Set_Input>;
  pk_columns: SystemSoftware_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateTechnologyNetworkArgs = {
  _set?: InputMaybe<TechnologyNetwork_Set_Input>;
  where: TechnologyNetwork_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateTechnologyNetworkByPkArgs = {
  _set?: InputMaybe<TechnologyNetwork_Set_Input>;
  pk_columns: TechnologyNetwork_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateTechnologyNetworkHierarchyMapArgs = {
  _inc?: InputMaybe<TechnologyNetworkHierarchyMap_Inc_Input>;
  _set?: InputMaybe<TechnologyNetworkHierarchyMap_Set_Input>;
  where: TechnologyNetworkHierarchyMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateTechnologyNetworkHierarchyMapByPkArgs = {
  _inc?: InputMaybe<TechnologyNetworkHierarchyMap_Inc_Input>;
  _set?: InputMaybe<TechnologyNetworkHierarchyMap_Set_Input>;
  pk_columns: TechnologyNetworkHierarchyMap_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateTechnologyNodeArgs = {
  _inc?: InputMaybe<TechnologyNode_Inc_Input>;
  _set?: InputMaybe<TechnologyNode_Set_Input>;
  where: TechnologyNode_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateTechnologyNodeByPkArgs = {
  _inc?: InputMaybe<TechnologyNode_Inc_Input>;
  _set?: InputMaybe<TechnologyNode_Set_Input>;
  pk_columns: TechnologyNode_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateTechnologyNodeHierarchyMapArgs = {
  _inc?: InputMaybe<TechnologyNodeHierarchyMap_Inc_Input>;
  _set?: InputMaybe<TechnologyNodeHierarchyMap_Set_Input>;
  where: TechnologyNodeHierarchyMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateTechnologyNodeHierarchyMapByPkArgs = {
  _inc?: InputMaybe<TechnologyNodeHierarchyMap_Inc_Input>;
  _set?: InputMaybe<TechnologyNodeHierarchyMap_Set_Input>;
  pk_columns: TechnologyNodeHierarchyMap_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateTechnologyNodeSystemSoftwareMapArgs = {
  _set?: InputMaybe<TechnologyNodeSystemSoftwareMap_Set_Input>;
  where: TechnologyNodeSystemSoftwareMap_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateTechnologyNodeSystemSoftwareMapByPkArgs = {
  _set?: InputMaybe<TechnologyNodeSystemSoftwareMap_Set_Input>;
  pk_columns: TechnologyNodeSystemSoftwareMap_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ApplicationComponentDataObjectMap_ManyArgs = {
  updates: Array<ApplicationComponentDataObjectMap_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ApplicationComponentEventMap_ManyArgs = {
  updates: Array<ApplicationComponentEventMap_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ApplicationComponentFunctionMap_ManyArgs = {
  updates: Array<ApplicationComponentFunctionMap_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ApplicationComponentHierarchyMap_ManyArgs = {
  updates: Array<ApplicationComponentHierarchyMap_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ApplicationComponentInterfaceMap_ManyArgs = {
  updates: Array<ApplicationComponentInterfaceMap_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ApplicationComponentProductMap_ManyArgs = {
  updates: Array<ApplicationComponentProductMap_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ApplicationComponentStakeholderMap_ManyArgs = {
  updates: Array<ApplicationComponentStakeholderMap_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ApplicationComponentSystemSoftwareMap_ManyArgs = {
  updates: Array<ApplicationComponentSystemSoftwareMap_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ApplicationComponentTechnologyLogicalNetworkMap_ManyArgs = {
  updates: Array<ApplicationComponentTechnologyLogicalNetworkMap_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ApplicationComponentTechnologyNodeMap_ManyArgs = {
  updates: Array<ApplicationComponentTechnologyNodeMap_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ApplicationComponent_ManyArgs = {
  updates: Array<ApplicationComponent_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ApplicationFunctionDataObjectMap_ManyArgs = {
  updates: Array<ApplicationFunctionDataObjectMap_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ApplicationInterfaceFunctionMap_ManyArgs = {
  updates: Array<ApplicationInterfaceFunctionMap_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_BusinessActorRoleMap_ManyArgs = {
  updates: Array<BusinessActorRoleMap_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_BusinessActor_ManyArgs = {
  updates: Array<BusinessActor_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_BusinessProduct_ManyArgs = {
  updates: Array<BusinessProduct_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_BusinessRole_ManyArgs = {
  updates: Array<BusinessRole_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Capability_ManyArgs = {
  updates: Array<Capability_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_DataObject_ManyArgs = {
  updates: Array<DataObject_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_DirectoryItemsMap_ManyArgs = {
  updates: Array<DirectoryItemsMap_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_DirectoryObject_ManyArgs = {
  updates: Array<DirectoryObject_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Employee_ManyArgs = {
  updates: Array<Employee_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_EventGeneric_ManyArgs = {
  updates: Array<EventGeneric_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_FlowGeneric_ManyArgs = {
  updates: Array<FlowGeneric_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_FunctionGeneric_ManyArgs = {
  updates: Array<FunctionGeneric_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_InterfaceGeneric_ManyArgs = {
  updates: Array<InterfaceGeneric_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_MotivationElementGeneric_ManyArgs = {
  updates: Array<MotivationElementGeneric_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_PhysicalLocation_ManyArgs = {
  updates: Array<PhysicalLocation_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_SolutionApplicationComponentMap_ManyArgs = {
  updates: Array<SolutionApplicationComponentMap_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_SolutionConstraintMap_ManyArgs = {
  updates: Array<SolutionConstraintMap_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Solution_ManyArgs = {
  updates: Array<Solution_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Stakeholder_ManyArgs = {
  updates: Array<Stakeholder_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_SystemSoftware_ManyArgs = {
  updates: Array<SystemSoftware_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_TechnologyNetworkHierarchyMap_ManyArgs = {
  updates: Array<TechnologyNetworkHierarchyMap_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_TechnologyNetwork_ManyArgs = {
  updates: Array<TechnologyNetwork_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_TechnologyNodeHierarchyMap_ManyArgs = {
  updates: Array<TechnologyNodeHierarchyMap_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_TechnologyNodeSystemSoftwareMap_ManyArgs = {
  updates: Array<TechnologyNodeSystemSoftwareMap_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_TechnologyNode_ManyArgs = {
  updates: Array<TechnologyNode_Updates>;
};

/** Boolean expression to compare columns of type "network_abstraction_level_enum". All fields are combined with logical 'AND'. */
export type Network_Abstraction_Level_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['network_abstraction_level_enum']['input']>;
  _gt?: InputMaybe<Scalars['network_abstraction_level_enum']['input']>;
  _gte?: InputMaybe<Scalars['network_abstraction_level_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['network_abstraction_level_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['network_abstraction_level_enum']['input']>;
  _lte?: InputMaybe<Scalars['network_abstraction_level_enum']['input']>;
  _neq?: InputMaybe<Scalars['network_abstraction_level_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['network_abstraction_level_enum']['input']>>;
};

/** Boolean expression to compare columns of type "network_scope_enum". All fields are combined with logical 'AND'. */
export type Network_Scope_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['network_scope_enum']['input']>;
  _gt?: InputMaybe<Scalars['network_scope_enum']['input']>;
  _gte?: InputMaybe<Scalars['network_scope_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['network_scope_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['network_scope_enum']['input']>;
  _lte?: InputMaybe<Scalars['network_scope_enum']['input']>;
  _neq?: InputMaybe<Scalars['network_scope_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['network_scope_enum']['input']>>;
};

/** Boolean expression to compare columns of type "node_kind_enum". All fields are combined with logical 'AND'. */
export type Node_Kind_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['node_kind_enum']['input']>;
  _gt?: InputMaybe<Scalars['node_kind_enum']['input']>;
  _gte?: InputMaybe<Scalars['node_kind_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['node_kind_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['node_kind_enum']['input']>;
  _lte?: InputMaybe<Scalars['node_kind_enum']['input']>;
  _neq?: InputMaybe<Scalars['node_kind_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['node_kind_enum']['input']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "components" */
  ApplicationComponent: Array<ApplicationComponent>;
  /** fetch aggregated fields from the table: "components" */
  ApplicationComponentAggregate: ApplicationComponent_Aggregate;
  /** fetch data from the table: "components" using primary key columns */
  ApplicationComponentByPk?: Maybe<ApplicationComponent>;
  /** fetch data from the table: "map_application_component_data_object" */
  ApplicationComponentDataObjectMap: Array<ApplicationComponentDataObjectMap>;
  /** fetch aggregated fields from the table: "map_application_component_data_object" */
  ApplicationComponentDataObjectMapAggregate: ApplicationComponentDataObjectMap_Aggregate;
  /** fetch data from the table: "map_application_component_data_object" using primary key columns */
  ApplicationComponentDataObjectMapByPk?: Maybe<ApplicationComponentDataObjectMap>;
  /** fetch data from the table: "map_application_component_event" */
  ApplicationComponentEventMap: Array<ApplicationComponentEventMap>;
  /** fetch aggregated fields from the table: "map_application_component_event" */
  ApplicationComponentEventMapAggregate: ApplicationComponentEventMap_Aggregate;
  /** fetch data from the table: "map_application_component_event" using primary key columns */
  ApplicationComponentEventMapByPk?: Maybe<ApplicationComponentEventMap>;
  /** fetch data from the table: "map_application_component_function" */
  ApplicationComponentFunctionMap: Array<ApplicationComponentFunctionMap>;
  /** fetch aggregated fields from the table: "map_application_component_function" */
  ApplicationComponentFunctionMapAggregate: ApplicationComponentFunctionMap_Aggregate;
  /** fetch data from the table: "map_application_component_function" using primary key columns */
  ApplicationComponentFunctionMapByPk?: Maybe<ApplicationComponentFunctionMap>;
  /** fetch data from the table: "map_application_component_hierarchy" */
  ApplicationComponentHierarchyMap: Array<ApplicationComponentHierarchyMap>;
  /** fetch aggregated fields from the table: "map_application_component_hierarchy" */
  ApplicationComponentHierarchyMapAggregate: ApplicationComponentHierarchyMap_Aggregate;
  /** fetch data from the table: "map_application_component_hierarchy" using primary key columns */
  ApplicationComponentHierarchyMapByPk?: Maybe<ApplicationComponentHierarchyMap>;
  /** fetch data from the table: "map_application_component_interface" */
  ApplicationComponentInterfaceMap: Array<ApplicationComponentInterfaceMap>;
  /** fetch aggregated fields from the table: "map_application_component_interface" */
  ApplicationComponentInterfaceMapAggregate: ApplicationComponentInterfaceMap_Aggregate;
  /** fetch data from the table: "map_application_component_interface" using primary key columns */
  ApplicationComponentInterfaceMapByPk?: Maybe<ApplicationComponentInterfaceMap>;
  /** fetch data from the table: "map_application_component_product" */
  ApplicationComponentProductMap: Array<ApplicationComponentProductMap>;
  /** fetch aggregated fields from the table: "map_application_component_product" */
  ApplicationComponentProductMapAggregate: ApplicationComponentProductMap_Aggregate;
  /** fetch data from the table: "map_application_component_product" using primary key columns */
  ApplicationComponentProductMapByPk?: Maybe<ApplicationComponentProductMap>;
  /** fetch data from the table: "map_application_component_stakeholder" */
  ApplicationComponentStakeholderMap: Array<ApplicationComponentStakeholderMap>;
  /** fetch aggregated fields from the table: "map_application_component_stakeholder" */
  ApplicationComponentStakeholderMapAggregate: ApplicationComponentStakeholderMap_Aggregate;
  /** fetch data from the table: "map_application_component_stakeholder" using primary key columns */
  ApplicationComponentStakeholderMapByPk?: Maybe<ApplicationComponentStakeholderMap>;
  /** fetch data from the table: "map_application_component_system_software" */
  ApplicationComponentSystemSoftwareMap: Array<ApplicationComponentSystemSoftwareMap>;
  /** fetch aggregated fields from the table: "map_application_component_system_software" */
  ApplicationComponentSystemSoftwareMapAggregate: ApplicationComponentSystemSoftwareMap_Aggregate;
  /** fetch data from the table: "map_application_component_system_software" using primary key columns */
  ApplicationComponentSystemSoftwareMapByPk?: Maybe<ApplicationComponentSystemSoftwareMap>;
  /** fetch data from the table: "map_application_component_technology_logical_network" */
  ApplicationComponentTechnologyLogicalNetworkMap: Array<ApplicationComponentTechnologyLogicalNetworkMap>;
  /** fetch aggregated fields from the table: "map_application_component_technology_logical_network" */
  ApplicationComponentTechnologyLogicalNetworkMapAggregate: ApplicationComponentTechnologyLogicalNetworkMap_Aggregate;
  /** fetch data from the table: "map_application_component_technology_logical_network" using primary key columns */
  ApplicationComponentTechnologyLogicalNetworkMapByPk?: Maybe<ApplicationComponentTechnologyLogicalNetworkMap>;
  /** fetch data from the table: "map_application_component_technology_node" */
  ApplicationComponentTechnologyNodeMap: Array<ApplicationComponentTechnologyNodeMap>;
  /** fetch aggregated fields from the table: "map_application_component_technology_node" */
  ApplicationComponentTechnologyNodeMapAggregate: ApplicationComponentTechnologyNodeMap_Aggregate;
  /** fetch data from the table: "map_application_component_technology_node" using primary key columns */
  ApplicationComponentTechnologyNodeMapByPk?: Maybe<ApplicationComponentTechnologyNodeMap>;
  /** fetch data from the table: "map_application_function_data_object" */
  ApplicationFunctionDataObjectMap: Array<ApplicationFunctionDataObjectMap>;
  /** fetch aggregated fields from the table: "map_application_function_data_object" */
  ApplicationFunctionDataObjectMapAggregate: ApplicationFunctionDataObjectMap_Aggregate;
  /** fetch data from the table: "map_application_function_data_object" using primary key columns */
  ApplicationFunctionDataObjectMapByPk?: Maybe<ApplicationFunctionDataObjectMap>;
  /** fetch data from the table: "map_application_interface_function" */
  ApplicationInterfaceFunctionMap: Array<ApplicationInterfaceFunctionMap>;
  /** fetch aggregated fields from the table: "map_application_interface_function" */
  ApplicationInterfaceFunctionMapAggregate: ApplicationInterfaceFunctionMap_Aggregate;
  /** fetch data from the table: "map_application_interface_function" using primary key columns */
  ApplicationInterfaceFunctionMapByPk?: Maybe<ApplicationInterfaceFunctionMap>;
  /** fetch data from the table: "actors" */
  BusinessActor: Array<BusinessActor>;
  /** fetch aggregated fields from the table: "actors" */
  BusinessActorAggregate: BusinessActor_Aggregate;
  /** fetch data from the table: "actors" using primary key columns */
  BusinessActorByPk?: Maybe<BusinessActor>;
  /** fetch data from the table: "map_business_actor_role" */
  BusinessActorRoleMap: Array<BusinessActorRoleMap>;
  /** fetch aggregated fields from the table: "map_business_actor_role" */
  BusinessActorRoleMapAggregate: BusinessActorRoleMap_Aggregate;
  /** fetch data from the table: "map_business_actor_role" using primary key columns */
  BusinessActorRoleMapByPk?: Maybe<BusinessActorRoleMap>;
  /** fetch data from the table: "products" */
  BusinessProduct: Array<BusinessProduct>;
  /** fetch aggregated fields from the table: "products" */
  BusinessProductAggregate: BusinessProduct_Aggregate;
  /** fetch data from the table: "products" using primary key columns */
  BusinessProductByPk?: Maybe<BusinessProduct>;
  /** fetch data from the table: "roles" */
  BusinessRole: Array<BusinessRole>;
  /** fetch aggregated fields from the table: "roles" */
  BusinessRoleAggregate: BusinessRole_Aggregate;
  /** fetch data from the table: "roles" using primary key columns */
  BusinessRoleByPk?: Maybe<BusinessRole>;
  /** fetch data from the table: "capabilities" */
  Capability: Array<Capability>;
  /** fetch aggregated fields from the table: "capabilities" */
  CapabilityAggregate: Capability_Aggregate;
  /** fetch data from the table: "capabilities" using primary key columns */
  CapabilityByPk?: Maybe<Capability>;
  /** fetch data from the table: "data_objects" */
  DataObject: Array<DataObject>;
  /** fetch aggregated fields from the table: "data_objects" */
  DataObjectAggregate: DataObject_Aggregate;
  /** fetch data from the table: "data_objects" using primary key columns */
  DataObjectByPk?: Maybe<DataObject>;
  /** fetch data from the table: "map_directory_items" */
  DirectoryItemsMap: Array<DirectoryItemsMap>;
  /** fetch aggregated fields from the table: "map_directory_items" */
  DirectoryItemsMapAggregate: DirectoryItemsMap_Aggregate;
  /** fetch data from the table: "map_directory_items" using primary key columns */
  DirectoryItemsMapByPk?: Maybe<DirectoryItemsMap>;
  /** fetch data from the table: "directories" */
  DirectoryObject: Array<DirectoryObject>;
  /** fetch aggregated fields from the table: "directories" */
  DirectoryObjectAggregate: DirectoryObject_Aggregate;
  /** fetch data from the table: "directories" using primary key columns */
  DirectoryObjectByPk?: Maybe<DirectoryObject>;
  /** fetch data from the table: "employees" */
  Employee: Array<Employee>;
  /** fetch aggregated fields from the table: "employees" */
  EmployeeAggregate: Employee_Aggregate;
  /** fetch data from the table: "employees" using primary key columns */
  EmployeeByPk?: Maybe<Employee>;
  /** fetch data from the table: "events" */
  EventGeneric: Array<EventGeneric>;
  /** fetch aggregated fields from the table: "events" */
  EventGenericAggregate: EventGeneric_Aggregate;
  /** fetch data from the table: "events" using primary key columns */
  EventGenericByPk?: Maybe<EventGeneric>;
  /** fetch data from the table: "flows" */
  FlowGeneric: Array<FlowGeneric>;
  /** fetch aggregated fields from the table: "flows" */
  FlowGenericAggregate: FlowGeneric_Aggregate;
  /** fetch data from the table: "flows" using primary key columns */
  FlowGenericByPk?: Maybe<FlowGeneric>;
  /** fetch data from the table: "functions" */
  FunctionGeneric: Array<FunctionGeneric>;
  /** fetch aggregated fields from the table: "functions" */
  FunctionGenericAggregate: FunctionGeneric_Aggregate;
  /** fetch data from the table: "functions" using primary key columns */
  FunctionGenericByPk?: Maybe<FunctionGeneric>;
  /** fetch data from the table: "interfaces" */
  InterfaceGeneric: Array<InterfaceGeneric>;
  /** fetch aggregated fields from the table: "interfaces" */
  InterfaceGenericAggregate: InterfaceGeneric_Aggregate;
  /** fetch data from the table: "interfaces" using primary key columns */
  InterfaceGenericByPk?: Maybe<InterfaceGeneric>;
  /** fetch data from the table: "motivations" */
  MotivationElementGeneric: Array<MotivationElementGeneric>;
  /** fetch aggregated fields from the table: "motivations" */
  MotivationElementGenericAggregate: MotivationElementGeneric_Aggregate;
  /** fetch data from the table: "motivations" using primary key columns */
  MotivationElementGenericByPk?: Maybe<MotivationElementGeneric>;
  /** fetch data from the table: "locations" */
  PhysicalLocation: Array<PhysicalLocation>;
  /** fetch aggregated fields from the table: "locations" */
  PhysicalLocationAggregate: PhysicalLocation_Aggregate;
  /** fetch data from the table: "locations" using primary key columns */
  PhysicalLocationByPk?: Maybe<PhysicalLocation>;
  /** fetch data from the table: "solutions" */
  Solution: Array<Solution>;
  /** fetch aggregated fields from the table: "solutions" */
  SolutionAggregate: Solution_Aggregate;
  /** fetch data from the table: "map_solution_application_component" */
  SolutionApplicationComponentMap: Array<SolutionApplicationComponentMap>;
  /** fetch aggregated fields from the table: "map_solution_application_component" */
  SolutionApplicationComponentMapAggregate: SolutionApplicationComponentMap_Aggregate;
  /** fetch data from the table: "map_solution_application_component" using primary key columns */
  SolutionApplicationComponentMapByPk?: Maybe<SolutionApplicationComponentMap>;
  /** fetch data from the table: "solutions" using primary key columns */
  SolutionByPk?: Maybe<Solution>;
  /** fetch data from the table: "map_solution_constraint" */
  SolutionConstraintMap: Array<SolutionConstraintMap>;
  /** fetch aggregated fields from the table: "map_solution_constraint" */
  SolutionConstraintMapAggregate: SolutionConstraintMap_Aggregate;
  /** fetch data from the table: "map_solution_constraint" using primary key columns */
  SolutionConstraintMapByPk?: Maybe<SolutionConstraintMap>;
  /** fetch data from the table: "stakeholders" */
  Stakeholder: Array<Stakeholder>;
  /** fetch aggregated fields from the table: "stakeholders" */
  StakeholderAggregate: Stakeholder_Aggregate;
  /** fetch data from the table: "stakeholders" using primary key columns */
  StakeholderByPk?: Maybe<Stakeholder>;
  /** fetch data from the table: "system_software" */
  SystemSoftware: Array<SystemSoftware>;
  /** fetch aggregated fields from the table: "system_software" */
  SystemSoftwareAggregate: SystemSoftware_Aggregate;
  /** fetch data from the table: "system_software" using primary key columns */
  SystemSoftwareByPk?: Maybe<SystemSoftware>;
  /** fetch data from the table: "technology_networks" */
  TechnologyNetwork: Array<TechnologyNetwork>;
  /** fetch aggregated fields from the table: "technology_networks" */
  TechnologyNetworkAggregate: TechnologyNetwork_Aggregate;
  /** fetch data from the table: "technology_networks" using primary key columns */
  TechnologyNetworkByPk?: Maybe<TechnologyNetwork>;
  /** fetch data from the table: "map_technology_network_hierarchy" */
  TechnologyNetworkHierarchyMap: Array<TechnologyNetworkHierarchyMap>;
  /** fetch aggregated fields from the table: "map_technology_network_hierarchy" */
  TechnologyNetworkHierarchyMapAggregate: TechnologyNetworkHierarchyMap_Aggregate;
  /** fetch data from the table: "map_technology_network_hierarchy" using primary key columns */
  TechnologyNetworkHierarchyMapByPk?: Maybe<TechnologyNetworkHierarchyMap>;
  /** fetch data from the table: "technology_nodes" */
  TechnologyNode: Array<TechnologyNode>;
  /** fetch aggregated fields from the table: "technology_nodes" */
  TechnologyNodeAggregate: TechnologyNode_Aggregate;
  /** fetch data from the table: "technology_nodes" using primary key columns */
  TechnologyNodeByPk?: Maybe<TechnologyNode>;
  /** fetch data from the table: "map_technology_node_hierarchy" */
  TechnologyNodeHierarchyMap: Array<TechnologyNodeHierarchyMap>;
  /** fetch aggregated fields from the table: "map_technology_node_hierarchy" */
  TechnologyNodeHierarchyMapAggregate: TechnologyNodeHierarchyMap_Aggregate;
  /** fetch data from the table: "map_technology_node_hierarchy" using primary key columns */
  TechnologyNodeHierarchyMapByPk?: Maybe<TechnologyNodeHierarchyMap>;
  /** fetch data from the table: "map_technology_node_system_software" */
  TechnologyNodeSystemSoftwareMap: Array<TechnologyNodeSystemSoftwareMap>;
  /** fetch aggregated fields from the table: "map_technology_node_system_software" */
  TechnologyNodeSystemSoftwareMapAggregate: TechnologyNodeSystemSoftwareMap_Aggregate;
  /** fetch data from the table: "map_technology_node_system_software" using primary key columns */
  TechnologyNodeSystemSoftwareMapByPk?: Maybe<TechnologyNodeSystemSoftwareMap>;
};


export type Query_RootApplicationComponentArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponent_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponent_Order_By>>;
  where?: InputMaybe<ApplicationComponent_Bool_Exp>;
};


export type Query_RootApplicationComponentAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponent_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponent_Order_By>>;
  where?: InputMaybe<ApplicationComponent_Bool_Exp>;
};


export type Query_RootApplicationComponentByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootApplicationComponentDataObjectMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentDataObjectMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentDataObjectMap_Bool_Exp>;
};


export type Query_RootApplicationComponentDataObjectMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentDataObjectMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentDataObjectMap_Bool_Exp>;
};


export type Query_RootApplicationComponentDataObjectMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  dataObjectId: Scalars['uuid']['input'];
};


export type Query_RootApplicationComponentEventMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentEventMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentEventMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentEventMap_Bool_Exp>;
};


export type Query_RootApplicationComponentEventMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentEventMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentEventMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentEventMap_Bool_Exp>;
};


export type Query_RootApplicationComponentEventMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  eventId: Scalars['uuid']['input'];
};


export type Query_RootApplicationComponentFunctionMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentFunctionMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentFunctionMap_Bool_Exp>;
};


export type Query_RootApplicationComponentFunctionMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentFunctionMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentFunctionMap_Bool_Exp>;
};


export type Query_RootApplicationComponentFunctionMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  functionId: Scalars['uuid']['input'];
};


export type Query_RootApplicationComponentHierarchyMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentHierarchyMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentHierarchyMap_Bool_Exp>;
};


export type Query_RootApplicationComponentHierarchyMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentHierarchyMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentHierarchyMap_Bool_Exp>;
};


export type Query_RootApplicationComponentHierarchyMapByPkArgs = {
  componentChildId: Scalars['uuid']['input'];
  componentParentId: Scalars['uuid']['input'];
};


export type Query_RootApplicationComponentInterfaceMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentInterfaceMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentInterfaceMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentInterfaceMap_Bool_Exp>;
};


export type Query_RootApplicationComponentInterfaceMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentInterfaceMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentInterfaceMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentInterfaceMap_Bool_Exp>;
};


export type Query_RootApplicationComponentInterfaceMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  interfaceId: Scalars['uuid']['input'];
};


export type Query_RootApplicationComponentProductMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentProductMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentProductMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentProductMap_Bool_Exp>;
};


export type Query_RootApplicationComponentProductMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentProductMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentProductMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentProductMap_Bool_Exp>;
};


export type Query_RootApplicationComponentProductMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  productId: Scalars['uuid']['input'];
};


export type Query_RootApplicationComponentStakeholderMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentStakeholderMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentStakeholderMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentStakeholderMap_Bool_Exp>;
};


export type Query_RootApplicationComponentStakeholderMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentStakeholderMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentStakeholderMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentStakeholderMap_Bool_Exp>;
};


export type Query_RootApplicationComponentStakeholderMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  roleId: Scalars['uuid']['input'];
  stakeholderId: Scalars['uuid']['input'];
};


export type Query_RootApplicationComponentSystemSoftwareMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentSystemSoftwareMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentSystemSoftwareMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentSystemSoftwareMap_Bool_Exp>;
};


export type Query_RootApplicationComponentSystemSoftwareMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentSystemSoftwareMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentSystemSoftwareMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentSystemSoftwareMap_Bool_Exp>;
};


export type Query_RootApplicationComponentSystemSoftwareMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  systemSoftwareId: Scalars['uuid']['input'];
};


export type Query_RootApplicationComponentTechnologyLogicalNetworkMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentTechnologyLogicalNetworkMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentTechnologyLogicalNetworkMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_Bool_Exp>;
};


export type Query_RootApplicationComponentTechnologyLogicalNetworkMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentTechnologyLogicalNetworkMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentTechnologyLogicalNetworkMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_Bool_Exp>;
};


export type Query_RootApplicationComponentTechnologyLogicalNetworkMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  logicalNetworkId: Scalars['uuid']['input'];
};


export type Query_RootApplicationComponentTechnologyNodeMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentTechnologyNodeMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentTechnologyNodeMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentTechnologyNodeMap_Bool_Exp>;
};


export type Query_RootApplicationComponentTechnologyNodeMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentTechnologyNodeMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentTechnologyNodeMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentTechnologyNodeMap_Bool_Exp>;
};


export type Query_RootApplicationComponentTechnologyNodeMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  nodeId: Scalars['uuid']['input'];
};


export type Query_RootApplicationFunctionDataObjectMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Order_By>>;
  where?: InputMaybe<ApplicationFunctionDataObjectMap_Bool_Exp>;
};


export type Query_RootApplicationFunctionDataObjectMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Order_By>>;
  where?: InputMaybe<ApplicationFunctionDataObjectMap_Bool_Exp>;
};


export type Query_RootApplicationFunctionDataObjectMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  dataObjectId: Scalars['uuid']['input'];
  functionId: Scalars['uuid']['input'];
};


export type Query_RootApplicationInterfaceFunctionMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationInterfaceFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationInterfaceFunctionMap_Order_By>>;
  where?: InputMaybe<ApplicationInterfaceFunctionMap_Bool_Exp>;
};


export type Query_RootApplicationInterfaceFunctionMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationInterfaceFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationInterfaceFunctionMap_Order_By>>;
  where?: InputMaybe<ApplicationInterfaceFunctionMap_Bool_Exp>;
};


export type Query_RootApplicationInterfaceFunctionMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  functionId: Scalars['uuid']['input'];
  interfaceId: Scalars['uuid']['input'];
};


export type Query_RootBusinessActorArgs = {
  distinct_on?: InputMaybe<Array<BusinessActor_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessActor_Order_By>>;
  where?: InputMaybe<BusinessActor_Bool_Exp>;
};


export type Query_RootBusinessActorAggregateArgs = {
  distinct_on?: InputMaybe<Array<BusinessActor_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessActor_Order_By>>;
  where?: InputMaybe<BusinessActor_Bool_Exp>;
};


export type Query_RootBusinessActorByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootBusinessActorRoleMapArgs = {
  distinct_on?: InputMaybe<Array<BusinessActorRoleMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessActorRoleMap_Order_By>>;
  where?: InputMaybe<BusinessActorRoleMap_Bool_Exp>;
};


export type Query_RootBusinessActorRoleMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<BusinessActorRoleMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessActorRoleMap_Order_By>>;
  where?: InputMaybe<BusinessActorRoleMap_Bool_Exp>;
};


export type Query_RootBusinessActorRoleMapByPkArgs = {
  actorId: Scalars['uuid']['input'];
  roleId: Scalars['uuid']['input'];
};


export type Query_RootBusinessProductArgs = {
  distinct_on?: InputMaybe<Array<BusinessProduct_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProduct_Order_By>>;
  where?: InputMaybe<BusinessProduct_Bool_Exp>;
};


export type Query_RootBusinessProductAggregateArgs = {
  distinct_on?: InputMaybe<Array<BusinessProduct_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProduct_Order_By>>;
  where?: InputMaybe<BusinessProduct_Bool_Exp>;
};


export type Query_RootBusinessProductByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootBusinessRoleArgs = {
  distinct_on?: InputMaybe<Array<BusinessRole_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessRole_Order_By>>;
  where?: InputMaybe<BusinessRole_Bool_Exp>;
};


export type Query_RootBusinessRoleAggregateArgs = {
  distinct_on?: InputMaybe<Array<BusinessRole_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessRole_Order_By>>;
  where?: InputMaybe<BusinessRole_Bool_Exp>;
};


export type Query_RootBusinessRoleByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootCapabilityArgs = {
  distinct_on?: InputMaybe<Array<Capability_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Capability_Order_By>>;
  where?: InputMaybe<Capability_Bool_Exp>;
};


export type Query_RootCapabilityAggregateArgs = {
  distinct_on?: InputMaybe<Array<Capability_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Capability_Order_By>>;
  where?: InputMaybe<Capability_Bool_Exp>;
};


export type Query_RootCapabilityByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootDataObjectArgs = {
  distinct_on?: InputMaybe<Array<DataObject_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<DataObject_Order_By>>;
  where?: InputMaybe<DataObject_Bool_Exp>;
};


export type Query_RootDataObjectAggregateArgs = {
  distinct_on?: InputMaybe<Array<DataObject_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<DataObject_Order_By>>;
  where?: InputMaybe<DataObject_Bool_Exp>;
};


export type Query_RootDataObjectByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootDirectoryItemsMapArgs = {
  distinct_on?: InputMaybe<Array<DirectoryItemsMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<DirectoryItemsMap_Order_By>>;
  where?: InputMaybe<DirectoryItemsMap_Bool_Exp>;
};


export type Query_RootDirectoryItemsMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<DirectoryItemsMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<DirectoryItemsMap_Order_By>>;
  where?: InputMaybe<DirectoryItemsMap_Bool_Exp>;
};


export type Query_RootDirectoryItemsMapByPkArgs = {
  sourceId: Scalars['uuid']['input'];
  targetId: Scalars['uuid']['input'];
};


export type Query_RootDirectoryObjectArgs = {
  distinct_on?: InputMaybe<Array<DirectoryObject_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<DirectoryObject_Order_By>>;
  where?: InputMaybe<DirectoryObject_Bool_Exp>;
};


export type Query_RootDirectoryObjectAggregateArgs = {
  distinct_on?: InputMaybe<Array<DirectoryObject_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<DirectoryObject_Order_By>>;
  where?: InputMaybe<DirectoryObject_Bool_Exp>;
};


export type Query_RootDirectoryObjectByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootEmployeeArgs = {
  distinct_on?: InputMaybe<Array<Employee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Employee_Order_By>>;
  where?: InputMaybe<Employee_Bool_Exp>;
};


export type Query_RootEmployeeAggregateArgs = {
  distinct_on?: InputMaybe<Array<Employee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Employee_Order_By>>;
  where?: InputMaybe<Employee_Bool_Exp>;
};


export type Query_RootEmployeeByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootEventGenericArgs = {
  distinct_on?: InputMaybe<Array<EventGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<EventGeneric_Order_By>>;
  where?: InputMaybe<EventGeneric_Bool_Exp>;
};


export type Query_RootEventGenericAggregateArgs = {
  distinct_on?: InputMaybe<Array<EventGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<EventGeneric_Order_By>>;
  where?: InputMaybe<EventGeneric_Bool_Exp>;
};


export type Query_RootEventGenericByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootFlowGenericArgs = {
  distinct_on?: InputMaybe<Array<FlowGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<FlowGeneric_Order_By>>;
  where?: InputMaybe<FlowGeneric_Bool_Exp>;
};


export type Query_RootFlowGenericAggregateArgs = {
  distinct_on?: InputMaybe<Array<FlowGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<FlowGeneric_Order_By>>;
  where?: InputMaybe<FlowGeneric_Bool_Exp>;
};


export type Query_RootFlowGenericByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootFunctionGenericArgs = {
  distinct_on?: InputMaybe<Array<FunctionGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<FunctionGeneric_Order_By>>;
  where?: InputMaybe<FunctionGeneric_Bool_Exp>;
};


export type Query_RootFunctionGenericAggregateArgs = {
  distinct_on?: InputMaybe<Array<FunctionGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<FunctionGeneric_Order_By>>;
  where?: InputMaybe<FunctionGeneric_Bool_Exp>;
};


export type Query_RootFunctionGenericByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootInterfaceGenericArgs = {
  distinct_on?: InputMaybe<Array<InterfaceGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<InterfaceGeneric_Order_By>>;
  where?: InputMaybe<InterfaceGeneric_Bool_Exp>;
};


export type Query_RootInterfaceGenericAggregateArgs = {
  distinct_on?: InputMaybe<Array<InterfaceGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<InterfaceGeneric_Order_By>>;
  where?: InputMaybe<InterfaceGeneric_Bool_Exp>;
};


export type Query_RootInterfaceGenericByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootMotivationElementGenericArgs = {
  distinct_on?: InputMaybe<Array<MotivationElementGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MotivationElementGeneric_Order_By>>;
  where?: InputMaybe<MotivationElementGeneric_Bool_Exp>;
};


export type Query_RootMotivationElementGenericAggregateArgs = {
  distinct_on?: InputMaybe<Array<MotivationElementGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MotivationElementGeneric_Order_By>>;
  where?: InputMaybe<MotivationElementGeneric_Bool_Exp>;
};


export type Query_RootMotivationElementGenericByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootPhysicalLocationArgs = {
  distinct_on?: InputMaybe<Array<PhysicalLocation_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<PhysicalLocation_Order_By>>;
  where?: InputMaybe<PhysicalLocation_Bool_Exp>;
};


export type Query_RootPhysicalLocationAggregateArgs = {
  distinct_on?: InputMaybe<Array<PhysicalLocation_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<PhysicalLocation_Order_By>>;
  where?: InputMaybe<PhysicalLocation_Bool_Exp>;
};


export type Query_RootPhysicalLocationByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootSolutionArgs = {
  distinct_on?: InputMaybe<Array<Solution_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Solution_Order_By>>;
  where?: InputMaybe<Solution_Bool_Exp>;
};


export type Query_RootSolutionAggregateArgs = {
  distinct_on?: InputMaybe<Array<Solution_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Solution_Order_By>>;
  where?: InputMaybe<Solution_Bool_Exp>;
};


export type Query_RootSolutionApplicationComponentMapArgs = {
  distinct_on?: InputMaybe<Array<SolutionApplicationComponentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionApplicationComponentMap_Order_By>>;
  where?: InputMaybe<SolutionApplicationComponentMap_Bool_Exp>;
};


export type Query_RootSolutionApplicationComponentMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionApplicationComponentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionApplicationComponentMap_Order_By>>;
  where?: InputMaybe<SolutionApplicationComponentMap_Bool_Exp>;
};


export type Query_RootSolutionApplicationComponentMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};


export type Query_RootSolutionByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootSolutionConstraintMapArgs = {
  distinct_on?: InputMaybe<Array<SolutionConstraintMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionConstraintMap_Order_By>>;
  where?: InputMaybe<SolutionConstraintMap_Bool_Exp>;
};


export type Query_RootSolutionConstraintMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionConstraintMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionConstraintMap_Order_By>>;
  where?: InputMaybe<SolutionConstraintMap_Bool_Exp>;
};


export type Query_RootSolutionConstraintMapByPkArgs = {
  constraintId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};


export type Query_RootStakeholderArgs = {
  distinct_on?: InputMaybe<Array<Stakeholder_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Stakeholder_Order_By>>;
  where?: InputMaybe<Stakeholder_Bool_Exp>;
};


export type Query_RootStakeholderAggregateArgs = {
  distinct_on?: InputMaybe<Array<Stakeholder_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Stakeholder_Order_By>>;
  where?: InputMaybe<Stakeholder_Bool_Exp>;
};


export type Query_RootStakeholderByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootSystemSoftwareArgs = {
  distinct_on?: InputMaybe<Array<SystemSoftware_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SystemSoftware_Order_By>>;
  where?: InputMaybe<SystemSoftware_Bool_Exp>;
};


export type Query_RootSystemSoftwareAggregateArgs = {
  distinct_on?: InputMaybe<Array<SystemSoftware_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SystemSoftware_Order_By>>;
  where?: InputMaybe<SystemSoftware_Bool_Exp>;
};


export type Query_RootSystemSoftwareByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootTechnologyNetworkArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNetwork_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNetwork_Order_By>>;
  where?: InputMaybe<TechnologyNetwork_Bool_Exp>;
};


export type Query_RootTechnologyNetworkAggregateArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNetwork_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNetwork_Order_By>>;
  where?: InputMaybe<TechnologyNetwork_Bool_Exp>;
};


export type Query_RootTechnologyNetworkByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootTechnologyNetworkHierarchyMapArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNetworkHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNetworkHierarchyMap_Order_By>>;
  where?: InputMaybe<TechnologyNetworkHierarchyMap_Bool_Exp>;
};


export type Query_RootTechnologyNetworkHierarchyMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNetworkHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNetworkHierarchyMap_Order_By>>;
  where?: InputMaybe<TechnologyNetworkHierarchyMap_Bool_Exp>;
};


export type Query_RootTechnologyNetworkHierarchyMapByPkArgs = {
  networkChildId: Scalars['uuid']['input'];
  networkParentId: Scalars['uuid']['input'];
};


export type Query_RootTechnologyNodeArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNode_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNode_Order_By>>;
  where?: InputMaybe<TechnologyNode_Bool_Exp>;
};


export type Query_RootTechnologyNodeAggregateArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNode_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNode_Order_By>>;
  where?: InputMaybe<TechnologyNode_Bool_Exp>;
};


export type Query_RootTechnologyNodeByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootTechnologyNodeHierarchyMapArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNodeHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNodeHierarchyMap_Order_By>>;
  where?: InputMaybe<TechnologyNodeHierarchyMap_Bool_Exp>;
};


export type Query_RootTechnologyNodeHierarchyMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNodeHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNodeHierarchyMap_Order_By>>;
  where?: InputMaybe<TechnologyNodeHierarchyMap_Bool_Exp>;
};


export type Query_RootTechnologyNodeHierarchyMapByPkArgs = {
  nodeChildId: Scalars['uuid']['input'];
  nodeParentId: Scalars['uuid']['input'];
};


export type Query_RootTechnologyNodeSystemSoftwareMapArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNodeSystemSoftwareMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNodeSystemSoftwareMap_Order_By>>;
  where?: InputMaybe<TechnologyNodeSystemSoftwareMap_Bool_Exp>;
};


export type Query_RootTechnologyNodeSystemSoftwareMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNodeSystemSoftwareMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNodeSystemSoftwareMap_Order_By>>;
  where?: InputMaybe<TechnologyNodeSystemSoftwareMap_Bool_Exp>;
};


export type Query_RootTechnologyNodeSystemSoftwareMapByPkArgs = {
  nodeId: Scalars['uuid']['input'];
  systemSoftwareId: Scalars['uuid']['input'];
};

/** Boolean expression to compare columns of type "risk_category_enum". All fields are combined with logical 'AND'. */
export type Risk_Category_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['risk_category_enum']['input']>;
  _gt?: InputMaybe<Scalars['risk_category_enum']['input']>;
  _gte?: InputMaybe<Scalars['risk_category_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['risk_category_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['risk_category_enum']['input']>;
  _lte?: InputMaybe<Scalars['risk_category_enum']['input']>;
  _neq?: InputMaybe<Scalars['risk_category_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['risk_category_enum']['input']>>;
};

/** Boolean expression to compare columns of type "risk_status_enum". All fields are combined with logical 'AND'. */
export type Risk_Status_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['risk_status_enum']['input']>;
  _gt?: InputMaybe<Scalars['risk_status_enum']['input']>;
  _gte?: InputMaybe<Scalars['risk_status_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['risk_status_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['risk_status_enum']['input']>;
  _lte?: InputMaybe<Scalars['risk_status_enum']['input']>;
  _neq?: InputMaybe<Scalars['risk_status_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['risk_status_enum']['input']>>;
};

/** Boolean expression to compare columns of type "smallint". All fields are combined with logical 'AND'. */
export type Smallint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['smallint']['input']>;
  _gt?: InputMaybe<Scalars['smallint']['input']>;
  _gte?: InputMaybe<Scalars['smallint']['input']>;
  _in?: InputMaybe<Array<Scalars['smallint']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['smallint']['input']>;
  _lte?: InputMaybe<Scalars['smallint']['input']>;
  _neq?: InputMaybe<Scalars['smallint']['input']>;
  _nin?: InputMaybe<Array<Scalars['smallint']['input']>>;
};

/** Boolean expression to compare columns of type "solution_item_state". All fields are combined with logical 'AND'. */
export type Solution_Item_State_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['solution_item_state']['input']>;
  _gt?: InputMaybe<Scalars['solution_item_state']['input']>;
  _gte?: InputMaybe<Scalars['solution_item_state']['input']>;
  _in?: InputMaybe<Array<Scalars['solution_item_state']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['solution_item_state']['input']>;
  _lte?: InputMaybe<Scalars['solution_item_state']['input']>;
  _neq?: InputMaybe<Scalars['solution_item_state']['input']>;
  _nin?: InputMaybe<Array<Scalars['solution_item_state']['input']>>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "components" */
  ApplicationComponent: Array<ApplicationComponent>;
  /** fetch aggregated fields from the table: "components" */
  ApplicationComponentAggregate: ApplicationComponent_Aggregate;
  /** fetch data from the table: "components" using primary key columns */
  ApplicationComponentByPk?: Maybe<ApplicationComponent>;
  /** fetch data from the table: "map_application_component_data_object" */
  ApplicationComponentDataObjectMap: Array<ApplicationComponentDataObjectMap>;
  /** fetch aggregated fields from the table: "map_application_component_data_object" */
  ApplicationComponentDataObjectMapAggregate: ApplicationComponentDataObjectMap_Aggregate;
  /** fetch data from the table: "map_application_component_data_object" using primary key columns */
  ApplicationComponentDataObjectMapByPk?: Maybe<ApplicationComponentDataObjectMap>;
  /** fetch data from the table in a streaming manner: "map_application_component_data_object" */
  ApplicationComponentDataObjectMap_stream: Array<ApplicationComponentDataObjectMap>;
  /** fetch data from the table: "map_application_component_event" */
  ApplicationComponentEventMap: Array<ApplicationComponentEventMap>;
  /** fetch aggregated fields from the table: "map_application_component_event" */
  ApplicationComponentEventMapAggregate: ApplicationComponentEventMap_Aggregate;
  /** fetch data from the table: "map_application_component_event" using primary key columns */
  ApplicationComponentEventMapByPk?: Maybe<ApplicationComponentEventMap>;
  /** fetch data from the table in a streaming manner: "map_application_component_event" */
  ApplicationComponentEventMap_stream: Array<ApplicationComponentEventMap>;
  /** fetch data from the table: "map_application_component_function" */
  ApplicationComponentFunctionMap: Array<ApplicationComponentFunctionMap>;
  /** fetch aggregated fields from the table: "map_application_component_function" */
  ApplicationComponentFunctionMapAggregate: ApplicationComponentFunctionMap_Aggregate;
  /** fetch data from the table: "map_application_component_function" using primary key columns */
  ApplicationComponentFunctionMapByPk?: Maybe<ApplicationComponentFunctionMap>;
  /** fetch data from the table in a streaming manner: "map_application_component_function" */
  ApplicationComponentFunctionMap_stream: Array<ApplicationComponentFunctionMap>;
  /** fetch data from the table: "map_application_component_hierarchy" */
  ApplicationComponentHierarchyMap: Array<ApplicationComponentHierarchyMap>;
  /** fetch aggregated fields from the table: "map_application_component_hierarchy" */
  ApplicationComponentHierarchyMapAggregate: ApplicationComponentHierarchyMap_Aggregate;
  /** fetch data from the table: "map_application_component_hierarchy" using primary key columns */
  ApplicationComponentHierarchyMapByPk?: Maybe<ApplicationComponentHierarchyMap>;
  /** fetch data from the table in a streaming manner: "map_application_component_hierarchy" */
  ApplicationComponentHierarchyMap_stream: Array<ApplicationComponentHierarchyMap>;
  /** fetch data from the table: "map_application_component_interface" */
  ApplicationComponentInterfaceMap: Array<ApplicationComponentInterfaceMap>;
  /** fetch aggregated fields from the table: "map_application_component_interface" */
  ApplicationComponentInterfaceMapAggregate: ApplicationComponentInterfaceMap_Aggregate;
  /** fetch data from the table: "map_application_component_interface" using primary key columns */
  ApplicationComponentInterfaceMapByPk?: Maybe<ApplicationComponentInterfaceMap>;
  /** fetch data from the table in a streaming manner: "map_application_component_interface" */
  ApplicationComponentInterfaceMap_stream: Array<ApplicationComponentInterfaceMap>;
  /** fetch data from the table: "map_application_component_product" */
  ApplicationComponentProductMap: Array<ApplicationComponentProductMap>;
  /** fetch aggregated fields from the table: "map_application_component_product" */
  ApplicationComponentProductMapAggregate: ApplicationComponentProductMap_Aggregate;
  /** fetch data from the table: "map_application_component_product" using primary key columns */
  ApplicationComponentProductMapByPk?: Maybe<ApplicationComponentProductMap>;
  /** fetch data from the table in a streaming manner: "map_application_component_product" */
  ApplicationComponentProductMap_stream: Array<ApplicationComponentProductMap>;
  /** fetch data from the table: "map_application_component_stakeholder" */
  ApplicationComponentStakeholderMap: Array<ApplicationComponentStakeholderMap>;
  /** fetch aggregated fields from the table: "map_application_component_stakeholder" */
  ApplicationComponentStakeholderMapAggregate: ApplicationComponentStakeholderMap_Aggregate;
  /** fetch data from the table: "map_application_component_stakeholder" using primary key columns */
  ApplicationComponentStakeholderMapByPk?: Maybe<ApplicationComponentStakeholderMap>;
  /** fetch data from the table in a streaming manner: "map_application_component_stakeholder" */
  ApplicationComponentStakeholderMap_stream: Array<ApplicationComponentStakeholderMap>;
  /** fetch data from the table: "map_application_component_system_software" */
  ApplicationComponentSystemSoftwareMap: Array<ApplicationComponentSystemSoftwareMap>;
  /** fetch aggregated fields from the table: "map_application_component_system_software" */
  ApplicationComponentSystemSoftwareMapAggregate: ApplicationComponentSystemSoftwareMap_Aggregate;
  /** fetch data from the table: "map_application_component_system_software" using primary key columns */
  ApplicationComponentSystemSoftwareMapByPk?: Maybe<ApplicationComponentSystemSoftwareMap>;
  /** fetch data from the table in a streaming manner: "map_application_component_system_software" */
  ApplicationComponentSystemSoftwareMap_stream: Array<ApplicationComponentSystemSoftwareMap>;
  /** fetch data from the table: "map_application_component_technology_logical_network" */
  ApplicationComponentTechnologyLogicalNetworkMap: Array<ApplicationComponentTechnologyLogicalNetworkMap>;
  /** fetch aggregated fields from the table: "map_application_component_technology_logical_network" */
  ApplicationComponentTechnologyLogicalNetworkMapAggregate: ApplicationComponentTechnologyLogicalNetworkMap_Aggregate;
  /** fetch data from the table: "map_application_component_technology_logical_network" using primary key columns */
  ApplicationComponentTechnologyLogicalNetworkMapByPk?: Maybe<ApplicationComponentTechnologyLogicalNetworkMap>;
  /** fetch data from the table in a streaming manner: "map_application_component_technology_logical_network" */
  ApplicationComponentTechnologyLogicalNetworkMap_stream: Array<ApplicationComponentTechnologyLogicalNetworkMap>;
  /** fetch data from the table: "map_application_component_technology_node" */
  ApplicationComponentTechnologyNodeMap: Array<ApplicationComponentTechnologyNodeMap>;
  /** fetch aggregated fields from the table: "map_application_component_technology_node" */
  ApplicationComponentTechnologyNodeMapAggregate: ApplicationComponentTechnologyNodeMap_Aggregate;
  /** fetch data from the table: "map_application_component_technology_node" using primary key columns */
  ApplicationComponentTechnologyNodeMapByPk?: Maybe<ApplicationComponentTechnologyNodeMap>;
  /** fetch data from the table in a streaming manner: "map_application_component_technology_node" */
  ApplicationComponentTechnologyNodeMap_stream: Array<ApplicationComponentTechnologyNodeMap>;
  /** fetch data from the table in a streaming manner: "components" */
  ApplicationComponent_stream: Array<ApplicationComponent>;
  /** fetch data from the table: "map_application_function_data_object" */
  ApplicationFunctionDataObjectMap: Array<ApplicationFunctionDataObjectMap>;
  /** fetch aggregated fields from the table: "map_application_function_data_object" */
  ApplicationFunctionDataObjectMapAggregate: ApplicationFunctionDataObjectMap_Aggregate;
  /** fetch data from the table: "map_application_function_data_object" using primary key columns */
  ApplicationFunctionDataObjectMapByPk?: Maybe<ApplicationFunctionDataObjectMap>;
  /** fetch data from the table in a streaming manner: "map_application_function_data_object" */
  ApplicationFunctionDataObjectMap_stream: Array<ApplicationFunctionDataObjectMap>;
  /** fetch data from the table: "map_application_interface_function" */
  ApplicationInterfaceFunctionMap: Array<ApplicationInterfaceFunctionMap>;
  /** fetch aggregated fields from the table: "map_application_interface_function" */
  ApplicationInterfaceFunctionMapAggregate: ApplicationInterfaceFunctionMap_Aggregate;
  /** fetch data from the table: "map_application_interface_function" using primary key columns */
  ApplicationInterfaceFunctionMapByPk?: Maybe<ApplicationInterfaceFunctionMap>;
  /** fetch data from the table in a streaming manner: "map_application_interface_function" */
  ApplicationInterfaceFunctionMap_stream: Array<ApplicationInterfaceFunctionMap>;
  /** fetch data from the table: "actors" */
  BusinessActor: Array<BusinessActor>;
  /** fetch aggregated fields from the table: "actors" */
  BusinessActorAggregate: BusinessActor_Aggregate;
  /** fetch data from the table: "actors" using primary key columns */
  BusinessActorByPk?: Maybe<BusinessActor>;
  /** fetch data from the table: "map_business_actor_role" */
  BusinessActorRoleMap: Array<BusinessActorRoleMap>;
  /** fetch aggregated fields from the table: "map_business_actor_role" */
  BusinessActorRoleMapAggregate: BusinessActorRoleMap_Aggregate;
  /** fetch data from the table: "map_business_actor_role" using primary key columns */
  BusinessActorRoleMapByPk?: Maybe<BusinessActorRoleMap>;
  /** fetch data from the table in a streaming manner: "map_business_actor_role" */
  BusinessActorRoleMap_stream: Array<BusinessActorRoleMap>;
  /** fetch data from the table in a streaming manner: "actors" */
  BusinessActor_stream: Array<BusinessActor>;
  /** fetch data from the table: "products" */
  BusinessProduct: Array<BusinessProduct>;
  /** fetch aggregated fields from the table: "products" */
  BusinessProductAggregate: BusinessProduct_Aggregate;
  /** fetch data from the table: "products" using primary key columns */
  BusinessProductByPk?: Maybe<BusinessProduct>;
  /** fetch data from the table in a streaming manner: "products" */
  BusinessProduct_stream: Array<BusinessProduct>;
  /** fetch data from the table: "roles" */
  BusinessRole: Array<BusinessRole>;
  /** fetch aggregated fields from the table: "roles" */
  BusinessRoleAggregate: BusinessRole_Aggregate;
  /** fetch data from the table: "roles" using primary key columns */
  BusinessRoleByPk?: Maybe<BusinessRole>;
  /** fetch data from the table in a streaming manner: "roles" */
  BusinessRole_stream: Array<BusinessRole>;
  /** fetch data from the table: "capabilities" */
  Capability: Array<Capability>;
  /** fetch aggregated fields from the table: "capabilities" */
  CapabilityAggregate: Capability_Aggregate;
  /** fetch data from the table: "capabilities" using primary key columns */
  CapabilityByPk?: Maybe<Capability>;
  /** fetch data from the table in a streaming manner: "capabilities" */
  Capability_stream: Array<Capability>;
  /** fetch data from the table: "data_objects" */
  DataObject: Array<DataObject>;
  /** fetch aggregated fields from the table: "data_objects" */
  DataObjectAggregate: DataObject_Aggregate;
  /** fetch data from the table: "data_objects" using primary key columns */
  DataObjectByPk?: Maybe<DataObject>;
  /** fetch data from the table in a streaming manner: "data_objects" */
  DataObject_stream: Array<DataObject>;
  /** fetch data from the table: "map_directory_items" */
  DirectoryItemsMap: Array<DirectoryItemsMap>;
  /** fetch aggregated fields from the table: "map_directory_items" */
  DirectoryItemsMapAggregate: DirectoryItemsMap_Aggregate;
  /** fetch data from the table: "map_directory_items" using primary key columns */
  DirectoryItemsMapByPk?: Maybe<DirectoryItemsMap>;
  /** fetch data from the table in a streaming manner: "map_directory_items" */
  DirectoryItemsMap_stream: Array<DirectoryItemsMap>;
  /** fetch data from the table: "directories" */
  DirectoryObject: Array<DirectoryObject>;
  /** fetch aggregated fields from the table: "directories" */
  DirectoryObjectAggregate: DirectoryObject_Aggregate;
  /** fetch data from the table: "directories" using primary key columns */
  DirectoryObjectByPk?: Maybe<DirectoryObject>;
  /** fetch data from the table in a streaming manner: "directories" */
  DirectoryObject_stream: Array<DirectoryObject>;
  /** fetch data from the table: "employees" */
  Employee: Array<Employee>;
  /** fetch aggregated fields from the table: "employees" */
  EmployeeAggregate: Employee_Aggregate;
  /** fetch data from the table: "employees" using primary key columns */
  EmployeeByPk?: Maybe<Employee>;
  /** fetch data from the table in a streaming manner: "employees" */
  Employee_stream: Array<Employee>;
  /** fetch data from the table: "events" */
  EventGeneric: Array<EventGeneric>;
  /** fetch aggregated fields from the table: "events" */
  EventGenericAggregate: EventGeneric_Aggregate;
  /** fetch data from the table: "events" using primary key columns */
  EventGenericByPk?: Maybe<EventGeneric>;
  /** fetch data from the table in a streaming manner: "events" */
  EventGeneric_stream: Array<EventGeneric>;
  /** fetch data from the table: "flows" */
  FlowGeneric: Array<FlowGeneric>;
  /** fetch aggregated fields from the table: "flows" */
  FlowGenericAggregate: FlowGeneric_Aggregate;
  /** fetch data from the table: "flows" using primary key columns */
  FlowGenericByPk?: Maybe<FlowGeneric>;
  /** fetch data from the table in a streaming manner: "flows" */
  FlowGeneric_stream: Array<FlowGeneric>;
  /** fetch data from the table: "functions" */
  FunctionGeneric: Array<FunctionGeneric>;
  /** fetch aggregated fields from the table: "functions" */
  FunctionGenericAggregate: FunctionGeneric_Aggregate;
  /** fetch data from the table: "functions" using primary key columns */
  FunctionGenericByPk?: Maybe<FunctionGeneric>;
  /** fetch data from the table in a streaming manner: "functions" */
  FunctionGeneric_stream: Array<FunctionGeneric>;
  /** fetch data from the table: "interfaces" */
  InterfaceGeneric: Array<InterfaceGeneric>;
  /** fetch aggregated fields from the table: "interfaces" */
  InterfaceGenericAggregate: InterfaceGeneric_Aggregate;
  /** fetch data from the table: "interfaces" using primary key columns */
  InterfaceGenericByPk?: Maybe<InterfaceGeneric>;
  /** fetch data from the table in a streaming manner: "interfaces" */
  InterfaceGeneric_stream: Array<InterfaceGeneric>;
  /** fetch data from the table: "motivations" */
  MotivationElementGeneric: Array<MotivationElementGeneric>;
  /** fetch aggregated fields from the table: "motivations" */
  MotivationElementGenericAggregate: MotivationElementGeneric_Aggregate;
  /** fetch data from the table: "motivations" using primary key columns */
  MotivationElementGenericByPk?: Maybe<MotivationElementGeneric>;
  /** fetch data from the table in a streaming manner: "motivations" */
  MotivationElementGeneric_stream: Array<MotivationElementGeneric>;
  /** fetch data from the table: "locations" */
  PhysicalLocation: Array<PhysicalLocation>;
  /** fetch aggregated fields from the table: "locations" */
  PhysicalLocationAggregate: PhysicalLocation_Aggregate;
  /** fetch data from the table: "locations" using primary key columns */
  PhysicalLocationByPk?: Maybe<PhysicalLocation>;
  /** fetch data from the table in a streaming manner: "locations" */
  PhysicalLocation_stream: Array<PhysicalLocation>;
  /** fetch data from the table: "solutions" */
  Solution: Array<Solution>;
  /** fetch aggregated fields from the table: "solutions" */
  SolutionAggregate: Solution_Aggregate;
  /** fetch data from the table: "map_solution_application_component" */
  SolutionApplicationComponentMap: Array<SolutionApplicationComponentMap>;
  /** fetch aggregated fields from the table: "map_solution_application_component" */
  SolutionApplicationComponentMapAggregate: SolutionApplicationComponentMap_Aggregate;
  /** fetch data from the table: "map_solution_application_component" using primary key columns */
  SolutionApplicationComponentMapByPk?: Maybe<SolutionApplicationComponentMap>;
  /** fetch data from the table in a streaming manner: "map_solution_application_component" */
  SolutionApplicationComponentMap_stream: Array<SolutionApplicationComponentMap>;
  /** fetch data from the table: "solutions" using primary key columns */
  SolutionByPk?: Maybe<Solution>;
  /** fetch data from the table: "map_solution_constraint" */
  SolutionConstraintMap: Array<SolutionConstraintMap>;
  /** fetch aggregated fields from the table: "map_solution_constraint" */
  SolutionConstraintMapAggregate: SolutionConstraintMap_Aggregate;
  /** fetch data from the table: "map_solution_constraint" using primary key columns */
  SolutionConstraintMapByPk?: Maybe<SolutionConstraintMap>;
  /** fetch data from the table in a streaming manner: "map_solution_constraint" */
  SolutionConstraintMap_stream: Array<SolutionConstraintMap>;
  /** fetch data from the table in a streaming manner: "solutions" */
  Solution_stream: Array<Solution>;
  /** fetch data from the table: "stakeholders" */
  Stakeholder: Array<Stakeholder>;
  /** fetch aggregated fields from the table: "stakeholders" */
  StakeholderAggregate: Stakeholder_Aggregate;
  /** fetch data from the table: "stakeholders" using primary key columns */
  StakeholderByPk?: Maybe<Stakeholder>;
  /** fetch data from the table in a streaming manner: "stakeholders" */
  Stakeholder_stream: Array<Stakeholder>;
  /** fetch data from the table: "system_software" */
  SystemSoftware: Array<SystemSoftware>;
  /** fetch aggregated fields from the table: "system_software" */
  SystemSoftwareAggregate: SystemSoftware_Aggregate;
  /** fetch data from the table: "system_software" using primary key columns */
  SystemSoftwareByPk?: Maybe<SystemSoftware>;
  /** fetch data from the table in a streaming manner: "system_software" */
  SystemSoftware_stream: Array<SystemSoftware>;
  /** fetch data from the table: "technology_networks" */
  TechnologyNetwork: Array<TechnologyNetwork>;
  /** fetch aggregated fields from the table: "technology_networks" */
  TechnologyNetworkAggregate: TechnologyNetwork_Aggregate;
  /** fetch data from the table: "technology_networks" using primary key columns */
  TechnologyNetworkByPk?: Maybe<TechnologyNetwork>;
  /** fetch data from the table: "map_technology_network_hierarchy" */
  TechnologyNetworkHierarchyMap: Array<TechnologyNetworkHierarchyMap>;
  /** fetch aggregated fields from the table: "map_technology_network_hierarchy" */
  TechnologyNetworkHierarchyMapAggregate: TechnologyNetworkHierarchyMap_Aggregate;
  /** fetch data from the table: "map_technology_network_hierarchy" using primary key columns */
  TechnologyNetworkHierarchyMapByPk?: Maybe<TechnologyNetworkHierarchyMap>;
  /** fetch data from the table in a streaming manner: "map_technology_network_hierarchy" */
  TechnologyNetworkHierarchyMap_stream: Array<TechnologyNetworkHierarchyMap>;
  /** fetch data from the table in a streaming manner: "technology_networks" */
  TechnologyNetwork_stream: Array<TechnologyNetwork>;
  /** fetch data from the table: "technology_nodes" */
  TechnologyNode: Array<TechnologyNode>;
  /** fetch aggregated fields from the table: "technology_nodes" */
  TechnologyNodeAggregate: TechnologyNode_Aggregate;
  /** fetch data from the table: "technology_nodes" using primary key columns */
  TechnologyNodeByPk?: Maybe<TechnologyNode>;
  /** fetch data from the table: "map_technology_node_hierarchy" */
  TechnologyNodeHierarchyMap: Array<TechnologyNodeHierarchyMap>;
  /** fetch aggregated fields from the table: "map_technology_node_hierarchy" */
  TechnologyNodeHierarchyMapAggregate: TechnologyNodeHierarchyMap_Aggregate;
  /** fetch data from the table: "map_technology_node_hierarchy" using primary key columns */
  TechnologyNodeHierarchyMapByPk?: Maybe<TechnologyNodeHierarchyMap>;
  /** fetch data from the table in a streaming manner: "map_technology_node_hierarchy" */
  TechnologyNodeHierarchyMap_stream: Array<TechnologyNodeHierarchyMap>;
  /** fetch data from the table: "map_technology_node_system_software" */
  TechnologyNodeSystemSoftwareMap: Array<TechnologyNodeSystemSoftwareMap>;
  /** fetch aggregated fields from the table: "map_technology_node_system_software" */
  TechnologyNodeSystemSoftwareMapAggregate: TechnologyNodeSystemSoftwareMap_Aggregate;
  /** fetch data from the table: "map_technology_node_system_software" using primary key columns */
  TechnologyNodeSystemSoftwareMapByPk?: Maybe<TechnologyNodeSystemSoftwareMap>;
  /** fetch data from the table in a streaming manner: "map_technology_node_system_software" */
  TechnologyNodeSystemSoftwareMap_stream: Array<TechnologyNodeSystemSoftwareMap>;
  /** fetch data from the table in a streaming manner: "technology_nodes" */
  TechnologyNode_stream: Array<TechnologyNode>;
};


export type Subscription_RootApplicationComponentArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponent_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponent_Order_By>>;
  where?: InputMaybe<ApplicationComponent_Bool_Exp>;
};


export type Subscription_RootApplicationComponentAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponent_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponent_Order_By>>;
  where?: InputMaybe<ApplicationComponent_Bool_Exp>;
};


export type Subscription_RootApplicationComponentByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootApplicationComponentDataObjectMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentDataObjectMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentDataObjectMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentDataObjectMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentDataObjectMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentDataObjectMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentDataObjectMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  dataObjectId: Scalars['uuid']['input'];
};


export type Subscription_RootApplicationComponentDataObjectMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ApplicationComponentDataObjectMap_Stream_Cursor_Input>>;
  where?: InputMaybe<ApplicationComponentDataObjectMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentEventMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentEventMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentEventMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentEventMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentEventMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentEventMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentEventMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentEventMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentEventMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  eventId: Scalars['uuid']['input'];
};


export type Subscription_RootApplicationComponentEventMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ApplicationComponentEventMap_Stream_Cursor_Input>>;
  where?: InputMaybe<ApplicationComponentEventMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentFunctionMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentFunctionMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentFunctionMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentFunctionMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentFunctionMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentFunctionMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentFunctionMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  functionId: Scalars['uuid']['input'];
};


export type Subscription_RootApplicationComponentFunctionMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ApplicationComponentFunctionMap_Stream_Cursor_Input>>;
  where?: InputMaybe<ApplicationComponentFunctionMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentHierarchyMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentHierarchyMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentHierarchyMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentHierarchyMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentHierarchyMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentHierarchyMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentHierarchyMapByPkArgs = {
  componentChildId: Scalars['uuid']['input'];
  componentParentId: Scalars['uuid']['input'];
};


export type Subscription_RootApplicationComponentHierarchyMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ApplicationComponentHierarchyMap_Stream_Cursor_Input>>;
  where?: InputMaybe<ApplicationComponentHierarchyMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentInterfaceMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentInterfaceMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentInterfaceMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentInterfaceMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentInterfaceMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentInterfaceMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentInterfaceMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentInterfaceMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentInterfaceMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  interfaceId: Scalars['uuid']['input'];
};


export type Subscription_RootApplicationComponentInterfaceMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ApplicationComponentInterfaceMap_Stream_Cursor_Input>>;
  where?: InputMaybe<ApplicationComponentInterfaceMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentProductMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentProductMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentProductMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentProductMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentProductMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentProductMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentProductMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentProductMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentProductMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  productId: Scalars['uuid']['input'];
};


export type Subscription_RootApplicationComponentProductMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ApplicationComponentProductMap_Stream_Cursor_Input>>;
  where?: InputMaybe<ApplicationComponentProductMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentStakeholderMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentStakeholderMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentStakeholderMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentStakeholderMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentStakeholderMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentStakeholderMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentStakeholderMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentStakeholderMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentStakeholderMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  roleId: Scalars['uuid']['input'];
  stakeholderId: Scalars['uuid']['input'];
};


export type Subscription_RootApplicationComponentStakeholderMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ApplicationComponentStakeholderMap_Stream_Cursor_Input>>;
  where?: InputMaybe<ApplicationComponentStakeholderMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentSystemSoftwareMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentSystemSoftwareMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentSystemSoftwareMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentSystemSoftwareMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentSystemSoftwareMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentSystemSoftwareMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentSystemSoftwareMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentSystemSoftwareMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentSystemSoftwareMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  systemSoftwareId: Scalars['uuid']['input'];
};


export type Subscription_RootApplicationComponentSystemSoftwareMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ApplicationComponentSystemSoftwareMap_Stream_Cursor_Input>>;
  where?: InputMaybe<ApplicationComponentSystemSoftwareMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentTechnologyLogicalNetworkMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentTechnologyLogicalNetworkMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentTechnologyLogicalNetworkMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentTechnologyLogicalNetworkMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentTechnologyLogicalNetworkMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentTechnologyLogicalNetworkMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentTechnologyLogicalNetworkMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  logicalNetworkId: Scalars['uuid']['input'];
};


export type Subscription_RootApplicationComponentTechnologyLogicalNetworkMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_Stream_Cursor_Input>>;
  where?: InputMaybe<ApplicationComponentTechnologyLogicalNetworkMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentTechnologyNodeMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentTechnologyNodeMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentTechnologyNodeMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentTechnologyNodeMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentTechnologyNodeMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentTechnologyNodeMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentTechnologyNodeMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentTechnologyNodeMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentTechnologyNodeMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  nodeId: Scalars['uuid']['input'];
};


export type Subscription_RootApplicationComponentTechnologyNodeMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ApplicationComponentTechnologyNodeMap_Stream_Cursor_Input>>;
  where?: InputMaybe<ApplicationComponentTechnologyNodeMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponent_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ApplicationComponent_Stream_Cursor_Input>>;
  where?: InputMaybe<ApplicationComponent_Bool_Exp>;
};


export type Subscription_RootApplicationFunctionDataObjectMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Order_By>>;
  where?: InputMaybe<ApplicationFunctionDataObjectMap_Bool_Exp>;
};


export type Subscription_RootApplicationFunctionDataObjectMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationFunctionDataObjectMap_Order_By>>;
  where?: InputMaybe<ApplicationFunctionDataObjectMap_Bool_Exp>;
};


export type Subscription_RootApplicationFunctionDataObjectMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  dataObjectId: Scalars['uuid']['input'];
  functionId: Scalars['uuid']['input'];
};


export type Subscription_RootApplicationFunctionDataObjectMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ApplicationFunctionDataObjectMap_Stream_Cursor_Input>>;
  where?: InputMaybe<ApplicationFunctionDataObjectMap_Bool_Exp>;
};


export type Subscription_RootApplicationInterfaceFunctionMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationInterfaceFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationInterfaceFunctionMap_Order_By>>;
  where?: InputMaybe<ApplicationInterfaceFunctionMap_Bool_Exp>;
};


export type Subscription_RootApplicationInterfaceFunctionMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationInterfaceFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationInterfaceFunctionMap_Order_By>>;
  where?: InputMaybe<ApplicationInterfaceFunctionMap_Bool_Exp>;
};


export type Subscription_RootApplicationInterfaceFunctionMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  functionId: Scalars['uuid']['input'];
  interfaceId: Scalars['uuid']['input'];
};


export type Subscription_RootApplicationInterfaceFunctionMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ApplicationInterfaceFunctionMap_Stream_Cursor_Input>>;
  where?: InputMaybe<ApplicationInterfaceFunctionMap_Bool_Exp>;
};


export type Subscription_RootBusinessActorArgs = {
  distinct_on?: InputMaybe<Array<BusinessActor_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessActor_Order_By>>;
  where?: InputMaybe<BusinessActor_Bool_Exp>;
};


export type Subscription_RootBusinessActorAggregateArgs = {
  distinct_on?: InputMaybe<Array<BusinessActor_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessActor_Order_By>>;
  where?: InputMaybe<BusinessActor_Bool_Exp>;
};


export type Subscription_RootBusinessActorByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootBusinessActorRoleMapArgs = {
  distinct_on?: InputMaybe<Array<BusinessActorRoleMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessActorRoleMap_Order_By>>;
  where?: InputMaybe<BusinessActorRoleMap_Bool_Exp>;
};


export type Subscription_RootBusinessActorRoleMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<BusinessActorRoleMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessActorRoleMap_Order_By>>;
  where?: InputMaybe<BusinessActorRoleMap_Bool_Exp>;
};


export type Subscription_RootBusinessActorRoleMapByPkArgs = {
  actorId: Scalars['uuid']['input'];
  roleId: Scalars['uuid']['input'];
};


export type Subscription_RootBusinessActorRoleMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<BusinessActorRoleMap_Stream_Cursor_Input>>;
  where?: InputMaybe<BusinessActorRoleMap_Bool_Exp>;
};


export type Subscription_RootBusinessActor_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<BusinessActor_Stream_Cursor_Input>>;
  where?: InputMaybe<BusinessActor_Bool_Exp>;
};


export type Subscription_RootBusinessProductArgs = {
  distinct_on?: InputMaybe<Array<BusinessProduct_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProduct_Order_By>>;
  where?: InputMaybe<BusinessProduct_Bool_Exp>;
};


export type Subscription_RootBusinessProductAggregateArgs = {
  distinct_on?: InputMaybe<Array<BusinessProduct_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProduct_Order_By>>;
  where?: InputMaybe<BusinessProduct_Bool_Exp>;
};


export type Subscription_RootBusinessProductByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootBusinessProduct_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<BusinessProduct_Stream_Cursor_Input>>;
  where?: InputMaybe<BusinessProduct_Bool_Exp>;
};


export type Subscription_RootBusinessRoleArgs = {
  distinct_on?: InputMaybe<Array<BusinessRole_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessRole_Order_By>>;
  where?: InputMaybe<BusinessRole_Bool_Exp>;
};


export type Subscription_RootBusinessRoleAggregateArgs = {
  distinct_on?: InputMaybe<Array<BusinessRole_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessRole_Order_By>>;
  where?: InputMaybe<BusinessRole_Bool_Exp>;
};


export type Subscription_RootBusinessRoleByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootBusinessRole_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<BusinessRole_Stream_Cursor_Input>>;
  where?: InputMaybe<BusinessRole_Bool_Exp>;
};


export type Subscription_RootCapabilityArgs = {
  distinct_on?: InputMaybe<Array<Capability_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Capability_Order_By>>;
  where?: InputMaybe<Capability_Bool_Exp>;
};


export type Subscription_RootCapabilityAggregateArgs = {
  distinct_on?: InputMaybe<Array<Capability_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Capability_Order_By>>;
  where?: InputMaybe<Capability_Bool_Exp>;
};


export type Subscription_RootCapabilityByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootCapability_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Capability_Stream_Cursor_Input>>;
  where?: InputMaybe<Capability_Bool_Exp>;
};


export type Subscription_RootDataObjectArgs = {
  distinct_on?: InputMaybe<Array<DataObject_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<DataObject_Order_By>>;
  where?: InputMaybe<DataObject_Bool_Exp>;
};


export type Subscription_RootDataObjectAggregateArgs = {
  distinct_on?: InputMaybe<Array<DataObject_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<DataObject_Order_By>>;
  where?: InputMaybe<DataObject_Bool_Exp>;
};


export type Subscription_RootDataObjectByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootDataObject_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<DataObject_Stream_Cursor_Input>>;
  where?: InputMaybe<DataObject_Bool_Exp>;
};


export type Subscription_RootDirectoryItemsMapArgs = {
  distinct_on?: InputMaybe<Array<DirectoryItemsMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<DirectoryItemsMap_Order_By>>;
  where?: InputMaybe<DirectoryItemsMap_Bool_Exp>;
};


export type Subscription_RootDirectoryItemsMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<DirectoryItemsMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<DirectoryItemsMap_Order_By>>;
  where?: InputMaybe<DirectoryItemsMap_Bool_Exp>;
};


export type Subscription_RootDirectoryItemsMapByPkArgs = {
  sourceId: Scalars['uuid']['input'];
  targetId: Scalars['uuid']['input'];
};


export type Subscription_RootDirectoryItemsMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<DirectoryItemsMap_Stream_Cursor_Input>>;
  where?: InputMaybe<DirectoryItemsMap_Bool_Exp>;
};


export type Subscription_RootDirectoryObjectArgs = {
  distinct_on?: InputMaybe<Array<DirectoryObject_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<DirectoryObject_Order_By>>;
  where?: InputMaybe<DirectoryObject_Bool_Exp>;
};


export type Subscription_RootDirectoryObjectAggregateArgs = {
  distinct_on?: InputMaybe<Array<DirectoryObject_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<DirectoryObject_Order_By>>;
  where?: InputMaybe<DirectoryObject_Bool_Exp>;
};


export type Subscription_RootDirectoryObjectByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootDirectoryObject_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<DirectoryObject_Stream_Cursor_Input>>;
  where?: InputMaybe<DirectoryObject_Bool_Exp>;
};


export type Subscription_RootEmployeeArgs = {
  distinct_on?: InputMaybe<Array<Employee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Employee_Order_By>>;
  where?: InputMaybe<Employee_Bool_Exp>;
};


export type Subscription_RootEmployeeAggregateArgs = {
  distinct_on?: InputMaybe<Array<Employee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Employee_Order_By>>;
  where?: InputMaybe<Employee_Bool_Exp>;
};


export type Subscription_RootEmployeeByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootEmployee_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Employee_Stream_Cursor_Input>>;
  where?: InputMaybe<Employee_Bool_Exp>;
};


export type Subscription_RootEventGenericArgs = {
  distinct_on?: InputMaybe<Array<EventGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<EventGeneric_Order_By>>;
  where?: InputMaybe<EventGeneric_Bool_Exp>;
};


export type Subscription_RootEventGenericAggregateArgs = {
  distinct_on?: InputMaybe<Array<EventGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<EventGeneric_Order_By>>;
  where?: InputMaybe<EventGeneric_Bool_Exp>;
};


export type Subscription_RootEventGenericByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootEventGeneric_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<EventGeneric_Stream_Cursor_Input>>;
  where?: InputMaybe<EventGeneric_Bool_Exp>;
};


export type Subscription_RootFlowGenericArgs = {
  distinct_on?: InputMaybe<Array<FlowGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<FlowGeneric_Order_By>>;
  where?: InputMaybe<FlowGeneric_Bool_Exp>;
};


export type Subscription_RootFlowGenericAggregateArgs = {
  distinct_on?: InputMaybe<Array<FlowGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<FlowGeneric_Order_By>>;
  where?: InputMaybe<FlowGeneric_Bool_Exp>;
};


export type Subscription_RootFlowGenericByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootFlowGeneric_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<FlowGeneric_Stream_Cursor_Input>>;
  where?: InputMaybe<FlowGeneric_Bool_Exp>;
};


export type Subscription_RootFunctionGenericArgs = {
  distinct_on?: InputMaybe<Array<FunctionGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<FunctionGeneric_Order_By>>;
  where?: InputMaybe<FunctionGeneric_Bool_Exp>;
};


export type Subscription_RootFunctionGenericAggregateArgs = {
  distinct_on?: InputMaybe<Array<FunctionGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<FunctionGeneric_Order_By>>;
  where?: InputMaybe<FunctionGeneric_Bool_Exp>;
};


export type Subscription_RootFunctionGenericByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootFunctionGeneric_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<FunctionGeneric_Stream_Cursor_Input>>;
  where?: InputMaybe<FunctionGeneric_Bool_Exp>;
};


export type Subscription_RootInterfaceGenericArgs = {
  distinct_on?: InputMaybe<Array<InterfaceGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<InterfaceGeneric_Order_By>>;
  where?: InputMaybe<InterfaceGeneric_Bool_Exp>;
};


export type Subscription_RootInterfaceGenericAggregateArgs = {
  distinct_on?: InputMaybe<Array<InterfaceGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<InterfaceGeneric_Order_By>>;
  where?: InputMaybe<InterfaceGeneric_Bool_Exp>;
};


export type Subscription_RootInterfaceGenericByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootInterfaceGeneric_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<InterfaceGeneric_Stream_Cursor_Input>>;
  where?: InputMaybe<InterfaceGeneric_Bool_Exp>;
};


export type Subscription_RootMotivationElementGenericArgs = {
  distinct_on?: InputMaybe<Array<MotivationElementGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MotivationElementGeneric_Order_By>>;
  where?: InputMaybe<MotivationElementGeneric_Bool_Exp>;
};


export type Subscription_RootMotivationElementGenericAggregateArgs = {
  distinct_on?: InputMaybe<Array<MotivationElementGeneric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MotivationElementGeneric_Order_By>>;
  where?: InputMaybe<MotivationElementGeneric_Bool_Exp>;
};


export type Subscription_RootMotivationElementGenericByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootMotivationElementGeneric_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<MotivationElementGeneric_Stream_Cursor_Input>>;
  where?: InputMaybe<MotivationElementGeneric_Bool_Exp>;
};


export type Subscription_RootPhysicalLocationArgs = {
  distinct_on?: InputMaybe<Array<PhysicalLocation_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<PhysicalLocation_Order_By>>;
  where?: InputMaybe<PhysicalLocation_Bool_Exp>;
};


export type Subscription_RootPhysicalLocationAggregateArgs = {
  distinct_on?: InputMaybe<Array<PhysicalLocation_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<PhysicalLocation_Order_By>>;
  where?: InputMaybe<PhysicalLocation_Bool_Exp>;
};


export type Subscription_RootPhysicalLocationByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootPhysicalLocation_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<PhysicalLocation_Stream_Cursor_Input>>;
  where?: InputMaybe<PhysicalLocation_Bool_Exp>;
};


export type Subscription_RootSolutionArgs = {
  distinct_on?: InputMaybe<Array<Solution_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Solution_Order_By>>;
  where?: InputMaybe<Solution_Bool_Exp>;
};


export type Subscription_RootSolutionAggregateArgs = {
  distinct_on?: InputMaybe<Array<Solution_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Solution_Order_By>>;
  where?: InputMaybe<Solution_Bool_Exp>;
};


export type Subscription_RootSolutionApplicationComponentMapArgs = {
  distinct_on?: InputMaybe<Array<SolutionApplicationComponentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionApplicationComponentMap_Order_By>>;
  where?: InputMaybe<SolutionApplicationComponentMap_Bool_Exp>;
};


export type Subscription_RootSolutionApplicationComponentMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionApplicationComponentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionApplicationComponentMap_Order_By>>;
  where?: InputMaybe<SolutionApplicationComponentMap_Bool_Exp>;
};


export type Subscription_RootSolutionApplicationComponentMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};


export type Subscription_RootSolutionApplicationComponentMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<SolutionApplicationComponentMap_Stream_Cursor_Input>>;
  where?: InputMaybe<SolutionApplicationComponentMap_Bool_Exp>;
};


export type Subscription_RootSolutionByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootSolutionConstraintMapArgs = {
  distinct_on?: InputMaybe<Array<SolutionConstraintMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionConstraintMap_Order_By>>;
  where?: InputMaybe<SolutionConstraintMap_Bool_Exp>;
};


export type Subscription_RootSolutionConstraintMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionConstraintMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionConstraintMap_Order_By>>;
  where?: InputMaybe<SolutionConstraintMap_Bool_Exp>;
};


export type Subscription_RootSolutionConstraintMapByPkArgs = {
  constraintId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};


export type Subscription_RootSolutionConstraintMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<SolutionConstraintMap_Stream_Cursor_Input>>;
  where?: InputMaybe<SolutionConstraintMap_Bool_Exp>;
};


export type Subscription_RootSolution_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Solution_Stream_Cursor_Input>>;
  where?: InputMaybe<Solution_Bool_Exp>;
};


export type Subscription_RootStakeholderArgs = {
  distinct_on?: InputMaybe<Array<Stakeholder_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Stakeholder_Order_By>>;
  where?: InputMaybe<Stakeholder_Bool_Exp>;
};


export type Subscription_RootStakeholderAggregateArgs = {
  distinct_on?: InputMaybe<Array<Stakeholder_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Stakeholder_Order_By>>;
  where?: InputMaybe<Stakeholder_Bool_Exp>;
};


export type Subscription_RootStakeholderByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootStakeholder_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Stakeholder_Stream_Cursor_Input>>;
  where?: InputMaybe<Stakeholder_Bool_Exp>;
};


export type Subscription_RootSystemSoftwareArgs = {
  distinct_on?: InputMaybe<Array<SystemSoftware_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SystemSoftware_Order_By>>;
  where?: InputMaybe<SystemSoftware_Bool_Exp>;
};


export type Subscription_RootSystemSoftwareAggregateArgs = {
  distinct_on?: InputMaybe<Array<SystemSoftware_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SystemSoftware_Order_By>>;
  where?: InputMaybe<SystemSoftware_Bool_Exp>;
};


export type Subscription_RootSystemSoftwareByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootSystemSoftware_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<SystemSoftware_Stream_Cursor_Input>>;
  where?: InputMaybe<SystemSoftware_Bool_Exp>;
};


export type Subscription_RootTechnologyNetworkArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNetwork_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNetwork_Order_By>>;
  where?: InputMaybe<TechnologyNetwork_Bool_Exp>;
};


export type Subscription_RootTechnologyNetworkAggregateArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNetwork_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNetwork_Order_By>>;
  where?: InputMaybe<TechnologyNetwork_Bool_Exp>;
};


export type Subscription_RootTechnologyNetworkByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootTechnologyNetworkHierarchyMapArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNetworkHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNetworkHierarchyMap_Order_By>>;
  where?: InputMaybe<TechnologyNetworkHierarchyMap_Bool_Exp>;
};


export type Subscription_RootTechnologyNetworkHierarchyMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNetworkHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNetworkHierarchyMap_Order_By>>;
  where?: InputMaybe<TechnologyNetworkHierarchyMap_Bool_Exp>;
};


export type Subscription_RootTechnologyNetworkHierarchyMapByPkArgs = {
  networkChildId: Scalars['uuid']['input'];
  networkParentId: Scalars['uuid']['input'];
};


export type Subscription_RootTechnologyNetworkHierarchyMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<TechnologyNetworkHierarchyMap_Stream_Cursor_Input>>;
  where?: InputMaybe<TechnologyNetworkHierarchyMap_Bool_Exp>;
};


export type Subscription_RootTechnologyNetwork_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<TechnologyNetwork_Stream_Cursor_Input>>;
  where?: InputMaybe<TechnologyNetwork_Bool_Exp>;
};


export type Subscription_RootTechnologyNodeArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNode_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNode_Order_By>>;
  where?: InputMaybe<TechnologyNode_Bool_Exp>;
};


export type Subscription_RootTechnologyNodeAggregateArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNode_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNode_Order_By>>;
  where?: InputMaybe<TechnologyNode_Bool_Exp>;
};


export type Subscription_RootTechnologyNodeByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootTechnologyNodeHierarchyMapArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNodeHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNodeHierarchyMap_Order_By>>;
  where?: InputMaybe<TechnologyNodeHierarchyMap_Bool_Exp>;
};


export type Subscription_RootTechnologyNodeHierarchyMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNodeHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNodeHierarchyMap_Order_By>>;
  where?: InputMaybe<TechnologyNodeHierarchyMap_Bool_Exp>;
};


export type Subscription_RootTechnologyNodeHierarchyMapByPkArgs = {
  nodeChildId: Scalars['uuid']['input'];
  nodeParentId: Scalars['uuid']['input'];
};


export type Subscription_RootTechnologyNodeHierarchyMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<TechnologyNodeHierarchyMap_Stream_Cursor_Input>>;
  where?: InputMaybe<TechnologyNodeHierarchyMap_Bool_Exp>;
};


export type Subscription_RootTechnologyNodeSystemSoftwareMapArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNodeSystemSoftwareMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNodeSystemSoftwareMap_Order_By>>;
  where?: InputMaybe<TechnologyNodeSystemSoftwareMap_Bool_Exp>;
};


export type Subscription_RootTechnologyNodeSystemSoftwareMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNodeSystemSoftwareMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNodeSystemSoftwareMap_Order_By>>;
  where?: InputMaybe<TechnologyNodeSystemSoftwareMap_Bool_Exp>;
};


export type Subscription_RootTechnologyNodeSystemSoftwareMapByPkArgs = {
  nodeId: Scalars['uuid']['input'];
  systemSoftwareId: Scalars['uuid']['input'];
};


export type Subscription_RootTechnologyNodeSystemSoftwareMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<TechnologyNodeSystemSoftwareMap_Stream_Cursor_Input>>;
  where?: InputMaybe<TechnologyNodeSystemSoftwareMap_Bool_Exp>;
};


export type Subscription_RootTechnologyNode_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<TechnologyNode_Stream_Cursor_Input>>;
  where?: InputMaybe<TechnologyNode_Bool_Exp>;
};

/** Boolean expression to compare columns of type "system_architecture_kind_enum". All fields are combined with logical 'AND'. */
export type System_Architecture_Kind_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['system_architecture_kind_enum']['input']>;
  _gt?: InputMaybe<Scalars['system_architecture_kind_enum']['input']>;
  _gte?: InputMaybe<Scalars['system_architecture_kind_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['system_architecture_kind_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['system_architecture_kind_enum']['input']>;
  _lte?: InputMaybe<Scalars['system_architecture_kind_enum']['input']>;
  _neq?: InputMaybe<Scalars['system_architecture_kind_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['system_architecture_kind_enum']['input']>>;
};

/** Boolean expression to compare columns of type "system_software_kind_enum". All fields are combined with logical 'AND'. */
export type System_Software_Kind_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['system_software_kind_enum']['input']>;
  _gt?: InputMaybe<Scalars['system_software_kind_enum']['input']>;
  _gte?: InputMaybe<Scalars['system_software_kind_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['system_software_kind_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['system_software_kind_enum']['input']>;
  _lte?: InputMaybe<Scalars['system_software_kind_enum']['input']>;
  _neq?: InputMaybe<Scalars['system_software_kind_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['system_software_kind_enum']['input']>>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

export type GetComponentFullQueryVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type GetComponentFullQuery = { __typename?: 'query_root', component?: { __typename?: 'ApplicationComponent', id: any, code: string, name: string, description?: string | null, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null, state?: { __typename?: 'DirectoryObject', id: any, name: string, color?: string | null } | null } | null, functions: Array<{ __typename?: 'ApplicationComponentFunctionMap', function: { __typename?: 'FunctionGeneric', id: any, code: string, name: string, description?: string | null } }>, dataObjects: Array<{ __typename?: 'ApplicationComponentDataObjectMap', dataObject: { __typename?: 'DataObject', id: any, code: string, name: string, description?: string | null } }>, interfaces: Array<{ __typename?: 'ApplicationComponentInterfaceMap', interface: { __typename?: 'InterfaceGeneric', id: any, code: string, name: string, description?: string | null } }>, events: Array<{ __typename?: 'ApplicationComponentEventMap', event: { __typename?: 'EventGeneric', id: any, code: string, name: string, description?: string | null } }>, systemSoftware: Array<{ __typename?: 'ApplicationComponentSystemSoftwareMap', kind: any, systemSoftware: { __typename?: 'SystemSoftware', id: any, code: string, name: string } }>, technologyNodes: Array<{ __typename?: 'ApplicationComponentTechnologyNodeMap', node: { __typename?: 'TechnologyNode', id: any, code: string, name: string } }>, technologyNetworks: Array<{ __typename?: 'ApplicationComponentTechnologyLogicalNetworkMap', logicalNetwork: { __typename?: 'TechnologyNetwork', id: any, code: string, name: string } }>, parentComponents: Array<{ __typename?: 'ApplicationComponentHierarchyMap', componentParent: { __typename?: 'ApplicationComponent', id: any, code: string, name: string, description?: string | null } }>, childComponents: Array<{ __typename?: 'ApplicationComponentHierarchyMap', componentChild: { __typename?: 'ApplicationComponent', id: any, code: string, name: string, description?: string | null } }> };

export type GetComponentsQueryVariables = Exact<{
  where: ApplicationComponent_Bool_Exp;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type GetComponentsQuery = { __typename?: 'query_root', ApplicationComponent: Array<{ __typename?: 'ApplicationComponent', id: any, code: string, name: string, description?: string | null, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null, state?: { __typename?: 'DirectoryObject', id: any, code: string, name: string, color?: string | null } | null, functions: Array<{ __typename?: 'ApplicationComponentFunctionMap', function: { __typename?: 'FunctionGeneric', id: any, code: string, name: string } }>, products: Array<{ __typename?: 'ApplicationComponentProductMap', product: { __typename?: 'BusinessProduct', id: any, code: string, name: string } }>, interfaces: Array<{ __typename?: 'ApplicationComponentInterfaceMap', interface: { __typename?: 'InterfaceGeneric', id: any, code: string, name: string } }>, criticalLevel?: { __typename?: 'DirectoryObject', id: any, code: string, name: string } | null, failoverType?: { __typename?: 'DirectoryObject', id: any, code: string, name: string } | null, licenseType?: { __typename?: 'DirectoryObject', code: string, id: any, name: string } | null, monitoringLevel?: { __typename?: 'DirectoryObject', code: string, id: any, name: string } | null, recoveryTime?: { __typename?: 'DirectoryObject', id: any, code: string, name: string } | null, redundancyType?: { __typename?: 'DirectoryObject', id: any, code: string, name: string, color?: string | null } | null, scalingType?: { __typename?: 'DirectoryObject', id: any, code: string, name: string, color?: string | null } | null, style?: { __typename?: 'DirectoryObject', id: any, code: string, name: string } | null, systemSoftware: Array<{ __typename?: 'ApplicationComponentSystemSoftwareMap', kind: any, systemSoftware: { __typename?: 'SystemSoftware', id: any, code: string, kind: any, licenseType?: { __typename?: 'DirectoryObject', code: string, color?: string | null, id: any, name: string } | null } }> }>, ApplicationComponentAggregate: { __typename?: 'ApplicationComponent_aggregate', aggregate?: { __typename?: 'ApplicationComponent_aggregate_fields', count: number } | null } };

export type GetApplicationFunctionByPkQueryVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type GetApplicationFunctionByPkQuery = { __typename?: 'query_root', FunctionGenericByPk?: { __typename?: 'FunctionGeneric', id: any, code: string, name: string, description?: string | null, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null } | null };

export type GetApplicationFunctionsQueryVariables = Exact<{
  where: FunctionGeneric_Bool_Exp;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type GetApplicationFunctionsQuery = { __typename?: 'query_root', FunctionGeneric: Array<{ __typename?: 'FunctionGeneric', id: any, code: string, name: string, description?: string | null, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null }>, FunctionGenericAggregate: { __typename?: 'FunctionGeneric_aggregate', aggregate?: { __typename?: 'FunctionGeneric_aggregate_fields', count: number } | null } };

export type GetFunctionsByIdsQueryVariables = Exact<{
  ids: Array<Scalars['uuid']['input']> | Scalars['uuid']['input'];
}>;


export type GetFunctionsByIdsQuery = { __typename?: 'query_root', FunctionGeneric: Array<{ __typename?: 'FunctionGeneric', id: any, code: string, name: string, description?: string | null }> };

export type GetDataObjectByPkQueryVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type GetDataObjectByPkQuery = { __typename?: 'query_root', DataObjectByPk?: { __typename?: 'DataObject', id: any, code: string, name: string, description?: string | null, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null } | null };

export type GetDataObjectFullQueryVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type GetDataObjectFullQuery = { __typename?: 'query_root', dataObject?: { __typename?: 'DataObject', id: any, code: string, name: string, description?: string | null, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null } | null, componentMaps: Array<{ __typename?: 'ApplicationComponentDataObjectMap', component: { __typename?: 'ApplicationComponent', id: any, code: string, name: string, description?: string | null } }>, functionMaps: Array<{ __typename?: 'ApplicationFunctionDataObjectMap', functionId: any, accessKind: any, componentId: any, component: { __typename?: 'ApplicationComponent', id: any, code: string, name: string } }> };

export type GetDataObjectsQueryVariables = Exact<{
  where: DataObject_Bool_Exp;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type GetDataObjectsQuery = { __typename?: 'query_root', DataObject: Array<{ __typename?: 'DataObject', id: any, code: string, name: string, description?: string | null, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null }>, DataObjectAggregate: { __typename?: 'DataObject_aggregate', aggregate?: { __typename?: 'DataObject_aggregate_fields', count: number } | null } };

export type GetAllDirectoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDirectoriesQuery = { __typename?: 'query_root', DirectoryObject: Array<{ __typename?: 'DirectoryObject', id: any, kind: any, code: string, name: string }> };

export type GetDirectoryCountQueryVariables = Exact<{
  kind: Scalars['directory_kind_enum']['input'];
}>;


export type GetDirectoryCountQuery = { __typename?: 'query_root', DirectoryObjectAggregate: { __typename?: 'DirectoryObject_aggregate', aggregate?: { __typename?: 'DirectoryObject_aggregate_fields', count: number } | null } };

export type GetDirectoryItemByPkQueryVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type GetDirectoryItemByPkQuery = { __typename?: 'query_root', DirectoryObjectByPk?: { __typename?: 'DirectoryObject', id: any, code: string, name: string, description?: string | null, color?: string | null, byDefault: boolean, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null } | null };

export type GetDirectoryItemsQueryVariables = Exact<{
  kind: Scalars['directory_kind_enum']['input'];
}>;


export type GetDirectoryItemsQuery = { __typename?: 'query_root', DirectoryObject: Array<{ __typename?: 'DirectoryObject', id: any, code: string, name: string, description?: string | null, color?: string | null, byDefault: boolean, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null }> };

export type GetDirectoryRelationsQueryVariables = Exact<{
  sourceId: Scalars['uuid']['input'];
}>;


export type GetDirectoryRelationsQuery = { __typename?: 'query_root', DirectoryItemsMap: Array<{ __typename?: 'DirectoryItemsMap', createdAt: any, type: any, sourceId: any, targetId: any, target: { __typename?: 'DirectoryObject', id: any, code: string, name: string, description?: string | null, kind: any } }> };

export type GetSystemSoftwareByPkQueryVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type GetSystemSoftwareByPkQuery = { __typename?: 'query_root', SystemSoftwareByPk?: { __typename?: 'SystemSoftware', id: any, code: string, name: string, description?: string | null, version?: string | null, kind: any, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null, type?: { __typename?: 'DirectoryObject', id: any, name: string } | null, licenseType?: { __typename?: 'DirectoryObject', id: any, name: string } | null } | null };

export type GetSystemSoftwareQueryVariables = Exact<{
  where: SystemSoftware_Bool_Exp;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type GetSystemSoftwareQuery = { __typename?: 'query_root', SystemSoftware: Array<{ __typename?: 'SystemSoftware', id: any, code: string, name: string, description?: string | null, version?: string | null, kind: any, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null, type?: { __typename?: 'DirectoryObject', id: any, name: string } | null, licenseType?: { __typename?: 'DirectoryObject', id: any, name: string } | null }>, SystemSoftwareAggregate: { __typename?: 'SystemSoftware_aggregate', aggregate?: { __typename?: 'SystemSoftware_aggregate_fields', count: number } | null } };

export type GetSystemSoftwareListQueryVariables = Exact<{
  where: SystemSoftware_Bool_Exp;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type GetSystemSoftwareListQuery = { __typename?: 'query_root', SystemSoftware: Array<{ __typename?: 'SystemSoftware', id: any, code: string, name: string }>, SystemSoftwareAggregate: { __typename?: 'SystemSoftware_aggregate', aggregate?: { __typename?: 'SystemSoftware_aggregate_fields', count: number } | null } };
