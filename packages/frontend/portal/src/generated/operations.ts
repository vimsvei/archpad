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
  capability_assessment_type_enum: { input: any; output: any; }
  data_access_kind_enum: { input: any; output: any; }
  directory_kind_enum: { input: any; output: any; }
  directory_link_type_enum: { input: any; output: any; }
  environment_enum: { input: any; output: any; }
  interface_method_enum: { input: any; output: any; }
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
  solution_implementation_status_enum: { input: any; output: any; }
  solution_item_impact_type_enum: { input: any; output: any; }
  solution_life_cycle_enum: { input: any; output: any; }
  stakeholder_role_enum: { input: any; output: any; }
  system_architecture_kind_enum: { input: any; output: any; }
  system_software_kind_enum: { input: any; output: any; }
  technology_radar_zone: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
  user_state: { input: any; output: any; }
  uuid: { input: any; output: any; }
};

/** columns and relationships of "components" */
export type ApplicationComponent = {
  __typename?: 'ApplicationComponent';
  /** An array relationship */
  actorRole: Array<ApplicationComponentBusinessActorRoleMap>;
  /** An aggregate relationship */
  actorRole_aggregate: ApplicationComponentBusinessActorRoleMap_Aggregate;
  /** An array relationship */
  capabilities: Array<CapabilityApplicationComponentMap>;
  /** An aggregate relationship */
  capabilities_aggregate: CapabilityApplicationComponentMap_Aggregate;
  /** An array relationship */
  children: Array<ApplicationComponentHierarchyMap>;
  /** An aggregate relationship */
  children_aggregate: ApplicationComponentHierarchyMap_Aggregate;
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
  directories: Array<ApplicationComponentDirectoryMap>;
  /** An aggregate relationship */
  directories_aggregate: ApplicationComponentDirectoryMap_Aggregate;
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
  parents: Array<ApplicationComponentHierarchyMap>;
  /** An aggregate relationship */
  parents_aggregate: ApplicationComponentHierarchyMap_Aggregate;
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
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "components" */
export type ApplicationComponentActorRoleArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentBusinessActorRoleMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentBusinessActorRoleMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentBusinessActorRoleMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentActorRole_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentBusinessActorRoleMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentBusinessActorRoleMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentBusinessActorRoleMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentCapabilitiesArgs = {
  distinct_on?: InputMaybe<Array<CapabilityApplicationComponentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityApplicationComponentMap_Order_By>>;
  where?: InputMaybe<CapabilityApplicationComponentMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentCapabilities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<CapabilityApplicationComponentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityApplicationComponentMap_Order_By>>;
  where?: InputMaybe<CapabilityApplicationComponentMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentChildrenArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentHierarchyMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentChildren_AggregateArgs = {
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
export type ApplicationComponentDirectoriesArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentDirectoryMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentDirectoryMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentDirectoryMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentDirectories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentDirectoryMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentDirectoryMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentDirectoryMap_Bool_Exp>;
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
export type ApplicationComponentParentsArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentHierarchyMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ApplicationComponentParents_AggregateArgs = {
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

/** columns and relationships of "map_application_component_actor_role" */
export type ApplicationComponentBusinessActorRoleMap = {
  __typename?: 'ApplicationComponentBusinessActorRoleMap';
  actorId: Scalars['uuid']['output'];
  /** An object relationship */
  component: ApplicationComponent;
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  roleId: Scalars['uuid']['output'];
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_application_component_actor_role" */
export type ApplicationComponentBusinessActorRoleMap_Aggregate = {
  __typename?: 'ApplicationComponentBusinessActorRoleMap_aggregate';
  aggregate?: Maybe<ApplicationComponentBusinessActorRoleMap_Aggregate_Fields>;
  nodes: Array<ApplicationComponentBusinessActorRoleMap>;
};

export type ApplicationComponentBusinessActorRoleMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<ApplicationComponentBusinessActorRoleMap_Aggregate_Bool_Exp_Count>;
};

export type ApplicationComponentBusinessActorRoleMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<ApplicationComponentBusinessActorRoleMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ApplicationComponentBusinessActorRoleMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_application_component_actor_role" */
export type ApplicationComponentBusinessActorRoleMap_Aggregate_Fields = {
  __typename?: 'ApplicationComponentBusinessActorRoleMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<ApplicationComponentBusinessActorRoleMap_Max_Fields>;
  min?: Maybe<ApplicationComponentBusinessActorRoleMap_Min_Fields>;
};


/** aggregate fields of "map_application_component_actor_role" */
export type ApplicationComponentBusinessActorRoleMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ApplicationComponentBusinessActorRoleMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_application_component_actor_role" */
export type ApplicationComponentBusinessActorRoleMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ApplicationComponentBusinessActorRoleMap_Max_Order_By>;
  min?: InputMaybe<ApplicationComponentBusinessActorRoleMap_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "map_application_component_actor_role". All fields are combined with a logical 'AND'. */
export type ApplicationComponentBusinessActorRoleMap_Bool_Exp = {
  _and?: InputMaybe<Array<ApplicationComponentBusinessActorRoleMap_Bool_Exp>>;
  _not?: InputMaybe<ApplicationComponentBusinessActorRoleMap_Bool_Exp>;
  _or?: InputMaybe<Array<ApplicationComponentBusinessActorRoleMap_Bool_Exp>>;
  actorId?: InputMaybe<Uuid_Comparison_Exp>;
  component?: InputMaybe<ApplicationComponent_Bool_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  roleId?: InputMaybe<Uuid_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type ApplicationComponentBusinessActorRoleMap_Max_Fields = {
  __typename?: 'ApplicationComponentBusinessActorRoleMap_max_fields';
  actorId?: Maybe<Scalars['uuid']['output']>;
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  roleId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_application_component_actor_role" */
export type ApplicationComponentBusinessActorRoleMap_Max_Order_By = {
  actorId?: InputMaybe<Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  roleId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type ApplicationComponentBusinessActorRoleMap_Min_Fields = {
  __typename?: 'ApplicationComponentBusinessActorRoleMap_min_fields';
  actorId?: Maybe<Scalars['uuid']['output']>;
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  roleId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_application_component_actor_role" */
export type ApplicationComponentBusinessActorRoleMap_Min_Order_By = {
  actorId?: InputMaybe<Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  roleId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "map_application_component_actor_role". */
export type ApplicationComponentBusinessActorRoleMap_Order_By = {
  actorId?: InputMaybe<Order_By>;
  component?: InputMaybe<ApplicationComponent_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  roleId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "map_application_component_actor_role" */
export enum ApplicationComponentBusinessActorRoleMap_Select_Column {
  /** column name */
  ActorId = 'actorId',
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "ApplicationComponentBusinessActorRoleMap" */
export type ApplicationComponentBusinessActorRoleMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: ApplicationComponentBusinessActorRoleMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ApplicationComponentBusinessActorRoleMap_Stream_Cursor_Value_Input = {
  actorId?: InputMaybe<Scalars['uuid']['input']>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  roleId?: InputMaybe<Scalars['uuid']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "map_application_component_data_object" */
export type ApplicationComponentDataObjectMap = {
  __typename?: 'ApplicationComponentDataObjectMap';
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
  /** An array relationship */
  solutions: Array<SolutionDataObjectMap>;
  /** An aggregate relationship */
  solutions_aggregate: SolutionDataObjectMap_Aggregate;
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "map_application_component_data_object" */
export type ApplicationComponentDataObjectMapSolutionsArgs = {
  distinct_on?: InputMaybe<Array<SolutionDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionDataObjectMap_Order_By>>;
  where?: InputMaybe<SolutionDataObjectMap_Bool_Exp>;
};


/** columns and relationships of "map_application_component_data_object" */
export type ApplicationComponentDataObjectMapSolutions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionDataObjectMap_Order_By>>;
  where?: InputMaybe<SolutionDataObjectMap_Bool_Exp>;
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

/** Boolean expression to filter rows from the table "map_application_component_data_object". All fields are combined with a logical 'AND'. */
export type ApplicationComponentDataObjectMap_Bool_Exp = {
  _and?: InputMaybe<Array<ApplicationComponentDataObjectMap_Bool_Exp>>;
  _not?: InputMaybe<ApplicationComponentDataObjectMap_Bool_Exp>;
  _or?: InputMaybe<Array<ApplicationComponentDataObjectMap_Bool_Exp>>;
  component?: InputMaybe<ApplicationComponent_Bool_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  dataObject?: InputMaybe<DataObject_Bool_Exp>;
  dataObjectId?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  solutions?: InputMaybe<SolutionDataObjectMap_Bool_Exp>;
  solutions_aggregate?: InputMaybe<SolutionDataObjectMap_Aggregate_Bool_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "map_application_component_data_object". */
export type ApplicationComponentDataObjectMap_Order_By = {
  component?: InputMaybe<ApplicationComponent_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  dataObject?: InputMaybe<DataObject_Order_By>;
  dataObjectId?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  solutions_aggregate?: InputMaybe<SolutionDataObjectMap_Aggregate_Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

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
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "map_application_component_directory" */
export type ApplicationComponentDirectoryMap = {
  __typename?: 'ApplicationComponentDirectoryMap';
  /** An object relationship */
  component: ApplicationComponent;
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  directory: DirectoryObject;
  directoryId: Scalars['uuid']['output'];
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_application_component_directory" */
export type ApplicationComponentDirectoryMap_Aggregate = {
  __typename?: 'ApplicationComponentDirectoryMap_aggregate';
  aggregate?: Maybe<ApplicationComponentDirectoryMap_Aggregate_Fields>;
  nodes: Array<ApplicationComponentDirectoryMap>;
};

export type ApplicationComponentDirectoryMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<ApplicationComponentDirectoryMap_Aggregate_Bool_Exp_Count>;
};

export type ApplicationComponentDirectoryMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<ApplicationComponentDirectoryMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ApplicationComponentDirectoryMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_application_component_directory" */
export type ApplicationComponentDirectoryMap_Aggregate_Fields = {
  __typename?: 'ApplicationComponentDirectoryMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<ApplicationComponentDirectoryMap_Max_Fields>;
  min?: Maybe<ApplicationComponentDirectoryMap_Min_Fields>;
};


/** aggregate fields of "map_application_component_directory" */
export type ApplicationComponentDirectoryMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ApplicationComponentDirectoryMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_application_component_directory" */
export type ApplicationComponentDirectoryMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ApplicationComponentDirectoryMap_Max_Order_By>;
  min?: InputMaybe<ApplicationComponentDirectoryMap_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "map_application_component_directory". All fields are combined with a logical 'AND'. */
export type ApplicationComponentDirectoryMap_Bool_Exp = {
  _and?: InputMaybe<Array<ApplicationComponentDirectoryMap_Bool_Exp>>;
  _not?: InputMaybe<ApplicationComponentDirectoryMap_Bool_Exp>;
  _or?: InputMaybe<Array<ApplicationComponentDirectoryMap_Bool_Exp>>;
  component?: InputMaybe<ApplicationComponent_Bool_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  directory?: InputMaybe<DirectoryObject_Bool_Exp>;
  directoryId?: InputMaybe<Uuid_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type ApplicationComponentDirectoryMap_Max_Fields = {
  __typename?: 'ApplicationComponentDirectoryMap_max_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  directoryId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_application_component_directory" */
export type ApplicationComponentDirectoryMap_Max_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  directoryId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type ApplicationComponentDirectoryMap_Min_Fields = {
  __typename?: 'ApplicationComponentDirectoryMap_min_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  directoryId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_application_component_directory" */
export type ApplicationComponentDirectoryMap_Min_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  directoryId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "map_application_component_directory". */
export type ApplicationComponentDirectoryMap_Order_By = {
  component?: InputMaybe<ApplicationComponent_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  directory?: InputMaybe<DirectoryObject_Order_By>;
  directoryId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "map_application_component_directory" */
export enum ApplicationComponentDirectoryMap_Select_Column {
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
  DirectoryId = 'directoryId',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "ApplicationComponentDirectoryMap" */
export type ApplicationComponentDirectoryMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: ApplicationComponentDirectoryMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ApplicationComponentDirectoryMap_Stream_Cursor_Value_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  directoryId?: InputMaybe<Scalars['uuid']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
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
  event: Event;
  eventId: Scalars['uuid']['output'];
  tenantId: Scalars['uuid']['output'];
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
  event?: InputMaybe<Event_Bool_Exp>;
  eventId?: InputMaybe<Uuid_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "map_application_component_event". */
export type ApplicationComponentEventMap_Order_By = {
  component?: InputMaybe<ApplicationComponent_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  event?: InputMaybe<Event_Order_By>;
  eventId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

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
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "map_application_component_function" */
export type ApplicationComponentFunctionMap = {
  __typename?: 'ApplicationComponentFunctionMap';
  /** An object relationship */
  component: ApplicationComponent;
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  function: Function;
  functionId: Scalars['uuid']['output'];
  /** An array relationship */
  interfaces: Array<ApplicationFunctionInterfaceMap>;
  /** An aggregate relationship */
  interfaces_aggregate: ApplicationFunctionInterfaceMap_Aggregate;
  /** An array relationship */
  solutions: Array<SolutionApplicationFunctionMap>;
  /** An aggregate relationship */
  solutions_aggregate: SolutionApplicationFunctionMap_Aggregate;
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "map_application_component_function" */
export type ApplicationComponentFunctionMapInterfacesArgs = {
  distinct_on?: InputMaybe<Array<ApplicationFunctionInterfaceMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationFunctionInterfaceMap_Order_By>>;
  where?: InputMaybe<ApplicationFunctionInterfaceMap_Bool_Exp>;
};


/** columns and relationships of "map_application_component_function" */
export type ApplicationComponentFunctionMapInterfaces_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationFunctionInterfaceMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationFunctionInterfaceMap_Order_By>>;
  where?: InputMaybe<ApplicationFunctionInterfaceMap_Bool_Exp>;
};


/** columns and relationships of "map_application_component_function" */
export type ApplicationComponentFunctionMapSolutionsArgs = {
  distinct_on?: InputMaybe<Array<SolutionApplicationFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionApplicationFunctionMap_Order_By>>;
  where?: InputMaybe<SolutionApplicationFunctionMap_Bool_Exp>;
};


/** columns and relationships of "map_application_component_function" */
export type ApplicationComponentFunctionMapSolutions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionApplicationFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionApplicationFunctionMap_Order_By>>;
  where?: InputMaybe<SolutionApplicationFunctionMap_Bool_Exp>;
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

/** Boolean expression to filter rows from the table "map_application_component_function". All fields are combined with a logical 'AND'. */
export type ApplicationComponentFunctionMap_Bool_Exp = {
  _and?: InputMaybe<Array<ApplicationComponentFunctionMap_Bool_Exp>>;
  _not?: InputMaybe<ApplicationComponentFunctionMap_Bool_Exp>;
  _or?: InputMaybe<Array<ApplicationComponentFunctionMap_Bool_Exp>>;
  component?: InputMaybe<ApplicationComponent_Bool_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  function?: InputMaybe<Function_Bool_Exp>;
  functionId?: InputMaybe<Uuid_Comparison_Exp>;
  interfaces?: InputMaybe<ApplicationFunctionInterfaceMap_Bool_Exp>;
  interfaces_aggregate?: InputMaybe<ApplicationFunctionInterfaceMap_Aggregate_Bool_Exp>;
  solutions?: InputMaybe<SolutionApplicationFunctionMap_Bool_Exp>;
  solutions_aggregate?: InputMaybe<SolutionApplicationFunctionMap_Aggregate_Bool_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "map_application_component_function". */
export type ApplicationComponentFunctionMap_Order_By = {
  component?: InputMaybe<ApplicationComponent_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  function?: InputMaybe<Function_Order_By>;
  functionId?: InputMaybe<Order_By>;
  interfaces_aggregate?: InputMaybe<ApplicationFunctionInterfaceMap_Aggregate_Order_By>;
  solutions_aggregate?: InputMaybe<SolutionApplicationFunctionMap_Aggregate_Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

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
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "map_application_component_hierarchy" */
export type ApplicationComponentHierarchyMap = {
  __typename?: 'ApplicationComponentHierarchyMap';
  /** An object relationship */
  child: ApplicationComponent;
  componentChildId: Scalars['uuid']['output'];
  componentParentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  /** An object relationship */
  parent: ApplicationComponent;
  tenantId: Scalars['uuid']['output'];
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
  child?: InputMaybe<ApplicationComponent_Bool_Exp>;
  componentChildId?: InputMaybe<Uuid_Comparison_Exp>;
  componentParentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  order?: InputMaybe<Int_Comparison_Exp>;
  parent?: InputMaybe<ApplicationComponent_Bool_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "map_application_component_hierarchy". */
export type ApplicationComponentHierarchyMap_Order_By = {
  child?: InputMaybe<ApplicationComponent_Order_By>;
  componentChildId?: InputMaybe<Order_By>;
  componentParentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  parent?: InputMaybe<ApplicationComponent_Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

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
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
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
  interface: Interface;
  interfaceId: Scalars['uuid']['output'];
  tenantId: Scalars['uuid']['output'];
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
  interface?: InputMaybe<Interface_Bool_Exp>;
  interfaceId?: InputMaybe<Uuid_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "map_application_component_interface". */
export type ApplicationComponentInterfaceMap_Order_By = {
  component?: InputMaybe<ApplicationComponent_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  interface?: InputMaybe<Interface_Order_By>;
  interfaceId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

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
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
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
  tenantId: Scalars['uuid']['output'];
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
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

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
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
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
  role: Scalars['stakeholder_role_enum']['output'];
  /** An object relationship */
  stakeholder: Stakeholder;
  stakeholderId: Scalars['uuid']['output'];
  tenantId: Scalars['uuid']['output'];
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
  role?: InputMaybe<Stakeholder_Role_Enum_Comparison_Exp>;
  stakeholder?: InputMaybe<Stakeholder_Bool_Exp>;
  stakeholderId?: InputMaybe<Uuid_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type ApplicationComponentStakeholderMap_Max_Fields = {
  __typename?: 'ApplicationComponentStakeholderMap_max_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  role?: Maybe<Scalars['stakeholder_role_enum']['output']>;
  stakeholderId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  role?: InputMaybe<Order_By>;
  stakeholderId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
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
  role?: Maybe<Scalars['stakeholder_role_enum']['output']>;
  stakeholderId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  role?: InputMaybe<Order_By>;
  stakeholderId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "map_application_component_stakeholder". */
export type ApplicationComponentStakeholderMap_Order_By = {
  component?: InputMaybe<ApplicationComponent_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  stakeholder?: InputMaybe<Stakeholder_Order_By>;
  stakeholderId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  Role = 'role',
  /** column name */
  StakeholderId = 'stakeholderId',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

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
  role?: InputMaybe<Scalars['stakeholder_role_enum']['input']>;
  stakeholderId?: InputMaybe<Scalars['uuid']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
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
  tenantId: Scalars['uuid']['output'];
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
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

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
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
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
  tenantId: Scalars['uuid']['output'];
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
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

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
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
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
  tenantId: Scalars['uuid']['output'];
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
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

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
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregated selection of "components" */
export type ApplicationComponent_Aggregate = {
  __typename?: 'ApplicationComponent_aggregate';
  aggregate?: Maybe<ApplicationComponent_Aggregate_Fields>;
  nodes: Array<ApplicationComponent>;
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

/** Boolean expression to filter rows from the table "components". All fields are combined with a logical 'AND'. */
export type ApplicationComponent_Bool_Exp = {
  _and?: InputMaybe<Array<ApplicationComponent_Bool_Exp>>;
  _not?: InputMaybe<ApplicationComponent_Bool_Exp>;
  _or?: InputMaybe<Array<ApplicationComponent_Bool_Exp>>;
  actorRole?: InputMaybe<ApplicationComponentBusinessActorRoleMap_Bool_Exp>;
  actorRole_aggregate?: InputMaybe<ApplicationComponentBusinessActorRoleMap_Aggregate_Bool_Exp>;
  capabilities?: InputMaybe<CapabilityApplicationComponentMap_Bool_Exp>;
  capabilities_aggregate?: InputMaybe<CapabilityApplicationComponentMap_Aggregate_Bool_Exp>;
  children?: InputMaybe<ApplicationComponentHierarchyMap_Bool_Exp>;
  children_aggregate?: InputMaybe<ApplicationComponentHierarchyMap_Aggregate_Bool_Exp>;
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
  directories?: InputMaybe<ApplicationComponentDirectoryMap_Bool_Exp>;
  directories_aggregate?: InputMaybe<ApplicationComponentDirectoryMap_Aggregate_Bool_Exp>;
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
  parents?: InputMaybe<ApplicationComponentHierarchyMap_Bool_Exp>;
  parents_aggregate?: InputMaybe<ApplicationComponentHierarchyMap_Aggregate_Bool_Exp>;
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
  stakeholders?: InputMaybe<ApplicationComponentStakeholderMap_Bool_Exp>;
  stakeholders_aggregate?: InputMaybe<ApplicationComponentStakeholderMap_Aggregate_Bool_Exp>;
  state?: InputMaybe<DirectoryObject_Bool_Exp>;
  stateId?: InputMaybe<Uuid_Comparison_Exp>;
  style?: InputMaybe<DirectoryObject_Bool_Exp>;
  styleId?: InputMaybe<Uuid_Comparison_Exp>;
  systemSoftware?: InputMaybe<ApplicationComponentSystemSoftwareMap_Bool_Exp>;
  systemSoftware_aggregate?: InputMaybe<ApplicationComponentSystemSoftwareMap_Aggregate_Bool_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** Ordering options when selecting data from "components". */
export type ApplicationComponent_Order_By = {
  actorRole_aggregate?: InputMaybe<ApplicationComponentBusinessActorRoleMap_Aggregate_Order_By>;
  capabilities_aggregate?: InputMaybe<CapabilityApplicationComponentMap_Aggregate_Order_By>;
  children_aggregate?: InputMaybe<ApplicationComponentHierarchyMap_Aggregate_Order_By>;
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
  directories_aggregate?: InputMaybe<ApplicationComponentDirectoryMap_Aggregate_Order_By>;
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
  parents_aggregate?: InputMaybe<ApplicationComponentHierarchyMap_Aggregate_Order_By>;
  products_aggregate?: InputMaybe<ApplicationComponentProductMap_Aggregate_Order_By>;
  recoveryTime?: InputMaybe<DirectoryObject_Order_By>;
  recoveryTimeId?: InputMaybe<Order_By>;
  redundancyType?: InputMaybe<DirectoryObject_Order_By>;
  redundancyTypeId?: InputMaybe<Order_By>;
  scalingType?: InputMaybe<DirectoryObject_Order_By>;
  scalingTypeId?: InputMaybe<Order_By>;
  solutions_aggregate?: InputMaybe<SolutionApplicationComponentMap_Aggregate_Order_By>;
  stakeholders_aggregate?: InputMaybe<ApplicationComponentStakeholderMap_Aggregate_Order_By>;
  state?: InputMaybe<DirectoryObject_Order_By>;
  stateId?: InputMaybe<Order_By>;
  style?: InputMaybe<DirectoryObject_Order_By>;
  styleId?: InputMaybe<Order_By>;
  systemSoftware_aggregate?: InputMaybe<ApplicationComponentSystemSoftwareMap_Aggregate_Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

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
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
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
  tenantId: Scalars['uuid']['output'];
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
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

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
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "map_application_interface_function" */
export type ApplicationFunctionInterfaceMap = {
  __typename?: 'ApplicationFunctionInterfaceMap';
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  functionId: Scalars['uuid']['output'];
  /** An object relationship */
  interface: Interface;
  interfaceId: Scalars['uuid']['output'];
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_application_interface_function" */
export type ApplicationFunctionInterfaceMap_Aggregate = {
  __typename?: 'ApplicationFunctionInterfaceMap_aggregate';
  aggregate?: Maybe<ApplicationFunctionInterfaceMap_Aggregate_Fields>;
  nodes: Array<ApplicationFunctionInterfaceMap>;
};

export type ApplicationFunctionInterfaceMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<ApplicationFunctionInterfaceMap_Aggregate_Bool_Exp_Count>;
};

export type ApplicationFunctionInterfaceMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<ApplicationFunctionInterfaceMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ApplicationFunctionInterfaceMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_application_interface_function" */
export type ApplicationFunctionInterfaceMap_Aggregate_Fields = {
  __typename?: 'ApplicationFunctionInterfaceMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<ApplicationFunctionInterfaceMap_Max_Fields>;
  min?: Maybe<ApplicationFunctionInterfaceMap_Min_Fields>;
};


/** aggregate fields of "map_application_interface_function" */
export type ApplicationFunctionInterfaceMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ApplicationFunctionInterfaceMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_application_interface_function" */
export type ApplicationFunctionInterfaceMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ApplicationFunctionInterfaceMap_Max_Order_By>;
  min?: InputMaybe<ApplicationFunctionInterfaceMap_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "map_application_interface_function". All fields are combined with a logical 'AND'. */
export type ApplicationFunctionInterfaceMap_Bool_Exp = {
  _and?: InputMaybe<Array<ApplicationFunctionInterfaceMap_Bool_Exp>>;
  _not?: InputMaybe<ApplicationFunctionInterfaceMap_Bool_Exp>;
  _or?: InputMaybe<Array<ApplicationFunctionInterfaceMap_Bool_Exp>>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  functionId?: InputMaybe<Uuid_Comparison_Exp>;
  interface?: InputMaybe<Interface_Bool_Exp>;
  interfaceId?: InputMaybe<Uuid_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type ApplicationFunctionInterfaceMap_Max_Fields = {
  __typename?: 'ApplicationFunctionInterfaceMap_max_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  functionId?: Maybe<Scalars['uuid']['output']>;
  interfaceId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_application_interface_function" */
export type ApplicationFunctionInterfaceMap_Max_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  functionId?: InputMaybe<Order_By>;
  interfaceId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type ApplicationFunctionInterfaceMap_Min_Fields = {
  __typename?: 'ApplicationFunctionInterfaceMap_min_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  functionId?: Maybe<Scalars['uuid']['output']>;
  interfaceId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_application_interface_function" */
export type ApplicationFunctionInterfaceMap_Min_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  functionId?: InputMaybe<Order_By>;
  interfaceId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "map_application_interface_function". */
export type ApplicationFunctionInterfaceMap_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  functionId?: InputMaybe<Order_By>;
  interface?: InputMaybe<Interface_Order_By>;
  interfaceId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "map_application_interface_function" */
export enum ApplicationFunctionInterfaceMap_Select_Column {
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "ApplicationFunctionInterfaceMap" */
export type ApplicationFunctionInterfaceMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: ApplicationFunctionInterfaceMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ApplicationFunctionInterfaceMap_Stream_Cursor_Value_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  functionId?: InputMaybe<Scalars['uuid']['input']>;
  interfaceId?: InputMaybe<Scalars['uuid']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
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
  /** An array relationship */
  components: Array<ApplicationComponentBusinessActorRoleMap>;
  /** An aggregate relationship */
  components_aggregate: ApplicationComponentBusinessActorRoleMap_Aggregate;
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  role: Role;
  roleId: Scalars['uuid']['output'];
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "map_business_actor_role" */
export type BusinessActorRoleMapComponentsArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentBusinessActorRoleMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentBusinessActorRoleMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentBusinessActorRoleMap_Bool_Exp>;
};


/** columns and relationships of "map_business_actor_role" */
export type BusinessActorRoleMapComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentBusinessActorRoleMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentBusinessActorRoleMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentBusinessActorRoleMap_Bool_Exp>;
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

/** Boolean expression to filter rows from the table "map_business_actor_role". All fields are combined with a logical 'AND'. */
export type BusinessActorRoleMap_Bool_Exp = {
  _and?: InputMaybe<Array<BusinessActorRoleMap_Bool_Exp>>;
  _not?: InputMaybe<BusinessActorRoleMap_Bool_Exp>;
  _or?: InputMaybe<Array<BusinessActorRoleMap_Bool_Exp>>;
  actor?: InputMaybe<BusinessActor_Bool_Exp>;
  actorId?: InputMaybe<Uuid_Comparison_Exp>;
  components?: InputMaybe<ApplicationComponentBusinessActorRoleMap_Bool_Exp>;
  components_aggregate?: InputMaybe<ApplicationComponentBusinessActorRoleMap_Aggregate_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  role?: InputMaybe<Role_Bool_Exp>;
  roleId?: InputMaybe<Uuid_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "map_business_actor_role". */
export type BusinessActorRoleMap_Order_By = {
  actor?: InputMaybe<BusinessActor_Order_By>;
  actorId?: InputMaybe<Order_By>;
  components_aggregate?: InputMaybe<ApplicationComponentBusinessActorRoleMap_Aggregate_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  role?: InputMaybe<Role_Order_By>;
  roleId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

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
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
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

/** columns and relationships of "map_business_process_function" */
export type BusinessProcessFunctionMap = {
  __typename?: 'BusinessProcessFunctionMap';
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  function: Function;
  functionId: Scalars['uuid']['output'];
  /** An object relationship */
  process: Process;
  processId: Scalars['uuid']['output'];
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_business_process_function" */
export type BusinessProcessFunctionMap_Aggregate = {
  __typename?: 'BusinessProcessFunctionMap_aggregate';
  aggregate?: Maybe<BusinessProcessFunctionMap_Aggregate_Fields>;
  nodes: Array<BusinessProcessFunctionMap>;
};

export type BusinessProcessFunctionMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<BusinessProcessFunctionMap_Aggregate_Bool_Exp_Count>;
};

export type BusinessProcessFunctionMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<BusinessProcessFunctionMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<BusinessProcessFunctionMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_business_process_function" */
export type BusinessProcessFunctionMap_Aggregate_Fields = {
  __typename?: 'BusinessProcessFunctionMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<BusinessProcessFunctionMap_Max_Fields>;
  min?: Maybe<BusinessProcessFunctionMap_Min_Fields>;
};


/** aggregate fields of "map_business_process_function" */
export type BusinessProcessFunctionMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<BusinessProcessFunctionMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_business_process_function" */
export type BusinessProcessFunctionMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<BusinessProcessFunctionMap_Max_Order_By>;
  min?: InputMaybe<BusinessProcessFunctionMap_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "map_business_process_function". All fields are combined with a logical 'AND'. */
export type BusinessProcessFunctionMap_Bool_Exp = {
  _and?: InputMaybe<Array<BusinessProcessFunctionMap_Bool_Exp>>;
  _not?: InputMaybe<BusinessProcessFunctionMap_Bool_Exp>;
  _or?: InputMaybe<Array<BusinessProcessFunctionMap_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  function?: InputMaybe<Function_Bool_Exp>;
  functionId?: InputMaybe<Uuid_Comparison_Exp>;
  process?: InputMaybe<Process_Bool_Exp>;
  processId?: InputMaybe<Uuid_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type BusinessProcessFunctionMap_Max_Fields = {
  __typename?: 'BusinessProcessFunctionMap_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  functionId?: Maybe<Scalars['uuid']['output']>;
  processId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_business_process_function" */
export type BusinessProcessFunctionMap_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  functionId?: InputMaybe<Order_By>;
  processId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type BusinessProcessFunctionMap_Min_Fields = {
  __typename?: 'BusinessProcessFunctionMap_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  functionId?: Maybe<Scalars['uuid']['output']>;
  processId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_business_process_function" */
export type BusinessProcessFunctionMap_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  functionId?: InputMaybe<Order_By>;
  processId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "map_business_process_function". */
export type BusinessProcessFunctionMap_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  function?: InputMaybe<Function_Order_By>;
  functionId?: InputMaybe<Order_By>;
  process?: InputMaybe<Process_Order_By>;
  processId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "map_business_process_function" */
export enum BusinessProcessFunctionMap_Select_Column {
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
  ProcessId = 'processId',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "BusinessProcessFunctionMap" */
export type BusinessProcessFunctionMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: BusinessProcessFunctionMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BusinessProcessFunctionMap_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  functionId?: InputMaybe<Scalars['uuid']['input']>;
  processId?: InputMaybe<Scalars['uuid']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "map_business_process_hierarchy" */
export type BusinessProcessHierarchyMap = {
  __typename?: 'BusinessProcessHierarchyMap';
  /** An object relationship */
  child: Process;
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  parent: Process;
  processChildId: Scalars['uuid']['output'];
  processParentId: Scalars['uuid']['output'];
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_business_process_hierarchy" */
export type BusinessProcessHierarchyMap_Aggregate = {
  __typename?: 'BusinessProcessHierarchyMap_aggregate';
  aggregate?: Maybe<BusinessProcessHierarchyMap_Aggregate_Fields>;
  nodes: Array<BusinessProcessHierarchyMap>;
};

export type BusinessProcessHierarchyMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<BusinessProcessHierarchyMap_Aggregate_Bool_Exp_Count>;
};

export type BusinessProcessHierarchyMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<BusinessProcessHierarchyMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<BusinessProcessHierarchyMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_business_process_hierarchy" */
export type BusinessProcessHierarchyMap_Aggregate_Fields = {
  __typename?: 'BusinessProcessHierarchyMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<BusinessProcessHierarchyMap_Max_Fields>;
  min?: Maybe<BusinessProcessHierarchyMap_Min_Fields>;
};


/** aggregate fields of "map_business_process_hierarchy" */
export type BusinessProcessHierarchyMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<BusinessProcessHierarchyMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_business_process_hierarchy" */
export type BusinessProcessHierarchyMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<BusinessProcessHierarchyMap_Max_Order_By>;
  min?: InputMaybe<BusinessProcessHierarchyMap_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "map_business_process_hierarchy". All fields are combined with a logical 'AND'. */
export type BusinessProcessHierarchyMap_Bool_Exp = {
  _and?: InputMaybe<Array<BusinessProcessHierarchyMap_Bool_Exp>>;
  _not?: InputMaybe<BusinessProcessHierarchyMap_Bool_Exp>;
  _or?: InputMaybe<Array<BusinessProcessHierarchyMap_Bool_Exp>>;
  child?: InputMaybe<Process_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  parent?: InputMaybe<Process_Bool_Exp>;
  processChildId?: InputMaybe<Uuid_Comparison_Exp>;
  processParentId?: InputMaybe<Uuid_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type BusinessProcessHierarchyMap_Max_Fields = {
  __typename?: 'BusinessProcessHierarchyMap_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  processChildId?: Maybe<Scalars['uuid']['output']>;
  processParentId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_business_process_hierarchy" */
export type BusinessProcessHierarchyMap_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  processChildId?: InputMaybe<Order_By>;
  processParentId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type BusinessProcessHierarchyMap_Min_Fields = {
  __typename?: 'BusinessProcessHierarchyMap_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  processChildId?: Maybe<Scalars['uuid']['output']>;
  processParentId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_business_process_hierarchy" */
export type BusinessProcessHierarchyMap_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  processChildId?: InputMaybe<Order_By>;
  processParentId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "map_business_process_hierarchy". */
export type BusinessProcessHierarchyMap_Order_By = {
  child?: InputMaybe<Process_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  parent?: InputMaybe<Process_Order_By>;
  processChildId?: InputMaybe<Order_By>;
  processParentId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "map_business_process_hierarchy" */
export enum BusinessProcessHierarchyMap_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  ProcessChildId = 'processChildId',
  /** column name */
  ProcessParentId = 'processParentId',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "BusinessProcessHierarchyMap" */
export type BusinessProcessHierarchyMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: BusinessProcessHierarchyMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BusinessProcessHierarchyMap_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  processChildId?: InputMaybe<Scalars['uuid']['input']>;
  processParentId?: InputMaybe<Scalars['uuid']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "map_business_process_motivation_item" */
export type BusinessProcessMotivationItemMap = {
  __typename?: 'BusinessProcessMotivationItemMap';
  /** An object relationship */
  assessment: MotivationElementGeneric;
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  motivationId: Scalars['uuid']['output'];
  /** An object relationship */
  process: Process;
  processId: Scalars['uuid']['output'];
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_business_process_motivation_item" */
export type BusinessProcessMotivationItemMap_Aggregate = {
  __typename?: 'BusinessProcessMotivationItemMap_aggregate';
  aggregate?: Maybe<BusinessProcessMotivationItemMap_Aggregate_Fields>;
  nodes: Array<BusinessProcessMotivationItemMap>;
};

export type BusinessProcessMotivationItemMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<BusinessProcessMotivationItemMap_Aggregate_Bool_Exp_Count>;
};

export type BusinessProcessMotivationItemMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<BusinessProcessMotivationItemMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<BusinessProcessMotivationItemMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_business_process_motivation_item" */
export type BusinessProcessMotivationItemMap_Aggregate_Fields = {
  __typename?: 'BusinessProcessMotivationItemMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<BusinessProcessMotivationItemMap_Max_Fields>;
  min?: Maybe<BusinessProcessMotivationItemMap_Min_Fields>;
};


/** aggregate fields of "map_business_process_motivation_item" */
export type BusinessProcessMotivationItemMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<BusinessProcessMotivationItemMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_business_process_motivation_item" */
export type BusinessProcessMotivationItemMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<BusinessProcessMotivationItemMap_Max_Order_By>;
  min?: InputMaybe<BusinessProcessMotivationItemMap_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "map_business_process_motivation_item". All fields are combined with a logical 'AND'. */
export type BusinessProcessMotivationItemMap_Bool_Exp = {
  _and?: InputMaybe<Array<BusinessProcessMotivationItemMap_Bool_Exp>>;
  _not?: InputMaybe<BusinessProcessMotivationItemMap_Bool_Exp>;
  _or?: InputMaybe<Array<BusinessProcessMotivationItemMap_Bool_Exp>>;
  assessment?: InputMaybe<MotivationElementGeneric_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  motivationId?: InputMaybe<Uuid_Comparison_Exp>;
  process?: InputMaybe<Process_Bool_Exp>;
  processId?: InputMaybe<Uuid_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type BusinessProcessMotivationItemMap_Max_Fields = {
  __typename?: 'BusinessProcessMotivationItemMap_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  motivationId?: Maybe<Scalars['uuid']['output']>;
  processId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_business_process_motivation_item" */
export type BusinessProcessMotivationItemMap_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  motivationId?: InputMaybe<Order_By>;
  processId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type BusinessProcessMotivationItemMap_Min_Fields = {
  __typename?: 'BusinessProcessMotivationItemMap_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  motivationId?: Maybe<Scalars['uuid']['output']>;
  processId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_business_process_motivation_item" */
export type BusinessProcessMotivationItemMap_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  motivationId?: InputMaybe<Order_By>;
  processId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "map_business_process_motivation_item". */
export type BusinessProcessMotivationItemMap_Order_By = {
  assessment?: InputMaybe<MotivationElementGeneric_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  motivationId?: InputMaybe<Order_By>;
  process?: InputMaybe<Process_Order_By>;
  processId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "map_business_process_motivation_item" */
export enum BusinessProcessMotivationItemMap_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  MotivationId = 'motivationId',
  /** column name */
  ProcessId = 'processId',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "BusinessProcessMotivationItemMap" */
export type BusinessProcessMotivationItemMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: BusinessProcessMotivationItemMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BusinessProcessMotivationItemMap_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  motivationId?: InputMaybe<Scalars['uuid']['input']>;
  processId?: InputMaybe<Scalars['uuid']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
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
  /** An array relationship */
  products: Array<ApplicationComponentProductMap>;
  /** An aggregate relationship */
  products_aggregate: ApplicationComponentProductMap_Aggregate;
  tenantId: Scalars['uuid']['output'];
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
  products?: InputMaybe<ApplicationComponentProductMap_Bool_Exp>;
  products_aggregate?: InputMaybe<ApplicationComponentProductMap_Aggregate_Bool_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
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
  products_aggregate?: InputMaybe<ApplicationComponentProductMap_Aggregate_Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

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
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "capabilities" */
export type Capability = {
  __typename?: 'Capability';
  /** An array relationship */
  children: Array<CapabilityHierarchyMap>;
  /** An aggregate relationship */
  children_aggregate: CapabilityHierarchyMap_Aggregate;
  code: Scalars['String']['output'];
  /** An array relationship */
  components: Array<CapabilityApplicationComponentMap>;
  /** An aggregate relationship */
  components_aggregate: CapabilityApplicationComponentMap_Aggregate;
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
  /** An array relationship */
  parents: Array<CapabilityHierarchyMap>;
  /** An aggregate relationship */
  parents_aggregate: CapabilityHierarchyMap_Aggregate;
  /** An array relationship */
  processes: Array<CapabilityBusinessProcessMap>;
  /** An aggregate relationship */
  processes_aggregate: CapabilityBusinessProcessMap_Aggregate;
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "capabilities" */
export type CapabilityChildrenArgs = {
  distinct_on?: InputMaybe<Array<CapabilityHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityHierarchyMap_Order_By>>;
  where?: InputMaybe<CapabilityHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "capabilities" */
export type CapabilityChildren_AggregateArgs = {
  distinct_on?: InputMaybe<Array<CapabilityHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityHierarchyMap_Order_By>>;
  where?: InputMaybe<CapabilityHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "capabilities" */
export type CapabilityComponentsArgs = {
  distinct_on?: InputMaybe<Array<CapabilityApplicationComponentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityApplicationComponentMap_Order_By>>;
  where?: InputMaybe<CapabilityApplicationComponentMap_Bool_Exp>;
};


/** columns and relationships of "capabilities" */
export type CapabilityComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<CapabilityApplicationComponentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityApplicationComponentMap_Order_By>>;
  where?: InputMaybe<CapabilityApplicationComponentMap_Bool_Exp>;
};


/** columns and relationships of "capabilities" */
export type CapabilityParentsArgs = {
  distinct_on?: InputMaybe<Array<CapabilityHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityHierarchyMap_Order_By>>;
  where?: InputMaybe<CapabilityHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "capabilities" */
export type CapabilityParents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<CapabilityHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityHierarchyMap_Order_By>>;
  where?: InputMaybe<CapabilityHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "capabilities" */
export type CapabilityProcessesArgs = {
  distinct_on?: InputMaybe<Array<CapabilityBusinessProcessMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityBusinessProcessMap_Order_By>>;
  where?: InputMaybe<CapabilityBusinessProcessMap_Bool_Exp>;
};


/** columns and relationships of "capabilities" */
export type CapabilityProcesses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<CapabilityBusinessProcessMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityBusinessProcessMap_Order_By>>;
  where?: InputMaybe<CapabilityBusinessProcessMap_Bool_Exp>;
};

/** columns and relationships of "map_capability_application_component_assessment" */
export type CapabilityApplicationComponentAssessmentMap = {
  __typename?: 'CapabilityApplicationComponentAssessmentMap';
  /** An object relationship */
  assessment: MotivationElementGeneric;
  assessmentId: Scalars['uuid']['output'];
  capabilityId: Scalars['uuid']['output'];
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_capability_application_component_assessment" */
export type CapabilityApplicationComponentAssessmentMap_Aggregate = {
  __typename?: 'CapabilityApplicationComponentAssessmentMap_aggregate';
  aggregate?: Maybe<CapabilityApplicationComponentAssessmentMap_Aggregate_Fields>;
  nodes: Array<CapabilityApplicationComponentAssessmentMap>;
};

/** aggregate fields of "map_capability_application_component_assessment" */
export type CapabilityApplicationComponentAssessmentMap_Aggregate_Fields = {
  __typename?: 'CapabilityApplicationComponentAssessmentMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<CapabilityApplicationComponentAssessmentMap_Max_Fields>;
  min?: Maybe<CapabilityApplicationComponentAssessmentMap_Min_Fields>;
};


/** aggregate fields of "map_capability_application_component_assessment" */
export type CapabilityApplicationComponentAssessmentMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<CapabilityApplicationComponentAssessmentMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "map_capability_application_component_assessment". All fields are combined with a logical 'AND'. */
export type CapabilityApplicationComponentAssessmentMap_Bool_Exp = {
  _and?: InputMaybe<Array<CapabilityApplicationComponentAssessmentMap_Bool_Exp>>;
  _not?: InputMaybe<CapabilityApplicationComponentAssessmentMap_Bool_Exp>;
  _or?: InputMaybe<Array<CapabilityApplicationComponentAssessmentMap_Bool_Exp>>;
  assessment?: InputMaybe<MotivationElementGeneric_Bool_Exp>;
  assessmentId?: InputMaybe<Uuid_Comparison_Exp>;
  capabilityId?: InputMaybe<Uuid_Comparison_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type CapabilityApplicationComponentAssessmentMap_Max_Fields = {
  __typename?: 'CapabilityApplicationComponentAssessmentMap_max_fields';
  assessmentId?: Maybe<Scalars['uuid']['output']>;
  capabilityId?: Maybe<Scalars['uuid']['output']>;
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type CapabilityApplicationComponentAssessmentMap_Min_Fields = {
  __typename?: 'CapabilityApplicationComponentAssessmentMap_min_fields';
  assessmentId?: Maybe<Scalars['uuid']['output']>;
  capabilityId?: Maybe<Scalars['uuid']['output']>;
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** Ordering options when selecting data from "map_capability_application_component_assessment". */
export type CapabilityApplicationComponentAssessmentMap_Order_By = {
  assessment?: InputMaybe<MotivationElementGeneric_Order_By>;
  assessmentId?: InputMaybe<Order_By>;
  capabilityId?: InputMaybe<Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "map_capability_application_component_assessment" */
export enum CapabilityApplicationComponentAssessmentMap_Select_Column {
  /** column name */
  AssessmentId = 'assessmentId',
  /** column name */
  CapabilityId = 'capabilityId',
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "CapabilityApplicationComponentAssessmentMap" */
export type CapabilityApplicationComponentAssessmentMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: CapabilityApplicationComponentAssessmentMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type CapabilityApplicationComponentAssessmentMap_Stream_Cursor_Value_Input = {
  assessmentId?: InputMaybe<Scalars['uuid']['input']>;
  capabilityId?: InputMaybe<Scalars['uuid']['input']>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "map_capability_application_component" */
export type CapabilityApplicationComponentMap = {
  __typename?: 'CapabilityApplicationComponentMap';
  /** An object relationship */
  capability: Capability;
  capabilityId: Scalars['uuid']['output'];
  /** An object relationship */
  component: ApplicationComponent;
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_capability_application_component" */
export type CapabilityApplicationComponentMap_Aggregate = {
  __typename?: 'CapabilityApplicationComponentMap_aggregate';
  aggregate?: Maybe<CapabilityApplicationComponentMap_Aggregate_Fields>;
  nodes: Array<CapabilityApplicationComponentMap>;
};

export type CapabilityApplicationComponentMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<CapabilityApplicationComponentMap_Aggregate_Bool_Exp_Count>;
};

export type CapabilityApplicationComponentMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<CapabilityApplicationComponentMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CapabilityApplicationComponentMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_capability_application_component" */
export type CapabilityApplicationComponentMap_Aggregate_Fields = {
  __typename?: 'CapabilityApplicationComponentMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<CapabilityApplicationComponentMap_Max_Fields>;
  min?: Maybe<CapabilityApplicationComponentMap_Min_Fields>;
};


/** aggregate fields of "map_capability_application_component" */
export type CapabilityApplicationComponentMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<CapabilityApplicationComponentMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_capability_application_component" */
export type CapabilityApplicationComponentMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<CapabilityApplicationComponentMap_Max_Order_By>;
  min?: InputMaybe<CapabilityApplicationComponentMap_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "map_capability_application_component". All fields are combined with a logical 'AND'. */
export type CapabilityApplicationComponentMap_Bool_Exp = {
  _and?: InputMaybe<Array<CapabilityApplicationComponentMap_Bool_Exp>>;
  _not?: InputMaybe<CapabilityApplicationComponentMap_Bool_Exp>;
  _or?: InputMaybe<Array<CapabilityApplicationComponentMap_Bool_Exp>>;
  capability?: InputMaybe<Capability_Bool_Exp>;
  capabilityId?: InputMaybe<Uuid_Comparison_Exp>;
  component?: InputMaybe<ApplicationComponent_Bool_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type CapabilityApplicationComponentMap_Max_Fields = {
  __typename?: 'CapabilityApplicationComponentMap_max_fields';
  capabilityId?: Maybe<Scalars['uuid']['output']>;
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_capability_application_component" */
export type CapabilityApplicationComponentMap_Max_Order_By = {
  capabilityId?: InputMaybe<Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type CapabilityApplicationComponentMap_Min_Fields = {
  __typename?: 'CapabilityApplicationComponentMap_min_fields';
  capabilityId?: Maybe<Scalars['uuid']['output']>;
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_capability_application_component" */
export type CapabilityApplicationComponentMap_Min_Order_By = {
  capabilityId?: InputMaybe<Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "map_capability_application_component". */
export type CapabilityApplicationComponentMap_Order_By = {
  capability?: InputMaybe<Capability_Order_By>;
  capabilityId?: InputMaybe<Order_By>;
  component?: InputMaybe<ApplicationComponent_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "map_capability_application_component" */
export enum CapabilityApplicationComponentMap_Select_Column {
  /** column name */
  CapabilityId = 'capabilityId',
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "CapabilityApplicationComponentMap" */
export type CapabilityApplicationComponentMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: CapabilityApplicationComponentMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type CapabilityApplicationComponentMap_Stream_Cursor_Value_Input = {
  capabilityId?: InputMaybe<Scalars['uuid']['input']>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "map_capability_business_process_assessment" */
export type CapabilityBusinessProcessAssessmentMap = {
  __typename?: 'CapabilityBusinessProcessAssessmentMap';
  /** An object relationship */
  assessment: MotivationElementGeneric;
  assessmentId: Scalars['uuid']['output'];
  capabilityId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  processId: Scalars['uuid']['output'];
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_capability_business_process_assessment" */
export type CapabilityBusinessProcessAssessmentMap_Aggregate = {
  __typename?: 'CapabilityBusinessProcessAssessmentMap_aggregate';
  aggregate?: Maybe<CapabilityBusinessProcessAssessmentMap_Aggregate_Fields>;
  nodes: Array<CapabilityBusinessProcessAssessmentMap>;
};

/** aggregate fields of "map_capability_business_process_assessment" */
export type CapabilityBusinessProcessAssessmentMap_Aggregate_Fields = {
  __typename?: 'CapabilityBusinessProcessAssessmentMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<CapabilityBusinessProcessAssessmentMap_Max_Fields>;
  min?: Maybe<CapabilityBusinessProcessAssessmentMap_Min_Fields>;
};


/** aggregate fields of "map_capability_business_process_assessment" */
export type CapabilityBusinessProcessAssessmentMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<CapabilityBusinessProcessAssessmentMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "map_capability_business_process_assessment". All fields are combined with a logical 'AND'. */
export type CapabilityBusinessProcessAssessmentMap_Bool_Exp = {
  _and?: InputMaybe<Array<CapabilityBusinessProcessAssessmentMap_Bool_Exp>>;
  _not?: InputMaybe<CapabilityBusinessProcessAssessmentMap_Bool_Exp>;
  _or?: InputMaybe<Array<CapabilityBusinessProcessAssessmentMap_Bool_Exp>>;
  assessment?: InputMaybe<MotivationElementGeneric_Bool_Exp>;
  assessmentId?: InputMaybe<Uuid_Comparison_Exp>;
  capabilityId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  processId?: InputMaybe<Uuid_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type CapabilityBusinessProcessAssessmentMap_Max_Fields = {
  __typename?: 'CapabilityBusinessProcessAssessmentMap_max_fields';
  assessmentId?: Maybe<Scalars['uuid']['output']>;
  capabilityId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  processId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type CapabilityBusinessProcessAssessmentMap_Min_Fields = {
  __typename?: 'CapabilityBusinessProcessAssessmentMap_min_fields';
  assessmentId?: Maybe<Scalars['uuid']['output']>;
  capabilityId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  processId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** Ordering options when selecting data from "map_capability_business_process_assessment". */
export type CapabilityBusinessProcessAssessmentMap_Order_By = {
  assessment?: InputMaybe<MotivationElementGeneric_Order_By>;
  assessmentId?: InputMaybe<Order_By>;
  capabilityId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  processId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "map_capability_business_process_assessment" */
export enum CapabilityBusinessProcessAssessmentMap_Select_Column {
  /** column name */
  AssessmentId = 'assessmentId',
  /** column name */
  CapabilityId = 'capabilityId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  ProcessId = 'processId',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "CapabilityBusinessProcessAssessmentMap" */
export type CapabilityBusinessProcessAssessmentMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: CapabilityBusinessProcessAssessmentMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type CapabilityBusinessProcessAssessmentMap_Stream_Cursor_Value_Input = {
  assessmentId?: InputMaybe<Scalars['uuid']['input']>;
  capabilityId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  processId?: InputMaybe<Scalars['uuid']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "map_capability_business_process" */
export type CapabilityBusinessProcessMap = {
  __typename?: 'CapabilityBusinessProcessMap';
  /** An object relationship */
  capability: Capability;
  capabilityId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  process: Process;
  processId: Scalars['uuid']['output'];
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_capability_business_process" */
export type CapabilityBusinessProcessMap_Aggregate = {
  __typename?: 'CapabilityBusinessProcessMap_aggregate';
  aggregate?: Maybe<CapabilityBusinessProcessMap_Aggregate_Fields>;
  nodes: Array<CapabilityBusinessProcessMap>;
};

export type CapabilityBusinessProcessMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<CapabilityBusinessProcessMap_Aggregate_Bool_Exp_Count>;
};

export type CapabilityBusinessProcessMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<CapabilityBusinessProcessMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CapabilityBusinessProcessMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_capability_business_process" */
export type CapabilityBusinessProcessMap_Aggregate_Fields = {
  __typename?: 'CapabilityBusinessProcessMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<CapabilityBusinessProcessMap_Max_Fields>;
  min?: Maybe<CapabilityBusinessProcessMap_Min_Fields>;
};


/** aggregate fields of "map_capability_business_process" */
export type CapabilityBusinessProcessMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<CapabilityBusinessProcessMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_capability_business_process" */
export type CapabilityBusinessProcessMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<CapabilityBusinessProcessMap_Max_Order_By>;
  min?: InputMaybe<CapabilityBusinessProcessMap_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "map_capability_business_process". All fields are combined with a logical 'AND'. */
export type CapabilityBusinessProcessMap_Bool_Exp = {
  _and?: InputMaybe<Array<CapabilityBusinessProcessMap_Bool_Exp>>;
  _not?: InputMaybe<CapabilityBusinessProcessMap_Bool_Exp>;
  _or?: InputMaybe<Array<CapabilityBusinessProcessMap_Bool_Exp>>;
  capability?: InputMaybe<Capability_Bool_Exp>;
  capabilityId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  process?: InputMaybe<Process_Bool_Exp>;
  processId?: InputMaybe<Uuid_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type CapabilityBusinessProcessMap_Max_Fields = {
  __typename?: 'CapabilityBusinessProcessMap_max_fields';
  capabilityId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  processId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_capability_business_process" */
export type CapabilityBusinessProcessMap_Max_Order_By = {
  capabilityId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  processId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type CapabilityBusinessProcessMap_Min_Fields = {
  __typename?: 'CapabilityBusinessProcessMap_min_fields';
  capabilityId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  processId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_capability_business_process" */
export type CapabilityBusinessProcessMap_Min_Order_By = {
  capabilityId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  processId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "map_capability_business_process". */
export type CapabilityBusinessProcessMap_Order_By = {
  capability?: InputMaybe<Capability_Order_By>;
  capabilityId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  process?: InputMaybe<Process_Order_By>;
  processId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "map_capability_business_process" */
export enum CapabilityBusinessProcessMap_Select_Column {
  /** column name */
  CapabilityId = 'capabilityId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  ProcessId = 'processId',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "CapabilityBusinessProcessMap" */
export type CapabilityBusinessProcessMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: CapabilityBusinessProcessMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type CapabilityBusinessProcessMap_Stream_Cursor_Value_Input = {
  capabilityId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  processId?: InputMaybe<Scalars['uuid']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "map_capability_hierarchy" */
export type CapabilityHierarchyMap = {
  __typename?: 'CapabilityHierarchyMap';
  /** An object relationship */
  child: Capability;
  childId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  /** An object relationship */
  parent: Capability;
  parentId: Scalars['uuid']['output'];
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_capability_hierarchy" */
export type CapabilityHierarchyMap_Aggregate = {
  __typename?: 'CapabilityHierarchyMap_aggregate';
  aggregate?: Maybe<CapabilityHierarchyMap_Aggregate_Fields>;
  nodes: Array<CapabilityHierarchyMap>;
};

export type CapabilityHierarchyMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<CapabilityHierarchyMap_Aggregate_Bool_Exp_Count>;
};

export type CapabilityHierarchyMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<CapabilityHierarchyMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CapabilityHierarchyMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_capability_hierarchy" */
export type CapabilityHierarchyMap_Aggregate_Fields = {
  __typename?: 'CapabilityHierarchyMap_aggregate_fields';
  avg?: Maybe<CapabilityHierarchyMap_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<CapabilityHierarchyMap_Max_Fields>;
  min?: Maybe<CapabilityHierarchyMap_Min_Fields>;
  stddev?: Maybe<CapabilityHierarchyMap_Stddev_Fields>;
  stddev_pop?: Maybe<CapabilityHierarchyMap_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<CapabilityHierarchyMap_Stddev_Samp_Fields>;
  sum?: Maybe<CapabilityHierarchyMap_Sum_Fields>;
  var_pop?: Maybe<CapabilityHierarchyMap_Var_Pop_Fields>;
  var_samp?: Maybe<CapabilityHierarchyMap_Var_Samp_Fields>;
  variance?: Maybe<CapabilityHierarchyMap_Variance_Fields>;
};


/** aggregate fields of "map_capability_hierarchy" */
export type CapabilityHierarchyMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<CapabilityHierarchyMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_capability_hierarchy" */
export type CapabilityHierarchyMap_Aggregate_Order_By = {
  avg?: InputMaybe<CapabilityHierarchyMap_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<CapabilityHierarchyMap_Max_Order_By>;
  min?: InputMaybe<CapabilityHierarchyMap_Min_Order_By>;
  stddev?: InputMaybe<CapabilityHierarchyMap_Stddev_Order_By>;
  stddev_pop?: InputMaybe<CapabilityHierarchyMap_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<CapabilityHierarchyMap_Stddev_Samp_Order_By>;
  sum?: InputMaybe<CapabilityHierarchyMap_Sum_Order_By>;
  var_pop?: InputMaybe<CapabilityHierarchyMap_Var_Pop_Order_By>;
  var_samp?: InputMaybe<CapabilityHierarchyMap_Var_Samp_Order_By>;
  variance?: InputMaybe<CapabilityHierarchyMap_Variance_Order_By>;
};

/** aggregate avg on columns */
export type CapabilityHierarchyMap_Avg_Fields = {
  __typename?: 'CapabilityHierarchyMap_avg_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "map_capability_hierarchy" */
export type CapabilityHierarchyMap_Avg_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "map_capability_hierarchy". All fields are combined with a logical 'AND'. */
export type CapabilityHierarchyMap_Bool_Exp = {
  _and?: InputMaybe<Array<CapabilityHierarchyMap_Bool_Exp>>;
  _not?: InputMaybe<CapabilityHierarchyMap_Bool_Exp>;
  _or?: InputMaybe<Array<CapabilityHierarchyMap_Bool_Exp>>;
  child?: InputMaybe<Capability_Bool_Exp>;
  childId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  order?: InputMaybe<Int_Comparison_Exp>;
  parent?: InputMaybe<Capability_Bool_Exp>;
  parentId?: InputMaybe<Uuid_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type CapabilityHierarchyMap_Max_Fields = {
  __typename?: 'CapabilityHierarchyMap_max_fields';
  childId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  parentId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_capability_hierarchy" */
export type CapabilityHierarchyMap_Max_Order_By = {
  childId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  parentId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type CapabilityHierarchyMap_Min_Fields = {
  __typename?: 'CapabilityHierarchyMap_min_fields';
  childId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  parentId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_capability_hierarchy" */
export type CapabilityHierarchyMap_Min_Order_By = {
  childId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  parentId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "map_capability_hierarchy". */
export type CapabilityHierarchyMap_Order_By = {
  child?: InputMaybe<Capability_Order_By>;
  childId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  parent?: InputMaybe<Capability_Order_By>;
  parentId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "map_capability_hierarchy" */
export enum CapabilityHierarchyMap_Select_Column {
  /** column name */
  ChildId = 'childId',
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
  ParentId = 'parentId',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** aggregate stddev on columns */
export type CapabilityHierarchyMap_Stddev_Fields = {
  __typename?: 'CapabilityHierarchyMap_stddev_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "map_capability_hierarchy" */
export type CapabilityHierarchyMap_Stddev_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type CapabilityHierarchyMap_Stddev_Pop_Fields = {
  __typename?: 'CapabilityHierarchyMap_stddev_pop_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "map_capability_hierarchy" */
export type CapabilityHierarchyMap_Stddev_Pop_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type CapabilityHierarchyMap_Stddev_Samp_Fields = {
  __typename?: 'CapabilityHierarchyMap_stddev_samp_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "map_capability_hierarchy" */
export type CapabilityHierarchyMap_Stddev_Samp_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "CapabilityHierarchyMap" */
export type CapabilityHierarchyMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: CapabilityHierarchyMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type CapabilityHierarchyMap_Stream_Cursor_Value_Input = {
  childId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  parentId?: InputMaybe<Scalars['uuid']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type CapabilityHierarchyMap_Sum_Fields = {
  __typename?: 'CapabilityHierarchyMap_sum_fields';
  order?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "map_capability_hierarchy" */
export type CapabilityHierarchyMap_Sum_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type CapabilityHierarchyMap_Var_Pop_Fields = {
  __typename?: 'CapabilityHierarchyMap_var_pop_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "map_capability_hierarchy" */
export type CapabilityHierarchyMap_Var_Pop_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type CapabilityHierarchyMap_Var_Samp_Fields = {
  __typename?: 'CapabilityHierarchyMap_var_samp_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "map_capability_hierarchy" */
export type CapabilityHierarchyMap_Var_Samp_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type CapabilityHierarchyMap_Variance_Fields = {
  __typename?: 'CapabilityHierarchyMap_variance_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "map_capability_hierarchy" */
export type CapabilityHierarchyMap_Variance_Order_By = {
  order?: InputMaybe<Order_By>;
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
  children?: InputMaybe<CapabilityHierarchyMap_Bool_Exp>;
  children_aggregate?: InputMaybe<CapabilityHierarchyMap_Aggregate_Bool_Exp>;
  code?: InputMaybe<String_Comparison_Exp>;
  components?: InputMaybe<CapabilityApplicationComponentMap_Bool_Exp>;
  components_aggregate?: InputMaybe<CapabilityApplicationComponentMap_Aggregate_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  parent?: InputMaybe<Capability_Bool_Exp>;
  parentId?: InputMaybe<Uuid_Comparison_Exp>;
  parents?: InputMaybe<CapabilityHierarchyMap_Bool_Exp>;
  parents_aggregate?: InputMaybe<CapabilityHierarchyMap_Aggregate_Bool_Exp>;
  processes?: InputMaybe<CapabilityBusinessProcessMap_Bool_Exp>;
  processes_aggregate?: InputMaybe<CapabilityBusinessProcessMap_Aggregate_Bool_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** Ordering options when selecting data from "capabilities". */
export type Capability_Order_By = {
  children_aggregate?: InputMaybe<CapabilityHierarchyMap_Aggregate_Order_By>;
  code?: InputMaybe<Order_By>;
  components_aggregate?: InputMaybe<CapabilityApplicationComponentMap_Aggregate_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  parent?: InputMaybe<Capability_Order_By>;
  parentId?: InputMaybe<Order_By>;
  parents_aggregate?: InputMaybe<CapabilityHierarchyMap_Aggregate_Order_By>;
  processes_aggregate?: InputMaybe<CapabilityBusinessProcessMap_Aggregate_Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

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
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
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
  tenantId: Scalars['uuid']['output'];
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
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
  useInFunctions?: InputMaybe<ApplicationFunctionDataObjectMap_Bool_Exp>;
  useInFunctions_aggregate?: InputMaybe<ApplicationFunctionDataObjectMap_Aggregate_Bool_Exp>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
  useInFunctions_aggregate?: InputMaybe<ApplicationFunctionDataObjectMap_Aggregate_Order_By>;
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

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
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
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
  tenantId: Scalars['uuid']['output'];
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
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  type?: InputMaybe<Directory_Link_Type_Enum_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  tenantId?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  TenantId = 'tenantId',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

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
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  type?: InputMaybe<Scalars['directory_link_type_enum']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "directories" */
export type DirectoryObject = {
  __typename?: 'DirectoryObject';
  byDefault: Scalars['Boolean']['output'];
  /** An array relationship */
  children: Array<DirectoryItemsMap>;
  /** An aggregate relationship */
  children_aggregate: DirectoryItemsMap_Aggregate;
  code: Scalars['String']['output'];
  color?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  components: Array<ApplicationComponentDirectoryMap>;
  /** An aggregate relationship */
  components_aggregate: ApplicationComponentDirectoryMap_Aggregate;
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  kind: Scalars['directory_kind_enum']['output'];
  name: Scalars['String']['output'];
  /** An array relationship */
  parents: Array<DirectoryItemsMap>;
  /** An aggregate relationship */
  parents_aggregate: DirectoryItemsMap_Aggregate;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectChildrenArgs = {
  distinct_on?: InputMaybe<Array<DirectoryItemsMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<DirectoryItemsMap_Order_By>>;
  where?: InputMaybe<DirectoryItemsMap_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectChildren_AggregateArgs = {
  distinct_on?: InputMaybe<Array<DirectoryItemsMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<DirectoryItemsMap_Order_By>>;
  where?: InputMaybe<DirectoryItemsMap_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectComponentsArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentDirectoryMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentDirectoryMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentDirectoryMap_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentDirectoryMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentDirectoryMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentDirectoryMap_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectParentsArgs = {
  distinct_on?: InputMaybe<Array<DirectoryItemsMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<DirectoryItemsMap_Order_By>>;
  where?: InputMaybe<DirectoryItemsMap_Bool_Exp>;
};


/** columns and relationships of "directories" */
export type DirectoryObjectParents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<DirectoryItemsMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<DirectoryItemsMap_Order_By>>;
  where?: InputMaybe<DirectoryItemsMap_Bool_Exp>;
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
  byDefault?: InputMaybe<Boolean_Comparison_Exp>;
  children?: InputMaybe<DirectoryItemsMap_Bool_Exp>;
  children_aggregate?: InputMaybe<DirectoryItemsMap_Aggregate_Bool_Exp>;
  code?: InputMaybe<String_Comparison_Exp>;
  color?: InputMaybe<String_Comparison_Exp>;
  components?: InputMaybe<ApplicationComponentDirectoryMap_Bool_Exp>;
  components_aggregate?: InputMaybe<ApplicationComponentDirectoryMap_Aggregate_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  kind?: InputMaybe<Directory_Kind_Enum_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  parents?: InputMaybe<DirectoryItemsMap_Bool_Exp>;
  parents_aggregate?: InputMaybe<DirectoryItemsMap_Aggregate_Bool_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
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

/** Ordering options when selecting data from "directories". */
export type DirectoryObject_Order_By = {
  byDefault?: InputMaybe<Order_By>;
  children_aggregate?: InputMaybe<DirectoryItemsMap_Aggregate_Order_By>;
  code?: InputMaybe<Order_By>;
  color?: InputMaybe<Order_By>;
  components_aggregate?: InputMaybe<ApplicationComponentDirectoryMap_Aggregate_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  parents_aggregate?: InputMaybe<DirectoryItemsMap_Aggregate_Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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

/** columns and relationships of "events" */
export type Event = {
  __typename?: 'Event';
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
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "events" */
export type EventComponentsArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentEventMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentEventMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentEventMap_Bool_Exp>;
};


/** columns and relationships of "events" */
export type EventComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentEventMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentEventMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentEventMap_Bool_Exp>;
};

/** aggregated selection of "events" */
export type Event_Aggregate = {
  __typename?: 'Event_aggregate';
  aggregate?: Maybe<Event_Aggregate_Fields>;
  nodes: Array<Event>;
};

/** aggregate fields of "events" */
export type Event_Aggregate_Fields = {
  __typename?: 'Event_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Event_Max_Fields>;
  min?: Maybe<Event_Min_Fields>;
};


/** aggregate fields of "events" */
export type Event_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Event_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "events". All fields are combined with a logical 'AND'. */
export type Event_Bool_Exp = {
  _and?: InputMaybe<Array<Event_Bool_Exp>>;
  _not?: InputMaybe<Event_Bool_Exp>;
  _or?: InputMaybe<Array<Event_Bool_Exp>>;
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
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type Event_Max_Fields = {
  __typename?: 'Event_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  layer?: Maybe<Scalars['layer_kind_enum']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type Event_Min_Fields = {
  __typename?: 'Event_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  layer?: Maybe<Scalars['layer_kind_enum']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** Ordering options when selecting data from "events". */
export type Event_Order_By = {
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
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "events" */
export enum Event_Select_Column {
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "Event" */
export type Event_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Event_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Event_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  layer?: InputMaybe<Scalars['layer_kind_enum']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
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
  requestDataObjectId?: Maybe<Scalars['uuid']['output']>;
  responseDataObjectId?: Maybe<Scalars['uuid']['output']>;
  /** An array relationship */
  solutions: Array<SolutionFlowMap>;
  /** An aggregate relationship */
  solutions_aggregate: SolutionFlowMap_Aggregate;
  /** An object relationship */
  sourceComponent?: Maybe<ApplicationComponent>;
  sourceComponentId?: Maybe<Scalars['uuid']['output']>;
  sourceFunctionId?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  sourceNode?: Maybe<TechnologyNode>;
  sourceNodeId?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  sourcePort?: Maybe<Interface>;
  sourcePortId?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  targetComponent?: Maybe<ApplicationComponent>;
  targetComponentId?: Maybe<Scalars['uuid']['output']>;
  targetFunctionId?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  targetNode?: Maybe<TechnologyNode>;
  targetNodeId?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  targetPort?: Maybe<Interface>;
  targetPortId?: Maybe<Scalars['uuid']['output']>;
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "flows" */
export type FlowGenericSolutionsArgs = {
  distinct_on?: InputMaybe<Array<SolutionFlowMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionFlowMap_Order_By>>;
  where?: InputMaybe<SolutionFlowMap_Bool_Exp>;
};


/** columns and relationships of "flows" */
export type FlowGenericSolutions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionFlowMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionFlowMap_Order_By>>;
  where?: InputMaybe<SolutionFlowMap_Bool_Exp>;
};

/** aggregated selection of "flows" */
export type FlowGeneric_Aggregate = {
  __typename?: 'FlowGeneric_aggregate';
  aggregate?: Maybe<FlowGeneric_Aggregate_Fields>;
  nodes: Array<FlowGeneric>;
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
  requestDataObjectId?: InputMaybe<Uuid_Comparison_Exp>;
  responseDataObjectId?: InputMaybe<Uuid_Comparison_Exp>;
  solutions?: InputMaybe<SolutionFlowMap_Bool_Exp>;
  solutions_aggregate?: InputMaybe<SolutionFlowMap_Aggregate_Bool_Exp>;
  sourceComponent?: InputMaybe<ApplicationComponent_Bool_Exp>;
  sourceComponentId?: InputMaybe<Uuid_Comparison_Exp>;
  sourceFunctionId?: InputMaybe<Uuid_Comparison_Exp>;
  sourceNode?: InputMaybe<TechnologyNode_Bool_Exp>;
  sourceNodeId?: InputMaybe<Uuid_Comparison_Exp>;
  sourcePort?: InputMaybe<Interface_Bool_Exp>;
  sourcePortId?: InputMaybe<Uuid_Comparison_Exp>;
  targetComponent?: InputMaybe<ApplicationComponent_Bool_Exp>;
  targetComponentId?: InputMaybe<Uuid_Comparison_Exp>;
  targetFunctionId?: InputMaybe<Uuid_Comparison_Exp>;
  targetNode?: InputMaybe<TechnologyNode_Bool_Exp>;
  targetNodeId?: InputMaybe<Uuid_Comparison_Exp>;
  targetPort?: InputMaybe<Interface_Bool_Exp>;
  targetPortId?: InputMaybe<Uuid_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
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
  requestDataObjectId?: Maybe<Scalars['uuid']['output']>;
  responseDataObjectId?: Maybe<Scalars['uuid']['output']>;
  sourceComponentId?: Maybe<Scalars['uuid']['output']>;
  sourceFunctionId?: Maybe<Scalars['uuid']['output']>;
  sourceNodeId?: Maybe<Scalars['uuid']['output']>;
  sourcePortId?: Maybe<Scalars['uuid']['output']>;
  targetComponentId?: Maybe<Scalars['uuid']['output']>;
  targetFunctionId?: Maybe<Scalars['uuid']['output']>;
  targetNodeId?: Maybe<Scalars['uuid']['output']>;
  targetPortId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
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
  requestDataObjectId?: Maybe<Scalars['uuid']['output']>;
  responseDataObjectId?: Maybe<Scalars['uuid']['output']>;
  sourceComponentId?: Maybe<Scalars['uuid']['output']>;
  sourceFunctionId?: Maybe<Scalars['uuid']['output']>;
  sourceNodeId?: Maybe<Scalars['uuid']['output']>;
  sourcePortId?: Maybe<Scalars['uuid']['output']>;
  targetComponentId?: Maybe<Scalars['uuid']['output']>;
  targetFunctionId?: Maybe<Scalars['uuid']['output']>;
  targetNodeId?: Maybe<Scalars['uuid']['output']>;
  targetPortId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
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
  requestDataObjectId?: InputMaybe<Order_By>;
  responseDataObjectId?: InputMaybe<Order_By>;
  solutions_aggregate?: InputMaybe<SolutionFlowMap_Aggregate_Order_By>;
  sourceComponent?: InputMaybe<ApplicationComponent_Order_By>;
  sourceComponentId?: InputMaybe<Order_By>;
  sourceFunctionId?: InputMaybe<Order_By>;
  sourceNode?: InputMaybe<TechnologyNode_Order_By>;
  sourceNodeId?: InputMaybe<Order_By>;
  sourcePort?: InputMaybe<Interface_Order_By>;
  sourcePortId?: InputMaybe<Order_By>;
  targetComponent?: InputMaybe<ApplicationComponent_Order_By>;
  targetComponentId?: InputMaybe<Order_By>;
  targetFunctionId?: InputMaybe<Order_By>;
  targetNode?: InputMaybe<TechnologyNode_Order_By>;
  targetNodeId?: InputMaybe<Order_By>;
  targetPort?: InputMaybe<Interface_Order_By>;
  targetPortId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  RequestDataObjectId = 'requestDataObjectId',
  /** column name */
  ResponseDataObjectId = 'responseDataObjectId',
  /** column name */
  SourceComponentId = 'sourceComponentId',
  /** column name */
  SourceFunctionId = 'sourceFunctionId',
  /** column name */
  SourceNodeId = 'sourceNodeId',
  /** column name */
  SourcePortId = 'sourcePortId',
  /** column name */
  TargetComponentId = 'targetComponentId',
  /** column name */
  TargetFunctionId = 'targetFunctionId',
  /** column name */
  TargetNodeId = 'targetNodeId',
  /** column name */
  TargetPortId = 'targetPortId',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

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
  requestDataObjectId?: InputMaybe<Scalars['uuid']['input']>;
  responseDataObjectId?: InputMaybe<Scalars['uuid']['input']>;
  sourceComponentId?: InputMaybe<Scalars['uuid']['input']>;
  sourceFunctionId?: InputMaybe<Scalars['uuid']['input']>;
  sourceNodeId?: InputMaybe<Scalars['uuid']['input']>;
  sourcePortId?: InputMaybe<Scalars['uuid']['input']>;
  targetComponentId?: InputMaybe<Scalars['uuid']['input']>;
  targetFunctionId?: InputMaybe<Scalars['uuid']['input']>;
  targetNodeId?: InputMaybe<Scalars['uuid']['input']>;
  targetPortId?: InputMaybe<Scalars['uuid']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "functions" */
export type Function = {
  __typename?: 'Function';
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
  /** An array relationship */
  processes: Array<BusinessProcessFunctionMap>;
  /** An aggregate relationship */
  processes_aggregate: BusinessProcessFunctionMap_Aggregate;
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "functions" */
export type FunctionComponentsArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentFunctionMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentFunctionMap_Bool_Exp>;
};


/** columns and relationships of "functions" */
export type FunctionComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentFunctionMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentFunctionMap_Bool_Exp>;
};


/** columns and relationships of "functions" */
export type FunctionProcessesArgs = {
  distinct_on?: InputMaybe<Array<BusinessProcessFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProcessFunctionMap_Order_By>>;
  where?: InputMaybe<BusinessProcessFunctionMap_Bool_Exp>;
};


/** columns and relationships of "functions" */
export type FunctionProcesses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<BusinessProcessFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProcessFunctionMap_Order_By>>;
  where?: InputMaybe<BusinessProcessFunctionMap_Bool_Exp>;
};

/** aggregated selection of "functions" */
export type Function_Aggregate = {
  __typename?: 'Function_aggregate';
  aggregate?: Maybe<Function_Aggregate_Fields>;
  nodes: Array<Function>;
};

/** aggregate fields of "functions" */
export type Function_Aggregate_Fields = {
  __typename?: 'Function_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Function_Max_Fields>;
  min?: Maybe<Function_Min_Fields>;
};


/** aggregate fields of "functions" */
export type Function_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Function_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "functions". All fields are combined with a logical 'AND'. */
export type Function_Bool_Exp = {
  _and?: InputMaybe<Array<Function_Bool_Exp>>;
  _not?: InputMaybe<Function_Bool_Exp>;
  _or?: InputMaybe<Array<Function_Bool_Exp>>;
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
  processes?: InputMaybe<BusinessProcessFunctionMap_Bool_Exp>;
  processes_aggregate?: InputMaybe<BusinessProcessFunctionMap_Aggregate_Bool_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type Function_Max_Fields = {
  __typename?: 'Function_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  layer?: Maybe<Scalars['layer_kind_enum']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type Function_Min_Fields = {
  __typename?: 'Function_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  layer?: Maybe<Scalars['layer_kind_enum']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** Ordering options when selecting data from "functions". */
export type Function_Order_By = {
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
  processes_aggregate?: InputMaybe<BusinessProcessFunctionMap_Aggregate_Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "functions" */
export enum Function_Select_Column {
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "Function" */
export type Function_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Function_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Function_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  layer?: InputMaybe<Scalars['layer_kind_enum']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
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
export type Interface = {
  __typename?: 'Interface';
  code: Scalars['String']['output'];
  /** An array relationship */
  componentFunctions: Array<ApplicationFunctionInterfaceMap>;
  /** An aggregate relationship */
  componentFunctions_aggregate: ApplicationFunctionInterfaceMap_Aggregate;
  /** An array relationship */
  components: Array<ApplicationComponentInterfaceMap>;
  /** An aggregate relationship */
  components_aggregate: ApplicationComponentInterfaceMap_Aggregate;
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  layer: Scalars['layer_kind_enum']['output'];
  methods?: Maybe<Array<Scalars['interface_method_enum']['output']>>;
  name: Scalars['String']['output'];
  /** An object relationship */
  protocol?: Maybe<DirectoryObject>;
  protocolId?: Maybe<Scalars['uuid']['output']>;
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "interfaces" */
export type InterfaceComponentFunctionsArgs = {
  distinct_on?: InputMaybe<Array<ApplicationFunctionInterfaceMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationFunctionInterfaceMap_Order_By>>;
  where?: InputMaybe<ApplicationFunctionInterfaceMap_Bool_Exp>;
};


/** columns and relationships of "interfaces" */
export type InterfaceComponentFunctions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationFunctionInterfaceMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationFunctionInterfaceMap_Order_By>>;
  where?: InputMaybe<ApplicationFunctionInterfaceMap_Bool_Exp>;
};


/** columns and relationships of "interfaces" */
export type InterfaceComponentsArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentInterfaceMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentInterfaceMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentInterfaceMap_Bool_Exp>;
};


/** columns and relationships of "interfaces" */
export type InterfaceComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentInterfaceMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentInterfaceMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentInterfaceMap_Bool_Exp>;
};

/** aggregated selection of "interfaces" */
export type Interface_Aggregate = {
  __typename?: 'Interface_aggregate';
  aggregate?: Maybe<Interface_Aggregate_Fields>;
  nodes: Array<Interface>;
};

/** aggregate fields of "interfaces" */
export type Interface_Aggregate_Fields = {
  __typename?: 'Interface_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Interface_Max_Fields>;
  min?: Maybe<Interface_Min_Fields>;
};


/** aggregate fields of "interfaces" */
export type Interface_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Interface_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "interfaces". All fields are combined with a logical 'AND'. */
export type Interface_Bool_Exp = {
  _and?: InputMaybe<Array<Interface_Bool_Exp>>;
  _not?: InputMaybe<Interface_Bool_Exp>;
  _or?: InputMaybe<Array<Interface_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  componentFunctions?: InputMaybe<ApplicationFunctionInterfaceMap_Bool_Exp>;
  componentFunctions_aggregate?: InputMaybe<ApplicationFunctionInterfaceMap_Aggregate_Bool_Exp>;
  components?: InputMaybe<ApplicationComponentInterfaceMap_Bool_Exp>;
  components_aggregate?: InputMaybe<ApplicationComponentInterfaceMap_Aggregate_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  layer?: InputMaybe<Layer_Kind_Enum_Comparison_Exp>;
  methods?: InputMaybe<Interface_Method_Enum_Array_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  protocol?: InputMaybe<DirectoryObject_Bool_Exp>;
  protocolId?: InputMaybe<Uuid_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type Interface_Max_Fields = {
  __typename?: 'Interface_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  layer?: Maybe<Scalars['layer_kind_enum']['output']>;
  methods?: Maybe<Array<Scalars['interface_method_enum']['output']>>;
  name?: Maybe<Scalars['String']['output']>;
  protocolId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type Interface_Min_Fields = {
  __typename?: 'Interface_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  layer?: Maybe<Scalars['layer_kind_enum']['output']>;
  methods?: Maybe<Array<Scalars['interface_method_enum']['output']>>;
  name?: Maybe<Scalars['String']['output']>;
  protocolId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** Ordering options when selecting data from "interfaces". */
export type Interface_Order_By = {
  code?: InputMaybe<Order_By>;
  componentFunctions_aggregate?: InputMaybe<ApplicationFunctionInterfaceMap_Aggregate_Order_By>;
  components_aggregate?: InputMaybe<ApplicationComponentInterfaceMap_Aggregate_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  layer?: InputMaybe<Order_By>;
  methods?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  protocol?: InputMaybe<DirectoryObject_Order_By>;
  protocolId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "interfaces" */
export enum Interface_Select_Column {
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
  Methods = 'methods',
  /** column name */
  Name = 'name',
  /** column name */
  ProtocolId = 'protocolId',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "Interface" */
export type Interface_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Interface_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Interface_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  layer?: InputMaybe<Scalars['layer_kind_enum']['input']>;
  methods?: InputMaybe<Array<Scalars['interface_method_enum']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  protocolId?: InputMaybe<Scalars['uuid']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "locations" */
export type Location = {
  __typename?: 'Location';
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
export type LocationNetworksArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNetwork_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNetwork_Order_By>>;
  where?: InputMaybe<TechnologyNetwork_Bool_Exp>;
};


/** columns and relationships of "locations" */
export type LocationNetworks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNetwork_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNetwork_Order_By>>;
  where?: InputMaybe<TechnologyNetwork_Bool_Exp>;
};

/** aggregated selection of "locations" */
export type Location_Aggregate = {
  __typename?: 'Location_aggregate';
  aggregate?: Maybe<Location_Aggregate_Fields>;
  nodes: Array<Location>;
};

/** aggregate fields of "locations" */
export type Location_Aggregate_Fields = {
  __typename?: 'Location_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Location_Max_Fields>;
  min?: Maybe<Location_Min_Fields>;
};


/** aggregate fields of "locations" */
export type Location_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Location_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "locations". All fields are combined with a logical 'AND'. */
export type Location_Bool_Exp = {
  _and?: InputMaybe<Array<Location_Bool_Exp>>;
  _not?: InputMaybe<Location_Bool_Exp>;
  _or?: InputMaybe<Array<Location_Bool_Exp>>;
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

/** aggregate max on columns */
export type Location_Max_Fields = {
  __typename?: 'Location_max_fields';
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
export type Location_Min_Fields = {
  __typename?: 'Location_min_fields';
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

/** Ordering options when selecting data from "locations". */
export type Location_Order_By = {
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

/** select columns of table "locations" */
export enum Location_Select_Column {
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

/** Streaming cursor of the table "Location" */
export type Location_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Location_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Location_Stream_Cursor_Value_Input = {
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

/** columns and relationships of "motivations" */
export type MotivationElementGeneric = {
  __typename?: 'MotivationElementGeneric';
  capabilityAssessmentType?: Maybe<Scalars['capability_assessment_type_enum']['output']>;
  /** An array relationship */
  children: Array<MotivationItemHierarchyMap>;
  /** An aggregate relationship */
  children_aggregate: MotivationItemHierarchyMap_Aggregate;
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
  /** An array relationship */
  parents: Array<MotivationItemHierarchyMap>;
  /** An aggregate relationship */
  parents_aggregate: MotivationItemHierarchyMap_Aggregate;
  priority?: Maybe<Scalars['motivation_priority_enum']['output']>;
  probability?: Maybe<Scalars['smallint']['output']>;
  /** An array relationship */
  processes: Array<BusinessProcessMotivationItemMap>;
  /** An aggregate relationship */
  processes_aggregate: BusinessProcessMotivationItemMap_Aggregate;
  riskCategory?: Maybe<Scalars['risk_category_enum']['output']>;
  severity?: Maybe<Scalars['smallint']['output']>;
  state?: Maybe<Scalars['motivation_status_enum']['output']>;
  status?: Maybe<Scalars['risk_status_enum']['output']>;
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "motivations" */
export type MotivationElementGenericChildrenArgs = {
  distinct_on?: InputMaybe<Array<MotivationItemHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MotivationItemHierarchyMap_Order_By>>;
  where?: InputMaybe<MotivationItemHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "motivations" */
export type MotivationElementGenericChildren_AggregateArgs = {
  distinct_on?: InputMaybe<Array<MotivationItemHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MotivationItemHierarchyMap_Order_By>>;
  where?: InputMaybe<MotivationItemHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "motivations" */
export type MotivationElementGenericParentsArgs = {
  distinct_on?: InputMaybe<Array<MotivationItemHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MotivationItemHierarchyMap_Order_By>>;
  where?: InputMaybe<MotivationItemHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "motivations" */
export type MotivationElementGenericParents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<MotivationItemHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MotivationItemHierarchyMap_Order_By>>;
  where?: InputMaybe<MotivationItemHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "motivations" */
export type MotivationElementGenericProcessesArgs = {
  distinct_on?: InputMaybe<Array<BusinessProcessMotivationItemMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProcessMotivationItemMap_Order_By>>;
  where?: InputMaybe<BusinessProcessMotivationItemMap_Bool_Exp>;
};


/** columns and relationships of "motivations" */
export type MotivationElementGenericProcesses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<BusinessProcessMotivationItemMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProcessMotivationItemMap_Order_By>>;
  where?: InputMaybe<BusinessProcessMotivationItemMap_Bool_Exp>;
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
  capabilityAssessmentType?: InputMaybe<Capability_Assessment_Type_Enum_Comparison_Exp>;
  children?: InputMaybe<MotivationItemHierarchyMap_Bool_Exp>;
  children_aggregate?: InputMaybe<MotivationItemHierarchyMap_Aggregate_Bool_Exp>;
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
  parents?: InputMaybe<MotivationItemHierarchyMap_Bool_Exp>;
  parents_aggregate?: InputMaybe<MotivationItemHierarchyMap_Aggregate_Bool_Exp>;
  priority?: InputMaybe<Motivation_Priority_Enum_Comparison_Exp>;
  probability?: InputMaybe<Smallint_Comparison_Exp>;
  processes?: InputMaybe<BusinessProcessMotivationItemMap_Bool_Exp>;
  processes_aggregate?: InputMaybe<BusinessProcessMotivationItemMap_Aggregate_Bool_Exp>;
  riskCategory?: InputMaybe<Risk_Category_Enum_Comparison_Exp>;
  severity?: InputMaybe<Smallint_Comparison_Exp>;
  state?: InputMaybe<Motivation_Status_Enum_Comparison_Exp>;
  status?: InputMaybe<Risk_Status_Enum_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type MotivationElementGeneric_Max_Fields = {
  __typename?: 'MotivationElementGeneric_max_fields';
  capabilityAssessmentType?: Maybe<Scalars['capability_assessment_type_enum']['output']>;
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
  priority?: Maybe<Scalars['motivation_priority_enum']['output']>;
  probability?: Maybe<Scalars['smallint']['output']>;
  riskCategory?: Maybe<Scalars['risk_category_enum']['output']>;
  severity?: Maybe<Scalars['smallint']['output']>;
  state?: Maybe<Scalars['motivation_status_enum']['output']>;
  status?: Maybe<Scalars['risk_status_enum']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type MotivationElementGeneric_Min_Fields = {
  __typename?: 'MotivationElementGeneric_min_fields';
  capabilityAssessmentType?: Maybe<Scalars['capability_assessment_type_enum']['output']>;
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
  priority?: Maybe<Scalars['motivation_priority_enum']['output']>;
  probability?: Maybe<Scalars['smallint']['output']>;
  riskCategory?: Maybe<Scalars['risk_category_enum']['output']>;
  severity?: Maybe<Scalars['smallint']['output']>;
  state?: Maybe<Scalars['motivation_status_enum']['output']>;
  status?: Maybe<Scalars['risk_status_enum']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** Ordering options when selecting data from "motivations". */
export type MotivationElementGeneric_Order_By = {
  capabilityAssessmentType?: InputMaybe<Order_By>;
  children_aggregate?: InputMaybe<MotivationItemHierarchyMap_Aggregate_Order_By>;
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
  parents_aggregate?: InputMaybe<MotivationItemHierarchyMap_Aggregate_Order_By>;
  priority?: InputMaybe<Order_By>;
  probability?: InputMaybe<Order_By>;
  processes_aggregate?: InputMaybe<BusinessProcessMotivationItemMap_Aggregate_Order_By>;
  riskCategory?: InputMaybe<Order_By>;
  severity?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "motivations" */
export enum MotivationElementGeneric_Select_Column {
  /** column name */
  CapabilityAssessmentType = 'capabilityAssessmentType',
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

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
  capabilityAssessmentType?: InputMaybe<Scalars['capability_assessment_type_enum']['input']>;
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
  priority?: InputMaybe<Scalars['motivation_priority_enum']['input']>;
  probability?: InputMaybe<Scalars['smallint']['input']>;
  riskCategory?: InputMaybe<Scalars['risk_category_enum']['input']>;
  severity?: InputMaybe<Scalars['smallint']['input']>;
  state?: InputMaybe<Scalars['motivation_status_enum']['input']>;
  status?: InputMaybe<Scalars['risk_status_enum']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
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

/** columns and relationships of "map_motivation_item_hierarchy" */
export type MotivationItemHierarchyMap = {
  __typename?: 'MotivationItemHierarchyMap';
  /** An object relationship */
  child: MotivationElementGeneric;
  childId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  parent: MotivationElementGeneric;
  parentId: Scalars['uuid']['output'];
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_motivation_item_hierarchy" */
export type MotivationItemHierarchyMap_Aggregate = {
  __typename?: 'MotivationItemHierarchyMap_aggregate';
  aggregate?: Maybe<MotivationItemHierarchyMap_Aggregate_Fields>;
  nodes: Array<MotivationItemHierarchyMap>;
};

export type MotivationItemHierarchyMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<MotivationItemHierarchyMap_Aggregate_Bool_Exp_Count>;
};

export type MotivationItemHierarchyMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<MotivationItemHierarchyMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<MotivationItemHierarchyMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_motivation_item_hierarchy" */
export type MotivationItemHierarchyMap_Aggregate_Fields = {
  __typename?: 'MotivationItemHierarchyMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<MotivationItemHierarchyMap_Max_Fields>;
  min?: Maybe<MotivationItemHierarchyMap_Min_Fields>;
};


/** aggregate fields of "map_motivation_item_hierarchy" */
export type MotivationItemHierarchyMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<MotivationItemHierarchyMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_motivation_item_hierarchy" */
export type MotivationItemHierarchyMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<MotivationItemHierarchyMap_Max_Order_By>;
  min?: InputMaybe<MotivationItemHierarchyMap_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "map_motivation_item_hierarchy". All fields are combined with a logical 'AND'. */
export type MotivationItemHierarchyMap_Bool_Exp = {
  _and?: InputMaybe<Array<MotivationItemHierarchyMap_Bool_Exp>>;
  _not?: InputMaybe<MotivationItemHierarchyMap_Bool_Exp>;
  _or?: InputMaybe<Array<MotivationItemHierarchyMap_Bool_Exp>>;
  child?: InputMaybe<MotivationElementGeneric_Bool_Exp>;
  childId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  parent?: InputMaybe<MotivationElementGeneric_Bool_Exp>;
  parentId?: InputMaybe<Uuid_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type MotivationItemHierarchyMap_Max_Fields = {
  __typename?: 'MotivationItemHierarchyMap_max_fields';
  childId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  parentId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_motivation_item_hierarchy" */
export type MotivationItemHierarchyMap_Max_Order_By = {
  childId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  parentId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type MotivationItemHierarchyMap_Min_Fields = {
  __typename?: 'MotivationItemHierarchyMap_min_fields';
  childId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  parentId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_motivation_item_hierarchy" */
export type MotivationItemHierarchyMap_Min_Order_By = {
  childId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  parentId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "map_motivation_item_hierarchy". */
export type MotivationItemHierarchyMap_Order_By = {
  child?: InputMaybe<MotivationElementGeneric_Order_By>;
  childId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  parent?: InputMaybe<MotivationElementGeneric_Order_By>;
  parentId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "map_motivation_item_hierarchy" */
export enum MotivationItemHierarchyMap_Select_Column {
  /** column name */
  ChildId = 'childId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  ParentId = 'parentId',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "MotivationItemHierarchyMap" */
export type MotivationItemHierarchyMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: MotivationItemHierarchyMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type MotivationItemHierarchyMap_Stream_Cursor_Value_Input = {
  childId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  parentId?: InputMaybe<Scalars['uuid']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "plateaus" */
export type Plateau = {
  __typename?: 'Plateau';
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "plateaus" */
export type Plateau_Aggregate = {
  __typename?: 'Plateau_aggregate';
  aggregate?: Maybe<Plateau_Aggregate_Fields>;
  nodes: Array<Plateau>;
};

/** aggregate fields of "plateaus" */
export type Plateau_Aggregate_Fields = {
  __typename?: 'Plateau_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Plateau_Max_Fields>;
  min?: Maybe<Plateau_Min_Fields>;
};


/** aggregate fields of "plateaus" */
export type Plateau_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Plateau_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "plateaus". All fields are combined with a logical 'AND'. */
export type Plateau_Bool_Exp = {
  _and?: InputMaybe<Array<Plateau_Bool_Exp>>;
  _not?: InputMaybe<Plateau_Bool_Exp>;
  _or?: InputMaybe<Array<Plateau_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type Plateau_Max_Fields = {
  __typename?: 'Plateau_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type Plateau_Min_Fields = {
  __typename?: 'Plateau_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** Ordering options when selecting data from "plateaus". */
export type Plateau_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "plateaus" */
export enum Plateau_Select_Column {
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "Plateau" */
export type Plateau_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Plateau_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Plateau_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "processes" */
export type Process = {
  __typename?: 'Process';
  /** An array relationship */
  capabilities: Array<CapabilityBusinessProcessMap>;
  /** An aggregate relationship */
  capabilities_aggregate: CapabilityBusinessProcessMap_Aggregate;
  /** An array relationship */
  children: Array<BusinessProcessHierarchyMap>;
  /** An aggregate relationship */
  children_aggregate: BusinessProcessHierarchyMap_Aggregate;
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  functions: Array<BusinessProcessFunctionMap>;
  /** An aggregate relationship */
  functions_aggregate: BusinessProcessFunctionMap_Aggregate;
  id: Scalars['uuid']['output'];
  layer: Scalars['layer_kind_enum']['output'];
  /** An array relationship */
  motivations: Array<BusinessProcessMotivationItemMap>;
  /** An aggregate relationship */
  motivations_aggregate: BusinessProcessMotivationItemMap_Aggregate;
  name: Scalars['String']['output'];
  /** An array relationship */
  parents: Array<BusinessProcessHierarchyMap>;
  /** An aggregate relationship */
  parents_aggregate: BusinessProcessHierarchyMap_Aggregate;
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "processes" */
export type ProcessCapabilitiesArgs = {
  distinct_on?: InputMaybe<Array<CapabilityBusinessProcessMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityBusinessProcessMap_Order_By>>;
  where?: InputMaybe<CapabilityBusinessProcessMap_Bool_Exp>;
};


/** columns and relationships of "processes" */
export type ProcessCapabilities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<CapabilityBusinessProcessMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityBusinessProcessMap_Order_By>>;
  where?: InputMaybe<CapabilityBusinessProcessMap_Bool_Exp>;
};


/** columns and relationships of "processes" */
export type ProcessChildrenArgs = {
  distinct_on?: InputMaybe<Array<BusinessProcessHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProcessHierarchyMap_Order_By>>;
  where?: InputMaybe<BusinessProcessHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "processes" */
export type ProcessChildren_AggregateArgs = {
  distinct_on?: InputMaybe<Array<BusinessProcessHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProcessHierarchyMap_Order_By>>;
  where?: InputMaybe<BusinessProcessHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "processes" */
export type ProcessFunctionsArgs = {
  distinct_on?: InputMaybe<Array<BusinessProcessFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProcessFunctionMap_Order_By>>;
  where?: InputMaybe<BusinessProcessFunctionMap_Bool_Exp>;
};


/** columns and relationships of "processes" */
export type ProcessFunctions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<BusinessProcessFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProcessFunctionMap_Order_By>>;
  where?: InputMaybe<BusinessProcessFunctionMap_Bool_Exp>;
};


/** columns and relationships of "processes" */
export type ProcessMotivationsArgs = {
  distinct_on?: InputMaybe<Array<BusinessProcessMotivationItemMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProcessMotivationItemMap_Order_By>>;
  where?: InputMaybe<BusinessProcessMotivationItemMap_Bool_Exp>;
};


/** columns and relationships of "processes" */
export type ProcessMotivations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<BusinessProcessMotivationItemMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProcessMotivationItemMap_Order_By>>;
  where?: InputMaybe<BusinessProcessMotivationItemMap_Bool_Exp>;
};


/** columns and relationships of "processes" */
export type ProcessParentsArgs = {
  distinct_on?: InputMaybe<Array<BusinessProcessHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProcessHierarchyMap_Order_By>>;
  where?: InputMaybe<BusinessProcessHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "processes" */
export type ProcessParents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<BusinessProcessHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProcessHierarchyMap_Order_By>>;
  where?: InputMaybe<BusinessProcessHierarchyMap_Bool_Exp>;
};

/** aggregated selection of "processes" */
export type Process_Aggregate = {
  __typename?: 'Process_aggregate';
  aggregate?: Maybe<Process_Aggregate_Fields>;
  nodes: Array<Process>;
};

/** aggregate fields of "processes" */
export type Process_Aggregate_Fields = {
  __typename?: 'Process_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Process_Max_Fields>;
  min?: Maybe<Process_Min_Fields>;
};


/** aggregate fields of "processes" */
export type Process_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Process_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "processes". All fields are combined with a logical 'AND'. */
export type Process_Bool_Exp = {
  _and?: InputMaybe<Array<Process_Bool_Exp>>;
  _not?: InputMaybe<Process_Bool_Exp>;
  _or?: InputMaybe<Array<Process_Bool_Exp>>;
  capabilities?: InputMaybe<CapabilityBusinessProcessMap_Bool_Exp>;
  capabilities_aggregate?: InputMaybe<CapabilityBusinessProcessMap_Aggregate_Bool_Exp>;
  children?: InputMaybe<BusinessProcessHierarchyMap_Bool_Exp>;
  children_aggregate?: InputMaybe<BusinessProcessHierarchyMap_Aggregate_Bool_Exp>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  functions?: InputMaybe<BusinessProcessFunctionMap_Bool_Exp>;
  functions_aggregate?: InputMaybe<BusinessProcessFunctionMap_Aggregate_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  layer?: InputMaybe<Layer_Kind_Enum_Comparison_Exp>;
  motivations?: InputMaybe<BusinessProcessMotivationItemMap_Bool_Exp>;
  motivations_aggregate?: InputMaybe<BusinessProcessMotivationItemMap_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  parents?: InputMaybe<BusinessProcessHierarchyMap_Bool_Exp>;
  parents_aggregate?: InputMaybe<BusinessProcessHierarchyMap_Aggregate_Bool_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type Process_Max_Fields = {
  __typename?: 'Process_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  layer?: Maybe<Scalars['layer_kind_enum']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type Process_Min_Fields = {
  __typename?: 'Process_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  layer?: Maybe<Scalars['layer_kind_enum']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** Ordering options when selecting data from "processes". */
export type Process_Order_By = {
  capabilities_aggregate?: InputMaybe<CapabilityBusinessProcessMap_Aggregate_Order_By>;
  children_aggregate?: InputMaybe<BusinessProcessHierarchyMap_Aggregate_Order_By>;
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  functions_aggregate?: InputMaybe<BusinessProcessFunctionMap_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  layer?: InputMaybe<Order_By>;
  motivations_aggregate?: InputMaybe<BusinessProcessMotivationItemMap_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  parents_aggregate?: InputMaybe<BusinessProcessHierarchyMap_Aggregate_Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "processes" */
export enum Process_Select_Column {
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "Process" */
export type Process_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Process_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Process_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  layer?: InputMaybe<Scalars['layer_kind_enum']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "roles" */
export type Role = {
  __typename?: 'Role';
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
  layer: Scalars['layer_kind_enum']['output'];
  name: Scalars['String']['output'];
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "roles" */
export type RoleActorsArgs = {
  distinct_on?: InputMaybe<Array<BusinessActorRoleMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessActorRoleMap_Order_By>>;
  where?: InputMaybe<BusinessActorRoleMap_Bool_Exp>;
};


/** columns and relationships of "roles" */
export type RoleActors_AggregateArgs = {
  distinct_on?: InputMaybe<Array<BusinessActorRoleMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessActorRoleMap_Order_By>>;
  where?: InputMaybe<BusinessActorRoleMap_Bool_Exp>;
};

/** aggregated selection of "roles" */
export type Role_Aggregate = {
  __typename?: 'Role_aggregate';
  aggregate?: Maybe<Role_Aggregate_Fields>;
  nodes: Array<Role>;
};

/** aggregate fields of "roles" */
export type Role_Aggregate_Fields = {
  __typename?: 'Role_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Role_Max_Fields>;
  min?: Maybe<Role_Min_Fields>;
};


/** aggregate fields of "roles" */
export type Role_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Role_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "roles". All fields are combined with a logical 'AND'. */
export type Role_Bool_Exp = {
  _and?: InputMaybe<Array<Role_Bool_Exp>>;
  _not?: InputMaybe<Role_Bool_Exp>;
  _or?: InputMaybe<Array<Role_Bool_Exp>>;
  actors?: InputMaybe<BusinessActorRoleMap_Bool_Exp>;
  actors_aggregate?: InputMaybe<BusinessActorRoleMap_Aggregate_Bool_Exp>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  layer?: InputMaybe<Layer_Kind_Enum_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type Role_Max_Fields = {
  __typename?: 'Role_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  layer?: Maybe<Scalars['layer_kind_enum']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type Role_Min_Fields = {
  __typename?: 'Role_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  layer?: Maybe<Scalars['layer_kind_enum']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** Ordering options when selecting data from "roles". */
export type Role_Order_By = {
  actors_aggregate?: InputMaybe<BusinessActorRoleMap_Aggregate_Order_By>;
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  layer?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "roles" */
export enum Role_Select_Column {
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "Role" */
export type Role_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Role_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Role_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  layer?: InputMaybe<Scalars['layer_kind_enum']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "services" */
export type Service = {
  __typename?: 'Service';
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  layer: Scalars['layer_kind_enum']['output'];
  name: Scalars['String']['output'];
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "services" */
export type Service_Aggregate = {
  __typename?: 'Service_aggregate';
  aggregate?: Maybe<Service_Aggregate_Fields>;
  nodes: Array<Service>;
};

/** aggregate fields of "services" */
export type Service_Aggregate_Fields = {
  __typename?: 'Service_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Service_Max_Fields>;
  min?: Maybe<Service_Min_Fields>;
};


/** aggregate fields of "services" */
export type Service_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Service_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "services". All fields are combined with a logical 'AND'. */
export type Service_Bool_Exp = {
  _and?: InputMaybe<Array<Service_Bool_Exp>>;
  _not?: InputMaybe<Service_Bool_Exp>;
  _or?: InputMaybe<Array<Service_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  layer?: InputMaybe<Layer_Kind_Enum_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type Service_Max_Fields = {
  __typename?: 'Service_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  layer?: Maybe<Scalars['layer_kind_enum']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type Service_Min_Fields = {
  __typename?: 'Service_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  layer?: Maybe<Scalars['layer_kind_enum']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** Ordering options when selecting data from "services". */
export type Service_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  layer?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "services" */
export enum Service_Select_Column {
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "Service" */
export type Service_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Service_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Service_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  layer?: InputMaybe<Scalars['layer_kind_enum']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "solutions" */
export type Solution = {
  __typename?: 'Solution';
  acceptedAt?: Maybe<Scalars['timestamptz']['output']>;
  acceptedBy?: Maybe<Scalars['uuid']['output']>;
  alternatives: Scalars['String']['output'];
  code: Scalars['String']['output'];
  /** An array relationship */
  components: Array<SolutionApplicationComponentMap>;
  /** An aggregate relationship */
  components_aggregate: SolutionApplicationComponentMap_Aggregate;
  consequences: Scalars['String']['output'];
  context: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  /** An array relationship */
  dataObjectsInComponent: Array<SolutionDataObjectMap>;
  /** An aggregate relationship */
  dataObjectsInComponent_aggregate: SolutionDataObjectMap_Aggregate;
  decision: Scalars['String']['output'];
  decisionStatus: Scalars['solution_life_cycle_enum']['output'];
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  flows: Array<SolutionFlowMap>;
  /** An aggregate relationship */
  flows_aggregate: SolutionFlowMap_Aggregate;
  /** An array relationship */
  functions: Array<SolutionApplicationFunctionMap>;
  /** An aggregate relationship */
  functions_aggregate: SolutionApplicationFunctionMap_Aggregate;
  id: Scalars['uuid']['output'];
  implementationStatus: Scalars['solution_implementation_status_enum']['output'];
  /** An array relationship */
  motivations: Array<SolutionMotivationElementMap>;
  /** An aggregate relationship */
  motivations_aggregate: SolutionMotivationElementMap_Aggregate;
  name: Scalars['String']['output'];
  /** An array relationship */
  nodes: Array<SolutionTechnologyNodeMap>;
  /** An aggregate relationship */
  nodes_aggregate: SolutionTechnologyNodeMap_Aggregate;
  /** An array relationship */
  stakeholders: Array<SolutionStakeholderMap>;
  /** An aggregate relationship */
  stakeholders_aggregate: SolutionStakeholderMap_Aggregate;
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
  /** An array relationship */
  variants: Array<Variant>;
  /** An aggregate relationship */
  variants_aggregate: Variant_Aggregate;
  /** An array relationship */
  views: Array<View>;
  /** An aggregate relationship */
  views_aggregate: View_Aggregate;
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
export type SolutionDataObjectsInComponentArgs = {
  distinct_on?: InputMaybe<Array<SolutionDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionDataObjectMap_Order_By>>;
  where?: InputMaybe<SolutionDataObjectMap_Bool_Exp>;
};


/** columns and relationships of "solutions" */
export type SolutionDataObjectsInComponent_AggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionDataObjectMap_Order_By>>;
  where?: InputMaybe<SolutionDataObjectMap_Bool_Exp>;
};


/** columns and relationships of "solutions" */
export type SolutionFlowsArgs = {
  distinct_on?: InputMaybe<Array<SolutionFlowMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionFlowMap_Order_By>>;
  where?: InputMaybe<SolutionFlowMap_Bool_Exp>;
};


/** columns and relationships of "solutions" */
export type SolutionFlows_AggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionFlowMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionFlowMap_Order_By>>;
  where?: InputMaybe<SolutionFlowMap_Bool_Exp>;
};


/** columns and relationships of "solutions" */
export type SolutionFunctionsArgs = {
  distinct_on?: InputMaybe<Array<SolutionApplicationFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionApplicationFunctionMap_Order_By>>;
  where?: InputMaybe<SolutionApplicationFunctionMap_Bool_Exp>;
};


/** columns and relationships of "solutions" */
export type SolutionFunctions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionApplicationFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionApplicationFunctionMap_Order_By>>;
  where?: InputMaybe<SolutionApplicationFunctionMap_Bool_Exp>;
};


/** columns and relationships of "solutions" */
export type SolutionMotivationsArgs = {
  distinct_on?: InputMaybe<Array<SolutionMotivationElementMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionMotivationElementMap_Order_By>>;
  where?: InputMaybe<SolutionMotivationElementMap_Bool_Exp>;
};


/** columns and relationships of "solutions" */
export type SolutionMotivations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionMotivationElementMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionMotivationElementMap_Order_By>>;
  where?: InputMaybe<SolutionMotivationElementMap_Bool_Exp>;
};


/** columns and relationships of "solutions" */
export type SolutionNodesArgs = {
  distinct_on?: InputMaybe<Array<SolutionTechnologyNodeMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionTechnologyNodeMap_Order_By>>;
  where?: InputMaybe<SolutionTechnologyNodeMap_Bool_Exp>;
};


/** columns and relationships of "solutions" */
export type SolutionNodes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionTechnologyNodeMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionTechnologyNodeMap_Order_By>>;
  where?: InputMaybe<SolutionTechnologyNodeMap_Bool_Exp>;
};


/** columns and relationships of "solutions" */
export type SolutionStakeholdersArgs = {
  distinct_on?: InputMaybe<Array<SolutionStakeholderMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionStakeholderMap_Order_By>>;
  where?: InputMaybe<SolutionStakeholderMap_Bool_Exp>;
};


/** columns and relationships of "solutions" */
export type SolutionStakeholders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionStakeholderMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionStakeholderMap_Order_By>>;
  where?: InputMaybe<SolutionStakeholderMap_Bool_Exp>;
};


/** columns and relationships of "solutions" */
export type SolutionVariantsArgs = {
  distinct_on?: InputMaybe<Array<Variant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Variant_Order_By>>;
  where?: InputMaybe<Variant_Bool_Exp>;
};


/** columns and relationships of "solutions" */
export type SolutionVariants_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Variant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Variant_Order_By>>;
  where?: InputMaybe<Variant_Bool_Exp>;
};


/** columns and relationships of "solutions" */
export type SolutionViewsArgs = {
  distinct_on?: InputMaybe<Array<View_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<View_Order_By>>;
  where?: InputMaybe<View_Bool_Exp>;
};


/** columns and relationships of "solutions" */
export type SolutionViews_AggregateArgs = {
  distinct_on?: InputMaybe<Array<View_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<View_Order_By>>;
  where?: InputMaybe<View_Bool_Exp>;
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
  description?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  motivationsInSolution: Array<SolutionMotivationComponentMap>;
  /** An aggregate relationship */
  motivationsInSolution_aggregate: SolutionMotivationComponentMap_Aggregate;
  /** An object relationship */
  solution: Solution;
  solutionId: Scalars['uuid']['output'];
  state: Scalars['solution_item_impact_type_enum']['output'];
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "map_solution_application_component" */
export type SolutionApplicationComponentMapMotivationsInSolutionArgs = {
  distinct_on?: InputMaybe<Array<SolutionMotivationComponentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionMotivationComponentMap_Order_By>>;
  where?: InputMaybe<SolutionMotivationComponentMap_Bool_Exp>;
};


/** columns and relationships of "map_solution_application_component" */
export type SolutionApplicationComponentMapMotivationsInSolution_AggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionMotivationComponentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionMotivationComponentMap_Order_By>>;
  where?: InputMaybe<SolutionMotivationComponentMap_Bool_Exp>;
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
  description?: InputMaybe<String_Comparison_Exp>;
  motivationsInSolution?: InputMaybe<SolutionMotivationComponentMap_Bool_Exp>;
  motivationsInSolution_aggregate?: InputMaybe<SolutionMotivationComponentMap_Aggregate_Bool_Exp>;
  solution?: InputMaybe<Solution_Bool_Exp>;
  solutionId?: InputMaybe<Uuid_Comparison_Exp>;
  state?: InputMaybe<Solution_Item_Impact_Type_Enum_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type SolutionApplicationComponentMap_Max_Fields = {
  __typename?: 'SolutionApplicationComponentMap_max_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  solutionId?: Maybe<Scalars['uuid']['output']>;
  state?: Maybe<Scalars['solution_item_impact_type_enum']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  description?: InputMaybe<Order_By>;
  solutionId?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
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
  description?: Maybe<Scalars['String']['output']>;
  solutionId?: Maybe<Scalars['uuid']['output']>;
  state?: Maybe<Scalars['solution_item_impact_type_enum']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  description?: InputMaybe<Order_By>;
  solutionId?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "map_solution_application_component". */
export type SolutionApplicationComponentMap_Order_By = {
  component?: InputMaybe<ApplicationComponent_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  motivationsInSolution_aggregate?: InputMaybe<SolutionMotivationComponentMap_Aggregate_Order_By>;
  solution?: InputMaybe<Solution_Order_By>;
  solutionId?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  Description = 'description',
  /** column name */
  SolutionId = 'solutionId',
  /** column name */
  State = 'state',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

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
  description?: InputMaybe<Scalars['String']['input']>;
  solutionId?: InputMaybe<Scalars['uuid']['input']>;
  state?: InputMaybe<Scalars['solution_item_impact_type_enum']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "map_solution_application_function" */
export type SolutionApplicationFunctionMap = {
  __typename?: 'SolutionApplicationFunctionMap';
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  functionId: Scalars['uuid']['output'];
  /** An object relationship */
  solution: Solution;
  solutionId: Scalars['uuid']['output'];
  state: Scalars['solution_item_impact_type_enum']['output'];
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_solution_application_function" */
export type SolutionApplicationFunctionMap_Aggregate = {
  __typename?: 'SolutionApplicationFunctionMap_aggregate';
  aggregate?: Maybe<SolutionApplicationFunctionMap_Aggregate_Fields>;
  nodes: Array<SolutionApplicationFunctionMap>;
};

export type SolutionApplicationFunctionMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<SolutionApplicationFunctionMap_Aggregate_Bool_Exp_Count>;
};

export type SolutionApplicationFunctionMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<SolutionApplicationFunctionMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<SolutionApplicationFunctionMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_solution_application_function" */
export type SolutionApplicationFunctionMap_Aggregate_Fields = {
  __typename?: 'SolutionApplicationFunctionMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<SolutionApplicationFunctionMap_Max_Fields>;
  min?: Maybe<SolutionApplicationFunctionMap_Min_Fields>;
};


/** aggregate fields of "map_solution_application_function" */
export type SolutionApplicationFunctionMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<SolutionApplicationFunctionMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_solution_application_function" */
export type SolutionApplicationFunctionMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<SolutionApplicationFunctionMap_Max_Order_By>;
  min?: InputMaybe<SolutionApplicationFunctionMap_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "map_solution_application_function". All fields are combined with a logical 'AND'. */
export type SolutionApplicationFunctionMap_Bool_Exp = {
  _and?: InputMaybe<Array<SolutionApplicationFunctionMap_Bool_Exp>>;
  _not?: InputMaybe<SolutionApplicationFunctionMap_Bool_Exp>;
  _or?: InputMaybe<Array<SolutionApplicationFunctionMap_Bool_Exp>>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  functionId?: InputMaybe<Uuid_Comparison_Exp>;
  solution?: InputMaybe<Solution_Bool_Exp>;
  solutionId?: InputMaybe<Uuid_Comparison_Exp>;
  state?: InputMaybe<Solution_Item_Impact_Type_Enum_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type SolutionApplicationFunctionMap_Max_Fields = {
  __typename?: 'SolutionApplicationFunctionMap_max_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  functionId?: Maybe<Scalars['uuid']['output']>;
  solutionId?: Maybe<Scalars['uuid']['output']>;
  state?: Maybe<Scalars['solution_item_impact_type_enum']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_solution_application_function" */
export type SolutionApplicationFunctionMap_Max_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  functionId?: InputMaybe<Order_By>;
  solutionId?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type SolutionApplicationFunctionMap_Min_Fields = {
  __typename?: 'SolutionApplicationFunctionMap_min_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  functionId?: Maybe<Scalars['uuid']['output']>;
  solutionId?: Maybe<Scalars['uuid']['output']>;
  state?: Maybe<Scalars['solution_item_impact_type_enum']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_solution_application_function" */
export type SolutionApplicationFunctionMap_Min_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  functionId?: InputMaybe<Order_By>;
  solutionId?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "map_solution_application_function". */
export type SolutionApplicationFunctionMap_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  functionId?: InputMaybe<Order_By>;
  solution?: InputMaybe<Solution_Order_By>;
  solutionId?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "map_solution_application_function" */
export enum SolutionApplicationFunctionMap_Select_Column {
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
  FunctionId = 'functionId',
  /** column name */
  SolutionId = 'solutionId',
  /** column name */
  State = 'state',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "SolutionApplicationFunctionMap" */
export type SolutionApplicationFunctionMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: SolutionApplicationFunctionMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type SolutionApplicationFunctionMap_Stream_Cursor_Value_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  functionId?: InputMaybe<Scalars['uuid']['input']>;
  solutionId?: InputMaybe<Scalars['uuid']['input']>;
  state?: InputMaybe<Scalars['solution_item_impact_type_enum']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "map_solution_constraint" */
export type SolutionConstraintMap = {
  __typename?: 'SolutionConstraintMap';
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  motivation: MotivationElementGeneric;
  motivationId: Scalars['uuid']['output'];
  /** An object relationship */
  solution: Solution;
  solutionId: Scalars['uuid']['output'];
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_solution_constraint" */
export type SolutionConstraintMap_Aggregate = {
  __typename?: 'SolutionConstraintMap_aggregate';
  aggregate?: Maybe<SolutionConstraintMap_Aggregate_Fields>;
  nodes: Array<SolutionConstraintMap>;
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

/** Boolean expression to filter rows from the table "map_solution_constraint". All fields are combined with a logical 'AND'. */
export type SolutionConstraintMap_Bool_Exp = {
  _and?: InputMaybe<Array<SolutionConstraintMap_Bool_Exp>>;
  _not?: InputMaybe<SolutionConstraintMap_Bool_Exp>;
  _or?: InputMaybe<Array<SolutionConstraintMap_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  motivation?: InputMaybe<MotivationElementGeneric_Bool_Exp>;
  motivationId?: InputMaybe<Uuid_Comparison_Exp>;
  solution?: InputMaybe<Solution_Bool_Exp>;
  solutionId?: InputMaybe<Uuid_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type SolutionConstraintMap_Max_Fields = {
  __typename?: 'SolutionConstraintMap_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  motivationId?: Maybe<Scalars['uuid']['output']>;
  solutionId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type SolutionConstraintMap_Min_Fields = {
  __typename?: 'SolutionConstraintMap_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  motivationId?: Maybe<Scalars['uuid']['output']>;
  solutionId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** Ordering options when selecting data from "map_solution_constraint". */
export type SolutionConstraintMap_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  motivation?: InputMaybe<MotivationElementGeneric_Order_By>;
  motivationId?: InputMaybe<Order_By>;
  solution?: InputMaybe<Solution_Order_By>;
  solutionId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "map_solution_constraint" */
export enum SolutionConstraintMap_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  MotivationId = 'motivationId',
  /** column name */
  SolutionId = 'solutionId',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "SolutionConstraintMap" */
export type SolutionConstraintMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: SolutionConstraintMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type SolutionConstraintMap_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  motivationId?: InputMaybe<Scalars['uuid']['input']>;
  solutionId?: InputMaybe<Scalars['uuid']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "map_solution_data_object" */
export type SolutionDataObjectMap = {
  __typename?: 'SolutionDataObjectMap';
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  dataObjectId: Scalars['uuid']['output'];
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  solution: Solution;
  solutionId: Scalars['uuid']['output'];
  state: Scalars['solution_item_impact_type_enum']['output'];
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_solution_data_object" */
export type SolutionDataObjectMap_Aggregate = {
  __typename?: 'SolutionDataObjectMap_aggregate';
  aggregate?: Maybe<SolutionDataObjectMap_Aggregate_Fields>;
  nodes: Array<SolutionDataObjectMap>;
};

export type SolutionDataObjectMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<SolutionDataObjectMap_Aggregate_Bool_Exp_Count>;
};

export type SolutionDataObjectMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<SolutionDataObjectMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<SolutionDataObjectMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_solution_data_object" */
export type SolutionDataObjectMap_Aggregate_Fields = {
  __typename?: 'SolutionDataObjectMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<SolutionDataObjectMap_Max_Fields>;
  min?: Maybe<SolutionDataObjectMap_Min_Fields>;
};


/** aggregate fields of "map_solution_data_object" */
export type SolutionDataObjectMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<SolutionDataObjectMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_solution_data_object" */
export type SolutionDataObjectMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<SolutionDataObjectMap_Max_Order_By>;
  min?: InputMaybe<SolutionDataObjectMap_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "map_solution_data_object". All fields are combined with a logical 'AND'. */
export type SolutionDataObjectMap_Bool_Exp = {
  _and?: InputMaybe<Array<SolutionDataObjectMap_Bool_Exp>>;
  _not?: InputMaybe<SolutionDataObjectMap_Bool_Exp>;
  _or?: InputMaybe<Array<SolutionDataObjectMap_Bool_Exp>>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  dataObjectId?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  solution?: InputMaybe<Solution_Bool_Exp>;
  solutionId?: InputMaybe<Uuid_Comparison_Exp>;
  state?: InputMaybe<Solution_Item_Impact_Type_Enum_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type SolutionDataObjectMap_Max_Fields = {
  __typename?: 'SolutionDataObjectMap_max_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  dataObjectId?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  solutionId?: Maybe<Scalars['uuid']['output']>;
  state?: Maybe<Scalars['solution_item_impact_type_enum']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_solution_data_object" */
export type SolutionDataObjectMap_Max_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  dataObjectId?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  solutionId?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type SolutionDataObjectMap_Min_Fields = {
  __typename?: 'SolutionDataObjectMap_min_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  dataObjectId?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  solutionId?: Maybe<Scalars['uuid']['output']>;
  state?: Maybe<Scalars['solution_item_impact_type_enum']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_solution_data_object" */
export type SolutionDataObjectMap_Min_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  dataObjectId?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  solutionId?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "map_solution_data_object". */
export type SolutionDataObjectMap_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  dataObjectId?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  solution?: InputMaybe<Solution_Order_By>;
  solutionId?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "map_solution_data_object" */
export enum SolutionDataObjectMap_Select_Column {
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
  Description = 'description',
  /** column name */
  SolutionId = 'solutionId',
  /** column name */
  State = 'state',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "SolutionDataObjectMap" */
export type SolutionDataObjectMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: SolutionDataObjectMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type SolutionDataObjectMap_Stream_Cursor_Value_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  dataObjectId?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  solutionId?: InputMaybe<Scalars['uuid']['input']>;
  state?: InputMaybe<Scalars['solution_item_impact_type_enum']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "map_solution_flow" */
export type SolutionFlowMap = {
  __typename?: 'SolutionFlowMap';
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  flow: FlowGeneric;
  flowId: Scalars['uuid']['output'];
  label?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  solution: Solution;
  solutionId: Scalars['uuid']['output'];
  state: Scalars['solution_item_impact_type_enum']['output'];
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_solution_flow" */
export type SolutionFlowMap_Aggregate = {
  __typename?: 'SolutionFlowMap_aggregate';
  aggregate?: Maybe<SolutionFlowMap_Aggregate_Fields>;
  nodes: Array<SolutionFlowMap>;
};

export type SolutionFlowMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<SolutionFlowMap_Aggregate_Bool_Exp_Count>;
};

export type SolutionFlowMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<SolutionFlowMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<SolutionFlowMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_solution_flow" */
export type SolutionFlowMap_Aggregate_Fields = {
  __typename?: 'SolutionFlowMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<SolutionFlowMap_Max_Fields>;
  min?: Maybe<SolutionFlowMap_Min_Fields>;
};


/** aggregate fields of "map_solution_flow" */
export type SolutionFlowMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<SolutionFlowMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_solution_flow" */
export type SolutionFlowMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<SolutionFlowMap_Max_Order_By>;
  min?: InputMaybe<SolutionFlowMap_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "map_solution_flow". All fields are combined with a logical 'AND'. */
export type SolutionFlowMap_Bool_Exp = {
  _and?: InputMaybe<Array<SolutionFlowMap_Bool_Exp>>;
  _not?: InputMaybe<SolutionFlowMap_Bool_Exp>;
  _or?: InputMaybe<Array<SolutionFlowMap_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  flow?: InputMaybe<FlowGeneric_Bool_Exp>;
  flowId?: InputMaybe<Uuid_Comparison_Exp>;
  label?: InputMaybe<String_Comparison_Exp>;
  solution?: InputMaybe<Solution_Bool_Exp>;
  solutionId?: InputMaybe<Uuid_Comparison_Exp>;
  state?: InputMaybe<Solution_Item_Impact_Type_Enum_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type SolutionFlowMap_Max_Fields = {
  __typename?: 'SolutionFlowMap_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  flowId?: Maybe<Scalars['uuid']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  solutionId?: Maybe<Scalars['uuid']['output']>;
  state?: Maybe<Scalars['solution_item_impact_type_enum']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_solution_flow" */
export type SolutionFlowMap_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  flowId?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  solutionId?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type SolutionFlowMap_Min_Fields = {
  __typename?: 'SolutionFlowMap_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  flowId?: Maybe<Scalars['uuid']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  solutionId?: Maybe<Scalars['uuid']['output']>;
  state?: Maybe<Scalars['solution_item_impact_type_enum']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_solution_flow" */
export type SolutionFlowMap_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  flowId?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  solutionId?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "map_solution_flow". */
export type SolutionFlowMap_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  flow?: InputMaybe<FlowGeneric_Order_By>;
  flowId?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  solution?: InputMaybe<Solution_Order_By>;
  solutionId?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "map_solution_flow" */
export enum SolutionFlowMap_Select_Column {
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
  FlowId = 'flowId',
  /** column name */
  Label = 'label',
  /** column name */
  SolutionId = 'solutionId',
  /** column name */
  State = 'state',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "SolutionFlowMap" */
export type SolutionFlowMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: SolutionFlowMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type SolutionFlowMap_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  flowId?: InputMaybe<Scalars['uuid']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  solutionId?: InputMaybe<Scalars['uuid']['input']>;
  state?: InputMaybe<Scalars['solution_item_impact_type_enum']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "map_solution_motivation_component" */
export type SolutionMotivationComponentMap = {
  __typename?: 'SolutionMotivationComponentMap';
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  motivationId: Scalars['uuid']['output'];
  solutionId: Scalars['uuid']['output'];
  state: Scalars['solution_item_impact_type_enum']['output'];
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_solution_motivation_component" */
export type SolutionMotivationComponentMap_Aggregate = {
  __typename?: 'SolutionMotivationComponentMap_aggregate';
  aggregate?: Maybe<SolutionMotivationComponentMap_Aggregate_Fields>;
  nodes: Array<SolutionMotivationComponentMap>;
};

export type SolutionMotivationComponentMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<SolutionMotivationComponentMap_Aggregate_Bool_Exp_Count>;
};

export type SolutionMotivationComponentMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<SolutionMotivationComponentMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<SolutionMotivationComponentMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_solution_motivation_component" */
export type SolutionMotivationComponentMap_Aggregate_Fields = {
  __typename?: 'SolutionMotivationComponentMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<SolutionMotivationComponentMap_Max_Fields>;
  min?: Maybe<SolutionMotivationComponentMap_Min_Fields>;
};


/** aggregate fields of "map_solution_motivation_component" */
export type SolutionMotivationComponentMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<SolutionMotivationComponentMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_solution_motivation_component" */
export type SolutionMotivationComponentMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<SolutionMotivationComponentMap_Max_Order_By>;
  min?: InputMaybe<SolutionMotivationComponentMap_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "map_solution_motivation_component". All fields are combined with a logical 'AND'. */
export type SolutionMotivationComponentMap_Bool_Exp = {
  _and?: InputMaybe<Array<SolutionMotivationComponentMap_Bool_Exp>>;
  _not?: InputMaybe<SolutionMotivationComponentMap_Bool_Exp>;
  _or?: InputMaybe<Array<SolutionMotivationComponentMap_Bool_Exp>>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  motivationId?: InputMaybe<Uuid_Comparison_Exp>;
  solutionId?: InputMaybe<Uuid_Comparison_Exp>;
  state?: InputMaybe<Solution_Item_Impact_Type_Enum_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type SolutionMotivationComponentMap_Max_Fields = {
  __typename?: 'SolutionMotivationComponentMap_max_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  motivationId?: Maybe<Scalars['uuid']['output']>;
  solutionId?: Maybe<Scalars['uuid']['output']>;
  state?: Maybe<Scalars['solution_item_impact_type_enum']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_solution_motivation_component" */
export type SolutionMotivationComponentMap_Max_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  motivationId?: InputMaybe<Order_By>;
  solutionId?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type SolutionMotivationComponentMap_Min_Fields = {
  __typename?: 'SolutionMotivationComponentMap_min_fields';
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  motivationId?: Maybe<Scalars['uuid']['output']>;
  solutionId?: Maybe<Scalars['uuid']['output']>;
  state?: Maybe<Scalars['solution_item_impact_type_enum']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_solution_motivation_component" */
export type SolutionMotivationComponentMap_Min_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  motivationId?: InputMaybe<Order_By>;
  solutionId?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "map_solution_motivation_component". */
export type SolutionMotivationComponentMap_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  motivationId?: InputMaybe<Order_By>;
  solutionId?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "map_solution_motivation_component" */
export enum SolutionMotivationComponentMap_Select_Column {
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
  MotivationId = 'motivationId',
  /** column name */
  SolutionId = 'solutionId',
  /** column name */
  State = 'state',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "SolutionMotivationComponentMap" */
export type SolutionMotivationComponentMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: SolutionMotivationComponentMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type SolutionMotivationComponentMap_Stream_Cursor_Value_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  motivationId?: InputMaybe<Scalars['uuid']['input']>;
  solutionId?: InputMaybe<Scalars['uuid']['input']>;
  state?: InputMaybe<Scalars['solution_item_impact_type_enum']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "map_solution_motivation" */
export type SolutionMotivationElementMap = {
  __typename?: 'SolutionMotivationElementMap';
  /** An array relationship */
  componentsInSolution: Array<SolutionMotivationComponentMap>;
  /** An aggregate relationship */
  componentsInSolution_aggregate: SolutionMotivationComponentMap_Aggregate;
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  motivation: MotivationElementGeneric;
  motivationId: Scalars['uuid']['output'];
  /** An object relationship */
  solution: Solution;
  solutionId: Scalars['uuid']['output'];
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "map_solution_motivation" */
export type SolutionMotivationElementMapComponentsInSolutionArgs = {
  distinct_on?: InputMaybe<Array<SolutionMotivationComponentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionMotivationComponentMap_Order_By>>;
  where?: InputMaybe<SolutionMotivationComponentMap_Bool_Exp>;
};


/** columns and relationships of "map_solution_motivation" */
export type SolutionMotivationElementMapComponentsInSolution_AggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionMotivationComponentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionMotivationComponentMap_Order_By>>;
  where?: InputMaybe<SolutionMotivationComponentMap_Bool_Exp>;
};

/** aggregated selection of "map_solution_motivation" */
export type SolutionMotivationElementMap_Aggregate = {
  __typename?: 'SolutionMotivationElementMap_aggregate';
  aggregate?: Maybe<SolutionMotivationElementMap_Aggregate_Fields>;
  nodes: Array<SolutionMotivationElementMap>;
};

export type SolutionMotivationElementMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<SolutionMotivationElementMap_Aggregate_Bool_Exp_Count>;
};

export type SolutionMotivationElementMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<SolutionMotivationElementMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<SolutionMotivationElementMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_solution_motivation" */
export type SolutionMotivationElementMap_Aggregate_Fields = {
  __typename?: 'SolutionMotivationElementMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<SolutionMotivationElementMap_Max_Fields>;
  min?: Maybe<SolutionMotivationElementMap_Min_Fields>;
};


/** aggregate fields of "map_solution_motivation" */
export type SolutionMotivationElementMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<SolutionMotivationElementMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_solution_motivation" */
export type SolutionMotivationElementMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<SolutionMotivationElementMap_Max_Order_By>;
  min?: InputMaybe<SolutionMotivationElementMap_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "map_solution_motivation". All fields are combined with a logical 'AND'. */
export type SolutionMotivationElementMap_Bool_Exp = {
  _and?: InputMaybe<Array<SolutionMotivationElementMap_Bool_Exp>>;
  _not?: InputMaybe<SolutionMotivationElementMap_Bool_Exp>;
  _or?: InputMaybe<Array<SolutionMotivationElementMap_Bool_Exp>>;
  componentsInSolution?: InputMaybe<SolutionMotivationComponentMap_Bool_Exp>;
  componentsInSolution_aggregate?: InputMaybe<SolutionMotivationComponentMap_Aggregate_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  motivation?: InputMaybe<MotivationElementGeneric_Bool_Exp>;
  motivationId?: InputMaybe<Uuid_Comparison_Exp>;
  solution?: InputMaybe<Solution_Bool_Exp>;
  solutionId?: InputMaybe<Uuid_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type SolutionMotivationElementMap_Max_Fields = {
  __typename?: 'SolutionMotivationElementMap_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  motivationId?: Maybe<Scalars['uuid']['output']>;
  solutionId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_solution_motivation" */
export type SolutionMotivationElementMap_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  motivationId?: InputMaybe<Order_By>;
  solutionId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type SolutionMotivationElementMap_Min_Fields = {
  __typename?: 'SolutionMotivationElementMap_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  motivationId?: Maybe<Scalars['uuid']['output']>;
  solutionId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_solution_motivation" */
export type SolutionMotivationElementMap_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  motivationId?: InputMaybe<Order_By>;
  solutionId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "map_solution_motivation". */
export type SolutionMotivationElementMap_Order_By = {
  componentsInSolution_aggregate?: InputMaybe<SolutionMotivationComponentMap_Aggregate_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  motivation?: InputMaybe<MotivationElementGeneric_Order_By>;
  motivationId?: InputMaybe<Order_By>;
  solution?: InputMaybe<Solution_Order_By>;
  solutionId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "map_solution_motivation" */
export enum SolutionMotivationElementMap_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  MotivationId = 'motivationId',
  /** column name */
  SolutionId = 'solutionId',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "SolutionMotivationElementMap" */
export type SolutionMotivationElementMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: SolutionMotivationElementMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type SolutionMotivationElementMap_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  motivationId?: InputMaybe<Scalars['uuid']['input']>;
  solutionId?: InputMaybe<Scalars['uuid']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "map_solution_stakeholder" */
export type SolutionStakeholderMap = {
  __typename?: 'SolutionStakeholderMap';
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  role: Scalars['stakeholder_role_enum']['output'];
  /** An object relationship */
  solution: Solution;
  solutionId: Scalars['uuid']['output'];
  /** An object relationship */
  stakeholder: Stakeholder;
  stakeholderId: Scalars['uuid']['output'];
  state: Scalars['solution_item_impact_type_enum']['output'];
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_solution_stakeholder" */
export type SolutionStakeholderMap_Aggregate = {
  __typename?: 'SolutionStakeholderMap_aggregate';
  aggregate?: Maybe<SolutionStakeholderMap_Aggregate_Fields>;
  nodes: Array<SolutionStakeholderMap>;
};

export type SolutionStakeholderMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<SolutionStakeholderMap_Aggregate_Bool_Exp_Count>;
};

export type SolutionStakeholderMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<SolutionStakeholderMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<SolutionStakeholderMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_solution_stakeholder" */
export type SolutionStakeholderMap_Aggregate_Fields = {
  __typename?: 'SolutionStakeholderMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<SolutionStakeholderMap_Max_Fields>;
  min?: Maybe<SolutionStakeholderMap_Min_Fields>;
};


/** aggregate fields of "map_solution_stakeholder" */
export type SolutionStakeholderMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<SolutionStakeholderMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_solution_stakeholder" */
export type SolutionStakeholderMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<SolutionStakeholderMap_Max_Order_By>;
  min?: InputMaybe<SolutionStakeholderMap_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "map_solution_stakeholder". All fields are combined with a logical 'AND'. */
export type SolutionStakeholderMap_Bool_Exp = {
  _and?: InputMaybe<Array<SolutionStakeholderMap_Bool_Exp>>;
  _not?: InputMaybe<SolutionStakeholderMap_Bool_Exp>;
  _or?: InputMaybe<Array<SolutionStakeholderMap_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  role?: InputMaybe<Stakeholder_Role_Enum_Comparison_Exp>;
  solution?: InputMaybe<Solution_Bool_Exp>;
  solutionId?: InputMaybe<Uuid_Comparison_Exp>;
  stakeholder?: InputMaybe<Stakeholder_Bool_Exp>;
  stakeholderId?: InputMaybe<Uuid_Comparison_Exp>;
  state?: InputMaybe<Solution_Item_Impact_Type_Enum_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type SolutionStakeholderMap_Max_Fields = {
  __typename?: 'SolutionStakeholderMap_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['stakeholder_role_enum']['output']>;
  solutionId?: Maybe<Scalars['uuid']['output']>;
  stakeholderId?: Maybe<Scalars['uuid']['output']>;
  state?: Maybe<Scalars['solution_item_impact_type_enum']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_solution_stakeholder" */
export type SolutionStakeholderMap_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  solutionId?: InputMaybe<Order_By>;
  stakeholderId?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type SolutionStakeholderMap_Min_Fields = {
  __typename?: 'SolutionStakeholderMap_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['stakeholder_role_enum']['output']>;
  solutionId?: Maybe<Scalars['uuid']['output']>;
  stakeholderId?: Maybe<Scalars['uuid']['output']>;
  state?: Maybe<Scalars['solution_item_impact_type_enum']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_solution_stakeholder" */
export type SolutionStakeholderMap_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  solutionId?: InputMaybe<Order_By>;
  stakeholderId?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "map_solution_stakeholder". */
export type SolutionStakeholderMap_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  solution?: InputMaybe<Solution_Order_By>;
  solutionId?: InputMaybe<Order_By>;
  stakeholder?: InputMaybe<Stakeholder_Order_By>;
  stakeholderId?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "map_solution_stakeholder" */
export enum SolutionStakeholderMap_Select_Column {
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
  Role = 'role',
  /** column name */
  SolutionId = 'solutionId',
  /** column name */
  StakeholderId = 'stakeholderId',
  /** column name */
  State = 'state',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "SolutionStakeholderMap" */
export type SolutionStakeholderMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: SolutionStakeholderMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type SolutionStakeholderMap_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['stakeholder_role_enum']['input']>;
  solutionId?: InputMaybe<Scalars['uuid']['input']>;
  stakeholderId?: InputMaybe<Scalars['uuid']['input']>;
  state?: InputMaybe<Scalars['solution_item_impact_type_enum']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "map_solution_technology_node" */
export type SolutionTechnologyNodeMap = {
  __typename?: 'SolutionTechnologyNodeMap';
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  node: TechnologyNode;
  nodeId: Scalars['uuid']['output'];
  /** An object relationship */
  solution: Solution;
  solutionId: Scalars['uuid']['output'];
  state: Scalars['solution_item_impact_type_enum']['output'];
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_solution_technology_node" */
export type SolutionTechnologyNodeMap_Aggregate = {
  __typename?: 'SolutionTechnologyNodeMap_aggregate';
  aggregate?: Maybe<SolutionTechnologyNodeMap_Aggregate_Fields>;
  nodes: Array<SolutionTechnologyNodeMap>;
};

export type SolutionTechnologyNodeMap_Aggregate_Bool_Exp = {
  count?: InputMaybe<SolutionTechnologyNodeMap_Aggregate_Bool_Exp_Count>;
};

export type SolutionTechnologyNodeMap_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<SolutionTechnologyNodeMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<SolutionTechnologyNodeMap_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_solution_technology_node" */
export type SolutionTechnologyNodeMap_Aggregate_Fields = {
  __typename?: 'SolutionTechnologyNodeMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<SolutionTechnologyNodeMap_Max_Fields>;
  min?: Maybe<SolutionTechnologyNodeMap_Min_Fields>;
};


/** aggregate fields of "map_solution_technology_node" */
export type SolutionTechnologyNodeMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<SolutionTechnologyNodeMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_solution_technology_node" */
export type SolutionTechnologyNodeMap_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<SolutionTechnologyNodeMap_Max_Order_By>;
  min?: InputMaybe<SolutionTechnologyNodeMap_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "map_solution_technology_node". All fields are combined with a logical 'AND'. */
export type SolutionTechnologyNodeMap_Bool_Exp = {
  _and?: InputMaybe<Array<SolutionTechnologyNodeMap_Bool_Exp>>;
  _not?: InputMaybe<SolutionTechnologyNodeMap_Bool_Exp>;
  _or?: InputMaybe<Array<SolutionTechnologyNodeMap_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  node?: InputMaybe<TechnologyNode_Bool_Exp>;
  nodeId?: InputMaybe<Uuid_Comparison_Exp>;
  solution?: InputMaybe<Solution_Bool_Exp>;
  solutionId?: InputMaybe<Uuid_Comparison_Exp>;
  state?: InputMaybe<Solution_Item_Impact_Type_Enum_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type SolutionTechnologyNodeMap_Max_Fields = {
  __typename?: 'SolutionTechnologyNodeMap_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  nodeId?: Maybe<Scalars['uuid']['output']>;
  solutionId?: Maybe<Scalars['uuid']['output']>;
  state?: Maybe<Scalars['solution_item_impact_type_enum']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "map_solution_technology_node" */
export type SolutionTechnologyNodeMap_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  nodeId?: InputMaybe<Order_By>;
  solutionId?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type SolutionTechnologyNodeMap_Min_Fields = {
  __typename?: 'SolutionTechnologyNodeMap_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  nodeId?: Maybe<Scalars['uuid']['output']>;
  solutionId?: Maybe<Scalars['uuid']['output']>;
  state?: Maybe<Scalars['solution_item_impact_type_enum']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "map_solution_technology_node" */
export type SolutionTechnologyNodeMap_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  nodeId?: InputMaybe<Order_By>;
  solutionId?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "map_solution_technology_node". */
export type SolutionTechnologyNodeMap_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  node?: InputMaybe<TechnologyNode_Order_By>;
  nodeId?: InputMaybe<Order_By>;
  solution?: InputMaybe<Solution_Order_By>;
  solutionId?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "map_solution_technology_node" */
export enum SolutionTechnologyNodeMap_Select_Column {
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
  NodeId = 'nodeId',
  /** column name */
  SolutionId = 'solutionId',
  /** column name */
  State = 'state',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "SolutionTechnologyNodeMap" */
export type SolutionTechnologyNodeMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: SolutionTechnologyNodeMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type SolutionTechnologyNodeMap_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  nodeId?: InputMaybe<Scalars['uuid']['input']>;
  solutionId?: InputMaybe<Scalars['uuid']['input']>;
  state?: InputMaybe<Scalars['solution_item_impact_type_enum']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregated selection of "solutions" */
export type Solution_Aggregate = {
  __typename?: 'Solution_aggregate';
  aggregate?: Maybe<Solution_Aggregate_Fields>;
  nodes: Array<Solution>;
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

/** Boolean expression to filter rows from the table "solutions". All fields are combined with a logical 'AND'. */
export type Solution_Bool_Exp = {
  _and?: InputMaybe<Array<Solution_Bool_Exp>>;
  _not?: InputMaybe<Solution_Bool_Exp>;
  _or?: InputMaybe<Array<Solution_Bool_Exp>>;
  acceptedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  acceptedBy?: InputMaybe<Uuid_Comparison_Exp>;
  alternatives?: InputMaybe<String_Comparison_Exp>;
  code?: InputMaybe<String_Comparison_Exp>;
  components?: InputMaybe<SolutionApplicationComponentMap_Bool_Exp>;
  components_aggregate?: InputMaybe<SolutionApplicationComponentMap_Aggregate_Bool_Exp>;
  consequences?: InputMaybe<String_Comparison_Exp>;
  context?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  dataObjectsInComponent?: InputMaybe<SolutionDataObjectMap_Bool_Exp>;
  dataObjectsInComponent_aggregate?: InputMaybe<SolutionDataObjectMap_Aggregate_Bool_Exp>;
  decision?: InputMaybe<String_Comparison_Exp>;
  decisionStatus?: InputMaybe<Solution_Life_Cycle_Enum_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  flows?: InputMaybe<SolutionFlowMap_Bool_Exp>;
  flows_aggregate?: InputMaybe<SolutionFlowMap_Aggregate_Bool_Exp>;
  functions?: InputMaybe<SolutionApplicationFunctionMap_Bool_Exp>;
  functions_aggregate?: InputMaybe<SolutionApplicationFunctionMap_Aggregate_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  implementationStatus?: InputMaybe<Solution_Implementation_Status_Enum_Comparison_Exp>;
  motivations?: InputMaybe<SolutionMotivationElementMap_Bool_Exp>;
  motivations_aggregate?: InputMaybe<SolutionMotivationElementMap_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  nodes?: InputMaybe<SolutionTechnologyNodeMap_Bool_Exp>;
  nodes_aggregate?: InputMaybe<SolutionTechnologyNodeMap_Aggregate_Bool_Exp>;
  stakeholders?: InputMaybe<SolutionStakeholderMap_Bool_Exp>;
  stakeholders_aggregate?: InputMaybe<SolutionStakeholderMap_Aggregate_Bool_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
  variants?: InputMaybe<Variant_Bool_Exp>;
  variants_aggregate?: InputMaybe<Variant_Aggregate_Bool_Exp>;
  views?: InputMaybe<View_Bool_Exp>;
  views_aggregate?: InputMaybe<View_Aggregate_Bool_Exp>;
};

/** aggregate max on columns */
export type Solution_Max_Fields = {
  __typename?: 'Solution_max_fields';
  acceptedAt?: Maybe<Scalars['timestamptz']['output']>;
  acceptedBy?: Maybe<Scalars['uuid']['output']>;
  alternatives?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  consequences?: Maybe<Scalars['String']['output']>;
  context?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  decision?: Maybe<Scalars['String']['output']>;
  decisionStatus?: Maybe<Scalars['solution_life_cycle_enum']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  implementationStatus?: Maybe<Scalars['solution_implementation_status_enum']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type Solution_Min_Fields = {
  __typename?: 'Solution_min_fields';
  acceptedAt?: Maybe<Scalars['timestamptz']['output']>;
  acceptedBy?: Maybe<Scalars['uuid']['output']>;
  alternatives?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  consequences?: Maybe<Scalars['String']['output']>;
  context?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  decision?: Maybe<Scalars['String']['output']>;
  decisionStatus?: Maybe<Scalars['solution_life_cycle_enum']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  implementationStatus?: Maybe<Scalars['solution_implementation_status_enum']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** Ordering options when selecting data from "solutions". */
export type Solution_Order_By = {
  acceptedAt?: InputMaybe<Order_By>;
  acceptedBy?: InputMaybe<Order_By>;
  alternatives?: InputMaybe<Order_By>;
  code?: InputMaybe<Order_By>;
  components_aggregate?: InputMaybe<SolutionApplicationComponentMap_Aggregate_Order_By>;
  consequences?: InputMaybe<Order_By>;
  context?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  dataObjectsInComponent_aggregate?: InputMaybe<SolutionDataObjectMap_Aggregate_Order_By>;
  decision?: InputMaybe<Order_By>;
  decisionStatus?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  flows_aggregate?: InputMaybe<SolutionFlowMap_Aggregate_Order_By>;
  functions_aggregate?: InputMaybe<SolutionApplicationFunctionMap_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  implementationStatus?: InputMaybe<Order_By>;
  motivations_aggregate?: InputMaybe<SolutionMotivationElementMap_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  nodes_aggregate?: InputMaybe<SolutionTechnologyNodeMap_Aggregate_Order_By>;
  stakeholders_aggregate?: InputMaybe<SolutionStakeholderMap_Aggregate_Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
  variants_aggregate?: InputMaybe<Variant_Aggregate_Order_By>;
  views_aggregate?: InputMaybe<View_Aggregate_Order_By>;
};

/** select columns of table "solutions" */
export enum Solution_Select_Column {
  /** column name */
  AcceptedAt = 'acceptedAt',
  /** column name */
  AcceptedBy = 'acceptedBy',
  /** column name */
  Alternatives = 'alternatives',
  /** column name */
  Code = 'code',
  /** column name */
  Consequences = 'consequences',
  /** column name */
  Context = 'context',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  Decision = 'decision',
  /** column name */
  DecisionStatus = 'decisionStatus',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  ImplementationStatus = 'implementationStatus',
  /** column name */
  Name = 'name',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "Solution" */
export type Solution_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Solution_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Solution_Stream_Cursor_Value_Input = {
  acceptedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  acceptedBy?: InputMaybe<Scalars['uuid']['input']>;
  alternatives?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  consequences?: InputMaybe<Scalars['String']['input']>;
  context?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  decision?: InputMaybe<Scalars['String']['input']>;
  decisionStatus?: InputMaybe<Scalars['solution_life_cycle_enum']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  implementationStatus?: InputMaybe<Scalars['solution_implementation_status_enum']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
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
  /** An array relationship */
  solutions: Array<SolutionStakeholderMap>;
  /** An aggregate relationship */
  solutions_aggregate: SolutionStakeholderMap_Aggregate;
  tenantId: Scalars['uuid']['output'];
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


/** columns and relationships of "stakeholders" */
export type StakeholderSolutionsArgs = {
  distinct_on?: InputMaybe<Array<SolutionStakeholderMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionStakeholderMap_Order_By>>;
  where?: InputMaybe<SolutionStakeholderMap_Bool_Exp>;
};


/** columns and relationships of "stakeholders" */
export type StakeholderSolutions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionStakeholderMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionStakeholderMap_Order_By>>;
  where?: InputMaybe<SolutionStakeholderMap_Bool_Exp>;
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
  solutions?: InputMaybe<SolutionStakeholderMap_Bool_Exp>;
  solutions_aggregate?: InputMaybe<SolutionStakeholderMap_Aggregate_Bool_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
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
  solutions_aggregate?: InputMaybe<SolutionStakeholderMap_Aggregate_Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

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
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
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
  radarArea: Scalars['technology_radar_zone']['output'];
  tenantId: Scalars['uuid']['output'];
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

/** aggregated selection of "system_software" */
export type SystemSoftware_Aggregate = {
  __typename?: 'SystemSoftware_aggregate';
  aggregate?: Maybe<SystemSoftware_Aggregate_Fields>;
  nodes: Array<SystemSoftware>;
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
  radarArea?: InputMaybe<Technology_Radar_Zone_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  type?: InputMaybe<DirectoryObject_Bool_Exp>;
  typeId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
  version?: InputMaybe<String_Comparison_Exp>;
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
  radarArea?: Maybe<Scalars['technology_radar_zone']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  typeId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
  version?: Maybe<Scalars['String']['output']>;
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
  radarArea?: Maybe<Scalars['technology_radar_zone']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  typeId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
  version?: Maybe<Scalars['String']['output']>;
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
  radarArea?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  type?: InputMaybe<DirectoryObject_Order_By>;
  typeId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
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
  RadarArea = 'radarArea',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  TypeId = 'typeId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy',
  /** column name */
  Version = 'version'
}

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
  radarArea?: InputMaybe<Scalars['technology_radar_zone']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  typeId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "technology_networks" */
export type TechnologyNetwork = {
  __typename?: 'TechnologyNetwork';
  /** An array relationship */
  children: Array<TechnologyNetworkHierarchyMap>;
  /** An aggregate relationship */
  children_aggregate: TechnologyNetworkHierarchyMap_Aggregate;
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
  location?: Maybe<Location>;
  locationId?: Maybe<Scalars['uuid']['output']>;
  name: Scalars['String']['output'];
  /** An array relationship */
  nodes: Array<TechnologyNode>;
  /** An aggregate relationship */
  nodes_aggregate: TechnologyNode_Aggregate;
  /** An array relationship */
  parents: Array<TechnologyNetworkHierarchyMap>;
  /** An aggregate relationship */
  parents_aggregate: TechnologyNetworkHierarchyMap_Aggregate;
  scope?: Maybe<Scalars['network_scope_enum']['output']>;
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "technology_networks" */
export type TechnologyNetworkChildrenArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNetworkHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNetworkHierarchyMap_Order_By>>;
  where?: InputMaybe<TechnologyNetworkHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "technology_networks" */
export type TechnologyNetworkChildren_AggregateArgs = {
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
export type TechnologyNetworkParentsArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNetworkHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNetworkHierarchyMap_Order_By>>;
  where?: InputMaybe<TechnologyNetworkHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "technology_networks" */
export type TechnologyNetworkParents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNetworkHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNetworkHierarchyMap_Order_By>>;
  where?: InputMaybe<TechnologyNetworkHierarchyMap_Bool_Exp>;
};

/** columns and relationships of "map_technology_network_hierarchy" */
export type TechnologyNetworkHierarchyMap = {
  __typename?: 'TechnologyNetworkHierarchyMap';
  /** An object relationship */
  child: TechnologyNetwork;
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  networkChildId: Scalars['uuid']['output'];
  networkParentId: Scalars['uuid']['output'];
  order?: Maybe<Scalars['Int']['output']>;
  /** An object relationship */
  parent: TechnologyNetwork;
  tenantId: Scalars['uuid']['output'];
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
  child?: InputMaybe<TechnologyNetwork_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  networkChildId?: InputMaybe<Uuid_Comparison_Exp>;
  networkParentId?: InputMaybe<Uuid_Comparison_Exp>;
  order?: InputMaybe<Int_Comparison_Exp>;
  parent?: InputMaybe<TechnologyNetwork_Bool_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "map_technology_network_hierarchy". */
export type TechnologyNetworkHierarchyMap_Order_By = {
  child?: InputMaybe<TechnologyNetwork_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  networkChildId?: InputMaybe<Order_By>;
  networkParentId?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  parent?: InputMaybe<TechnologyNetwork_Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

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
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
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

/** Boolean expression to filter rows from the table "technology_networks". All fields are combined with a logical 'AND'. */
export type TechnologyNetwork_Bool_Exp = {
  _and?: InputMaybe<Array<TechnologyNetwork_Bool_Exp>>;
  _not?: InputMaybe<TechnologyNetwork_Bool_Exp>;
  _or?: InputMaybe<Array<TechnologyNetwork_Bool_Exp>>;
  children?: InputMaybe<TechnologyNetworkHierarchyMap_Bool_Exp>;
  children_aggregate?: InputMaybe<TechnologyNetworkHierarchyMap_Aggregate_Bool_Exp>;
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
  location?: InputMaybe<Location_Bool_Exp>;
  locationId?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  nodes?: InputMaybe<TechnologyNode_Bool_Exp>;
  nodes_aggregate?: InputMaybe<TechnologyNode_Aggregate_Bool_Exp>;
  parents?: InputMaybe<TechnologyNetworkHierarchyMap_Bool_Exp>;
  parents_aggregate?: InputMaybe<TechnologyNetworkHierarchyMap_Aggregate_Bool_Exp>;
  scope?: InputMaybe<Network_Scope_Enum_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "technology_networks". */
export type TechnologyNetwork_Order_By = {
  children_aggregate?: InputMaybe<TechnologyNetworkHierarchyMap_Aggregate_Order_By>;
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
  location?: InputMaybe<Location_Order_By>;
  locationId?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  nodes_aggregate?: InputMaybe<TechnologyNode_Aggregate_Order_By>;
  parents_aggregate?: InputMaybe<TechnologyNetworkHierarchyMap_Aggregate_Order_By>;
  scope?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

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
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "technology_nodes" */
export type TechnologyNode = {
  __typename?: 'TechnologyNode';
  architecture: Scalars['system_architecture_kind_enum']['output'];
  /** An array relationship */
  children: Array<TechnologyNodeHierarchyMap>;
  /** An aggregate relationship */
  children_aggregate: TechnologyNodeHierarchyMap_Aggregate;
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
  parents: Array<TechnologyNodeHierarchyMap>;
  /** An aggregate relationship */
  parents_aggregate: TechnologyNodeHierarchyMap_Aggregate;
  ramGb?: Maybe<Scalars['Int']['output']>;
  /** An array relationship */
  solutions: Array<SolutionTechnologyNodeMap>;
  /** An aggregate relationship */
  solutions_aggregate: SolutionTechnologyNodeMap_Aggregate;
  storageGb?: Maybe<Scalars['Int']['output']>;
  /** An array relationship */
  systemSoftware: Array<TechnologyNodeSystemSoftwareMap>;
  /** An aggregate relationship */
  systemSoftware_aggregate: TechnologyNodeSystemSoftwareMap_Aggregate;
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
export type TechnologyNodeChildrenArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNodeHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNodeHierarchyMap_Order_By>>;
  where?: InputMaybe<TechnologyNodeHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "technology_nodes" */
export type TechnologyNodeChildren_AggregateArgs = {
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
export type TechnologyNodeParentsArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNodeHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNodeHierarchyMap_Order_By>>;
  where?: InputMaybe<TechnologyNodeHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "technology_nodes" */
export type TechnologyNodeParents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<TechnologyNodeHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<TechnologyNodeHierarchyMap_Order_By>>;
  where?: InputMaybe<TechnologyNodeHierarchyMap_Bool_Exp>;
};


/** columns and relationships of "technology_nodes" */
export type TechnologyNodeSolutionsArgs = {
  distinct_on?: InputMaybe<Array<SolutionTechnologyNodeMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionTechnologyNodeMap_Order_By>>;
  where?: InputMaybe<SolutionTechnologyNodeMap_Bool_Exp>;
};


/** columns and relationships of "technology_nodes" */
export type TechnologyNodeSolutions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionTechnologyNodeMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionTechnologyNodeMap_Order_By>>;
  where?: InputMaybe<SolutionTechnologyNodeMap_Bool_Exp>;
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
  /** An object relationship */
  child: TechnologyNode;
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  nodeChildId: Scalars['uuid']['output'];
  nodeParentId: Scalars['uuid']['output'];
  order?: Maybe<Scalars['Int']['output']>;
  /** An object relationship */
  parent: TechnologyNode;
  tenantId: Scalars['uuid']['output'];
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
  child?: InputMaybe<TechnologyNode_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  nodeChildId?: InputMaybe<Uuid_Comparison_Exp>;
  nodeParentId?: InputMaybe<Uuid_Comparison_Exp>;
  order?: InputMaybe<Int_Comparison_Exp>;
  parent?: InputMaybe<TechnologyNode_Bool_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "map_technology_node_hierarchy". */
export type TechnologyNodeHierarchyMap_Order_By = {
  child?: InputMaybe<TechnologyNode_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  nodeChildId?: InputMaybe<Order_By>;
  nodeParentId?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  parent?: InputMaybe<TechnologyNode_Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

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
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
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
  tenantId: Scalars['uuid']['output'];
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
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

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
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
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
  children?: InputMaybe<TechnologyNodeHierarchyMap_Bool_Exp>;
  children_aggregate?: InputMaybe<TechnologyNodeHierarchyMap_Aggregate_Bool_Exp>;
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
  parents?: InputMaybe<TechnologyNodeHierarchyMap_Bool_Exp>;
  parents_aggregate?: InputMaybe<TechnologyNodeHierarchyMap_Aggregate_Bool_Exp>;
  ramGb?: InputMaybe<Int_Comparison_Exp>;
  solutions?: InputMaybe<SolutionTechnologyNodeMap_Bool_Exp>;
  solutions_aggregate?: InputMaybe<SolutionTechnologyNodeMap_Aggregate_Bool_Exp>;
  storageGb?: InputMaybe<Int_Comparison_Exp>;
  systemSoftware?: InputMaybe<TechnologyNodeSystemSoftwareMap_Bool_Exp>;
  systemSoftware_aggregate?: InputMaybe<TechnologyNodeSystemSoftwareMap_Aggregate_Bool_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  totalCpuCores?: InputMaybe<Int_Comparison_Exp>;
  totalRamGb?: InputMaybe<Int_Comparison_Exp>;
  totalStorageGb?: InputMaybe<Int_Comparison_Exp>;
  type?: InputMaybe<DirectoryObject_Bool_Exp>;
  typeId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
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
  tenantId?: Maybe<Scalars['uuid']['output']>;
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
  tenantId?: InputMaybe<Order_By>;
  totalCpuCores?: InputMaybe<Order_By>;
  totalRamGb?: InputMaybe<Order_By>;
  totalStorageGb?: InputMaybe<Order_By>;
  typeId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "technology_nodes". */
export type TechnologyNode_Order_By = {
  architecture?: InputMaybe<Order_By>;
  children_aggregate?: InputMaybe<TechnologyNodeHierarchyMap_Aggregate_Order_By>;
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
  parents_aggregate?: InputMaybe<TechnologyNodeHierarchyMap_Aggregate_Order_By>;
  ramGb?: InputMaybe<Order_By>;
  solutions_aggregate?: InputMaybe<SolutionTechnologyNodeMap_Aggregate_Order_By>;
  storageGb?: InputMaybe<Order_By>;
  systemSoftware_aggregate?: InputMaybe<TechnologyNodeSystemSoftwareMap_Aggregate_Order_By>;
  tenantId?: InputMaybe<Order_By>;
  totalCpuCores?: InputMaybe<Order_By>;
  totalRamGb?: InputMaybe<Order_By>;
  totalStorageGb?: InputMaybe<Order_By>;
  type?: InputMaybe<DirectoryObject_Order_By>;
  typeId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
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
  TenantId = 'tenantId',
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
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
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

/** columns and relationships of "tenants" */
export type Tenant = {
  __typename?: 'Tenant';
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  /** An object relationship */
  owner?: Maybe<UserProfile>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "tenants" */
export type Tenant_Aggregate = {
  __typename?: 'Tenant_aggregate';
  aggregate?: Maybe<Tenant_Aggregate_Fields>;
  nodes: Array<Tenant>;
};

/** aggregate fields of "tenants" */
export type Tenant_Aggregate_Fields = {
  __typename?: 'Tenant_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Tenant_Max_Fields>;
  min?: Maybe<Tenant_Min_Fields>;
};


/** aggregate fields of "tenants" */
export type Tenant_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Tenant_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "tenants". All fields are combined with a logical 'AND'. */
export type Tenant_Bool_Exp = {
  _and?: InputMaybe<Array<Tenant_Bool_Exp>>;
  _not?: InputMaybe<Tenant_Bool_Exp>;
  _or?: InputMaybe<Array<Tenant_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  owner?: InputMaybe<UserProfile_Bool_Exp>;
  ownerId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type Tenant_Max_Fields = {
  __typename?: 'Tenant_max_fields';
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
export type Tenant_Min_Fields = {
  __typename?: 'Tenant_min_fields';
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

/** Ordering options when selecting data from "tenants". */
export type Tenant_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  owner?: InputMaybe<UserProfile_Order_By>;
  ownerId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "tenants" */
export enum Tenant_Select_Column {
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

/** Streaming cursor of the table "Tenant" */
export type Tenant_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Tenant_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Tenant_Stream_Cursor_Value_Input = {
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

/** columns and relationships of "user_profiles" */
export type UserProfile = {
  __typename?: 'UserProfile';
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  keycloakId?: Maybe<Scalars['String']['output']>;
  middleName?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  state: Scalars['user_state']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "user_profiles" */
export type UserProfile_Aggregate = {
  __typename?: 'UserProfile_aggregate';
  aggregate?: Maybe<UserProfile_Aggregate_Fields>;
  nodes: Array<UserProfile>;
};

/** aggregate fields of "user_profiles" */
export type UserProfile_Aggregate_Fields = {
  __typename?: 'UserProfile_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<UserProfile_Max_Fields>;
  min?: Maybe<UserProfile_Min_Fields>;
};


/** aggregate fields of "user_profiles" */
export type UserProfile_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<UserProfile_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "user_profiles". All fields are combined with a logical 'AND'. */
export type UserProfile_Bool_Exp = {
  _and?: InputMaybe<Array<UserProfile_Bool_Exp>>;
  _not?: InputMaybe<UserProfile_Bool_Exp>;
  _or?: InputMaybe<Array<UserProfile_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  department?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  keycloakId?: InputMaybe<String_Comparison_Exp>;
  middleName?: InputMaybe<String_Comparison_Exp>;
  position?: InputMaybe<String_Comparison_Exp>;
  state?: InputMaybe<User_State_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type UserProfile_Max_Fields = {
  __typename?: 'UserProfile_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  keycloakId?: Maybe<Scalars['String']['output']>;
  middleName?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['user_state']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type UserProfile_Min_Fields = {
  __typename?: 'UserProfile_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  keycloakId?: Maybe<Scalars['String']['output']>;
  middleName?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['user_state']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** Ordering options when selecting data from "user_profiles". */
export type UserProfile_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  department?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  keycloakId?: InputMaybe<Order_By>;
  middleName?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "user_profiles" */
export enum UserProfile_Select_Column {
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
  Department = 'department',
  /** column name */
  Id = 'id',
  /** column name */
  KeycloakId = 'keycloakId',
  /** column name */
  MiddleName = 'middleName',
  /** column name */
  Position = 'position',
  /** column name */
  State = 'state',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "UserProfile" */
export type UserProfile_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: UserProfile_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type UserProfile_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  keycloakId?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['user_state']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "variants" */
export type Variant = {
  __typename?: 'Variant';
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  /** An object relationship */
  solution: Solution;
  solutionId: Scalars['uuid']['output'];
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** columns and relationships of "map_variant_motivation" */
export type VariantMotivationElementMap = {
  __typename?: 'VariantMotivationElementMap';
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  motivation: MotivationElementGeneric;
  motivationId: Scalars['uuid']['output'];
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  variant: Variant;
  variantId: Scalars['uuid']['output'];
};

/** aggregated selection of "map_variant_motivation" */
export type VariantMotivationElementMap_Aggregate = {
  __typename?: 'VariantMotivationElementMap_aggregate';
  aggregate?: Maybe<VariantMotivationElementMap_Aggregate_Fields>;
  nodes: Array<VariantMotivationElementMap>;
};

/** aggregate fields of "map_variant_motivation" */
export type VariantMotivationElementMap_Aggregate_Fields = {
  __typename?: 'VariantMotivationElementMap_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<VariantMotivationElementMap_Max_Fields>;
  min?: Maybe<VariantMotivationElementMap_Min_Fields>;
};


/** aggregate fields of "map_variant_motivation" */
export type VariantMotivationElementMap_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<VariantMotivationElementMap_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "map_variant_motivation". All fields are combined with a logical 'AND'. */
export type VariantMotivationElementMap_Bool_Exp = {
  _and?: InputMaybe<Array<VariantMotivationElementMap_Bool_Exp>>;
  _not?: InputMaybe<VariantMotivationElementMap_Bool_Exp>;
  _or?: InputMaybe<Array<VariantMotivationElementMap_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  motivation?: InputMaybe<MotivationElementGeneric_Bool_Exp>;
  motivationId?: InputMaybe<Uuid_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
  variant?: InputMaybe<Variant_Bool_Exp>;
  variantId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type VariantMotivationElementMap_Max_Fields = {
  __typename?: 'VariantMotivationElementMap_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  motivationId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
  variantId?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type VariantMotivationElementMap_Min_Fields = {
  __typename?: 'VariantMotivationElementMap_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  motivationId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
  variantId?: Maybe<Scalars['uuid']['output']>;
};

/** Ordering options when selecting data from "map_variant_motivation". */
export type VariantMotivationElementMap_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  motivation?: InputMaybe<MotivationElementGeneric_Order_By>;
  motivationId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
  variant?: InputMaybe<Variant_Order_By>;
  variantId?: InputMaybe<Order_By>;
};

/** select columns of table "map_variant_motivation" */
export enum VariantMotivationElementMap_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  MotivationId = 'motivationId',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy',
  /** column name */
  VariantId = 'variantId'
}

/** Streaming cursor of the table "VariantMotivationElementMap" */
export type VariantMotivationElementMap_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: VariantMotivationElementMap_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type VariantMotivationElementMap_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  motivationId?: InputMaybe<Scalars['uuid']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
  variantId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregated selection of "variants" */
export type Variant_Aggregate = {
  __typename?: 'Variant_aggregate';
  aggregate?: Maybe<Variant_Aggregate_Fields>;
  nodes: Array<Variant>;
};

export type Variant_Aggregate_Bool_Exp = {
  count?: InputMaybe<Variant_Aggregate_Bool_Exp_Count>;
};

export type Variant_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Variant_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Variant_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "variants" */
export type Variant_Aggregate_Fields = {
  __typename?: 'Variant_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Variant_Max_Fields>;
  min?: Maybe<Variant_Min_Fields>;
};


/** aggregate fields of "variants" */
export type Variant_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Variant_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "variants" */
export type Variant_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Variant_Max_Order_By>;
  min?: InputMaybe<Variant_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "variants". All fields are combined with a logical 'AND'. */
export type Variant_Bool_Exp = {
  _and?: InputMaybe<Array<Variant_Bool_Exp>>;
  _not?: InputMaybe<Variant_Bool_Exp>;
  _or?: InputMaybe<Array<Variant_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  solution?: InputMaybe<Solution_Bool_Exp>;
  solutionId?: InputMaybe<Uuid_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type Variant_Max_Fields = {
  __typename?: 'Variant_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  solutionId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "variants" */
export type Variant_Max_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  solutionId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Variant_Min_Fields = {
  __typename?: 'Variant_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  solutionId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "variants" */
export type Variant_Min_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  solutionId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "variants". */
export type Variant_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  solution?: InputMaybe<Solution_Order_By>;
  solutionId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "variants" */
export enum Variant_Select_Column {
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
  SolutionId = 'solutionId',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "Variant" */
export type Variant_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Variant_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Variant_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  solutionId?: InputMaybe<Scalars['uuid']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "views" */
export type View = {
  __typename?: 'View';
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  /** An object relationship */
  solution: Solution;
  solutionId: Scalars['uuid']['output'];
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  variant: Variant;
  variantId: Scalars['uuid']['output'];
};

/** aggregated selection of "views" */
export type View_Aggregate = {
  __typename?: 'View_aggregate';
  aggregate?: Maybe<View_Aggregate_Fields>;
  nodes: Array<View>;
};

export type View_Aggregate_Bool_Exp = {
  count?: InputMaybe<View_Aggregate_Bool_Exp_Count>;
};

export type View_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<View_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<View_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "views" */
export type View_Aggregate_Fields = {
  __typename?: 'View_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<View_Max_Fields>;
  min?: Maybe<View_Min_Fields>;
};


/** aggregate fields of "views" */
export type View_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<View_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "views" */
export type View_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<View_Max_Order_By>;
  min?: InputMaybe<View_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "views". All fields are combined with a logical 'AND'. */
export type View_Bool_Exp = {
  _and?: InputMaybe<Array<View_Bool_Exp>>;
  _not?: InputMaybe<View_Bool_Exp>;
  _or?: InputMaybe<Array<View_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  solution?: InputMaybe<Solution_Bool_Exp>;
  solutionId?: InputMaybe<Uuid_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
  variant?: InputMaybe<Variant_Bool_Exp>;
  variantId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type View_Max_Fields = {
  __typename?: 'View_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  solutionId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
  variantId?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "views" */
export type View_Max_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  solutionId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
  variantId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type View_Min_Fields = {
  __typename?: 'View_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  solutionId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
  variantId?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "views" */
export type View_Min_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  solutionId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
  variantId?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "views". */
export type View_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  solution?: InputMaybe<Solution_Order_By>;
  solutionId?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
  variant?: InputMaybe<Variant_Order_By>;
  variantId?: InputMaybe<Order_By>;
};

/** select columns of table "views" */
export enum View_Select_Column {
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
  SolutionId = 'solutionId',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy',
  /** column name */
  VariantId = 'variantId'
}

/** Streaming cursor of the table "View" */
export type View_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: View_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type View_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  solutionId?: InputMaybe<Scalars['uuid']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
  variantId?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "workspaces" */
export type Workspace = {
  __typename?: 'Workspace';
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  /** An object relationship */
  owner?: Maybe<UserProfile>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  tenant: Tenant;
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "workspaces" */
export type Workspace_Aggregate = {
  __typename?: 'Workspace_aggregate';
  aggregate?: Maybe<Workspace_Aggregate_Fields>;
  nodes: Array<Workspace>;
};

/** aggregate fields of "workspaces" */
export type Workspace_Aggregate_Fields = {
  __typename?: 'Workspace_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Workspace_Max_Fields>;
  min?: Maybe<Workspace_Min_Fields>;
};


/** aggregate fields of "workspaces" */
export type Workspace_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Workspace_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "workspaces". All fields are combined with a logical 'AND'. */
export type Workspace_Bool_Exp = {
  _and?: InputMaybe<Array<Workspace_Bool_Exp>>;
  _not?: InputMaybe<Workspace_Bool_Exp>;
  _or?: InputMaybe<Array<Workspace_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  owner?: InputMaybe<UserProfile_Bool_Exp>;
  ownerId?: InputMaybe<Uuid_Comparison_Exp>;
  tenant?: InputMaybe<Tenant_Bool_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type Workspace_Max_Fields = {
  __typename?: 'Workspace_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type Workspace_Min_Fields = {
  __typename?: 'Workspace_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** Ordering options when selecting data from "workspaces". */
export type Workspace_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  owner?: InputMaybe<UserProfile_Order_By>;
  ownerId?: InputMaybe<Order_By>;
  tenant?: InputMaybe<Tenant_Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "workspaces" */
export enum Workspace_Select_Column {
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
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "Workspace" */
export type Workspace_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Workspace_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Workspace_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Boolean expression to compare columns of type "capability_assessment_type_enum". All fields are combined with logical 'AND'. */
export type Capability_Assessment_Type_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['capability_assessment_type_enum']['input']>;
  _gt?: InputMaybe<Scalars['capability_assessment_type_enum']['input']>;
  _gte?: InputMaybe<Scalars['capability_assessment_type_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['capability_assessment_type_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['capability_assessment_type_enum']['input']>;
  _lte?: InputMaybe<Scalars['capability_assessment_type_enum']['input']>;
  _neq?: InputMaybe<Scalars['capability_assessment_type_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['capability_assessment_type_enum']['input']>>;
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

/** Boolean expression to compare columns of type "interface_method_enum". All fields are combined with logical 'AND'. */
export type Interface_Method_Enum_Array_Comparison_Exp = {
  /** is the array contained in the given array value */
  _contained_in?: InputMaybe<Array<Scalars['interface_method_enum']['input']>>;
  /** does the array contain the given value */
  _contains?: InputMaybe<Array<Scalars['interface_method_enum']['input']>>;
  _eq?: InputMaybe<Array<Scalars['interface_method_enum']['input']>>;
  _gt?: InputMaybe<Array<Scalars['interface_method_enum']['input']>>;
  _gte?: InputMaybe<Array<Scalars['interface_method_enum']['input']>>;
  _in?: InputMaybe<Array<Array<Scalars['interface_method_enum']['input']>>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Array<Scalars['interface_method_enum']['input']>>;
  _lte?: InputMaybe<Array<Scalars['interface_method_enum']['input']>>;
  _neq?: InputMaybe<Array<Scalars['interface_method_enum']['input']>>;
  _nin?: InputMaybe<Array<Array<Scalars['interface_method_enum']['input']>>>;
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

/** columns and relationships of "map_tenant_user_profiles" */
export type MapTenantUserProfiles = {
  __typename?: 'mapTenantUserProfiles';
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  user: UserProfile;
  userId: Scalars['uuid']['output'];
};

/** aggregated selection of "map_tenant_user_profiles" */
export type MapTenantUserProfiles_Aggregate = {
  __typename?: 'mapTenantUserProfiles_aggregate';
  aggregate?: Maybe<MapTenantUserProfiles_Aggregate_Fields>;
  nodes: Array<MapTenantUserProfiles>;
};

/** aggregate fields of "map_tenant_user_profiles" */
export type MapTenantUserProfiles_Aggregate_Fields = {
  __typename?: 'mapTenantUserProfiles_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<MapTenantUserProfiles_Max_Fields>;
  min?: Maybe<MapTenantUserProfiles_Min_Fields>;
};


/** aggregate fields of "map_tenant_user_profiles" */
export type MapTenantUserProfiles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<MapTenantUserProfiles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "map_tenant_user_profiles". All fields are combined with a logical 'AND'. */
export type MapTenantUserProfiles_Bool_Exp = {
  _and?: InputMaybe<Array<MapTenantUserProfiles_Bool_Exp>>;
  _not?: InputMaybe<MapTenantUserProfiles_Bool_Exp>;
  _or?: InputMaybe<Array<MapTenantUserProfiles_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
  user?: InputMaybe<UserProfile_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type MapTenantUserProfiles_Max_Fields = {
  __typename?: 'mapTenantUserProfiles_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type MapTenantUserProfiles_Min_Fields = {
  __typename?: 'mapTenantUserProfiles_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** Ordering options when selecting data from "map_tenant_user_profiles". */
export type MapTenantUserProfiles_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
  user?: InputMaybe<UserProfile_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** select columns of table "map_tenant_user_profiles" */
export enum MapTenantUserProfiles_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy',
  /** column name */
  UserId = 'userId'
}

/** Streaming cursor of the table "mapTenantUserProfiles" */
export type MapTenantUserProfiles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: MapTenantUserProfiles_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type MapTenantUserProfiles_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "map_workspace_user_profiles" */
export type MapWorkspaceUserProfiles = {
  __typename?: 'mapWorkspaceUserProfiles';
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  tenantId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  user: UserProfile;
  userId: Scalars['uuid']['output'];
  /** An object relationship */
  workspace: Workspace;
  workspaceId: Scalars['uuid']['output'];
};

/** aggregated selection of "map_workspace_user_profiles" */
export type MapWorkspaceUserProfiles_Aggregate = {
  __typename?: 'mapWorkspaceUserProfiles_aggregate';
  aggregate?: Maybe<MapWorkspaceUserProfiles_Aggregate_Fields>;
  nodes: Array<MapWorkspaceUserProfiles>;
};

/** aggregate fields of "map_workspace_user_profiles" */
export type MapWorkspaceUserProfiles_Aggregate_Fields = {
  __typename?: 'mapWorkspaceUserProfiles_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<MapWorkspaceUserProfiles_Max_Fields>;
  min?: Maybe<MapWorkspaceUserProfiles_Min_Fields>;
};


/** aggregate fields of "map_workspace_user_profiles" */
export type MapWorkspaceUserProfiles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<MapWorkspaceUserProfiles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "map_workspace_user_profiles". All fields are combined with a logical 'AND'. */
export type MapWorkspaceUserProfiles_Bool_Exp = {
  _and?: InputMaybe<Array<MapWorkspaceUserProfiles_Bool_Exp>>;
  _not?: InputMaybe<MapWorkspaceUserProfiles_Bool_Exp>;
  _or?: InputMaybe<Array<MapWorkspaceUserProfiles_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  tenantId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
  user?: InputMaybe<UserProfile_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
  workspace?: InputMaybe<Workspace_Bool_Exp>;
  workspaceId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type MapWorkspaceUserProfiles_Max_Fields = {
  __typename?: 'mapWorkspaceUserProfiles_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
  workspaceId?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type MapWorkspaceUserProfiles_Min_Fields = {
  __typename?: 'mapWorkspaceUserProfiles_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
  workspaceId?: Maybe<Scalars['uuid']['output']>;
};

/** Ordering options when selecting data from "map_workspace_user_profiles". */
export type MapWorkspaceUserProfiles_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  tenantId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
  user?: InputMaybe<UserProfile_Order_By>;
  userId?: InputMaybe<Order_By>;
  workspace?: InputMaybe<Workspace_Order_By>;
  workspaceId?: InputMaybe<Order_By>;
};

/** select columns of table "map_workspace_user_profiles" */
export enum MapWorkspaceUserProfiles_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy',
  /** column name */
  UserId = 'userId',
  /** column name */
  WorkspaceId = 'workspaceId'
}

/** Streaming cursor of the table "mapWorkspaceUserProfiles" */
export type MapWorkspaceUserProfiles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: MapWorkspaceUserProfiles_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type MapWorkspaceUserProfiles_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
  workspaceId?: InputMaybe<Scalars['uuid']['input']>;
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
  /** fetch data from the table: "map_application_component_actor_role" */
  ApplicationComponentBusinessActorRoleMap: Array<ApplicationComponentBusinessActorRoleMap>;
  /** fetch aggregated fields from the table: "map_application_component_actor_role" */
  ApplicationComponentBusinessActorRoleMapAggregate: ApplicationComponentBusinessActorRoleMap_Aggregate;
  /** fetch data from the table: "map_application_component_actor_role" using primary key columns */
  ApplicationComponentBusinessActorRoleMapByPk?: Maybe<ApplicationComponentBusinessActorRoleMap>;
  /** fetch data from the table: "components" using primary key columns */
  ApplicationComponentByPk?: Maybe<ApplicationComponent>;
  /** fetch data from the table: "map_application_component_data_object" */
  ApplicationComponentDataObjectMap: Array<ApplicationComponentDataObjectMap>;
  /** fetch aggregated fields from the table: "map_application_component_data_object" */
  ApplicationComponentDataObjectMapAggregate: ApplicationComponentDataObjectMap_Aggregate;
  /** fetch data from the table: "map_application_component_data_object" using primary key columns */
  ApplicationComponentDataObjectMapByPk?: Maybe<ApplicationComponentDataObjectMap>;
  /** fetch data from the table: "map_application_component_directory" */
  ApplicationComponentDirectoryMap: Array<ApplicationComponentDirectoryMap>;
  /** fetch aggregated fields from the table: "map_application_component_directory" */
  ApplicationComponentDirectoryMapAggregate: ApplicationComponentDirectoryMap_Aggregate;
  /** fetch data from the table: "map_application_component_directory" using primary key columns */
  ApplicationComponentDirectoryMapByPk?: Maybe<ApplicationComponentDirectoryMap>;
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
  ApplicationFunctionInterfaceMap: Array<ApplicationFunctionInterfaceMap>;
  /** fetch aggregated fields from the table: "map_application_interface_function" */
  ApplicationFunctionInterfaceMapAggregate: ApplicationFunctionInterfaceMap_Aggregate;
  /** fetch data from the table: "map_application_interface_function" using primary key columns */
  ApplicationFunctionInterfaceMapByPk?: Maybe<ApplicationFunctionInterfaceMap>;
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
  /** fetch data from the table: "map_business_process_function" */
  BusinessProcessFunctionMap: Array<BusinessProcessFunctionMap>;
  /** fetch aggregated fields from the table: "map_business_process_function" */
  BusinessProcessFunctionMapAggregate: BusinessProcessFunctionMap_Aggregate;
  /** fetch data from the table: "map_business_process_function" using primary key columns */
  BusinessProcessFunctionMapByPk?: Maybe<BusinessProcessFunctionMap>;
  /** fetch data from the table: "map_business_process_hierarchy" */
  BusinessProcessHierarchyMap: Array<BusinessProcessHierarchyMap>;
  /** fetch aggregated fields from the table: "map_business_process_hierarchy" */
  BusinessProcessHierarchyMapAggregate: BusinessProcessHierarchyMap_Aggregate;
  /** fetch data from the table: "map_business_process_hierarchy" using primary key columns */
  BusinessProcessHierarchyMapByPk?: Maybe<BusinessProcessHierarchyMap>;
  /** fetch data from the table: "map_business_process_motivation_item" */
  BusinessProcessMotivationItemMap: Array<BusinessProcessMotivationItemMap>;
  /** fetch aggregated fields from the table: "map_business_process_motivation_item" */
  BusinessProcessMotivationItemMapAggregate: BusinessProcessMotivationItemMap_Aggregate;
  /** fetch data from the table: "map_business_process_motivation_item" using primary key columns */
  BusinessProcessMotivationItemMapByPk?: Maybe<BusinessProcessMotivationItemMap>;
  /** fetch data from the table: "products" */
  BusinessProduct: Array<BusinessProduct>;
  /** fetch aggregated fields from the table: "products" */
  BusinessProductAggregate: BusinessProduct_Aggregate;
  /** fetch data from the table: "products" using primary key columns */
  BusinessProductByPk?: Maybe<BusinessProduct>;
  /** fetch data from the table: "capabilities" */
  Capability: Array<Capability>;
  /** fetch aggregated fields from the table: "capabilities" */
  CapabilityAggregate: Capability_Aggregate;
  /** fetch data from the table: "map_capability_application_component_assessment" */
  CapabilityApplicationComponentAssessmentMap: Array<CapabilityApplicationComponentAssessmentMap>;
  /** fetch aggregated fields from the table: "map_capability_application_component_assessment" */
  CapabilityApplicationComponentAssessmentMapAggregate: CapabilityApplicationComponentAssessmentMap_Aggregate;
  /** fetch data from the table: "map_capability_application_component_assessment" using primary key columns */
  CapabilityApplicationComponentAssessmentMapByPk?: Maybe<CapabilityApplicationComponentAssessmentMap>;
  /** fetch data from the table: "map_capability_application_component" */
  CapabilityApplicationComponentMap: Array<CapabilityApplicationComponentMap>;
  /** fetch aggregated fields from the table: "map_capability_application_component" */
  CapabilityApplicationComponentMapAggregate: CapabilityApplicationComponentMap_Aggregate;
  /** fetch data from the table: "map_capability_application_component" using primary key columns */
  CapabilityApplicationComponentMapByPk?: Maybe<CapabilityApplicationComponentMap>;
  /** fetch data from the table: "map_capability_business_process_assessment" */
  CapabilityBusinessProcessAssessmentMap: Array<CapabilityBusinessProcessAssessmentMap>;
  /** fetch aggregated fields from the table: "map_capability_business_process_assessment" */
  CapabilityBusinessProcessAssessmentMapAggregate: CapabilityBusinessProcessAssessmentMap_Aggregate;
  /** fetch data from the table: "map_capability_business_process_assessment" using primary key columns */
  CapabilityBusinessProcessAssessmentMapByPk?: Maybe<CapabilityBusinessProcessAssessmentMap>;
  /** fetch data from the table: "map_capability_business_process" */
  CapabilityBusinessProcessMap: Array<CapabilityBusinessProcessMap>;
  /** fetch aggregated fields from the table: "map_capability_business_process" */
  CapabilityBusinessProcessMapAggregate: CapabilityBusinessProcessMap_Aggregate;
  /** fetch data from the table: "map_capability_business_process" using primary key columns */
  CapabilityBusinessProcessMapByPk?: Maybe<CapabilityBusinessProcessMap>;
  /** fetch data from the table: "capabilities" using primary key columns */
  CapabilityByPk?: Maybe<Capability>;
  /** fetch data from the table: "map_capability_hierarchy" */
  CapabilityHierarchyMap: Array<CapabilityHierarchyMap>;
  /** fetch aggregated fields from the table: "map_capability_hierarchy" */
  CapabilityHierarchyMapAggregate: CapabilityHierarchyMap_Aggregate;
  /** fetch data from the table: "map_capability_hierarchy" using primary key columns */
  CapabilityHierarchyMapByPk?: Maybe<CapabilityHierarchyMap>;
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
  Event: Array<Event>;
  /** fetch aggregated fields from the table: "events" */
  EventAggregate: Event_Aggregate;
  /** fetch data from the table: "events" using primary key columns */
  EventByPk?: Maybe<Event>;
  /** fetch data from the table: "flows" */
  FlowGeneric: Array<FlowGeneric>;
  /** fetch aggregated fields from the table: "flows" */
  FlowGenericAggregate: FlowGeneric_Aggregate;
  /** fetch data from the table: "flows" using primary key columns */
  FlowGenericByPk?: Maybe<FlowGeneric>;
  /** fetch data from the table: "functions" */
  Function: Array<Function>;
  /** fetch aggregated fields from the table: "functions" */
  FunctionAggregate: Function_Aggregate;
  /** fetch data from the table: "functions" using primary key columns */
  FunctionByPk?: Maybe<Function>;
  /** fetch data from the table: "interfaces" */
  Interface: Array<Interface>;
  /** fetch aggregated fields from the table: "interfaces" */
  InterfaceAggregate: Interface_Aggregate;
  /** fetch data from the table: "interfaces" using primary key columns */
  InterfaceByPk?: Maybe<Interface>;
  /** fetch data from the table: "locations" */
  Location: Array<Location>;
  /** fetch aggregated fields from the table: "locations" */
  LocationAggregate: Location_Aggregate;
  /** fetch data from the table: "locations" using primary key columns */
  LocationByPk?: Maybe<Location>;
  /** fetch data from the table: "motivations" */
  MotivationElementGeneric: Array<MotivationElementGeneric>;
  /** fetch aggregated fields from the table: "motivations" */
  MotivationElementGenericAggregate: MotivationElementGeneric_Aggregate;
  /** fetch data from the table: "motivations" using primary key columns */
  MotivationElementGenericByPk?: Maybe<MotivationElementGeneric>;
  /** fetch data from the table: "map_motivation_item_hierarchy" */
  MotivationItemHierarchyMap: Array<MotivationItemHierarchyMap>;
  /** fetch aggregated fields from the table: "map_motivation_item_hierarchy" */
  MotivationItemHierarchyMapAggregate: MotivationItemHierarchyMap_Aggregate;
  /** fetch data from the table: "map_motivation_item_hierarchy" using primary key columns */
  MotivationItemHierarchyMapByPk?: Maybe<MotivationItemHierarchyMap>;
  /** fetch data from the table: "plateaus" */
  Plateau: Array<Plateau>;
  /** fetch aggregated fields from the table: "plateaus" */
  PlateauAggregate: Plateau_Aggregate;
  /** fetch data from the table: "plateaus" using primary key columns */
  PlateauByPk?: Maybe<Plateau>;
  /** fetch data from the table: "processes" */
  Process: Array<Process>;
  /** fetch aggregated fields from the table: "processes" */
  ProcessAggregate: Process_Aggregate;
  /** fetch data from the table: "processes" using primary key columns */
  ProcessByPk?: Maybe<Process>;
  /** fetch data from the table: "roles" */
  Role: Array<Role>;
  /** fetch aggregated fields from the table: "roles" */
  RoleAggregate: Role_Aggregate;
  /** fetch data from the table: "roles" using primary key columns */
  RoleByPk?: Maybe<Role>;
  /** fetch data from the table: "services" */
  Service: Array<Service>;
  /** fetch aggregated fields from the table: "services" */
  ServiceAggregate: Service_Aggregate;
  /** fetch data from the table: "services" using primary key columns */
  ServiceByPk?: Maybe<Service>;
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
  /** fetch data from the table: "map_solution_application_function" */
  SolutionApplicationFunctionMap: Array<SolutionApplicationFunctionMap>;
  /** fetch aggregated fields from the table: "map_solution_application_function" */
  SolutionApplicationFunctionMapAggregate: SolutionApplicationFunctionMap_Aggregate;
  /** fetch data from the table: "map_solution_application_function" using primary key columns */
  SolutionApplicationFunctionMapByPk?: Maybe<SolutionApplicationFunctionMap>;
  /** fetch data from the table: "solutions" using primary key columns */
  SolutionByPk?: Maybe<Solution>;
  /** fetch data from the table: "map_solution_constraint" */
  SolutionConstraintMap: Array<SolutionConstraintMap>;
  /** fetch aggregated fields from the table: "map_solution_constraint" */
  SolutionConstraintMapAggregate: SolutionConstraintMap_Aggregate;
  /** fetch data from the table: "map_solution_constraint" using primary key columns */
  SolutionConstraintMapByPk?: Maybe<SolutionConstraintMap>;
  /** fetch data from the table: "map_solution_data_object" */
  SolutionDataObjectMap: Array<SolutionDataObjectMap>;
  /** fetch aggregated fields from the table: "map_solution_data_object" */
  SolutionDataObjectMapAggregate: SolutionDataObjectMap_Aggregate;
  /** fetch data from the table: "map_solution_data_object" using primary key columns */
  SolutionDataObjectMapByPk?: Maybe<SolutionDataObjectMap>;
  /** fetch data from the table: "map_solution_flow" */
  SolutionFlowMap: Array<SolutionFlowMap>;
  /** fetch aggregated fields from the table: "map_solution_flow" */
  SolutionFlowMapAggregate: SolutionFlowMap_Aggregate;
  /** fetch data from the table: "map_solution_flow" using primary key columns */
  SolutionFlowMapByPk?: Maybe<SolutionFlowMap>;
  /** fetch data from the table: "map_solution_motivation_component" */
  SolutionMotivationComponentMap: Array<SolutionMotivationComponentMap>;
  /** fetch aggregated fields from the table: "map_solution_motivation_component" */
  SolutionMotivationComponentMapAggregate: SolutionMotivationComponentMap_Aggregate;
  /** fetch data from the table: "map_solution_motivation_component" using primary key columns */
  SolutionMotivationComponentMapByPk?: Maybe<SolutionMotivationComponentMap>;
  /** fetch data from the table: "map_solution_motivation" */
  SolutionMotivationElementMap: Array<SolutionMotivationElementMap>;
  /** fetch aggregated fields from the table: "map_solution_motivation" */
  SolutionMotivationElementMapAggregate: SolutionMotivationElementMap_Aggregate;
  /** fetch data from the table: "map_solution_motivation" using primary key columns */
  SolutionMotivationElementMapByPk?: Maybe<SolutionMotivationElementMap>;
  /** fetch data from the table: "map_solution_stakeholder" */
  SolutionStakeholderMap: Array<SolutionStakeholderMap>;
  /** fetch aggregated fields from the table: "map_solution_stakeholder" */
  SolutionStakeholderMapAggregate: SolutionStakeholderMap_Aggregate;
  /** fetch data from the table: "map_solution_stakeholder" using primary key columns */
  SolutionStakeholderMapByPk?: Maybe<SolutionStakeholderMap>;
  /** fetch data from the table: "map_solution_technology_node" */
  SolutionTechnologyNodeMap: Array<SolutionTechnologyNodeMap>;
  /** fetch aggregated fields from the table: "map_solution_technology_node" */
  SolutionTechnologyNodeMapAggregate: SolutionTechnologyNodeMap_Aggregate;
  /** fetch data from the table: "map_solution_technology_node" using primary key columns */
  SolutionTechnologyNodeMapByPk?: Maybe<SolutionTechnologyNodeMap>;
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
  /** fetch data from the table: "tenants" */
  Tenant: Array<Tenant>;
  /** fetch aggregated fields from the table: "tenants" */
  TenantAggregate: Tenant_Aggregate;
  /** fetch data from the table: "tenants" using primary key columns */
  TenantByPk?: Maybe<Tenant>;
  /** fetch data from the table: "user_profiles" */
  UserProfile: Array<UserProfile>;
  /** fetch aggregated fields from the table: "user_profiles" */
  UserProfileAggregate: UserProfile_Aggregate;
  /** fetch data from the table: "user_profiles" using primary key columns */
  UserProfileByPk?: Maybe<UserProfile>;
  /** fetch data from the table: "variants" */
  Variant: Array<Variant>;
  /** fetch aggregated fields from the table: "variants" */
  VariantAggregate: Variant_Aggregate;
  /** fetch data from the table: "variants" using primary key columns */
  VariantByPk?: Maybe<Variant>;
  /** fetch data from the table: "map_variant_motivation" */
  VariantMotivationElementMap: Array<VariantMotivationElementMap>;
  /** fetch aggregated fields from the table: "map_variant_motivation" */
  VariantMotivationElementMapAggregate: VariantMotivationElementMap_Aggregate;
  /** fetch data from the table: "map_variant_motivation" using primary key columns */
  VariantMotivationElementMapByPk?: Maybe<VariantMotivationElementMap>;
  /** fetch data from the table: "views" */
  View: Array<View>;
  /** fetch aggregated fields from the table: "views" */
  ViewAggregate: View_Aggregate;
  /** fetch data from the table: "views" using primary key columns */
  ViewByPk?: Maybe<View>;
  /** fetch data from the table: "workspaces" */
  Workspace: Array<Workspace>;
  /** fetch aggregated fields from the table: "workspaces" */
  WorkspaceAggregate: Workspace_Aggregate;
  /** fetch data from the table: "workspaces" using primary key columns */
  WorkspaceByPk?: Maybe<Workspace>;
  /** fetch data from the table: "map_tenant_user_profiles" */
  mapTenantUserProfiles: Array<MapTenantUserProfiles>;
  /** fetch aggregated fields from the table: "map_tenant_user_profiles" */
  mapTenantUserProfiles_aggregate: MapTenantUserProfiles_Aggregate;
  /** fetch data from the table: "map_tenant_user_profiles" using primary key columns */
  mapTenantUserProfiles_by_pk?: Maybe<MapTenantUserProfiles>;
  /** fetch data from the table: "map_workspace_user_profiles" */
  mapWorkspaceUserProfiles: Array<MapWorkspaceUserProfiles>;
  /** fetch aggregated fields from the table: "map_workspace_user_profiles" */
  mapWorkspaceUserProfiles_aggregate: MapWorkspaceUserProfiles_Aggregate;
  /** fetch data from the table: "map_workspace_user_profiles" using primary key columns */
  mapWorkspaceUserProfiles_by_pk?: Maybe<MapWorkspaceUserProfiles>;
  /** fetch data from the table: "states" */
  states: Array<States>;
  /** fetch aggregated fields from the table: "states" */
  states_aggregate: States_Aggregate;
  /** fetch data from the table: "states" using primary key columns */
  states_by_pk?: Maybe<States>;
  /** fetch data from the table: "transitions" */
  transitions: Array<Transitions>;
  /** fetch aggregated fields from the table: "transitions" */
  transitions_aggregate: Transitions_Aggregate;
  /** fetch data from the table: "transitions" using primary key columns */
  transitions_by_pk?: Maybe<Transitions>;
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


export type Query_RootApplicationComponentBusinessActorRoleMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentBusinessActorRoleMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentBusinessActorRoleMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentBusinessActorRoleMap_Bool_Exp>;
};


export type Query_RootApplicationComponentBusinessActorRoleMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentBusinessActorRoleMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentBusinessActorRoleMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentBusinessActorRoleMap_Bool_Exp>;
};


export type Query_RootApplicationComponentBusinessActorRoleMapByPkArgs = {
  actorId: Scalars['uuid']['input'];
  componentId: Scalars['uuid']['input'];
  roleId: Scalars['uuid']['input'];
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


export type Query_RootApplicationComponentDirectoryMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentDirectoryMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentDirectoryMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentDirectoryMap_Bool_Exp>;
};


export type Query_RootApplicationComponentDirectoryMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentDirectoryMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentDirectoryMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentDirectoryMap_Bool_Exp>;
};


export type Query_RootApplicationComponentDirectoryMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  directoryId: Scalars['uuid']['input'];
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


export type Query_RootApplicationFunctionInterfaceMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationFunctionInterfaceMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationFunctionInterfaceMap_Order_By>>;
  where?: InputMaybe<ApplicationFunctionInterfaceMap_Bool_Exp>;
};


export type Query_RootApplicationFunctionInterfaceMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationFunctionInterfaceMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationFunctionInterfaceMap_Order_By>>;
  where?: InputMaybe<ApplicationFunctionInterfaceMap_Bool_Exp>;
};


export type Query_RootApplicationFunctionInterfaceMapByPkArgs = {
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


export type Query_RootBusinessProcessFunctionMapArgs = {
  distinct_on?: InputMaybe<Array<BusinessProcessFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProcessFunctionMap_Order_By>>;
  where?: InputMaybe<BusinessProcessFunctionMap_Bool_Exp>;
};


export type Query_RootBusinessProcessFunctionMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<BusinessProcessFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProcessFunctionMap_Order_By>>;
  where?: InputMaybe<BusinessProcessFunctionMap_Bool_Exp>;
};


export type Query_RootBusinessProcessFunctionMapByPkArgs = {
  functionId: Scalars['uuid']['input'];
  processId: Scalars['uuid']['input'];
};


export type Query_RootBusinessProcessHierarchyMapArgs = {
  distinct_on?: InputMaybe<Array<BusinessProcessHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProcessHierarchyMap_Order_By>>;
  where?: InputMaybe<BusinessProcessHierarchyMap_Bool_Exp>;
};


export type Query_RootBusinessProcessHierarchyMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<BusinessProcessHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProcessHierarchyMap_Order_By>>;
  where?: InputMaybe<BusinessProcessHierarchyMap_Bool_Exp>;
};


export type Query_RootBusinessProcessHierarchyMapByPkArgs = {
  processChildId: Scalars['uuid']['input'];
  processParentId: Scalars['uuid']['input'];
};


export type Query_RootBusinessProcessMotivationItemMapArgs = {
  distinct_on?: InputMaybe<Array<BusinessProcessMotivationItemMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProcessMotivationItemMap_Order_By>>;
  where?: InputMaybe<BusinessProcessMotivationItemMap_Bool_Exp>;
};


export type Query_RootBusinessProcessMotivationItemMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<BusinessProcessMotivationItemMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProcessMotivationItemMap_Order_By>>;
  where?: InputMaybe<BusinessProcessMotivationItemMap_Bool_Exp>;
};


export type Query_RootBusinessProcessMotivationItemMapByPkArgs = {
  motivationId: Scalars['uuid']['input'];
  processId: Scalars['uuid']['input'];
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


export type Query_RootCapabilityApplicationComponentAssessmentMapArgs = {
  distinct_on?: InputMaybe<Array<CapabilityApplicationComponentAssessmentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityApplicationComponentAssessmentMap_Order_By>>;
  where?: InputMaybe<CapabilityApplicationComponentAssessmentMap_Bool_Exp>;
};


export type Query_RootCapabilityApplicationComponentAssessmentMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<CapabilityApplicationComponentAssessmentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityApplicationComponentAssessmentMap_Order_By>>;
  where?: InputMaybe<CapabilityApplicationComponentAssessmentMap_Bool_Exp>;
};


export type Query_RootCapabilityApplicationComponentAssessmentMapByPkArgs = {
  assessmentId: Scalars['uuid']['input'];
  capabilityId: Scalars['uuid']['input'];
  componentId: Scalars['uuid']['input'];
};


export type Query_RootCapabilityApplicationComponentMapArgs = {
  distinct_on?: InputMaybe<Array<CapabilityApplicationComponentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityApplicationComponentMap_Order_By>>;
  where?: InputMaybe<CapabilityApplicationComponentMap_Bool_Exp>;
};


export type Query_RootCapabilityApplicationComponentMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<CapabilityApplicationComponentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityApplicationComponentMap_Order_By>>;
  where?: InputMaybe<CapabilityApplicationComponentMap_Bool_Exp>;
};


export type Query_RootCapabilityApplicationComponentMapByPkArgs = {
  capabilityId: Scalars['uuid']['input'];
  componentId: Scalars['uuid']['input'];
};


export type Query_RootCapabilityBusinessProcessAssessmentMapArgs = {
  distinct_on?: InputMaybe<Array<CapabilityBusinessProcessAssessmentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityBusinessProcessAssessmentMap_Order_By>>;
  where?: InputMaybe<CapabilityBusinessProcessAssessmentMap_Bool_Exp>;
};


export type Query_RootCapabilityBusinessProcessAssessmentMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<CapabilityBusinessProcessAssessmentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityBusinessProcessAssessmentMap_Order_By>>;
  where?: InputMaybe<CapabilityBusinessProcessAssessmentMap_Bool_Exp>;
};


export type Query_RootCapabilityBusinessProcessAssessmentMapByPkArgs = {
  assessmentId: Scalars['uuid']['input'];
  capabilityId: Scalars['uuid']['input'];
  processId: Scalars['uuid']['input'];
};


export type Query_RootCapabilityBusinessProcessMapArgs = {
  distinct_on?: InputMaybe<Array<CapabilityBusinessProcessMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityBusinessProcessMap_Order_By>>;
  where?: InputMaybe<CapabilityBusinessProcessMap_Bool_Exp>;
};


export type Query_RootCapabilityBusinessProcessMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<CapabilityBusinessProcessMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityBusinessProcessMap_Order_By>>;
  where?: InputMaybe<CapabilityBusinessProcessMap_Bool_Exp>;
};


export type Query_RootCapabilityBusinessProcessMapByPkArgs = {
  capabilityId: Scalars['uuid']['input'];
  processId: Scalars['uuid']['input'];
};


export type Query_RootCapabilityByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootCapabilityHierarchyMapArgs = {
  distinct_on?: InputMaybe<Array<CapabilityHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityHierarchyMap_Order_By>>;
  where?: InputMaybe<CapabilityHierarchyMap_Bool_Exp>;
};


export type Query_RootCapabilityHierarchyMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<CapabilityHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityHierarchyMap_Order_By>>;
  where?: InputMaybe<CapabilityHierarchyMap_Bool_Exp>;
};


export type Query_RootCapabilityHierarchyMapByPkArgs = {
  childId: Scalars['uuid']['input'];
  parentId: Scalars['uuid']['input'];
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


export type Query_RootEventArgs = {
  distinct_on?: InputMaybe<Array<Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Order_By>>;
  where?: InputMaybe<Event_Bool_Exp>;
};


export type Query_RootEventAggregateArgs = {
  distinct_on?: InputMaybe<Array<Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Order_By>>;
  where?: InputMaybe<Event_Bool_Exp>;
};


export type Query_RootEventByPkArgs = {
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


export type Query_RootFunctionArgs = {
  distinct_on?: InputMaybe<Array<Function_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Function_Order_By>>;
  where?: InputMaybe<Function_Bool_Exp>;
};


export type Query_RootFunctionAggregateArgs = {
  distinct_on?: InputMaybe<Array<Function_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Function_Order_By>>;
  where?: InputMaybe<Function_Bool_Exp>;
};


export type Query_RootFunctionByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootInterfaceArgs = {
  distinct_on?: InputMaybe<Array<Interface_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Interface_Order_By>>;
  where?: InputMaybe<Interface_Bool_Exp>;
};


export type Query_RootInterfaceAggregateArgs = {
  distinct_on?: InputMaybe<Array<Interface_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Interface_Order_By>>;
  where?: InputMaybe<Interface_Bool_Exp>;
};


export type Query_RootInterfaceByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootLocationArgs = {
  distinct_on?: InputMaybe<Array<Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Location_Order_By>>;
  where?: InputMaybe<Location_Bool_Exp>;
};


export type Query_RootLocationAggregateArgs = {
  distinct_on?: InputMaybe<Array<Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Location_Order_By>>;
  where?: InputMaybe<Location_Bool_Exp>;
};


export type Query_RootLocationByPkArgs = {
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


export type Query_RootMotivationItemHierarchyMapArgs = {
  distinct_on?: InputMaybe<Array<MotivationItemHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MotivationItemHierarchyMap_Order_By>>;
  where?: InputMaybe<MotivationItemHierarchyMap_Bool_Exp>;
};


export type Query_RootMotivationItemHierarchyMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<MotivationItemHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MotivationItemHierarchyMap_Order_By>>;
  where?: InputMaybe<MotivationItemHierarchyMap_Bool_Exp>;
};


export type Query_RootMotivationItemHierarchyMapByPkArgs = {
  childId: Scalars['uuid']['input'];
  parentId: Scalars['uuid']['input'];
};


export type Query_RootPlateauArgs = {
  distinct_on?: InputMaybe<Array<Plateau_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plateau_Order_By>>;
  where?: InputMaybe<Plateau_Bool_Exp>;
};


export type Query_RootPlateauAggregateArgs = {
  distinct_on?: InputMaybe<Array<Plateau_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plateau_Order_By>>;
  where?: InputMaybe<Plateau_Bool_Exp>;
};


export type Query_RootPlateauByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootProcessArgs = {
  distinct_on?: InputMaybe<Array<Process_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Process_Order_By>>;
  where?: InputMaybe<Process_Bool_Exp>;
};


export type Query_RootProcessAggregateArgs = {
  distinct_on?: InputMaybe<Array<Process_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Process_Order_By>>;
  where?: InputMaybe<Process_Bool_Exp>;
};


export type Query_RootProcessByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootRoleArgs = {
  distinct_on?: InputMaybe<Array<Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Role_Order_By>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


export type Query_RootRoleAggregateArgs = {
  distinct_on?: InputMaybe<Array<Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Role_Order_By>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


export type Query_RootRoleByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootServiceArgs = {
  distinct_on?: InputMaybe<Array<Service_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Service_Order_By>>;
  where?: InputMaybe<Service_Bool_Exp>;
};


export type Query_RootServiceAggregateArgs = {
  distinct_on?: InputMaybe<Array<Service_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Service_Order_By>>;
  where?: InputMaybe<Service_Bool_Exp>;
};


export type Query_RootServiceByPkArgs = {
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


export type Query_RootSolutionApplicationFunctionMapArgs = {
  distinct_on?: InputMaybe<Array<SolutionApplicationFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionApplicationFunctionMap_Order_By>>;
  where?: InputMaybe<SolutionApplicationFunctionMap_Bool_Exp>;
};


export type Query_RootSolutionApplicationFunctionMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionApplicationFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionApplicationFunctionMap_Order_By>>;
  where?: InputMaybe<SolutionApplicationFunctionMap_Bool_Exp>;
};


export type Query_RootSolutionApplicationFunctionMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  functionId: Scalars['uuid']['input'];
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
  motivationId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};


export type Query_RootSolutionDataObjectMapArgs = {
  distinct_on?: InputMaybe<Array<SolutionDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionDataObjectMap_Order_By>>;
  where?: InputMaybe<SolutionDataObjectMap_Bool_Exp>;
};


export type Query_RootSolutionDataObjectMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionDataObjectMap_Order_By>>;
  where?: InputMaybe<SolutionDataObjectMap_Bool_Exp>;
};


export type Query_RootSolutionDataObjectMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  dataObjectId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};


export type Query_RootSolutionFlowMapArgs = {
  distinct_on?: InputMaybe<Array<SolutionFlowMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionFlowMap_Order_By>>;
  where?: InputMaybe<SolutionFlowMap_Bool_Exp>;
};


export type Query_RootSolutionFlowMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionFlowMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionFlowMap_Order_By>>;
  where?: InputMaybe<SolutionFlowMap_Bool_Exp>;
};


export type Query_RootSolutionFlowMapByPkArgs = {
  flowId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};


export type Query_RootSolutionMotivationComponentMapArgs = {
  distinct_on?: InputMaybe<Array<SolutionMotivationComponentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionMotivationComponentMap_Order_By>>;
  where?: InputMaybe<SolutionMotivationComponentMap_Bool_Exp>;
};


export type Query_RootSolutionMotivationComponentMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionMotivationComponentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionMotivationComponentMap_Order_By>>;
  where?: InputMaybe<SolutionMotivationComponentMap_Bool_Exp>;
};


export type Query_RootSolutionMotivationComponentMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  motivationId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};


export type Query_RootSolutionMotivationElementMapArgs = {
  distinct_on?: InputMaybe<Array<SolutionMotivationElementMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionMotivationElementMap_Order_By>>;
  where?: InputMaybe<SolutionMotivationElementMap_Bool_Exp>;
};


export type Query_RootSolutionMotivationElementMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionMotivationElementMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionMotivationElementMap_Order_By>>;
  where?: InputMaybe<SolutionMotivationElementMap_Bool_Exp>;
};


export type Query_RootSolutionMotivationElementMapByPkArgs = {
  motivationId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};


export type Query_RootSolutionStakeholderMapArgs = {
  distinct_on?: InputMaybe<Array<SolutionStakeholderMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionStakeholderMap_Order_By>>;
  where?: InputMaybe<SolutionStakeholderMap_Bool_Exp>;
};


export type Query_RootSolutionStakeholderMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionStakeholderMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionStakeholderMap_Order_By>>;
  where?: InputMaybe<SolutionStakeholderMap_Bool_Exp>;
};


export type Query_RootSolutionStakeholderMapByPkArgs = {
  solutionId: Scalars['uuid']['input'];
  stakeholderId: Scalars['uuid']['input'];
};


export type Query_RootSolutionTechnologyNodeMapArgs = {
  distinct_on?: InputMaybe<Array<SolutionTechnologyNodeMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionTechnologyNodeMap_Order_By>>;
  where?: InputMaybe<SolutionTechnologyNodeMap_Bool_Exp>;
};


export type Query_RootSolutionTechnologyNodeMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionTechnologyNodeMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionTechnologyNodeMap_Order_By>>;
  where?: InputMaybe<SolutionTechnologyNodeMap_Bool_Exp>;
};


export type Query_RootSolutionTechnologyNodeMapByPkArgs = {
  nodeId: Scalars['uuid']['input'];
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


export type Query_RootTenantArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Order_By>>;
  where?: InputMaybe<Tenant_Bool_Exp>;
};


export type Query_RootTenantAggregateArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Order_By>>;
  where?: InputMaybe<Tenant_Bool_Exp>;
};


export type Query_RootTenantByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootUserProfileArgs = {
  distinct_on?: InputMaybe<Array<UserProfile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UserProfile_Order_By>>;
  where?: InputMaybe<UserProfile_Bool_Exp>;
};


export type Query_RootUserProfileAggregateArgs = {
  distinct_on?: InputMaybe<Array<UserProfile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UserProfile_Order_By>>;
  where?: InputMaybe<UserProfile_Bool_Exp>;
};


export type Query_RootUserProfileByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootVariantArgs = {
  distinct_on?: InputMaybe<Array<Variant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Variant_Order_By>>;
  where?: InputMaybe<Variant_Bool_Exp>;
};


export type Query_RootVariantAggregateArgs = {
  distinct_on?: InputMaybe<Array<Variant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Variant_Order_By>>;
  where?: InputMaybe<Variant_Bool_Exp>;
};


export type Query_RootVariantByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootVariantMotivationElementMapArgs = {
  distinct_on?: InputMaybe<Array<VariantMotivationElementMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<VariantMotivationElementMap_Order_By>>;
  where?: InputMaybe<VariantMotivationElementMap_Bool_Exp>;
};


export type Query_RootVariantMotivationElementMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<VariantMotivationElementMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<VariantMotivationElementMap_Order_By>>;
  where?: InputMaybe<VariantMotivationElementMap_Bool_Exp>;
};


export type Query_RootVariantMotivationElementMapByPkArgs = {
  motivationId: Scalars['uuid']['input'];
  variantId: Scalars['uuid']['input'];
};


export type Query_RootViewArgs = {
  distinct_on?: InputMaybe<Array<View_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<View_Order_By>>;
  where?: InputMaybe<View_Bool_Exp>;
};


export type Query_RootViewAggregateArgs = {
  distinct_on?: InputMaybe<Array<View_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<View_Order_By>>;
  where?: InputMaybe<View_Bool_Exp>;
};


export type Query_RootViewByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootWorkspaceArgs = {
  distinct_on?: InputMaybe<Array<Workspace_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspace_Order_By>>;
  where?: InputMaybe<Workspace_Bool_Exp>;
};


export type Query_RootWorkspaceAggregateArgs = {
  distinct_on?: InputMaybe<Array<Workspace_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspace_Order_By>>;
  where?: InputMaybe<Workspace_Bool_Exp>;
};


export type Query_RootWorkspaceByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootMapTenantUserProfilesArgs = {
  distinct_on?: InputMaybe<Array<MapTenantUserProfiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MapTenantUserProfiles_Order_By>>;
  where?: InputMaybe<MapTenantUserProfiles_Bool_Exp>;
};


export type Query_RootMapTenantUserProfiles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<MapTenantUserProfiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MapTenantUserProfiles_Order_By>>;
  where?: InputMaybe<MapTenantUserProfiles_Bool_Exp>;
};


export type Query_RootMapTenantUserProfiles_By_PkArgs = {
  userId: Scalars['uuid']['input'];
};


export type Query_RootMapWorkspaceUserProfilesArgs = {
  distinct_on?: InputMaybe<Array<MapWorkspaceUserProfiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MapWorkspaceUserProfiles_Order_By>>;
  where?: InputMaybe<MapWorkspaceUserProfiles_Bool_Exp>;
};


export type Query_RootMapWorkspaceUserProfiles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<MapWorkspaceUserProfiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MapWorkspaceUserProfiles_Order_By>>;
  where?: InputMaybe<MapWorkspaceUserProfiles_Bool_Exp>;
};


export type Query_RootMapWorkspaceUserProfiles_By_PkArgs = {
  userId: Scalars['uuid']['input'];
  workspaceId: Scalars['uuid']['input'];
};


export type Query_RootStatesArgs = {
  distinct_on?: InputMaybe<Array<States_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<States_Order_By>>;
  where?: InputMaybe<States_Bool_Exp>;
};


export type Query_RootStates_AggregateArgs = {
  distinct_on?: InputMaybe<Array<States_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<States_Order_By>>;
  where?: InputMaybe<States_Bool_Exp>;
};


export type Query_RootStates_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootTransitionsArgs = {
  distinct_on?: InputMaybe<Array<Transitions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transitions_Order_By>>;
  where?: InputMaybe<Transitions_Bool_Exp>;
};


export type Query_RootTransitions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Transitions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transitions_Order_By>>;
  where?: InputMaybe<Transitions_Bool_Exp>;
};


export type Query_RootTransitions_By_PkArgs = {
  id: Scalars['uuid']['input'];
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

/** Boolean expression to compare columns of type "solution_implementation_status_enum". All fields are combined with logical 'AND'. */
export type Solution_Implementation_Status_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['solution_implementation_status_enum']['input']>;
  _gt?: InputMaybe<Scalars['solution_implementation_status_enum']['input']>;
  _gte?: InputMaybe<Scalars['solution_implementation_status_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['solution_implementation_status_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['solution_implementation_status_enum']['input']>;
  _lte?: InputMaybe<Scalars['solution_implementation_status_enum']['input']>;
  _neq?: InputMaybe<Scalars['solution_implementation_status_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['solution_implementation_status_enum']['input']>>;
};

/** Boolean expression to compare columns of type "solution_item_impact_type_enum". All fields are combined with logical 'AND'. */
export type Solution_Item_Impact_Type_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['solution_item_impact_type_enum']['input']>;
  _gt?: InputMaybe<Scalars['solution_item_impact_type_enum']['input']>;
  _gte?: InputMaybe<Scalars['solution_item_impact_type_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['solution_item_impact_type_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['solution_item_impact_type_enum']['input']>;
  _lte?: InputMaybe<Scalars['solution_item_impact_type_enum']['input']>;
  _neq?: InputMaybe<Scalars['solution_item_impact_type_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['solution_item_impact_type_enum']['input']>>;
};

/** Boolean expression to compare columns of type "solution_life_cycle_enum". All fields are combined with logical 'AND'. */
export type Solution_Life_Cycle_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['solution_life_cycle_enum']['input']>;
  _gt?: InputMaybe<Scalars['solution_life_cycle_enum']['input']>;
  _gte?: InputMaybe<Scalars['solution_life_cycle_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['solution_life_cycle_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['solution_life_cycle_enum']['input']>;
  _lte?: InputMaybe<Scalars['solution_life_cycle_enum']['input']>;
  _neq?: InputMaybe<Scalars['solution_life_cycle_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['solution_life_cycle_enum']['input']>>;
};

/** Boolean expression to compare columns of type "stakeholder_role_enum". All fields are combined with logical 'AND'. */
export type Stakeholder_Role_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['stakeholder_role_enum']['input']>;
  _gt?: InputMaybe<Scalars['stakeholder_role_enum']['input']>;
  _gte?: InputMaybe<Scalars['stakeholder_role_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['stakeholder_role_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['stakeholder_role_enum']['input']>;
  _lte?: InputMaybe<Scalars['stakeholder_role_enum']['input']>;
  _neq?: InputMaybe<Scalars['stakeholder_role_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['stakeholder_role_enum']['input']>>;
};

/** columns and relationships of "states" */
export type States = {
  __typename?: 'states';
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  id: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "states" */
export type States_Aggregate = {
  __typename?: 'states_aggregate';
  aggregate?: Maybe<States_Aggregate_Fields>;
  nodes: Array<States>;
};

/** aggregate fields of "states" */
export type States_Aggregate_Fields = {
  __typename?: 'states_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<States_Max_Fields>;
  min?: Maybe<States_Min_Fields>;
};


/** aggregate fields of "states" */
export type States_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<States_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "states". All fields are combined with a logical 'AND'. */
export type States_Bool_Exp = {
  _and?: InputMaybe<Array<States_Bool_Exp>>;
  _not?: InputMaybe<States_Bool_Exp>;
  _or?: InputMaybe<Array<States_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type States_Max_Fields = {
  __typename?: 'states_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type States_Min_Fields = {
  __typename?: 'states_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** Ordering options when selecting data from "states". */
export type States_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "states" */
export enum States_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "states" */
export type States_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: States_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type States_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "components" */
  ApplicationComponent: Array<ApplicationComponent>;
  /** fetch aggregated fields from the table: "components" */
  ApplicationComponentAggregate: ApplicationComponent_Aggregate;
  /** fetch data from the table: "map_application_component_actor_role" */
  ApplicationComponentBusinessActorRoleMap: Array<ApplicationComponentBusinessActorRoleMap>;
  /** fetch aggregated fields from the table: "map_application_component_actor_role" */
  ApplicationComponentBusinessActorRoleMapAggregate: ApplicationComponentBusinessActorRoleMap_Aggregate;
  /** fetch data from the table: "map_application_component_actor_role" using primary key columns */
  ApplicationComponentBusinessActorRoleMapByPk?: Maybe<ApplicationComponentBusinessActorRoleMap>;
  /** fetch data from the table in a streaming manner: "map_application_component_actor_role" */
  ApplicationComponentBusinessActorRoleMap_stream: Array<ApplicationComponentBusinessActorRoleMap>;
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
  /** fetch data from the table: "map_application_component_directory" */
  ApplicationComponentDirectoryMap: Array<ApplicationComponentDirectoryMap>;
  /** fetch aggregated fields from the table: "map_application_component_directory" */
  ApplicationComponentDirectoryMapAggregate: ApplicationComponentDirectoryMap_Aggregate;
  /** fetch data from the table: "map_application_component_directory" using primary key columns */
  ApplicationComponentDirectoryMapByPk?: Maybe<ApplicationComponentDirectoryMap>;
  /** fetch data from the table in a streaming manner: "map_application_component_directory" */
  ApplicationComponentDirectoryMap_stream: Array<ApplicationComponentDirectoryMap>;
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
  ApplicationFunctionInterfaceMap: Array<ApplicationFunctionInterfaceMap>;
  /** fetch aggregated fields from the table: "map_application_interface_function" */
  ApplicationFunctionInterfaceMapAggregate: ApplicationFunctionInterfaceMap_Aggregate;
  /** fetch data from the table: "map_application_interface_function" using primary key columns */
  ApplicationFunctionInterfaceMapByPk?: Maybe<ApplicationFunctionInterfaceMap>;
  /** fetch data from the table in a streaming manner: "map_application_interface_function" */
  ApplicationFunctionInterfaceMap_stream: Array<ApplicationFunctionInterfaceMap>;
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
  /** fetch data from the table: "map_business_process_function" */
  BusinessProcessFunctionMap: Array<BusinessProcessFunctionMap>;
  /** fetch aggregated fields from the table: "map_business_process_function" */
  BusinessProcessFunctionMapAggregate: BusinessProcessFunctionMap_Aggregate;
  /** fetch data from the table: "map_business_process_function" using primary key columns */
  BusinessProcessFunctionMapByPk?: Maybe<BusinessProcessFunctionMap>;
  /** fetch data from the table in a streaming manner: "map_business_process_function" */
  BusinessProcessFunctionMap_stream: Array<BusinessProcessFunctionMap>;
  /** fetch data from the table: "map_business_process_hierarchy" */
  BusinessProcessHierarchyMap: Array<BusinessProcessHierarchyMap>;
  /** fetch aggregated fields from the table: "map_business_process_hierarchy" */
  BusinessProcessHierarchyMapAggregate: BusinessProcessHierarchyMap_Aggregate;
  /** fetch data from the table: "map_business_process_hierarchy" using primary key columns */
  BusinessProcessHierarchyMapByPk?: Maybe<BusinessProcessHierarchyMap>;
  /** fetch data from the table in a streaming manner: "map_business_process_hierarchy" */
  BusinessProcessHierarchyMap_stream: Array<BusinessProcessHierarchyMap>;
  /** fetch data from the table: "map_business_process_motivation_item" */
  BusinessProcessMotivationItemMap: Array<BusinessProcessMotivationItemMap>;
  /** fetch aggregated fields from the table: "map_business_process_motivation_item" */
  BusinessProcessMotivationItemMapAggregate: BusinessProcessMotivationItemMap_Aggregate;
  /** fetch data from the table: "map_business_process_motivation_item" using primary key columns */
  BusinessProcessMotivationItemMapByPk?: Maybe<BusinessProcessMotivationItemMap>;
  /** fetch data from the table in a streaming manner: "map_business_process_motivation_item" */
  BusinessProcessMotivationItemMap_stream: Array<BusinessProcessMotivationItemMap>;
  /** fetch data from the table: "products" */
  BusinessProduct: Array<BusinessProduct>;
  /** fetch aggregated fields from the table: "products" */
  BusinessProductAggregate: BusinessProduct_Aggregate;
  /** fetch data from the table: "products" using primary key columns */
  BusinessProductByPk?: Maybe<BusinessProduct>;
  /** fetch data from the table in a streaming manner: "products" */
  BusinessProduct_stream: Array<BusinessProduct>;
  /** fetch data from the table: "capabilities" */
  Capability: Array<Capability>;
  /** fetch aggregated fields from the table: "capabilities" */
  CapabilityAggregate: Capability_Aggregate;
  /** fetch data from the table: "map_capability_application_component_assessment" */
  CapabilityApplicationComponentAssessmentMap: Array<CapabilityApplicationComponentAssessmentMap>;
  /** fetch aggregated fields from the table: "map_capability_application_component_assessment" */
  CapabilityApplicationComponentAssessmentMapAggregate: CapabilityApplicationComponentAssessmentMap_Aggregate;
  /** fetch data from the table: "map_capability_application_component_assessment" using primary key columns */
  CapabilityApplicationComponentAssessmentMapByPk?: Maybe<CapabilityApplicationComponentAssessmentMap>;
  /** fetch data from the table in a streaming manner: "map_capability_application_component_assessment" */
  CapabilityApplicationComponentAssessmentMap_stream: Array<CapabilityApplicationComponentAssessmentMap>;
  /** fetch data from the table: "map_capability_application_component" */
  CapabilityApplicationComponentMap: Array<CapabilityApplicationComponentMap>;
  /** fetch aggregated fields from the table: "map_capability_application_component" */
  CapabilityApplicationComponentMapAggregate: CapabilityApplicationComponentMap_Aggregate;
  /** fetch data from the table: "map_capability_application_component" using primary key columns */
  CapabilityApplicationComponentMapByPk?: Maybe<CapabilityApplicationComponentMap>;
  /** fetch data from the table in a streaming manner: "map_capability_application_component" */
  CapabilityApplicationComponentMap_stream: Array<CapabilityApplicationComponentMap>;
  /** fetch data from the table: "map_capability_business_process_assessment" */
  CapabilityBusinessProcessAssessmentMap: Array<CapabilityBusinessProcessAssessmentMap>;
  /** fetch aggregated fields from the table: "map_capability_business_process_assessment" */
  CapabilityBusinessProcessAssessmentMapAggregate: CapabilityBusinessProcessAssessmentMap_Aggregate;
  /** fetch data from the table: "map_capability_business_process_assessment" using primary key columns */
  CapabilityBusinessProcessAssessmentMapByPk?: Maybe<CapabilityBusinessProcessAssessmentMap>;
  /** fetch data from the table in a streaming manner: "map_capability_business_process_assessment" */
  CapabilityBusinessProcessAssessmentMap_stream: Array<CapabilityBusinessProcessAssessmentMap>;
  /** fetch data from the table: "map_capability_business_process" */
  CapabilityBusinessProcessMap: Array<CapabilityBusinessProcessMap>;
  /** fetch aggregated fields from the table: "map_capability_business_process" */
  CapabilityBusinessProcessMapAggregate: CapabilityBusinessProcessMap_Aggregate;
  /** fetch data from the table: "map_capability_business_process" using primary key columns */
  CapabilityBusinessProcessMapByPk?: Maybe<CapabilityBusinessProcessMap>;
  /** fetch data from the table in a streaming manner: "map_capability_business_process" */
  CapabilityBusinessProcessMap_stream: Array<CapabilityBusinessProcessMap>;
  /** fetch data from the table: "capabilities" using primary key columns */
  CapabilityByPk?: Maybe<Capability>;
  /** fetch data from the table: "map_capability_hierarchy" */
  CapabilityHierarchyMap: Array<CapabilityHierarchyMap>;
  /** fetch aggregated fields from the table: "map_capability_hierarchy" */
  CapabilityHierarchyMapAggregate: CapabilityHierarchyMap_Aggregate;
  /** fetch data from the table: "map_capability_hierarchy" using primary key columns */
  CapabilityHierarchyMapByPk?: Maybe<CapabilityHierarchyMap>;
  /** fetch data from the table in a streaming manner: "map_capability_hierarchy" */
  CapabilityHierarchyMap_stream: Array<CapabilityHierarchyMap>;
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
  Event: Array<Event>;
  /** fetch aggregated fields from the table: "events" */
  EventAggregate: Event_Aggregate;
  /** fetch data from the table: "events" using primary key columns */
  EventByPk?: Maybe<Event>;
  /** fetch data from the table in a streaming manner: "events" */
  Event_stream: Array<Event>;
  /** fetch data from the table: "flows" */
  FlowGeneric: Array<FlowGeneric>;
  /** fetch aggregated fields from the table: "flows" */
  FlowGenericAggregate: FlowGeneric_Aggregate;
  /** fetch data from the table: "flows" using primary key columns */
  FlowGenericByPk?: Maybe<FlowGeneric>;
  /** fetch data from the table in a streaming manner: "flows" */
  FlowGeneric_stream: Array<FlowGeneric>;
  /** fetch data from the table: "functions" */
  Function: Array<Function>;
  /** fetch aggregated fields from the table: "functions" */
  FunctionAggregate: Function_Aggregate;
  /** fetch data from the table: "functions" using primary key columns */
  FunctionByPk?: Maybe<Function>;
  /** fetch data from the table in a streaming manner: "functions" */
  Function_stream: Array<Function>;
  /** fetch data from the table: "interfaces" */
  Interface: Array<Interface>;
  /** fetch aggregated fields from the table: "interfaces" */
  InterfaceAggregate: Interface_Aggregate;
  /** fetch data from the table: "interfaces" using primary key columns */
  InterfaceByPk?: Maybe<Interface>;
  /** fetch data from the table in a streaming manner: "interfaces" */
  Interface_stream: Array<Interface>;
  /** fetch data from the table: "locations" */
  Location: Array<Location>;
  /** fetch aggregated fields from the table: "locations" */
  LocationAggregate: Location_Aggregate;
  /** fetch data from the table: "locations" using primary key columns */
  LocationByPk?: Maybe<Location>;
  /** fetch data from the table in a streaming manner: "locations" */
  Location_stream: Array<Location>;
  /** fetch data from the table: "motivations" */
  MotivationElementGeneric: Array<MotivationElementGeneric>;
  /** fetch aggregated fields from the table: "motivations" */
  MotivationElementGenericAggregate: MotivationElementGeneric_Aggregate;
  /** fetch data from the table: "motivations" using primary key columns */
  MotivationElementGenericByPk?: Maybe<MotivationElementGeneric>;
  /** fetch data from the table in a streaming manner: "motivations" */
  MotivationElementGeneric_stream: Array<MotivationElementGeneric>;
  /** fetch data from the table: "map_motivation_item_hierarchy" */
  MotivationItemHierarchyMap: Array<MotivationItemHierarchyMap>;
  /** fetch aggregated fields from the table: "map_motivation_item_hierarchy" */
  MotivationItemHierarchyMapAggregate: MotivationItemHierarchyMap_Aggregate;
  /** fetch data from the table: "map_motivation_item_hierarchy" using primary key columns */
  MotivationItemHierarchyMapByPk?: Maybe<MotivationItemHierarchyMap>;
  /** fetch data from the table in a streaming manner: "map_motivation_item_hierarchy" */
  MotivationItemHierarchyMap_stream: Array<MotivationItemHierarchyMap>;
  /** fetch data from the table: "plateaus" */
  Plateau: Array<Plateau>;
  /** fetch aggregated fields from the table: "plateaus" */
  PlateauAggregate: Plateau_Aggregate;
  /** fetch data from the table: "plateaus" using primary key columns */
  PlateauByPk?: Maybe<Plateau>;
  /** fetch data from the table in a streaming manner: "plateaus" */
  Plateau_stream: Array<Plateau>;
  /** fetch data from the table: "processes" */
  Process: Array<Process>;
  /** fetch aggregated fields from the table: "processes" */
  ProcessAggregate: Process_Aggregate;
  /** fetch data from the table: "processes" using primary key columns */
  ProcessByPk?: Maybe<Process>;
  /** fetch data from the table in a streaming manner: "processes" */
  Process_stream: Array<Process>;
  /** fetch data from the table: "roles" */
  Role: Array<Role>;
  /** fetch aggregated fields from the table: "roles" */
  RoleAggregate: Role_Aggregate;
  /** fetch data from the table: "roles" using primary key columns */
  RoleByPk?: Maybe<Role>;
  /** fetch data from the table in a streaming manner: "roles" */
  Role_stream: Array<Role>;
  /** fetch data from the table: "services" */
  Service: Array<Service>;
  /** fetch aggregated fields from the table: "services" */
  ServiceAggregate: Service_Aggregate;
  /** fetch data from the table: "services" using primary key columns */
  ServiceByPk?: Maybe<Service>;
  /** fetch data from the table in a streaming manner: "services" */
  Service_stream: Array<Service>;
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
  /** fetch data from the table: "map_solution_application_function" */
  SolutionApplicationFunctionMap: Array<SolutionApplicationFunctionMap>;
  /** fetch aggregated fields from the table: "map_solution_application_function" */
  SolutionApplicationFunctionMapAggregate: SolutionApplicationFunctionMap_Aggregate;
  /** fetch data from the table: "map_solution_application_function" using primary key columns */
  SolutionApplicationFunctionMapByPk?: Maybe<SolutionApplicationFunctionMap>;
  /** fetch data from the table in a streaming manner: "map_solution_application_function" */
  SolutionApplicationFunctionMap_stream: Array<SolutionApplicationFunctionMap>;
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
  /** fetch data from the table: "map_solution_data_object" */
  SolutionDataObjectMap: Array<SolutionDataObjectMap>;
  /** fetch aggregated fields from the table: "map_solution_data_object" */
  SolutionDataObjectMapAggregate: SolutionDataObjectMap_Aggregate;
  /** fetch data from the table: "map_solution_data_object" using primary key columns */
  SolutionDataObjectMapByPk?: Maybe<SolutionDataObjectMap>;
  /** fetch data from the table in a streaming manner: "map_solution_data_object" */
  SolutionDataObjectMap_stream: Array<SolutionDataObjectMap>;
  /** fetch data from the table: "map_solution_flow" */
  SolutionFlowMap: Array<SolutionFlowMap>;
  /** fetch aggregated fields from the table: "map_solution_flow" */
  SolutionFlowMapAggregate: SolutionFlowMap_Aggregate;
  /** fetch data from the table: "map_solution_flow" using primary key columns */
  SolutionFlowMapByPk?: Maybe<SolutionFlowMap>;
  /** fetch data from the table in a streaming manner: "map_solution_flow" */
  SolutionFlowMap_stream: Array<SolutionFlowMap>;
  /** fetch data from the table: "map_solution_motivation_component" */
  SolutionMotivationComponentMap: Array<SolutionMotivationComponentMap>;
  /** fetch aggregated fields from the table: "map_solution_motivation_component" */
  SolutionMotivationComponentMapAggregate: SolutionMotivationComponentMap_Aggregate;
  /** fetch data from the table: "map_solution_motivation_component" using primary key columns */
  SolutionMotivationComponentMapByPk?: Maybe<SolutionMotivationComponentMap>;
  /** fetch data from the table in a streaming manner: "map_solution_motivation_component" */
  SolutionMotivationComponentMap_stream: Array<SolutionMotivationComponentMap>;
  /** fetch data from the table: "map_solution_motivation" */
  SolutionMotivationElementMap: Array<SolutionMotivationElementMap>;
  /** fetch aggregated fields from the table: "map_solution_motivation" */
  SolutionMotivationElementMapAggregate: SolutionMotivationElementMap_Aggregate;
  /** fetch data from the table: "map_solution_motivation" using primary key columns */
  SolutionMotivationElementMapByPk?: Maybe<SolutionMotivationElementMap>;
  /** fetch data from the table in a streaming manner: "map_solution_motivation" */
  SolutionMotivationElementMap_stream: Array<SolutionMotivationElementMap>;
  /** fetch data from the table: "map_solution_stakeholder" */
  SolutionStakeholderMap: Array<SolutionStakeholderMap>;
  /** fetch aggregated fields from the table: "map_solution_stakeholder" */
  SolutionStakeholderMapAggregate: SolutionStakeholderMap_Aggregate;
  /** fetch data from the table: "map_solution_stakeholder" using primary key columns */
  SolutionStakeholderMapByPk?: Maybe<SolutionStakeholderMap>;
  /** fetch data from the table in a streaming manner: "map_solution_stakeholder" */
  SolutionStakeholderMap_stream: Array<SolutionStakeholderMap>;
  /** fetch data from the table: "map_solution_technology_node" */
  SolutionTechnologyNodeMap: Array<SolutionTechnologyNodeMap>;
  /** fetch aggregated fields from the table: "map_solution_technology_node" */
  SolutionTechnologyNodeMapAggregate: SolutionTechnologyNodeMap_Aggregate;
  /** fetch data from the table: "map_solution_technology_node" using primary key columns */
  SolutionTechnologyNodeMapByPk?: Maybe<SolutionTechnologyNodeMap>;
  /** fetch data from the table in a streaming manner: "map_solution_technology_node" */
  SolutionTechnologyNodeMap_stream: Array<SolutionTechnologyNodeMap>;
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
  /** fetch data from the table: "tenants" */
  Tenant: Array<Tenant>;
  /** fetch aggregated fields from the table: "tenants" */
  TenantAggregate: Tenant_Aggregate;
  /** fetch data from the table: "tenants" using primary key columns */
  TenantByPk?: Maybe<Tenant>;
  /** fetch data from the table in a streaming manner: "tenants" */
  Tenant_stream: Array<Tenant>;
  /** fetch data from the table: "user_profiles" */
  UserProfile: Array<UserProfile>;
  /** fetch aggregated fields from the table: "user_profiles" */
  UserProfileAggregate: UserProfile_Aggregate;
  /** fetch data from the table: "user_profiles" using primary key columns */
  UserProfileByPk?: Maybe<UserProfile>;
  /** fetch data from the table in a streaming manner: "user_profiles" */
  UserProfile_stream: Array<UserProfile>;
  /** fetch data from the table: "variants" */
  Variant: Array<Variant>;
  /** fetch aggregated fields from the table: "variants" */
  VariantAggregate: Variant_Aggregate;
  /** fetch data from the table: "variants" using primary key columns */
  VariantByPk?: Maybe<Variant>;
  /** fetch data from the table: "map_variant_motivation" */
  VariantMotivationElementMap: Array<VariantMotivationElementMap>;
  /** fetch aggregated fields from the table: "map_variant_motivation" */
  VariantMotivationElementMapAggregate: VariantMotivationElementMap_Aggregate;
  /** fetch data from the table: "map_variant_motivation" using primary key columns */
  VariantMotivationElementMapByPk?: Maybe<VariantMotivationElementMap>;
  /** fetch data from the table in a streaming manner: "map_variant_motivation" */
  VariantMotivationElementMap_stream: Array<VariantMotivationElementMap>;
  /** fetch data from the table in a streaming manner: "variants" */
  Variant_stream: Array<Variant>;
  /** fetch data from the table: "views" */
  View: Array<View>;
  /** fetch aggregated fields from the table: "views" */
  ViewAggregate: View_Aggregate;
  /** fetch data from the table: "views" using primary key columns */
  ViewByPk?: Maybe<View>;
  /** fetch data from the table in a streaming manner: "views" */
  View_stream: Array<View>;
  /** fetch data from the table: "workspaces" */
  Workspace: Array<Workspace>;
  /** fetch aggregated fields from the table: "workspaces" */
  WorkspaceAggregate: Workspace_Aggregate;
  /** fetch data from the table: "workspaces" using primary key columns */
  WorkspaceByPk?: Maybe<Workspace>;
  /** fetch data from the table in a streaming manner: "workspaces" */
  Workspace_stream: Array<Workspace>;
  /** fetch data from the table: "map_tenant_user_profiles" */
  mapTenantUserProfiles: Array<MapTenantUserProfiles>;
  /** fetch aggregated fields from the table: "map_tenant_user_profiles" */
  mapTenantUserProfiles_aggregate: MapTenantUserProfiles_Aggregate;
  /** fetch data from the table: "map_tenant_user_profiles" using primary key columns */
  mapTenantUserProfiles_by_pk?: Maybe<MapTenantUserProfiles>;
  /** fetch data from the table in a streaming manner: "map_tenant_user_profiles" */
  mapTenantUserProfiles_stream: Array<MapTenantUserProfiles>;
  /** fetch data from the table: "map_workspace_user_profiles" */
  mapWorkspaceUserProfiles: Array<MapWorkspaceUserProfiles>;
  /** fetch aggregated fields from the table: "map_workspace_user_profiles" */
  mapWorkspaceUserProfiles_aggregate: MapWorkspaceUserProfiles_Aggregate;
  /** fetch data from the table: "map_workspace_user_profiles" using primary key columns */
  mapWorkspaceUserProfiles_by_pk?: Maybe<MapWorkspaceUserProfiles>;
  /** fetch data from the table in a streaming manner: "map_workspace_user_profiles" */
  mapWorkspaceUserProfiles_stream: Array<MapWorkspaceUserProfiles>;
  /** fetch data from the table: "states" */
  states: Array<States>;
  /** fetch aggregated fields from the table: "states" */
  states_aggregate: States_Aggregate;
  /** fetch data from the table: "states" using primary key columns */
  states_by_pk?: Maybe<States>;
  /** fetch data from the table in a streaming manner: "states" */
  states_stream: Array<States>;
  /** fetch data from the table: "transitions" */
  transitions: Array<Transitions>;
  /** fetch aggregated fields from the table: "transitions" */
  transitions_aggregate: Transitions_Aggregate;
  /** fetch data from the table: "transitions" using primary key columns */
  transitions_by_pk?: Maybe<Transitions>;
  /** fetch data from the table in a streaming manner: "transitions" */
  transitions_stream: Array<Transitions>;
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


export type Subscription_RootApplicationComponentBusinessActorRoleMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentBusinessActorRoleMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentBusinessActorRoleMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentBusinessActorRoleMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentBusinessActorRoleMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentBusinessActorRoleMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentBusinessActorRoleMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentBusinessActorRoleMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentBusinessActorRoleMapByPkArgs = {
  actorId: Scalars['uuid']['input'];
  componentId: Scalars['uuid']['input'];
  roleId: Scalars['uuid']['input'];
};


export type Subscription_RootApplicationComponentBusinessActorRoleMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ApplicationComponentBusinessActorRoleMap_Stream_Cursor_Input>>;
  where?: InputMaybe<ApplicationComponentBusinessActorRoleMap_Bool_Exp>;
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


export type Subscription_RootApplicationComponentDirectoryMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentDirectoryMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentDirectoryMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentDirectoryMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentDirectoryMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationComponentDirectoryMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationComponentDirectoryMap_Order_By>>;
  where?: InputMaybe<ApplicationComponentDirectoryMap_Bool_Exp>;
};


export type Subscription_RootApplicationComponentDirectoryMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  directoryId: Scalars['uuid']['input'];
};


export type Subscription_RootApplicationComponentDirectoryMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ApplicationComponentDirectoryMap_Stream_Cursor_Input>>;
  where?: InputMaybe<ApplicationComponentDirectoryMap_Bool_Exp>;
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


export type Subscription_RootApplicationFunctionInterfaceMapArgs = {
  distinct_on?: InputMaybe<Array<ApplicationFunctionInterfaceMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationFunctionInterfaceMap_Order_By>>;
  where?: InputMaybe<ApplicationFunctionInterfaceMap_Bool_Exp>;
};


export type Subscription_RootApplicationFunctionInterfaceMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<ApplicationFunctionInterfaceMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ApplicationFunctionInterfaceMap_Order_By>>;
  where?: InputMaybe<ApplicationFunctionInterfaceMap_Bool_Exp>;
};


export type Subscription_RootApplicationFunctionInterfaceMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  functionId: Scalars['uuid']['input'];
  interfaceId: Scalars['uuid']['input'];
};


export type Subscription_RootApplicationFunctionInterfaceMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ApplicationFunctionInterfaceMap_Stream_Cursor_Input>>;
  where?: InputMaybe<ApplicationFunctionInterfaceMap_Bool_Exp>;
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


export type Subscription_RootBusinessProcessFunctionMapArgs = {
  distinct_on?: InputMaybe<Array<BusinessProcessFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProcessFunctionMap_Order_By>>;
  where?: InputMaybe<BusinessProcessFunctionMap_Bool_Exp>;
};


export type Subscription_RootBusinessProcessFunctionMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<BusinessProcessFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProcessFunctionMap_Order_By>>;
  where?: InputMaybe<BusinessProcessFunctionMap_Bool_Exp>;
};


export type Subscription_RootBusinessProcessFunctionMapByPkArgs = {
  functionId: Scalars['uuid']['input'];
  processId: Scalars['uuid']['input'];
};


export type Subscription_RootBusinessProcessFunctionMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<BusinessProcessFunctionMap_Stream_Cursor_Input>>;
  where?: InputMaybe<BusinessProcessFunctionMap_Bool_Exp>;
};


export type Subscription_RootBusinessProcessHierarchyMapArgs = {
  distinct_on?: InputMaybe<Array<BusinessProcessHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProcessHierarchyMap_Order_By>>;
  where?: InputMaybe<BusinessProcessHierarchyMap_Bool_Exp>;
};


export type Subscription_RootBusinessProcessHierarchyMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<BusinessProcessHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProcessHierarchyMap_Order_By>>;
  where?: InputMaybe<BusinessProcessHierarchyMap_Bool_Exp>;
};


export type Subscription_RootBusinessProcessHierarchyMapByPkArgs = {
  processChildId: Scalars['uuid']['input'];
  processParentId: Scalars['uuid']['input'];
};


export type Subscription_RootBusinessProcessHierarchyMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<BusinessProcessHierarchyMap_Stream_Cursor_Input>>;
  where?: InputMaybe<BusinessProcessHierarchyMap_Bool_Exp>;
};


export type Subscription_RootBusinessProcessMotivationItemMapArgs = {
  distinct_on?: InputMaybe<Array<BusinessProcessMotivationItemMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProcessMotivationItemMap_Order_By>>;
  where?: InputMaybe<BusinessProcessMotivationItemMap_Bool_Exp>;
};


export type Subscription_RootBusinessProcessMotivationItemMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<BusinessProcessMotivationItemMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BusinessProcessMotivationItemMap_Order_By>>;
  where?: InputMaybe<BusinessProcessMotivationItemMap_Bool_Exp>;
};


export type Subscription_RootBusinessProcessMotivationItemMapByPkArgs = {
  motivationId: Scalars['uuid']['input'];
  processId: Scalars['uuid']['input'];
};


export type Subscription_RootBusinessProcessMotivationItemMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<BusinessProcessMotivationItemMap_Stream_Cursor_Input>>;
  where?: InputMaybe<BusinessProcessMotivationItemMap_Bool_Exp>;
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


export type Subscription_RootCapabilityApplicationComponentAssessmentMapArgs = {
  distinct_on?: InputMaybe<Array<CapabilityApplicationComponentAssessmentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityApplicationComponentAssessmentMap_Order_By>>;
  where?: InputMaybe<CapabilityApplicationComponentAssessmentMap_Bool_Exp>;
};


export type Subscription_RootCapabilityApplicationComponentAssessmentMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<CapabilityApplicationComponentAssessmentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityApplicationComponentAssessmentMap_Order_By>>;
  where?: InputMaybe<CapabilityApplicationComponentAssessmentMap_Bool_Exp>;
};


export type Subscription_RootCapabilityApplicationComponentAssessmentMapByPkArgs = {
  assessmentId: Scalars['uuid']['input'];
  capabilityId: Scalars['uuid']['input'];
  componentId: Scalars['uuid']['input'];
};


export type Subscription_RootCapabilityApplicationComponentAssessmentMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<CapabilityApplicationComponentAssessmentMap_Stream_Cursor_Input>>;
  where?: InputMaybe<CapabilityApplicationComponentAssessmentMap_Bool_Exp>;
};


export type Subscription_RootCapabilityApplicationComponentMapArgs = {
  distinct_on?: InputMaybe<Array<CapabilityApplicationComponentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityApplicationComponentMap_Order_By>>;
  where?: InputMaybe<CapabilityApplicationComponentMap_Bool_Exp>;
};


export type Subscription_RootCapabilityApplicationComponentMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<CapabilityApplicationComponentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityApplicationComponentMap_Order_By>>;
  where?: InputMaybe<CapabilityApplicationComponentMap_Bool_Exp>;
};


export type Subscription_RootCapabilityApplicationComponentMapByPkArgs = {
  capabilityId: Scalars['uuid']['input'];
  componentId: Scalars['uuid']['input'];
};


export type Subscription_RootCapabilityApplicationComponentMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<CapabilityApplicationComponentMap_Stream_Cursor_Input>>;
  where?: InputMaybe<CapabilityApplicationComponentMap_Bool_Exp>;
};


export type Subscription_RootCapabilityBusinessProcessAssessmentMapArgs = {
  distinct_on?: InputMaybe<Array<CapabilityBusinessProcessAssessmentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityBusinessProcessAssessmentMap_Order_By>>;
  where?: InputMaybe<CapabilityBusinessProcessAssessmentMap_Bool_Exp>;
};


export type Subscription_RootCapabilityBusinessProcessAssessmentMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<CapabilityBusinessProcessAssessmentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityBusinessProcessAssessmentMap_Order_By>>;
  where?: InputMaybe<CapabilityBusinessProcessAssessmentMap_Bool_Exp>;
};


export type Subscription_RootCapabilityBusinessProcessAssessmentMapByPkArgs = {
  assessmentId: Scalars['uuid']['input'];
  capabilityId: Scalars['uuid']['input'];
  processId: Scalars['uuid']['input'];
};


export type Subscription_RootCapabilityBusinessProcessAssessmentMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<CapabilityBusinessProcessAssessmentMap_Stream_Cursor_Input>>;
  where?: InputMaybe<CapabilityBusinessProcessAssessmentMap_Bool_Exp>;
};


export type Subscription_RootCapabilityBusinessProcessMapArgs = {
  distinct_on?: InputMaybe<Array<CapabilityBusinessProcessMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityBusinessProcessMap_Order_By>>;
  where?: InputMaybe<CapabilityBusinessProcessMap_Bool_Exp>;
};


export type Subscription_RootCapabilityBusinessProcessMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<CapabilityBusinessProcessMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityBusinessProcessMap_Order_By>>;
  where?: InputMaybe<CapabilityBusinessProcessMap_Bool_Exp>;
};


export type Subscription_RootCapabilityBusinessProcessMapByPkArgs = {
  capabilityId: Scalars['uuid']['input'];
  processId: Scalars['uuid']['input'];
};


export type Subscription_RootCapabilityBusinessProcessMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<CapabilityBusinessProcessMap_Stream_Cursor_Input>>;
  where?: InputMaybe<CapabilityBusinessProcessMap_Bool_Exp>;
};


export type Subscription_RootCapabilityByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootCapabilityHierarchyMapArgs = {
  distinct_on?: InputMaybe<Array<CapabilityHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityHierarchyMap_Order_By>>;
  where?: InputMaybe<CapabilityHierarchyMap_Bool_Exp>;
};


export type Subscription_RootCapabilityHierarchyMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<CapabilityHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CapabilityHierarchyMap_Order_By>>;
  where?: InputMaybe<CapabilityHierarchyMap_Bool_Exp>;
};


export type Subscription_RootCapabilityHierarchyMapByPkArgs = {
  childId: Scalars['uuid']['input'];
  parentId: Scalars['uuid']['input'];
};


export type Subscription_RootCapabilityHierarchyMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<CapabilityHierarchyMap_Stream_Cursor_Input>>;
  where?: InputMaybe<CapabilityHierarchyMap_Bool_Exp>;
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


export type Subscription_RootEventArgs = {
  distinct_on?: InputMaybe<Array<Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Order_By>>;
  where?: InputMaybe<Event_Bool_Exp>;
};


export type Subscription_RootEventAggregateArgs = {
  distinct_on?: InputMaybe<Array<Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Order_By>>;
  where?: InputMaybe<Event_Bool_Exp>;
};


export type Subscription_RootEventByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootEvent_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Event_Stream_Cursor_Input>>;
  where?: InputMaybe<Event_Bool_Exp>;
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


export type Subscription_RootFunctionArgs = {
  distinct_on?: InputMaybe<Array<Function_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Function_Order_By>>;
  where?: InputMaybe<Function_Bool_Exp>;
};


export type Subscription_RootFunctionAggregateArgs = {
  distinct_on?: InputMaybe<Array<Function_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Function_Order_By>>;
  where?: InputMaybe<Function_Bool_Exp>;
};


export type Subscription_RootFunctionByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootFunction_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Function_Stream_Cursor_Input>>;
  where?: InputMaybe<Function_Bool_Exp>;
};


export type Subscription_RootInterfaceArgs = {
  distinct_on?: InputMaybe<Array<Interface_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Interface_Order_By>>;
  where?: InputMaybe<Interface_Bool_Exp>;
};


export type Subscription_RootInterfaceAggregateArgs = {
  distinct_on?: InputMaybe<Array<Interface_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Interface_Order_By>>;
  where?: InputMaybe<Interface_Bool_Exp>;
};


export type Subscription_RootInterfaceByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootInterface_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Interface_Stream_Cursor_Input>>;
  where?: InputMaybe<Interface_Bool_Exp>;
};


export type Subscription_RootLocationArgs = {
  distinct_on?: InputMaybe<Array<Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Location_Order_By>>;
  where?: InputMaybe<Location_Bool_Exp>;
};


export type Subscription_RootLocationAggregateArgs = {
  distinct_on?: InputMaybe<Array<Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Location_Order_By>>;
  where?: InputMaybe<Location_Bool_Exp>;
};


export type Subscription_RootLocationByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootLocation_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Location_Stream_Cursor_Input>>;
  where?: InputMaybe<Location_Bool_Exp>;
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


export type Subscription_RootMotivationItemHierarchyMapArgs = {
  distinct_on?: InputMaybe<Array<MotivationItemHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MotivationItemHierarchyMap_Order_By>>;
  where?: InputMaybe<MotivationItemHierarchyMap_Bool_Exp>;
};


export type Subscription_RootMotivationItemHierarchyMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<MotivationItemHierarchyMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MotivationItemHierarchyMap_Order_By>>;
  where?: InputMaybe<MotivationItemHierarchyMap_Bool_Exp>;
};


export type Subscription_RootMotivationItemHierarchyMapByPkArgs = {
  childId: Scalars['uuid']['input'];
  parentId: Scalars['uuid']['input'];
};


export type Subscription_RootMotivationItemHierarchyMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<MotivationItemHierarchyMap_Stream_Cursor_Input>>;
  where?: InputMaybe<MotivationItemHierarchyMap_Bool_Exp>;
};


export type Subscription_RootPlateauArgs = {
  distinct_on?: InputMaybe<Array<Plateau_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plateau_Order_By>>;
  where?: InputMaybe<Plateau_Bool_Exp>;
};


export type Subscription_RootPlateauAggregateArgs = {
  distinct_on?: InputMaybe<Array<Plateau_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plateau_Order_By>>;
  where?: InputMaybe<Plateau_Bool_Exp>;
};


export type Subscription_RootPlateauByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootPlateau_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Plateau_Stream_Cursor_Input>>;
  where?: InputMaybe<Plateau_Bool_Exp>;
};


export type Subscription_RootProcessArgs = {
  distinct_on?: InputMaybe<Array<Process_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Process_Order_By>>;
  where?: InputMaybe<Process_Bool_Exp>;
};


export type Subscription_RootProcessAggregateArgs = {
  distinct_on?: InputMaybe<Array<Process_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Process_Order_By>>;
  where?: InputMaybe<Process_Bool_Exp>;
};


export type Subscription_RootProcessByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootProcess_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Process_Stream_Cursor_Input>>;
  where?: InputMaybe<Process_Bool_Exp>;
};


export type Subscription_RootRoleArgs = {
  distinct_on?: InputMaybe<Array<Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Role_Order_By>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


export type Subscription_RootRoleAggregateArgs = {
  distinct_on?: InputMaybe<Array<Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Role_Order_By>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


export type Subscription_RootRoleByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootRole_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Role_Stream_Cursor_Input>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


export type Subscription_RootServiceArgs = {
  distinct_on?: InputMaybe<Array<Service_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Service_Order_By>>;
  where?: InputMaybe<Service_Bool_Exp>;
};


export type Subscription_RootServiceAggregateArgs = {
  distinct_on?: InputMaybe<Array<Service_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Service_Order_By>>;
  where?: InputMaybe<Service_Bool_Exp>;
};


export type Subscription_RootServiceByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootService_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Service_Stream_Cursor_Input>>;
  where?: InputMaybe<Service_Bool_Exp>;
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


export type Subscription_RootSolutionApplicationFunctionMapArgs = {
  distinct_on?: InputMaybe<Array<SolutionApplicationFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionApplicationFunctionMap_Order_By>>;
  where?: InputMaybe<SolutionApplicationFunctionMap_Bool_Exp>;
};


export type Subscription_RootSolutionApplicationFunctionMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionApplicationFunctionMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionApplicationFunctionMap_Order_By>>;
  where?: InputMaybe<SolutionApplicationFunctionMap_Bool_Exp>;
};


export type Subscription_RootSolutionApplicationFunctionMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  functionId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};


export type Subscription_RootSolutionApplicationFunctionMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<SolutionApplicationFunctionMap_Stream_Cursor_Input>>;
  where?: InputMaybe<SolutionApplicationFunctionMap_Bool_Exp>;
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
  motivationId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};


export type Subscription_RootSolutionConstraintMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<SolutionConstraintMap_Stream_Cursor_Input>>;
  where?: InputMaybe<SolutionConstraintMap_Bool_Exp>;
};


export type Subscription_RootSolutionDataObjectMapArgs = {
  distinct_on?: InputMaybe<Array<SolutionDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionDataObjectMap_Order_By>>;
  where?: InputMaybe<SolutionDataObjectMap_Bool_Exp>;
};


export type Subscription_RootSolutionDataObjectMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionDataObjectMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionDataObjectMap_Order_By>>;
  where?: InputMaybe<SolutionDataObjectMap_Bool_Exp>;
};


export type Subscription_RootSolutionDataObjectMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  dataObjectId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};


export type Subscription_RootSolutionDataObjectMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<SolutionDataObjectMap_Stream_Cursor_Input>>;
  where?: InputMaybe<SolutionDataObjectMap_Bool_Exp>;
};


export type Subscription_RootSolutionFlowMapArgs = {
  distinct_on?: InputMaybe<Array<SolutionFlowMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionFlowMap_Order_By>>;
  where?: InputMaybe<SolutionFlowMap_Bool_Exp>;
};


export type Subscription_RootSolutionFlowMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionFlowMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionFlowMap_Order_By>>;
  where?: InputMaybe<SolutionFlowMap_Bool_Exp>;
};


export type Subscription_RootSolutionFlowMapByPkArgs = {
  flowId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};


export type Subscription_RootSolutionFlowMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<SolutionFlowMap_Stream_Cursor_Input>>;
  where?: InputMaybe<SolutionFlowMap_Bool_Exp>;
};


export type Subscription_RootSolutionMotivationComponentMapArgs = {
  distinct_on?: InputMaybe<Array<SolutionMotivationComponentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionMotivationComponentMap_Order_By>>;
  where?: InputMaybe<SolutionMotivationComponentMap_Bool_Exp>;
};


export type Subscription_RootSolutionMotivationComponentMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionMotivationComponentMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionMotivationComponentMap_Order_By>>;
  where?: InputMaybe<SolutionMotivationComponentMap_Bool_Exp>;
};


export type Subscription_RootSolutionMotivationComponentMapByPkArgs = {
  componentId: Scalars['uuid']['input'];
  motivationId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};


export type Subscription_RootSolutionMotivationComponentMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<SolutionMotivationComponentMap_Stream_Cursor_Input>>;
  where?: InputMaybe<SolutionMotivationComponentMap_Bool_Exp>;
};


export type Subscription_RootSolutionMotivationElementMapArgs = {
  distinct_on?: InputMaybe<Array<SolutionMotivationElementMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionMotivationElementMap_Order_By>>;
  where?: InputMaybe<SolutionMotivationElementMap_Bool_Exp>;
};


export type Subscription_RootSolutionMotivationElementMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionMotivationElementMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionMotivationElementMap_Order_By>>;
  where?: InputMaybe<SolutionMotivationElementMap_Bool_Exp>;
};


export type Subscription_RootSolutionMotivationElementMapByPkArgs = {
  motivationId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};


export type Subscription_RootSolutionMotivationElementMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<SolutionMotivationElementMap_Stream_Cursor_Input>>;
  where?: InputMaybe<SolutionMotivationElementMap_Bool_Exp>;
};


export type Subscription_RootSolutionStakeholderMapArgs = {
  distinct_on?: InputMaybe<Array<SolutionStakeholderMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionStakeholderMap_Order_By>>;
  where?: InputMaybe<SolutionStakeholderMap_Bool_Exp>;
};


export type Subscription_RootSolutionStakeholderMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionStakeholderMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionStakeholderMap_Order_By>>;
  where?: InputMaybe<SolutionStakeholderMap_Bool_Exp>;
};


export type Subscription_RootSolutionStakeholderMapByPkArgs = {
  solutionId: Scalars['uuid']['input'];
  stakeholderId: Scalars['uuid']['input'];
};


export type Subscription_RootSolutionStakeholderMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<SolutionStakeholderMap_Stream_Cursor_Input>>;
  where?: InputMaybe<SolutionStakeholderMap_Bool_Exp>;
};


export type Subscription_RootSolutionTechnologyNodeMapArgs = {
  distinct_on?: InputMaybe<Array<SolutionTechnologyNodeMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionTechnologyNodeMap_Order_By>>;
  where?: InputMaybe<SolutionTechnologyNodeMap_Bool_Exp>;
};


export type Subscription_RootSolutionTechnologyNodeMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<SolutionTechnologyNodeMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SolutionTechnologyNodeMap_Order_By>>;
  where?: InputMaybe<SolutionTechnologyNodeMap_Bool_Exp>;
};


export type Subscription_RootSolutionTechnologyNodeMapByPkArgs = {
  nodeId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};


export type Subscription_RootSolutionTechnologyNodeMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<SolutionTechnologyNodeMap_Stream_Cursor_Input>>;
  where?: InputMaybe<SolutionTechnologyNodeMap_Bool_Exp>;
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


export type Subscription_RootTenantArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Order_By>>;
  where?: InputMaybe<Tenant_Bool_Exp>;
};


export type Subscription_RootTenantAggregateArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Order_By>>;
  where?: InputMaybe<Tenant_Bool_Exp>;
};


export type Subscription_RootTenantByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootTenant_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Tenant_Stream_Cursor_Input>>;
  where?: InputMaybe<Tenant_Bool_Exp>;
};


export type Subscription_RootUserProfileArgs = {
  distinct_on?: InputMaybe<Array<UserProfile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UserProfile_Order_By>>;
  where?: InputMaybe<UserProfile_Bool_Exp>;
};


export type Subscription_RootUserProfileAggregateArgs = {
  distinct_on?: InputMaybe<Array<UserProfile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UserProfile_Order_By>>;
  where?: InputMaybe<UserProfile_Bool_Exp>;
};


export type Subscription_RootUserProfileByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootUserProfile_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<UserProfile_Stream_Cursor_Input>>;
  where?: InputMaybe<UserProfile_Bool_Exp>;
};


export type Subscription_RootVariantArgs = {
  distinct_on?: InputMaybe<Array<Variant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Variant_Order_By>>;
  where?: InputMaybe<Variant_Bool_Exp>;
};


export type Subscription_RootVariantAggregateArgs = {
  distinct_on?: InputMaybe<Array<Variant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Variant_Order_By>>;
  where?: InputMaybe<Variant_Bool_Exp>;
};


export type Subscription_RootVariantByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootVariantMotivationElementMapArgs = {
  distinct_on?: InputMaybe<Array<VariantMotivationElementMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<VariantMotivationElementMap_Order_By>>;
  where?: InputMaybe<VariantMotivationElementMap_Bool_Exp>;
};


export type Subscription_RootVariantMotivationElementMapAggregateArgs = {
  distinct_on?: InputMaybe<Array<VariantMotivationElementMap_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<VariantMotivationElementMap_Order_By>>;
  where?: InputMaybe<VariantMotivationElementMap_Bool_Exp>;
};


export type Subscription_RootVariantMotivationElementMapByPkArgs = {
  motivationId: Scalars['uuid']['input'];
  variantId: Scalars['uuid']['input'];
};


export type Subscription_RootVariantMotivationElementMap_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<VariantMotivationElementMap_Stream_Cursor_Input>>;
  where?: InputMaybe<VariantMotivationElementMap_Bool_Exp>;
};


export type Subscription_RootVariant_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Variant_Stream_Cursor_Input>>;
  where?: InputMaybe<Variant_Bool_Exp>;
};


export type Subscription_RootViewArgs = {
  distinct_on?: InputMaybe<Array<View_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<View_Order_By>>;
  where?: InputMaybe<View_Bool_Exp>;
};


export type Subscription_RootViewAggregateArgs = {
  distinct_on?: InputMaybe<Array<View_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<View_Order_By>>;
  where?: InputMaybe<View_Bool_Exp>;
};


export type Subscription_RootViewByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootView_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<View_Stream_Cursor_Input>>;
  where?: InputMaybe<View_Bool_Exp>;
};


export type Subscription_RootWorkspaceArgs = {
  distinct_on?: InputMaybe<Array<Workspace_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspace_Order_By>>;
  where?: InputMaybe<Workspace_Bool_Exp>;
};


export type Subscription_RootWorkspaceAggregateArgs = {
  distinct_on?: InputMaybe<Array<Workspace_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workspace_Order_By>>;
  where?: InputMaybe<Workspace_Bool_Exp>;
};


export type Subscription_RootWorkspaceByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootWorkspace_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Workspace_Stream_Cursor_Input>>;
  where?: InputMaybe<Workspace_Bool_Exp>;
};


export type Subscription_RootMapTenantUserProfilesArgs = {
  distinct_on?: InputMaybe<Array<MapTenantUserProfiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MapTenantUserProfiles_Order_By>>;
  where?: InputMaybe<MapTenantUserProfiles_Bool_Exp>;
};


export type Subscription_RootMapTenantUserProfiles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<MapTenantUserProfiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MapTenantUserProfiles_Order_By>>;
  where?: InputMaybe<MapTenantUserProfiles_Bool_Exp>;
};


export type Subscription_RootMapTenantUserProfiles_By_PkArgs = {
  userId: Scalars['uuid']['input'];
};


export type Subscription_RootMapTenantUserProfiles_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<MapTenantUserProfiles_Stream_Cursor_Input>>;
  where?: InputMaybe<MapTenantUserProfiles_Bool_Exp>;
};


export type Subscription_RootMapWorkspaceUserProfilesArgs = {
  distinct_on?: InputMaybe<Array<MapWorkspaceUserProfiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MapWorkspaceUserProfiles_Order_By>>;
  where?: InputMaybe<MapWorkspaceUserProfiles_Bool_Exp>;
};


export type Subscription_RootMapWorkspaceUserProfiles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<MapWorkspaceUserProfiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<MapWorkspaceUserProfiles_Order_By>>;
  where?: InputMaybe<MapWorkspaceUserProfiles_Bool_Exp>;
};


export type Subscription_RootMapWorkspaceUserProfiles_By_PkArgs = {
  userId: Scalars['uuid']['input'];
  workspaceId: Scalars['uuid']['input'];
};


export type Subscription_RootMapWorkspaceUserProfiles_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<MapWorkspaceUserProfiles_Stream_Cursor_Input>>;
  where?: InputMaybe<MapWorkspaceUserProfiles_Bool_Exp>;
};


export type Subscription_RootStatesArgs = {
  distinct_on?: InputMaybe<Array<States_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<States_Order_By>>;
  where?: InputMaybe<States_Bool_Exp>;
};


export type Subscription_RootStates_AggregateArgs = {
  distinct_on?: InputMaybe<Array<States_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<States_Order_By>>;
  where?: InputMaybe<States_Bool_Exp>;
};


export type Subscription_RootStates_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootStates_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<States_Stream_Cursor_Input>>;
  where?: InputMaybe<States_Bool_Exp>;
};


export type Subscription_RootTransitionsArgs = {
  distinct_on?: InputMaybe<Array<Transitions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transitions_Order_By>>;
  where?: InputMaybe<Transitions_Bool_Exp>;
};


export type Subscription_RootTransitions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Transitions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transitions_Order_By>>;
  where?: InputMaybe<Transitions_Bool_Exp>;
};


export type Subscription_RootTransitions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootTransitions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Transitions_Stream_Cursor_Input>>;
  where?: InputMaybe<Transitions_Bool_Exp>;
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

/** Boolean expression to compare columns of type "technology_radar_zone". All fields are combined with logical 'AND'. */
export type Technology_Radar_Zone_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['technology_radar_zone']['input']>;
  _gt?: InputMaybe<Scalars['technology_radar_zone']['input']>;
  _gte?: InputMaybe<Scalars['technology_radar_zone']['input']>;
  _in?: InputMaybe<Array<Scalars['technology_radar_zone']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['technology_radar_zone']['input']>;
  _lte?: InputMaybe<Scalars['technology_radar_zone']['input']>;
  _neq?: InputMaybe<Scalars['technology_radar_zone']['input']>;
  _nin?: InputMaybe<Array<Scalars['technology_radar_zone']['input']>>;
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

/** columns and relationships of "transitions" */
export type Transitions = {
  __typename?: 'transitions';
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  id: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "transitions" */
export type Transitions_Aggregate = {
  __typename?: 'transitions_aggregate';
  aggregate?: Maybe<Transitions_Aggregate_Fields>;
  nodes: Array<Transitions>;
};

/** aggregate fields of "transitions" */
export type Transitions_Aggregate_Fields = {
  __typename?: 'transitions_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Transitions_Max_Fields>;
  min?: Maybe<Transitions_Min_Fields>;
};


/** aggregate fields of "transitions" */
export type Transitions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Transitions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "transitions". All fields are combined with a logical 'AND'. */
export type Transitions_Bool_Exp = {
  _and?: InputMaybe<Array<Transitions_Bool_Exp>>;
  _not?: InputMaybe<Transitions_Bool_Exp>;
  _or?: InputMaybe<Array<Transitions_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type Transitions_Max_Fields = {
  __typename?: 'transitions_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type Transitions_Min_Fields = {
  __typename?: 'transitions_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** Ordering options when selecting data from "transitions". */
export type Transitions_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** select columns of table "transitions" */
export enum Transitions_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  DeletedBy = 'deletedBy',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UpdatedBy = 'updatedBy'
}

/** Streaming cursor of the table "transitions" */
export type Transitions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Transitions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Transitions_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Boolean expression to compare columns of type "user_state". All fields are combined with logical 'AND'. */
export type User_State_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['user_state']['input']>;
  _gt?: InputMaybe<Scalars['user_state']['input']>;
  _gte?: InputMaybe<Scalars['user_state']['input']>;
  _in?: InputMaybe<Array<Scalars['user_state']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['user_state']['input']>;
  _lte?: InputMaybe<Scalars['user_state']['input']>;
  _neq?: InputMaybe<Scalars['user_state']['input']>;
  _nin?: InputMaybe<Array<Scalars['user_state']['input']>>;
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
  where: ApplicationComponent_Bool_Exp;
  componentId: Scalars['uuid']['input'];
}>;


export type GetComponentFullQuery = { __typename?: 'query_root', component: Array<{ __typename?: 'ApplicationComponent', id: any, code: string, name: string, description?: string | null, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null, state?: { __typename?: 'DirectoryObject', id: any, name: string, color?: string | null } | null, licenseType?: { __typename?: 'DirectoryObject', id: any, code: string, name: string } | null, style?: { __typename?: 'DirectoryObject', id: any, code: string, name: string } | null, criticalLevel?: { __typename?: 'DirectoryObject', id: any, code: string, name: string } | null, failoverType?: { __typename?: 'DirectoryObject', id: any, code: string, name: string } | null, recoveryTime?: { __typename?: 'DirectoryObject', id: any, code: string, name: string } | null, redundancyType?: { __typename?: 'DirectoryObject', id: any, code: string, name: string, color?: string | null } | null, monitoringLevel?: { __typename?: 'DirectoryObject', id: any, code: string, name: string } | null, scalingType?: { __typename?: 'DirectoryObject', id: any, code: string, name: string, color?: string | null } | null }>, functions: Array<{ __typename?: 'ApplicationComponentFunctionMap', function: { __typename?: 'Function', id: any, code: string, name: string, description?: string | null } }>, dataObjects: Array<{ __typename?: 'ApplicationComponentDataObjectMap', dataObject: { __typename?: 'DataObject', id: any, code: string, name: string, description?: string | null } }>, interfaces: Array<{ __typename?: 'ApplicationComponentInterfaceMap', interface: { __typename?: 'Interface', id: any, code: string, name: string, description?: string | null } }>, events: Array<{ __typename?: 'ApplicationComponentEventMap', event: { __typename?: 'Event', id: any, code: string, name: string, description?: string | null } }>, systemSoftware: Array<{ __typename?: 'ApplicationComponentSystemSoftwareMap', kind: any, systemSoftware: { __typename?: 'SystemSoftware', id: any, code: string, name: string } }>, technologyNodes: Array<{ __typename?: 'ApplicationComponentTechnologyNodeMap', node: { __typename?: 'TechnologyNode', id: any, code: string, name: string } }>, technologyNetworks: Array<{ __typename?: 'ApplicationComponentTechnologyLogicalNetworkMap', logicalNetwork: { __typename?: 'TechnologyNetwork', id: any, code: string, name: string } }>, parentComponents: Array<{ __typename?: 'ApplicationComponentHierarchyMap', parent: { __typename?: 'ApplicationComponent', id: any, code: string, name: string, description?: string | null } }>, childComponents: Array<{ __typename?: 'ApplicationComponentHierarchyMap', child: { __typename?: 'ApplicationComponent', id: any, code: string, name: string, description?: string | null } }>, incomingFlows: Array<{ __typename?: 'FlowGeneric', id: any, code: string, name: string, description?: string | null, sourceComponent?: { __typename?: 'ApplicationComponent', id: any, code: string, name: string } | null, targetComponent?: { __typename?: 'ApplicationComponent', id: any, code: string, name: string } | null }>, outgoingFlows: Array<{ __typename?: 'FlowGeneric', id: any, code: string, name: string, description?: string | null, sourceComponent?: { __typename?: 'ApplicationComponent', id: any, code: string, name: string } | null, targetComponent?: { __typename?: 'ApplicationComponent', id: any, code: string, name: string } | null }>, stakeholders: Array<{ __typename?: 'ApplicationComponentStakeholderMap', role: any, stakeholder: { __typename?: 'Stakeholder', id: any, code: string, name: string, description?: string | null } }>, businessActorRoles: Array<{ __typename?: 'BusinessActorRoleMap', actor: { __typename?: 'BusinessActor', id: any, code: string, name: string }, role: { __typename?: 'Role', id: any, code: string, name: string } }> };

export type GetComponentsQueryVariables = Exact<{
  where: ApplicationComponent_Bool_Exp;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type GetComponentsQuery = { __typename?: 'query_root', ApplicationComponent: Array<{ __typename?: 'ApplicationComponent', id: any, code: string, name: string, description?: string | null, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null, state?: { __typename?: 'DirectoryObject', id: any, code: string, name: string, color?: string | null } | null, functions: Array<{ __typename?: 'ApplicationComponentFunctionMap', function: { __typename?: 'Function', id: any, code: string, name: string } }>, products: Array<{ __typename?: 'ApplicationComponentProductMap', product: { __typename?: 'BusinessProduct', id: any, code: string, name: string } }>, interfaces: Array<{ __typename?: 'ApplicationComponentInterfaceMap', interface: { __typename?: 'Interface', id: any, code: string, name: string } }>, criticalLevel?: { __typename?: 'DirectoryObject', id: any, code: string, name: string } | null, failoverType?: { __typename?: 'DirectoryObject', id: any, code: string, name: string } | null, licenseType?: { __typename?: 'DirectoryObject', code: string, id: any, name: string } | null, monitoringLevel?: { __typename?: 'DirectoryObject', code: string, id: any, name: string } | null, recoveryTime?: { __typename?: 'DirectoryObject', id: any, code: string, name: string } | null, redundancyType?: { __typename?: 'DirectoryObject', id: any, code: string, name: string, color?: string | null } | null, scalingType?: { __typename?: 'DirectoryObject', id: any, code: string, name: string, color?: string | null } | null, style?: { __typename?: 'DirectoryObject', id: any, code: string, name: string } | null, systemSoftware: Array<{ __typename?: 'ApplicationComponentSystemSoftwareMap', kind: any, systemSoftware: { __typename?: 'SystemSoftware', id: any, code: string, kind: any, licenseType?: { __typename?: 'DirectoryObject', code: string, color?: string | null, id: any, name: string } | null } }> }>, ApplicationComponentAggregate: { __typename?: 'ApplicationComponent_aggregate', aggregate?: { __typename?: 'ApplicationComponent_aggregate_fields', count: number } | null } };

export type GetDataObjectByPkQueryVariables = Exact<{
  where: DataObject_Bool_Exp;
}>;


export type GetDataObjectByPkQuery = { __typename?: 'query_root', DataObject: Array<{ __typename?: 'DataObject', id: any, code: string, name: string, description?: string | null, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null }> };

export type GetDataObjectFullQueryVariables = Exact<{
  where: DataObject_Bool_Exp;
  dataObjectId: Scalars['uuid']['input'];
}>;


export type GetDataObjectFullQuery = { __typename?: 'query_root', dataObject: Array<{ __typename?: 'DataObject', id: any, code: string, name: string, description?: string | null, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null }>, componentMaps: Array<{ __typename?: 'ApplicationComponentDataObjectMap', component: { __typename?: 'ApplicationComponent', id: any, code: string, name: string, description?: string | null } }>, functionMaps: Array<{ __typename?: 'ApplicationFunctionDataObjectMap', functionId: any, accessKind: any, componentId: any, component: { __typename?: 'ApplicationComponent', id: any, code: string, name: string } }> };

export type GetDataObjectsByIdsQueryVariables = Exact<{
  where: DataObject_Bool_Exp;
}>;


export type GetDataObjectsByIdsQuery = { __typename?: 'query_root', DataObject: Array<{ __typename?: 'DataObject', id: any, code: string, name: string, description?: string | null }> };

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

export type GetSolutionFullByCodeQueryVariables = Exact<{
  where: Solution_Bool_Exp;
}>;


export type GetSolutionFullByCodeQuery = { __typename?: 'query_root', solution: Array<{ __typename?: 'Solution', id: any, code: string, name: string, description?: string | null, context: string, decision: string, consequences: string, alternatives: string, decisionStatus: any, implementationStatus: any, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null, components: Array<{ __typename?: 'SolutionApplicationComponentMap', component: { __typename?: 'ApplicationComponent', id: any, code: string, name: string, description?: string | null } }>, functions: Array<{ __typename?: 'SolutionApplicationFunctionMap', componentId: any, functionId: any }>, flows: Array<{ __typename?: 'SolutionFlowMap', flow: { __typename?: 'FlowGeneric', id: any, code: string, name: string, description?: string | null, sourceComponent?: { __typename?: 'ApplicationComponent', id: any, code: string, name: string } | null, targetComponent?: { __typename?: 'ApplicationComponent', id: any, code: string, name: string } | null } }>, motivations: Array<{ __typename?: 'SolutionMotivationElementMap', motivation: { __typename?: 'MotivationElementGeneric', id: any, code: string, name: string, description?: string | null } }>, stakeholders: Array<{ __typename?: 'SolutionStakeholderMap', role: any, stakeholder: { __typename?: 'Stakeholder', id: any, code: string, name: string, description?: string | null } }> }>, solutionDataObjects: Array<{ __typename?: 'SolutionDataObjectMap', componentId: any, dataObjectId: any }>, technologyNodes: Array<{ __typename?: 'SolutionTechnologyNodeMap', node: { __typename?: 'TechnologyNode', id: any, code: string, name: string, description?: string | null } }> };

export type GetSolutionFullQueryVariables = Exact<{
  where: Solution_Bool_Exp;
  solutionId: Scalars['uuid']['input'];
}>;


export type GetSolutionFullQuery = { __typename?: 'query_root', solution: Array<{ __typename?: 'Solution', id: any, code: string, name: string, description?: string | null, context: string, decision: string, consequences: string, alternatives: string, decisionStatus: any, implementationStatus: any, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null, components: Array<{ __typename?: 'SolutionApplicationComponentMap', component: { __typename?: 'ApplicationComponent', id: any, code: string, name: string, description?: string | null } }>, functions: Array<{ __typename?: 'SolutionApplicationFunctionMap', componentId: any, functionId: any }>, flows: Array<{ __typename?: 'SolutionFlowMap', flow: { __typename?: 'FlowGeneric', id: any, code: string, name: string, description?: string | null, sourceComponent?: { __typename?: 'ApplicationComponent', id: any, code: string, name: string } | null, targetComponent?: { __typename?: 'ApplicationComponent', id: any, code: string, name: string } | null } }>, motivations: Array<{ __typename?: 'SolutionMotivationElementMap', motivation: { __typename?: 'MotivationElementGeneric', id: any, code: string, name: string, description?: string | null } }>, stakeholders: Array<{ __typename?: 'SolutionStakeholderMap', role: any, stakeholder: { __typename?: 'Stakeholder', id: any, code: string, name: string, description?: string | null } }> }>, solutionDataObjects: Array<{ __typename?: 'SolutionDataObjectMap', componentId: any, dataObjectId: any }>, technologyNodes: Array<{ __typename?: 'SolutionTechnologyNodeMap', node: { __typename?: 'TechnologyNode', id: any, code: string, name: string, description?: string | null } }> };

export type GetSolutionsQueryVariables = Exact<{
  where: Solution_Bool_Exp;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type GetSolutionsQuery = { __typename?: 'query_root', Solution: Array<{ __typename?: 'Solution', id: any, code: string, name: string, description?: string | null, context: string, decision: string, consequences: string, alternatives: string, decisionStatus: any, implementationStatus: any, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null }>, SolutionAggregate: { __typename?: 'Solution_aggregate', aggregate?: { __typename?: 'Solution_aggregate_fields', count: number } | null } };

export type GetSystemSoftwareByPkQueryVariables = Exact<{
  where: SystemSoftware_Bool_Exp;
}>;


export type GetSystemSoftwareByPkQuery = { __typename?: 'query_root', SystemSoftware: Array<{ __typename?: 'SystemSoftware', id: any, code: string, name: string, description?: string | null, version?: string | null, kind: any, radarArea: any, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null, type?: { __typename?: 'DirectoryObject', id: any, name: string } | null, licenseType?: { __typename?: 'DirectoryObject', id: any, name: string } | null }> };

export type GetSystemSoftwareFullQueryVariables = Exact<{
  where: SystemSoftware_Bool_Exp;
  systemSoftwareId: Scalars['uuid']['input'];
}>;


export type GetSystemSoftwareFullQuery = { __typename?: 'query_root', software: Array<{ __typename?: 'SystemSoftware', id: any, code: string, name: string, description?: string | null, version?: string | null, kind: any, radarArea: any, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null, type?: { __typename?: 'DirectoryObject', id: any, name: string } | null, licenseType?: { __typename?: 'DirectoryObject', id: any, name: string } | null }>, componentMaps: Array<{ __typename?: 'ApplicationComponentSystemSoftwareMap', kind: any, component: { __typename?: 'ApplicationComponent', id: any, code: string, name: string, description?: string | null } }>, nodeMaps: Array<{ __typename?: 'TechnologyNodeSystemSoftwareMap', node: { __typename?: 'TechnologyNode', id: any, code: string, name: string, description?: string | null } }> };

export type GetSystemSoftwareQueryVariables = Exact<{
  where: SystemSoftware_Bool_Exp;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type GetSystemSoftwareQuery = { __typename?: 'query_root', SystemSoftware: Array<{ __typename?: 'SystemSoftware', id: any, code: string, name: string, description?: string | null, version?: string | null, kind: any, radarArea: any, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null, type?: { __typename?: 'DirectoryObject', id: any, name: string } | null, licenseType?: { __typename?: 'DirectoryObject', id: any, name: string } | null }>, SystemSoftwareAggregate: { __typename?: 'SystemSoftware_aggregate', aggregate?: { __typename?: 'SystemSoftware_aggregate_fields', count: number } | null } };

export type GetSystemSoftwareListQueryVariables = Exact<{
  where: SystemSoftware_Bool_Exp;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type GetSystemSoftwareListQuery = { __typename?: 'query_root', SystemSoftware: Array<{ __typename?: 'SystemSoftware', id: any, code: string, name: string }>, SystemSoftwareAggregate: { __typename?: 'SystemSoftware_aggregate', aggregate?: { __typename?: 'SystemSoftware_aggregate_fields', count: number } | null } };
