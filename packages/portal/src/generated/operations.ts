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

/** columns and relationships of "actors" */
export type Actors = {
  __typename?: 'actors';
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  /** An array relationship */
  mapRoles: Array<Map_Business_Actor_Role>;
  /** An aggregate relationship */
  mapRoles_aggregate: Map_Business_Actor_Role_Aggregate;
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "actors" */
export type ActorsMapRolesArgs = {
  distinct_on?: InputMaybe<Array<Map_Business_Actor_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Business_Actor_Role_Order_By>>;
  where?: InputMaybe<Map_Business_Actor_Role_Bool_Exp>;
};


/** columns and relationships of "actors" */
export type ActorsMapRoles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Business_Actor_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Business_Actor_Role_Order_By>>;
  where?: InputMaybe<Map_Business_Actor_Role_Bool_Exp>;
};

/** aggregated selection of "actors" */
export type Actors_Aggregate = {
  __typename?: 'actors_aggregate';
  aggregate?: Maybe<Actors_Aggregate_Fields>;
  nodes: Array<Actors>;
};

/** aggregate fields of "actors" */
export type Actors_Aggregate_Fields = {
  __typename?: 'actors_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Actors_Max_Fields>;
  min?: Maybe<Actors_Min_Fields>;
};


/** aggregate fields of "actors" */
export type Actors_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Actors_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "actors". All fields are combined with a logical 'AND'. */
export type Actors_Bool_Exp = {
  _and?: InputMaybe<Array<Actors_Bool_Exp>>;
  _not?: InputMaybe<Actors_Bool_Exp>;
  _or?: InputMaybe<Array<Actors_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  mapRoles?: InputMaybe<Map_Business_Actor_Role_Bool_Exp>;
  mapRoles_aggregate?: InputMaybe<Map_Business_Actor_Role_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "actors" */
export enum Actors_Constraint {
  /** unique or primary key constraint on columns "code" */
  ActorsCodeUnique = 'actors_code_unique',
  /** unique or primary key constraint on columns "id" */
  ActorsPkey = 'actors_pkey'
}

/** input type for inserting data into table "actors" */
export type Actors_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  mapRoles?: InputMaybe<Map_Business_Actor_Role_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Actors_Max_Fields = {
  __typename?: 'actors_max_fields';
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
export type Actors_Min_Fields = {
  __typename?: 'actors_min_fields';
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
export type Actors_Mutation_Response = {
  __typename?: 'actors_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Actors>;
};

/** input type for inserting object relation for remote table "actors" */
export type Actors_Obj_Rel_Insert_Input = {
  data: Actors_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Actors_On_Conflict>;
};

/** on_conflict condition type for table "actors" */
export type Actors_On_Conflict = {
  constraint: Actors_Constraint;
  update_columns?: Array<Actors_Update_Column>;
  where?: InputMaybe<Actors_Bool_Exp>;
};

/** Ordering options when selecting data from "actors". */
export type Actors_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mapRoles_aggregate?: InputMaybe<Map_Business_Actor_Role_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: actors */
export type Actors_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "actors" */
export enum Actors_Select_Column {
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
export type Actors_Set_Input = {
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

/** Streaming cursor of the table "actors" */
export type Actors_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Actors_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Actors_Stream_Cursor_Value_Input = {
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
export enum Actors_Update_Column {
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

export type Actors_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Actors_Set_Input>;
  /** filter the rows which have to be updated */
  where: Actors_Bool_Exp;
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

/** columns and relationships of "capabilities" */
export type Capabilities = {
  __typename?: 'capabilities';
  /** An array relationship */
  capabilities: Array<Capabilities>;
  /** An aggregate relationship */
  capabilities_aggregate: Capabilities_Aggregate;
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  /** An object relationship */
  parent?: Maybe<Capabilities>;
  parentId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "capabilities" */
export type CapabilitiesCapabilitiesArgs = {
  distinct_on?: InputMaybe<Array<Capabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Capabilities_Order_By>>;
  where?: InputMaybe<Capabilities_Bool_Exp>;
};


/** columns and relationships of "capabilities" */
export type CapabilitiesCapabilities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Capabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Capabilities_Order_By>>;
  where?: InputMaybe<Capabilities_Bool_Exp>;
};

/** aggregated selection of "capabilities" */
export type Capabilities_Aggregate = {
  __typename?: 'capabilities_aggregate';
  aggregate?: Maybe<Capabilities_Aggregate_Fields>;
  nodes: Array<Capabilities>;
};

export type Capabilities_Aggregate_Bool_Exp = {
  count?: InputMaybe<Capabilities_Aggregate_Bool_Exp_Count>;
};

export type Capabilities_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Capabilities_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Capabilities_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "capabilities" */
export type Capabilities_Aggregate_Fields = {
  __typename?: 'capabilities_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Capabilities_Max_Fields>;
  min?: Maybe<Capabilities_Min_Fields>;
};


/** aggregate fields of "capabilities" */
export type Capabilities_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Capabilities_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "capabilities" */
export type Capabilities_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Capabilities_Max_Order_By>;
  min?: InputMaybe<Capabilities_Min_Order_By>;
};

/** input type for inserting array relation for remote table "capabilities" */
export type Capabilities_Arr_Rel_Insert_Input = {
  data: Array<Capabilities_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Capabilities_On_Conflict>;
};

/** Boolean expression to filter rows from the table "capabilities". All fields are combined with a logical 'AND'. */
export type Capabilities_Bool_Exp = {
  _and?: InputMaybe<Array<Capabilities_Bool_Exp>>;
  _not?: InputMaybe<Capabilities_Bool_Exp>;
  _or?: InputMaybe<Array<Capabilities_Bool_Exp>>;
  capabilities?: InputMaybe<Capabilities_Bool_Exp>;
  capabilities_aggregate?: InputMaybe<Capabilities_Aggregate_Bool_Exp>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  parent?: InputMaybe<Capabilities_Bool_Exp>;
  parentId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "capabilities" */
export enum Capabilities_Constraint {
  /** unique or primary key constraint on columns "code" */
  CapabilitiesCodeUnique = 'capabilities_code_unique',
  /** unique or primary key constraint on columns "id" */
  CapabilitiesPkey = 'capabilities_pkey'
}

/** input type for inserting data into table "capabilities" */
export type Capabilities_Insert_Input = {
  capabilities?: InputMaybe<Capabilities_Arr_Rel_Insert_Input>;
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Capabilities_Obj_Rel_Insert_Input>;
  parentId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Capabilities_Max_Fields = {
  __typename?: 'capabilities_max_fields';
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

/** order by max() on columns of table "capabilities" */
export type Capabilities_Max_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  parentId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Capabilities_Min_Fields = {
  __typename?: 'capabilities_min_fields';
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

/** order by min() on columns of table "capabilities" */
export type Capabilities_Min_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  parentId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "capabilities" */
export type Capabilities_Mutation_Response = {
  __typename?: 'capabilities_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Capabilities>;
};

/** input type for inserting object relation for remote table "capabilities" */
export type Capabilities_Obj_Rel_Insert_Input = {
  data: Capabilities_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Capabilities_On_Conflict>;
};

/** on_conflict condition type for table "capabilities" */
export type Capabilities_On_Conflict = {
  constraint: Capabilities_Constraint;
  update_columns?: Array<Capabilities_Update_Column>;
  where?: InputMaybe<Capabilities_Bool_Exp>;
};

/** Ordering options when selecting data from "capabilities". */
export type Capabilities_Order_By = {
  capabilities_aggregate?: InputMaybe<Capabilities_Aggregate_Order_By>;
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  parent?: InputMaybe<Capabilities_Order_By>;
  parentId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: capabilities */
export type Capabilities_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "capabilities" */
export enum Capabilities_Select_Column {
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
export type Capabilities_Set_Input = {
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

/** Streaming cursor of the table "capabilities" */
export type Capabilities_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Capabilities_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Capabilities_Stream_Cursor_Value_Input = {
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
export enum Capabilities_Update_Column {
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

export type Capabilities_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Capabilities_Set_Input>;
  /** filter the rows which have to be updated */
  where: Capabilities_Bool_Exp;
};

/** columns and relationships of "components" */
export type Components = {
  __typename?: 'components';
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  criticalLevel?: Maybe<Directories>;
  criticalLevelId?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  failoverType?: Maybe<Directories>;
  failoverTypeId?: Maybe<Scalars['uuid']['output']>;
  id: Scalars['uuid']['output'];
  /** An object relationship */
  licenseType?: Maybe<Directories>;
  licenseTypeId?: Maybe<Scalars['uuid']['output']>;
  /** An array relationship */
  mapApplicationComponentHierarchies: Array<Map_Application_Component_Hierarchy>;
  /** An array relationship */
  mapApplicationComponentHierarchies2: Array<Map_Application_Component_Hierarchy>;
  /** An aggregate relationship */
  mapApplicationComponentHierarchies2_aggregate: Map_Application_Component_Hierarchy_Aggregate;
  /** An aggregate relationship */
  mapApplicationComponentHierarchies_aggregate: Map_Application_Component_Hierarchy_Aggregate;
  /** An array relationship */
  mapDataObjects: Array<Map_Application_Component_Data_Object>;
  /** An array relationship */
  mapDataObjects2: Array<Map_Application_Function_Data_Object>;
  /** An aggregate relationship */
  mapDataObjects2_aggregate: Map_Application_Function_Data_Object_Aggregate;
  /** An aggregate relationship */
  mapDataObjects_aggregate: Map_Application_Component_Data_Object_Aggregate;
  /** An array relationship */
  mapDirectories: Array<Map_Application_Component_Stakeholder>;
  /** An aggregate relationship */
  mapDirectories_aggregate: Map_Application_Component_Stakeholder_Aggregate;
  /** An array relationship */
  mapEvents: Array<Map_Application_Component_Event>;
  /** An aggregate relationship */
  mapEvents_aggregate: Map_Application_Component_Event_Aggregate;
  /** An array relationship */
  mapFunctions: Array<Map_Application_Component_Function>;
  /** An aggregate relationship */
  mapFunctions_aggregate: Map_Application_Component_Function_Aggregate;
  /** An array relationship */
  mapInterfaces: Array<Map_Application_Component_Interface>;
  /** An aggregate relationship */
  mapInterfaces_aggregate: Map_Application_Component_Interface_Aggregate;
  /** An array relationship */
  mapProducts: Array<Map_Application_Component_Product>;
  /** An aggregate relationship */
  mapProducts_aggregate: Map_Application_Component_Product_Aggregate;
  /** An array relationship */
  mapSolutions: Array<Map_Solution_Application_Component>;
  /** An aggregate relationship */
  mapSolutions_aggregate: Map_Solution_Application_Component_Aggregate;
  /** An array relationship */
  mapSystemSoftwares: Array<Map_Application_Component_System_Software>;
  /** An aggregate relationship */
  mapSystemSoftwares_aggregate: Map_Application_Component_System_Software_Aggregate;
  /** An array relationship */
  mapTechnologyNetworks: Array<Map_Application_Component_Technology_Logical_Network>;
  /** An aggregate relationship */
  mapTechnologyNetworks_aggregate: Map_Application_Component_Technology_Logical_Network_Aggregate;
  /** An array relationship */
  mapTechnologyNodes: Array<Map_Application_Component_Technology_Node>;
  /** An aggregate relationship */
  mapTechnologyNodes_aggregate: Map_Application_Component_Technology_Node_Aggregate;
  /** An object relationship */
  monitoringLevel?: Maybe<Directories>;
  monitoringLevelId?: Maybe<Scalars['uuid']['output']>;
  name: Scalars['String']['output'];
  /** An object relationship */
  recoveryTime?: Maybe<Directories>;
  recoveryTimeId?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  redundancyType?: Maybe<Directories>;
  redundancyTypeId?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  scalingType?: Maybe<Directories>;
  scalingTypeId?: Maybe<Scalars['uuid']['output']>;
  /** An array relationship */
  sourceFlows: Array<Flows>;
  /** An aggregate relationship */
  sourceFlows_aggregate: Flows_Aggregate;
  /** An object relationship */
  state?: Maybe<Directories>;
  stateId?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  style?: Maybe<Directories>;
  styleId?: Maybe<Scalars['uuid']['output']>;
  /** An array relationship */
  targetFlows: Array<Flows>;
  /** An aggregate relationship */
  targetFlows_aggregate: Flows_Aggregate;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "components" */
export type ComponentsMapApplicationComponentHierarchiesArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Hierarchy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Hierarchy_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Hierarchy_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsMapApplicationComponentHierarchies2Args = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Hierarchy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Hierarchy_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Hierarchy_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsMapApplicationComponentHierarchies2_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Hierarchy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Hierarchy_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Hierarchy_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsMapApplicationComponentHierarchies_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Hierarchy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Hierarchy_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Hierarchy_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsMapDataObjectsArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Data_Object_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Data_Object_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Data_Object_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsMapDataObjects2Args = {
  distinct_on?: InputMaybe<Array<Map_Application_Function_Data_Object_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Function_Data_Object_Order_By>>;
  where?: InputMaybe<Map_Application_Function_Data_Object_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsMapDataObjects2_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Function_Data_Object_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Function_Data_Object_Order_By>>;
  where?: InputMaybe<Map_Application_Function_Data_Object_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsMapDataObjects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Data_Object_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Data_Object_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Data_Object_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsMapDirectoriesArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Stakeholder_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Stakeholder_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Stakeholder_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsMapDirectories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Stakeholder_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Stakeholder_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Stakeholder_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsMapEventsArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Event_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Event_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsMapEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Event_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Event_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsMapFunctionsArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Function_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Function_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Function_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsMapFunctions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Function_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Function_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Function_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsMapInterfacesArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Interface_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Interface_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Interface_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsMapInterfaces_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Interface_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Interface_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Interface_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsMapProductsArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Product_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Product_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsMapProducts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Product_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Product_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsMapSolutionsArgs = {
  distinct_on?: InputMaybe<Array<Map_Solution_Application_Component_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Solution_Application_Component_Order_By>>;
  where?: InputMaybe<Map_Solution_Application_Component_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsMapSolutions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Solution_Application_Component_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Solution_Application_Component_Order_By>>;
  where?: InputMaybe<Map_Solution_Application_Component_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsMapSystemSoftwaresArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_System_Software_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_System_Software_Order_By>>;
  where?: InputMaybe<Map_Application_Component_System_Software_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsMapSystemSoftwares_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_System_Software_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_System_Software_Order_By>>;
  where?: InputMaybe<Map_Application_Component_System_Software_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsMapTechnologyNetworksArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Technology_Logical_Network_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Technology_Logical_Network_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Technology_Logical_Network_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsMapTechnologyNetworks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Technology_Logical_Network_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Technology_Logical_Network_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Technology_Logical_Network_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsMapTechnologyNodesArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Technology_Node_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Technology_Node_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Technology_Node_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsMapTechnologyNodes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Technology_Node_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Technology_Node_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Technology_Node_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsSourceFlowsArgs = {
  distinct_on?: InputMaybe<Array<Flows_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Flows_Order_By>>;
  where?: InputMaybe<Flows_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsSourceFlows_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Flows_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Flows_Order_By>>;
  where?: InputMaybe<Flows_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsTargetFlowsArgs = {
  distinct_on?: InputMaybe<Array<Flows_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Flows_Order_By>>;
  where?: InputMaybe<Flows_Bool_Exp>;
};


/** columns and relationships of "components" */
export type ComponentsTargetFlows_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Flows_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Flows_Order_By>>;
  where?: InputMaybe<Flows_Bool_Exp>;
};

/** aggregated selection of "components" */
export type Components_Aggregate = {
  __typename?: 'components_aggregate';
  aggregate?: Maybe<Components_Aggregate_Fields>;
  nodes: Array<Components>;
};

/** aggregate fields of "components" */
export type Components_Aggregate_Fields = {
  __typename?: 'components_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Components_Max_Fields>;
  min?: Maybe<Components_Min_Fields>;
};


/** aggregate fields of "components" */
export type Components_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Components_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "components". All fields are combined with a logical 'AND'. */
export type Components_Bool_Exp = {
  _and?: InputMaybe<Array<Components_Bool_Exp>>;
  _not?: InputMaybe<Components_Bool_Exp>;
  _or?: InputMaybe<Array<Components_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  criticalLevel?: InputMaybe<Directories_Bool_Exp>;
  criticalLevelId?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  failoverType?: InputMaybe<Directories_Bool_Exp>;
  failoverTypeId?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  licenseType?: InputMaybe<Directories_Bool_Exp>;
  licenseTypeId?: InputMaybe<Uuid_Comparison_Exp>;
  mapApplicationComponentHierarchies?: InputMaybe<Map_Application_Component_Hierarchy_Bool_Exp>;
  mapApplicationComponentHierarchies2?: InputMaybe<Map_Application_Component_Hierarchy_Bool_Exp>;
  mapApplicationComponentHierarchies2_aggregate?: InputMaybe<Map_Application_Component_Hierarchy_Aggregate_Bool_Exp>;
  mapApplicationComponentHierarchies_aggregate?: InputMaybe<Map_Application_Component_Hierarchy_Aggregate_Bool_Exp>;
  mapDataObjects?: InputMaybe<Map_Application_Component_Data_Object_Bool_Exp>;
  mapDataObjects2?: InputMaybe<Map_Application_Function_Data_Object_Bool_Exp>;
  mapDataObjects2_aggregate?: InputMaybe<Map_Application_Function_Data_Object_Aggregate_Bool_Exp>;
  mapDataObjects_aggregate?: InputMaybe<Map_Application_Component_Data_Object_Aggregate_Bool_Exp>;
  mapDirectories?: InputMaybe<Map_Application_Component_Stakeholder_Bool_Exp>;
  mapDirectories_aggregate?: InputMaybe<Map_Application_Component_Stakeholder_Aggregate_Bool_Exp>;
  mapEvents?: InputMaybe<Map_Application_Component_Event_Bool_Exp>;
  mapEvents_aggregate?: InputMaybe<Map_Application_Component_Event_Aggregate_Bool_Exp>;
  mapFunctions?: InputMaybe<Map_Application_Component_Function_Bool_Exp>;
  mapFunctions_aggregate?: InputMaybe<Map_Application_Component_Function_Aggregate_Bool_Exp>;
  mapInterfaces?: InputMaybe<Map_Application_Component_Interface_Bool_Exp>;
  mapInterfaces_aggregate?: InputMaybe<Map_Application_Component_Interface_Aggregate_Bool_Exp>;
  mapProducts?: InputMaybe<Map_Application_Component_Product_Bool_Exp>;
  mapProducts_aggregate?: InputMaybe<Map_Application_Component_Product_Aggregate_Bool_Exp>;
  mapSolutions?: InputMaybe<Map_Solution_Application_Component_Bool_Exp>;
  mapSolutions_aggregate?: InputMaybe<Map_Solution_Application_Component_Aggregate_Bool_Exp>;
  mapSystemSoftwares?: InputMaybe<Map_Application_Component_System_Software_Bool_Exp>;
  mapSystemSoftwares_aggregate?: InputMaybe<Map_Application_Component_System_Software_Aggregate_Bool_Exp>;
  mapTechnologyNetworks?: InputMaybe<Map_Application_Component_Technology_Logical_Network_Bool_Exp>;
  mapTechnologyNetworks_aggregate?: InputMaybe<Map_Application_Component_Technology_Logical_Network_Aggregate_Bool_Exp>;
  mapTechnologyNodes?: InputMaybe<Map_Application_Component_Technology_Node_Bool_Exp>;
  mapTechnologyNodes_aggregate?: InputMaybe<Map_Application_Component_Technology_Node_Aggregate_Bool_Exp>;
  monitoringLevel?: InputMaybe<Directories_Bool_Exp>;
  monitoringLevelId?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  recoveryTime?: InputMaybe<Directories_Bool_Exp>;
  recoveryTimeId?: InputMaybe<Uuid_Comparison_Exp>;
  redundancyType?: InputMaybe<Directories_Bool_Exp>;
  redundancyTypeId?: InputMaybe<Uuid_Comparison_Exp>;
  scalingType?: InputMaybe<Directories_Bool_Exp>;
  scalingTypeId?: InputMaybe<Uuid_Comparison_Exp>;
  sourceFlows?: InputMaybe<Flows_Bool_Exp>;
  sourceFlows_aggregate?: InputMaybe<Flows_Aggregate_Bool_Exp>;
  state?: InputMaybe<Directories_Bool_Exp>;
  stateId?: InputMaybe<Uuid_Comparison_Exp>;
  style?: InputMaybe<Directories_Bool_Exp>;
  styleId?: InputMaybe<Uuid_Comparison_Exp>;
  targetFlows?: InputMaybe<Flows_Bool_Exp>;
  targetFlows_aggregate?: InputMaybe<Flows_Aggregate_Bool_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "components" */
export enum Components_Constraint {
  /** unique or primary key constraint on columns "code" */
  ComponentsCodeUnique = 'components_code_unique',
  /** unique or primary key constraint on columns "id" */
  ComponentsPkey = 'components_pkey'
}

/** input type for inserting data into table "components" */
export type Components_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  criticalLevel?: InputMaybe<Directories_Obj_Rel_Insert_Input>;
  criticalLevelId?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  failoverType?: InputMaybe<Directories_Obj_Rel_Insert_Input>;
  failoverTypeId?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  licenseType?: InputMaybe<Directories_Obj_Rel_Insert_Input>;
  licenseTypeId?: InputMaybe<Scalars['uuid']['input']>;
  mapApplicationComponentHierarchies?: InputMaybe<Map_Application_Component_Hierarchy_Arr_Rel_Insert_Input>;
  mapApplicationComponentHierarchies2?: InputMaybe<Map_Application_Component_Hierarchy_Arr_Rel_Insert_Input>;
  mapDataObjects?: InputMaybe<Map_Application_Component_Data_Object_Arr_Rel_Insert_Input>;
  mapDataObjects2?: InputMaybe<Map_Application_Function_Data_Object_Arr_Rel_Insert_Input>;
  mapDirectories?: InputMaybe<Map_Application_Component_Stakeholder_Arr_Rel_Insert_Input>;
  mapEvents?: InputMaybe<Map_Application_Component_Event_Arr_Rel_Insert_Input>;
  mapFunctions?: InputMaybe<Map_Application_Component_Function_Arr_Rel_Insert_Input>;
  mapInterfaces?: InputMaybe<Map_Application_Component_Interface_Arr_Rel_Insert_Input>;
  mapProducts?: InputMaybe<Map_Application_Component_Product_Arr_Rel_Insert_Input>;
  mapSolutions?: InputMaybe<Map_Solution_Application_Component_Arr_Rel_Insert_Input>;
  mapSystemSoftwares?: InputMaybe<Map_Application_Component_System_Software_Arr_Rel_Insert_Input>;
  mapTechnologyNetworks?: InputMaybe<Map_Application_Component_Technology_Logical_Network_Arr_Rel_Insert_Input>;
  mapTechnologyNodes?: InputMaybe<Map_Application_Component_Technology_Node_Arr_Rel_Insert_Input>;
  monitoringLevel?: InputMaybe<Directories_Obj_Rel_Insert_Input>;
  monitoringLevelId?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  recoveryTime?: InputMaybe<Directories_Obj_Rel_Insert_Input>;
  recoveryTimeId?: InputMaybe<Scalars['uuid']['input']>;
  redundancyType?: InputMaybe<Directories_Obj_Rel_Insert_Input>;
  redundancyTypeId?: InputMaybe<Scalars['uuid']['input']>;
  scalingType?: InputMaybe<Directories_Obj_Rel_Insert_Input>;
  scalingTypeId?: InputMaybe<Scalars['uuid']['input']>;
  sourceFlows?: InputMaybe<Flows_Arr_Rel_Insert_Input>;
  state?: InputMaybe<Directories_Obj_Rel_Insert_Input>;
  stateId?: InputMaybe<Scalars['uuid']['input']>;
  style?: InputMaybe<Directories_Obj_Rel_Insert_Input>;
  styleId?: InputMaybe<Scalars['uuid']['input']>;
  targetFlows?: InputMaybe<Flows_Arr_Rel_Insert_Input>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Components_Max_Fields = {
  __typename?: 'components_max_fields';
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

/** aggregate min on columns */
export type Components_Min_Fields = {
  __typename?: 'components_min_fields';
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

/** response of any mutation on the table "components" */
export type Components_Mutation_Response = {
  __typename?: 'components_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Components>;
};

/** input type for inserting object relation for remote table "components" */
export type Components_Obj_Rel_Insert_Input = {
  data: Components_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Components_On_Conflict>;
};

/** on_conflict condition type for table "components" */
export type Components_On_Conflict = {
  constraint: Components_Constraint;
  update_columns?: Array<Components_Update_Column>;
  where?: InputMaybe<Components_Bool_Exp>;
};

/** Ordering options when selecting data from "components". */
export type Components_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  criticalLevel?: InputMaybe<Directories_Order_By>;
  criticalLevelId?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  failoverType?: InputMaybe<Directories_Order_By>;
  failoverTypeId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  licenseType?: InputMaybe<Directories_Order_By>;
  licenseTypeId?: InputMaybe<Order_By>;
  mapApplicationComponentHierarchies2_aggregate?: InputMaybe<Map_Application_Component_Hierarchy_Aggregate_Order_By>;
  mapApplicationComponentHierarchies_aggregate?: InputMaybe<Map_Application_Component_Hierarchy_Aggregate_Order_By>;
  mapDataObjects2_aggregate?: InputMaybe<Map_Application_Function_Data_Object_Aggregate_Order_By>;
  mapDataObjects_aggregate?: InputMaybe<Map_Application_Component_Data_Object_Aggregate_Order_By>;
  mapDirectories_aggregate?: InputMaybe<Map_Application_Component_Stakeholder_Aggregate_Order_By>;
  mapEvents_aggregate?: InputMaybe<Map_Application_Component_Event_Aggregate_Order_By>;
  mapFunctions_aggregate?: InputMaybe<Map_Application_Component_Function_Aggregate_Order_By>;
  mapInterfaces_aggregate?: InputMaybe<Map_Application_Component_Interface_Aggregate_Order_By>;
  mapProducts_aggregate?: InputMaybe<Map_Application_Component_Product_Aggregate_Order_By>;
  mapSolutions_aggregate?: InputMaybe<Map_Solution_Application_Component_Aggregate_Order_By>;
  mapSystemSoftwares_aggregate?: InputMaybe<Map_Application_Component_System_Software_Aggregate_Order_By>;
  mapTechnologyNetworks_aggregate?: InputMaybe<Map_Application_Component_Technology_Logical_Network_Aggregate_Order_By>;
  mapTechnologyNodes_aggregate?: InputMaybe<Map_Application_Component_Technology_Node_Aggregate_Order_By>;
  monitoringLevel?: InputMaybe<Directories_Order_By>;
  monitoringLevelId?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  recoveryTime?: InputMaybe<Directories_Order_By>;
  recoveryTimeId?: InputMaybe<Order_By>;
  redundancyType?: InputMaybe<Directories_Order_By>;
  redundancyTypeId?: InputMaybe<Order_By>;
  scalingType?: InputMaybe<Directories_Order_By>;
  scalingTypeId?: InputMaybe<Order_By>;
  sourceFlows_aggregate?: InputMaybe<Flows_Aggregate_Order_By>;
  state?: InputMaybe<Directories_Order_By>;
  stateId?: InputMaybe<Order_By>;
  style?: InputMaybe<Directories_Order_By>;
  styleId?: InputMaybe<Order_By>;
  targetFlows_aggregate?: InputMaybe<Flows_Aggregate_Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: components */
export type Components_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "components" */
export enum Components_Select_Column {
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
export type Components_Set_Input = {
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

/** Streaming cursor of the table "components" */
export type Components_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Components_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Components_Stream_Cursor_Value_Input = {
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
export enum Components_Update_Column {
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

export type Components_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Components_Set_Input>;
  /** filter the rows which have to be updated */
  where: Components_Bool_Exp;
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

/** columns and relationships of "data_objects" */
export type Data_Objects = {
  __typename?: 'data_objects';
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  /** An array relationship */
  mapComponents: Array<Map_Application_Component_Data_Object>;
  /** An array relationship */
  mapComponents2: Array<Map_Application_Function_Data_Object>;
  /** An aggregate relationship */
  mapComponents2_aggregate: Map_Application_Function_Data_Object_Aggregate;
  /** An aggregate relationship */
  mapComponents_aggregate: Map_Application_Component_Data_Object_Aggregate;
  name: Scalars['String']['output'];
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "data_objects" */
export type Data_ObjectsMapComponentsArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Data_Object_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Data_Object_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Data_Object_Bool_Exp>;
};


/** columns and relationships of "data_objects" */
export type Data_ObjectsMapComponents2Args = {
  distinct_on?: InputMaybe<Array<Map_Application_Function_Data_Object_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Function_Data_Object_Order_By>>;
  where?: InputMaybe<Map_Application_Function_Data_Object_Bool_Exp>;
};


/** columns and relationships of "data_objects" */
export type Data_ObjectsMapComponents2_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Function_Data_Object_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Function_Data_Object_Order_By>>;
  where?: InputMaybe<Map_Application_Function_Data_Object_Bool_Exp>;
};


/** columns and relationships of "data_objects" */
export type Data_ObjectsMapComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Data_Object_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Data_Object_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Data_Object_Bool_Exp>;
};

/** aggregated selection of "data_objects" */
export type Data_Objects_Aggregate = {
  __typename?: 'data_objects_aggregate';
  aggregate?: Maybe<Data_Objects_Aggregate_Fields>;
  nodes: Array<Data_Objects>;
};

/** aggregate fields of "data_objects" */
export type Data_Objects_Aggregate_Fields = {
  __typename?: 'data_objects_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Data_Objects_Max_Fields>;
  min?: Maybe<Data_Objects_Min_Fields>;
};


/** aggregate fields of "data_objects" */
export type Data_Objects_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Data_Objects_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "data_objects". All fields are combined with a logical 'AND'. */
export type Data_Objects_Bool_Exp = {
  _and?: InputMaybe<Array<Data_Objects_Bool_Exp>>;
  _not?: InputMaybe<Data_Objects_Bool_Exp>;
  _or?: InputMaybe<Array<Data_Objects_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  mapComponents?: InputMaybe<Map_Application_Component_Data_Object_Bool_Exp>;
  mapComponents2?: InputMaybe<Map_Application_Function_Data_Object_Bool_Exp>;
  mapComponents2_aggregate?: InputMaybe<Map_Application_Function_Data_Object_Aggregate_Bool_Exp>;
  mapComponents_aggregate?: InputMaybe<Map_Application_Component_Data_Object_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  ownerId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "data_objects" */
export enum Data_Objects_Constraint {
  /** unique or primary key constraint on columns "code" */
  DataObjectsCodeUnique = 'data_objects_code_unique',
  /** unique or primary key constraint on columns "id" */
  DataObjectsPkey = 'data_objects_pkey'
}

/** input type for inserting data into table "data_objects" */
export type Data_Objects_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  mapComponents?: InputMaybe<Map_Application_Component_Data_Object_Arr_Rel_Insert_Input>;
  mapComponents2?: InputMaybe<Map_Application_Function_Data_Object_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Data_Objects_Max_Fields = {
  __typename?: 'data_objects_max_fields';
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
export type Data_Objects_Min_Fields = {
  __typename?: 'data_objects_min_fields';
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
export type Data_Objects_Mutation_Response = {
  __typename?: 'data_objects_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Data_Objects>;
};

/** input type for inserting object relation for remote table "data_objects" */
export type Data_Objects_Obj_Rel_Insert_Input = {
  data: Data_Objects_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Data_Objects_On_Conflict>;
};

/** on_conflict condition type for table "data_objects" */
export type Data_Objects_On_Conflict = {
  constraint: Data_Objects_Constraint;
  update_columns?: Array<Data_Objects_Update_Column>;
  where?: InputMaybe<Data_Objects_Bool_Exp>;
};

/** Ordering options when selecting data from "data_objects". */
export type Data_Objects_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mapComponents2_aggregate?: InputMaybe<Map_Application_Function_Data_Object_Aggregate_Order_By>;
  mapComponents_aggregate?: InputMaybe<Map_Application_Component_Data_Object_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  ownerId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: data_objects */
export type Data_Objects_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "data_objects" */
export enum Data_Objects_Select_Column {
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
export type Data_Objects_Set_Input = {
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

/** Streaming cursor of the table "data_objects" */
export type Data_Objects_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Data_Objects_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Data_Objects_Stream_Cursor_Value_Input = {
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
export enum Data_Objects_Update_Column {
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

export type Data_Objects_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Data_Objects_Set_Input>;
  /** filter the rows which have to be updated */
  where: Data_Objects_Bool_Exp;
};

/** columns and relationships of "directories" */
export type Directories = {
  __typename?: 'directories';
  byDefault: Scalars['Boolean']['output'];
  code: Scalars['String']['output'];
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  kind: Scalars['directory_kind_enum']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "directories" */
export type Directories_Aggregate = {
  __typename?: 'directories_aggregate';
  aggregate?: Maybe<Directories_Aggregate_Fields>;
  nodes: Array<Directories>;
};

/** aggregate fields of "directories" */
export type Directories_Aggregate_Fields = {
  __typename?: 'directories_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Directories_Max_Fields>;
  min?: Maybe<Directories_Min_Fields>;
};


/** aggregate fields of "directories" */
export type Directories_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Directories_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "directories". All fields are combined with a logical 'AND'. */
export type Directories_Bool_Exp = {
  _and?: InputMaybe<Array<Directories_Bool_Exp>>;
  _not?: InputMaybe<Directories_Bool_Exp>;
  _or?: InputMaybe<Array<Directories_Bool_Exp>>;
  byDefault?: InputMaybe<Boolean_Comparison_Exp>;
  code?: InputMaybe<String_Comparison_Exp>;
  color?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  kind?: InputMaybe<Directory_Kind_Enum_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "directories" */
export enum Directories_Constraint {
  /** unique or primary key constraint on columns "code" */
  DirectoriesCodeUnique = 'directories_code_unique',
  /** unique or primary key constraint on columns "id" */
  DirectoriesPkey = 'directories_pkey'
}

/** input type for inserting data into table "directories" */
export type Directories_Insert_Input = {
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

/** aggregate max on columns */
export type Directories_Max_Fields = {
  __typename?: 'directories_max_fields';
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
export type Directories_Min_Fields = {
  __typename?: 'directories_min_fields';
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
export type Directories_Mutation_Response = {
  __typename?: 'directories_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Directories>;
};

/** input type for inserting object relation for remote table "directories" */
export type Directories_Obj_Rel_Insert_Input = {
  data: Directories_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Directories_On_Conflict>;
};

/** on_conflict condition type for table "directories" */
export type Directories_On_Conflict = {
  constraint: Directories_Constraint;
  update_columns?: Array<Directories_Update_Column>;
  where?: InputMaybe<Directories_Bool_Exp>;
};

/** Ordering options when selecting data from "directories". */
export type Directories_Order_By = {
  byDefault?: InputMaybe<Order_By>;
  code?: InputMaybe<Order_By>;
  color?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: directories */
export type Directories_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "directories" */
export enum Directories_Select_Column {
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
export type Directories_Set_Input = {
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

/** Streaming cursor of the table "directories" */
export type Directories_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Directories_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Directories_Stream_Cursor_Value_Input = {
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
export enum Directories_Update_Column {
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

export type Directories_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Directories_Set_Input>;
  /** filter the rows which have to be updated */
  where: Directories_Bool_Exp;
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

/** columns and relationships of "employees" */
export type Employees = {
  __typename?: 'employees';
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
export type Employees_Aggregate = {
  __typename?: 'employees_aggregate';
  aggregate?: Maybe<Employees_Aggregate_Fields>;
  nodes: Array<Employees>;
};

/** aggregate fields of "employees" */
export type Employees_Aggregate_Fields = {
  __typename?: 'employees_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Employees_Max_Fields>;
  min?: Maybe<Employees_Min_Fields>;
};


/** aggregate fields of "employees" */
export type Employees_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Employees_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "employees". All fields are combined with a logical 'AND'. */
export type Employees_Bool_Exp = {
  _and?: InputMaybe<Array<Employees_Bool_Exp>>;
  _not?: InputMaybe<Employees_Bool_Exp>;
  _or?: InputMaybe<Array<Employees_Bool_Exp>>;
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
export enum Employees_Constraint {
  /** unique or primary key constraint on columns "id" */
  EmployeesPkey = 'employees_pkey',
  /** unique or primary key constraint on columns "user_id" */
  EmployeesUserIdUnique = 'employees_user_id_unique'
}

/** input type for inserting data into table "employees" */
export type Employees_Insert_Input = {
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
export type Employees_Max_Fields = {
  __typename?: 'employees_max_fields';
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
export type Employees_Min_Fields = {
  __typename?: 'employees_min_fields';
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
export type Employees_Mutation_Response = {
  __typename?: 'employees_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Employees>;
};

/** on_conflict condition type for table "employees" */
export type Employees_On_Conflict = {
  constraint: Employees_Constraint;
  update_columns?: Array<Employees_Update_Column>;
  where?: InputMaybe<Employees_Bool_Exp>;
};

/** Ordering options when selecting data from "employees". */
export type Employees_Order_By = {
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
export type Employees_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "employees" */
export enum Employees_Select_Column {
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
export type Employees_Set_Input = {
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

/** Streaming cursor of the table "employees" */
export type Employees_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Employees_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Employees_Stream_Cursor_Value_Input = {
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
export enum Employees_Update_Column {
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

export type Employees_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Employees_Set_Input>;
  /** filter the rows which have to be updated */
  where: Employees_Bool_Exp;
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

/** columns and relationships of "events" */
export type Events = {
  __typename?: 'events';
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  layer: Scalars['layer_kind_enum']['output'];
  /** An array relationship */
  mapComponents: Array<Map_Application_Component_Event>;
  /** An aggregate relationship */
  mapComponents_aggregate: Map_Application_Component_Event_Aggregate;
  name: Scalars['String']['output'];
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "events" */
export type EventsMapComponentsArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Event_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Event_Bool_Exp>;
};


/** columns and relationships of "events" */
export type EventsMapComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Event_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Event_Bool_Exp>;
};

/** aggregated selection of "events" */
export type Events_Aggregate = {
  __typename?: 'events_aggregate';
  aggregate?: Maybe<Events_Aggregate_Fields>;
  nodes: Array<Events>;
};

/** aggregate fields of "events" */
export type Events_Aggregate_Fields = {
  __typename?: 'events_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Events_Max_Fields>;
  min?: Maybe<Events_Min_Fields>;
};


/** aggregate fields of "events" */
export type Events_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Events_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "events". All fields are combined with a logical 'AND'. */
export type Events_Bool_Exp = {
  _and?: InputMaybe<Array<Events_Bool_Exp>>;
  _not?: InputMaybe<Events_Bool_Exp>;
  _or?: InputMaybe<Array<Events_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  layer?: InputMaybe<Layer_Kind_Enum_Comparison_Exp>;
  mapComponents?: InputMaybe<Map_Application_Component_Event_Bool_Exp>;
  mapComponents_aggregate?: InputMaybe<Map_Application_Component_Event_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  ownerId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "events" */
export enum Events_Constraint {
  /** unique or primary key constraint on columns "code" */
  EventsCodeUnique = 'events_code_unique',
  /** unique or primary key constraint on columns "id" */
  EventsPkey = 'events_pkey'
}

/** input type for inserting data into table "events" */
export type Events_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  layer?: InputMaybe<Scalars['layer_kind_enum']['input']>;
  mapComponents?: InputMaybe<Map_Application_Component_Event_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Events_Max_Fields = {
  __typename?: 'events_max_fields';
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
export type Events_Min_Fields = {
  __typename?: 'events_min_fields';
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
export type Events_Mutation_Response = {
  __typename?: 'events_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Events>;
};

/** input type for inserting object relation for remote table "events" */
export type Events_Obj_Rel_Insert_Input = {
  data: Events_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Events_On_Conflict>;
};

/** on_conflict condition type for table "events" */
export type Events_On_Conflict = {
  constraint: Events_Constraint;
  update_columns?: Array<Events_Update_Column>;
  where?: InputMaybe<Events_Bool_Exp>;
};

/** Ordering options when selecting data from "events". */
export type Events_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  layer?: InputMaybe<Order_By>;
  mapComponents_aggregate?: InputMaybe<Map_Application_Component_Event_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  ownerId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: events */
export type Events_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "events" */
export enum Events_Select_Column {
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
export type Events_Set_Input = {
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

/** Streaming cursor of the table "events" */
export type Events_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Events_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Events_Stream_Cursor_Value_Input = {
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
export enum Events_Update_Column {
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

export type Events_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Events_Set_Input>;
  /** filter the rows which have to be updated */
  where: Events_Bool_Exp;
};

/** columns and relationships of "flows" */
export type Flows = {
  __typename?: 'flows';
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
  sourceComponent?: Maybe<Components>;
  sourceComponentId?: Maybe<Scalars['uuid']['output']>;
  sourceFunctionId?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  targetComponent?: Maybe<Components>;
  targetComponentId?: Maybe<Scalars['uuid']['output']>;
  targetFunctionId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "flows" */
export type Flows_Aggregate = {
  __typename?: 'flows_aggregate';
  aggregate?: Maybe<Flows_Aggregate_Fields>;
  nodes: Array<Flows>;
};

export type Flows_Aggregate_Bool_Exp = {
  count?: InputMaybe<Flows_Aggregate_Bool_Exp_Count>;
};

export type Flows_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Flows_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Flows_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "flows" */
export type Flows_Aggregate_Fields = {
  __typename?: 'flows_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Flows_Max_Fields>;
  min?: Maybe<Flows_Min_Fields>;
};


/** aggregate fields of "flows" */
export type Flows_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Flows_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "flows" */
export type Flows_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Flows_Max_Order_By>;
  min?: InputMaybe<Flows_Min_Order_By>;
};

/** input type for inserting array relation for remote table "flows" */
export type Flows_Arr_Rel_Insert_Input = {
  data: Array<Flows_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Flows_On_Conflict>;
};

/** Boolean expression to filter rows from the table "flows". All fields are combined with a logical 'AND'. */
export type Flows_Bool_Exp = {
  _and?: InputMaybe<Array<Flows_Bool_Exp>>;
  _not?: InputMaybe<Flows_Bool_Exp>;
  _or?: InputMaybe<Array<Flows_Bool_Exp>>;
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
  sourceComponent?: InputMaybe<Components_Bool_Exp>;
  sourceComponentId?: InputMaybe<Uuid_Comparison_Exp>;
  sourceFunctionId?: InputMaybe<Uuid_Comparison_Exp>;
  targetComponent?: InputMaybe<Components_Bool_Exp>;
  targetComponentId?: InputMaybe<Uuid_Comparison_Exp>;
  targetFunctionId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "flows" */
export enum Flows_Constraint {
  /** unique or primary key constraint on columns "code" */
  FlowsCodeUnique = 'flows_code_unique',
  /** unique or primary key constraint on columns "id" */
  FlowsPkey = 'flows_pkey'
}

/** input type for inserting data into table "flows" */
export type Flows_Insert_Input = {
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
  sourceComponent?: InputMaybe<Components_Obj_Rel_Insert_Input>;
  sourceComponentId?: InputMaybe<Scalars['uuid']['input']>;
  sourceFunctionId?: InputMaybe<Scalars['uuid']['input']>;
  targetComponent?: InputMaybe<Components_Obj_Rel_Insert_Input>;
  targetComponentId?: InputMaybe<Scalars['uuid']['input']>;
  targetFunctionId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Flows_Max_Fields = {
  __typename?: 'flows_max_fields';
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
export type Flows_Max_Order_By = {
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
export type Flows_Min_Fields = {
  __typename?: 'flows_min_fields';
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
export type Flows_Min_Order_By = {
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
export type Flows_Mutation_Response = {
  __typename?: 'flows_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Flows>;
};

/** on_conflict condition type for table "flows" */
export type Flows_On_Conflict = {
  constraint: Flows_Constraint;
  update_columns?: Array<Flows_Update_Column>;
  where?: InputMaybe<Flows_Bool_Exp>;
};

/** Ordering options when selecting data from "flows". */
export type Flows_Order_By = {
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
  sourceComponent?: InputMaybe<Components_Order_By>;
  sourceComponentId?: InputMaybe<Order_By>;
  sourceFunctionId?: InputMaybe<Order_By>;
  targetComponent?: InputMaybe<Components_Order_By>;
  targetComponentId?: InputMaybe<Order_By>;
  targetFunctionId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: flows */
export type Flows_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "flows" */
export enum Flows_Select_Column {
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
export type Flows_Set_Input = {
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

/** Streaming cursor of the table "flows" */
export type Flows_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Flows_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Flows_Stream_Cursor_Value_Input = {
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
export enum Flows_Update_Column {
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

export type Flows_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Flows_Set_Input>;
  /** filter the rows which have to be updated */
  where: Flows_Bool_Exp;
};

/** columns and relationships of "functions" */
export type Functions = {
  __typename?: 'functions';
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  layer: Scalars['layer_kind_enum']['output'];
  /** An array relationship */
  mapComponents: Array<Map_Application_Component_Function>;
  /** An aggregate relationship */
  mapComponents_aggregate: Map_Application_Component_Function_Aggregate;
  name: Scalars['String']['output'];
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "functions" */
export type FunctionsMapComponentsArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Function_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Function_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Function_Bool_Exp>;
};


/** columns and relationships of "functions" */
export type FunctionsMapComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Function_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Function_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Function_Bool_Exp>;
};

/** aggregated selection of "functions" */
export type Functions_Aggregate = {
  __typename?: 'functions_aggregate';
  aggregate?: Maybe<Functions_Aggregate_Fields>;
  nodes: Array<Functions>;
};

/** aggregate fields of "functions" */
export type Functions_Aggregate_Fields = {
  __typename?: 'functions_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Functions_Max_Fields>;
  min?: Maybe<Functions_Min_Fields>;
};


/** aggregate fields of "functions" */
export type Functions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Functions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "functions". All fields are combined with a logical 'AND'. */
export type Functions_Bool_Exp = {
  _and?: InputMaybe<Array<Functions_Bool_Exp>>;
  _not?: InputMaybe<Functions_Bool_Exp>;
  _or?: InputMaybe<Array<Functions_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  layer?: InputMaybe<Layer_Kind_Enum_Comparison_Exp>;
  mapComponents?: InputMaybe<Map_Application_Component_Function_Bool_Exp>;
  mapComponents_aggregate?: InputMaybe<Map_Application_Component_Function_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  ownerId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "functions" */
export enum Functions_Constraint {
  /** unique or primary key constraint on columns "code" */
  FunctionsCodeUnique = 'functions_code_unique',
  /** unique or primary key constraint on columns "id" */
  FunctionsPkey = 'functions_pkey'
}

/** input type for inserting data into table "functions" */
export type Functions_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  layer?: InputMaybe<Scalars['layer_kind_enum']['input']>;
  mapComponents?: InputMaybe<Map_Application_Component_Function_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Functions_Max_Fields = {
  __typename?: 'functions_max_fields';
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
export type Functions_Min_Fields = {
  __typename?: 'functions_min_fields';
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
export type Functions_Mutation_Response = {
  __typename?: 'functions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Functions>;
};

/** input type for inserting object relation for remote table "functions" */
export type Functions_Obj_Rel_Insert_Input = {
  data: Functions_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Functions_On_Conflict>;
};

/** on_conflict condition type for table "functions" */
export type Functions_On_Conflict = {
  constraint: Functions_Constraint;
  update_columns?: Array<Functions_Update_Column>;
  where?: InputMaybe<Functions_Bool_Exp>;
};

/** Ordering options when selecting data from "functions". */
export type Functions_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  layer?: InputMaybe<Order_By>;
  mapComponents_aggregate?: InputMaybe<Map_Application_Component_Function_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  ownerId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: functions */
export type Functions_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "functions" */
export enum Functions_Select_Column {
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
export type Functions_Set_Input = {
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

/** Streaming cursor of the table "functions" */
export type Functions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Functions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Functions_Stream_Cursor_Value_Input = {
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
export enum Functions_Update_Column {
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

export type Functions_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Functions_Set_Input>;
  /** filter the rows which have to be updated */
  where: Functions_Bool_Exp;
};

/** columns and relationships of "interfaces" */
export type Interfaces = {
  __typename?: 'interfaces';
  code: Scalars['String']['output'];
  componentId?: Maybe<Scalars['uuid']['output']>;
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  layer: Scalars['layer_kind_enum']['output'];
  /** An array relationship */
  mapComponents: Array<Map_Application_Component_Interface>;
  /** An aggregate relationship */
  mapComponents_aggregate: Map_Application_Component_Interface_Aggregate;
  /** An array relationship */
  mapMapApplicationComponentFunctions: Array<Map_Application_Interface_Function>;
  /** An aggregate relationship */
  mapMapApplicationComponentFunctions_aggregate: Map_Application_Interface_Function_Aggregate;
  name: Scalars['String']['output'];
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "interfaces" */
export type InterfacesMapComponentsArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Interface_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Interface_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Interface_Bool_Exp>;
};


/** columns and relationships of "interfaces" */
export type InterfacesMapComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Interface_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Interface_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Interface_Bool_Exp>;
};


/** columns and relationships of "interfaces" */
export type InterfacesMapMapApplicationComponentFunctionsArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Interface_Function_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Interface_Function_Order_By>>;
  where?: InputMaybe<Map_Application_Interface_Function_Bool_Exp>;
};


/** columns and relationships of "interfaces" */
export type InterfacesMapMapApplicationComponentFunctions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Interface_Function_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Interface_Function_Order_By>>;
  where?: InputMaybe<Map_Application_Interface_Function_Bool_Exp>;
};

/** aggregated selection of "interfaces" */
export type Interfaces_Aggregate = {
  __typename?: 'interfaces_aggregate';
  aggregate?: Maybe<Interfaces_Aggregate_Fields>;
  nodes: Array<Interfaces>;
};

/** aggregate fields of "interfaces" */
export type Interfaces_Aggregate_Fields = {
  __typename?: 'interfaces_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Interfaces_Max_Fields>;
  min?: Maybe<Interfaces_Min_Fields>;
};


/** aggregate fields of "interfaces" */
export type Interfaces_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Interfaces_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "interfaces". All fields are combined with a logical 'AND'. */
export type Interfaces_Bool_Exp = {
  _and?: InputMaybe<Array<Interfaces_Bool_Exp>>;
  _not?: InputMaybe<Interfaces_Bool_Exp>;
  _or?: InputMaybe<Array<Interfaces_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  layer?: InputMaybe<Layer_Kind_Enum_Comparison_Exp>;
  mapComponents?: InputMaybe<Map_Application_Component_Interface_Bool_Exp>;
  mapComponents_aggregate?: InputMaybe<Map_Application_Component_Interface_Aggregate_Bool_Exp>;
  mapMapApplicationComponentFunctions?: InputMaybe<Map_Application_Interface_Function_Bool_Exp>;
  mapMapApplicationComponentFunctions_aggregate?: InputMaybe<Map_Application_Interface_Function_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  ownerId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "interfaces" */
export enum Interfaces_Constraint {
  /** unique or primary key constraint on columns "code" */
  InterfacesCodeUnique = 'interfaces_code_unique',
  /** unique or primary key constraint on columns "id" */
  InterfacesPkey = 'interfaces_pkey'
}

/** input type for inserting data into table "interfaces" */
export type Interfaces_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  layer?: InputMaybe<Scalars['layer_kind_enum']['input']>;
  mapComponents?: InputMaybe<Map_Application_Component_Interface_Arr_Rel_Insert_Input>;
  mapMapApplicationComponentFunctions?: InputMaybe<Map_Application_Interface_Function_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Interfaces_Max_Fields = {
  __typename?: 'interfaces_max_fields';
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
export type Interfaces_Min_Fields = {
  __typename?: 'interfaces_min_fields';
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
export type Interfaces_Mutation_Response = {
  __typename?: 'interfaces_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Interfaces>;
};

/** input type for inserting object relation for remote table "interfaces" */
export type Interfaces_Obj_Rel_Insert_Input = {
  data: Interfaces_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Interfaces_On_Conflict>;
};

/** on_conflict condition type for table "interfaces" */
export type Interfaces_On_Conflict = {
  constraint: Interfaces_Constraint;
  update_columns?: Array<Interfaces_Update_Column>;
  where?: InputMaybe<Interfaces_Bool_Exp>;
};

/** Ordering options when selecting data from "interfaces". */
export type Interfaces_Order_By = {
  code?: InputMaybe<Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  layer?: InputMaybe<Order_By>;
  mapComponents_aggregate?: InputMaybe<Map_Application_Component_Interface_Aggregate_Order_By>;
  mapMapApplicationComponentFunctions_aggregate?: InputMaybe<Map_Application_Interface_Function_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  ownerId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: interfaces */
export type Interfaces_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "interfaces" */
export enum Interfaces_Select_Column {
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
export type Interfaces_Set_Input = {
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

/** Streaming cursor of the table "interfaces" */
export type Interfaces_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Interfaces_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Interfaces_Stream_Cursor_Value_Input = {
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
export enum Interfaces_Update_Column {
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

export type Interfaces_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Interfaces_Set_Input>;
  /** filter the rows which have to be updated */
  where: Interfaces_Bool_Exp;
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

/** columns and relationships of "locations" */
export type Locations = {
  __typename?: 'locations';
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  /** An array relationship */
  technologyNetworks: Array<Technology_Networks>;
  /** An aggregate relationship */
  technologyNetworks_aggregate: Technology_Networks_Aggregate;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "locations" */
export type LocationsTechnologyNetworksArgs = {
  distinct_on?: InputMaybe<Array<Technology_Networks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Technology_Networks_Order_By>>;
  where?: InputMaybe<Technology_Networks_Bool_Exp>;
};


/** columns and relationships of "locations" */
export type LocationsTechnologyNetworks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Technology_Networks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Technology_Networks_Order_By>>;
  where?: InputMaybe<Technology_Networks_Bool_Exp>;
};

/** aggregated selection of "locations" */
export type Locations_Aggregate = {
  __typename?: 'locations_aggregate';
  aggregate?: Maybe<Locations_Aggregate_Fields>;
  nodes: Array<Locations>;
};

/** aggregate fields of "locations" */
export type Locations_Aggregate_Fields = {
  __typename?: 'locations_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Locations_Max_Fields>;
  min?: Maybe<Locations_Min_Fields>;
};


/** aggregate fields of "locations" */
export type Locations_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Locations_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "locations". All fields are combined with a logical 'AND'. */
export type Locations_Bool_Exp = {
  _and?: InputMaybe<Array<Locations_Bool_Exp>>;
  _not?: InputMaybe<Locations_Bool_Exp>;
  _or?: InputMaybe<Array<Locations_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  technologyNetworks?: InputMaybe<Technology_Networks_Bool_Exp>;
  technologyNetworks_aggregate?: InputMaybe<Technology_Networks_Aggregate_Bool_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "locations" */
export enum Locations_Constraint {
  /** unique or primary key constraint on columns "code" */
  LocationsCodeUnique = 'locations_code_unique',
  /** unique or primary key constraint on columns "id" */
  LocationsPkey = 'locations_pkey'
}

/** input type for inserting data into table "locations" */
export type Locations_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  technologyNetworks?: InputMaybe<Technology_Networks_Arr_Rel_Insert_Input>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Locations_Max_Fields = {
  __typename?: 'locations_max_fields';
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
export type Locations_Min_Fields = {
  __typename?: 'locations_min_fields';
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
export type Locations_Mutation_Response = {
  __typename?: 'locations_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Locations>;
};

/** input type for inserting object relation for remote table "locations" */
export type Locations_Obj_Rel_Insert_Input = {
  data: Locations_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Locations_On_Conflict>;
};

/** on_conflict condition type for table "locations" */
export type Locations_On_Conflict = {
  constraint: Locations_Constraint;
  update_columns?: Array<Locations_Update_Column>;
  where?: InputMaybe<Locations_Bool_Exp>;
};

/** Ordering options when selecting data from "locations". */
export type Locations_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  technologyNetworks_aggregate?: InputMaybe<Technology_Networks_Aggregate_Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: locations */
export type Locations_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "locations" */
export enum Locations_Select_Column {
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
export type Locations_Set_Input = {
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

/** Streaming cursor of the table "locations" */
export type Locations_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Locations_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Locations_Stream_Cursor_Value_Input = {
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
export enum Locations_Update_Column {
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

export type Locations_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Locations_Set_Input>;
  /** filter the rows which have to be updated */
  where: Locations_Bool_Exp;
};

/** columns and relationships of "map_application_component_data_object" */
export type Map_Application_Component_Data_Object = {
  __typename?: 'map_application_component_data_object';
  /** An object relationship */
  component: Components;
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  dataObject: Data_Objects;
  dataObjectId: Scalars['uuid']['output'];
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An array relationship */
  mapComponents: Array<Map_Application_Function_Data_Object>;
  /** An aggregate relationship */
  mapComponents_aggregate: Map_Application_Function_Data_Object_Aggregate;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "map_application_component_data_object" */
export type Map_Application_Component_Data_ObjectMapComponentsArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Function_Data_Object_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Function_Data_Object_Order_By>>;
  where?: InputMaybe<Map_Application_Function_Data_Object_Bool_Exp>;
};


/** columns and relationships of "map_application_component_data_object" */
export type Map_Application_Component_Data_ObjectMapComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Function_Data_Object_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Function_Data_Object_Order_By>>;
  where?: InputMaybe<Map_Application_Function_Data_Object_Bool_Exp>;
};

/** aggregated selection of "map_application_component_data_object" */
export type Map_Application_Component_Data_Object_Aggregate = {
  __typename?: 'map_application_component_data_object_aggregate';
  aggregate?: Maybe<Map_Application_Component_Data_Object_Aggregate_Fields>;
  nodes: Array<Map_Application_Component_Data_Object>;
};

export type Map_Application_Component_Data_Object_Aggregate_Bool_Exp = {
  count?: InputMaybe<Map_Application_Component_Data_Object_Aggregate_Bool_Exp_Count>;
};

export type Map_Application_Component_Data_Object_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Map_Application_Component_Data_Object_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Map_Application_Component_Data_Object_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_application_component_data_object" */
export type Map_Application_Component_Data_Object_Aggregate_Fields = {
  __typename?: 'map_application_component_data_object_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Map_Application_Component_Data_Object_Max_Fields>;
  min?: Maybe<Map_Application_Component_Data_Object_Min_Fields>;
};


/** aggregate fields of "map_application_component_data_object" */
export type Map_Application_Component_Data_Object_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Map_Application_Component_Data_Object_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_application_component_data_object" */
export type Map_Application_Component_Data_Object_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Map_Application_Component_Data_Object_Max_Order_By>;
  min?: InputMaybe<Map_Application_Component_Data_Object_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_application_component_data_object" */
export type Map_Application_Component_Data_Object_Arr_Rel_Insert_Input = {
  data: Array<Map_Application_Component_Data_Object_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Map_Application_Component_Data_Object_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_application_component_data_object". All fields are combined with a logical 'AND'. */
export type Map_Application_Component_Data_Object_Bool_Exp = {
  _and?: InputMaybe<Array<Map_Application_Component_Data_Object_Bool_Exp>>;
  _not?: InputMaybe<Map_Application_Component_Data_Object_Bool_Exp>;
  _or?: InputMaybe<Array<Map_Application_Component_Data_Object_Bool_Exp>>;
  component?: InputMaybe<Components_Bool_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  dataObject?: InputMaybe<Data_Objects_Bool_Exp>;
  dataObjectId?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  mapComponents?: InputMaybe<Map_Application_Function_Data_Object_Bool_Exp>;
  mapComponents_aggregate?: InputMaybe<Map_Application_Function_Data_Object_Aggregate_Bool_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_application_component_data_object" */
export enum Map_Application_Component_Data_Object_Constraint {
  /** unique or primary key constraint on columns "data_object_id", "component_id" */
  MapApplicationComponentDataObjectPkey = 'map_application_component_data_object_pkey'
}

/** input type for inserting data into table "map_application_component_data_object" */
export type Map_Application_Component_Data_Object_Insert_Input = {
  component?: InputMaybe<Components_Obj_Rel_Insert_Input>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  dataObject?: InputMaybe<Data_Objects_Obj_Rel_Insert_Input>;
  dataObjectId?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  mapComponents?: InputMaybe<Map_Application_Function_Data_Object_Arr_Rel_Insert_Input>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Map_Application_Component_Data_Object_Max_Fields = {
  __typename?: 'map_application_component_data_object_max_fields';
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
export type Map_Application_Component_Data_Object_Max_Order_By = {
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
export type Map_Application_Component_Data_Object_Min_Fields = {
  __typename?: 'map_application_component_data_object_min_fields';
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
export type Map_Application_Component_Data_Object_Min_Order_By = {
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
export type Map_Application_Component_Data_Object_Mutation_Response = {
  __typename?: 'map_application_component_data_object_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Map_Application_Component_Data_Object>;
};

/** on_conflict condition type for table "map_application_component_data_object" */
export type Map_Application_Component_Data_Object_On_Conflict = {
  constraint: Map_Application_Component_Data_Object_Constraint;
  update_columns?: Array<Map_Application_Component_Data_Object_Update_Column>;
  where?: InputMaybe<Map_Application_Component_Data_Object_Bool_Exp>;
};

/** Ordering options when selecting data from "map_application_component_data_object". */
export type Map_Application_Component_Data_Object_Order_By = {
  component?: InputMaybe<Components_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  dataObject?: InputMaybe<Data_Objects_Order_By>;
  dataObjectId?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  mapComponents_aggregate?: InputMaybe<Map_Application_Function_Data_Object_Aggregate_Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_application_component_data_object */
export type Map_Application_Component_Data_Object_Pk_Columns_Input = {
  componentId: Scalars['uuid']['input'];
  dataObjectId: Scalars['uuid']['input'];
};

/** select columns of table "map_application_component_data_object" */
export enum Map_Application_Component_Data_Object_Select_Column {
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
export type Map_Application_Component_Data_Object_Set_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  dataObjectId?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "map_application_component_data_object" */
export type Map_Application_Component_Data_Object_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Map_Application_Component_Data_Object_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Map_Application_Component_Data_Object_Stream_Cursor_Value_Input = {
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
export enum Map_Application_Component_Data_Object_Update_Column {
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

export type Map_Application_Component_Data_Object_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Map_Application_Component_Data_Object_Set_Input>;
  /** filter the rows which have to be updated */
  where: Map_Application_Component_Data_Object_Bool_Exp;
};

/** columns and relationships of "map_application_component_event" */
export type Map_Application_Component_Event = {
  __typename?: 'map_application_component_event';
  /** An object relationship */
  component: Components;
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  event: Events;
  eventId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_application_component_event" */
export type Map_Application_Component_Event_Aggregate = {
  __typename?: 'map_application_component_event_aggregate';
  aggregate?: Maybe<Map_Application_Component_Event_Aggregate_Fields>;
  nodes: Array<Map_Application_Component_Event>;
};

export type Map_Application_Component_Event_Aggregate_Bool_Exp = {
  count?: InputMaybe<Map_Application_Component_Event_Aggregate_Bool_Exp_Count>;
};

export type Map_Application_Component_Event_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Map_Application_Component_Event_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Map_Application_Component_Event_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_application_component_event" */
export type Map_Application_Component_Event_Aggregate_Fields = {
  __typename?: 'map_application_component_event_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Map_Application_Component_Event_Max_Fields>;
  min?: Maybe<Map_Application_Component_Event_Min_Fields>;
};


/** aggregate fields of "map_application_component_event" */
export type Map_Application_Component_Event_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Map_Application_Component_Event_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_application_component_event" */
export type Map_Application_Component_Event_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Map_Application_Component_Event_Max_Order_By>;
  min?: InputMaybe<Map_Application_Component_Event_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_application_component_event" */
export type Map_Application_Component_Event_Arr_Rel_Insert_Input = {
  data: Array<Map_Application_Component_Event_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Map_Application_Component_Event_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_application_component_event". All fields are combined with a logical 'AND'. */
export type Map_Application_Component_Event_Bool_Exp = {
  _and?: InputMaybe<Array<Map_Application_Component_Event_Bool_Exp>>;
  _not?: InputMaybe<Map_Application_Component_Event_Bool_Exp>;
  _or?: InputMaybe<Array<Map_Application_Component_Event_Bool_Exp>>;
  component?: InputMaybe<Components_Bool_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  event?: InputMaybe<Events_Bool_Exp>;
  eventId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_application_component_event" */
export enum Map_Application_Component_Event_Constraint {
  /** unique or primary key constraint on columns "component_id", "event_id" */
  MapApplicationComponentEventPkey = 'map_application_component_event_pkey'
}

/** input type for inserting data into table "map_application_component_event" */
export type Map_Application_Component_Event_Insert_Input = {
  component?: InputMaybe<Components_Obj_Rel_Insert_Input>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  event?: InputMaybe<Events_Obj_Rel_Insert_Input>;
  eventId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Map_Application_Component_Event_Max_Fields = {
  __typename?: 'map_application_component_event_max_fields';
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
export type Map_Application_Component_Event_Max_Order_By = {
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
export type Map_Application_Component_Event_Min_Fields = {
  __typename?: 'map_application_component_event_min_fields';
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
export type Map_Application_Component_Event_Min_Order_By = {
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
export type Map_Application_Component_Event_Mutation_Response = {
  __typename?: 'map_application_component_event_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Map_Application_Component_Event>;
};

/** on_conflict condition type for table "map_application_component_event" */
export type Map_Application_Component_Event_On_Conflict = {
  constraint: Map_Application_Component_Event_Constraint;
  update_columns?: Array<Map_Application_Component_Event_Update_Column>;
  where?: InputMaybe<Map_Application_Component_Event_Bool_Exp>;
};

/** Ordering options when selecting data from "map_application_component_event". */
export type Map_Application_Component_Event_Order_By = {
  component?: InputMaybe<Components_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  event?: InputMaybe<Events_Order_By>;
  eventId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_application_component_event */
export type Map_Application_Component_Event_Pk_Columns_Input = {
  componentId: Scalars['uuid']['input'];
  eventId: Scalars['uuid']['input'];
};

/** select columns of table "map_application_component_event" */
export enum Map_Application_Component_Event_Select_Column {
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
export type Map_Application_Component_Event_Set_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  eventId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "map_application_component_event" */
export type Map_Application_Component_Event_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Map_Application_Component_Event_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Map_Application_Component_Event_Stream_Cursor_Value_Input = {
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
export enum Map_Application_Component_Event_Update_Column {
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

export type Map_Application_Component_Event_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Map_Application_Component_Event_Set_Input>;
  /** filter the rows which have to be updated */
  where: Map_Application_Component_Event_Bool_Exp;
};

/** columns and relationships of "map_application_component_function" */
export type Map_Application_Component_Function = {
  __typename?: 'map_application_component_function';
  /** An object relationship */
  component: Components;
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An array relationship */
  flows: Array<Flows>;
  /** An array relationship */
  flows2: Array<Flows>;
  /** An aggregate relationship */
  flows2_aggregate: Flows_Aggregate;
  /** An aggregate relationship */
  flows_aggregate: Flows_Aggregate;
  /** An object relationship */
  function: Functions;
  functionId: Scalars['uuid']['output'];
  /** An array relationship */
  mapComponents: Array<Map_Application_Function_Data_Object>;
  /** An aggregate relationship */
  mapComponents_aggregate: Map_Application_Function_Data_Object_Aggregate;
  /** An array relationship */
  mapInterfaces: Array<Map_Application_Interface_Function>;
  /** An aggregate relationship */
  mapInterfaces_aggregate: Map_Application_Interface_Function_Aggregate;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "map_application_component_function" */
export type Map_Application_Component_FunctionFlowsArgs = {
  distinct_on?: InputMaybe<Array<Flows_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Flows_Order_By>>;
  where?: InputMaybe<Flows_Bool_Exp>;
};


/** columns and relationships of "map_application_component_function" */
export type Map_Application_Component_FunctionFlows2Args = {
  distinct_on?: InputMaybe<Array<Flows_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Flows_Order_By>>;
  where?: InputMaybe<Flows_Bool_Exp>;
};


/** columns and relationships of "map_application_component_function" */
export type Map_Application_Component_FunctionFlows2_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Flows_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Flows_Order_By>>;
  where?: InputMaybe<Flows_Bool_Exp>;
};


/** columns and relationships of "map_application_component_function" */
export type Map_Application_Component_FunctionFlows_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Flows_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Flows_Order_By>>;
  where?: InputMaybe<Flows_Bool_Exp>;
};


/** columns and relationships of "map_application_component_function" */
export type Map_Application_Component_FunctionMapComponentsArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Function_Data_Object_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Function_Data_Object_Order_By>>;
  where?: InputMaybe<Map_Application_Function_Data_Object_Bool_Exp>;
};


/** columns and relationships of "map_application_component_function" */
export type Map_Application_Component_FunctionMapComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Function_Data_Object_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Function_Data_Object_Order_By>>;
  where?: InputMaybe<Map_Application_Function_Data_Object_Bool_Exp>;
};


/** columns and relationships of "map_application_component_function" */
export type Map_Application_Component_FunctionMapInterfacesArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Interface_Function_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Interface_Function_Order_By>>;
  where?: InputMaybe<Map_Application_Interface_Function_Bool_Exp>;
};


/** columns and relationships of "map_application_component_function" */
export type Map_Application_Component_FunctionMapInterfaces_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Interface_Function_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Interface_Function_Order_By>>;
  where?: InputMaybe<Map_Application_Interface_Function_Bool_Exp>;
};

/** aggregated selection of "map_application_component_function" */
export type Map_Application_Component_Function_Aggregate = {
  __typename?: 'map_application_component_function_aggregate';
  aggregate?: Maybe<Map_Application_Component_Function_Aggregate_Fields>;
  nodes: Array<Map_Application_Component_Function>;
};

export type Map_Application_Component_Function_Aggregate_Bool_Exp = {
  count?: InputMaybe<Map_Application_Component_Function_Aggregate_Bool_Exp_Count>;
};

export type Map_Application_Component_Function_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Map_Application_Component_Function_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Map_Application_Component_Function_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_application_component_function" */
export type Map_Application_Component_Function_Aggregate_Fields = {
  __typename?: 'map_application_component_function_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Map_Application_Component_Function_Max_Fields>;
  min?: Maybe<Map_Application_Component_Function_Min_Fields>;
};


/** aggregate fields of "map_application_component_function" */
export type Map_Application_Component_Function_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Map_Application_Component_Function_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_application_component_function" */
export type Map_Application_Component_Function_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Map_Application_Component_Function_Max_Order_By>;
  min?: InputMaybe<Map_Application_Component_Function_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_application_component_function" */
export type Map_Application_Component_Function_Arr_Rel_Insert_Input = {
  data: Array<Map_Application_Component_Function_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Map_Application_Component_Function_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_application_component_function". All fields are combined with a logical 'AND'. */
export type Map_Application_Component_Function_Bool_Exp = {
  _and?: InputMaybe<Array<Map_Application_Component_Function_Bool_Exp>>;
  _not?: InputMaybe<Map_Application_Component_Function_Bool_Exp>;
  _or?: InputMaybe<Array<Map_Application_Component_Function_Bool_Exp>>;
  component?: InputMaybe<Components_Bool_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  flows?: InputMaybe<Flows_Bool_Exp>;
  flows2?: InputMaybe<Flows_Bool_Exp>;
  flows2_aggregate?: InputMaybe<Flows_Aggregate_Bool_Exp>;
  flows_aggregate?: InputMaybe<Flows_Aggregate_Bool_Exp>;
  function?: InputMaybe<Functions_Bool_Exp>;
  functionId?: InputMaybe<Uuid_Comparison_Exp>;
  mapComponents?: InputMaybe<Map_Application_Function_Data_Object_Bool_Exp>;
  mapComponents_aggregate?: InputMaybe<Map_Application_Function_Data_Object_Aggregate_Bool_Exp>;
  mapInterfaces?: InputMaybe<Map_Application_Interface_Function_Bool_Exp>;
  mapInterfaces_aggregate?: InputMaybe<Map_Application_Interface_Function_Aggregate_Bool_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_application_component_function" */
export enum Map_Application_Component_Function_Constraint {
  /** unique or primary key constraint on columns "component_id", "function_id" */
  MapApplicationComponentFunctionPkey = 'map_application_component_function_pkey'
}

/** input type for inserting data into table "map_application_component_function" */
export type Map_Application_Component_Function_Insert_Input = {
  component?: InputMaybe<Components_Obj_Rel_Insert_Input>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  flows?: InputMaybe<Flows_Arr_Rel_Insert_Input>;
  flows2?: InputMaybe<Flows_Arr_Rel_Insert_Input>;
  function?: InputMaybe<Functions_Obj_Rel_Insert_Input>;
  functionId?: InputMaybe<Scalars['uuid']['input']>;
  mapComponents?: InputMaybe<Map_Application_Function_Data_Object_Arr_Rel_Insert_Input>;
  mapInterfaces?: InputMaybe<Map_Application_Interface_Function_Arr_Rel_Insert_Input>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Map_Application_Component_Function_Max_Fields = {
  __typename?: 'map_application_component_function_max_fields';
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
export type Map_Application_Component_Function_Max_Order_By = {
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
export type Map_Application_Component_Function_Min_Fields = {
  __typename?: 'map_application_component_function_min_fields';
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
export type Map_Application_Component_Function_Min_Order_By = {
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
export type Map_Application_Component_Function_Mutation_Response = {
  __typename?: 'map_application_component_function_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Map_Application_Component_Function>;
};

/** on_conflict condition type for table "map_application_component_function" */
export type Map_Application_Component_Function_On_Conflict = {
  constraint: Map_Application_Component_Function_Constraint;
  update_columns?: Array<Map_Application_Component_Function_Update_Column>;
  where?: InputMaybe<Map_Application_Component_Function_Bool_Exp>;
};

/** Ordering options when selecting data from "map_application_component_function". */
export type Map_Application_Component_Function_Order_By = {
  component?: InputMaybe<Components_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  flows2_aggregate?: InputMaybe<Flows_Aggregate_Order_By>;
  flows_aggregate?: InputMaybe<Flows_Aggregate_Order_By>;
  function?: InputMaybe<Functions_Order_By>;
  functionId?: InputMaybe<Order_By>;
  mapComponents_aggregate?: InputMaybe<Map_Application_Function_Data_Object_Aggregate_Order_By>;
  mapInterfaces_aggregate?: InputMaybe<Map_Application_Interface_Function_Aggregate_Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_application_component_function */
export type Map_Application_Component_Function_Pk_Columns_Input = {
  componentId: Scalars['uuid']['input'];
  functionId: Scalars['uuid']['input'];
};

/** select columns of table "map_application_component_function" */
export enum Map_Application_Component_Function_Select_Column {
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
export type Map_Application_Component_Function_Set_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  functionId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "map_application_component_function" */
export type Map_Application_Component_Function_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Map_Application_Component_Function_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Map_Application_Component_Function_Stream_Cursor_Value_Input = {
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
export enum Map_Application_Component_Function_Update_Column {
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

export type Map_Application_Component_Function_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Map_Application_Component_Function_Set_Input>;
  /** filter the rows which have to be updated */
  where: Map_Application_Component_Function_Bool_Exp;
};

/** columns and relationships of "map_application_component_hierarchy" */
export type Map_Application_Component_Hierarchy = {
  __typename?: 'map_application_component_hierarchy';
  /** An object relationship */
  componentChild: Components;
  componentChildId: Scalars['uuid']['output'];
  /** An object relationship */
  componentParent: Components;
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
export type Map_Application_Component_Hierarchy_Aggregate = {
  __typename?: 'map_application_component_hierarchy_aggregate';
  aggregate?: Maybe<Map_Application_Component_Hierarchy_Aggregate_Fields>;
  nodes: Array<Map_Application_Component_Hierarchy>;
};

export type Map_Application_Component_Hierarchy_Aggregate_Bool_Exp = {
  count?: InputMaybe<Map_Application_Component_Hierarchy_Aggregate_Bool_Exp_Count>;
};

export type Map_Application_Component_Hierarchy_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Map_Application_Component_Hierarchy_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Map_Application_Component_Hierarchy_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_application_component_hierarchy" */
export type Map_Application_Component_Hierarchy_Aggregate_Fields = {
  __typename?: 'map_application_component_hierarchy_aggregate_fields';
  avg?: Maybe<Map_Application_Component_Hierarchy_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Map_Application_Component_Hierarchy_Max_Fields>;
  min?: Maybe<Map_Application_Component_Hierarchy_Min_Fields>;
  stddev?: Maybe<Map_Application_Component_Hierarchy_Stddev_Fields>;
  stddev_pop?: Maybe<Map_Application_Component_Hierarchy_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Map_Application_Component_Hierarchy_Stddev_Samp_Fields>;
  sum?: Maybe<Map_Application_Component_Hierarchy_Sum_Fields>;
  var_pop?: Maybe<Map_Application_Component_Hierarchy_Var_Pop_Fields>;
  var_samp?: Maybe<Map_Application_Component_Hierarchy_Var_Samp_Fields>;
  variance?: Maybe<Map_Application_Component_Hierarchy_Variance_Fields>;
};


/** aggregate fields of "map_application_component_hierarchy" */
export type Map_Application_Component_Hierarchy_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Map_Application_Component_Hierarchy_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_application_component_hierarchy" */
export type Map_Application_Component_Hierarchy_Aggregate_Order_By = {
  avg?: InputMaybe<Map_Application_Component_Hierarchy_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Map_Application_Component_Hierarchy_Max_Order_By>;
  min?: InputMaybe<Map_Application_Component_Hierarchy_Min_Order_By>;
  stddev?: InputMaybe<Map_Application_Component_Hierarchy_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Map_Application_Component_Hierarchy_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Map_Application_Component_Hierarchy_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Map_Application_Component_Hierarchy_Sum_Order_By>;
  var_pop?: InputMaybe<Map_Application_Component_Hierarchy_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Map_Application_Component_Hierarchy_Var_Samp_Order_By>;
  variance?: InputMaybe<Map_Application_Component_Hierarchy_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "map_application_component_hierarchy" */
export type Map_Application_Component_Hierarchy_Arr_Rel_Insert_Input = {
  data: Array<Map_Application_Component_Hierarchy_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Map_Application_Component_Hierarchy_On_Conflict>;
};

/** aggregate avg on columns */
export type Map_Application_Component_Hierarchy_Avg_Fields = {
  __typename?: 'map_application_component_hierarchy_avg_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "map_application_component_hierarchy" */
export type Map_Application_Component_Hierarchy_Avg_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "map_application_component_hierarchy". All fields are combined with a logical 'AND'. */
export type Map_Application_Component_Hierarchy_Bool_Exp = {
  _and?: InputMaybe<Array<Map_Application_Component_Hierarchy_Bool_Exp>>;
  _not?: InputMaybe<Map_Application_Component_Hierarchy_Bool_Exp>;
  _or?: InputMaybe<Array<Map_Application_Component_Hierarchy_Bool_Exp>>;
  componentChild?: InputMaybe<Components_Bool_Exp>;
  componentChildId?: InputMaybe<Uuid_Comparison_Exp>;
  componentParent?: InputMaybe<Components_Bool_Exp>;
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
export enum Map_Application_Component_Hierarchy_Constraint {
  /** unique or primary key constraint on columns "component_child_id", "component_parent_id" */
  MapApplicationComponentHierarchyPkey = 'map_application_component_hierarchy_pkey'
}

/** input type for incrementing numeric columns in table "map_application_component_hierarchy" */
export type Map_Application_Component_Hierarchy_Inc_Input = {
  order?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "map_application_component_hierarchy" */
export type Map_Application_Component_Hierarchy_Insert_Input = {
  componentChild?: InputMaybe<Components_Obj_Rel_Insert_Input>;
  componentChildId?: InputMaybe<Scalars['uuid']['input']>;
  componentParent?: InputMaybe<Components_Obj_Rel_Insert_Input>;
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
export type Map_Application_Component_Hierarchy_Max_Fields = {
  __typename?: 'map_application_component_hierarchy_max_fields';
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
export type Map_Application_Component_Hierarchy_Max_Order_By = {
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
export type Map_Application_Component_Hierarchy_Min_Fields = {
  __typename?: 'map_application_component_hierarchy_min_fields';
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
export type Map_Application_Component_Hierarchy_Min_Order_By = {
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
export type Map_Application_Component_Hierarchy_Mutation_Response = {
  __typename?: 'map_application_component_hierarchy_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Map_Application_Component_Hierarchy>;
};

/** on_conflict condition type for table "map_application_component_hierarchy" */
export type Map_Application_Component_Hierarchy_On_Conflict = {
  constraint: Map_Application_Component_Hierarchy_Constraint;
  update_columns?: Array<Map_Application_Component_Hierarchy_Update_Column>;
  where?: InputMaybe<Map_Application_Component_Hierarchy_Bool_Exp>;
};

/** Ordering options when selecting data from "map_application_component_hierarchy". */
export type Map_Application_Component_Hierarchy_Order_By = {
  componentChild?: InputMaybe<Components_Order_By>;
  componentChildId?: InputMaybe<Order_By>;
  componentParent?: InputMaybe<Components_Order_By>;
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
export type Map_Application_Component_Hierarchy_Pk_Columns_Input = {
  componentChildId: Scalars['uuid']['input'];
  componentParentId: Scalars['uuid']['input'];
};

/** select columns of table "map_application_component_hierarchy" */
export enum Map_Application_Component_Hierarchy_Select_Column {
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
export type Map_Application_Component_Hierarchy_Set_Input = {
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
export type Map_Application_Component_Hierarchy_Stddev_Fields = {
  __typename?: 'map_application_component_hierarchy_stddev_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "map_application_component_hierarchy" */
export type Map_Application_Component_Hierarchy_Stddev_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Map_Application_Component_Hierarchy_Stddev_Pop_Fields = {
  __typename?: 'map_application_component_hierarchy_stddev_pop_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "map_application_component_hierarchy" */
export type Map_Application_Component_Hierarchy_Stddev_Pop_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Map_Application_Component_Hierarchy_Stddev_Samp_Fields = {
  __typename?: 'map_application_component_hierarchy_stddev_samp_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "map_application_component_hierarchy" */
export type Map_Application_Component_Hierarchy_Stddev_Samp_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "map_application_component_hierarchy" */
export type Map_Application_Component_Hierarchy_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Map_Application_Component_Hierarchy_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Map_Application_Component_Hierarchy_Stream_Cursor_Value_Input = {
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
export type Map_Application_Component_Hierarchy_Sum_Fields = {
  __typename?: 'map_application_component_hierarchy_sum_fields';
  order?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "map_application_component_hierarchy" */
export type Map_Application_Component_Hierarchy_Sum_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** update columns of table "map_application_component_hierarchy" */
export enum Map_Application_Component_Hierarchy_Update_Column {
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

export type Map_Application_Component_Hierarchy_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Map_Application_Component_Hierarchy_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Map_Application_Component_Hierarchy_Set_Input>;
  /** filter the rows which have to be updated */
  where: Map_Application_Component_Hierarchy_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Map_Application_Component_Hierarchy_Var_Pop_Fields = {
  __typename?: 'map_application_component_hierarchy_var_pop_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "map_application_component_hierarchy" */
export type Map_Application_Component_Hierarchy_Var_Pop_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Map_Application_Component_Hierarchy_Var_Samp_Fields = {
  __typename?: 'map_application_component_hierarchy_var_samp_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "map_application_component_hierarchy" */
export type Map_Application_Component_Hierarchy_Var_Samp_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Map_Application_Component_Hierarchy_Variance_Fields = {
  __typename?: 'map_application_component_hierarchy_variance_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "map_application_component_hierarchy" */
export type Map_Application_Component_Hierarchy_Variance_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** columns and relationships of "map_application_component_interface" */
export type Map_Application_Component_Interface = {
  __typename?: 'map_application_component_interface';
  /** An object relationship */
  component: Components;
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  interface: Interfaces;
  interfaceId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_application_component_interface" */
export type Map_Application_Component_Interface_Aggregate = {
  __typename?: 'map_application_component_interface_aggregate';
  aggregate?: Maybe<Map_Application_Component_Interface_Aggregate_Fields>;
  nodes: Array<Map_Application_Component_Interface>;
};

export type Map_Application_Component_Interface_Aggregate_Bool_Exp = {
  count?: InputMaybe<Map_Application_Component_Interface_Aggregate_Bool_Exp_Count>;
};

export type Map_Application_Component_Interface_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Map_Application_Component_Interface_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Map_Application_Component_Interface_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_application_component_interface" */
export type Map_Application_Component_Interface_Aggregate_Fields = {
  __typename?: 'map_application_component_interface_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Map_Application_Component_Interface_Max_Fields>;
  min?: Maybe<Map_Application_Component_Interface_Min_Fields>;
};


/** aggregate fields of "map_application_component_interface" */
export type Map_Application_Component_Interface_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Map_Application_Component_Interface_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_application_component_interface" */
export type Map_Application_Component_Interface_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Map_Application_Component_Interface_Max_Order_By>;
  min?: InputMaybe<Map_Application_Component_Interface_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_application_component_interface" */
export type Map_Application_Component_Interface_Arr_Rel_Insert_Input = {
  data: Array<Map_Application_Component_Interface_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Map_Application_Component_Interface_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_application_component_interface". All fields are combined with a logical 'AND'. */
export type Map_Application_Component_Interface_Bool_Exp = {
  _and?: InputMaybe<Array<Map_Application_Component_Interface_Bool_Exp>>;
  _not?: InputMaybe<Map_Application_Component_Interface_Bool_Exp>;
  _or?: InputMaybe<Array<Map_Application_Component_Interface_Bool_Exp>>;
  component?: InputMaybe<Components_Bool_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  interface?: InputMaybe<Interfaces_Bool_Exp>;
  interfaceId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_application_component_interface" */
export enum Map_Application_Component_Interface_Constraint {
  /** unique or primary key constraint on columns "interface_id", "component_id" */
  MapApplicationComponentInterfacePkey = 'map_application_component_interface_pkey'
}

/** input type for inserting data into table "map_application_component_interface" */
export type Map_Application_Component_Interface_Insert_Input = {
  component?: InputMaybe<Components_Obj_Rel_Insert_Input>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  interface?: InputMaybe<Interfaces_Obj_Rel_Insert_Input>;
  interfaceId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Map_Application_Component_Interface_Max_Fields = {
  __typename?: 'map_application_component_interface_max_fields';
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
export type Map_Application_Component_Interface_Max_Order_By = {
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
export type Map_Application_Component_Interface_Min_Fields = {
  __typename?: 'map_application_component_interface_min_fields';
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
export type Map_Application_Component_Interface_Min_Order_By = {
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
export type Map_Application_Component_Interface_Mutation_Response = {
  __typename?: 'map_application_component_interface_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Map_Application_Component_Interface>;
};

/** on_conflict condition type for table "map_application_component_interface" */
export type Map_Application_Component_Interface_On_Conflict = {
  constraint: Map_Application_Component_Interface_Constraint;
  update_columns?: Array<Map_Application_Component_Interface_Update_Column>;
  where?: InputMaybe<Map_Application_Component_Interface_Bool_Exp>;
};

/** Ordering options when selecting data from "map_application_component_interface". */
export type Map_Application_Component_Interface_Order_By = {
  component?: InputMaybe<Components_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  interface?: InputMaybe<Interfaces_Order_By>;
  interfaceId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_application_component_interface */
export type Map_Application_Component_Interface_Pk_Columns_Input = {
  componentId: Scalars['uuid']['input'];
  interfaceId: Scalars['uuid']['input'];
};

/** select columns of table "map_application_component_interface" */
export enum Map_Application_Component_Interface_Select_Column {
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
export type Map_Application_Component_Interface_Set_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  interfaceId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "map_application_component_interface" */
export type Map_Application_Component_Interface_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Map_Application_Component_Interface_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Map_Application_Component_Interface_Stream_Cursor_Value_Input = {
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
export enum Map_Application_Component_Interface_Update_Column {
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

export type Map_Application_Component_Interface_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Map_Application_Component_Interface_Set_Input>;
  /** filter the rows which have to be updated */
  where: Map_Application_Component_Interface_Bool_Exp;
};

/** columns and relationships of "map_application_component_product" */
export type Map_Application_Component_Product = {
  __typename?: 'map_application_component_product';
  /** An object relationship */
  component: Components;
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  product: Products;
  productId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_application_component_product" */
export type Map_Application_Component_Product_Aggregate = {
  __typename?: 'map_application_component_product_aggregate';
  aggregate?: Maybe<Map_Application_Component_Product_Aggregate_Fields>;
  nodes: Array<Map_Application_Component_Product>;
};

export type Map_Application_Component_Product_Aggregate_Bool_Exp = {
  count?: InputMaybe<Map_Application_Component_Product_Aggregate_Bool_Exp_Count>;
};

export type Map_Application_Component_Product_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Map_Application_Component_Product_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Map_Application_Component_Product_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_application_component_product" */
export type Map_Application_Component_Product_Aggregate_Fields = {
  __typename?: 'map_application_component_product_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Map_Application_Component_Product_Max_Fields>;
  min?: Maybe<Map_Application_Component_Product_Min_Fields>;
};


/** aggregate fields of "map_application_component_product" */
export type Map_Application_Component_Product_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Map_Application_Component_Product_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_application_component_product" */
export type Map_Application_Component_Product_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Map_Application_Component_Product_Max_Order_By>;
  min?: InputMaybe<Map_Application_Component_Product_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_application_component_product" */
export type Map_Application_Component_Product_Arr_Rel_Insert_Input = {
  data: Array<Map_Application_Component_Product_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Map_Application_Component_Product_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_application_component_product". All fields are combined with a logical 'AND'. */
export type Map_Application_Component_Product_Bool_Exp = {
  _and?: InputMaybe<Array<Map_Application_Component_Product_Bool_Exp>>;
  _not?: InputMaybe<Map_Application_Component_Product_Bool_Exp>;
  _or?: InputMaybe<Array<Map_Application_Component_Product_Bool_Exp>>;
  component?: InputMaybe<Components_Bool_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  product?: InputMaybe<Products_Bool_Exp>;
  productId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_application_component_product" */
export enum Map_Application_Component_Product_Constraint {
  /** unique or primary key constraint on columns "product_id", "component_id" */
  MapApplicationComponentProductPkey = 'map_application_component_product_pkey'
}

/** input type for inserting data into table "map_application_component_product" */
export type Map_Application_Component_Product_Insert_Input = {
  component?: InputMaybe<Components_Obj_Rel_Insert_Input>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  product?: InputMaybe<Products_Obj_Rel_Insert_Input>;
  productId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Map_Application_Component_Product_Max_Fields = {
  __typename?: 'map_application_component_product_max_fields';
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
export type Map_Application_Component_Product_Max_Order_By = {
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
export type Map_Application_Component_Product_Min_Fields = {
  __typename?: 'map_application_component_product_min_fields';
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
export type Map_Application_Component_Product_Min_Order_By = {
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
export type Map_Application_Component_Product_Mutation_Response = {
  __typename?: 'map_application_component_product_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Map_Application_Component_Product>;
};

/** on_conflict condition type for table "map_application_component_product" */
export type Map_Application_Component_Product_On_Conflict = {
  constraint: Map_Application_Component_Product_Constraint;
  update_columns?: Array<Map_Application_Component_Product_Update_Column>;
  where?: InputMaybe<Map_Application_Component_Product_Bool_Exp>;
};

/** Ordering options when selecting data from "map_application_component_product". */
export type Map_Application_Component_Product_Order_By = {
  component?: InputMaybe<Components_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  product?: InputMaybe<Products_Order_By>;
  productId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_application_component_product */
export type Map_Application_Component_Product_Pk_Columns_Input = {
  componentId: Scalars['uuid']['input'];
  productId: Scalars['uuid']['input'];
};

/** select columns of table "map_application_component_product" */
export enum Map_Application_Component_Product_Select_Column {
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
export type Map_Application_Component_Product_Set_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  productId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "map_application_component_product" */
export type Map_Application_Component_Product_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Map_Application_Component_Product_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Map_Application_Component_Product_Stream_Cursor_Value_Input = {
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
export enum Map_Application_Component_Product_Update_Column {
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

export type Map_Application_Component_Product_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Map_Application_Component_Product_Set_Input>;
  /** filter the rows which have to be updated */
  where: Map_Application_Component_Product_Bool_Exp;
};

/** columns and relationships of "map_application_component_stakeholder" */
export type Map_Application_Component_Stakeholder = {
  __typename?: 'map_application_component_stakeholder';
  /** An object relationship */
  component: Components;
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  role: Directories;
  roleId: Scalars['uuid']['output'];
  /** An object relationship */
  stakeholder: Stakeholders;
  stakeholderId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_application_component_stakeholder" */
export type Map_Application_Component_Stakeholder_Aggregate = {
  __typename?: 'map_application_component_stakeholder_aggregate';
  aggregate?: Maybe<Map_Application_Component_Stakeholder_Aggregate_Fields>;
  nodes: Array<Map_Application_Component_Stakeholder>;
};

export type Map_Application_Component_Stakeholder_Aggregate_Bool_Exp = {
  count?: InputMaybe<Map_Application_Component_Stakeholder_Aggregate_Bool_Exp_Count>;
};

export type Map_Application_Component_Stakeholder_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Map_Application_Component_Stakeholder_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Map_Application_Component_Stakeholder_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_application_component_stakeholder" */
export type Map_Application_Component_Stakeholder_Aggregate_Fields = {
  __typename?: 'map_application_component_stakeholder_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Map_Application_Component_Stakeholder_Max_Fields>;
  min?: Maybe<Map_Application_Component_Stakeholder_Min_Fields>;
};


/** aggregate fields of "map_application_component_stakeholder" */
export type Map_Application_Component_Stakeholder_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Map_Application_Component_Stakeholder_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_application_component_stakeholder" */
export type Map_Application_Component_Stakeholder_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Map_Application_Component_Stakeholder_Max_Order_By>;
  min?: InputMaybe<Map_Application_Component_Stakeholder_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_application_component_stakeholder" */
export type Map_Application_Component_Stakeholder_Arr_Rel_Insert_Input = {
  data: Array<Map_Application_Component_Stakeholder_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Map_Application_Component_Stakeholder_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_application_component_stakeholder". All fields are combined with a logical 'AND'. */
export type Map_Application_Component_Stakeholder_Bool_Exp = {
  _and?: InputMaybe<Array<Map_Application_Component_Stakeholder_Bool_Exp>>;
  _not?: InputMaybe<Map_Application_Component_Stakeholder_Bool_Exp>;
  _or?: InputMaybe<Array<Map_Application_Component_Stakeholder_Bool_Exp>>;
  component?: InputMaybe<Components_Bool_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  role?: InputMaybe<Directories_Bool_Exp>;
  roleId?: InputMaybe<Uuid_Comparison_Exp>;
  stakeholder?: InputMaybe<Stakeholders_Bool_Exp>;
  stakeholderId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_application_component_stakeholder" */
export enum Map_Application_Component_Stakeholder_Constraint {
  /** unique or primary key constraint on columns "component_id", "stakeholder_id", "role_id" */
  MapApplicationComponentStakeholderPkey = 'map_application_component_stakeholder_pkey'
}

/** input type for inserting data into table "map_application_component_stakeholder" */
export type Map_Application_Component_Stakeholder_Insert_Input = {
  component?: InputMaybe<Components_Obj_Rel_Insert_Input>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  role?: InputMaybe<Directories_Obj_Rel_Insert_Input>;
  roleId?: InputMaybe<Scalars['uuid']['input']>;
  stakeholder?: InputMaybe<Stakeholders_Obj_Rel_Insert_Input>;
  stakeholderId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Map_Application_Component_Stakeholder_Max_Fields = {
  __typename?: 'map_application_component_stakeholder_max_fields';
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
export type Map_Application_Component_Stakeholder_Max_Order_By = {
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
export type Map_Application_Component_Stakeholder_Min_Fields = {
  __typename?: 'map_application_component_stakeholder_min_fields';
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
export type Map_Application_Component_Stakeholder_Min_Order_By = {
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
export type Map_Application_Component_Stakeholder_Mutation_Response = {
  __typename?: 'map_application_component_stakeholder_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Map_Application_Component_Stakeholder>;
};

/** on_conflict condition type for table "map_application_component_stakeholder" */
export type Map_Application_Component_Stakeholder_On_Conflict = {
  constraint: Map_Application_Component_Stakeholder_Constraint;
  update_columns?: Array<Map_Application_Component_Stakeholder_Update_Column>;
  where?: InputMaybe<Map_Application_Component_Stakeholder_Bool_Exp>;
};

/** Ordering options when selecting data from "map_application_component_stakeholder". */
export type Map_Application_Component_Stakeholder_Order_By = {
  component?: InputMaybe<Components_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  role?: InputMaybe<Directories_Order_By>;
  roleId?: InputMaybe<Order_By>;
  stakeholder?: InputMaybe<Stakeholders_Order_By>;
  stakeholderId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_application_component_stakeholder */
export type Map_Application_Component_Stakeholder_Pk_Columns_Input = {
  componentId: Scalars['uuid']['input'];
  roleId: Scalars['uuid']['input'];
  stakeholderId: Scalars['uuid']['input'];
};

/** select columns of table "map_application_component_stakeholder" */
export enum Map_Application_Component_Stakeholder_Select_Column {
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
export type Map_Application_Component_Stakeholder_Set_Input = {
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

/** Streaming cursor of the table "map_application_component_stakeholder" */
export type Map_Application_Component_Stakeholder_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Map_Application_Component_Stakeholder_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Map_Application_Component_Stakeholder_Stream_Cursor_Value_Input = {
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
export enum Map_Application_Component_Stakeholder_Update_Column {
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

export type Map_Application_Component_Stakeholder_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Map_Application_Component_Stakeholder_Set_Input>;
  /** filter the rows which have to be updated */
  where: Map_Application_Component_Stakeholder_Bool_Exp;
};

/** columns and relationships of "map_application_component_system_software" */
export type Map_Application_Component_System_Software = {
  __typename?: 'map_application_component_system_software';
  /** An object relationship */
  component: Components;
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  kind: Scalars['system_software_kind_enum']['output'];
  /** An object relationship */
  systemSoftware: System_Software;
  systemSoftwareId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_application_component_system_software" */
export type Map_Application_Component_System_Software_Aggregate = {
  __typename?: 'map_application_component_system_software_aggregate';
  aggregate?: Maybe<Map_Application_Component_System_Software_Aggregate_Fields>;
  nodes: Array<Map_Application_Component_System_Software>;
};

export type Map_Application_Component_System_Software_Aggregate_Bool_Exp = {
  count?: InputMaybe<Map_Application_Component_System_Software_Aggregate_Bool_Exp_Count>;
};

export type Map_Application_Component_System_Software_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Map_Application_Component_System_Software_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Map_Application_Component_System_Software_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_application_component_system_software" */
export type Map_Application_Component_System_Software_Aggregate_Fields = {
  __typename?: 'map_application_component_system_software_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Map_Application_Component_System_Software_Max_Fields>;
  min?: Maybe<Map_Application_Component_System_Software_Min_Fields>;
};


/** aggregate fields of "map_application_component_system_software" */
export type Map_Application_Component_System_Software_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Map_Application_Component_System_Software_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_application_component_system_software" */
export type Map_Application_Component_System_Software_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Map_Application_Component_System_Software_Max_Order_By>;
  min?: InputMaybe<Map_Application_Component_System_Software_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_application_component_system_software" */
export type Map_Application_Component_System_Software_Arr_Rel_Insert_Input = {
  data: Array<Map_Application_Component_System_Software_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Map_Application_Component_System_Software_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_application_component_system_software". All fields are combined with a logical 'AND'. */
export type Map_Application_Component_System_Software_Bool_Exp = {
  _and?: InputMaybe<Array<Map_Application_Component_System_Software_Bool_Exp>>;
  _not?: InputMaybe<Map_Application_Component_System_Software_Bool_Exp>;
  _or?: InputMaybe<Array<Map_Application_Component_System_Software_Bool_Exp>>;
  component?: InputMaybe<Components_Bool_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  kind?: InputMaybe<System_Software_Kind_Enum_Comparison_Exp>;
  systemSoftware?: InputMaybe<System_Software_Bool_Exp>;
  systemSoftwareId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_application_component_system_software" */
export enum Map_Application_Component_System_Software_Constraint {
  /** unique or primary key constraint on columns "system_software_id", "component_id" */
  MapApplicationComponentSystemSoftwarePkey = 'map_application_component_system_software_pkey'
}

/** input type for inserting data into table "map_application_component_system_software" */
export type Map_Application_Component_System_Software_Insert_Input = {
  component?: InputMaybe<Components_Obj_Rel_Insert_Input>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  kind?: InputMaybe<Scalars['system_software_kind_enum']['input']>;
  systemSoftware?: InputMaybe<System_Software_Obj_Rel_Insert_Input>;
  systemSoftwareId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Map_Application_Component_System_Software_Max_Fields = {
  __typename?: 'map_application_component_system_software_max_fields';
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
export type Map_Application_Component_System_Software_Max_Order_By = {
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
export type Map_Application_Component_System_Software_Min_Fields = {
  __typename?: 'map_application_component_system_software_min_fields';
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
export type Map_Application_Component_System_Software_Min_Order_By = {
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
export type Map_Application_Component_System_Software_Mutation_Response = {
  __typename?: 'map_application_component_system_software_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Map_Application_Component_System_Software>;
};

/** on_conflict condition type for table "map_application_component_system_software" */
export type Map_Application_Component_System_Software_On_Conflict = {
  constraint: Map_Application_Component_System_Software_Constraint;
  update_columns?: Array<Map_Application_Component_System_Software_Update_Column>;
  where?: InputMaybe<Map_Application_Component_System_Software_Bool_Exp>;
};

/** Ordering options when selecting data from "map_application_component_system_software". */
export type Map_Application_Component_System_Software_Order_By = {
  component?: InputMaybe<Components_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  systemSoftware?: InputMaybe<System_Software_Order_By>;
  systemSoftwareId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_application_component_system_software */
export type Map_Application_Component_System_Software_Pk_Columns_Input = {
  componentId: Scalars['uuid']['input'];
  systemSoftwareId: Scalars['uuid']['input'];
};

/** select columns of table "map_application_component_system_software" */
export enum Map_Application_Component_System_Software_Select_Column {
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
export type Map_Application_Component_System_Software_Set_Input = {
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

/** Streaming cursor of the table "map_application_component_system_software" */
export type Map_Application_Component_System_Software_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Map_Application_Component_System_Software_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Map_Application_Component_System_Software_Stream_Cursor_Value_Input = {
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
export enum Map_Application_Component_System_Software_Update_Column {
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

export type Map_Application_Component_System_Software_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Map_Application_Component_System_Software_Set_Input>;
  /** filter the rows which have to be updated */
  where: Map_Application_Component_System_Software_Bool_Exp;
};

/** columns and relationships of "map_application_component_technology_logical_network" */
export type Map_Application_Component_Technology_Logical_Network = {
  __typename?: 'map_application_component_technology_logical_network';
  /** An object relationship */
  component: Components;
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  logicalNetwork: Technology_Networks;
  logicalNetworkId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_application_component_technology_logical_network" */
export type Map_Application_Component_Technology_Logical_Network_Aggregate = {
  __typename?: 'map_application_component_technology_logical_network_aggregate';
  aggregate?: Maybe<Map_Application_Component_Technology_Logical_Network_Aggregate_Fields>;
  nodes: Array<Map_Application_Component_Technology_Logical_Network>;
};

export type Map_Application_Component_Technology_Logical_Network_Aggregate_Bool_Exp = {
  count?: InputMaybe<Map_Application_Component_Technology_Logical_Network_Aggregate_Bool_Exp_Count>;
};

export type Map_Application_Component_Technology_Logical_Network_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Map_Application_Component_Technology_Logical_Network_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Map_Application_Component_Technology_Logical_Network_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_application_component_technology_logical_network" */
export type Map_Application_Component_Technology_Logical_Network_Aggregate_Fields = {
  __typename?: 'map_application_component_technology_logical_network_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Map_Application_Component_Technology_Logical_Network_Max_Fields>;
  min?: Maybe<Map_Application_Component_Technology_Logical_Network_Min_Fields>;
};


/** aggregate fields of "map_application_component_technology_logical_network" */
export type Map_Application_Component_Technology_Logical_Network_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Map_Application_Component_Technology_Logical_Network_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_application_component_technology_logical_network" */
export type Map_Application_Component_Technology_Logical_Network_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Map_Application_Component_Technology_Logical_Network_Max_Order_By>;
  min?: InputMaybe<Map_Application_Component_Technology_Logical_Network_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_application_component_technology_logical_network" */
export type Map_Application_Component_Technology_Logical_Network_Arr_Rel_Insert_Input = {
  data: Array<Map_Application_Component_Technology_Logical_Network_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Map_Application_Component_Technology_Logical_Network_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_application_component_technology_logical_network". All fields are combined with a logical 'AND'. */
export type Map_Application_Component_Technology_Logical_Network_Bool_Exp = {
  _and?: InputMaybe<Array<Map_Application_Component_Technology_Logical_Network_Bool_Exp>>;
  _not?: InputMaybe<Map_Application_Component_Technology_Logical_Network_Bool_Exp>;
  _or?: InputMaybe<Array<Map_Application_Component_Technology_Logical_Network_Bool_Exp>>;
  component?: InputMaybe<Components_Bool_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  logicalNetwork?: InputMaybe<Technology_Networks_Bool_Exp>;
  logicalNetworkId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_application_component_technology_logical_network" */
export enum Map_Application_Component_Technology_Logical_Network_Constraint {
  /** unique or primary key constraint on columns "logical_network_id", "component_id" */
  MapApplicationComponentTechnologyLogicalNetworkPkey = 'map_application_component_technology_logical_network_pkey'
}

/** input type for inserting data into table "map_application_component_technology_logical_network" */
export type Map_Application_Component_Technology_Logical_Network_Insert_Input = {
  component?: InputMaybe<Components_Obj_Rel_Insert_Input>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  logicalNetwork?: InputMaybe<Technology_Networks_Obj_Rel_Insert_Input>;
  logicalNetworkId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Map_Application_Component_Technology_Logical_Network_Max_Fields = {
  __typename?: 'map_application_component_technology_logical_network_max_fields';
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
export type Map_Application_Component_Technology_Logical_Network_Max_Order_By = {
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
export type Map_Application_Component_Technology_Logical_Network_Min_Fields = {
  __typename?: 'map_application_component_technology_logical_network_min_fields';
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
export type Map_Application_Component_Technology_Logical_Network_Min_Order_By = {
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
export type Map_Application_Component_Technology_Logical_Network_Mutation_Response = {
  __typename?: 'map_application_component_technology_logical_network_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Map_Application_Component_Technology_Logical_Network>;
};

/** on_conflict condition type for table "map_application_component_technology_logical_network" */
export type Map_Application_Component_Technology_Logical_Network_On_Conflict = {
  constraint: Map_Application_Component_Technology_Logical_Network_Constraint;
  update_columns?: Array<Map_Application_Component_Technology_Logical_Network_Update_Column>;
  where?: InputMaybe<Map_Application_Component_Technology_Logical_Network_Bool_Exp>;
};

/** Ordering options when selecting data from "map_application_component_technology_logical_network". */
export type Map_Application_Component_Technology_Logical_Network_Order_By = {
  component?: InputMaybe<Components_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  logicalNetwork?: InputMaybe<Technology_Networks_Order_By>;
  logicalNetworkId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_application_component_technology_logical_network */
export type Map_Application_Component_Technology_Logical_Network_Pk_Columns_Input = {
  componentId: Scalars['uuid']['input'];
  logicalNetworkId: Scalars['uuid']['input'];
};

/** select columns of table "map_application_component_technology_logical_network" */
export enum Map_Application_Component_Technology_Logical_Network_Select_Column {
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
export type Map_Application_Component_Technology_Logical_Network_Set_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  logicalNetworkId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "map_application_component_technology_logical_network" */
export type Map_Application_Component_Technology_Logical_Network_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Map_Application_Component_Technology_Logical_Network_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Map_Application_Component_Technology_Logical_Network_Stream_Cursor_Value_Input = {
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
export enum Map_Application_Component_Technology_Logical_Network_Update_Column {
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

export type Map_Application_Component_Technology_Logical_Network_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Map_Application_Component_Technology_Logical_Network_Set_Input>;
  /** filter the rows which have to be updated */
  where: Map_Application_Component_Technology_Logical_Network_Bool_Exp;
};

/** columns and relationships of "map_application_component_technology_node" */
export type Map_Application_Component_Technology_Node = {
  __typename?: 'map_application_component_technology_node';
  /** An object relationship */
  component: Components;
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  node: Technology_Nodes;
  nodeId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_application_component_technology_node" */
export type Map_Application_Component_Technology_Node_Aggregate = {
  __typename?: 'map_application_component_technology_node_aggregate';
  aggregate?: Maybe<Map_Application_Component_Technology_Node_Aggregate_Fields>;
  nodes: Array<Map_Application_Component_Technology_Node>;
};

export type Map_Application_Component_Technology_Node_Aggregate_Bool_Exp = {
  count?: InputMaybe<Map_Application_Component_Technology_Node_Aggregate_Bool_Exp_Count>;
};

export type Map_Application_Component_Technology_Node_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Map_Application_Component_Technology_Node_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Map_Application_Component_Technology_Node_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_application_component_technology_node" */
export type Map_Application_Component_Technology_Node_Aggregate_Fields = {
  __typename?: 'map_application_component_technology_node_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Map_Application_Component_Technology_Node_Max_Fields>;
  min?: Maybe<Map_Application_Component_Technology_Node_Min_Fields>;
};


/** aggregate fields of "map_application_component_technology_node" */
export type Map_Application_Component_Technology_Node_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Map_Application_Component_Technology_Node_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_application_component_technology_node" */
export type Map_Application_Component_Technology_Node_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Map_Application_Component_Technology_Node_Max_Order_By>;
  min?: InputMaybe<Map_Application_Component_Technology_Node_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_application_component_technology_node" */
export type Map_Application_Component_Technology_Node_Arr_Rel_Insert_Input = {
  data: Array<Map_Application_Component_Technology_Node_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Map_Application_Component_Technology_Node_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_application_component_technology_node". All fields are combined with a logical 'AND'. */
export type Map_Application_Component_Technology_Node_Bool_Exp = {
  _and?: InputMaybe<Array<Map_Application_Component_Technology_Node_Bool_Exp>>;
  _not?: InputMaybe<Map_Application_Component_Technology_Node_Bool_Exp>;
  _or?: InputMaybe<Array<Map_Application_Component_Technology_Node_Bool_Exp>>;
  component?: InputMaybe<Components_Bool_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  node?: InputMaybe<Technology_Nodes_Bool_Exp>;
  nodeId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_application_component_technology_node" */
export enum Map_Application_Component_Technology_Node_Constraint {
  /** unique or primary key constraint on columns "node_id", "component_id" */
  MapApplicationComponentTechnologyNodePkey = 'map_application_component_technology_node_pkey'
}

/** input type for inserting data into table "map_application_component_technology_node" */
export type Map_Application_Component_Technology_Node_Insert_Input = {
  component?: InputMaybe<Components_Obj_Rel_Insert_Input>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  node?: InputMaybe<Technology_Nodes_Obj_Rel_Insert_Input>;
  nodeId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Map_Application_Component_Technology_Node_Max_Fields = {
  __typename?: 'map_application_component_technology_node_max_fields';
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
export type Map_Application_Component_Technology_Node_Max_Order_By = {
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
export type Map_Application_Component_Technology_Node_Min_Fields = {
  __typename?: 'map_application_component_technology_node_min_fields';
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
export type Map_Application_Component_Technology_Node_Min_Order_By = {
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
export type Map_Application_Component_Technology_Node_Mutation_Response = {
  __typename?: 'map_application_component_technology_node_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Map_Application_Component_Technology_Node>;
};

/** on_conflict condition type for table "map_application_component_technology_node" */
export type Map_Application_Component_Technology_Node_On_Conflict = {
  constraint: Map_Application_Component_Technology_Node_Constraint;
  update_columns?: Array<Map_Application_Component_Technology_Node_Update_Column>;
  where?: InputMaybe<Map_Application_Component_Technology_Node_Bool_Exp>;
};

/** Ordering options when selecting data from "map_application_component_technology_node". */
export type Map_Application_Component_Technology_Node_Order_By = {
  component?: InputMaybe<Components_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  node?: InputMaybe<Technology_Nodes_Order_By>;
  nodeId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_application_component_technology_node */
export type Map_Application_Component_Technology_Node_Pk_Columns_Input = {
  componentId: Scalars['uuid']['input'];
  nodeId: Scalars['uuid']['input'];
};

/** select columns of table "map_application_component_technology_node" */
export enum Map_Application_Component_Technology_Node_Select_Column {
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
export type Map_Application_Component_Technology_Node_Set_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  nodeId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "map_application_component_technology_node" */
export type Map_Application_Component_Technology_Node_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Map_Application_Component_Technology_Node_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Map_Application_Component_Technology_Node_Stream_Cursor_Value_Input = {
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
export enum Map_Application_Component_Technology_Node_Update_Column {
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

export type Map_Application_Component_Technology_Node_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Map_Application_Component_Technology_Node_Set_Input>;
  /** filter the rows which have to be updated */
  where: Map_Application_Component_Technology_Node_Bool_Exp;
};

/** columns and relationships of "map_application_function_data_object" */
export type Map_Application_Function_Data_Object = {
  __typename?: 'map_application_function_data_object';
  accessKind: Scalars['data_access_kind_enum']['output'];
  /** An object relationship */
  component: Components;
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  dataObject: Data_Objects;
  dataObjectId: Scalars['uuid']['output'];
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  functionId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_application_function_data_object" */
export type Map_Application_Function_Data_Object_Aggregate = {
  __typename?: 'map_application_function_data_object_aggregate';
  aggregate?: Maybe<Map_Application_Function_Data_Object_Aggregate_Fields>;
  nodes: Array<Map_Application_Function_Data_Object>;
};

export type Map_Application_Function_Data_Object_Aggregate_Bool_Exp = {
  count?: InputMaybe<Map_Application_Function_Data_Object_Aggregate_Bool_Exp_Count>;
};

export type Map_Application_Function_Data_Object_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Map_Application_Function_Data_Object_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Map_Application_Function_Data_Object_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_application_function_data_object" */
export type Map_Application_Function_Data_Object_Aggregate_Fields = {
  __typename?: 'map_application_function_data_object_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Map_Application_Function_Data_Object_Max_Fields>;
  min?: Maybe<Map_Application_Function_Data_Object_Min_Fields>;
};


/** aggregate fields of "map_application_function_data_object" */
export type Map_Application_Function_Data_Object_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Map_Application_Function_Data_Object_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_application_function_data_object" */
export type Map_Application_Function_Data_Object_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Map_Application_Function_Data_Object_Max_Order_By>;
  min?: InputMaybe<Map_Application_Function_Data_Object_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_application_function_data_object" */
export type Map_Application_Function_Data_Object_Arr_Rel_Insert_Input = {
  data: Array<Map_Application_Function_Data_Object_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Map_Application_Function_Data_Object_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_application_function_data_object". All fields are combined with a logical 'AND'. */
export type Map_Application_Function_Data_Object_Bool_Exp = {
  _and?: InputMaybe<Array<Map_Application_Function_Data_Object_Bool_Exp>>;
  _not?: InputMaybe<Map_Application_Function_Data_Object_Bool_Exp>;
  _or?: InputMaybe<Array<Map_Application_Function_Data_Object_Bool_Exp>>;
  accessKind?: InputMaybe<Data_Access_Kind_Enum_Comparison_Exp>;
  component?: InputMaybe<Components_Bool_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  dataObject?: InputMaybe<Data_Objects_Bool_Exp>;
  dataObjectId?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  functionId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_application_function_data_object" */
export enum Map_Application_Function_Data_Object_Constraint {
  /** unique or primary key constraint on columns "data_object_id", "component_id", "function_id" */
  MapApplicationFunctionDataObjectPkey = 'map_application_function_data_object_pkey'
}

/** input type for inserting data into table "map_application_function_data_object" */
export type Map_Application_Function_Data_Object_Insert_Input = {
  accessKind?: InputMaybe<Scalars['data_access_kind_enum']['input']>;
  component?: InputMaybe<Components_Obj_Rel_Insert_Input>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  dataObject?: InputMaybe<Data_Objects_Obj_Rel_Insert_Input>;
  dataObjectId?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  functionId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Map_Application_Function_Data_Object_Max_Fields = {
  __typename?: 'map_application_function_data_object_max_fields';
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
export type Map_Application_Function_Data_Object_Max_Order_By = {
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
export type Map_Application_Function_Data_Object_Min_Fields = {
  __typename?: 'map_application_function_data_object_min_fields';
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
export type Map_Application_Function_Data_Object_Min_Order_By = {
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
export type Map_Application_Function_Data_Object_Mutation_Response = {
  __typename?: 'map_application_function_data_object_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Map_Application_Function_Data_Object>;
};

/** on_conflict condition type for table "map_application_function_data_object" */
export type Map_Application_Function_Data_Object_On_Conflict = {
  constraint: Map_Application_Function_Data_Object_Constraint;
  update_columns?: Array<Map_Application_Function_Data_Object_Update_Column>;
  where?: InputMaybe<Map_Application_Function_Data_Object_Bool_Exp>;
};

/** Ordering options when selecting data from "map_application_function_data_object". */
export type Map_Application_Function_Data_Object_Order_By = {
  accessKind?: InputMaybe<Order_By>;
  component?: InputMaybe<Components_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  dataObject?: InputMaybe<Data_Objects_Order_By>;
  dataObjectId?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  functionId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_application_function_data_object */
export type Map_Application_Function_Data_Object_Pk_Columns_Input = {
  componentId: Scalars['uuid']['input'];
  dataObjectId: Scalars['uuid']['input'];
  functionId: Scalars['uuid']['input'];
};

/** select columns of table "map_application_function_data_object" */
export enum Map_Application_Function_Data_Object_Select_Column {
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
export type Map_Application_Function_Data_Object_Set_Input = {
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

/** Streaming cursor of the table "map_application_function_data_object" */
export type Map_Application_Function_Data_Object_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Map_Application_Function_Data_Object_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Map_Application_Function_Data_Object_Stream_Cursor_Value_Input = {
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
export enum Map_Application_Function_Data_Object_Update_Column {
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

export type Map_Application_Function_Data_Object_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Map_Application_Function_Data_Object_Set_Input>;
  /** filter the rows which have to be updated */
  where: Map_Application_Function_Data_Object_Bool_Exp;
};

/** columns and relationships of "map_application_interface_function" */
export type Map_Application_Interface_Function = {
  __typename?: 'map_application_interface_function';
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  functionId: Scalars['uuid']['output'];
  /** An object relationship */
  interface: Interfaces;
  interfaceId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_application_interface_function" */
export type Map_Application_Interface_Function_Aggregate = {
  __typename?: 'map_application_interface_function_aggregate';
  aggregate?: Maybe<Map_Application_Interface_Function_Aggregate_Fields>;
  nodes: Array<Map_Application_Interface_Function>;
};

export type Map_Application_Interface_Function_Aggregate_Bool_Exp = {
  count?: InputMaybe<Map_Application_Interface_Function_Aggregate_Bool_Exp_Count>;
};

export type Map_Application_Interface_Function_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Map_Application_Interface_Function_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Map_Application_Interface_Function_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_application_interface_function" */
export type Map_Application_Interface_Function_Aggregate_Fields = {
  __typename?: 'map_application_interface_function_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Map_Application_Interface_Function_Max_Fields>;
  min?: Maybe<Map_Application_Interface_Function_Min_Fields>;
};


/** aggregate fields of "map_application_interface_function" */
export type Map_Application_Interface_Function_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Map_Application_Interface_Function_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_application_interface_function" */
export type Map_Application_Interface_Function_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Map_Application_Interface_Function_Max_Order_By>;
  min?: InputMaybe<Map_Application_Interface_Function_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_application_interface_function" */
export type Map_Application_Interface_Function_Arr_Rel_Insert_Input = {
  data: Array<Map_Application_Interface_Function_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Map_Application_Interface_Function_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_application_interface_function". All fields are combined with a logical 'AND'. */
export type Map_Application_Interface_Function_Bool_Exp = {
  _and?: InputMaybe<Array<Map_Application_Interface_Function_Bool_Exp>>;
  _not?: InputMaybe<Map_Application_Interface_Function_Bool_Exp>;
  _or?: InputMaybe<Array<Map_Application_Interface_Function_Bool_Exp>>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  functionId?: InputMaybe<Uuid_Comparison_Exp>;
  interface?: InputMaybe<Interfaces_Bool_Exp>;
  interfaceId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_application_interface_function" */
export enum Map_Application_Interface_Function_Constraint {
  /** unique or primary key constraint on columns "interface_id", "component_id", "function_id" */
  MapApplicationInterfaceFunctionPkey = 'map_application_interface_function_pkey'
}

/** input type for inserting data into table "map_application_interface_function" */
export type Map_Application_Interface_Function_Insert_Input = {
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  functionId?: InputMaybe<Scalars['uuid']['input']>;
  interface?: InputMaybe<Interfaces_Obj_Rel_Insert_Input>;
  interfaceId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Map_Application_Interface_Function_Max_Fields = {
  __typename?: 'map_application_interface_function_max_fields';
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
export type Map_Application_Interface_Function_Max_Order_By = {
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
export type Map_Application_Interface_Function_Min_Fields = {
  __typename?: 'map_application_interface_function_min_fields';
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
export type Map_Application_Interface_Function_Min_Order_By = {
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
export type Map_Application_Interface_Function_Mutation_Response = {
  __typename?: 'map_application_interface_function_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Map_Application_Interface_Function>;
};

/** on_conflict condition type for table "map_application_interface_function" */
export type Map_Application_Interface_Function_On_Conflict = {
  constraint: Map_Application_Interface_Function_Constraint;
  update_columns?: Array<Map_Application_Interface_Function_Update_Column>;
  where?: InputMaybe<Map_Application_Interface_Function_Bool_Exp>;
};

/** Ordering options when selecting data from "map_application_interface_function". */
export type Map_Application_Interface_Function_Order_By = {
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  functionId?: InputMaybe<Order_By>;
  interface?: InputMaybe<Interfaces_Order_By>;
  interfaceId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_application_interface_function */
export type Map_Application_Interface_Function_Pk_Columns_Input = {
  componentId: Scalars['uuid']['input'];
  functionId: Scalars['uuid']['input'];
  interfaceId: Scalars['uuid']['input'];
};

/** select columns of table "map_application_interface_function" */
export enum Map_Application_Interface_Function_Select_Column {
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
export type Map_Application_Interface_Function_Set_Input = {
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

/** Streaming cursor of the table "map_application_interface_function" */
export type Map_Application_Interface_Function_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Map_Application_Interface_Function_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Map_Application_Interface_Function_Stream_Cursor_Value_Input = {
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
export enum Map_Application_Interface_Function_Update_Column {
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

export type Map_Application_Interface_Function_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Map_Application_Interface_Function_Set_Input>;
  /** filter the rows which have to be updated */
  where: Map_Application_Interface_Function_Bool_Exp;
};

/** columns and relationships of "map_business_actor_role" */
export type Map_Business_Actor_Role = {
  __typename?: 'map_business_actor_role';
  /** An object relationship */
  actor: Actors;
  actorId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  role: Roles;
  roleId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_business_actor_role" */
export type Map_Business_Actor_Role_Aggregate = {
  __typename?: 'map_business_actor_role_aggregate';
  aggregate?: Maybe<Map_Business_Actor_Role_Aggregate_Fields>;
  nodes: Array<Map_Business_Actor_Role>;
};

export type Map_Business_Actor_Role_Aggregate_Bool_Exp = {
  count?: InputMaybe<Map_Business_Actor_Role_Aggregate_Bool_Exp_Count>;
};

export type Map_Business_Actor_Role_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Map_Business_Actor_Role_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Map_Business_Actor_Role_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_business_actor_role" */
export type Map_Business_Actor_Role_Aggregate_Fields = {
  __typename?: 'map_business_actor_role_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Map_Business_Actor_Role_Max_Fields>;
  min?: Maybe<Map_Business_Actor_Role_Min_Fields>;
};


/** aggregate fields of "map_business_actor_role" */
export type Map_Business_Actor_Role_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Map_Business_Actor_Role_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_business_actor_role" */
export type Map_Business_Actor_Role_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Map_Business_Actor_Role_Max_Order_By>;
  min?: InputMaybe<Map_Business_Actor_Role_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_business_actor_role" */
export type Map_Business_Actor_Role_Arr_Rel_Insert_Input = {
  data: Array<Map_Business_Actor_Role_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Map_Business_Actor_Role_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_business_actor_role". All fields are combined with a logical 'AND'. */
export type Map_Business_Actor_Role_Bool_Exp = {
  _and?: InputMaybe<Array<Map_Business_Actor_Role_Bool_Exp>>;
  _not?: InputMaybe<Map_Business_Actor_Role_Bool_Exp>;
  _or?: InputMaybe<Array<Map_Business_Actor_Role_Bool_Exp>>;
  actor?: InputMaybe<Actors_Bool_Exp>;
  actorId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  role?: InputMaybe<Roles_Bool_Exp>;
  roleId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_business_actor_role" */
export enum Map_Business_Actor_Role_Constraint {
  /** unique or primary key constraint on columns "actor_id", "role_id" */
  MapBusinessActorRoleActorIdRoleIdUnique = 'map_business_actor_role_actor_id_role_id_unique',
  /** unique or primary key constraint on columns "actor_id", "role_id" */
  MapBusinessActorRolePkey = 'map_business_actor_role_pkey'
}

/** input type for inserting data into table "map_business_actor_role" */
export type Map_Business_Actor_Role_Insert_Input = {
  actor?: InputMaybe<Actors_Obj_Rel_Insert_Input>;
  actorId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  role?: InputMaybe<Roles_Obj_Rel_Insert_Input>;
  roleId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Map_Business_Actor_Role_Max_Fields = {
  __typename?: 'map_business_actor_role_max_fields';
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
export type Map_Business_Actor_Role_Max_Order_By = {
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
export type Map_Business_Actor_Role_Min_Fields = {
  __typename?: 'map_business_actor_role_min_fields';
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
export type Map_Business_Actor_Role_Min_Order_By = {
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
export type Map_Business_Actor_Role_Mutation_Response = {
  __typename?: 'map_business_actor_role_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Map_Business_Actor_Role>;
};

/** on_conflict condition type for table "map_business_actor_role" */
export type Map_Business_Actor_Role_On_Conflict = {
  constraint: Map_Business_Actor_Role_Constraint;
  update_columns?: Array<Map_Business_Actor_Role_Update_Column>;
  where?: InputMaybe<Map_Business_Actor_Role_Bool_Exp>;
};

/** Ordering options when selecting data from "map_business_actor_role". */
export type Map_Business_Actor_Role_Order_By = {
  actor?: InputMaybe<Actors_Order_By>;
  actorId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  role?: InputMaybe<Roles_Order_By>;
  roleId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_business_actor_role */
export type Map_Business_Actor_Role_Pk_Columns_Input = {
  actorId: Scalars['uuid']['input'];
  roleId: Scalars['uuid']['input'];
};

/** select columns of table "map_business_actor_role" */
export enum Map_Business_Actor_Role_Select_Column {
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
export type Map_Business_Actor_Role_Set_Input = {
  actorId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  roleId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "map_business_actor_role" */
export type Map_Business_Actor_Role_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Map_Business_Actor_Role_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Map_Business_Actor_Role_Stream_Cursor_Value_Input = {
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
export enum Map_Business_Actor_Role_Update_Column {
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

export type Map_Business_Actor_Role_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Map_Business_Actor_Role_Set_Input>;
  /** filter the rows which have to be updated */
  where: Map_Business_Actor_Role_Bool_Exp;
};

/** columns and relationships of "map_directory_items" */
export type Map_Directory_Items = {
  __typename?: 'map_directory_items';
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  source: Directories;
  sourceId: Scalars['uuid']['output'];
  /** An object relationship */
  target: Directories;
  targetId: Scalars['uuid']['output'];
  type: Scalars['directory_link_type_enum']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_directory_items" */
export type Map_Directory_Items_Aggregate = {
  __typename?: 'map_directory_items_aggregate';
  aggregate?: Maybe<Map_Directory_Items_Aggregate_Fields>;
  nodes: Array<Map_Directory_Items>;
};

/** aggregate fields of "map_directory_items" */
export type Map_Directory_Items_Aggregate_Fields = {
  __typename?: 'map_directory_items_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Map_Directory_Items_Max_Fields>;
  min?: Maybe<Map_Directory_Items_Min_Fields>;
};


/** aggregate fields of "map_directory_items" */
export type Map_Directory_Items_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Map_Directory_Items_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "map_directory_items". All fields are combined with a logical 'AND'. */
export type Map_Directory_Items_Bool_Exp = {
  _and?: InputMaybe<Array<Map_Directory_Items_Bool_Exp>>;
  _not?: InputMaybe<Map_Directory_Items_Bool_Exp>;
  _or?: InputMaybe<Array<Map_Directory_Items_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  source?: InputMaybe<Directories_Bool_Exp>;
  sourceId?: InputMaybe<Uuid_Comparison_Exp>;
  target?: InputMaybe<Directories_Bool_Exp>;
  targetId?: InputMaybe<Uuid_Comparison_Exp>;
  type?: InputMaybe<Directory_Link_Type_Enum_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_directory_items" */
export enum Map_Directory_Items_Constraint {
  /** unique or primary key constraint on columns "target_id", "source_id" */
  MapDirectoryItemsPkey = 'map_directory_items_pkey',
  /** unique or primary key constraint on columns "target_id", "source_id" */
  MapDirectoryItemsSourceIdTargetIdUnique = 'map_directory_items_source_id_target_id_unique'
}

/** input type for inserting data into table "map_directory_items" */
export type Map_Directory_Items_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  source?: InputMaybe<Directories_Obj_Rel_Insert_Input>;
  sourceId?: InputMaybe<Scalars['uuid']['input']>;
  target?: InputMaybe<Directories_Obj_Rel_Insert_Input>;
  targetId?: InputMaybe<Scalars['uuid']['input']>;
  type?: InputMaybe<Scalars['directory_link_type_enum']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Map_Directory_Items_Max_Fields = {
  __typename?: 'map_directory_items_max_fields';
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

/** aggregate min on columns */
export type Map_Directory_Items_Min_Fields = {
  __typename?: 'map_directory_items_min_fields';
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

/** response of any mutation on the table "map_directory_items" */
export type Map_Directory_Items_Mutation_Response = {
  __typename?: 'map_directory_items_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Map_Directory_Items>;
};

/** on_conflict condition type for table "map_directory_items" */
export type Map_Directory_Items_On_Conflict = {
  constraint: Map_Directory_Items_Constraint;
  update_columns?: Array<Map_Directory_Items_Update_Column>;
  where?: InputMaybe<Map_Directory_Items_Bool_Exp>;
};

/** Ordering options when selecting data from "map_directory_items". */
export type Map_Directory_Items_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  source?: InputMaybe<Directories_Order_By>;
  sourceId?: InputMaybe<Order_By>;
  target?: InputMaybe<Directories_Order_By>;
  targetId?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_directory_items */
export type Map_Directory_Items_Pk_Columns_Input = {
  sourceId: Scalars['uuid']['input'];
  targetId: Scalars['uuid']['input'];
};

/** select columns of table "map_directory_items" */
export enum Map_Directory_Items_Select_Column {
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
export type Map_Directory_Items_Set_Input = {
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

/** Streaming cursor of the table "map_directory_items" */
export type Map_Directory_Items_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Map_Directory_Items_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Map_Directory_Items_Stream_Cursor_Value_Input = {
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
export enum Map_Directory_Items_Update_Column {
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

export type Map_Directory_Items_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Map_Directory_Items_Set_Input>;
  /** filter the rows which have to be updated */
  where: Map_Directory_Items_Bool_Exp;
};

/** columns and relationships of "map_solution_application_component" */
export type Map_Solution_Application_Component = {
  __typename?: 'map_solution_application_component';
  /** An object relationship */
  component: Components;
  componentId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  solution: Solutions;
  solutionId: Scalars['uuid']['output'];
  state: Scalars['solution_item_state']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_solution_application_component" */
export type Map_Solution_Application_Component_Aggregate = {
  __typename?: 'map_solution_application_component_aggregate';
  aggregate?: Maybe<Map_Solution_Application_Component_Aggregate_Fields>;
  nodes: Array<Map_Solution_Application_Component>;
};

export type Map_Solution_Application_Component_Aggregate_Bool_Exp = {
  count?: InputMaybe<Map_Solution_Application_Component_Aggregate_Bool_Exp_Count>;
};

export type Map_Solution_Application_Component_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Map_Solution_Application_Component_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Map_Solution_Application_Component_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_solution_application_component" */
export type Map_Solution_Application_Component_Aggregate_Fields = {
  __typename?: 'map_solution_application_component_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Map_Solution_Application_Component_Max_Fields>;
  min?: Maybe<Map_Solution_Application_Component_Min_Fields>;
};


/** aggregate fields of "map_solution_application_component" */
export type Map_Solution_Application_Component_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Map_Solution_Application_Component_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_solution_application_component" */
export type Map_Solution_Application_Component_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Map_Solution_Application_Component_Max_Order_By>;
  min?: InputMaybe<Map_Solution_Application_Component_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_solution_application_component" */
export type Map_Solution_Application_Component_Arr_Rel_Insert_Input = {
  data: Array<Map_Solution_Application_Component_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Map_Solution_Application_Component_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_solution_application_component". All fields are combined with a logical 'AND'. */
export type Map_Solution_Application_Component_Bool_Exp = {
  _and?: InputMaybe<Array<Map_Solution_Application_Component_Bool_Exp>>;
  _not?: InputMaybe<Map_Solution_Application_Component_Bool_Exp>;
  _or?: InputMaybe<Array<Map_Solution_Application_Component_Bool_Exp>>;
  component?: InputMaybe<Components_Bool_Exp>;
  componentId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  solution?: InputMaybe<Solutions_Bool_Exp>;
  solutionId?: InputMaybe<Uuid_Comparison_Exp>;
  state?: InputMaybe<Solution_Item_State_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_solution_application_component" */
export enum Map_Solution_Application_Component_Constraint {
  /** unique or primary key constraint on columns "component_id", "solution_id" */
  MapSolutionApplicationComponentComponentIdS_23157Unique = 'map_solution_application_component_component_id_s_23157_unique',
  /** unique or primary key constraint on columns "component_id", "solution_id" */
  MapSolutionApplicationComponentPkey = 'map_solution_application_component_pkey'
}

/** input type for inserting data into table "map_solution_application_component" */
export type Map_Solution_Application_Component_Insert_Input = {
  component?: InputMaybe<Components_Obj_Rel_Insert_Input>;
  componentId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  solution?: InputMaybe<Solutions_Obj_Rel_Insert_Input>;
  solutionId?: InputMaybe<Scalars['uuid']['input']>;
  state?: InputMaybe<Scalars['solution_item_state']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Map_Solution_Application_Component_Max_Fields = {
  __typename?: 'map_solution_application_component_max_fields';
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
export type Map_Solution_Application_Component_Max_Order_By = {
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
export type Map_Solution_Application_Component_Min_Fields = {
  __typename?: 'map_solution_application_component_min_fields';
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
export type Map_Solution_Application_Component_Min_Order_By = {
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
export type Map_Solution_Application_Component_Mutation_Response = {
  __typename?: 'map_solution_application_component_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Map_Solution_Application_Component>;
};

/** on_conflict condition type for table "map_solution_application_component" */
export type Map_Solution_Application_Component_On_Conflict = {
  constraint: Map_Solution_Application_Component_Constraint;
  update_columns?: Array<Map_Solution_Application_Component_Update_Column>;
  where?: InputMaybe<Map_Solution_Application_Component_Bool_Exp>;
};

/** Ordering options when selecting data from "map_solution_application_component". */
export type Map_Solution_Application_Component_Order_By = {
  component?: InputMaybe<Components_Order_By>;
  componentId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  solution?: InputMaybe<Solutions_Order_By>;
  solutionId?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_solution_application_component */
export type Map_Solution_Application_Component_Pk_Columns_Input = {
  componentId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};

/** select columns of table "map_solution_application_component" */
export enum Map_Solution_Application_Component_Select_Column {
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
export type Map_Solution_Application_Component_Set_Input = {
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

/** Streaming cursor of the table "map_solution_application_component" */
export type Map_Solution_Application_Component_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Map_Solution_Application_Component_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Map_Solution_Application_Component_Stream_Cursor_Value_Input = {
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
export enum Map_Solution_Application_Component_Update_Column {
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

export type Map_Solution_Application_Component_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Map_Solution_Application_Component_Set_Input>;
  /** filter the rows which have to be updated */
  where: Map_Solution_Application_Component_Bool_Exp;
};

/** columns and relationships of "map_solution_constraint" */
export type Map_Solution_Constraint = {
  __typename?: 'map_solution_constraint';
  /** An object relationship */
  constraint: Motivations;
  constraintId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  solution: Solutions;
  solutionId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_solution_constraint" */
export type Map_Solution_Constraint_Aggregate = {
  __typename?: 'map_solution_constraint_aggregate';
  aggregate?: Maybe<Map_Solution_Constraint_Aggregate_Fields>;
  nodes: Array<Map_Solution_Constraint>;
};

export type Map_Solution_Constraint_Aggregate_Bool_Exp = {
  count?: InputMaybe<Map_Solution_Constraint_Aggregate_Bool_Exp_Count>;
};

export type Map_Solution_Constraint_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Map_Solution_Constraint_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Map_Solution_Constraint_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_solution_constraint" */
export type Map_Solution_Constraint_Aggregate_Fields = {
  __typename?: 'map_solution_constraint_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Map_Solution_Constraint_Max_Fields>;
  min?: Maybe<Map_Solution_Constraint_Min_Fields>;
};


/** aggregate fields of "map_solution_constraint" */
export type Map_Solution_Constraint_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Map_Solution_Constraint_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_solution_constraint" */
export type Map_Solution_Constraint_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Map_Solution_Constraint_Max_Order_By>;
  min?: InputMaybe<Map_Solution_Constraint_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_solution_constraint" */
export type Map_Solution_Constraint_Arr_Rel_Insert_Input = {
  data: Array<Map_Solution_Constraint_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Map_Solution_Constraint_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_solution_constraint". All fields are combined with a logical 'AND'. */
export type Map_Solution_Constraint_Bool_Exp = {
  _and?: InputMaybe<Array<Map_Solution_Constraint_Bool_Exp>>;
  _not?: InputMaybe<Map_Solution_Constraint_Bool_Exp>;
  _or?: InputMaybe<Array<Map_Solution_Constraint_Bool_Exp>>;
  constraint?: InputMaybe<Motivations_Bool_Exp>;
  constraintId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  solution?: InputMaybe<Solutions_Bool_Exp>;
  solutionId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_solution_constraint" */
export enum Map_Solution_Constraint_Constraint {
  /** unique or primary key constraint on columns "constraint_id", "solution_id" */
  MapSolutionConstraintConstraintIdSolutionIdUnique = 'map_solution_constraint_constraint_id_solution_id_unique',
  /** unique or primary key constraint on columns "constraint_id", "solution_id" */
  MapSolutionConstraintPkey = 'map_solution_constraint_pkey'
}

/** input type for inserting data into table "map_solution_constraint" */
export type Map_Solution_Constraint_Insert_Input = {
  constraint?: InputMaybe<Motivations_Obj_Rel_Insert_Input>;
  constraintId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  solution?: InputMaybe<Solutions_Obj_Rel_Insert_Input>;
  solutionId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Map_Solution_Constraint_Max_Fields = {
  __typename?: 'map_solution_constraint_max_fields';
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
export type Map_Solution_Constraint_Max_Order_By = {
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
export type Map_Solution_Constraint_Min_Fields = {
  __typename?: 'map_solution_constraint_min_fields';
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
export type Map_Solution_Constraint_Min_Order_By = {
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
export type Map_Solution_Constraint_Mutation_Response = {
  __typename?: 'map_solution_constraint_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Map_Solution_Constraint>;
};

/** on_conflict condition type for table "map_solution_constraint" */
export type Map_Solution_Constraint_On_Conflict = {
  constraint: Map_Solution_Constraint_Constraint;
  update_columns?: Array<Map_Solution_Constraint_Update_Column>;
  where?: InputMaybe<Map_Solution_Constraint_Bool_Exp>;
};

/** Ordering options when selecting data from "map_solution_constraint". */
export type Map_Solution_Constraint_Order_By = {
  constraint?: InputMaybe<Motivations_Order_By>;
  constraintId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  solution?: InputMaybe<Solutions_Order_By>;
  solutionId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_solution_constraint */
export type Map_Solution_Constraint_Pk_Columns_Input = {
  constraintId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};

/** select columns of table "map_solution_constraint" */
export enum Map_Solution_Constraint_Select_Column {
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
export type Map_Solution_Constraint_Set_Input = {
  constraintId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  solutionId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "map_solution_constraint" */
export type Map_Solution_Constraint_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Map_Solution_Constraint_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Map_Solution_Constraint_Stream_Cursor_Value_Input = {
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
export enum Map_Solution_Constraint_Update_Column {
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

export type Map_Solution_Constraint_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Map_Solution_Constraint_Set_Input>;
  /** filter the rows which have to be updated */
  where: Map_Solution_Constraint_Bool_Exp;
};

/** columns and relationships of "map_technology_network_hierarchy" */
export type Map_Technology_Network_Hierarchy = {
  __typename?: 'map_technology_network_hierarchy';
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  networkChild: Technology_Networks;
  networkChildId: Scalars['uuid']['output'];
  /** An object relationship */
  networkParent: Technology_Networks;
  networkParentId: Scalars['uuid']['output'];
  order?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_technology_network_hierarchy" */
export type Map_Technology_Network_Hierarchy_Aggregate = {
  __typename?: 'map_technology_network_hierarchy_aggregate';
  aggregate?: Maybe<Map_Technology_Network_Hierarchy_Aggregate_Fields>;
  nodes: Array<Map_Technology_Network_Hierarchy>;
};

export type Map_Technology_Network_Hierarchy_Aggregate_Bool_Exp = {
  count?: InputMaybe<Map_Technology_Network_Hierarchy_Aggregate_Bool_Exp_Count>;
};

export type Map_Technology_Network_Hierarchy_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Map_Technology_Network_Hierarchy_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Map_Technology_Network_Hierarchy_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_technology_network_hierarchy" */
export type Map_Technology_Network_Hierarchy_Aggregate_Fields = {
  __typename?: 'map_technology_network_hierarchy_aggregate_fields';
  avg?: Maybe<Map_Technology_Network_Hierarchy_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Map_Technology_Network_Hierarchy_Max_Fields>;
  min?: Maybe<Map_Technology_Network_Hierarchy_Min_Fields>;
  stddev?: Maybe<Map_Technology_Network_Hierarchy_Stddev_Fields>;
  stddev_pop?: Maybe<Map_Technology_Network_Hierarchy_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Map_Technology_Network_Hierarchy_Stddev_Samp_Fields>;
  sum?: Maybe<Map_Technology_Network_Hierarchy_Sum_Fields>;
  var_pop?: Maybe<Map_Technology_Network_Hierarchy_Var_Pop_Fields>;
  var_samp?: Maybe<Map_Technology_Network_Hierarchy_Var_Samp_Fields>;
  variance?: Maybe<Map_Technology_Network_Hierarchy_Variance_Fields>;
};


/** aggregate fields of "map_technology_network_hierarchy" */
export type Map_Technology_Network_Hierarchy_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Map_Technology_Network_Hierarchy_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_technology_network_hierarchy" */
export type Map_Technology_Network_Hierarchy_Aggregate_Order_By = {
  avg?: InputMaybe<Map_Technology_Network_Hierarchy_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Map_Technology_Network_Hierarchy_Max_Order_By>;
  min?: InputMaybe<Map_Technology_Network_Hierarchy_Min_Order_By>;
  stddev?: InputMaybe<Map_Technology_Network_Hierarchy_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Map_Technology_Network_Hierarchy_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Map_Technology_Network_Hierarchy_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Map_Technology_Network_Hierarchy_Sum_Order_By>;
  var_pop?: InputMaybe<Map_Technology_Network_Hierarchy_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Map_Technology_Network_Hierarchy_Var_Samp_Order_By>;
  variance?: InputMaybe<Map_Technology_Network_Hierarchy_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "map_technology_network_hierarchy" */
export type Map_Technology_Network_Hierarchy_Arr_Rel_Insert_Input = {
  data: Array<Map_Technology_Network_Hierarchy_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Map_Technology_Network_Hierarchy_On_Conflict>;
};

/** aggregate avg on columns */
export type Map_Technology_Network_Hierarchy_Avg_Fields = {
  __typename?: 'map_technology_network_hierarchy_avg_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "map_technology_network_hierarchy" */
export type Map_Technology_Network_Hierarchy_Avg_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "map_technology_network_hierarchy". All fields are combined with a logical 'AND'. */
export type Map_Technology_Network_Hierarchy_Bool_Exp = {
  _and?: InputMaybe<Array<Map_Technology_Network_Hierarchy_Bool_Exp>>;
  _not?: InputMaybe<Map_Technology_Network_Hierarchy_Bool_Exp>;
  _or?: InputMaybe<Array<Map_Technology_Network_Hierarchy_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  networkChild?: InputMaybe<Technology_Networks_Bool_Exp>;
  networkChildId?: InputMaybe<Uuid_Comparison_Exp>;
  networkParent?: InputMaybe<Technology_Networks_Bool_Exp>;
  networkParentId?: InputMaybe<Uuid_Comparison_Exp>;
  order?: InputMaybe<Int_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_technology_network_hierarchy" */
export enum Map_Technology_Network_Hierarchy_Constraint {
  /** unique or primary key constraint on columns "network_child_id", "network_parent_id" */
  MapTechnologyNetworkHierarchyNetworkParentI_7f01cUnique = 'map_technology_network_hierarchy_network_parent_i_7f01c_unique',
  /** unique or primary key constraint on columns "network_child_id", "network_parent_id" */
  MapTechnologyNetworkHierarchyPkey = 'map_technology_network_hierarchy_pkey'
}

/** input type for incrementing numeric columns in table "map_technology_network_hierarchy" */
export type Map_Technology_Network_Hierarchy_Inc_Input = {
  order?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "map_technology_network_hierarchy" */
export type Map_Technology_Network_Hierarchy_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  networkChild?: InputMaybe<Technology_Networks_Obj_Rel_Insert_Input>;
  networkChildId?: InputMaybe<Scalars['uuid']['input']>;
  networkParent?: InputMaybe<Technology_Networks_Obj_Rel_Insert_Input>;
  networkParentId?: InputMaybe<Scalars['uuid']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Map_Technology_Network_Hierarchy_Max_Fields = {
  __typename?: 'map_technology_network_hierarchy_max_fields';
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
export type Map_Technology_Network_Hierarchy_Max_Order_By = {
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
export type Map_Technology_Network_Hierarchy_Min_Fields = {
  __typename?: 'map_technology_network_hierarchy_min_fields';
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
export type Map_Technology_Network_Hierarchy_Min_Order_By = {
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
export type Map_Technology_Network_Hierarchy_Mutation_Response = {
  __typename?: 'map_technology_network_hierarchy_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Map_Technology_Network_Hierarchy>;
};

/** on_conflict condition type for table "map_technology_network_hierarchy" */
export type Map_Technology_Network_Hierarchy_On_Conflict = {
  constraint: Map_Technology_Network_Hierarchy_Constraint;
  update_columns?: Array<Map_Technology_Network_Hierarchy_Update_Column>;
  where?: InputMaybe<Map_Technology_Network_Hierarchy_Bool_Exp>;
};

/** Ordering options when selecting data from "map_technology_network_hierarchy". */
export type Map_Technology_Network_Hierarchy_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  networkChild?: InputMaybe<Technology_Networks_Order_By>;
  networkChildId?: InputMaybe<Order_By>;
  networkParent?: InputMaybe<Technology_Networks_Order_By>;
  networkParentId?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_technology_network_hierarchy */
export type Map_Technology_Network_Hierarchy_Pk_Columns_Input = {
  networkChildId: Scalars['uuid']['input'];
  networkParentId: Scalars['uuid']['input'];
};

/** select columns of table "map_technology_network_hierarchy" */
export enum Map_Technology_Network_Hierarchy_Select_Column {
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
export type Map_Technology_Network_Hierarchy_Set_Input = {
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
export type Map_Technology_Network_Hierarchy_Stddev_Fields = {
  __typename?: 'map_technology_network_hierarchy_stddev_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "map_technology_network_hierarchy" */
export type Map_Technology_Network_Hierarchy_Stddev_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Map_Technology_Network_Hierarchy_Stddev_Pop_Fields = {
  __typename?: 'map_technology_network_hierarchy_stddev_pop_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "map_technology_network_hierarchy" */
export type Map_Technology_Network_Hierarchy_Stddev_Pop_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Map_Technology_Network_Hierarchy_Stddev_Samp_Fields = {
  __typename?: 'map_technology_network_hierarchy_stddev_samp_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "map_technology_network_hierarchy" */
export type Map_Technology_Network_Hierarchy_Stddev_Samp_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "map_technology_network_hierarchy" */
export type Map_Technology_Network_Hierarchy_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Map_Technology_Network_Hierarchy_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Map_Technology_Network_Hierarchy_Stream_Cursor_Value_Input = {
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
export type Map_Technology_Network_Hierarchy_Sum_Fields = {
  __typename?: 'map_technology_network_hierarchy_sum_fields';
  order?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "map_technology_network_hierarchy" */
export type Map_Technology_Network_Hierarchy_Sum_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** update columns of table "map_technology_network_hierarchy" */
export enum Map_Technology_Network_Hierarchy_Update_Column {
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

export type Map_Technology_Network_Hierarchy_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Map_Technology_Network_Hierarchy_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Map_Technology_Network_Hierarchy_Set_Input>;
  /** filter the rows which have to be updated */
  where: Map_Technology_Network_Hierarchy_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Map_Technology_Network_Hierarchy_Var_Pop_Fields = {
  __typename?: 'map_technology_network_hierarchy_var_pop_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "map_technology_network_hierarchy" */
export type Map_Technology_Network_Hierarchy_Var_Pop_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Map_Technology_Network_Hierarchy_Var_Samp_Fields = {
  __typename?: 'map_technology_network_hierarchy_var_samp_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "map_technology_network_hierarchy" */
export type Map_Technology_Network_Hierarchy_Var_Samp_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Map_Technology_Network_Hierarchy_Variance_Fields = {
  __typename?: 'map_technology_network_hierarchy_variance_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "map_technology_network_hierarchy" */
export type Map_Technology_Network_Hierarchy_Variance_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** columns and relationships of "map_technology_node_hierarchy" */
export type Map_Technology_Node_Hierarchy = {
  __typename?: 'map_technology_node_hierarchy';
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  nodeChild: Technology_Nodes;
  nodeChildId: Scalars['uuid']['output'];
  /** An object relationship */
  nodeParent: Technology_Nodes;
  nodeParentId: Scalars['uuid']['output'];
  order?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_technology_node_hierarchy" */
export type Map_Technology_Node_Hierarchy_Aggregate = {
  __typename?: 'map_technology_node_hierarchy_aggregate';
  aggregate?: Maybe<Map_Technology_Node_Hierarchy_Aggregate_Fields>;
  nodes: Array<Map_Technology_Node_Hierarchy>;
};

export type Map_Technology_Node_Hierarchy_Aggregate_Bool_Exp = {
  count?: InputMaybe<Map_Technology_Node_Hierarchy_Aggregate_Bool_Exp_Count>;
};

export type Map_Technology_Node_Hierarchy_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Map_Technology_Node_Hierarchy_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Map_Technology_Node_Hierarchy_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_technology_node_hierarchy" */
export type Map_Technology_Node_Hierarchy_Aggregate_Fields = {
  __typename?: 'map_technology_node_hierarchy_aggregate_fields';
  avg?: Maybe<Map_Technology_Node_Hierarchy_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Map_Technology_Node_Hierarchy_Max_Fields>;
  min?: Maybe<Map_Technology_Node_Hierarchy_Min_Fields>;
  stddev?: Maybe<Map_Technology_Node_Hierarchy_Stddev_Fields>;
  stddev_pop?: Maybe<Map_Technology_Node_Hierarchy_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Map_Technology_Node_Hierarchy_Stddev_Samp_Fields>;
  sum?: Maybe<Map_Technology_Node_Hierarchy_Sum_Fields>;
  var_pop?: Maybe<Map_Technology_Node_Hierarchy_Var_Pop_Fields>;
  var_samp?: Maybe<Map_Technology_Node_Hierarchy_Var_Samp_Fields>;
  variance?: Maybe<Map_Technology_Node_Hierarchy_Variance_Fields>;
};


/** aggregate fields of "map_technology_node_hierarchy" */
export type Map_Technology_Node_Hierarchy_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Map_Technology_Node_Hierarchy_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_technology_node_hierarchy" */
export type Map_Technology_Node_Hierarchy_Aggregate_Order_By = {
  avg?: InputMaybe<Map_Technology_Node_Hierarchy_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Map_Technology_Node_Hierarchy_Max_Order_By>;
  min?: InputMaybe<Map_Technology_Node_Hierarchy_Min_Order_By>;
  stddev?: InputMaybe<Map_Technology_Node_Hierarchy_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Map_Technology_Node_Hierarchy_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Map_Technology_Node_Hierarchy_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Map_Technology_Node_Hierarchy_Sum_Order_By>;
  var_pop?: InputMaybe<Map_Technology_Node_Hierarchy_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Map_Technology_Node_Hierarchy_Var_Samp_Order_By>;
  variance?: InputMaybe<Map_Technology_Node_Hierarchy_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "map_technology_node_hierarchy" */
export type Map_Technology_Node_Hierarchy_Arr_Rel_Insert_Input = {
  data: Array<Map_Technology_Node_Hierarchy_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Map_Technology_Node_Hierarchy_On_Conflict>;
};

/** aggregate avg on columns */
export type Map_Technology_Node_Hierarchy_Avg_Fields = {
  __typename?: 'map_technology_node_hierarchy_avg_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "map_technology_node_hierarchy" */
export type Map_Technology_Node_Hierarchy_Avg_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "map_technology_node_hierarchy". All fields are combined with a logical 'AND'. */
export type Map_Technology_Node_Hierarchy_Bool_Exp = {
  _and?: InputMaybe<Array<Map_Technology_Node_Hierarchy_Bool_Exp>>;
  _not?: InputMaybe<Map_Technology_Node_Hierarchy_Bool_Exp>;
  _or?: InputMaybe<Array<Map_Technology_Node_Hierarchy_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  nodeChild?: InputMaybe<Technology_Nodes_Bool_Exp>;
  nodeChildId?: InputMaybe<Uuid_Comparison_Exp>;
  nodeParent?: InputMaybe<Technology_Nodes_Bool_Exp>;
  nodeParentId?: InputMaybe<Uuid_Comparison_Exp>;
  order?: InputMaybe<Int_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_technology_node_hierarchy" */
export enum Map_Technology_Node_Hierarchy_Constraint {
  /** unique or primary key constraint on columns "node_parent_id", "node_child_id" */
  MapTechnologyNodeHierarchyNodeParentIdNodeAea06Unique = 'map_technology_node_hierarchy_node_parent_id_node_aea06_unique',
  /** unique or primary key constraint on columns "node_parent_id", "node_child_id" */
  MapTechnologyNodeHierarchyPkey = 'map_technology_node_hierarchy_pkey'
}

/** input type for incrementing numeric columns in table "map_technology_node_hierarchy" */
export type Map_Technology_Node_Hierarchy_Inc_Input = {
  order?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "map_technology_node_hierarchy" */
export type Map_Technology_Node_Hierarchy_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  nodeChild?: InputMaybe<Technology_Nodes_Obj_Rel_Insert_Input>;
  nodeChildId?: InputMaybe<Scalars['uuid']['input']>;
  nodeParent?: InputMaybe<Technology_Nodes_Obj_Rel_Insert_Input>;
  nodeParentId?: InputMaybe<Scalars['uuid']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Map_Technology_Node_Hierarchy_Max_Fields = {
  __typename?: 'map_technology_node_hierarchy_max_fields';
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
export type Map_Technology_Node_Hierarchy_Max_Order_By = {
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
export type Map_Technology_Node_Hierarchy_Min_Fields = {
  __typename?: 'map_technology_node_hierarchy_min_fields';
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
export type Map_Technology_Node_Hierarchy_Min_Order_By = {
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
export type Map_Technology_Node_Hierarchy_Mutation_Response = {
  __typename?: 'map_technology_node_hierarchy_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Map_Technology_Node_Hierarchy>;
};

/** on_conflict condition type for table "map_technology_node_hierarchy" */
export type Map_Technology_Node_Hierarchy_On_Conflict = {
  constraint: Map_Technology_Node_Hierarchy_Constraint;
  update_columns?: Array<Map_Technology_Node_Hierarchy_Update_Column>;
  where?: InputMaybe<Map_Technology_Node_Hierarchy_Bool_Exp>;
};

/** Ordering options when selecting data from "map_technology_node_hierarchy". */
export type Map_Technology_Node_Hierarchy_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  nodeChild?: InputMaybe<Technology_Nodes_Order_By>;
  nodeChildId?: InputMaybe<Order_By>;
  nodeParent?: InputMaybe<Technology_Nodes_Order_By>;
  nodeParentId?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_technology_node_hierarchy */
export type Map_Technology_Node_Hierarchy_Pk_Columns_Input = {
  nodeChildId: Scalars['uuid']['input'];
  nodeParentId: Scalars['uuid']['input'];
};

/** select columns of table "map_technology_node_hierarchy" */
export enum Map_Technology_Node_Hierarchy_Select_Column {
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
export type Map_Technology_Node_Hierarchy_Set_Input = {
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
export type Map_Technology_Node_Hierarchy_Stddev_Fields = {
  __typename?: 'map_technology_node_hierarchy_stddev_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "map_technology_node_hierarchy" */
export type Map_Technology_Node_Hierarchy_Stddev_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Map_Technology_Node_Hierarchy_Stddev_Pop_Fields = {
  __typename?: 'map_technology_node_hierarchy_stddev_pop_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "map_technology_node_hierarchy" */
export type Map_Technology_Node_Hierarchy_Stddev_Pop_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Map_Technology_Node_Hierarchy_Stddev_Samp_Fields = {
  __typename?: 'map_technology_node_hierarchy_stddev_samp_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "map_technology_node_hierarchy" */
export type Map_Technology_Node_Hierarchy_Stddev_Samp_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "map_technology_node_hierarchy" */
export type Map_Technology_Node_Hierarchy_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Map_Technology_Node_Hierarchy_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Map_Technology_Node_Hierarchy_Stream_Cursor_Value_Input = {
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
export type Map_Technology_Node_Hierarchy_Sum_Fields = {
  __typename?: 'map_technology_node_hierarchy_sum_fields';
  order?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "map_technology_node_hierarchy" */
export type Map_Technology_Node_Hierarchy_Sum_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** update columns of table "map_technology_node_hierarchy" */
export enum Map_Technology_Node_Hierarchy_Update_Column {
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

export type Map_Technology_Node_Hierarchy_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Map_Technology_Node_Hierarchy_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Map_Technology_Node_Hierarchy_Set_Input>;
  /** filter the rows which have to be updated */
  where: Map_Technology_Node_Hierarchy_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Map_Technology_Node_Hierarchy_Var_Pop_Fields = {
  __typename?: 'map_technology_node_hierarchy_var_pop_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "map_technology_node_hierarchy" */
export type Map_Technology_Node_Hierarchy_Var_Pop_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Map_Technology_Node_Hierarchy_Var_Samp_Fields = {
  __typename?: 'map_technology_node_hierarchy_var_samp_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "map_technology_node_hierarchy" */
export type Map_Technology_Node_Hierarchy_Var_Samp_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Map_Technology_Node_Hierarchy_Variance_Fields = {
  __typename?: 'map_technology_node_hierarchy_variance_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "map_technology_node_hierarchy" */
export type Map_Technology_Node_Hierarchy_Variance_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** columns and relationships of "map_technology_node_system_software" */
export type Map_Technology_Node_System_Software = {
  __typename?: 'map_technology_node_system_software';
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  kind: Scalars['system_software_kind_enum']['output'];
  /** An object relationship */
  node: Technology_Nodes;
  nodeId: Scalars['uuid']['output'];
  /** An object relationship */
  systemSoftware: System_Software;
  systemSoftwareId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "map_technology_node_system_software" */
export type Map_Technology_Node_System_Software_Aggregate = {
  __typename?: 'map_technology_node_system_software_aggregate';
  aggregate?: Maybe<Map_Technology_Node_System_Software_Aggregate_Fields>;
  nodes: Array<Map_Technology_Node_System_Software>;
};

export type Map_Technology_Node_System_Software_Aggregate_Bool_Exp = {
  count?: InputMaybe<Map_Technology_Node_System_Software_Aggregate_Bool_Exp_Count>;
};

export type Map_Technology_Node_System_Software_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Map_Technology_Node_System_Software_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Map_Technology_Node_System_Software_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "map_technology_node_system_software" */
export type Map_Technology_Node_System_Software_Aggregate_Fields = {
  __typename?: 'map_technology_node_system_software_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Map_Technology_Node_System_Software_Max_Fields>;
  min?: Maybe<Map_Technology_Node_System_Software_Min_Fields>;
};


/** aggregate fields of "map_technology_node_system_software" */
export type Map_Technology_Node_System_Software_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Map_Technology_Node_System_Software_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "map_technology_node_system_software" */
export type Map_Technology_Node_System_Software_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Map_Technology_Node_System_Software_Max_Order_By>;
  min?: InputMaybe<Map_Technology_Node_System_Software_Min_Order_By>;
};

/** input type for inserting array relation for remote table "map_technology_node_system_software" */
export type Map_Technology_Node_System_Software_Arr_Rel_Insert_Input = {
  data: Array<Map_Technology_Node_System_Software_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Map_Technology_Node_System_Software_On_Conflict>;
};

/** Boolean expression to filter rows from the table "map_technology_node_system_software". All fields are combined with a logical 'AND'. */
export type Map_Technology_Node_System_Software_Bool_Exp = {
  _and?: InputMaybe<Array<Map_Technology_Node_System_Software_Bool_Exp>>;
  _not?: InputMaybe<Map_Technology_Node_System_Software_Bool_Exp>;
  _or?: InputMaybe<Array<Map_Technology_Node_System_Software_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  kind?: InputMaybe<System_Software_Kind_Enum_Comparison_Exp>;
  node?: InputMaybe<Technology_Nodes_Bool_Exp>;
  nodeId?: InputMaybe<Uuid_Comparison_Exp>;
  systemSoftware?: InputMaybe<System_Software_Bool_Exp>;
  systemSoftwareId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "map_technology_node_system_software" */
export enum Map_Technology_Node_System_Software_Constraint {
  /** unique or primary key constraint on columns "node_id", "system_software_id" */
  MapTechnologyNodeSystemSoftwareNodeIdSyste_37a00Unique = 'map_technology_node_system_software_node_id_syste_37a00_unique',
  /** unique or primary key constraint on columns "node_id", "system_software_id" */
  MapTechnologyNodeSystemSoftwarePkey = 'map_technology_node_system_software_pkey'
}

/** input type for inserting data into table "map_technology_node_system_software" */
export type Map_Technology_Node_System_Software_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  kind?: InputMaybe<Scalars['system_software_kind_enum']['input']>;
  node?: InputMaybe<Technology_Nodes_Obj_Rel_Insert_Input>;
  nodeId?: InputMaybe<Scalars['uuid']['input']>;
  systemSoftware?: InputMaybe<System_Software_Obj_Rel_Insert_Input>;
  systemSoftwareId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Map_Technology_Node_System_Software_Max_Fields = {
  __typename?: 'map_technology_node_system_software_max_fields';
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
export type Map_Technology_Node_System_Software_Max_Order_By = {
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
export type Map_Technology_Node_System_Software_Min_Fields = {
  __typename?: 'map_technology_node_system_software_min_fields';
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
export type Map_Technology_Node_System_Software_Min_Order_By = {
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
export type Map_Technology_Node_System_Software_Mutation_Response = {
  __typename?: 'map_technology_node_system_software_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Map_Technology_Node_System_Software>;
};

/** on_conflict condition type for table "map_technology_node_system_software" */
export type Map_Technology_Node_System_Software_On_Conflict = {
  constraint: Map_Technology_Node_System_Software_Constraint;
  update_columns?: Array<Map_Technology_Node_System_Software_Update_Column>;
  where?: InputMaybe<Map_Technology_Node_System_Software_Bool_Exp>;
};

/** Ordering options when selecting data from "map_technology_node_system_software". */
export type Map_Technology_Node_System_Software_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  node?: InputMaybe<Technology_Nodes_Order_By>;
  nodeId?: InputMaybe<Order_By>;
  systemSoftware?: InputMaybe<System_Software_Order_By>;
  systemSoftwareId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: map_technology_node_system_software */
export type Map_Technology_Node_System_Software_Pk_Columns_Input = {
  nodeId: Scalars['uuid']['input'];
  systemSoftwareId: Scalars['uuid']['input'];
};

/** select columns of table "map_technology_node_system_software" */
export enum Map_Technology_Node_System_Software_Select_Column {
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
export type Map_Technology_Node_System_Software_Set_Input = {
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

/** Streaming cursor of the table "map_technology_node_system_software" */
export type Map_Technology_Node_System_Software_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Map_Technology_Node_System_Software_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Map_Technology_Node_System_Software_Stream_Cursor_Value_Input = {
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
export enum Map_Technology_Node_System_Software_Update_Column {
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

export type Map_Technology_Node_System_Software_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Map_Technology_Node_System_Software_Set_Input>;
  /** filter the rows which have to be updated */
  where: Map_Technology_Node_System_Software_Bool_Exp;
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

/** columns and relationships of "motivations" */
export type Motivations = {
  __typename?: 'motivations';
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  impact?: Maybe<Scalars['smallint']['output']>;
  kind: Scalars['motivation_kind_enum']['output'];
  /** An array relationship */
  mapSolutions: Array<Map_Solution_Constraint>;
  /** An aggregate relationship */
  mapSolutions_aggregate: Map_Solution_Constraint_Aggregate;
  mitigationNotes?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  ownerId?: Maybe<Scalars['uuid']['output']>;
  priority?: Maybe<Scalars['motivation_priority_enum']['output']>;
  probability?: Maybe<Scalars['smallint']['output']>;
  riskCategory?: Maybe<Scalars['risk_category_enum']['output']>;
  severity?: Maybe<Scalars['smallint']['output']>;
  state: Scalars['motivation_status_enum']['output'];
  status?: Maybe<Scalars['risk_status_enum']['output']>;
  typeAssessment?: Maybe<Scalars['assessment_type_enum']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "motivations" */
export type MotivationsMapSolutionsArgs = {
  distinct_on?: InputMaybe<Array<Map_Solution_Constraint_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Solution_Constraint_Order_By>>;
  where?: InputMaybe<Map_Solution_Constraint_Bool_Exp>;
};


/** columns and relationships of "motivations" */
export type MotivationsMapSolutions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Solution_Constraint_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Solution_Constraint_Order_By>>;
  where?: InputMaybe<Map_Solution_Constraint_Bool_Exp>;
};

/** aggregated selection of "motivations" */
export type Motivations_Aggregate = {
  __typename?: 'motivations_aggregate';
  aggregate?: Maybe<Motivations_Aggregate_Fields>;
  nodes: Array<Motivations>;
};

/** aggregate fields of "motivations" */
export type Motivations_Aggregate_Fields = {
  __typename?: 'motivations_aggregate_fields';
  avg?: Maybe<Motivations_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Motivations_Max_Fields>;
  min?: Maybe<Motivations_Min_Fields>;
  stddev?: Maybe<Motivations_Stddev_Fields>;
  stddev_pop?: Maybe<Motivations_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Motivations_Stddev_Samp_Fields>;
  sum?: Maybe<Motivations_Sum_Fields>;
  var_pop?: Maybe<Motivations_Var_Pop_Fields>;
  var_samp?: Maybe<Motivations_Var_Samp_Fields>;
  variance?: Maybe<Motivations_Variance_Fields>;
};


/** aggregate fields of "motivations" */
export type Motivations_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Motivations_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Motivations_Avg_Fields = {
  __typename?: 'motivations_avg_fields';
  impact?: Maybe<Scalars['Float']['output']>;
  probability?: Maybe<Scalars['Float']['output']>;
  severity?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "motivations". All fields are combined with a logical 'AND'. */
export type Motivations_Bool_Exp = {
  _and?: InputMaybe<Array<Motivations_Bool_Exp>>;
  _not?: InputMaybe<Motivations_Bool_Exp>;
  _or?: InputMaybe<Array<Motivations_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  impact?: InputMaybe<Smallint_Comparison_Exp>;
  kind?: InputMaybe<Motivation_Kind_Enum_Comparison_Exp>;
  mapSolutions?: InputMaybe<Map_Solution_Constraint_Bool_Exp>;
  mapSolutions_aggregate?: InputMaybe<Map_Solution_Constraint_Aggregate_Bool_Exp>;
  mitigationNotes?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  ownerId?: InputMaybe<Uuid_Comparison_Exp>;
  priority?: InputMaybe<Motivation_Priority_Enum_Comparison_Exp>;
  probability?: InputMaybe<Smallint_Comparison_Exp>;
  riskCategory?: InputMaybe<Risk_Category_Enum_Comparison_Exp>;
  severity?: InputMaybe<Smallint_Comparison_Exp>;
  state?: InputMaybe<Motivation_Status_Enum_Comparison_Exp>;
  status?: InputMaybe<Risk_Status_Enum_Comparison_Exp>;
  typeAssessment?: InputMaybe<Assessment_Type_Enum_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "motivations" */
export enum Motivations_Constraint {
  /** unique or primary key constraint on columns "code" */
  MotivationsCodeUnique = 'motivations_code_unique',
  /** unique or primary key constraint on columns "id" */
  MotivationsPkey = 'motivations_pkey'
}

/** input type for incrementing numeric columns in table "motivations" */
export type Motivations_Inc_Input = {
  impact?: InputMaybe<Scalars['smallint']['input']>;
  probability?: InputMaybe<Scalars['smallint']['input']>;
  severity?: InputMaybe<Scalars['smallint']['input']>;
};

/** input type for inserting data into table "motivations" */
export type Motivations_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  impact?: InputMaybe<Scalars['smallint']['input']>;
  kind?: InputMaybe<Scalars['motivation_kind_enum']['input']>;
  mapSolutions?: InputMaybe<Map_Solution_Constraint_Arr_Rel_Insert_Input>;
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

/** aggregate max on columns */
export type Motivations_Max_Fields = {
  __typename?: 'motivations_max_fields';
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
export type Motivations_Min_Fields = {
  __typename?: 'motivations_min_fields';
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
export type Motivations_Mutation_Response = {
  __typename?: 'motivations_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Motivations>;
};

/** input type for inserting object relation for remote table "motivations" */
export type Motivations_Obj_Rel_Insert_Input = {
  data: Motivations_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Motivations_On_Conflict>;
};

/** on_conflict condition type for table "motivations" */
export type Motivations_On_Conflict = {
  constraint: Motivations_Constraint;
  update_columns?: Array<Motivations_Update_Column>;
  where?: InputMaybe<Motivations_Bool_Exp>;
};

/** Ordering options when selecting data from "motivations". */
export type Motivations_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  impact?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  mapSolutions_aggregate?: InputMaybe<Map_Solution_Constraint_Aggregate_Order_By>;
  mitigationNotes?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  ownerId?: InputMaybe<Order_By>;
  priority?: InputMaybe<Order_By>;
  probability?: InputMaybe<Order_By>;
  riskCategory?: InputMaybe<Order_By>;
  severity?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  typeAssessment?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: motivations */
export type Motivations_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "motivations" */
export enum Motivations_Select_Column {
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
export type Motivations_Set_Input = {
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
export type Motivations_Stddev_Fields = {
  __typename?: 'motivations_stddev_fields';
  impact?: Maybe<Scalars['Float']['output']>;
  probability?: Maybe<Scalars['Float']['output']>;
  severity?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Motivations_Stddev_Pop_Fields = {
  __typename?: 'motivations_stddev_pop_fields';
  impact?: Maybe<Scalars['Float']['output']>;
  probability?: Maybe<Scalars['Float']['output']>;
  severity?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Motivations_Stddev_Samp_Fields = {
  __typename?: 'motivations_stddev_samp_fields';
  impact?: Maybe<Scalars['Float']['output']>;
  probability?: Maybe<Scalars['Float']['output']>;
  severity?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "motivations" */
export type Motivations_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Motivations_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Motivations_Stream_Cursor_Value_Input = {
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
export type Motivations_Sum_Fields = {
  __typename?: 'motivations_sum_fields';
  impact?: Maybe<Scalars['smallint']['output']>;
  probability?: Maybe<Scalars['smallint']['output']>;
  severity?: Maybe<Scalars['smallint']['output']>;
};

/** update columns of table "motivations" */
export enum Motivations_Update_Column {
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

export type Motivations_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Motivations_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Motivations_Set_Input>;
  /** filter the rows which have to be updated */
  where: Motivations_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Motivations_Var_Pop_Fields = {
  __typename?: 'motivations_var_pop_fields';
  impact?: Maybe<Scalars['Float']['output']>;
  probability?: Maybe<Scalars['Float']['output']>;
  severity?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Motivations_Var_Samp_Fields = {
  __typename?: 'motivations_var_samp_fields';
  impact?: Maybe<Scalars['Float']['output']>;
  probability?: Maybe<Scalars['Float']['output']>;
  severity?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Motivations_Variance_Fields = {
  __typename?: 'motivations_variance_fields';
  impact?: Maybe<Scalars['Float']['output']>;
  probability?: Maybe<Scalars['Float']['output']>;
  severity?: Maybe<Scalars['Float']['output']>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "actors" */
  delete_actors?: Maybe<Actors_Mutation_Response>;
  /** delete single row from the table: "actors" */
  delete_actors_by_pk?: Maybe<Actors>;
  /** delete data from the table: "capabilities" */
  delete_capabilities?: Maybe<Capabilities_Mutation_Response>;
  /** delete single row from the table: "capabilities" */
  delete_capabilities_by_pk?: Maybe<Capabilities>;
  /** delete data from the table: "components" */
  delete_components?: Maybe<Components_Mutation_Response>;
  /** delete single row from the table: "components" */
  delete_components_by_pk?: Maybe<Components>;
  /** delete data from the table: "data_objects" */
  delete_data_objects?: Maybe<Data_Objects_Mutation_Response>;
  /** delete single row from the table: "data_objects" */
  delete_data_objects_by_pk?: Maybe<Data_Objects>;
  /** delete data from the table: "directories" */
  delete_directories?: Maybe<Directories_Mutation_Response>;
  /** delete single row from the table: "directories" */
  delete_directories_by_pk?: Maybe<Directories>;
  /** delete data from the table: "employees" */
  delete_employees?: Maybe<Employees_Mutation_Response>;
  /** delete single row from the table: "employees" */
  delete_employees_by_pk?: Maybe<Employees>;
  /** delete data from the table: "events" */
  delete_events?: Maybe<Events_Mutation_Response>;
  /** delete single row from the table: "events" */
  delete_events_by_pk?: Maybe<Events>;
  /** delete data from the table: "flows" */
  delete_flows?: Maybe<Flows_Mutation_Response>;
  /** delete single row from the table: "flows" */
  delete_flows_by_pk?: Maybe<Flows>;
  /** delete data from the table: "functions" */
  delete_functions?: Maybe<Functions_Mutation_Response>;
  /** delete single row from the table: "functions" */
  delete_functions_by_pk?: Maybe<Functions>;
  /** delete data from the table: "interfaces" */
  delete_interfaces?: Maybe<Interfaces_Mutation_Response>;
  /** delete single row from the table: "interfaces" */
  delete_interfaces_by_pk?: Maybe<Interfaces>;
  /** delete data from the table: "locations" */
  delete_locations?: Maybe<Locations_Mutation_Response>;
  /** delete single row from the table: "locations" */
  delete_locations_by_pk?: Maybe<Locations>;
  /** delete data from the table: "map_application_component_data_object" */
  delete_map_application_component_data_object?: Maybe<Map_Application_Component_Data_Object_Mutation_Response>;
  /** delete single row from the table: "map_application_component_data_object" */
  delete_map_application_component_data_object_by_pk?: Maybe<Map_Application_Component_Data_Object>;
  /** delete data from the table: "map_application_component_event" */
  delete_map_application_component_event?: Maybe<Map_Application_Component_Event_Mutation_Response>;
  /** delete single row from the table: "map_application_component_event" */
  delete_map_application_component_event_by_pk?: Maybe<Map_Application_Component_Event>;
  /** delete data from the table: "map_application_component_function" */
  delete_map_application_component_function?: Maybe<Map_Application_Component_Function_Mutation_Response>;
  /** delete single row from the table: "map_application_component_function" */
  delete_map_application_component_function_by_pk?: Maybe<Map_Application_Component_Function>;
  /** delete data from the table: "map_application_component_hierarchy" */
  delete_map_application_component_hierarchy?: Maybe<Map_Application_Component_Hierarchy_Mutation_Response>;
  /** delete single row from the table: "map_application_component_hierarchy" */
  delete_map_application_component_hierarchy_by_pk?: Maybe<Map_Application_Component_Hierarchy>;
  /** delete data from the table: "map_application_component_interface" */
  delete_map_application_component_interface?: Maybe<Map_Application_Component_Interface_Mutation_Response>;
  /** delete single row from the table: "map_application_component_interface" */
  delete_map_application_component_interface_by_pk?: Maybe<Map_Application_Component_Interface>;
  /** delete data from the table: "map_application_component_product" */
  delete_map_application_component_product?: Maybe<Map_Application_Component_Product_Mutation_Response>;
  /** delete single row from the table: "map_application_component_product" */
  delete_map_application_component_product_by_pk?: Maybe<Map_Application_Component_Product>;
  /** delete data from the table: "map_application_component_stakeholder" */
  delete_map_application_component_stakeholder?: Maybe<Map_Application_Component_Stakeholder_Mutation_Response>;
  /** delete single row from the table: "map_application_component_stakeholder" */
  delete_map_application_component_stakeholder_by_pk?: Maybe<Map_Application_Component_Stakeholder>;
  /** delete data from the table: "map_application_component_system_software" */
  delete_map_application_component_system_software?: Maybe<Map_Application_Component_System_Software_Mutation_Response>;
  /** delete single row from the table: "map_application_component_system_software" */
  delete_map_application_component_system_software_by_pk?: Maybe<Map_Application_Component_System_Software>;
  /** delete data from the table: "map_application_component_technology_logical_network" */
  delete_map_application_component_technology_logical_network?: Maybe<Map_Application_Component_Technology_Logical_Network_Mutation_Response>;
  /** delete single row from the table: "map_application_component_technology_logical_network" */
  delete_map_application_component_technology_logical_network_by_pk?: Maybe<Map_Application_Component_Technology_Logical_Network>;
  /** delete data from the table: "map_application_component_technology_node" */
  delete_map_application_component_technology_node?: Maybe<Map_Application_Component_Technology_Node_Mutation_Response>;
  /** delete single row from the table: "map_application_component_technology_node" */
  delete_map_application_component_technology_node_by_pk?: Maybe<Map_Application_Component_Technology_Node>;
  /** delete data from the table: "map_application_function_data_object" */
  delete_map_application_function_data_object?: Maybe<Map_Application_Function_Data_Object_Mutation_Response>;
  /** delete single row from the table: "map_application_function_data_object" */
  delete_map_application_function_data_object_by_pk?: Maybe<Map_Application_Function_Data_Object>;
  /** delete data from the table: "map_application_interface_function" */
  delete_map_application_interface_function?: Maybe<Map_Application_Interface_Function_Mutation_Response>;
  /** delete single row from the table: "map_application_interface_function" */
  delete_map_application_interface_function_by_pk?: Maybe<Map_Application_Interface_Function>;
  /** delete data from the table: "map_business_actor_role" */
  delete_map_business_actor_role?: Maybe<Map_Business_Actor_Role_Mutation_Response>;
  /** delete single row from the table: "map_business_actor_role" */
  delete_map_business_actor_role_by_pk?: Maybe<Map_Business_Actor_Role>;
  /** delete data from the table: "map_directory_items" */
  delete_map_directory_items?: Maybe<Map_Directory_Items_Mutation_Response>;
  /** delete single row from the table: "map_directory_items" */
  delete_map_directory_items_by_pk?: Maybe<Map_Directory_Items>;
  /** delete data from the table: "map_solution_application_component" */
  delete_map_solution_application_component?: Maybe<Map_Solution_Application_Component_Mutation_Response>;
  /** delete single row from the table: "map_solution_application_component" */
  delete_map_solution_application_component_by_pk?: Maybe<Map_Solution_Application_Component>;
  /** delete data from the table: "map_solution_constraint" */
  delete_map_solution_constraint?: Maybe<Map_Solution_Constraint_Mutation_Response>;
  /** delete single row from the table: "map_solution_constraint" */
  delete_map_solution_constraint_by_pk?: Maybe<Map_Solution_Constraint>;
  /** delete data from the table: "map_technology_network_hierarchy" */
  delete_map_technology_network_hierarchy?: Maybe<Map_Technology_Network_Hierarchy_Mutation_Response>;
  /** delete single row from the table: "map_technology_network_hierarchy" */
  delete_map_technology_network_hierarchy_by_pk?: Maybe<Map_Technology_Network_Hierarchy>;
  /** delete data from the table: "map_technology_node_hierarchy" */
  delete_map_technology_node_hierarchy?: Maybe<Map_Technology_Node_Hierarchy_Mutation_Response>;
  /** delete single row from the table: "map_technology_node_hierarchy" */
  delete_map_technology_node_hierarchy_by_pk?: Maybe<Map_Technology_Node_Hierarchy>;
  /** delete data from the table: "map_technology_node_system_software" */
  delete_map_technology_node_system_software?: Maybe<Map_Technology_Node_System_Software_Mutation_Response>;
  /** delete single row from the table: "map_technology_node_system_software" */
  delete_map_technology_node_system_software_by_pk?: Maybe<Map_Technology_Node_System_Software>;
  /** delete data from the table: "motivations" */
  delete_motivations?: Maybe<Motivations_Mutation_Response>;
  /** delete single row from the table: "motivations" */
  delete_motivations_by_pk?: Maybe<Motivations>;
  /** delete data from the table: "products" */
  delete_products?: Maybe<Products_Mutation_Response>;
  /** delete single row from the table: "products" */
  delete_products_by_pk?: Maybe<Products>;
  /** delete data from the table: "roles" */
  delete_roles?: Maybe<Roles_Mutation_Response>;
  /** delete single row from the table: "roles" */
  delete_roles_by_pk?: Maybe<Roles>;
  /** delete data from the table: "solutions" */
  delete_solutions?: Maybe<Solutions_Mutation_Response>;
  /** delete single row from the table: "solutions" */
  delete_solutions_by_pk?: Maybe<Solutions>;
  /** delete data from the table: "stakeholders" */
  delete_stakeholders?: Maybe<Stakeholders_Mutation_Response>;
  /** delete single row from the table: "stakeholders" */
  delete_stakeholders_by_pk?: Maybe<Stakeholders>;
  /** delete data from the table: "system_software" */
  delete_system_software?: Maybe<System_Software_Mutation_Response>;
  /** delete single row from the table: "system_software" */
  delete_system_software_by_pk?: Maybe<System_Software>;
  /** delete data from the table: "technology_networks" */
  delete_technology_networks?: Maybe<Technology_Networks_Mutation_Response>;
  /** delete single row from the table: "technology_networks" */
  delete_technology_networks_by_pk?: Maybe<Technology_Networks>;
  /** delete data from the table: "technology_nodes" */
  delete_technology_nodes?: Maybe<Technology_Nodes_Mutation_Response>;
  /** delete single row from the table: "technology_nodes" */
  delete_technology_nodes_by_pk?: Maybe<Technology_Nodes>;
  /** insert data into the table: "actors" */
  insert_actors?: Maybe<Actors_Mutation_Response>;
  /** insert a single row into the table: "actors" */
  insert_actors_one?: Maybe<Actors>;
  /** insert data into the table: "capabilities" */
  insert_capabilities?: Maybe<Capabilities_Mutation_Response>;
  /** insert a single row into the table: "capabilities" */
  insert_capabilities_one?: Maybe<Capabilities>;
  /** insert data into the table: "components" */
  insert_components?: Maybe<Components_Mutation_Response>;
  /** insert a single row into the table: "components" */
  insert_components_one?: Maybe<Components>;
  /** insert data into the table: "data_objects" */
  insert_data_objects?: Maybe<Data_Objects_Mutation_Response>;
  /** insert a single row into the table: "data_objects" */
  insert_data_objects_one?: Maybe<Data_Objects>;
  /** insert data into the table: "directories" */
  insert_directories?: Maybe<Directories_Mutation_Response>;
  /** insert a single row into the table: "directories" */
  insert_directories_one?: Maybe<Directories>;
  /** insert data into the table: "employees" */
  insert_employees?: Maybe<Employees_Mutation_Response>;
  /** insert a single row into the table: "employees" */
  insert_employees_one?: Maybe<Employees>;
  /** insert data into the table: "events" */
  insert_events?: Maybe<Events_Mutation_Response>;
  /** insert a single row into the table: "events" */
  insert_events_one?: Maybe<Events>;
  /** insert data into the table: "flows" */
  insert_flows?: Maybe<Flows_Mutation_Response>;
  /** insert a single row into the table: "flows" */
  insert_flows_one?: Maybe<Flows>;
  /** insert data into the table: "functions" */
  insert_functions?: Maybe<Functions_Mutation_Response>;
  /** insert a single row into the table: "functions" */
  insert_functions_one?: Maybe<Functions>;
  /** insert data into the table: "interfaces" */
  insert_interfaces?: Maybe<Interfaces_Mutation_Response>;
  /** insert a single row into the table: "interfaces" */
  insert_interfaces_one?: Maybe<Interfaces>;
  /** insert data into the table: "locations" */
  insert_locations?: Maybe<Locations_Mutation_Response>;
  /** insert a single row into the table: "locations" */
  insert_locations_one?: Maybe<Locations>;
  /** insert data into the table: "map_application_component_data_object" */
  insert_map_application_component_data_object?: Maybe<Map_Application_Component_Data_Object_Mutation_Response>;
  /** insert a single row into the table: "map_application_component_data_object" */
  insert_map_application_component_data_object_one?: Maybe<Map_Application_Component_Data_Object>;
  /** insert data into the table: "map_application_component_event" */
  insert_map_application_component_event?: Maybe<Map_Application_Component_Event_Mutation_Response>;
  /** insert a single row into the table: "map_application_component_event" */
  insert_map_application_component_event_one?: Maybe<Map_Application_Component_Event>;
  /** insert data into the table: "map_application_component_function" */
  insert_map_application_component_function?: Maybe<Map_Application_Component_Function_Mutation_Response>;
  /** insert a single row into the table: "map_application_component_function" */
  insert_map_application_component_function_one?: Maybe<Map_Application_Component_Function>;
  /** insert data into the table: "map_application_component_hierarchy" */
  insert_map_application_component_hierarchy?: Maybe<Map_Application_Component_Hierarchy_Mutation_Response>;
  /** insert a single row into the table: "map_application_component_hierarchy" */
  insert_map_application_component_hierarchy_one?: Maybe<Map_Application_Component_Hierarchy>;
  /** insert data into the table: "map_application_component_interface" */
  insert_map_application_component_interface?: Maybe<Map_Application_Component_Interface_Mutation_Response>;
  /** insert a single row into the table: "map_application_component_interface" */
  insert_map_application_component_interface_one?: Maybe<Map_Application_Component_Interface>;
  /** insert data into the table: "map_application_component_product" */
  insert_map_application_component_product?: Maybe<Map_Application_Component_Product_Mutation_Response>;
  /** insert a single row into the table: "map_application_component_product" */
  insert_map_application_component_product_one?: Maybe<Map_Application_Component_Product>;
  /** insert data into the table: "map_application_component_stakeholder" */
  insert_map_application_component_stakeholder?: Maybe<Map_Application_Component_Stakeholder_Mutation_Response>;
  /** insert a single row into the table: "map_application_component_stakeholder" */
  insert_map_application_component_stakeholder_one?: Maybe<Map_Application_Component_Stakeholder>;
  /** insert data into the table: "map_application_component_system_software" */
  insert_map_application_component_system_software?: Maybe<Map_Application_Component_System_Software_Mutation_Response>;
  /** insert a single row into the table: "map_application_component_system_software" */
  insert_map_application_component_system_software_one?: Maybe<Map_Application_Component_System_Software>;
  /** insert data into the table: "map_application_component_technology_logical_network" */
  insert_map_application_component_technology_logical_network?: Maybe<Map_Application_Component_Technology_Logical_Network_Mutation_Response>;
  /** insert a single row into the table: "map_application_component_technology_logical_network" */
  insert_map_application_component_technology_logical_network_one?: Maybe<Map_Application_Component_Technology_Logical_Network>;
  /** insert data into the table: "map_application_component_technology_node" */
  insert_map_application_component_technology_node?: Maybe<Map_Application_Component_Technology_Node_Mutation_Response>;
  /** insert a single row into the table: "map_application_component_technology_node" */
  insert_map_application_component_technology_node_one?: Maybe<Map_Application_Component_Technology_Node>;
  /** insert data into the table: "map_application_function_data_object" */
  insert_map_application_function_data_object?: Maybe<Map_Application_Function_Data_Object_Mutation_Response>;
  /** insert a single row into the table: "map_application_function_data_object" */
  insert_map_application_function_data_object_one?: Maybe<Map_Application_Function_Data_Object>;
  /** insert data into the table: "map_application_interface_function" */
  insert_map_application_interface_function?: Maybe<Map_Application_Interface_Function_Mutation_Response>;
  /** insert a single row into the table: "map_application_interface_function" */
  insert_map_application_interface_function_one?: Maybe<Map_Application_Interface_Function>;
  /** insert data into the table: "map_business_actor_role" */
  insert_map_business_actor_role?: Maybe<Map_Business_Actor_Role_Mutation_Response>;
  /** insert a single row into the table: "map_business_actor_role" */
  insert_map_business_actor_role_one?: Maybe<Map_Business_Actor_Role>;
  /** insert data into the table: "map_directory_items" */
  insert_map_directory_items?: Maybe<Map_Directory_Items_Mutation_Response>;
  /** insert a single row into the table: "map_directory_items" */
  insert_map_directory_items_one?: Maybe<Map_Directory_Items>;
  /** insert data into the table: "map_solution_application_component" */
  insert_map_solution_application_component?: Maybe<Map_Solution_Application_Component_Mutation_Response>;
  /** insert a single row into the table: "map_solution_application_component" */
  insert_map_solution_application_component_one?: Maybe<Map_Solution_Application_Component>;
  /** insert data into the table: "map_solution_constraint" */
  insert_map_solution_constraint?: Maybe<Map_Solution_Constraint_Mutation_Response>;
  /** insert a single row into the table: "map_solution_constraint" */
  insert_map_solution_constraint_one?: Maybe<Map_Solution_Constraint>;
  /** insert data into the table: "map_technology_network_hierarchy" */
  insert_map_technology_network_hierarchy?: Maybe<Map_Technology_Network_Hierarchy_Mutation_Response>;
  /** insert a single row into the table: "map_technology_network_hierarchy" */
  insert_map_technology_network_hierarchy_one?: Maybe<Map_Technology_Network_Hierarchy>;
  /** insert data into the table: "map_technology_node_hierarchy" */
  insert_map_technology_node_hierarchy?: Maybe<Map_Technology_Node_Hierarchy_Mutation_Response>;
  /** insert a single row into the table: "map_technology_node_hierarchy" */
  insert_map_technology_node_hierarchy_one?: Maybe<Map_Technology_Node_Hierarchy>;
  /** insert data into the table: "map_technology_node_system_software" */
  insert_map_technology_node_system_software?: Maybe<Map_Technology_Node_System_Software_Mutation_Response>;
  /** insert a single row into the table: "map_technology_node_system_software" */
  insert_map_technology_node_system_software_one?: Maybe<Map_Technology_Node_System_Software>;
  /** insert data into the table: "motivations" */
  insert_motivations?: Maybe<Motivations_Mutation_Response>;
  /** insert a single row into the table: "motivations" */
  insert_motivations_one?: Maybe<Motivations>;
  /** insert data into the table: "products" */
  insert_products?: Maybe<Products_Mutation_Response>;
  /** insert a single row into the table: "products" */
  insert_products_one?: Maybe<Products>;
  /** insert data into the table: "roles" */
  insert_roles?: Maybe<Roles_Mutation_Response>;
  /** insert a single row into the table: "roles" */
  insert_roles_one?: Maybe<Roles>;
  /** insert data into the table: "solutions" */
  insert_solutions?: Maybe<Solutions_Mutation_Response>;
  /** insert a single row into the table: "solutions" */
  insert_solutions_one?: Maybe<Solutions>;
  /** insert data into the table: "stakeholders" */
  insert_stakeholders?: Maybe<Stakeholders_Mutation_Response>;
  /** insert a single row into the table: "stakeholders" */
  insert_stakeholders_one?: Maybe<Stakeholders>;
  /** insert data into the table: "system_software" */
  insert_system_software?: Maybe<System_Software_Mutation_Response>;
  /** insert a single row into the table: "system_software" */
  insert_system_software_one?: Maybe<System_Software>;
  /** insert data into the table: "technology_networks" */
  insert_technology_networks?: Maybe<Technology_Networks_Mutation_Response>;
  /** insert a single row into the table: "technology_networks" */
  insert_technology_networks_one?: Maybe<Technology_Networks>;
  /** insert data into the table: "technology_nodes" */
  insert_technology_nodes?: Maybe<Technology_Nodes_Mutation_Response>;
  /** insert a single row into the table: "technology_nodes" */
  insert_technology_nodes_one?: Maybe<Technology_Nodes>;
  /** update data of the table: "actors" */
  update_actors?: Maybe<Actors_Mutation_Response>;
  /** update single row of the table: "actors" */
  update_actors_by_pk?: Maybe<Actors>;
  /** update multiples rows of table: "actors" */
  update_actors_many?: Maybe<Array<Maybe<Actors_Mutation_Response>>>;
  /** update data of the table: "capabilities" */
  update_capabilities?: Maybe<Capabilities_Mutation_Response>;
  /** update single row of the table: "capabilities" */
  update_capabilities_by_pk?: Maybe<Capabilities>;
  /** update multiples rows of table: "capabilities" */
  update_capabilities_many?: Maybe<Array<Maybe<Capabilities_Mutation_Response>>>;
  /** update data of the table: "components" */
  update_components?: Maybe<Components_Mutation_Response>;
  /** update single row of the table: "components" */
  update_components_by_pk?: Maybe<Components>;
  /** update multiples rows of table: "components" */
  update_components_many?: Maybe<Array<Maybe<Components_Mutation_Response>>>;
  /** update data of the table: "data_objects" */
  update_data_objects?: Maybe<Data_Objects_Mutation_Response>;
  /** update single row of the table: "data_objects" */
  update_data_objects_by_pk?: Maybe<Data_Objects>;
  /** update multiples rows of table: "data_objects" */
  update_data_objects_many?: Maybe<Array<Maybe<Data_Objects_Mutation_Response>>>;
  /** update data of the table: "directories" */
  update_directories?: Maybe<Directories_Mutation_Response>;
  /** update single row of the table: "directories" */
  update_directories_by_pk?: Maybe<Directories>;
  /** update multiples rows of table: "directories" */
  update_directories_many?: Maybe<Array<Maybe<Directories_Mutation_Response>>>;
  /** update data of the table: "employees" */
  update_employees?: Maybe<Employees_Mutation_Response>;
  /** update single row of the table: "employees" */
  update_employees_by_pk?: Maybe<Employees>;
  /** update multiples rows of table: "employees" */
  update_employees_many?: Maybe<Array<Maybe<Employees_Mutation_Response>>>;
  /** update data of the table: "events" */
  update_events?: Maybe<Events_Mutation_Response>;
  /** update single row of the table: "events" */
  update_events_by_pk?: Maybe<Events>;
  /** update multiples rows of table: "events" */
  update_events_many?: Maybe<Array<Maybe<Events_Mutation_Response>>>;
  /** update data of the table: "flows" */
  update_flows?: Maybe<Flows_Mutation_Response>;
  /** update single row of the table: "flows" */
  update_flows_by_pk?: Maybe<Flows>;
  /** update multiples rows of table: "flows" */
  update_flows_many?: Maybe<Array<Maybe<Flows_Mutation_Response>>>;
  /** update data of the table: "functions" */
  update_functions?: Maybe<Functions_Mutation_Response>;
  /** update single row of the table: "functions" */
  update_functions_by_pk?: Maybe<Functions>;
  /** update multiples rows of table: "functions" */
  update_functions_many?: Maybe<Array<Maybe<Functions_Mutation_Response>>>;
  /** update data of the table: "interfaces" */
  update_interfaces?: Maybe<Interfaces_Mutation_Response>;
  /** update single row of the table: "interfaces" */
  update_interfaces_by_pk?: Maybe<Interfaces>;
  /** update multiples rows of table: "interfaces" */
  update_interfaces_many?: Maybe<Array<Maybe<Interfaces_Mutation_Response>>>;
  /** update data of the table: "locations" */
  update_locations?: Maybe<Locations_Mutation_Response>;
  /** update single row of the table: "locations" */
  update_locations_by_pk?: Maybe<Locations>;
  /** update multiples rows of table: "locations" */
  update_locations_many?: Maybe<Array<Maybe<Locations_Mutation_Response>>>;
  /** update data of the table: "map_application_component_data_object" */
  update_map_application_component_data_object?: Maybe<Map_Application_Component_Data_Object_Mutation_Response>;
  /** update single row of the table: "map_application_component_data_object" */
  update_map_application_component_data_object_by_pk?: Maybe<Map_Application_Component_Data_Object>;
  /** update multiples rows of table: "map_application_component_data_object" */
  update_map_application_component_data_object_many?: Maybe<Array<Maybe<Map_Application_Component_Data_Object_Mutation_Response>>>;
  /** update data of the table: "map_application_component_event" */
  update_map_application_component_event?: Maybe<Map_Application_Component_Event_Mutation_Response>;
  /** update single row of the table: "map_application_component_event" */
  update_map_application_component_event_by_pk?: Maybe<Map_Application_Component_Event>;
  /** update multiples rows of table: "map_application_component_event" */
  update_map_application_component_event_many?: Maybe<Array<Maybe<Map_Application_Component_Event_Mutation_Response>>>;
  /** update data of the table: "map_application_component_function" */
  update_map_application_component_function?: Maybe<Map_Application_Component_Function_Mutation_Response>;
  /** update single row of the table: "map_application_component_function" */
  update_map_application_component_function_by_pk?: Maybe<Map_Application_Component_Function>;
  /** update multiples rows of table: "map_application_component_function" */
  update_map_application_component_function_many?: Maybe<Array<Maybe<Map_Application_Component_Function_Mutation_Response>>>;
  /** update data of the table: "map_application_component_hierarchy" */
  update_map_application_component_hierarchy?: Maybe<Map_Application_Component_Hierarchy_Mutation_Response>;
  /** update single row of the table: "map_application_component_hierarchy" */
  update_map_application_component_hierarchy_by_pk?: Maybe<Map_Application_Component_Hierarchy>;
  /** update multiples rows of table: "map_application_component_hierarchy" */
  update_map_application_component_hierarchy_many?: Maybe<Array<Maybe<Map_Application_Component_Hierarchy_Mutation_Response>>>;
  /** update data of the table: "map_application_component_interface" */
  update_map_application_component_interface?: Maybe<Map_Application_Component_Interface_Mutation_Response>;
  /** update single row of the table: "map_application_component_interface" */
  update_map_application_component_interface_by_pk?: Maybe<Map_Application_Component_Interface>;
  /** update multiples rows of table: "map_application_component_interface" */
  update_map_application_component_interface_many?: Maybe<Array<Maybe<Map_Application_Component_Interface_Mutation_Response>>>;
  /** update data of the table: "map_application_component_product" */
  update_map_application_component_product?: Maybe<Map_Application_Component_Product_Mutation_Response>;
  /** update single row of the table: "map_application_component_product" */
  update_map_application_component_product_by_pk?: Maybe<Map_Application_Component_Product>;
  /** update multiples rows of table: "map_application_component_product" */
  update_map_application_component_product_many?: Maybe<Array<Maybe<Map_Application_Component_Product_Mutation_Response>>>;
  /** update data of the table: "map_application_component_stakeholder" */
  update_map_application_component_stakeholder?: Maybe<Map_Application_Component_Stakeholder_Mutation_Response>;
  /** update single row of the table: "map_application_component_stakeholder" */
  update_map_application_component_stakeholder_by_pk?: Maybe<Map_Application_Component_Stakeholder>;
  /** update multiples rows of table: "map_application_component_stakeholder" */
  update_map_application_component_stakeholder_many?: Maybe<Array<Maybe<Map_Application_Component_Stakeholder_Mutation_Response>>>;
  /** update data of the table: "map_application_component_system_software" */
  update_map_application_component_system_software?: Maybe<Map_Application_Component_System_Software_Mutation_Response>;
  /** update single row of the table: "map_application_component_system_software" */
  update_map_application_component_system_software_by_pk?: Maybe<Map_Application_Component_System_Software>;
  /** update multiples rows of table: "map_application_component_system_software" */
  update_map_application_component_system_software_many?: Maybe<Array<Maybe<Map_Application_Component_System_Software_Mutation_Response>>>;
  /** update data of the table: "map_application_component_technology_logical_network" */
  update_map_application_component_technology_logical_network?: Maybe<Map_Application_Component_Technology_Logical_Network_Mutation_Response>;
  /** update single row of the table: "map_application_component_technology_logical_network" */
  update_map_application_component_technology_logical_network_by_pk?: Maybe<Map_Application_Component_Technology_Logical_Network>;
  /** update multiples rows of table: "map_application_component_technology_logical_network" */
  update_map_application_component_technology_logical_network_many?: Maybe<Array<Maybe<Map_Application_Component_Technology_Logical_Network_Mutation_Response>>>;
  /** update data of the table: "map_application_component_technology_node" */
  update_map_application_component_technology_node?: Maybe<Map_Application_Component_Technology_Node_Mutation_Response>;
  /** update single row of the table: "map_application_component_technology_node" */
  update_map_application_component_technology_node_by_pk?: Maybe<Map_Application_Component_Technology_Node>;
  /** update multiples rows of table: "map_application_component_technology_node" */
  update_map_application_component_technology_node_many?: Maybe<Array<Maybe<Map_Application_Component_Technology_Node_Mutation_Response>>>;
  /** update data of the table: "map_application_function_data_object" */
  update_map_application_function_data_object?: Maybe<Map_Application_Function_Data_Object_Mutation_Response>;
  /** update single row of the table: "map_application_function_data_object" */
  update_map_application_function_data_object_by_pk?: Maybe<Map_Application_Function_Data_Object>;
  /** update multiples rows of table: "map_application_function_data_object" */
  update_map_application_function_data_object_many?: Maybe<Array<Maybe<Map_Application_Function_Data_Object_Mutation_Response>>>;
  /** update data of the table: "map_application_interface_function" */
  update_map_application_interface_function?: Maybe<Map_Application_Interface_Function_Mutation_Response>;
  /** update single row of the table: "map_application_interface_function" */
  update_map_application_interface_function_by_pk?: Maybe<Map_Application_Interface_Function>;
  /** update multiples rows of table: "map_application_interface_function" */
  update_map_application_interface_function_many?: Maybe<Array<Maybe<Map_Application_Interface_Function_Mutation_Response>>>;
  /** update data of the table: "map_business_actor_role" */
  update_map_business_actor_role?: Maybe<Map_Business_Actor_Role_Mutation_Response>;
  /** update single row of the table: "map_business_actor_role" */
  update_map_business_actor_role_by_pk?: Maybe<Map_Business_Actor_Role>;
  /** update multiples rows of table: "map_business_actor_role" */
  update_map_business_actor_role_many?: Maybe<Array<Maybe<Map_Business_Actor_Role_Mutation_Response>>>;
  /** update data of the table: "map_directory_items" */
  update_map_directory_items?: Maybe<Map_Directory_Items_Mutation_Response>;
  /** update single row of the table: "map_directory_items" */
  update_map_directory_items_by_pk?: Maybe<Map_Directory_Items>;
  /** update multiples rows of table: "map_directory_items" */
  update_map_directory_items_many?: Maybe<Array<Maybe<Map_Directory_Items_Mutation_Response>>>;
  /** update data of the table: "map_solution_application_component" */
  update_map_solution_application_component?: Maybe<Map_Solution_Application_Component_Mutation_Response>;
  /** update single row of the table: "map_solution_application_component" */
  update_map_solution_application_component_by_pk?: Maybe<Map_Solution_Application_Component>;
  /** update multiples rows of table: "map_solution_application_component" */
  update_map_solution_application_component_many?: Maybe<Array<Maybe<Map_Solution_Application_Component_Mutation_Response>>>;
  /** update data of the table: "map_solution_constraint" */
  update_map_solution_constraint?: Maybe<Map_Solution_Constraint_Mutation_Response>;
  /** update single row of the table: "map_solution_constraint" */
  update_map_solution_constraint_by_pk?: Maybe<Map_Solution_Constraint>;
  /** update multiples rows of table: "map_solution_constraint" */
  update_map_solution_constraint_many?: Maybe<Array<Maybe<Map_Solution_Constraint_Mutation_Response>>>;
  /** update data of the table: "map_technology_network_hierarchy" */
  update_map_technology_network_hierarchy?: Maybe<Map_Technology_Network_Hierarchy_Mutation_Response>;
  /** update single row of the table: "map_technology_network_hierarchy" */
  update_map_technology_network_hierarchy_by_pk?: Maybe<Map_Technology_Network_Hierarchy>;
  /** update multiples rows of table: "map_technology_network_hierarchy" */
  update_map_technology_network_hierarchy_many?: Maybe<Array<Maybe<Map_Technology_Network_Hierarchy_Mutation_Response>>>;
  /** update data of the table: "map_technology_node_hierarchy" */
  update_map_technology_node_hierarchy?: Maybe<Map_Technology_Node_Hierarchy_Mutation_Response>;
  /** update single row of the table: "map_technology_node_hierarchy" */
  update_map_technology_node_hierarchy_by_pk?: Maybe<Map_Technology_Node_Hierarchy>;
  /** update multiples rows of table: "map_technology_node_hierarchy" */
  update_map_technology_node_hierarchy_many?: Maybe<Array<Maybe<Map_Technology_Node_Hierarchy_Mutation_Response>>>;
  /** update data of the table: "map_technology_node_system_software" */
  update_map_technology_node_system_software?: Maybe<Map_Technology_Node_System_Software_Mutation_Response>;
  /** update single row of the table: "map_technology_node_system_software" */
  update_map_technology_node_system_software_by_pk?: Maybe<Map_Technology_Node_System_Software>;
  /** update multiples rows of table: "map_technology_node_system_software" */
  update_map_technology_node_system_software_many?: Maybe<Array<Maybe<Map_Technology_Node_System_Software_Mutation_Response>>>;
  /** update data of the table: "motivations" */
  update_motivations?: Maybe<Motivations_Mutation_Response>;
  /** update single row of the table: "motivations" */
  update_motivations_by_pk?: Maybe<Motivations>;
  /** update multiples rows of table: "motivations" */
  update_motivations_many?: Maybe<Array<Maybe<Motivations_Mutation_Response>>>;
  /** update data of the table: "products" */
  update_products?: Maybe<Products_Mutation_Response>;
  /** update single row of the table: "products" */
  update_products_by_pk?: Maybe<Products>;
  /** update multiples rows of table: "products" */
  update_products_many?: Maybe<Array<Maybe<Products_Mutation_Response>>>;
  /** update data of the table: "roles" */
  update_roles?: Maybe<Roles_Mutation_Response>;
  /** update single row of the table: "roles" */
  update_roles_by_pk?: Maybe<Roles>;
  /** update multiples rows of table: "roles" */
  update_roles_many?: Maybe<Array<Maybe<Roles_Mutation_Response>>>;
  /** update data of the table: "solutions" */
  update_solutions?: Maybe<Solutions_Mutation_Response>;
  /** update single row of the table: "solutions" */
  update_solutions_by_pk?: Maybe<Solutions>;
  /** update multiples rows of table: "solutions" */
  update_solutions_many?: Maybe<Array<Maybe<Solutions_Mutation_Response>>>;
  /** update data of the table: "stakeholders" */
  update_stakeholders?: Maybe<Stakeholders_Mutation_Response>;
  /** update single row of the table: "stakeholders" */
  update_stakeholders_by_pk?: Maybe<Stakeholders>;
  /** update multiples rows of table: "stakeholders" */
  update_stakeholders_many?: Maybe<Array<Maybe<Stakeholders_Mutation_Response>>>;
  /** update data of the table: "system_software" */
  update_system_software?: Maybe<System_Software_Mutation_Response>;
  /** update single row of the table: "system_software" */
  update_system_software_by_pk?: Maybe<System_Software>;
  /** update multiples rows of table: "system_software" */
  update_system_software_many?: Maybe<Array<Maybe<System_Software_Mutation_Response>>>;
  /** update data of the table: "technology_networks" */
  update_technology_networks?: Maybe<Technology_Networks_Mutation_Response>;
  /** update single row of the table: "technology_networks" */
  update_technology_networks_by_pk?: Maybe<Technology_Networks>;
  /** update multiples rows of table: "technology_networks" */
  update_technology_networks_many?: Maybe<Array<Maybe<Technology_Networks_Mutation_Response>>>;
  /** update data of the table: "technology_nodes" */
  update_technology_nodes?: Maybe<Technology_Nodes_Mutation_Response>;
  /** update single row of the table: "technology_nodes" */
  update_technology_nodes_by_pk?: Maybe<Technology_Nodes>;
  /** update multiples rows of table: "technology_nodes" */
  update_technology_nodes_many?: Maybe<Array<Maybe<Technology_Nodes_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_ActorsArgs = {
  where: Actors_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Actors_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_CapabilitiesArgs = {
  where: Capabilities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Capabilities_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_ComponentsArgs = {
  where: Components_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Components_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Data_ObjectsArgs = {
  where: Data_Objects_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Data_Objects_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_DirectoriesArgs = {
  where: Directories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Directories_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_EmployeesArgs = {
  where: Employees_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Employees_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_EventsArgs = {
  where: Events_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Events_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_FlowsArgs = {
  where: Flows_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Flows_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_FunctionsArgs = {
  where: Functions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Functions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_InterfacesArgs = {
  where: Interfaces_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Interfaces_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_LocationsArgs = {
  where: Locations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Locations_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Map_Application_Component_Data_ObjectArgs = {
  where: Map_Application_Component_Data_Object_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Map_Application_Component_Data_Object_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  dataObjectId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Map_Application_Component_EventArgs = {
  where: Map_Application_Component_Event_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Map_Application_Component_Event_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  eventId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Map_Application_Component_FunctionArgs = {
  where: Map_Application_Component_Function_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Map_Application_Component_Function_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  functionId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Map_Application_Component_HierarchyArgs = {
  where: Map_Application_Component_Hierarchy_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Map_Application_Component_Hierarchy_By_PkArgs = {
  componentChildId: Scalars['uuid']['input'];
  componentParentId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Map_Application_Component_InterfaceArgs = {
  where: Map_Application_Component_Interface_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Map_Application_Component_Interface_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  interfaceId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Map_Application_Component_ProductArgs = {
  where: Map_Application_Component_Product_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Map_Application_Component_Product_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  productId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Map_Application_Component_StakeholderArgs = {
  where: Map_Application_Component_Stakeholder_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Map_Application_Component_Stakeholder_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  roleId: Scalars['uuid']['input'];
  stakeholderId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Map_Application_Component_System_SoftwareArgs = {
  where: Map_Application_Component_System_Software_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Map_Application_Component_System_Software_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  systemSoftwareId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Map_Application_Component_Technology_Logical_NetworkArgs = {
  where: Map_Application_Component_Technology_Logical_Network_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Map_Application_Component_Technology_Logical_Network_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  logicalNetworkId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Map_Application_Component_Technology_NodeArgs = {
  where: Map_Application_Component_Technology_Node_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Map_Application_Component_Technology_Node_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  nodeId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Map_Application_Function_Data_ObjectArgs = {
  where: Map_Application_Function_Data_Object_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Map_Application_Function_Data_Object_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  dataObjectId: Scalars['uuid']['input'];
  functionId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Map_Application_Interface_FunctionArgs = {
  where: Map_Application_Interface_Function_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Map_Application_Interface_Function_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  functionId: Scalars['uuid']['input'];
  interfaceId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Map_Business_Actor_RoleArgs = {
  where: Map_Business_Actor_Role_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Map_Business_Actor_Role_By_PkArgs = {
  actorId: Scalars['uuid']['input'];
  roleId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Map_Directory_ItemsArgs = {
  where: Map_Directory_Items_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Map_Directory_Items_By_PkArgs = {
  sourceId: Scalars['uuid']['input'];
  targetId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Map_Solution_Application_ComponentArgs = {
  where: Map_Solution_Application_Component_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Map_Solution_Application_Component_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Map_Solution_ConstraintArgs = {
  where: Map_Solution_Constraint_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Map_Solution_Constraint_By_PkArgs = {
  constraintId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Map_Technology_Network_HierarchyArgs = {
  where: Map_Technology_Network_Hierarchy_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Map_Technology_Network_Hierarchy_By_PkArgs = {
  networkChildId: Scalars['uuid']['input'];
  networkParentId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Map_Technology_Node_HierarchyArgs = {
  where: Map_Technology_Node_Hierarchy_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Map_Technology_Node_Hierarchy_By_PkArgs = {
  nodeChildId: Scalars['uuid']['input'];
  nodeParentId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Map_Technology_Node_System_SoftwareArgs = {
  where: Map_Technology_Node_System_Software_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Map_Technology_Node_System_Software_By_PkArgs = {
  nodeId: Scalars['uuid']['input'];
  systemSoftwareId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_MotivationsArgs = {
  where: Motivations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Motivations_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_ProductsArgs = {
  where: Products_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Products_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_RolesArgs = {
  where: Roles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Roles_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_SolutionsArgs = {
  where: Solutions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Solutions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_StakeholdersArgs = {
  where: Stakeholders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Stakeholders_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_System_SoftwareArgs = {
  where: System_Software_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_System_Software_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Technology_NetworksArgs = {
  where: Technology_Networks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Technology_Networks_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Technology_NodesArgs = {
  where: Technology_Nodes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Technology_Nodes_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootInsert_ActorsArgs = {
  objects: Array<Actors_Insert_Input>;
  on_conflict?: InputMaybe<Actors_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Actors_OneArgs = {
  object: Actors_Insert_Input;
  on_conflict?: InputMaybe<Actors_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CapabilitiesArgs = {
  objects: Array<Capabilities_Insert_Input>;
  on_conflict?: InputMaybe<Capabilities_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Capabilities_OneArgs = {
  object: Capabilities_Insert_Input;
  on_conflict?: InputMaybe<Capabilities_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ComponentsArgs = {
  objects: Array<Components_Insert_Input>;
  on_conflict?: InputMaybe<Components_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Components_OneArgs = {
  object: Components_Insert_Input;
  on_conflict?: InputMaybe<Components_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Data_ObjectsArgs = {
  objects: Array<Data_Objects_Insert_Input>;
  on_conflict?: InputMaybe<Data_Objects_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Data_Objects_OneArgs = {
  object: Data_Objects_Insert_Input;
  on_conflict?: InputMaybe<Data_Objects_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_DirectoriesArgs = {
  objects: Array<Directories_Insert_Input>;
  on_conflict?: InputMaybe<Directories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Directories_OneArgs = {
  object: Directories_Insert_Input;
  on_conflict?: InputMaybe<Directories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_EmployeesArgs = {
  objects: Array<Employees_Insert_Input>;
  on_conflict?: InputMaybe<Employees_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Employees_OneArgs = {
  object: Employees_Insert_Input;
  on_conflict?: InputMaybe<Employees_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_EventsArgs = {
  objects: Array<Events_Insert_Input>;
  on_conflict?: InputMaybe<Events_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Events_OneArgs = {
  object: Events_Insert_Input;
  on_conflict?: InputMaybe<Events_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_FlowsArgs = {
  objects: Array<Flows_Insert_Input>;
  on_conflict?: InputMaybe<Flows_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Flows_OneArgs = {
  object: Flows_Insert_Input;
  on_conflict?: InputMaybe<Flows_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_FunctionsArgs = {
  objects: Array<Functions_Insert_Input>;
  on_conflict?: InputMaybe<Functions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Functions_OneArgs = {
  object: Functions_Insert_Input;
  on_conflict?: InputMaybe<Functions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_InterfacesArgs = {
  objects: Array<Interfaces_Insert_Input>;
  on_conflict?: InputMaybe<Interfaces_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Interfaces_OneArgs = {
  object: Interfaces_Insert_Input;
  on_conflict?: InputMaybe<Interfaces_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_LocationsArgs = {
  objects: Array<Locations_Insert_Input>;
  on_conflict?: InputMaybe<Locations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Locations_OneArgs = {
  object: Locations_Insert_Input;
  on_conflict?: InputMaybe<Locations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Application_Component_Data_ObjectArgs = {
  objects: Array<Map_Application_Component_Data_Object_Insert_Input>;
  on_conflict?: InputMaybe<Map_Application_Component_Data_Object_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Application_Component_Data_Object_OneArgs = {
  object: Map_Application_Component_Data_Object_Insert_Input;
  on_conflict?: InputMaybe<Map_Application_Component_Data_Object_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Application_Component_EventArgs = {
  objects: Array<Map_Application_Component_Event_Insert_Input>;
  on_conflict?: InputMaybe<Map_Application_Component_Event_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Application_Component_Event_OneArgs = {
  object: Map_Application_Component_Event_Insert_Input;
  on_conflict?: InputMaybe<Map_Application_Component_Event_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Application_Component_FunctionArgs = {
  objects: Array<Map_Application_Component_Function_Insert_Input>;
  on_conflict?: InputMaybe<Map_Application_Component_Function_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Application_Component_Function_OneArgs = {
  object: Map_Application_Component_Function_Insert_Input;
  on_conflict?: InputMaybe<Map_Application_Component_Function_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Application_Component_HierarchyArgs = {
  objects: Array<Map_Application_Component_Hierarchy_Insert_Input>;
  on_conflict?: InputMaybe<Map_Application_Component_Hierarchy_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Application_Component_Hierarchy_OneArgs = {
  object: Map_Application_Component_Hierarchy_Insert_Input;
  on_conflict?: InputMaybe<Map_Application_Component_Hierarchy_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Application_Component_InterfaceArgs = {
  objects: Array<Map_Application_Component_Interface_Insert_Input>;
  on_conflict?: InputMaybe<Map_Application_Component_Interface_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Application_Component_Interface_OneArgs = {
  object: Map_Application_Component_Interface_Insert_Input;
  on_conflict?: InputMaybe<Map_Application_Component_Interface_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Application_Component_ProductArgs = {
  objects: Array<Map_Application_Component_Product_Insert_Input>;
  on_conflict?: InputMaybe<Map_Application_Component_Product_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Application_Component_Product_OneArgs = {
  object: Map_Application_Component_Product_Insert_Input;
  on_conflict?: InputMaybe<Map_Application_Component_Product_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Application_Component_StakeholderArgs = {
  objects: Array<Map_Application_Component_Stakeholder_Insert_Input>;
  on_conflict?: InputMaybe<Map_Application_Component_Stakeholder_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Application_Component_Stakeholder_OneArgs = {
  object: Map_Application_Component_Stakeholder_Insert_Input;
  on_conflict?: InputMaybe<Map_Application_Component_Stakeholder_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Application_Component_System_SoftwareArgs = {
  objects: Array<Map_Application_Component_System_Software_Insert_Input>;
  on_conflict?: InputMaybe<Map_Application_Component_System_Software_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Application_Component_System_Software_OneArgs = {
  object: Map_Application_Component_System_Software_Insert_Input;
  on_conflict?: InputMaybe<Map_Application_Component_System_Software_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Application_Component_Technology_Logical_NetworkArgs = {
  objects: Array<Map_Application_Component_Technology_Logical_Network_Insert_Input>;
  on_conflict?: InputMaybe<Map_Application_Component_Technology_Logical_Network_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Application_Component_Technology_Logical_Network_OneArgs = {
  object: Map_Application_Component_Technology_Logical_Network_Insert_Input;
  on_conflict?: InputMaybe<Map_Application_Component_Technology_Logical_Network_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Application_Component_Technology_NodeArgs = {
  objects: Array<Map_Application_Component_Technology_Node_Insert_Input>;
  on_conflict?: InputMaybe<Map_Application_Component_Technology_Node_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Application_Component_Technology_Node_OneArgs = {
  object: Map_Application_Component_Technology_Node_Insert_Input;
  on_conflict?: InputMaybe<Map_Application_Component_Technology_Node_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Application_Function_Data_ObjectArgs = {
  objects: Array<Map_Application_Function_Data_Object_Insert_Input>;
  on_conflict?: InputMaybe<Map_Application_Function_Data_Object_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Application_Function_Data_Object_OneArgs = {
  object: Map_Application_Function_Data_Object_Insert_Input;
  on_conflict?: InputMaybe<Map_Application_Function_Data_Object_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Application_Interface_FunctionArgs = {
  objects: Array<Map_Application_Interface_Function_Insert_Input>;
  on_conflict?: InputMaybe<Map_Application_Interface_Function_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Application_Interface_Function_OneArgs = {
  object: Map_Application_Interface_Function_Insert_Input;
  on_conflict?: InputMaybe<Map_Application_Interface_Function_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Business_Actor_RoleArgs = {
  objects: Array<Map_Business_Actor_Role_Insert_Input>;
  on_conflict?: InputMaybe<Map_Business_Actor_Role_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Business_Actor_Role_OneArgs = {
  object: Map_Business_Actor_Role_Insert_Input;
  on_conflict?: InputMaybe<Map_Business_Actor_Role_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Directory_ItemsArgs = {
  objects: Array<Map_Directory_Items_Insert_Input>;
  on_conflict?: InputMaybe<Map_Directory_Items_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Directory_Items_OneArgs = {
  object: Map_Directory_Items_Insert_Input;
  on_conflict?: InputMaybe<Map_Directory_Items_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Solution_Application_ComponentArgs = {
  objects: Array<Map_Solution_Application_Component_Insert_Input>;
  on_conflict?: InputMaybe<Map_Solution_Application_Component_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Solution_Application_Component_OneArgs = {
  object: Map_Solution_Application_Component_Insert_Input;
  on_conflict?: InputMaybe<Map_Solution_Application_Component_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Solution_ConstraintArgs = {
  objects: Array<Map_Solution_Constraint_Insert_Input>;
  on_conflict?: InputMaybe<Map_Solution_Constraint_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Solution_Constraint_OneArgs = {
  object: Map_Solution_Constraint_Insert_Input;
  on_conflict?: InputMaybe<Map_Solution_Constraint_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Technology_Network_HierarchyArgs = {
  objects: Array<Map_Technology_Network_Hierarchy_Insert_Input>;
  on_conflict?: InputMaybe<Map_Technology_Network_Hierarchy_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Technology_Network_Hierarchy_OneArgs = {
  object: Map_Technology_Network_Hierarchy_Insert_Input;
  on_conflict?: InputMaybe<Map_Technology_Network_Hierarchy_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Technology_Node_HierarchyArgs = {
  objects: Array<Map_Technology_Node_Hierarchy_Insert_Input>;
  on_conflict?: InputMaybe<Map_Technology_Node_Hierarchy_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Technology_Node_Hierarchy_OneArgs = {
  object: Map_Technology_Node_Hierarchy_Insert_Input;
  on_conflict?: InputMaybe<Map_Technology_Node_Hierarchy_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Technology_Node_System_SoftwareArgs = {
  objects: Array<Map_Technology_Node_System_Software_Insert_Input>;
  on_conflict?: InputMaybe<Map_Technology_Node_System_Software_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Map_Technology_Node_System_Software_OneArgs = {
  object: Map_Technology_Node_System_Software_Insert_Input;
  on_conflict?: InputMaybe<Map_Technology_Node_System_Software_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_MotivationsArgs = {
  objects: Array<Motivations_Insert_Input>;
  on_conflict?: InputMaybe<Motivations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Motivations_OneArgs = {
  object: Motivations_Insert_Input;
  on_conflict?: InputMaybe<Motivations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProductsArgs = {
  objects: Array<Products_Insert_Input>;
  on_conflict?: InputMaybe<Products_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Products_OneArgs = {
  object: Products_Insert_Input;
  on_conflict?: InputMaybe<Products_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_RolesArgs = {
  objects: Array<Roles_Insert_Input>;
  on_conflict?: InputMaybe<Roles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Roles_OneArgs = {
  object: Roles_Insert_Input;
  on_conflict?: InputMaybe<Roles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_SolutionsArgs = {
  objects: Array<Solutions_Insert_Input>;
  on_conflict?: InputMaybe<Solutions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Solutions_OneArgs = {
  object: Solutions_Insert_Input;
  on_conflict?: InputMaybe<Solutions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_StakeholdersArgs = {
  objects: Array<Stakeholders_Insert_Input>;
  on_conflict?: InputMaybe<Stakeholders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Stakeholders_OneArgs = {
  object: Stakeholders_Insert_Input;
  on_conflict?: InputMaybe<Stakeholders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_System_SoftwareArgs = {
  objects: Array<System_Software_Insert_Input>;
  on_conflict?: InputMaybe<System_Software_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_System_Software_OneArgs = {
  object: System_Software_Insert_Input;
  on_conflict?: InputMaybe<System_Software_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Technology_NetworksArgs = {
  objects: Array<Technology_Networks_Insert_Input>;
  on_conflict?: InputMaybe<Technology_Networks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Technology_Networks_OneArgs = {
  object: Technology_Networks_Insert_Input;
  on_conflict?: InputMaybe<Technology_Networks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Technology_NodesArgs = {
  objects: Array<Technology_Nodes_Insert_Input>;
  on_conflict?: InputMaybe<Technology_Nodes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Technology_Nodes_OneArgs = {
  object: Technology_Nodes_Insert_Input;
  on_conflict?: InputMaybe<Technology_Nodes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_ActorsArgs = {
  _set?: InputMaybe<Actors_Set_Input>;
  where: Actors_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Actors_By_PkArgs = {
  _set?: InputMaybe<Actors_Set_Input>;
  pk_columns: Actors_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Actors_ManyArgs = {
  updates: Array<Actors_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_CapabilitiesArgs = {
  _set?: InputMaybe<Capabilities_Set_Input>;
  where: Capabilities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Capabilities_By_PkArgs = {
  _set?: InputMaybe<Capabilities_Set_Input>;
  pk_columns: Capabilities_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Capabilities_ManyArgs = {
  updates: Array<Capabilities_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ComponentsArgs = {
  _set?: InputMaybe<Components_Set_Input>;
  where: Components_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Components_By_PkArgs = {
  _set?: InputMaybe<Components_Set_Input>;
  pk_columns: Components_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Components_ManyArgs = {
  updates: Array<Components_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Data_ObjectsArgs = {
  _set?: InputMaybe<Data_Objects_Set_Input>;
  where: Data_Objects_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Data_Objects_By_PkArgs = {
  _set?: InputMaybe<Data_Objects_Set_Input>;
  pk_columns: Data_Objects_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Data_Objects_ManyArgs = {
  updates: Array<Data_Objects_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_DirectoriesArgs = {
  _set?: InputMaybe<Directories_Set_Input>;
  where: Directories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Directories_By_PkArgs = {
  _set?: InputMaybe<Directories_Set_Input>;
  pk_columns: Directories_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Directories_ManyArgs = {
  updates: Array<Directories_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_EmployeesArgs = {
  _set?: InputMaybe<Employees_Set_Input>;
  where: Employees_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Employees_By_PkArgs = {
  _set?: InputMaybe<Employees_Set_Input>;
  pk_columns: Employees_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Employees_ManyArgs = {
  updates: Array<Employees_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_EventsArgs = {
  _set?: InputMaybe<Events_Set_Input>;
  where: Events_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Events_By_PkArgs = {
  _set?: InputMaybe<Events_Set_Input>;
  pk_columns: Events_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Events_ManyArgs = {
  updates: Array<Events_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_FlowsArgs = {
  _set?: InputMaybe<Flows_Set_Input>;
  where: Flows_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Flows_By_PkArgs = {
  _set?: InputMaybe<Flows_Set_Input>;
  pk_columns: Flows_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Flows_ManyArgs = {
  updates: Array<Flows_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_FunctionsArgs = {
  _set?: InputMaybe<Functions_Set_Input>;
  where: Functions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Functions_By_PkArgs = {
  _set?: InputMaybe<Functions_Set_Input>;
  pk_columns: Functions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Functions_ManyArgs = {
  updates: Array<Functions_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_InterfacesArgs = {
  _set?: InputMaybe<Interfaces_Set_Input>;
  where: Interfaces_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Interfaces_By_PkArgs = {
  _set?: InputMaybe<Interfaces_Set_Input>;
  pk_columns: Interfaces_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Interfaces_ManyArgs = {
  updates: Array<Interfaces_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_LocationsArgs = {
  _set?: InputMaybe<Locations_Set_Input>;
  where: Locations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Locations_By_PkArgs = {
  _set?: InputMaybe<Locations_Set_Input>;
  pk_columns: Locations_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Locations_ManyArgs = {
  updates: Array<Locations_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_Data_ObjectArgs = {
  _set?: InputMaybe<Map_Application_Component_Data_Object_Set_Input>;
  where: Map_Application_Component_Data_Object_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_Data_Object_By_PkArgs = {
  _set?: InputMaybe<Map_Application_Component_Data_Object_Set_Input>;
  pk_columns: Map_Application_Component_Data_Object_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_Data_Object_ManyArgs = {
  updates: Array<Map_Application_Component_Data_Object_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_EventArgs = {
  _set?: InputMaybe<Map_Application_Component_Event_Set_Input>;
  where: Map_Application_Component_Event_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_Event_By_PkArgs = {
  _set?: InputMaybe<Map_Application_Component_Event_Set_Input>;
  pk_columns: Map_Application_Component_Event_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_Event_ManyArgs = {
  updates: Array<Map_Application_Component_Event_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_FunctionArgs = {
  _set?: InputMaybe<Map_Application_Component_Function_Set_Input>;
  where: Map_Application_Component_Function_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_Function_By_PkArgs = {
  _set?: InputMaybe<Map_Application_Component_Function_Set_Input>;
  pk_columns: Map_Application_Component_Function_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_Function_ManyArgs = {
  updates: Array<Map_Application_Component_Function_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_HierarchyArgs = {
  _inc?: InputMaybe<Map_Application_Component_Hierarchy_Inc_Input>;
  _set?: InputMaybe<Map_Application_Component_Hierarchy_Set_Input>;
  where: Map_Application_Component_Hierarchy_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_Hierarchy_By_PkArgs = {
  _inc?: InputMaybe<Map_Application_Component_Hierarchy_Inc_Input>;
  _set?: InputMaybe<Map_Application_Component_Hierarchy_Set_Input>;
  pk_columns: Map_Application_Component_Hierarchy_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_Hierarchy_ManyArgs = {
  updates: Array<Map_Application_Component_Hierarchy_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_InterfaceArgs = {
  _set?: InputMaybe<Map_Application_Component_Interface_Set_Input>;
  where: Map_Application_Component_Interface_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_Interface_By_PkArgs = {
  _set?: InputMaybe<Map_Application_Component_Interface_Set_Input>;
  pk_columns: Map_Application_Component_Interface_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_Interface_ManyArgs = {
  updates: Array<Map_Application_Component_Interface_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_ProductArgs = {
  _set?: InputMaybe<Map_Application_Component_Product_Set_Input>;
  where: Map_Application_Component_Product_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_Product_By_PkArgs = {
  _set?: InputMaybe<Map_Application_Component_Product_Set_Input>;
  pk_columns: Map_Application_Component_Product_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_Product_ManyArgs = {
  updates: Array<Map_Application_Component_Product_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_StakeholderArgs = {
  _set?: InputMaybe<Map_Application_Component_Stakeholder_Set_Input>;
  where: Map_Application_Component_Stakeholder_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_Stakeholder_By_PkArgs = {
  _set?: InputMaybe<Map_Application_Component_Stakeholder_Set_Input>;
  pk_columns: Map_Application_Component_Stakeholder_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_Stakeholder_ManyArgs = {
  updates: Array<Map_Application_Component_Stakeholder_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_System_SoftwareArgs = {
  _set?: InputMaybe<Map_Application_Component_System_Software_Set_Input>;
  where: Map_Application_Component_System_Software_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_System_Software_By_PkArgs = {
  _set?: InputMaybe<Map_Application_Component_System_Software_Set_Input>;
  pk_columns: Map_Application_Component_System_Software_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_System_Software_ManyArgs = {
  updates: Array<Map_Application_Component_System_Software_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_Technology_Logical_NetworkArgs = {
  _set?: InputMaybe<Map_Application_Component_Technology_Logical_Network_Set_Input>;
  where: Map_Application_Component_Technology_Logical_Network_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_Technology_Logical_Network_By_PkArgs = {
  _set?: InputMaybe<Map_Application_Component_Technology_Logical_Network_Set_Input>;
  pk_columns: Map_Application_Component_Technology_Logical_Network_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_Technology_Logical_Network_ManyArgs = {
  updates: Array<Map_Application_Component_Technology_Logical_Network_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_Technology_NodeArgs = {
  _set?: InputMaybe<Map_Application_Component_Technology_Node_Set_Input>;
  where: Map_Application_Component_Technology_Node_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_Technology_Node_By_PkArgs = {
  _set?: InputMaybe<Map_Application_Component_Technology_Node_Set_Input>;
  pk_columns: Map_Application_Component_Technology_Node_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Component_Technology_Node_ManyArgs = {
  updates: Array<Map_Application_Component_Technology_Node_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Function_Data_ObjectArgs = {
  _set?: InputMaybe<Map_Application_Function_Data_Object_Set_Input>;
  where: Map_Application_Function_Data_Object_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Function_Data_Object_By_PkArgs = {
  _set?: InputMaybe<Map_Application_Function_Data_Object_Set_Input>;
  pk_columns: Map_Application_Function_Data_Object_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Function_Data_Object_ManyArgs = {
  updates: Array<Map_Application_Function_Data_Object_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Interface_FunctionArgs = {
  _set?: InputMaybe<Map_Application_Interface_Function_Set_Input>;
  where: Map_Application_Interface_Function_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Interface_Function_By_PkArgs = {
  _set?: InputMaybe<Map_Application_Interface_Function_Set_Input>;
  pk_columns: Map_Application_Interface_Function_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Application_Interface_Function_ManyArgs = {
  updates: Array<Map_Application_Interface_Function_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Business_Actor_RoleArgs = {
  _set?: InputMaybe<Map_Business_Actor_Role_Set_Input>;
  where: Map_Business_Actor_Role_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Business_Actor_Role_By_PkArgs = {
  _set?: InputMaybe<Map_Business_Actor_Role_Set_Input>;
  pk_columns: Map_Business_Actor_Role_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Business_Actor_Role_ManyArgs = {
  updates: Array<Map_Business_Actor_Role_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Directory_ItemsArgs = {
  _set?: InputMaybe<Map_Directory_Items_Set_Input>;
  where: Map_Directory_Items_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Directory_Items_By_PkArgs = {
  _set?: InputMaybe<Map_Directory_Items_Set_Input>;
  pk_columns: Map_Directory_Items_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Directory_Items_ManyArgs = {
  updates: Array<Map_Directory_Items_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Solution_Application_ComponentArgs = {
  _set?: InputMaybe<Map_Solution_Application_Component_Set_Input>;
  where: Map_Solution_Application_Component_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Solution_Application_Component_By_PkArgs = {
  _set?: InputMaybe<Map_Solution_Application_Component_Set_Input>;
  pk_columns: Map_Solution_Application_Component_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Solution_Application_Component_ManyArgs = {
  updates: Array<Map_Solution_Application_Component_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Solution_ConstraintArgs = {
  _set?: InputMaybe<Map_Solution_Constraint_Set_Input>;
  where: Map_Solution_Constraint_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Solution_Constraint_By_PkArgs = {
  _set?: InputMaybe<Map_Solution_Constraint_Set_Input>;
  pk_columns: Map_Solution_Constraint_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Solution_Constraint_ManyArgs = {
  updates: Array<Map_Solution_Constraint_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Technology_Network_HierarchyArgs = {
  _inc?: InputMaybe<Map_Technology_Network_Hierarchy_Inc_Input>;
  _set?: InputMaybe<Map_Technology_Network_Hierarchy_Set_Input>;
  where: Map_Technology_Network_Hierarchy_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Technology_Network_Hierarchy_By_PkArgs = {
  _inc?: InputMaybe<Map_Technology_Network_Hierarchy_Inc_Input>;
  _set?: InputMaybe<Map_Technology_Network_Hierarchy_Set_Input>;
  pk_columns: Map_Technology_Network_Hierarchy_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Technology_Network_Hierarchy_ManyArgs = {
  updates: Array<Map_Technology_Network_Hierarchy_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Technology_Node_HierarchyArgs = {
  _inc?: InputMaybe<Map_Technology_Node_Hierarchy_Inc_Input>;
  _set?: InputMaybe<Map_Technology_Node_Hierarchy_Set_Input>;
  where: Map_Technology_Node_Hierarchy_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Technology_Node_Hierarchy_By_PkArgs = {
  _inc?: InputMaybe<Map_Technology_Node_Hierarchy_Inc_Input>;
  _set?: InputMaybe<Map_Technology_Node_Hierarchy_Set_Input>;
  pk_columns: Map_Technology_Node_Hierarchy_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Technology_Node_Hierarchy_ManyArgs = {
  updates: Array<Map_Technology_Node_Hierarchy_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Technology_Node_System_SoftwareArgs = {
  _set?: InputMaybe<Map_Technology_Node_System_Software_Set_Input>;
  where: Map_Technology_Node_System_Software_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Technology_Node_System_Software_By_PkArgs = {
  _set?: InputMaybe<Map_Technology_Node_System_Software_Set_Input>;
  pk_columns: Map_Technology_Node_System_Software_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Map_Technology_Node_System_Software_ManyArgs = {
  updates: Array<Map_Technology_Node_System_Software_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_MotivationsArgs = {
  _inc?: InputMaybe<Motivations_Inc_Input>;
  _set?: InputMaybe<Motivations_Set_Input>;
  where: Motivations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Motivations_By_PkArgs = {
  _inc?: InputMaybe<Motivations_Inc_Input>;
  _set?: InputMaybe<Motivations_Set_Input>;
  pk_columns: Motivations_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Motivations_ManyArgs = {
  updates: Array<Motivations_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ProductsArgs = {
  _set?: InputMaybe<Products_Set_Input>;
  where: Products_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Products_By_PkArgs = {
  _set?: InputMaybe<Products_Set_Input>;
  pk_columns: Products_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Products_ManyArgs = {
  updates: Array<Products_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_RolesArgs = {
  _set?: InputMaybe<Roles_Set_Input>;
  where: Roles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Roles_By_PkArgs = {
  _set?: InputMaybe<Roles_Set_Input>;
  pk_columns: Roles_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Roles_ManyArgs = {
  updates: Array<Roles_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_SolutionsArgs = {
  _set?: InputMaybe<Solutions_Set_Input>;
  where: Solutions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Solutions_By_PkArgs = {
  _set?: InputMaybe<Solutions_Set_Input>;
  pk_columns: Solutions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Solutions_ManyArgs = {
  updates: Array<Solutions_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_StakeholdersArgs = {
  _set?: InputMaybe<Stakeholders_Set_Input>;
  where: Stakeholders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Stakeholders_By_PkArgs = {
  _set?: InputMaybe<Stakeholders_Set_Input>;
  pk_columns: Stakeholders_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Stakeholders_ManyArgs = {
  updates: Array<Stakeholders_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_System_SoftwareArgs = {
  _set?: InputMaybe<System_Software_Set_Input>;
  where: System_Software_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_System_Software_By_PkArgs = {
  _set?: InputMaybe<System_Software_Set_Input>;
  pk_columns: System_Software_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_System_Software_ManyArgs = {
  updates: Array<System_Software_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Technology_NetworksArgs = {
  _set?: InputMaybe<Technology_Networks_Set_Input>;
  where: Technology_Networks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Technology_Networks_By_PkArgs = {
  _set?: InputMaybe<Technology_Networks_Set_Input>;
  pk_columns: Technology_Networks_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Technology_Networks_ManyArgs = {
  updates: Array<Technology_Networks_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Technology_NodesArgs = {
  _inc?: InputMaybe<Technology_Nodes_Inc_Input>;
  _set?: InputMaybe<Technology_Nodes_Set_Input>;
  where: Technology_Nodes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Technology_Nodes_By_PkArgs = {
  _inc?: InputMaybe<Technology_Nodes_Inc_Input>;
  _set?: InputMaybe<Technology_Nodes_Set_Input>;
  pk_columns: Technology_Nodes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Technology_Nodes_ManyArgs = {
  updates: Array<Technology_Nodes_Updates>;
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

/** columns and relationships of "products" */
export type Products = {
  __typename?: 'products';
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  /** An array relationship */
  mapComponents: Array<Map_Application_Component_Product>;
  /** An aggregate relationship */
  mapComponents_aggregate: Map_Application_Component_Product_Aggregate;
  name: Scalars['String']['output'];
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "products" */
export type ProductsMapComponentsArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Product_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Product_Bool_Exp>;
};


/** columns and relationships of "products" */
export type ProductsMapComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Product_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Product_Bool_Exp>;
};

/** aggregated selection of "products" */
export type Products_Aggregate = {
  __typename?: 'products_aggregate';
  aggregate?: Maybe<Products_Aggregate_Fields>;
  nodes: Array<Products>;
};

/** aggregate fields of "products" */
export type Products_Aggregate_Fields = {
  __typename?: 'products_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Products_Max_Fields>;
  min?: Maybe<Products_Min_Fields>;
};


/** aggregate fields of "products" */
export type Products_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Products_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "products". All fields are combined with a logical 'AND'. */
export type Products_Bool_Exp = {
  _and?: InputMaybe<Array<Products_Bool_Exp>>;
  _not?: InputMaybe<Products_Bool_Exp>;
  _or?: InputMaybe<Array<Products_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  mapComponents?: InputMaybe<Map_Application_Component_Product_Bool_Exp>;
  mapComponents_aggregate?: InputMaybe<Map_Application_Component_Product_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  ownerId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "products" */
export enum Products_Constraint {
  /** unique or primary key constraint on columns "code" */
  ProductsCodeUnique = 'products_code_unique',
  /** unique or primary key constraint on columns "id" */
  ProductsPkey = 'products_pkey'
}

/** input type for inserting data into table "products" */
export type Products_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  mapComponents?: InputMaybe<Map_Application_Component_Product_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Products_Max_Fields = {
  __typename?: 'products_max_fields';
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
export type Products_Min_Fields = {
  __typename?: 'products_min_fields';
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
export type Products_Mutation_Response = {
  __typename?: 'products_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Products>;
};

/** input type for inserting object relation for remote table "products" */
export type Products_Obj_Rel_Insert_Input = {
  data: Products_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Products_On_Conflict>;
};

/** on_conflict condition type for table "products" */
export type Products_On_Conflict = {
  constraint: Products_Constraint;
  update_columns?: Array<Products_Update_Column>;
  where?: InputMaybe<Products_Bool_Exp>;
};

/** Ordering options when selecting data from "products". */
export type Products_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mapComponents_aggregate?: InputMaybe<Map_Application_Component_Product_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  ownerId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: products */
export type Products_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "products" */
export enum Products_Select_Column {
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
export type Products_Set_Input = {
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

/** Streaming cursor of the table "products" */
export type Products_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Products_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Products_Stream_Cursor_Value_Input = {
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
export enum Products_Update_Column {
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

export type Products_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Products_Set_Input>;
  /** filter the rows which have to be updated */
  where: Products_Bool_Exp;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "actors" */
  actors: Array<Actors>;
  /** fetch aggregated fields from the table: "actors" */
  actors_aggregate: Actors_Aggregate;
  /** fetch data from the table: "actors" using primary key columns */
  actors_by_pk?: Maybe<Actors>;
  /** An array relationship */
  capabilities: Array<Capabilities>;
  /** An aggregate relationship */
  capabilities_aggregate: Capabilities_Aggregate;
  /** fetch data from the table: "capabilities" using primary key columns */
  capabilities_by_pk?: Maybe<Capabilities>;
  /** fetch data from the table: "components" */
  components: Array<Components>;
  /** fetch aggregated fields from the table: "components" */
  components_aggregate: Components_Aggregate;
  /** fetch data from the table: "components" using primary key columns */
  components_by_pk?: Maybe<Components>;
  /** fetch data from the table: "data_objects" */
  data_objects: Array<Data_Objects>;
  /** fetch aggregated fields from the table: "data_objects" */
  data_objects_aggregate: Data_Objects_Aggregate;
  /** fetch data from the table: "data_objects" using primary key columns */
  data_objects_by_pk?: Maybe<Data_Objects>;
  /** fetch data from the table: "directories" */
  directories: Array<Directories>;
  /** fetch aggregated fields from the table: "directories" */
  directories_aggregate: Directories_Aggregate;
  /** fetch data from the table: "directories" using primary key columns */
  directories_by_pk?: Maybe<Directories>;
  /** fetch data from the table: "employees" */
  employees: Array<Employees>;
  /** fetch aggregated fields from the table: "employees" */
  employees_aggregate: Employees_Aggregate;
  /** fetch data from the table: "employees" using primary key columns */
  employees_by_pk?: Maybe<Employees>;
  /** fetch data from the table: "events" */
  events: Array<Events>;
  /** fetch aggregated fields from the table: "events" */
  events_aggregate: Events_Aggregate;
  /** fetch data from the table: "events" using primary key columns */
  events_by_pk?: Maybe<Events>;
  /** An array relationship */
  flows: Array<Flows>;
  /** An aggregate relationship */
  flows_aggregate: Flows_Aggregate;
  /** fetch data from the table: "flows" using primary key columns */
  flows_by_pk?: Maybe<Flows>;
  /** fetch data from the table: "functions" */
  functions: Array<Functions>;
  /** fetch aggregated fields from the table: "functions" */
  functions_aggregate: Functions_Aggregate;
  /** fetch data from the table: "functions" using primary key columns */
  functions_by_pk?: Maybe<Functions>;
  /** fetch data from the table: "interfaces" */
  interfaces: Array<Interfaces>;
  /** fetch aggregated fields from the table: "interfaces" */
  interfaces_aggregate: Interfaces_Aggregate;
  /** fetch data from the table: "interfaces" using primary key columns */
  interfaces_by_pk?: Maybe<Interfaces>;
  /** fetch data from the table: "locations" */
  locations: Array<Locations>;
  /** fetch aggregated fields from the table: "locations" */
  locations_aggregate: Locations_Aggregate;
  /** fetch data from the table: "locations" using primary key columns */
  locations_by_pk?: Maybe<Locations>;
  /** fetch data from the table: "map_application_component_data_object" */
  map_application_component_data_object: Array<Map_Application_Component_Data_Object>;
  /** fetch aggregated fields from the table: "map_application_component_data_object" */
  map_application_component_data_object_aggregate: Map_Application_Component_Data_Object_Aggregate;
  /** fetch data from the table: "map_application_component_data_object" using primary key columns */
  map_application_component_data_object_by_pk?: Maybe<Map_Application_Component_Data_Object>;
  /** fetch data from the table: "map_application_component_event" */
  map_application_component_event: Array<Map_Application_Component_Event>;
  /** fetch aggregated fields from the table: "map_application_component_event" */
  map_application_component_event_aggregate: Map_Application_Component_Event_Aggregate;
  /** fetch data from the table: "map_application_component_event" using primary key columns */
  map_application_component_event_by_pk?: Maybe<Map_Application_Component_Event>;
  /** fetch data from the table: "map_application_component_function" */
  map_application_component_function: Array<Map_Application_Component_Function>;
  /** fetch aggregated fields from the table: "map_application_component_function" */
  map_application_component_function_aggregate: Map_Application_Component_Function_Aggregate;
  /** fetch data from the table: "map_application_component_function" using primary key columns */
  map_application_component_function_by_pk?: Maybe<Map_Application_Component_Function>;
  /** fetch data from the table: "map_application_component_hierarchy" */
  map_application_component_hierarchy: Array<Map_Application_Component_Hierarchy>;
  /** fetch aggregated fields from the table: "map_application_component_hierarchy" */
  map_application_component_hierarchy_aggregate: Map_Application_Component_Hierarchy_Aggregate;
  /** fetch data from the table: "map_application_component_hierarchy" using primary key columns */
  map_application_component_hierarchy_by_pk?: Maybe<Map_Application_Component_Hierarchy>;
  /** fetch data from the table: "map_application_component_interface" */
  map_application_component_interface: Array<Map_Application_Component_Interface>;
  /** fetch aggregated fields from the table: "map_application_component_interface" */
  map_application_component_interface_aggregate: Map_Application_Component_Interface_Aggregate;
  /** fetch data from the table: "map_application_component_interface" using primary key columns */
  map_application_component_interface_by_pk?: Maybe<Map_Application_Component_Interface>;
  /** fetch data from the table: "map_application_component_product" */
  map_application_component_product: Array<Map_Application_Component_Product>;
  /** fetch aggregated fields from the table: "map_application_component_product" */
  map_application_component_product_aggregate: Map_Application_Component_Product_Aggregate;
  /** fetch data from the table: "map_application_component_product" using primary key columns */
  map_application_component_product_by_pk?: Maybe<Map_Application_Component_Product>;
  /** fetch data from the table: "map_application_component_stakeholder" */
  map_application_component_stakeholder: Array<Map_Application_Component_Stakeholder>;
  /** fetch aggregated fields from the table: "map_application_component_stakeholder" */
  map_application_component_stakeholder_aggregate: Map_Application_Component_Stakeholder_Aggregate;
  /** fetch data from the table: "map_application_component_stakeholder" using primary key columns */
  map_application_component_stakeholder_by_pk?: Maybe<Map_Application_Component_Stakeholder>;
  /** fetch data from the table: "map_application_component_system_software" */
  map_application_component_system_software: Array<Map_Application_Component_System_Software>;
  /** fetch aggregated fields from the table: "map_application_component_system_software" */
  map_application_component_system_software_aggregate: Map_Application_Component_System_Software_Aggregate;
  /** fetch data from the table: "map_application_component_system_software" using primary key columns */
  map_application_component_system_software_by_pk?: Maybe<Map_Application_Component_System_Software>;
  /** fetch data from the table: "map_application_component_technology_logical_network" */
  map_application_component_technology_logical_network: Array<Map_Application_Component_Technology_Logical_Network>;
  /** fetch aggregated fields from the table: "map_application_component_technology_logical_network" */
  map_application_component_technology_logical_network_aggregate: Map_Application_Component_Technology_Logical_Network_Aggregate;
  /** fetch data from the table: "map_application_component_technology_logical_network" using primary key columns */
  map_application_component_technology_logical_network_by_pk?: Maybe<Map_Application_Component_Technology_Logical_Network>;
  /** fetch data from the table: "map_application_component_technology_node" */
  map_application_component_technology_node: Array<Map_Application_Component_Technology_Node>;
  /** fetch aggregated fields from the table: "map_application_component_technology_node" */
  map_application_component_technology_node_aggregate: Map_Application_Component_Technology_Node_Aggregate;
  /** fetch data from the table: "map_application_component_technology_node" using primary key columns */
  map_application_component_technology_node_by_pk?: Maybe<Map_Application_Component_Technology_Node>;
  /** fetch data from the table: "map_application_function_data_object" */
  map_application_function_data_object: Array<Map_Application_Function_Data_Object>;
  /** fetch aggregated fields from the table: "map_application_function_data_object" */
  map_application_function_data_object_aggregate: Map_Application_Function_Data_Object_Aggregate;
  /** fetch data from the table: "map_application_function_data_object" using primary key columns */
  map_application_function_data_object_by_pk?: Maybe<Map_Application_Function_Data_Object>;
  /** fetch data from the table: "map_application_interface_function" */
  map_application_interface_function: Array<Map_Application_Interface_Function>;
  /** fetch aggregated fields from the table: "map_application_interface_function" */
  map_application_interface_function_aggregate: Map_Application_Interface_Function_Aggregate;
  /** fetch data from the table: "map_application_interface_function" using primary key columns */
  map_application_interface_function_by_pk?: Maybe<Map_Application_Interface_Function>;
  /** fetch data from the table: "map_business_actor_role" */
  map_business_actor_role: Array<Map_Business_Actor_Role>;
  /** fetch aggregated fields from the table: "map_business_actor_role" */
  map_business_actor_role_aggregate: Map_Business_Actor_Role_Aggregate;
  /** fetch data from the table: "map_business_actor_role" using primary key columns */
  map_business_actor_role_by_pk?: Maybe<Map_Business_Actor_Role>;
  /** fetch data from the table: "map_directory_items" */
  map_directory_items: Array<Map_Directory_Items>;
  /** fetch aggregated fields from the table: "map_directory_items" */
  map_directory_items_aggregate: Map_Directory_Items_Aggregate;
  /** fetch data from the table: "map_directory_items" using primary key columns */
  map_directory_items_by_pk?: Maybe<Map_Directory_Items>;
  /** fetch data from the table: "map_solution_application_component" */
  map_solution_application_component: Array<Map_Solution_Application_Component>;
  /** fetch aggregated fields from the table: "map_solution_application_component" */
  map_solution_application_component_aggregate: Map_Solution_Application_Component_Aggregate;
  /** fetch data from the table: "map_solution_application_component" using primary key columns */
  map_solution_application_component_by_pk?: Maybe<Map_Solution_Application_Component>;
  /** fetch data from the table: "map_solution_constraint" */
  map_solution_constraint: Array<Map_Solution_Constraint>;
  /** fetch aggregated fields from the table: "map_solution_constraint" */
  map_solution_constraint_aggregate: Map_Solution_Constraint_Aggregate;
  /** fetch data from the table: "map_solution_constraint" using primary key columns */
  map_solution_constraint_by_pk?: Maybe<Map_Solution_Constraint>;
  /** fetch data from the table: "map_technology_network_hierarchy" */
  map_technology_network_hierarchy: Array<Map_Technology_Network_Hierarchy>;
  /** fetch aggregated fields from the table: "map_technology_network_hierarchy" */
  map_technology_network_hierarchy_aggregate: Map_Technology_Network_Hierarchy_Aggregate;
  /** fetch data from the table: "map_technology_network_hierarchy" using primary key columns */
  map_technology_network_hierarchy_by_pk?: Maybe<Map_Technology_Network_Hierarchy>;
  /** fetch data from the table: "map_technology_node_hierarchy" */
  map_technology_node_hierarchy: Array<Map_Technology_Node_Hierarchy>;
  /** fetch aggregated fields from the table: "map_technology_node_hierarchy" */
  map_technology_node_hierarchy_aggregate: Map_Technology_Node_Hierarchy_Aggregate;
  /** fetch data from the table: "map_technology_node_hierarchy" using primary key columns */
  map_technology_node_hierarchy_by_pk?: Maybe<Map_Technology_Node_Hierarchy>;
  /** fetch data from the table: "map_technology_node_system_software" */
  map_technology_node_system_software: Array<Map_Technology_Node_System_Software>;
  /** fetch aggregated fields from the table: "map_technology_node_system_software" */
  map_technology_node_system_software_aggregate: Map_Technology_Node_System_Software_Aggregate;
  /** fetch data from the table: "map_technology_node_system_software" using primary key columns */
  map_technology_node_system_software_by_pk?: Maybe<Map_Technology_Node_System_Software>;
  /** fetch data from the table: "motivations" */
  motivations: Array<Motivations>;
  /** fetch aggregated fields from the table: "motivations" */
  motivations_aggregate: Motivations_Aggregate;
  /** fetch data from the table: "motivations" using primary key columns */
  motivations_by_pk?: Maybe<Motivations>;
  /** fetch data from the table: "products" */
  products: Array<Products>;
  /** fetch aggregated fields from the table: "products" */
  products_aggregate: Products_Aggregate;
  /** fetch data from the table: "products" using primary key columns */
  products_by_pk?: Maybe<Products>;
  /** fetch data from the table: "roles" */
  roles: Array<Roles>;
  /** fetch aggregated fields from the table: "roles" */
  roles_aggregate: Roles_Aggregate;
  /** fetch data from the table: "roles" using primary key columns */
  roles_by_pk?: Maybe<Roles>;
  /** fetch data from the table: "solutions" */
  solutions: Array<Solutions>;
  /** fetch aggregated fields from the table: "solutions" */
  solutions_aggregate: Solutions_Aggregate;
  /** fetch data from the table: "solutions" using primary key columns */
  solutions_by_pk?: Maybe<Solutions>;
  /** fetch data from the table: "stakeholders" */
  stakeholders: Array<Stakeholders>;
  /** fetch aggregated fields from the table: "stakeholders" */
  stakeholders_aggregate: Stakeholders_Aggregate;
  /** fetch data from the table: "stakeholders" using primary key columns */
  stakeholders_by_pk?: Maybe<Stakeholders>;
  /** fetch data from the table: "system_software" */
  system_software: Array<System_Software>;
  /** fetch aggregated fields from the table: "system_software" */
  system_software_aggregate: System_Software_Aggregate;
  /** fetch data from the table: "system_software" using primary key columns */
  system_software_by_pk?: Maybe<System_Software>;
  /** fetch data from the table: "technology_networks" */
  technology_networks: Array<Technology_Networks>;
  /** fetch aggregated fields from the table: "technology_networks" */
  technology_networks_aggregate: Technology_Networks_Aggregate;
  /** fetch data from the table: "technology_networks" using primary key columns */
  technology_networks_by_pk?: Maybe<Technology_Networks>;
  /** fetch data from the table: "technology_nodes" */
  technology_nodes: Array<Technology_Nodes>;
  /** fetch aggregated fields from the table: "technology_nodes" */
  technology_nodes_aggregate: Technology_Nodes_Aggregate;
  /** fetch data from the table: "technology_nodes" using primary key columns */
  technology_nodes_by_pk?: Maybe<Technology_Nodes>;
};


export type Query_RootActorsArgs = {
  distinct_on?: InputMaybe<Array<Actors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Actors_Order_By>>;
  where?: InputMaybe<Actors_Bool_Exp>;
};


export type Query_RootActors_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Actors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Actors_Order_By>>;
  where?: InputMaybe<Actors_Bool_Exp>;
};


export type Query_RootActors_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootCapabilitiesArgs = {
  distinct_on?: InputMaybe<Array<Capabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Capabilities_Order_By>>;
  where?: InputMaybe<Capabilities_Bool_Exp>;
};


export type Query_RootCapabilities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Capabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Capabilities_Order_By>>;
  where?: InputMaybe<Capabilities_Bool_Exp>;
};


export type Query_RootCapabilities_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootComponentsArgs = {
  distinct_on?: InputMaybe<Array<Components_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Components_Order_By>>;
  where?: InputMaybe<Components_Bool_Exp>;
};


export type Query_RootComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Components_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Components_Order_By>>;
  where?: InputMaybe<Components_Bool_Exp>;
};


export type Query_RootComponents_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootData_ObjectsArgs = {
  distinct_on?: InputMaybe<Array<Data_Objects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Data_Objects_Order_By>>;
  where?: InputMaybe<Data_Objects_Bool_Exp>;
};


export type Query_RootData_Objects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Data_Objects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Data_Objects_Order_By>>;
  where?: InputMaybe<Data_Objects_Bool_Exp>;
};


export type Query_RootData_Objects_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootDirectoriesArgs = {
  distinct_on?: InputMaybe<Array<Directories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Directories_Order_By>>;
  where?: InputMaybe<Directories_Bool_Exp>;
};


export type Query_RootDirectories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Directories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Directories_Order_By>>;
  where?: InputMaybe<Directories_Bool_Exp>;
};


export type Query_RootDirectories_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootEmployeesArgs = {
  distinct_on?: InputMaybe<Array<Employees_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Employees_Order_By>>;
  where?: InputMaybe<Employees_Bool_Exp>;
};


export type Query_RootEmployees_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Employees_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Employees_Order_By>>;
  where?: InputMaybe<Employees_Bool_Exp>;
};


export type Query_RootEmployees_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Query_RootEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Query_RootEvents_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootFlowsArgs = {
  distinct_on?: InputMaybe<Array<Flows_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Flows_Order_By>>;
  where?: InputMaybe<Flows_Bool_Exp>;
};


export type Query_RootFlows_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Flows_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Flows_Order_By>>;
  where?: InputMaybe<Flows_Bool_Exp>;
};


export type Query_RootFlows_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootFunctionsArgs = {
  distinct_on?: InputMaybe<Array<Functions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Functions_Order_By>>;
  where?: InputMaybe<Functions_Bool_Exp>;
};


export type Query_RootFunctions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Functions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Functions_Order_By>>;
  where?: InputMaybe<Functions_Bool_Exp>;
};


export type Query_RootFunctions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootInterfacesArgs = {
  distinct_on?: InputMaybe<Array<Interfaces_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Interfaces_Order_By>>;
  where?: InputMaybe<Interfaces_Bool_Exp>;
};


export type Query_RootInterfaces_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Interfaces_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Interfaces_Order_By>>;
  where?: InputMaybe<Interfaces_Bool_Exp>;
};


export type Query_RootInterfaces_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootLocationsArgs = {
  distinct_on?: InputMaybe<Array<Locations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Locations_Order_By>>;
  where?: InputMaybe<Locations_Bool_Exp>;
};


export type Query_RootLocations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Locations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Locations_Order_By>>;
  where?: InputMaybe<Locations_Bool_Exp>;
};


export type Query_RootLocations_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootMap_Application_Component_Data_ObjectArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Data_Object_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Data_Object_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Data_Object_Bool_Exp>;
};


export type Query_RootMap_Application_Component_Data_Object_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Data_Object_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Data_Object_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Data_Object_Bool_Exp>;
};


export type Query_RootMap_Application_Component_Data_Object_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  dataObjectId: Scalars['uuid']['input'];
};


export type Query_RootMap_Application_Component_EventArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Event_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Event_Bool_Exp>;
};


export type Query_RootMap_Application_Component_Event_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Event_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Event_Bool_Exp>;
};


export type Query_RootMap_Application_Component_Event_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  eventId: Scalars['uuid']['input'];
};


export type Query_RootMap_Application_Component_FunctionArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Function_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Function_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Function_Bool_Exp>;
};


export type Query_RootMap_Application_Component_Function_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Function_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Function_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Function_Bool_Exp>;
};


export type Query_RootMap_Application_Component_Function_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  functionId: Scalars['uuid']['input'];
};


export type Query_RootMap_Application_Component_HierarchyArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Hierarchy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Hierarchy_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Hierarchy_Bool_Exp>;
};


export type Query_RootMap_Application_Component_Hierarchy_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Hierarchy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Hierarchy_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Hierarchy_Bool_Exp>;
};


export type Query_RootMap_Application_Component_Hierarchy_By_PkArgs = {
  componentChildId: Scalars['uuid']['input'];
  componentParentId: Scalars['uuid']['input'];
};


export type Query_RootMap_Application_Component_InterfaceArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Interface_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Interface_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Interface_Bool_Exp>;
};


export type Query_RootMap_Application_Component_Interface_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Interface_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Interface_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Interface_Bool_Exp>;
};


export type Query_RootMap_Application_Component_Interface_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  interfaceId: Scalars['uuid']['input'];
};


export type Query_RootMap_Application_Component_ProductArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Product_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Product_Bool_Exp>;
};


export type Query_RootMap_Application_Component_Product_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Product_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Product_Bool_Exp>;
};


export type Query_RootMap_Application_Component_Product_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  productId: Scalars['uuid']['input'];
};


export type Query_RootMap_Application_Component_StakeholderArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Stakeholder_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Stakeholder_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Stakeholder_Bool_Exp>;
};


export type Query_RootMap_Application_Component_Stakeholder_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Stakeholder_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Stakeholder_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Stakeholder_Bool_Exp>;
};


export type Query_RootMap_Application_Component_Stakeholder_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  roleId: Scalars['uuid']['input'];
  stakeholderId: Scalars['uuid']['input'];
};


export type Query_RootMap_Application_Component_System_SoftwareArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_System_Software_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_System_Software_Order_By>>;
  where?: InputMaybe<Map_Application_Component_System_Software_Bool_Exp>;
};


export type Query_RootMap_Application_Component_System_Software_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_System_Software_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_System_Software_Order_By>>;
  where?: InputMaybe<Map_Application_Component_System_Software_Bool_Exp>;
};


export type Query_RootMap_Application_Component_System_Software_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  systemSoftwareId: Scalars['uuid']['input'];
};


export type Query_RootMap_Application_Component_Technology_Logical_NetworkArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Technology_Logical_Network_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Technology_Logical_Network_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Technology_Logical_Network_Bool_Exp>;
};


export type Query_RootMap_Application_Component_Technology_Logical_Network_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Technology_Logical_Network_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Technology_Logical_Network_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Technology_Logical_Network_Bool_Exp>;
};


export type Query_RootMap_Application_Component_Technology_Logical_Network_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  logicalNetworkId: Scalars['uuid']['input'];
};


export type Query_RootMap_Application_Component_Technology_NodeArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Technology_Node_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Technology_Node_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Technology_Node_Bool_Exp>;
};


export type Query_RootMap_Application_Component_Technology_Node_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Technology_Node_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Technology_Node_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Technology_Node_Bool_Exp>;
};


export type Query_RootMap_Application_Component_Technology_Node_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  nodeId: Scalars['uuid']['input'];
};


export type Query_RootMap_Application_Function_Data_ObjectArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Function_Data_Object_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Function_Data_Object_Order_By>>;
  where?: InputMaybe<Map_Application_Function_Data_Object_Bool_Exp>;
};


export type Query_RootMap_Application_Function_Data_Object_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Function_Data_Object_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Function_Data_Object_Order_By>>;
  where?: InputMaybe<Map_Application_Function_Data_Object_Bool_Exp>;
};


export type Query_RootMap_Application_Function_Data_Object_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  dataObjectId: Scalars['uuid']['input'];
  functionId: Scalars['uuid']['input'];
};


export type Query_RootMap_Application_Interface_FunctionArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Interface_Function_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Interface_Function_Order_By>>;
  where?: InputMaybe<Map_Application_Interface_Function_Bool_Exp>;
};


export type Query_RootMap_Application_Interface_Function_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Interface_Function_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Interface_Function_Order_By>>;
  where?: InputMaybe<Map_Application_Interface_Function_Bool_Exp>;
};


export type Query_RootMap_Application_Interface_Function_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  functionId: Scalars['uuid']['input'];
  interfaceId: Scalars['uuid']['input'];
};


export type Query_RootMap_Business_Actor_RoleArgs = {
  distinct_on?: InputMaybe<Array<Map_Business_Actor_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Business_Actor_Role_Order_By>>;
  where?: InputMaybe<Map_Business_Actor_Role_Bool_Exp>;
};


export type Query_RootMap_Business_Actor_Role_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Business_Actor_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Business_Actor_Role_Order_By>>;
  where?: InputMaybe<Map_Business_Actor_Role_Bool_Exp>;
};


export type Query_RootMap_Business_Actor_Role_By_PkArgs = {
  actorId: Scalars['uuid']['input'];
  roleId: Scalars['uuid']['input'];
};


export type Query_RootMap_Directory_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Map_Directory_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Directory_Items_Order_By>>;
  where?: InputMaybe<Map_Directory_Items_Bool_Exp>;
};


export type Query_RootMap_Directory_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Directory_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Directory_Items_Order_By>>;
  where?: InputMaybe<Map_Directory_Items_Bool_Exp>;
};


export type Query_RootMap_Directory_Items_By_PkArgs = {
  sourceId: Scalars['uuid']['input'];
  targetId: Scalars['uuid']['input'];
};


export type Query_RootMap_Solution_Application_ComponentArgs = {
  distinct_on?: InputMaybe<Array<Map_Solution_Application_Component_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Solution_Application_Component_Order_By>>;
  where?: InputMaybe<Map_Solution_Application_Component_Bool_Exp>;
};


export type Query_RootMap_Solution_Application_Component_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Solution_Application_Component_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Solution_Application_Component_Order_By>>;
  where?: InputMaybe<Map_Solution_Application_Component_Bool_Exp>;
};


export type Query_RootMap_Solution_Application_Component_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};


export type Query_RootMap_Solution_ConstraintArgs = {
  distinct_on?: InputMaybe<Array<Map_Solution_Constraint_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Solution_Constraint_Order_By>>;
  where?: InputMaybe<Map_Solution_Constraint_Bool_Exp>;
};


export type Query_RootMap_Solution_Constraint_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Solution_Constraint_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Solution_Constraint_Order_By>>;
  where?: InputMaybe<Map_Solution_Constraint_Bool_Exp>;
};


export type Query_RootMap_Solution_Constraint_By_PkArgs = {
  constraintId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};


export type Query_RootMap_Technology_Network_HierarchyArgs = {
  distinct_on?: InputMaybe<Array<Map_Technology_Network_Hierarchy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Technology_Network_Hierarchy_Order_By>>;
  where?: InputMaybe<Map_Technology_Network_Hierarchy_Bool_Exp>;
};


export type Query_RootMap_Technology_Network_Hierarchy_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Technology_Network_Hierarchy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Technology_Network_Hierarchy_Order_By>>;
  where?: InputMaybe<Map_Technology_Network_Hierarchy_Bool_Exp>;
};


export type Query_RootMap_Technology_Network_Hierarchy_By_PkArgs = {
  networkChildId: Scalars['uuid']['input'];
  networkParentId: Scalars['uuid']['input'];
};


export type Query_RootMap_Technology_Node_HierarchyArgs = {
  distinct_on?: InputMaybe<Array<Map_Technology_Node_Hierarchy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Technology_Node_Hierarchy_Order_By>>;
  where?: InputMaybe<Map_Technology_Node_Hierarchy_Bool_Exp>;
};


export type Query_RootMap_Technology_Node_Hierarchy_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Technology_Node_Hierarchy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Technology_Node_Hierarchy_Order_By>>;
  where?: InputMaybe<Map_Technology_Node_Hierarchy_Bool_Exp>;
};


export type Query_RootMap_Technology_Node_Hierarchy_By_PkArgs = {
  nodeChildId: Scalars['uuid']['input'];
  nodeParentId: Scalars['uuid']['input'];
};


export type Query_RootMap_Technology_Node_System_SoftwareArgs = {
  distinct_on?: InputMaybe<Array<Map_Technology_Node_System_Software_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Technology_Node_System_Software_Order_By>>;
  where?: InputMaybe<Map_Technology_Node_System_Software_Bool_Exp>;
};


export type Query_RootMap_Technology_Node_System_Software_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Technology_Node_System_Software_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Technology_Node_System_Software_Order_By>>;
  where?: InputMaybe<Map_Technology_Node_System_Software_Bool_Exp>;
};


export type Query_RootMap_Technology_Node_System_Software_By_PkArgs = {
  nodeId: Scalars['uuid']['input'];
  systemSoftwareId: Scalars['uuid']['input'];
};


export type Query_RootMotivationsArgs = {
  distinct_on?: InputMaybe<Array<Motivations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Motivations_Order_By>>;
  where?: InputMaybe<Motivations_Bool_Exp>;
};


export type Query_RootMotivations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Motivations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Motivations_Order_By>>;
  where?: InputMaybe<Motivations_Bool_Exp>;
};


export type Query_RootMotivations_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootProductsArgs = {
  distinct_on?: InputMaybe<Array<Products_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Products_Order_By>>;
  where?: InputMaybe<Products_Bool_Exp>;
};


export type Query_RootProducts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Products_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Products_Order_By>>;
  where?: InputMaybe<Products_Bool_Exp>;
};


export type Query_RootProducts_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootRolesArgs = {
  distinct_on?: InputMaybe<Array<Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Roles_Order_By>>;
  where?: InputMaybe<Roles_Bool_Exp>;
};


export type Query_RootRoles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Roles_Order_By>>;
  where?: InputMaybe<Roles_Bool_Exp>;
};


export type Query_RootRoles_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootSolutionsArgs = {
  distinct_on?: InputMaybe<Array<Solutions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Solutions_Order_By>>;
  where?: InputMaybe<Solutions_Bool_Exp>;
};


export type Query_RootSolutions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Solutions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Solutions_Order_By>>;
  where?: InputMaybe<Solutions_Bool_Exp>;
};


export type Query_RootSolutions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootStakeholdersArgs = {
  distinct_on?: InputMaybe<Array<Stakeholders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Stakeholders_Order_By>>;
  where?: InputMaybe<Stakeholders_Bool_Exp>;
};


export type Query_RootStakeholders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Stakeholders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Stakeholders_Order_By>>;
  where?: InputMaybe<Stakeholders_Bool_Exp>;
};


export type Query_RootStakeholders_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootSystem_SoftwareArgs = {
  distinct_on?: InputMaybe<Array<System_Software_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<System_Software_Order_By>>;
  where?: InputMaybe<System_Software_Bool_Exp>;
};


export type Query_RootSystem_Software_AggregateArgs = {
  distinct_on?: InputMaybe<Array<System_Software_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<System_Software_Order_By>>;
  where?: InputMaybe<System_Software_Bool_Exp>;
};


export type Query_RootSystem_Software_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootTechnology_NetworksArgs = {
  distinct_on?: InputMaybe<Array<Technology_Networks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Technology_Networks_Order_By>>;
  where?: InputMaybe<Technology_Networks_Bool_Exp>;
};


export type Query_RootTechnology_Networks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Technology_Networks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Technology_Networks_Order_By>>;
  where?: InputMaybe<Technology_Networks_Bool_Exp>;
};


export type Query_RootTechnology_Networks_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootTechnology_NodesArgs = {
  distinct_on?: InputMaybe<Array<Technology_Nodes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Technology_Nodes_Order_By>>;
  where?: InputMaybe<Technology_Nodes_Bool_Exp>;
};


export type Query_RootTechnology_Nodes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Technology_Nodes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Technology_Nodes_Order_By>>;
  where?: InputMaybe<Technology_Nodes_Bool_Exp>;
};


export type Query_RootTechnology_Nodes_By_PkArgs = {
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

/** columns and relationships of "roles" */
export type Roles = {
  __typename?: 'roles';
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  /** An array relationship */
  mapActors: Array<Map_Business_Actor_Role>;
  /** An aggregate relationship */
  mapActors_aggregate: Map_Business_Actor_Role_Aggregate;
  name: Scalars['String']['output'];
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "roles" */
export type RolesMapActorsArgs = {
  distinct_on?: InputMaybe<Array<Map_Business_Actor_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Business_Actor_Role_Order_By>>;
  where?: InputMaybe<Map_Business_Actor_Role_Bool_Exp>;
};


/** columns and relationships of "roles" */
export type RolesMapActors_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Business_Actor_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Business_Actor_Role_Order_By>>;
  where?: InputMaybe<Map_Business_Actor_Role_Bool_Exp>;
};

/** aggregated selection of "roles" */
export type Roles_Aggregate = {
  __typename?: 'roles_aggregate';
  aggregate?: Maybe<Roles_Aggregate_Fields>;
  nodes: Array<Roles>;
};

/** aggregate fields of "roles" */
export type Roles_Aggregate_Fields = {
  __typename?: 'roles_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Roles_Max_Fields>;
  min?: Maybe<Roles_Min_Fields>;
};


/** aggregate fields of "roles" */
export type Roles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Roles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "roles". All fields are combined with a logical 'AND'. */
export type Roles_Bool_Exp = {
  _and?: InputMaybe<Array<Roles_Bool_Exp>>;
  _not?: InputMaybe<Roles_Bool_Exp>;
  _or?: InputMaybe<Array<Roles_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  mapActors?: InputMaybe<Map_Business_Actor_Role_Bool_Exp>;
  mapActors_aggregate?: InputMaybe<Map_Business_Actor_Role_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  ownerId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "roles" */
export enum Roles_Constraint {
  /** unique or primary key constraint on columns "code" */
  RolesCodeUnique = 'roles_code_unique',
  /** unique or primary key constraint on columns "id" */
  RolesPkey = 'roles_pkey'
}

/** input type for inserting data into table "roles" */
export type Roles_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  mapActors?: InputMaybe<Map_Business_Actor_Role_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Roles_Max_Fields = {
  __typename?: 'roles_max_fields';
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
export type Roles_Min_Fields = {
  __typename?: 'roles_min_fields';
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
export type Roles_Mutation_Response = {
  __typename?: 'roles_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Roles>;
};

/** input type for inserting object relation for remote table "roles" */
export type Roles_Obj_Rel_Insert_Input = {
  data: Roles_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Roles_On_Conflict>;
};

/** on_conflict condition type for table "roles" */
export type Roles_On_Conflict = {
  constraint: Roles_Constraint;
  update_columns?: Array<Roles_Update_Column>;
  where?: InputMaybe<Roles_Bool_Exp>;
};

/** Ordering options when selecting data from "roles". */
export type Roles_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mapActors_aggregate?: InputMaybe<Map_Business_Actor_Role_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  ownerId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: roles */
export type Roles_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "roles" */
export enum Roles_Select_Column {
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
export type Roles_Set_Input = {
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

/** Streaming cursor of the table "roles" */
export type Roles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Roles_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Roles_Stream_Cursor_Value_Input = {
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
export enum Roles_Update_Column {
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

export type Roles_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Roles_Set_Input>;
  /** filter the rows which have to be updated */
  where: Roles_Bool_Exp;
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

/** columns and relationships of "solutions" */
export type Solutions = {
  __typename?: 'solutions';
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  /** An array relationship */
  mapComponents: Array<Map_Solution_Application_Component>;
  /** An aggregate relationship */
  mapComponents_aggregate: Map_Solution_Application_Component_Aggregate;
  /** An array relationship */
  mapMotivations: Array<Map_Solution_Constraint>;
  /** An aggregate relationship */
  mapMotivations_aggregate: Map_Solution_Constraint_Aggregate;
  name: Scalars['String']['output'];
  ownerId?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  state: Directories;
  stateId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "solutions" */
export type SolutionsMapComponentsArgs = {
  distinct_on?: InputMaybe<Array<Map_Solution_Application_Component_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Solution_Application_Component_Order_By>>;
  where?: InputMaybe<Map_Solution_Application_Component_Bool_Exp>;
};


/** columns and relationships of "solutions" */
export type SolutionsMapComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Solution_Application_Component_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Solution_Application_Component_Order_By>>;
  where?: InputMaybe<Map_Solution_Application_Component_Bool_Exp>;
};


/** columns and relationships of "solutions" */
export type SolutionsMapMotivationsArgs = {
  distinct_on?: InputMaybe<Array<Map_Solution_Constraint_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Solution_Constraint_Order_By>>;
  where?: InputMaybe<Map_Solution_Constraint_Bool_Exp>;
};


/** columns and relationships of "solutions" */
export type SolutionsMapMotivations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Solution_Constraint_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Solution_Constraint_Order_By>>;
  where?: InputMaybe<Map_Solution_Constraint_Bool_Exp>;
};

/** aggregated selection of "solutions" */
export type Solutions_Aggregate = {
  __typename?: 'solutions_aggregate';
  aggregate?: Maybe<Solutions_Aggregate_Fields>;
  nodes: Array<Solutions>;
};

/** aggregate fields of "solutions" */
export type Solutions_Aggregate_Fields = {
  __typename?: 'solutions_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Solutions_Max_Fields>;
  min?: Maybe<Solutions_Min_Fields>;
};


/** aggregate fields of "solutions" */
export type Solutions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Solutions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "solutions". All fields are combined with a logical 'AND'. */
export type Solutions_Bool_Exp = {
  _and?: InputMaybe<Array<Solutions_Bool_Exp>>;
  _not?: InputMaybe<Solutions_Bool_Exp>;
  _or?: InputMaybe<Array<Solutions_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  mapComponents?: InputMaybe<Map_Solution_Application_Component_Bool_Exp>;
  mapComponents_aggregate?: InputMaybe<Map_Solution_Application_Component_Aggregate_Bool_Exp>;
  mapMotivations?: InputMaybe<Map_Solution_Constraint_Bool_Exp>;
  mapMotivations_aggregate?: InputMaybe<Map_Solution_Constraint_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  ownerId?: InputMaybe<Uuid_Comparison_Exp>;
  state?: InputMaybe<Directories_Bool_Exp>;
  stateId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "solutions" */
export enum Solutions_Constraint {
  /** unique or primary key constraint on columns "code" */
  SolutionsCodeUnique = 'solutions_code_unique',
  /** unique or primary key constraint on columns "id" */
  SolutionsPkey = 'solutions_pkey'
}

/** input type for inserting data into table "solutions" */
export type Solutions_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  mapComponents?: InputMaybe<Map_Solution_Application_Component_Arr_Rel_Insert_Input>;
  mapMotivations?: InputMaybe<Map_Solution_Constraint_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  state?: InputMaybe<Directories_Obj_Rel_Insert_Input>;
  stateId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Solutions_Max_Fields = {
  __typename?: 'solutions_max_fields';
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

/** aggregate min on columns */
export type Solutions_Min_Fields = {
  __typename?: 'solutions_min_fields';
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

/** response of any mutation on the table "solutions" */
export type Solutions_Mutation_Response = {
  __typename?: 'solutions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Solutions>;
};

/** input type for inserting object relation for remote table "solutions" */
export type Solutions_Obj_Rel_Insert_Input = {
  data: Solutions_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Solutions_On_Conflict>;
};

/** on_conflict condition type for table "solutions" */
export type Solutions_On_Conflict = {
  constraint: Solutions_Constraint;
  update_columns?: Array<Solutions_Update_Column>;
  where?: InputMaybe<Solutions_Bool_Exp>;
};

/** Ordering options when selecting data from "solutions". */
export type Solutions_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mapComponents_aggregate?: InputMaybe<Map_Solution_Application_Component_Aggregate_Order_By>;
  mapMotivations_aggregate?: InputMaybe<Map_Solution_Constraint_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  ownerId?: InputMaybe<Order_By>;
  state?: InputMaybe<Directories_Order_By>;
  stateId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: solutions */
export type Solutions_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "solutions" */
export enum Solutions_Select_Column {
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
export type Solutions_Set_Input = {
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

/** Streaming cursor of the table "solutions" */
export type Solutions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Solutions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Solutions_Stream_Cursor_Value_Input = {
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
export enum Solutions_Update_Column {
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

export type Solutions_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Solutions_Set_Input>;
  /** filter the rows which have to be updated */
  where: Solutions_Bool_Exp;
};

/** columns and relationships of "stakeholders" */
export type Stakeholders = {
  __typename?: 'stakeholders';
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  /** An array relationship */
  mapComponents: Array<Map_Application_Component_Stakeholder>;
  /** An aggregate relationship */
  mapComponents_aggregate: Map_Application_Component_Stakeholder_Aggregate;
  name: Scalars['String']['output'];
  ownerId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "stakeholders" */
export type StakeholdersMapComponentsArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Stakeholder_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Stakeholder_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Stakeholder_Bool_Exp>;
};


/** columns and relationships of "stakeholders" */
export type StakeholdersMapComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Stakeholder_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Stakeholder_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Stakeholder_Bool_Exp>;
};

/** aggregated selection of "stakeholders" */
export type Stakeholders_Aggregate = {
  __typename?: 'stakeholders_aggregate';
  aggregate?: Maybe<Stakeholders_Aggregate_Fields>;
  nodes: Array<Stakeholders>;
};

/** aggregate fields of "stakeholders" */
export type Stakeholders_Aggregate_Fields = {
  __typename?: 'stakeholders_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Stakeholders_Max_Fields>;
  min?: Maybe<Stakeholders_Min_Fields>;
};


/** aggregate fields of "stakeholders" */
export type Stakeholders_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Stakeholders_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "stakeholders". All fields are combined with a logical 'AND'. */
export type Stakeholders_Bool_Exp = {
  _and?: InputMaybe<Array<Stakeholders_Bool_Exp>>;
  _not?: InputMaybe<Stakeholders_Bool_Exp>;
  _or?: InputMaybe<Array<Stakeholders_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  mapComponents?: InputMaybe<Map_Application_Component_Stakeholder_Bool_Exp>;
  mapComponents_aggregate?: InputMaybe<Map_Application_Component_Stakeholder_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  ownerId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "stakeholders" */
export enum Stakeholders_Constraint {
  /** unique or primary key constraint on columns "code" */
  StakeholdersCodeUnique = 'stakeholders_code_unique',
  /** unique or primary key constraint on columns "id" */
  StakeholdersPkey = 'stakeholders_pkey'
}

/** input type for inserting data into table "stakeholders" */
export type Stakeholders_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  mapComponents?: InputMaybe<Map_Application_Component_Stakeholder_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Stakeholders_Max_Fields = {
  __typename?: 'stakeholders_max_fields';
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
export type Stakeholders_Min_Fields = {
  __typename?: 'stakeholders_min_fields';
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
export type Stakeholders_Mutation_Response = {
  __typename?: 'stakeholders_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Stakeholders>;
};

/** input type for inserting object relation for remote table "stakeholders" */
export type Stakeholders_Obj_Rel_Insert_Input = {
  data: Stakeholders_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Stakeholders_On_Conflict>;
};

/** on_conflict condition type for table "stakeholders" */
export type Stakeholders_On_Conflict = {
  constraint: Stakeholders_Constraint;
  update_columns?: Array<Stakeholders_Update_Column>;
  where?: InputMaybe<Stakeholders_Bool_Exp>;
};

/** Ordering options when selecting data from "stakeholders". */
export type Stakeholders_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mapComponents_aggregate?: InputMaybe<Map_Application_Component_Stakeholder_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  ownerId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: stakeholders */
export type Stakeholders_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "stakeholders" */
export enum Stakeholders_Select_Column {
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
export type Stakeholders_Set_Input = {
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

/** Streaming cursor of the table "stakeholders" */
export type Stakeholders_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Stakeholders_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Stakeholders_Stream_Cursor_Value_Input = {
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
export enum Stakeholders_Update_Column {
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

export type Stakeholders_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Stakeholders_Set_Input>;
  /** filter the rows which have to be updated */
  where: Stakeholders_Bool_Exp;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "actors" */
  actors: Array<Actors>;
  /** fetch aggregated fields from the table: "actors" */
  actors_aggregate: Actors_Aggregate;
  /** fetch data from the table: "actors" using primary key columns */
  actors_by_pk?: Maybe<Actors>;
  /** fetch data from the table in a streaming manner: "actors" */
  actors_stream: Array<Actors>;
  /** An array relationship */
  capabilities: Array<Capabilities>;
  /** An aggregate relationship */
  capabilities_aggregate: Capabilities_Aggregate;
  /** fetch data from the table: "capabilities" using primary key columns */
  capabilities_by_pk?: Maybe<Capabilities>;
  /** fetch data from the table in a streaming manner: "capabilities" */
  capabilities_stream: Array<Capabilities>;
  /** fetch data from the table: "components" */
  components: Array<Components>;
  /** fetch aggregated fields from the table: "components" */
  components_aggregate: Components_Aggregate;
  /** fetch data from the table: "components" using primary key columns */
  components_by_pk?: Maybe<Components>;
  /** fetch data from the table in a streaming manner: "components" */
  components_stream: Array<Components>;
  /** fetch data from the table: "data_objects" */
  data_objects: Array<Data_Objects>;
  /** fetch aggregated fields from the table: "data_objects" */
  data_objects_aggregate: Data_Objects_Aggregate;
  /** fetch data from the table: "data_objects" using primary key columns */
  data_objects_by_pk?: Maybe<Data_Objects>;
  /** fetch data from the table in a streaming manner: "data_objects" */
  data_objects_stream: Array<Data_Objects>;
  /** fetch data from the table: "directories" */
  directories: Array<Directories>;
  /** fetch aggregated fields from the table: "directories" */
  directories_aggregate: Directories_Aggregate;
  /** fetch data from the table: "directories" using primary key columns */
  directories_by_pk?: Maybe<Directories>;
  /** fetch data from the table in a streaming manner: "directories" */
  directories_stream: Array<Directories>;
  /** fetch data from the table: "employees" */
  employees: Array<Employees>;
  /** fetch aggregated fields from the table: "employees" */
  employees_aggregate: Employees_Aggregate;
  /** fetch data from the table: "employees" using primary key columns */
  employees_by_pk?: Maybe<Employees>;
  /** fetch data from the table in a streaming manner: "employees" */
  employees_stream: Array<Employees>;
  /** fetch data from the table: "events" */
  events: Array<Events>;
  /** fetch aggregated fields from the table: "events" */
  events_aggregate: Events_Aggregate;
  /** fetch data from the table: "events" using primary key columns */
  events_by_pk?: Maybe<Events>;
  /** fetch data from the table in a streaming manner: "events" */
  events_stream: Array<Events>;
  /** An array relationship */
  flows: Array<Flows>;
  /** An aggregate relationship */
  flows_aggregate: Flows_Aggregate;
  /** fetch data from the table: "flows" using primary key columns */
  flows_by_pk?: Maybe<Flows>;
  /** fetch data from the table in a streaming manner: "flows" */
  flows_stream: Array<Flows>;
  /** fetch data from the table: "functions" */
  functions: Array<Functions>;
  /** fetch aggregated fields from the table: "functions" */
  functions_aggregate: Functions_Aggregate;
  /** fetch data from the table: "functions" using primary key columns */
  functions_by_pk?: Maybe<Functions>;
  /** fetch data from the table in a streaming manner: "functions" */
  functions_stream: Array<Functions>;
  /** fetch data from the table: "interfaces" */
  interfaces: Array<Interfaces>;
  /** fetch aggregated fields from the table: "interfaces" */
  interfaces_aggregate: Interfaces_Aggregate;
  /** fetch data from the table: "interfaces" using primary key columns */
  interfaces_by_pk?: Maybe<Interfaces>;
  /** fetch data from the table in a streaming manner: "interfaces" */
  interfaces_stream: Array<Interfaces>;
  /** fetch data from the table: "locations" */
  locations: Array<Locations>;
  /** fetch aggregated fields from the table: "locations" */
  locations_aggregate: Locations_Aggregate;
  /** fetch data from the table: "locations" using primary key columns */
  locations_by_pk?: Maybe<Locations>;
  /** fetch data from the table in a streaming manner: "locations" */
  locations_stream: Array<Locations>;
  /** fetch data from the table: "map_application_component_data_object" */
  map_application_component_data_object: Array<Map_Application_Component_Data_Object>;
  /** fetch aggregated fields from the table: "map_application_component_data_object" */
  map_application_component_data_object_aggregate: Map_Application_Component_Data_Object_Aggregate;
  /** fetch data from the table: "map_application_component_data_object" using primary key columns */
  map_application_component_data_object_by_pk?: Maybe<Map_Application_Component_Data_Object>;
  /** fetch data from the table in a streaming manner: "map_application_component_data_object" */
  map_application_component_data_object_stream: Array<Map_Application_Component_Data_Object>;
  /** fetch data from the table: "map_application_component_event" */
  map_application_component_event: Array<Map_Application_Component_Event>;
  /** fetch aggregated fields from the table: "map_application_component_event" */
  map_application_component_event_aggregate: Map_Application_Component_Event_Aggregate;
  /** fetch data from the table: "map_application_component_event" using primary key columns */
  map_application_component_event_by_pk?: Maybe<Map_Application_Component_Event>;
  /** fetch data from the table in a streaming manner: "map_application_component_event" */
  map_application_component_event_stream: Array<Map_Application_Component_Event>;
  /** fetch data from the table: "map_application_component_function" */
  map_application_component_function: Array<Map_Application_Component_Function>;
  /** fetch aggregated fields from the table: "map_application_component_function" */
  map_application_component_function_aggregate: Map_Application_Component_Function_Aggregate;
  /** fetch data from the table: "map_application_component_function" using primary key columns */
  map_application_component_function_by_pk?: Maybe<Map_Application_Component_Function>;
  /** fetch data from the table in a streaming manner: "map_application_component_function" */
  map_application_component_function_stream: Array<Map_Application_Component_Function>;
  /** fetch data from the table: "map_application_component_hierarchy" */
  map_application_component_hierarchy: Array<Map_Application_Component_Hierarchy>;
  /** fetch aggregated fields from the table: "map_application_component_hierarchy" */
  map_application_component_hierarchy_aggregate: Map_Application_Component_Hierarchy_Aggregate;
  /** fetch data from the table: "map_application_component_hierarchy" using primary key columns */
  map_application_component_hierarchy_by_pk?: Maybe<Map_Application_Component_Hierarchy>;
  /** fetch data from the table in a streaming manner: "map_application_component_hierarchy" */
  map_application_component_hierarchy_stream: Array<Map_Application_Component_Hierarchy>;
  /** fetch data from the table: "map_application_component_interface" */
  map_application_component_interface: Array<Map_Application_Component_Interface>;
  /** fetch aggregated fields from the table: "map_application_component_interface" */
  map_application_component_interface_aggregate: Map_Application_Component_Interface_Aggregate;
  /** fetch data from the table: "map_application_component_interface" using primary key columns */
  map_application_component_interface_by_pk?: Maybe<Map_Application_Component_Interface>;
  /** fetch data from the table in a streaming manner: "map_application_component_interface" */
  map_application_component_interface_stream: Array<Map_Application_Component_Interface>;
  /** fetch data from the table: "map_application_component_product" */
  map_application_component_product: Array<Map_Application_Component_Product>;
  /** fetch aggregated fields from the table: "map_application_component_product" */
  map_application_component_product_aggregate: Map_Application_Component_Product_Aggregate;
  /** fetch data from the table: "map_application_component_product" using primary key columns */
  map_application_component_product_by_pk?: Maybe<Map_Application_Component_Product>;
  /** fetch data from the table in a streaming manner: "map_application_component_product" */
  map_application_component_product_stream: Array<Map_Application_Component_Product>;
  /** fetch data from the table: "map_application_component_stakeholder" */
  map_application_component_stakeholder: Array<Map_Application_Component_Stakeholder>;
  /** fetch aggregated fields from the table: "map_application_component_stakeholder" */
  map_application_component_stakeholder_aggregate: Map_Application_Component_Stakeholder_Aggregate;
  /** fetch data from the table: "map_application_component_stakeholder" using primary key columns */
  map_application_component_stakeholder_by_pk?: Maybe<Map_Application_Component_Stakeholder>;
  /** fetch data from the table in a streaming manner: "map_application_component_stakeholder" */
  map_application_component_stakeholder_stream: Array<Map_Application_Component_Stakeholder>;
  /** fetch data from the table: "map_application_component_system_software" */
  map_application_component_system_software: Array<Map_Application_Component_System_Software>;
  /** fetch aggregated fields from the table: "map_application_component_system_software" */
  map_application_component_system_software_aggregate: Map_Application_Component_System_Software_Aggregate;
  /** fetch data from the table: "map_application_component_system_software" using primary key columns */
  map_application_component_system_software_by_pk?: Maybe<Map_Application_Component_System_Software>;
  /** fetch data from the table in a streaming manner: "map_application_component_system_software" */
  map_application_component_system_software_stream: Array<Map_Application_Component_System_Software>;
  /** fetch data from the table: "map_application_component_technology_logical_network" */
  map_application_component_technology_logical_network: Array<Map_Application_Component_Technology_Logical_Network>;
  /** fetch aggregated fields from the table: "map_application_component_technology_logical_network" */
  map_application_component_technology_logical_network_aggregate: Map_Application_Component_Technology_Logical_Network_Aggregate;
  /** fetch data from the table: "map_application_component_technology_logical_network" using primary key columns */
  map_application_component_technology_logical_network_by_pk?: Maybe<Map_Application_Component_Technology_Logical_Network>;
  /** fetch data from the table in a streaming manner: "map_application_component_technology_logical_network" */
  map_application_component_technology_logical_network_stream: Array<Map_Application_Component_Technology_Logical_Network>;
  /** fetch data from the table: "map_application_component_technology_node" */
  map_application_component_technology_node: Array<Map_Application_Component_Technology_Node>;
  /** fetch aggregated fields from the table: "map_application_component_technology_node" */
  map_application_component_technology_node_aggregate: Map_Application_Component_Technology_Node_Aggregate;
  /** fetch data from the table: "map_application_component_technology_node" using primary key columns */
  map_application_component_technology_node_by_pk?: Maybe<Map_Application_Component_Technology_Node>;
  /** fetch data from the table in a streaming manner: "map_application_component_technology_node" */
  map_application_component_technology_node_stream: Array<Map_Application_Component_Technology_Node>;
  /** fetch data from the table: "map_application_function_data_object" */
  map_application_function_data_object: Array<Map_Application_Function_Data_Object>;
  /** fetch aggregated fields from the table: "map_application_function_data_object" */
  map_application_function_data_object_aggregate: Map_Application_Function_Data_Object_Aggregate;
  /** fetch data from the table: "map_application_function_data_object" using primary key columns */
  map_application_function_data_object_by_pk?: Maybe<Map_Application_Function_Data_Object>;
  /** fetch data from the table in a streaming manner: "map_application_function_data_object" */
  map_application_function_data_object_stream: Array<Map_Application_Function_Data_Object>;
  /** fetch data from the table: "map_application_interface_function" */
  map_application_interface_function: Array<Map_Application_Interface_Function>;
  /** fetch aggregated fields from the table: "map_application_interface_function" */
  map_application_interface_function_aggregate: Map_Application_Interface_Function_Aggregate;
  /** fetch data from the table: "map_application_interface_function" using primary key columns */
  map_application_interface_function_by_pk?: Maybe<Map_Application_Interface_Function>;
  /** fetch data from the table in a streaming manner: "map_application_interface_function" */
  map_application_interface_function_stream: Array<Map_Application_Interface_Function>;
  /** fetch data from the table: "map_business_actor_role" */
  map_business_actor_role: Array<Map_Business_Actor_Role>;
  /** fetch aggregated fields from the table: "map_business_actor_role" */
  map_business_actor_role_aggregate: Map_Business_Actor_Role_Aggregate;
  /** fetch data from the table: "map_business_actor_role" using primary key columns */
  map_business_actor_role_by_pk?: Maybe<Map_Business_Actor_Role>;
  /** fetch data from the table in a streaming manner: "map_business_actor_role" */
  map_business_actor_role_stream: Array<Map_Business_Actor_Role>;
  /** fetch data from the table: "map_directory_items" */
  map_directory_items: Array<Map_Directory_Items>;
  /** fetch aggregated fields from the table: "map_directory_items" */
  map_directory_items_aggregate: Map_Directory_Items_Aggregate;
  /** fetch data from the table: "map_directory_items" using primary key columns */
  map_directory_items_by_pk?: Maybe<Map_Directory_Items>;
  /** fetch data from the table in a streaming manner: "map_directory_items" */
  map_directory_items_stream: Array<Map_Directory_Items>;
  /** fetch data from the table: "map_solution_application_component" */
  map_solution_application_component: Array<Map_Solution_Application_Component>;
  /** fetch aggregated fields from the table: "map_solution_application_component" */
  map_solution_application_component_aggregate: Map_Solution_Application_Component_Aggregate;
  /** fetch data from the table: "map_solution_application_component" using primary key columns */
  map_solution_application_component_by_pk?: Maybe<Map_Solution_Application_Component>;
  /** fetch data from the table in a streaming manner: "map_solution_application_component" */
  map_solution_application_component_stream: Array<Map_Solution_Application_Component>;
  /** fetch data from the table: "map_solution_constraint" */
  map_solution_constraint: Array<Map_Solution_Constraint>;
  /** fetch aggregated fields from the table: "map_solution_constraint" */
  map_solution_constraint_aggregate: Map_Solution_Constraint_Aggregate;
  /** fetch data from the table: "map_solution_constraint" using primary key columns */
  map_solution_constraint_by_pk?: Maybe<Map_Solution_Constraint>;
  /** fetch data from the table in a streaming manner: "map_solution_constraint" */
  map_solution_constraint_stream: Array<Map_Solution_Constraint>;
  /** fetch data from the table: "map_technology_network_hierarchy" */
  map_technology_network_hierarchy: Array<Map_Technology_Network_Hierarchy>;
  /** fetch aggregated fields from the table: "map_technology_network_hierarchy" */
  map_technology_network_hierarchy_aggregate: Map_Technology_Network_Hierarchy_Aggregate;
  /** fetch data from the table: "map_technology_network_hierarchy" using primary key columns */
  map_technology_network_hierarchy_by_pk?: Maybe<Map_Technology_Network_Hierarchy>;
  /** fetch data from the table in a streaming manner: "map_technology_network_hierarchy" */
  map_technology_network_hierarchy_stream: Array<Map_Technology_Network_Hierarchy>;
  /** fetch data from the table: "map_technology_node_hierarchy" */
  map_technology_node_hierarchy: Array<Map_Technology_Node_Hierarchy>;
  /** fetch aggregated fields from the table: "map_technology_node_hierarchy" */
  map_technology_node_hierarchy_aggregate: Map_Technology_Node_Hierarchy_Aggregate;
  /** fetch data from the table: "map_technology_node_hierarchy" using primary key columns */
  map_technology_node_hierarchy_by_pk?: Maybe<Map_Technology_Node_Hierarchy>;
  /** fetch data from the table in a streaming manner: "map_technology_node_hierarchy" */
  map_technology_node_hierarchy_stream: Array<Map_Technology_Node_Hierarchy>;
  /** fetch data from the table: "map_technology_node_system_software" */
  map_technology_node_system_software: Array<Map_Technology_Node_System_Software>;
  /** fetch aggregated fields from the table: "map_technology_node_system_software" */
  map_technology_node_system_software_aggregate: Map_Technology_Node_System_Software_Aggregate;
  /** fetch data from the table: "map_technology_node_system_software" using primary key columns */
  map_technology_node_system_software_by_pk?: Maybe<Map_Technology_Node_System_Software>;
  /** fetch data from the table in a streaming manner: "map_technology_node_system_software" */
  map_technology_node_system_software_stream: Array<Map_Technology_Node_System_Software>;
  /** fetch data from the table: "motivations" */
  motivations: Array<Motivations>;
  /** fetch aggregated fields from the table: "motivations" */
  motivations_aggregate: Motivations_Aggregate;
  /** fetch data from the table: "motivations" using primary key columns */
  motivations_by_pk?: Maybe<Motivations>;
  /** fetch data from the table in a streaming manner: "motivations" */
  motivations_stream: Array<Motivations>;
  /** fetch data from the table: "products" */
  products: Array<Products>;
  /** fetch aggregated fields from the table: "products" */
  products_aggregate: Products_Aggregate;
  /** fetch data from the table: "products" using primary key columns */
  products_by_pk?: Maybe<Products>;
  /** fetch data from the table in a streaming manner: "products" */
  products_stream: Array<Products>;
  /** fetch data from the table: "roles" */
  roles: Array<Roles>;
  /** fetch aggregated fields from the table: "roles" */
  roles_aggregate: Roles_Aggregate;
  /** fetch data from the table: "roles" using primary key columns */
  roles_by_pk?: Maybe<Roles>;
  /** fetch data from the table in a streaming manner: "roles" */
  roles_stream: Array<Roles>;
  /** fetch data from the table: "solutions" */
  solutions: Array<Solutions>;
  /** fetch aggregated fields from the table: "solutions" */
  solutions_aggregate: Solutions_Aggregate;
  /** fetch data from the table: "solutions" using primary key columns */
  solutions_by_pk?: Maybe<Solutions>;
  /** fetch data from the table in a streaming manner: "solutions" */
  solutions_stream: Array<Solutions>;
  /** fetch data from the table: "stakeholders" */
  stakeholders: Array<Stakeholders>;
  /** fetch aggregated fields from the table: "stakeholders" */
  stakeholders_aggregate: Stakeholders_Aggregate;
  /** fetch data from the table: "stakeholders" using primary key columns */
  stakeholders_by_pk?: Maybe<Stakeholders>;
  /** fetch data from the table in a streaming manner: "stakeholders" */
  stakeholders_stream: Array<Stakeholders>;
  /** fetch data from the table: "system_software" */
  system_software: Array<System_Software>;
  /** fetch aggregated fields from the table: "system_software" */
  system_software_aggregate: System_Software_Aggregate;
  /** fetch data from the table: "system_software" using primary key columns */
  system_software_by_pk?: Maybe<System_Software>;
  /** fetch data from the table in a streaming manner: "system_software" */
  system_software_stream: Array<System_Software>;
  /** fetch data from the table: "technology_networks" */
  technology_networks: Array<Technology_Networks>;
  /** fetch aggregated fields from the table: "technology_networks" */
  technology_networks_aggregate: Technology_Networks_Aggregate;
  /** fetch data from the table: "technology_networks" using primary key columns */
  technology_networks_by_pk?: Maybe<Technology_Networks>;
  /** fetch data from the table in a streaming manner: "technology_networks" */
  technology_networks_stream: Array<Technology_Networks>;
  /** fetch data from the table: "technology_nodes" */
  technology_nodes: Array<Technology_Nodes>;
  /** fetch aggregated fields from the table: "technology_nodes" */
  technology_nodes_aggregate: Technology_Nodes_Aggregate;
  /** fetch data from the table: "technology_nodes" using primary key columns */
  technology_nodes_by_pk?: Maybe<Technology_Nodes>;
  /** fetch data from the table in a streaming manner: "technology_nodes" */
  technology_nodes_stream: Array<Technology_Nodes>;
};


export type Subscription_RootActorsArgs = {
  distinct_on?: InputMaybe<Array<Actors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Actors_Order_By>>;
  where?: InputMaybe<Actors_Bool_Exp>;
};


export type Subscription_RootActors_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Actors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Actors_Order_By>>;
  where?: InputMaybe<Actors_Bool_Exp>;
};


export type Subscription_RootActors_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootActors_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Actors_Stream_Cursor_Input>>;
  where?: InputMaybe<Actors_Bool_Exp>;
};


export type Subscription_RootCapabilitiesArgs = {
  distinct_on?: InputMaybe<Array<Capabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Capabilities_Order_By>>;
  where?: InputMaybe<Capabilities_Bool_Exp>;
};


export type Subscription_RootCapabilities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Capabilities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Capabilities_Order_By>>;
  where?: InputMaybe<Capabilities_Bool_Exp>;
};


export type Subscription_RootCapabilities_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootCapabilities_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Capabilities_Stream_Cursor_Input>>;
  where?: InputMaybe<Capabilities_Bool_Exp>;
};


export type Subscription_RootComponentsArgs = {
  distinct_on?: InputMaybe<Array<Components_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Components_Order_By>>;
  where?: InputMaybe<Components_Bool_Exp>;
};


export type Subscription_RootComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Components_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Components_Order_By>>;
  where?: InputMaybe<Components_Bool_Exp>;
};


export type Subscription_RootComponents_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootComponents_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Components_Stream_Cursor_Input>>;
  where?: InputMaybe<Components_Bool_Exp>;
};


export type Subscription_RootData_ObjectsArgs = {
  distinct_on?: InputMaybe<Array<Data_Objects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Data_Objects_Order_By>>;
  where?: InputMaybe<Data_Objects_Bool_Exp>;
};


export type Subscription_RootData_Objects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Data_Objects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Data_Objects_Order_By>>;
  where?: InputMaybe<Data_Objects_Bool_Exp>;
};


export type Subscription_RootData_Objects_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootData_Objects_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Data_Objects_Stream_Cursor_Input>>;
  where?: InputMaybe<Data_Objects_Bool_Exp>;
};


export type Subscription_RootDirectoriesArgs = {
  distinct_on?: InputMaybe<Array<Directories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Directories_Order_By>>;
  where?: InputMaybe<Directories_Bool_Exp>;
};


export type Subscription_RootDirectories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Directories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Directories_Order_By>>;
  where?: InputMaybe<Directories_Bool_Exp>;
};


export type Subscription_RootDirectories_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootDirectories_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Directories_Stream_Cursor_Input>>;
  where?: InputMaybe<Directories_Bool_Exp>;
};


export type Subscription_RootEmployeesArgs = {
  distinct_on?: InputMaybe<Array<Employees_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Employees_Order_By>>;
  where?: InputMaybe<Employees_Bool_Exp>;
};


export type Subscription_RootEmployees_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Employees_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Employees_Order_By>>;
  where?: InputMaybe<Employees_Bool_Exp>;
};


export type Subscription_RootEmployees_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootEmployees_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Employees_Stream_Cursor_Input>>;
  where?: InputMaybe<Employees_Bool_Exp>;
};


export type Subscription_RootEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Subscription_RootEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Subscription_RootEvents_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootEvents_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Events_Stream_Cursor_Input>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Subscription_RootFlowsArgs = {
  distinct_on?: InputMaybe<Array<Flows_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Flows_Order_By>>;
  where?: InputMaybe<Flows_Bool_Exp>;
};


export type Subscription_RootFlows_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Flows_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Flows_Order_By>>;
  where?: InputMaybe<Flows_Bool_Exp>;
};


export type Subscription_RootFlows_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootFlows_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Flows_Stream_Cursor_Input>>;
  where?: InputMaybe<Flows_Bool_Exp>;
};


export type Subscription_RootFunctionsArgs = {
  distinct_on?: InputMaybe<Array<Functions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Functions_Order_By>>;
  where?: InputMaybe<Functions_Bool_Exp>;
};


export type Subscription_RootFunctions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Functions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Functions_Order_By>>;
  where?: InputMaybe<Functions_Bool_Exp>;
};


export type Subscription_RootFunctions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootFunctions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Functions_Stream_Cursor_Input>>;
  where?: InputMaybe<Functions_Bool_Exp>;
};


export type Subscription_RootInterfacesArgs = {
  distinct_on?: InputMaybe<Array<Interfaces_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Interfaces_Order_By>>;
  where?: InputMaybe<Interfaces_Bool_Exp>;
};


export type Subscription_RootInterfaces_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Interfaces_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Interfaces_Order_By>>;
  where?: InputMaybe<Interfaces_Bool_Exp>;
};


export type Subscription_RootInterfaces_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootInterfaces_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Interfaces_Stream_Cursor_Input>>;
  where?: InputMaybe<Interfaces_Bool_Exp>;
};


export type Subscription_RootLocationsArgs = {
  distinct_on?: InputMaybe<Array<Locations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Locations_Order_By>>;
  where?: InputMaybe<Locations_Bool_Exp>;
};


export type Subscription_RootLocations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Locations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Locations_Order_By>>;
  where?: InputMaybe<Locations_Bool_Exp>;
};


export type Subscription_RootLocations_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootLocations_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Locations_Stream_Cursor_Input>>;
  where?: InputMaybe<Locations_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_Data_ObjectArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Data_Object_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Data_Object_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Data_Object_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_Data_Object_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Data_Object_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Data_Object_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Data_Object_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_Data_Object_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  dataObjectId: Scalars['uuid']['input'];
};


export type Subscription_RootMap_Application_Component_Data_Object_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Map_Application_Component_Data_Object_Stream_Cursor_Input>>;
  where?: InputMaybe<Map_Application_Component_Data_Object_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_EventArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Event_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Event_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_Event_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Event_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Event_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_Event_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  eventId: Scalars['uuid']['input'];
};


export type Subscription_RootMap_Application_Component_Event_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Map_Application_Component_Event_Stream_Cursor_Input>>;
  where?: InputMaybe<Map_Application_Component_Event_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_FunctionArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Function_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Function_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Function_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_Function_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Function_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Function_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Function_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_Function_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  functionId: Scalars['uuid']['input'];
};


export type Subscription_RootMap_Application_Component_Function_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Map_Application_Component_Function_Stream_Cursor_Input>>;
  where?: InputMaybe<Map_Application_Component_Function_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_HierarchyArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Hierarchy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Hierarchy_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Hierarchy_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_Hierarchy_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Hierarchy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Hierarchy_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Hierarchy_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_Hierarchy_By_PkArgs = {
  componentChildId: Scalars['uuid']['input'];
  componentParentId: Scalars['uuid']['input'];
};


export type Subscription_RootMap_Application_Component_Hierarchy_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Map_Application_Component_Hierarchy_Stream_Cursor_Input>>;
  where?: InputMaybe<Map_Application_Component_Hierarchy_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_InterfaceArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Interface_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Interface_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Interface_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_Interface_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Interface_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Interface_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Interface_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_Interface_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  interfaceId: Scalars['uuid']['input'];
};


export type Subscription_RootMap_Application_Component_Interface_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Map_Application_Component_Interface_Stream_Cursor_Input>>;
  where?: InputMaybe<Map_Application_Component_Interface_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_ProductArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Product_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Product_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_Product_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Product_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Product_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_Product_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  productId: Scalars['uuid']['input'];
};


export type Subscription_RootMap_Application_Component_Product_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Map_Application_Component_Product_Stream_Cursor_Input>>;
  where?: InputMaybe<Map_Application_Component_Product_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_StakeholderArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Stakeholder_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Stakeholder_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Stakeholder_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_Stakeholder_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Stakeholder_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Stakeholder_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Stakeholder_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_Stakeholder_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  roleId: Scalars['uuid']['input'];
  stakeholderId: Scalars['uuid']['input'];
};


export type Subscription_RootMap_Application_Component_Stakeholder_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Map_Application_Component_Stakeholder_Stream_Cursor_Input>>;
  where?: InputMaybe<Map_Application_Component_Stakeholder_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_System_SoftwareArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_System_Software_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_System_Software_Order_By>>;
  where?: InputMaybe<Map_Application_Component_System_Software_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_System_Software_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_System_Software_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_System_Software_Order_By>>;
  where?: InputMaybe<Map_Application_Component_System_Software_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_System_Software_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  systemSoftwareId: Scalars['uuid']['input'];
};


export type Subscription_RootMap_Application_Component_System_Software_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Map_Application_Component_System_Software_Stream_Cursor_Input>>;
  where?: InputMaybe<Map_Application_Component_System_Software_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_Technology_Logical_NetworkArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Technology_Logical_Network_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Technology_Logical_Network_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Technology_Logical_Network_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_Technology_Logical_Network_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Technology_Logical_Network_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Technology_Logical_Network_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Technology_Logical_Network_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_Technology_Logical_Network_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  logicalNetworkId: Scalars['uuid']['input'];
};


export type Subscription_RootMap_Application_Component_Technology_Logical_Network_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Map_Application_Component_Technology_Logical_Network_Stream_Cursor_Input>>;
  where?: InputMaybe<Map_Application_Component_Technology_Logical_Network_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_Technology_NodeArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Technology_Node_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Technology_Node_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Technology_Node_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_Technology_Node_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Technology_Node_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Technology_Node_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Technology_Node_Bool_Exp>;
};


export type Subscription_RootMap_Application_Component_Technology_Node_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  nodeId: Scalars['uuid']['input'];
};


export type Subscription_RootMap_Application_Component_Technology_Node_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Map_Application_Component_Technology_Node_Stream_Cursor_Input>>;
  where?: InputMaybe<Map_Application_Component_Technology_Node_Bool_Exp>;
};


export type Subscription_RootMap_Application_Function_Data_ObjectArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Function_Data_Object_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Function_Data_Object_Order_By>>;
  where?: InputMaybe<Map_Application_Function_Data_Object_Bool_Exp>;
};


export type Subscription_RootMap_Application_Function_Data_Object_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Function_Data_Object_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Function_Data_Object_Order_By>>;
  where?: InputMaybe<Map_Application_Function_Data_Object_Bool_Exp>;
};


export type Subscription_RootMap_Application_Function_Data_Object_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  dataObjectId: Scalars['uuid']['input'];
  functionId: Scalars['uuid']['input'];
};


export type Subscription_RootMap_Application_Function_Data_Object_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Map_Application_Function_Data_Object_Stream_Cursor_Input>>;
  where?: InputMaybe<Map_Application_Function_Data_Object_Bool_Exp>;
};


export type Subscription_RootMap_Application_Interface_FunctionArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Interface_Function_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Interface_Function_Order_By>>;
  where?: InputMaybe<Map_Application_Interface_Function_Bool_Exp>;
};


export type Subscription_RootMap_Application_Interface_Function_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Interface_Function_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Interface_Function_Order_By>>;
  where?: InputMaybe<Map_Application_Interface_Function_Bool_Exp>;
};


export type Subscription_RootMap_Application_Interface_Function_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  functionId: Scalars['uuid']['input'];
  interfaceId: Scalars['uuid']['input'];
};


export type Subscription_RootMap_Application_Interface_Function_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Map_Application_Interface_Function_Stream_Cursor_Input>>;
  where?: InputMaybe<Map_Application_Interface_Function_Bool_Exp>;
};


export type Subscription_RootMap_Business_Actor_RoleArgs = {
  distinct_on?: InputMaybe<Array<Map_Business_Actor_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Business_Actor_Role_Order_By>>;
  where?: InputMaybe<Map_Business_Actor_Role_Bool_Exp>;
};


export type Subscription_RootMap_Business_Actor_Role_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Business_Actor_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Business_Actor_Role_Order_By>>;
  where?: InputMaybe<Map_Business_Actor_Role_Bool_Exp>;
};


export type Subscription_RootMap_Business_Actor_Role_By_PkArgs = {
  actorId: Scalars['uuid']['input'];
  roleId: Scalars['uuid']['input'];
};


export type Subscription_RootMap_Business_Actor_Role_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Map_Business_Actor_Role_Stream_Cursor_Input>>;
  where?: InputMaybe<Map_Business_Actor_Role_Bool_Exp>;
};


export type Subscription_RootMap_Directory_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Map_Directory_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Directory_Items_Order_By>>;
  where?: InputMaybe<Map_Directory_Items_Bool_Exp>;
};


export type Subscription_RootMap_Directory_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Directory_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Directory_Items_Order_By>>;
  where?: InputMaybe<Map_Directory_Items_Bool_Exp>;
};


export type Subscription_RootMap_Directory_Items_By_PkArgs = {
  sourceId: Scalars['uuid']['input'];
  targetId: Scalars['uuid']['input'];
};


export type Subscription_RootMap_Directory_Items_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Map_Directory_Items_Stream_Cursor_Input>>;
  where?: InputMaybe<Map_Directory_Items_Bool_Exp>;
};


export type Subscription_RootMap_Solution_Application_ComponentArgs = {
  distinct_on?: InputMaybe<Array<Map_Solution_Application_Component_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Solution_Application_Component_Order_By>>;
  where?: InputMaybe<Map_Solution_Application_Component_Bool_Exp>;
};


export type Subscription_RootMap_Solution_Application_Component_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Solution_Application_Component_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Solution_Application_Component_Order_By>>;
  where?: InputMaybe<Map_Solution_Application_Component_Bool_Exp>;
};


export type Subscription_RootMap_Solution_Application_Component_By_PkArgs = {
  componentId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};


export type Subscription_RootMap_Solution_Application_Component_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Map_Solution_Application_Component_Stream_Cursor_Input>>;
  where?: InputMaybe<Map_Solution_Application_Component_Bool_Exp>;
};


export type Subscription_RootMap_Solution_ConstraintArgs = {
  distinct_on?: InputMaybe<Array<Map_Solution_Constraint_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Solution_Constraint_Order_By>>;
  where?: InputMaybe<Map_Solution_Constraint_Bool_Exp>;
};


export type Subscription_RootMap_Solution_Constraint_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Solution_Constraint_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Solution_Constraint_Order_By>>;
  where?: InputMaybe<Map_Solution_Constraint_Bool_Exp>;
};


export type Subscription_RootMap_Solution_Constraint_By_PkArgs = {
  constraintId: Scalars['uuid']['input'];
  solutionId: Scalars['uuid']['input'];
};


export type Subscription_RootMap_Solution_Constraint_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Map_Solution_Constraint_Stream_Cursor_Input>>;
  where?: InputMaybe<Map_Solution_Constraint_Bool_Exp>;
};


export type Subscription_RootMap_Technology_Network_HierarchyArgs = {
  distinct_on?: InputMaybe<Array<Map_Technology_Network_Hierarchy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Technology_Network_Hierarchy_Order_By>>;
  where?: InputMaybe<Map_Technology_Network_Hierarchy_Bool_Exp>;
};


export type Subscription_RootMap_Technology_Network_Hierarchy_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Technology_Network_Hierarchy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Technology_Network_Hierarchy_Order_By>>;
  where?: InputMaybe<Map_Technology_Network_Hierarchy_Bool_Exp>;
};


export type Subscription_RootMap_Technology_Network_Hierarchy_By_PkArgs = {
  networkChildId: Scalars['uuid']['input'];
  networkParentId: Scalars['uuid']['input'];
};


export type Subscription_RootMap_Technology_Network_Hierarchy_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Map_Technology_Network_Hierarchy_Stream_Cursor_Input>>;
  where?: InputMaybe<Map_Technology_Network_Hierarchy_Bool_Exp>;
};


export type Subscription_RootMap_Technology_Node_HierarchyArgs = {
  distinct_on?: InputMaybe<Array<Map_Technology_Node_Hierarchy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Technology_Node_Hierarchy_Order_By>>;
  where?: InputMaybe<Map_Technology_Node_Hierarchy_Bool_Exp>;
};


export type Subscription_RootMap_Technology_Node_Hierarchy_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Technology_Node_Hierarchy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Technology_Node_Hierarchy_Order_By>>;
  where?: InputMaybe<Map_Technology_Node_Hierarchy_Bool_Exp>;
};


export type Subscription_RootMap_Technology_Node_Hierarchy_By_PkArgs = {
  nodeChildId: Scalars['uuid']['input'];
  nodeParentId: Scalars['uuid']['input'];
};


export type Subscription_RootMap_Technology_Node_Hierarchy_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Map_Technology_Node_Hierarchy_Stream_Cursor_Input>>;
  where?: InputMaybe<Map_Technology_Node_Hierarchy_Bool_Exp>;
};


export type Subscription_RootMap_Technology_Node_System_SoftwareArgs = {
  distinct_on?: InputMaybe<Array<Map_Technology_Node_System_Software_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Technology_Node_System_Software_Order_By>>;
  where?: InputMaybe<Map_Technology_Node_System_Software_Bool_Exp>;
};


export type Subscription_RootMap_Technology_Node_System_Software_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Technology_Node_System_Software_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Technology_Node_System_Software_Order_By>>;
  where?: InputMaybe<Map_Technology_Node_System_Software_Bool_Exp>;
};


export type Subscription_RootMap_Technology_Node_System_Software_By_PkArgs = {
  nodeId: Scalars['uuid']['input'];
  systemSoftwareId: Scalars['uuid']['input'];
};


export type Subscription_RootMap_Technology_Node_System_Software_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Map_Technology_Node_System_Software_Stream_Cursor_Input>>;
  where?: InputMaybe<Map_Technology_Node_System_Software_Bool_Exp>;
};


export type Subscription_RootMotivationsArgs = {
  distinct_on?: InputMaybe<Array<Motivations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Motivations_Order_By>>;
  where?: InputMaybe<Motivations_Bool_Exp>;
};


export type Subscription_RootMotivations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Motivations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Motivations_Order_By>>;
  where?: InputMaybe<Motivations_Bool_Exp>;
};


export type Subscription_RootMotivations_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootMotivations_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Motivations_Stream_Cursor_Input>>;
  where?: InputMaybe<Motivations_Bool_Exp>;
};


export type Subscription_RootProductsArgs = {
  distinct_on?: InputMaybe<Array<Products_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Products_Order_By>>;
  where?: InputMaybe<Products_Bool_Exp>;
};


export type Subscription_RootProducts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Products_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Products_Order_By>>;
  where?: InputMaybe<Products_Bool_Exp>;
};


export type Subscription_RootProducts_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootProducts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Products_Stream_Cursor_Input>>;
  where?: InputMaybe<Products_Bool_Exp>;
};


export type Subscription_RootRolesArgs = {
  distinct_on?: InputMaybe<Array<Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Roles_Order_By>>;
  where?: InputMaybe<Roles_Bool_Exp>;
};


export type Subscription_RootRoles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Roles_Order_By>>;
  where?: InputMaybe<Roles_Bool_Exp>;
};


export type Subscription_RootRoles_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootRoles_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Roles_Stream_Cursor_Input>>;
  where?: InputMaybe<Roles_Bool_Exp>;
};


export type Subscription_RootSolutionsArgs = {
  distinct_on?: InputMaybe<Array<Solutions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Solutions_Order_By>>;
  where?: InputMaybe<Solutions_Bool_Exp>;
};


export type Subscription_RootSolutions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Solutions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Solutions_Order_By>>;
  where?: InputMaybe<Solutions_Bool_Exp>;
};


export type Subscription_RootSolutions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootSolutions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Solutions_Stream_Cursor_Input>>;
  where?: InputMaybe<Solutions_Bool_Exp>;
};


export type Subscription_RootStakeholdersArgs = {
  distinct_on?: InputMaybe<Array<Stakeholders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Stakeholders_Order_By>>;
  where?: InputMaybe<Stakeholders_Bool_Exp>;
};


export type Subscription_RootStakeholders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Stakeholders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Stakeholders_Order_By>>;
  where?: InputMaybe<Stakeholders_Bool_Exp>;
};


export type Subscription_RootStakeholders_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootStakeholders_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Stakeholders_Stream_Cursor_Input>>;
  where?: InputMaybe<Stakeholders_Bool_Exp>;
};


export type Subscription_RootSystem_SoftwareArgs = {
  distinct_on?: InputMaybe<Array<System_Software_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<System_Software_Order_By>>;
  where?: InputMaybe<System_Software_Bool_Exp>;
};


export type Subscription_RootSystem_Software_AggregateArgs = {
  distinct_on?: InputMaybe<Array<System_Software_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<System_Software_Order_By>>;
  where?: InputMaybe<System_Software_Bool_Exp>;
};


export type Subscription_RootSystem_Software_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootSystem_Software_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<System_Software_Stream_Cursor_Input>>;
  where?: InputMaybe<System_Software_Bool_Exp>;
};


export type Subscription_RootTechnology_NetworksArgs = {
  distinct_on?: InputMaybe<Array<Technology_Networks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Technology_Networks_Order_By>>;
  where?: InputMaybe<Technology_Networks_Bool_Exp>;
};


export type Subscription_RootTechnology_Networks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Technology_Networks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Technology_Networks_Order_By>>;
  where?: InputMaybe<Technology_Networks_Bool_Exp>;
};


export type Subscription_RootTechnology_Networks_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootTechnology_Networks_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Technology_Networks_Stream_Cursor_Input>>;
  where?: InputMaybe<Technology_Networks_Bool_Exp>;
};


export type Subscription_RootTechnology_NodesArgs = {
  distinct_on?: InputMaybe<Array<Technology_Nodes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Technology_Nodes_Order_By>>;
  where?: InputMaybe<Technology_Nodes_Bool_Exp>;
};


export type Subscription_RootTechnology_Nodes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Technology_Nodes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Technology_Nodes_Order_By>>;
  where?: InputMaybe<Technology_Nodes_Bool_Exp>;
};


export type Subscription_RootTechnology_Nodes_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootTechnology_Nodes_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Technology_Nodes_Stream_Cursor_Input>>;
  where?: InputMaybe<Technology_Nodes_Bool_Exp>;
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

/** columns and relationships of "system_software" */
export type System_Software = {
  __typename?: 'system_software';
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  kind: Scalars['system_software_kind_enum']['output'];
  /** An object relationship */
  licenseType?: Maybe<Directories>;
  licenseTypeId?: Maybe<Scalars['uuid']['output']>;
  /** An array relationship */
  mapComponents: Array<Map_Application_Component_System_Software>;
  /** An aggregate relationship */
  mapComponents_aggregate: Map_Application_Component_System_Software_Aggregate;
  /** An array relationship */
  mapTechnologyNodes: Array<Map_Technology_Node_System_Software>;
  /** An aggregate relationship */
  mapTechnologyNodes_aggregate: Map_Technology_Node_System_Software_Aggregate;
  name: Scalars['String']['output'];
  ownerId?: Maybe<Scalars['uuid']['output']>;
  /** An array relationship */
  technologyNodes: Array<Technology_Nodes>;
  /** An aggregate relationship */
  technologyNodes_aggregate: Technology_Nodes_Aggregate;
  /** An object relationship */
  type?: Maybe<Directories>;
  typeId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};


/** columns and relationships of "system_software" */
export type System_SoftwareMapComponentsArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_System_Software_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_System_Software_Order_By>>;
  where?: InputMaybe<Map_Application_Component_System_Software_Bool_Exp>;
};


/** columns and relationships of "system_software" */
export type System_SoftwareMapComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_System_Software_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_System_Software_Order_By>>;
  where?: InputMaybe<Map_Application_Component_System_Software_Bool_Exp>;
};


/** columns and relationships of "system_software" */
export type System_SoftwareMapTechnologyNodesArgs = {
  distinct_on?: InputMaybe<Array<Map_Technology_Node_System_Software_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Technology_Node_System_Software_Order_By>>;
  where?: InputMaybe<Map_Technology_Node_System_Software_Bool_Exp>;
};


/** columns and relationships of "system_software" */
export type System_SoftwareMapTechnologyNodes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Technology_Node_System_Software_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Technology_Node_System_Software_Order_By>>;
  where?: InputMaybe<Map_Technology_Node_System_Software_Bool_Exp>;
};


/** columns and relationships of "system_software" */
export type System_SoftwareTechnologyNodesArgs = {
  distinct_on?: InputMaybe<Array<Technology_Nodes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Technology_Nodes_Order_By>>;
  where?: InputMaybe<Technology_Nodes_Bool_Exp>;
};


/** columns and relationships of "system_software" */
export type System_SoftwareTechnologyNodes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Technology_Nodes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Technology_Nodes_Order_By>>;
  where?: InputMaybe<Technology_Nodes_Bool_Exp>;
};

/** aggregated selection of "system_software" */
export type System_Software_Aggregate = {
  __typename?: 'system_software_aggregate';
  aggregate?: Maybe<System_Software_Aggregate_Fields>;
  nodes: Array<System_Software>;
};

/** aggregate fields of "system_software" */
export type System_Software_Aggregate_Fields = {
  __typename?: 'system_software_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<System_Software_Max_Fields>;
  min?: Maybe<System_Software_Min_Fields>;
};


/** aggregate fields of "system_software" */
export type System_Software_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<System_Software_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "system_software". All fields are combined with a logical 'AND'. */
export type System_Software_Bool_Exp = {
  _and?: InputMaybe<Array<System_Software_Bool_Exp>>;
  _not?: InputMaybe<System_Software_Bool_Exp>;
  _or?: InputMaybe<Array<System_Software_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  kind?: InputMaybe<System_Software_Kind_Enum_Comparison_Exp>;
  licenseType?: InputMaybe<Directories_Bool_Exp>;
  licenseTypeId?: InputMaybe<Uuid_Comparison_Exp>;
  mapComponents?: InputMaybe<Map_Application_Component_System_Software_Bool_Exp>;
  mapComponents_aggregate?: InputMaybe<Map_Application_Component_System_Software_Aggregate_Bool_Exp>;
  mapTechnologyNodes?: InputMaybe<Map_Technology_Node_System_Software_Bool_Exp>;
  mapTechnologyNodes_aggregate?: InputMaybe<Map_Technology_Node_System_Software_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  ownerId?: InputMaybe<Uuid_Comparison_Exp>;
  technologyNodes?: InputMaybe<Technology_Nodes_Bool_Exp>;
  technologyNodes_aggregate?: InputMaybe<Technology_Nodes_Aggregate_Bool_Exp>;
  type?: InputMaybe<Directories_Bool_Exp>;
  typeId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
  version?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "system_software" */
export enum System_Software_Constraint {
  /** unique or primary key constraint on columns "code" */
  SystemSoftwareCodeUnique = 'system_software_code_unique',
  /** unique or primary key constraint on columns "id" */
  SystemSoftwarePkey = 'system_software_pkey'
}

/** input type for inserting data into table "system_software" */
export type System_Software_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  kind?: InputMaybe<Scalars['system_software_kind_enum']['input']>;
  licenseType?: InputMaybe<Directories_Obj_Rel_Insert_Input>;
  licenseTypeId?: InputMaybe<Scalars['uuid']['input']>;
  mapComponents?: InputMaybe<Map_Application_Component_System_Software_Arr_Rel_Insert_Input>;
  mapTechnologyNodes?: InputMaybe<Map_Technology_Node_System_Software_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  technologyNodes?: InputMaybe<Technology_Nodes_Arr_Rel_Insert_Input>;
  type?: InputMaybe<Directories_Obj_Rel_Insert_Input>;
  typeId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
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

/** aggregate max on columns */
export type System_Software_Max_Fields = {
  __typename?: 'system_software_max_fields';
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

/** aggregate min on columns */
export type System_Software_Min_Fields = {
  __typename?: 'system_software_min_fields';
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

/** response of any mutation on the table "system_software" */
export type System_Software_Mutation_Response = {
  __typename?: 'system_software_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<System_Software>;
};

/** input type for inserting object relation for remote table "system_software" */
export type System_Software_Obj_Rel_Insert_Input = {
  data: System_Software_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<System_Software_On_Conflict>;
};

/** on_conflict condition type for table "system_software" */
export type System_Software_On_Conflict = {
  constraint: System_Software_Constraint;
  update_columns?: Array<System_Software_Update_Column>;
  where?: InputMaybe<System_Software_Bool_Exp>;
};

/** Ordering options when selecting data from "system_software". */
export type System_Software_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  licenseType?: InputMaybe<Directories_Order_By>;
  licenseTypeId?: InputMaybe<Order_By>;
  mapComponents_aggregate?: InputMaybe<Map_Application_Component_System_Software_Aggregate_Order_By>;
  mapTechnologyNodes_aggregate?: InputMaybe<Map_Technology_Node_System_Software_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  ownerId?: InputMaybe<Order_By>;
  technologyNodes_aggregate?: InputMaybe<Technology_Nodes_Aggregate_Order_By>;
  type?: InputMaybe<Directories_Order_By>;
  typeId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** primary key columns input for table: system_software */
export type System_Software_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "system_software" */
export enum System_Software_Select_Column {
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
export type System_Software_Set_Input = {
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

/** Streaming cursor of the table "system_software" */
export type System_Software_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: System_Software_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type System_Software_Stream_Cursor_Value_Input = {
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
export enum System_Software_Update_Column {
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

export type System_Software_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<System_Software_Set_Input>;
  /** filter the rows which have to be updated */
  where: System_Software_Bool_Exp;
};

/** columns and relationships of "technology_networks" */
export type Technology_Networks = {
  __typename?: 'technology_networks';
  code: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  environment?: Maybe<Scalars['environment_enum']['output']>;
  id: Scalars['uuid']['output'];
  level: Scalars['network_abstraction_level_enum']['output'];
  /** An object relationship */
  location?: Maybe<Locations>;
  locationId?: Maybe<Scalars['uuid']['output']>;
  /** An array relationship */
  mapComponents: Array<Map_Application_Component_Technology_Logical_Network>;
  /** An aggregate relationship */
  mapComponents_aggregate: Map_Application_Component_Technology_Logical_Network_Aggregate;
  /** An array relationship */
  mapTechnologyNetworkHierarchies: Array<Map_Technology_Network_Hierarchy>;
  /** An array relationship */
  mapTechnologyNetworkHierarchies2: Array<Map_Technology_Network_Hierarchy>;
  /** An aggregate relationship */
  mapTechnologyNetworkHierarchies2_aggregate: Map_Technology_Network_Hierarchy_Aggregate;
  /** An aggregate relationship */
  mapTechnologyNetworkHierarchies_aggregate: Map_Technology_Network_Hierarchy_Aggregate;
  name: Scalars['String']['output'];
  scope?: Maybe<Scalars['network_scope_enum']['output']>;
  /** An array relationship */
  technologyNodes: Array<Technology_Nodes>;
  /** An aggregate relationship */
  technologyNodes_aggregate: Technology_Nodes_Aggregate;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "technology_networks" */
export type Technology_NetworksMapComponentsArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Technology_Logical_Network_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Technology_Logical_Network_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Technology_Logical_Network_Bool_Exp>;
};


/** columns and relationships of "technology_networks" */
export type Technology_NetworksMapComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Technology_Logical_Network_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Technology_Logical_Network_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Technology_Logical_Network_Bool_Exp>;
};


/** columns and relationships of "technology_networks" */
export type Technology_NetworksMapTechnologyNetworkHierarchiesArgs = {
  distinct_on?: InputMaybe<Array<Map_Technology_Network_Hierarchy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Technology_Network_Hierarchy_Order_By>>;
  where?: InputMaybe<Map_Technology_Network_Hierarchy_Bool_Exp>;
};


/** columns and relationships of "technology_networks" */
export type Technology_NetworksMapTechnologyNetworkHierarchies2Args = {
  distinct_on?: InputMaybe<Array<Map_Technology_Network_Hierarchy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Technology_Network_Hierarchy_Order_By>>;
  where?: InputMaybe<Map_Technology_Network_Hierarchy_Bool_Exp>;
};


/** columns and relationships of "technology_networks" */
export type Technology_NetworksMapTechnologyNetworkHierarchies2_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Technology_Network_Hierarchy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Technology_Network_Hierarchy_Order_By>>;
  where?: InputMaybe<Map_Technology_Network_Hierarchy_Bool_Exp>;
};


/** columns and relationships of "technology_networks" */
export type Technology_NetworksMapTechnologyNetworkHierarchies_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Technology_Network_Hierarchy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Technology_Network_Hierarchy_Order_By>>;
  where?: InputMaybe<Map_Technology_Network_Hierarchy_Bool_Exp>;
};


/** columns and relationships of "technology_networks" */
export type Technology_NetworksTechnologyNodesArgs = {
  distinct_on?: InputMaybe<Array<Technology_Nodes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Technology_Nodes_Order_By>>;
  where?: InputMaybe<Technology_Nodes_Bool_Exp>;
};


/** columns and relationships of "technology_networks" */
export type Technology_NetworksTechnologyNodes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Technology_Nodes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Technology_Nodes_Order_By>>;
  where?: InputMaybe<Technology_Nodes_Bool_Exp>;
};

/** aggregated selection of "technology_networks" */
export type Technology_Networks_Aggregate = {
  __typename?: 'technology_networks_aggregate';
  aggregate?: Maybe<Technology_Networks_Aggregate_Fields>;
  nodes: Array<Technology_Networks>;
};

export type Technology_Networks_Aggregate_Bool_Exp = {
  count?: InputMaybe<Technology_Networks_Aggregate_Bool_Exp_Count>;
};

export type Technology_Networks_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Technology_Networks_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Technology_Networks_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "technology_networks" */
export type Technology_Networks_Aggregate_Fields = {
  __typename?: 'technology_networks_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Technology_Networks_Max_Fields>;
  min?: Maybe<Technology_Networks_Min_Fields>;
};


/** aggregate fields of "technology_networks" */
export type Technology_Networks_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Technology_Networks_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "technology_networks" */
export type Technology_Networks_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Technology_Networks_Max_Order_By>;
  min?: InputMaybe<Technology_Networks_Min_Order_By>;
};

/** input type for inserting array relation for remote table "technology_networks" */
export type Technology_Networks_Arr_Rel_Insert_Input = {
  data: Array<Technology_Networks_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Technology_Networks_On_Conflict>;
};

/** Boolean expression to filter rows from the table "technology_networks". All fields are combined with a logical 'AND'. */
export type Technology_Networks_Bool_Exp = {
  _and?: InputMaybe<Array<Technology_Networks_Bool_Exp>>;
  _not?: InputMaybe<Technology_Networks_Bool_Exp>;
  _or?: InputMaybe<Array<Technology_Networks_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  environment?: InputMaybe<Environment_Enum_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  level?: InputMaybe<Network_Abstraction_Level_Enum_Comparison_Exp>;
  location?: InputMaybe<Locations_Bool_Exp>;
  locationId?: InputMaybe<Uuid_Comparison_Exp>;
  mapComponents?: InputMaybe<Map_Application_Component_Technology_Logical_Network_Bool_Exp>;
  mapComponents_aggregate?: InputMaybe<Map_Application_Component_Technology_Logical_Network_Aggregate_Bool_Exp>;
  mapTechnologyNetworkHierarchies?: InputMaybe<Map_Technology_Network_Hierarchy_Bool_Exp>;
  mapTechnologyNetworkHierarchies2?: InputMaybe<Map_Technology_Network_Hierarchy_Bool_Exp>;
  mapTechnologyNetworkHierarchies2_aggregate?: InputMaybe<Map_Technology_Network_Hierarchy_Aggregate_Bool_Exp>;
  mapTechnologyNetworkHierarchies_aggregate?: InputMaybe<Map_Technology_Network_Hierarchy_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  scope?: InputMaybe<Network_Scope_Enum_Comparison_Exp>;
  technologyNodes?: InputMaybe<Technology_Nodes_Bool_Exp>;
  technologyNodes_aggregate?: InputMaybe<Technology_Nodes_Aggregate_Bool_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "technology_networks" */
export enum Technology_Networks_Constraint {
  /** unique or primary key constraint on columns "code" */
  TechnologyNetworksCodeUnique = 'technology_networks_code_unique',
  /** unique or primary key constraint on columns "id" */
  TechnologyNetworksPkey = 'technology_networks_pkey'
}

/** input type for inserting data into table "technology_networks" */
export type Technology_Networks_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdBy?: InputMaybe<Scalars['uuid']['input']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  deletedBy?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  environment?: InputMaybe<Scalars['environment_enum']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  level?: InputMaybe<Scalars['network_abstraction_level_enum']['input']>;
  location?: InputMaybe<Locations_Obj_Rel_Insert_Input>;
  locationId?: InputMaybe<Scalars['uuid']['input']>;
  mapComponents?: InputMaybe<Map_Application_Component_Technology_Logical_Network_Arr_Rel_Insert_Input>;
  mapTechnologyNetworkHierarchies?: InputMaybe<Map_Technology_Network_Hierarchy_Arr_Rel_Insert_Input>;
  mapTechnologyNetworkHierarchies2?: InputMaybe<Map_Technology_Network_Hierarchy_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['network_scope_enum']['input']>;
  technologyNodes?: InputMaybe<Technology_Nodes_Arr_Rel_Insert_Input>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Technology_Networks_Max_Fields = {
  __typename?: 'technology_networks_max_fields';
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
export type Technology_Networks_Max_Order_By = {
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
export type Technology_Networks_Min_Fields = {
  __typename?: 'technology_networks_min_fields';
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
export type Technology_Networks_Min_Order_By = {
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
export type Technology_Networks_Mutation_Response = {
  __typename?: 'technology_networks_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Technology_Networks>;
};

/** input type for inserting object relation for remote table "technology_networks" */
export type Technology_Networks_Obj_Rel_Insert_Input = {
  data: Technology_Networks_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Technology_Networks_On_Conflict>;
};

/** on_conflict condition type for table "technology_networks" */
export type Technology_Networks_On_Conflict = {
  constraint: Technology_Networks_Constraint;
  update_columns?: Array<Technology_Networks_Update_Column>;
  where?: InputMaybe<Technology_Networks_Bool_Exp>;
};

/** Ordering options when selecting data from "technology_networks". */
export type Technology_Networks_Order_By = {
  code?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  deletedBy?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  environment?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  level?: InputMaybe<Order_By>;
  location?: InputMaybe<Locations_Order_By>;
  locationId?: InputMaybe<Order_By>;
  mapComponents_aggregate?: InputMaybe<Map_Application_Component_Technology_Logical_Network_Aggregate_Order_By>;
  mapTechnologyNetworkHierarchies2_aggregate?: InputMaybe<Map_Technology_Network_Hierarchy_Aggregate_Order_By>;
  mapTechnologyNetworkHierarchies_aggregate?: InputMaybe<Map_Technology_Network_Hierarchy_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  scope?: InputMaybe<Order_By>;
  technologyNodes_aggregate?: InputMaybe<Technology_Nodes_Aggregate_Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: technology_networks */
export type Technology_Networks_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "technology_networks" */
export enum Technology_Networks_Select_Column {
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
export type Technology_Networks_Set_Input = {
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

/** Streaming cursor of the table "technology_networks" */
export type Technology_Networks_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Technology_Networks_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Technology_Networks_Stream_Cursor_Value_Input = {
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
export enum Technology_Networks_Update_Column {
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

export type Technology_Networks_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Technology_Networks_Set_Input>;
  /** filter the rows which have to be updated */
  where: Technology_Networks_Bool_Exp;
};

/** columns and relationships of "technology_nodes" */
export type Technology_Nodes = {
  __typename?: 'technology_nodes';
  architecture: Scalars['system_architecture_kind_enum']['output'];
  code: Scalars['String']['output'];
  cpuCores?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['timestamptz']['output'];
  createdBy?: Maybe<Scalars['uuid']['output']>;
  deletedAt?: Maybe<Scalars['timestamptz']['output']>;
  deletedBy?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  environment: Scalars['environment_enum']['output'];
  id: Scalars['uuid']['output'];
  kind: Scalars['node_kind_enum']['output'];
  /** An array relationship */
  mapComponents: Array<Map_Application_Component_Technology_Node>;
  /** An aggregate relationship */
  mapComponents_aggregate: Map_Application_Component_Technology_Node_Aggregate;
  /** An array relationship */
  mapSystemSoftwares: Array<Map_Technology_Node_System_Software>;
  /** An aggregate relationship */
  mapSystemSoftwares_aggregate: Map_Technology_Node_System_Software_Aggregate;
  /** An array relationship */
  mapTechnologyNodeHierarchies: Array<Map_Technology_Node_Hierarchy>;
  /** An array relationship */
  mapTechnologyNodeHierarchies2: Array<Map_Technology_Node_Hierarchy>;
  /** An aggregate relationship */
  mapTechnologyNodeHierarchies2_aggregate: Map_Technology_Node_Hierarchy_Aggregate;
  /** An aggregate relationship */
  mapTechnologyNodeHierarchies_aggregate: Map_Technology_Node_Hierarchy_Aggregate;
  name: Scalars['String']['output'];
  /** An object relationship */
  network?: Maybe<Technology_Networks>;
  networkId?: Maybe<Scalars['uuid']['output']>;
  nodeCount?: Maybe<Scalars['Int']['output']>;
  /** An object relationship */
  operatingSystem: System_Software;
  operatingSystemId: Scalars['uuid']['output'];
  ramGb?: Maybe<Scalars['Int']['output']>;
  storageGb?: Maybe<Scalars['Int']['output']>;
  totalCpuCores?: Maybe<Scalars['Int']['output']>;
  totalRamGb?: Maybe<Scalars['Int']['output']>;
  totalStorageGb?: Maybe<Scalars['Int']['output']>;
  /** An object relationship */
  type: Directories;
  typeId: Scalars['uuid']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedBy?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "technology_nodes" */
export type Technology_NodesMapComponentsArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Technology_Node_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Technology_Node_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Technology_Node_Bool_Exp>;
};


/** columns and relationships of "technology_nodes" */
export type Technology_NodesMapComponents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Application_Component_Technology_Node_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Application_Component_Technology_Node_Order_By>>;
  where?: InputMaybe<Map_Application_Component_Technology_Node_Bool_Exp>;
};


/** columns and relationships of "technology_nodes" */
export type Technology_NodesMapSystemSoftwaresArgs = {
  distinct_on?: InputMaybe<Array<Map_Technology_Node_System_Software_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Technology_Node_System_Software_Order_By>>;
  where?: InputMaybe<Map_Technology_Node_System_Software_Bool_Exp>;
};


/** columns and relationships of "technology_nodes" */
export type Technology_NodesMapSystemSoftwares_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Technology_Node_System_Software_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Technology_Node_System_Software_Order_By>>;
  where?: InputMaybe<Map_Technology_Node_System_Software_Bool_Exp>;
};


/** columns and relationships of "technology_nodes" */
export type Technology_NodesMapTechnologyNodeHierarchiesArgs = {
  distinct_on?: InputMaybe<Array<Map_Technology_Node_Hierarchy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Technology_Node_Hierarchy_Order_By>>;
  where?: InputMaybe<Map_Technology_Node_Hierarchy_Bool_Exp>;
};


/** columns and relationships of "technology_nodes" */
export type Technology_NodesMapTechnologyNodeHierarchies2Args = {
  distinct_on?: InputMaybe<Array<Map_Technology_Node_Hierarchy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Technology_Node_Hierarchy_Order_By>>;
  where?: InputMaybe<Map_Technology_Node_Hierarchy_Bool_Exp>;
};


/** columns and relationships of "technology_nodes" */
export type Technology_NodesMapTechnologyNodeHierarchies2_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Technology_Node_Hierarchy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Technology_Node_Hierarchy_Order_By>>;
  where?: InputMaybe<Map_Technology_Node_Hierarchy_Bool_Exp>;
};


/** columns and relationships of "technology_nodes" */
export type Technology_NodesMapTechnologyNodeHierarchies_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Map_Technology_Node_Hierarchy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Map_Technology_Node_Hierarchy_Order_By>>;
  where?: InputMaybe<Map_Technology_Node_Hierarchy_Bool_Exp>;
};

/** aggregated selection of "technology_nodes" */
export type Technology_Nodes_Aggregate = {
  __typename?: 'technology_nodes_aggregate';
  aggregate?: Maybe<Technology_Nodes_Aggregate_Fields>;
  nodes: Array<Technology_Nodes>;
};

export type Technology_Nodes_Aggregate_Bool_Exp = {
  count?: InputMaybe<Technology_Nodes_Aggregate_Bool_Exp_Count>;
};

export type Technology_Nodes_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Technology_Nodes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Technology_Nodes_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "technology_nodes" */
export type Technology_Nodes_Aggregate_Fields = {
  __typename?: 'technology_nodes_aggregate_fields';
  avg?: Maybe<Technology_Nodes_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Technology_Nodes_Max_Fields>;
  min?: Maybe<Technology_Nodes_Min_Fields>;
  stddev?: Maybe<Technology_Nodes_Stddev_Fields>;
  stddev_pop?: Maybe<Technology_Nodes_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Technology_Nodes_Stddev_Samp_Fields>;
  sum?: Maybe<Technology_Nodes_Sum_Fields>;
  var_pop?: Maybe<Technology_Nodes_Var_Pop_Fields>;
  var_samp?: Maybe<Technology_Nodes_Var_Samp_Fields>;
  variance?: Maybe<Technology_Nodes_Variance_Fields>;
};


/** aggregate fields of "technology_nodes" */
export type Technology_Nodes_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Technology_Nodes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "technology_nodes" */
export type Technology_Nodes_Aggregate_Order_By = {
  avg?: InputMaybe<Technology_Nodes_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Technology_Nodes_Max_Order_By>;
  min?: InputMaybe<Technology_Nodes_Min_Order_By>;
  stddev?: InputMaybe<Technology_Nodes_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Technology_Nodes_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Technology_Nodes_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Technology_Nodes_Sum_Order_By>;
  var_pop?: InputMaybe<Technology_Nodes_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Technology_Nodes_Var_Samp_Order_By>;
  variance?: InputMaybe<Technology_Nodes_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "technology_nodes" */
export type Technology_Nodes_Arr_Rel_Insert_Input = {
  data: Array<Technology_Nodes_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Technology_Nodes_On_Conflict>;
};

/** aggregate avg on columns */
export type Technology_Nodes_Avg_Fields = {
  __typename?: 'technology_nodes_avg_fields';
  cpuCores?: Maybe<Scalars['Float']['output']>;
  nodeCount?: Maybe<Scalars['Float']['output']>;
  ramGb?: Maybe<Scalars['Float']['output']>;
  storageGb?: Maybe<Scalars['Float']['output']>;
  totalCpuCores?: Maybe<Scalars['Float']['output']>;
  totalRamGb?: Maybe<Scalars['Float']['output']>;
  totalStorageGb?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "technology_nodes" */
export type Technology_Nodes_Avg_Order_By = {
  cpuCores?: InputMaybe<Order_By>;
  nodeCount?: InputMaybe<Order_By>;
  ramGb?: InputMaybe<Order_By>;
  storageGb?: InputMaybe<Order_By>;
  totalCpuCores?: InputMaybe<Order_By>;
  totalRamGb?: InputMaybe<Order_By>;
  totalStorageGb?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "technology_nodes". All fields are combined with a logical 'AND'. */
export type Technology_Nodes_Bool_Exp = {
  _and?: InputMaybe<Array<Technology_Nodes_Bool_Exp>>;
  _not?: InputMaybe<Technology_Nodes_Bool_Exp>;
  _or?: InputMaybe<Array<Technology_Nodes_Bool_Exp>>;
  architecture?: InputMaybe<System_Architecture_Kind_Enum_Comparison_Exp>;
  code?: InputMaybe<String_Comparison_Exp>;
  cpuCores?: InputMaybe<Int_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdBy?: InputMaybe<Uuid_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedBy?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  environment?: InputMaybe<Environment_Enum_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  kind?: InputMaybe<Node_Kind_Enum_Comparison_Exp>;
  mapComponents?: InputMaybe<Map_Application_Component_Technology_Node_Bool_Exp>;
  mapComponents_aggregate?: InputMaybe<Map_Application_Component_Technology_Node_Aggregate_Bool_Exp>;
  mapSystemSoftwares?: InputMaybe<Map_Technology_Node_System_Software_Bool_Exp>;
  mapSystemSoftwares_aggregate?: InputMaybe<Map_Technology_Node_System_Software_Aggregate_Bool_Exp>;
  mapTechnologyNodeHierarchies?: InputMaybe<Map_Technology_Node_Hierarchy_Bool_Exp>;
  mapTechnologyNodeHierarchies2?: InputMaybe<Map_Technology_Node_Hierarchy_Bool_Exp>;
  mapTechnologyNodeHierarchies2_aggregate?: InputMaybe<Map_Technology_Node_Hierarchy_Aggregate_Bool_Exp>;
  mapTechnologyNodeHierarchies_aggregate?: InputMaybe<Map_Technology_Node_Hierarchy_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  network?: InputMaybe<Technology_Networks_Bool_Exp>;
  networkId?: InputMaybe<Uuid_Comparison_Exp>;
  nodeCount?: InputMaybe<Int_Comparison_Exp>;
  operatingSystem?: InputMaybe<System_Software_Bool_Exp>;
  operatingSystemId?: InputMaybe<Uuid_Comparison_Exp>;
  ramGb?: InputMaybe<Int_Comparison_Exp>;
  storageGb?: InputMaybe<Int_Comparison_Exp>;
  totalCpuCores?: InputMaybe<Int_Comparison_Exp>;
  totalRamGb?: InputMaybe<Int_Comparison_Exp>;
  totalStorageGb?: InputMaybe<Int_Comparison_Exp>;
  type?: InputMaybe<Directories_Bool_Exp>;
  typeId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedBy?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "technology_nodes" */
export enum Technology_Nodes_Constraint {
  /** unique or primary key constraint on columns "code" */
  TechnologyNodesCodeUnique = 'technology_nodes_code_unique',
  /** unique or primary key constraint on columns "id" */
  TechnologyNodesPkey = 'technology_nodes_pkey'
}

/** input type for incrementing numeric columns in table "technology_nodes" */
export type Technology_Nodes_Inc_Input = {
  cpuCores?: InputMaybe<Scalars['Int']['input']>;
  nodeCount?: InputMaybe<Scalars['Int']['input']>;
  ramGb?: InputMaybe<Scalars['Int']['input']>;
  storageGb?: InputMaybe<Scalars['Int']['input']>;
  totalCpuCores?: InputMaybe<Scalars['Int']['input']>;
  totalRamGb?: InputMaybe<Scalars['Int']['input']>;
  totalStorageGb?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "technology_nodes" */
export type Technology_Nodes_Insert_Input = {
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
  mapComponents?: InputMaybe<Map_Application_Component_Technology_Node_Arr_Rel_Insert_Input>;
  mapSystemSoftwares?: InputMaybe<Map_Technology_Node_System_Software_Arr_Rel_Insert_Input>;
  mapTechnologyNodeHierarchies?: InputMaybe<Map_Technology_Node_Hierarchy_Arr_Rel_Insert_Input>;
  mapTechnologyNodeHierarchies2?: InputMaybe<Map_Technology_Node_Hierarchy_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  network?: InputMaybe<Technology_Networks_Obj_Rel_Insert_Input>;
  networkId?: InputMaybe<Scalars['uuid']['input']>;
  nodeCount?: InputMaybe<Scalars['Int']['input']>;
  operatingSystem?: InputMaybe<System_Software_Obj_Rel_Insert_Input>;
  operatingSystemId?: InputMaybe<Scalars['uuid']['input']>;
  ramGb?: InputMaybe<Scalars['Int']['input']>;
  storageGb?: InputMaybe<Scalars['Int']['input']>;
  totalCpuCores?: InputMaybe<Scalars['Int']['input']>;
  totalRamGb?: InputMaybe<Scalars['Int']['input']>;
  totalStorageGb?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Directories_Obj_Rel_Insert_Input>;
  typeId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedBy?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Technology_Nodes_Max_Fields = {
  __typename?: 'technology_nodes_max_fields';
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
export type Technology_Nodes_Max_Order_By = {
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
export type Technology_Nodes_Min_Fields = {
  __typename?: 'technology_nodes_min_fields';
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
export type Technology_Nodes_Min_Order_By = {
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
export type Technology_Nodes_Mutation_Response = {
  __typename?: 'technology_nodes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Technology_Nodes>;
};

/** input type for inserting object relation for remote table "technology_nodes" */
export type Technology_Nodes_Obj_Rel_Insert_Input = {
  data: Technology_Nodes_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Technology_Nodes_On_Conflict>;
};

/** on_conflict condition type for table "technology_nodes" */
export type Technology_Nodes_On_Conflict = {
  constraint: Technology_Nodes_Constraint;
  update_columns?: Array<Technology_Nodes_Update_Column>;
  where?: InputMaybe<Technology_Nodes_Bool_Exp>;
};

/** Ordering options when selecting data from "technology_nodes". */
export type Technology_Nodes_Order_By = {
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
  mapComponents_aggregate?: InputMaybe<Map_Application_Component_Technology_Node_Aggregate_Order_By>;
  mapSystemSoftwares_aggregate?: InputMaybe<Map_Technology_Node_System_Software_Aggregate_Order_By>;
  mapTechnologyNodeHierarchies2_aggregate?: InputMaybe<Map_Technology_Node_Hierarchy_Aggregate_Order_By>;
  mapTechnologyNodeHierarchies_aggregate?: InputMaybe<Map_Technology_Node_Hierarchy_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  network?: InputMaybe<Technology_Networks_Order_By>;
  networkId?: InputMaybe<Order_By>;
  nodeCount?: InputMaybe<Order_By>;
  operatingSystem?: InputMaybe<System_Software_Order_By>;
  operatingSystemId?: InputMaybe<Order_By>;
  ramGb?: InputMaybe<Order_By>;
  storageGb?: InputMaybe<Order_By>;
  totalCpuCores?: InputMaybe<Order_By>;
  totalRamGb?: InputMaybe<Order_By>;
  totalStorageGb?: InputMaybe<Order_By>;
  type?: InputMaybe<Directories_Order_By>;
  typeId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  updatedBy?: InputMaybe<Order_By>;
};

/** primary key columns input for table: technology_nodes */
export type Technology_Nodes_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "technology_nodes" */
export enum Technology_Nodes_Select_Column {
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
export type Technology_Nodes_Set_Input = {
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
export type Technology_Nodes_Stddev_Fields = {
  __typename?: 'technology_nodes_stddev_fields';
  cpuCores?: Maybe<Scalars['Float']['output']>;
  nodeCount?: Maybe<Scalars['Float']['output']>;
  ramGb?: Maybe<Scalars['Float']['output']>;
  storageGb?: Maybe<Scalars['Float']['output']>;
  totalCpuCores?: Maybe<Scalars['Float']['output']>;
  totalRamGb?: Maybe<Scalars['Float']['output']>;
  totalStorageGb?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "technology_nodes" */
export type Technology_Nodes_Stddev_Order_By = {
  cpuCores?: InputMaybe<Order_By>;
  nodeCount?: InputMaybe<Order_By>;
  ramGb?: InputMaybe<Order_By>;
  storageGb?: InputMaybe<Order_By>;
  totalCpuCores?: InputMaybe<Order_By>;
  totalRamGb?: InputMaybe<Order_By>;
  totalStorageGb?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Technology_Nodes_Stddev_Pop_Fields = {
  __typename?: 'technology_nodes_stddev_pop_fields';
  cpuCores?: Maybe<Scalars['Float']['output']>;
  nodeCount?: Maybe<Scalars['Float']['output']>;
  ramGb?: Maybe<Scalars['Float']['output']>;
  storageGb?: Maybe<Scalars['Float']['output']>;
  totalCpuCores?: Maybe<Scalars['Float']['output']>;
  totalRamGb?: Maybe<Scalars['Float']['output']>;
  totalStorageGb?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "technology_nodes" */
export type Technology_Nodes_Stddev_Pop_Order_By = {
  cpuCores?: InputMaybe<Order_By>;
  nodeCount?: InputMaybe<Order_By>;
  ramGb?: InputMaybe<Order_By>;
  storageGb?: InputMaybe<Order_By>;
  totalCpuCores?: InputMaybe<Order_By>;
  totalRamGb?: InputMaybe<Order_By>;
  totalStorageGb?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Technology_Nodes_Stddev_Samp_Fields = {
  __typename?: 'technology_nodes_stddev_samp_fields';
  cpuCores?: Maybe<Scalars['Float']['output']>;
  nodeCount?: Maybe<Scalars['Float']['output']>;
  ramGb?: Maybe<Scalars['Float']['output']>;
  storageGb?: Maybe<Scalars['Float']['output']>;
  totalCpuCores?: Maybe<Scalars['Float']['output']>;
  totalRamGb?: Maybe<Scalars['Float']['output']>;
  totalStorageGb?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "technology_nodes" */
export type Technology_Nodes_Stddev_Samp_Order_By = {
  cpuCores?: InputMaybe<Order_By>;
  nodeCount?: InputMaybe<Order_By>;
  ramGb?: InputMaybe<Order_By>;
  storageGb?: InputMaybe<Order_By>;
  totalCpuCores?: InputMaybe<Order_By>;
  totalRamGb?: InputMaybe<Order_By>;
  totalStorageGb?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "technology_nodes" */
export type Technology_Nodes_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Technology_Nodes_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Technology_Nodes_Stream_Cursor_Value_Input = {
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
export type Technology_Nodes_Sum_Fields = {
  __typename?: 'technology_nodes_sum_fields';
  cpuCores?: Maybe<Scalars['Int']['output']>;
  nodeCount?: Maybe<Scalars['Int']['output']>;
  ramGb?: Maybe<Scalars['Int']['output']>;
  storageGb?: Maybe<Scalars['Int']['output']>;
  totalCpuCores?: Maybe<Scalars['Int']['output']>;
  totalRamGb?: Maybe<Scalars['Int']['output']>;
  totalStorageGb?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "technology_nodes" */
export type Technology_Nodes_Sum_Order_By = {
  cpuCores?: InputMaybe<Order_By>;
  nodeCount?: InputMaybe<Order_By>;
  ramGb?: InputMaybe<Order_By>;
  storageGb?: InputMaybe<Order_By>;
  totalCpuCores?: InputMaybe<Order_By>;
  totalRamGb?: InputMaybe<Order_By>;
  totalStorageGb?: InputMaybe<Order_By>;
};

/** update columns of table "technology_nodes" */
export enum Technology_Nodes_Update_Column {
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

export type Technology_Nodes_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Technology_Nodes_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Technology_Nodes_Set_Input>;
  /** filter the rows which have to be updated */
  where: Technology_Nodes_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Technology_Nodes_Var_Pop_Fields = {
  __typename?: 'technology_nodes_var_pop_fields';
  cpuCores?: Maybe<Scalars['Float']['output']>;
  nodeCount?: Maybe<Scalars['Float']['output']>;
  ramGb?: Maybe<Scalars['Float']['output']>;
  storageGb?: Maybe<Scalars['Float']['output']>;
  totalCpuCores?: Maybe<Scalars['Float']['output']>;
  totalRamGb?: Maybe<Scalars['Float']['output']>;
  totalStorageGb?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "technology_nodes" */
export type Technology_Nodes_Var_Pop_Order_By = {
  cpuCores?: InputMaybe<Order_By>;
  nodeCount?: InputMaybe<Order_By>;
  ramGb?: InputMaybe<Order_By>;
  storageGb?: InputMaybe<Order_By>;
  totalCpuCores?: InputMaybe<Order_By>;
  totalRamGb?: InputMaybe<Order_By>;
  totalStorageGb?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Technology_Nodes_Var_Samp_Fields = {
  __typename?: 'technology_nodes_var_samp_fields';
  cpuCores?: Maybe<Scalars['Float']['output']>;
  nodeCount?: Maybe<Scalars['Float']['output']>;
  ramGb?: Maybe<Scalars['Float']['output']>;
  storageGb?: Maybe<Scalars['Float']['output']>;
  totalCpuCores?: Maybe<Scalars['Float']['output']>;
  totalRamGb?: Maybe<Scalars['Float']['output']>;
  totalStorageGb?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "technology_nodes" */
export type Technology_Nodes_Var_Samp_Order_By = {
  cpuCores?: InputMaybe<Order_By>;
  nodeCount?: InputMaybe<Order_By>;
  ramGb?: InputMaybe<Order_By>;
  storageGb?: InputMaybe<Order_By>;
  totalCpuCores?: InputMaybe<Order_By>;
  totalRamGb?: InputMaybe<Order_By>;
  totalStorageGb?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Technology_Nodes_Variance_Fields = {
  __typename?: 'technology_nodes_variance_fields';
  cpuCores?: Maybe<Scalars['Float']['output']>;
  nodeCount?: Maybe<Scalars['Float']['output']>;
  ramGb?: Maybe<Scalars['Float']['output']>;
  storageGb?: Maybe<Scalars['Float']['output']>;
  totalCpuCores?: Maybe<Scalars['Float']['output']>;
  totalRamGb?: Maybe<Scalars['Float']['output']>;
  totalStorageGb?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "technology_nodes" */
export type Technology_Nodes_Variance_Order_By = {
  cpuCores?: InputMaybe<Order_By>;
  nodeCount?: InputMaybe<Order_By>;
  ramGb?: InputMaybe<Order_By>;
  storageGb?: InputMaybe<Order_By>;
  totalCpuCores?: InputMaybe<Order_By>;
  totalRamGb?: InputMaybe<Order_By>;
  totalStorageGb?: InputMaybe<Order_By>;
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

export type DeleteComponentHierarchyMutationVariables = Exact<{
  parentId: Scalars['uuid']['input'];
  childId: Scalars['uuid']['input'];
}>;


export type DeleteComponentHierarchyMutation = { __typename?: 'mutation_root', delete_map_application_component_hierarchy_by_pk?: { __typename?: 'map_application_component_hierarchy', componentParentId: any, componentChildId: any } | null };

export type GetComponentByPkQueryVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type GetComponentByPkQuery = { __typename?: 'query_root', components_by_pk?: { __typename?: 'components', id: any, code: string, name: string, description?: string | null, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null, state?: { __typename?: 'directories', name: string, color?: string | null } | null } | null };

export type GetComponentChildrenQueryVariables = Exact<{
  parentId: Scalars['uuid']['input'];
}>;


export type GetComponentChildrenQuery = { __typename?: 'query_root', map_application_component_hierarchy: Array<{ __typename?: 'map_application_component_hierarchy', componentParentId: any, componentChildId: any, order?: number | null, child: { __typename?: 'components', id: any, code: string, name: string } }> };

export type GetComponentDataObjectsQueryVariables = Exact<{
  componentId: Scalars['uuid']['input'];
}>;


export type GetComponentDataObjectsQuery = { __typename?: 'query_root', map_application_component_data_object: Array<{ __typename?: 'map_application_component_data_object', componentId: any, dataObjectId: any, dataObject: { __typename?: 'data_objects', id: any, code: string, name: string, description?: string | null } }> };

export type GetComponentEventsQueryVariables = Exact<{
  componentId: Scalars['uuid']['input'];
}>;


export type GetComponentEventsQuery = { __typename?: 'query_root', map_application_component_event: Array<{ __typename?: 'map_application_component_event', componentId: any, eventId: any, event: { __typename?: 'events', id: any, code: string, name: string, description?: string | null } }> };

export type GetComponentFunctionsQueryVariables = Exact<{
  componentId: Scalars['uuid']['input'];
}>;


export type GetComponentFunctionsQuery = { __typename?: 'query_root', map_application_component_function: Array<{ __typename?: 'map_application_component_function', componentId: any, functionId: any, function: { __typename?: 'functions', id: any, code: string, name: string, description?: string | null } }> };

export type GetComponentInterfacesQueryVariables = Exact<{
  componentId: Scalars['uuid']['input'];
}>;


export type GetComponentInterfacesQuery = { __typename?: 'query_root', map_application_component_interface: Array<{ __typename?: 'map_application_component_interface', componentId: any, interfaceId: any, interface: { __typename?: 'interfaces', id: any, code: string, name: string, description?: string | null } }> };

export type GetComponentParentsQueryVariables = Exact<{
  childId: Scalars['uuid']['input'];
}>;


export type GetComponentParentsQuery = { __typename?: 'query_root', map_application_component_hierarchy: Array<{ __typename?: 'map_application_component_hierarchy', componentParentId: any, componentChildId: any, order?: number | null, parent: { __typename?: 'components', id: any, code: string, name: string } }> };

export type GetComponentSystemSoftwareQueryVariables = Exact<{
  componentId: Scalars['uuid']['input'];
}>;


export type GetComponentSystemSoftwareQuery = { __typename?: 'query_root', map_application_component_system_software: Array<{ __typename?: 'map_application_component_system_software', componentId: any, systemSoftwareId: any, kind: any, systemSoftware: { __typename?: 'system_software', id: any, code: string, name: string } }> };

export type GetComponentsListQueryVariables = Exact<{
  where: Components_Bool_Exp;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type GetComponentsListQuery = { __typename?: 'query_root', components: Array<{ __typename?: 'components', id: any, code: string, name: string }>, components_aggregate: { __typename?: 'components_aggregate', aggregate?: { __typename?: 'components_aggregate_fields', count: number } | null } };

export type GetComponentsQueryVariables = Exact<{
  where: Components_Bool_Exp;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type GetComponentsQuery = { __typename?: 'query_root', components: Array<{ __typename?: 'components', id: any, code: string, name: string, description?: string | null, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null, state?: { __typename?: 'directories', id: any, code: string, name: string, color?: string | null } | null, mapFunctions: Array<{ __typename?: 'map_application_component_function', function: { __typename?: 'functions', id: any, code: string, name: string } }>, mapProducts: Array<{ __typename?: 'map_application_component_product', product: { __typename?: 'products', id: any, code: string, name: string } }>, mapInterfaces: Array<{ __typename?: 'map_application_component_interface', interface: { __typename?: 'interfaces', id: any, code: string, name: string } }>, criticalLevel?: { __typename?: 'directories', id: any, code: string, name: string } | null, failoverType?: { __typename?: 'directories', id: any, code: string, name: string } | null, licenseType?: { __typename?: 'directories', code: string, id: any, name: string } | null, monitoringLevel?: { __typename?: 'directories', code: string, id: any, name: string } | null, recoveryTime?: { __typename?: 'directories', id: any, code: string, name: string } | null, redundancyType?: { __typename?: 'directories', id: any, code: string, name: string, color?: string | null } | null, scalingType?: { __typename?: 'directories', id: any, code: string, name: string, color?: string | null } | null, style?: { __typename?: 'directories', id: any, code: string, name: string } | null, mapSystemSoftwares: Array<{ __typename?: 'map_application_component_system_software', kind: any, systemSoftware: { __typename?: 'system_software', id: any, code: string, kind: any, licenseType?: { __typename?: 'directories', code: string, color?: string | null, id: any, name: string } | null } }> }>, components_aggregate: { __typename?: 'components_aggregate', aggregate?: { __typename?: 'components_aggregate_fields', count: number } | null } };

export type GetDataObjectsListQueryVariables = Exact<{
  where: Data_Objects_Bool_Exp;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type GetDataObjectsListQuery = { __typename?: 'query_root', data_objects: Array<{ __typename?: 'data_objects', id: any, code: string, name: string }>, data_objects_aggregate: { __typename?: 'data_objects_aggregate', aggregate?: { __typename?: 'data_objects_aggregate_fields', count: number } | null } };

export type InsertComponentHierarchyMutationVariables = Exact<{
  parentId: Scalars['uuid']['input'];
  childId: Scalars['uuid']['input'];
  order?: InputMaybe<Scalars['Int']['input']>;
}>;


export type InsertComponentHierarchyMutation = { __typename?: 'mutation_root', insert_map_application_component_hierarchy_one?: { __typename?: 'map_application_component_hierarchy', componentParentId: any, componentChildId: any, order?: number | null } | null };

export type GetApplicationFunctionByPkQueryVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type GetApplicationFunctionByPkQuery = { __typename?: 'query_root', functions_by_pk?: { __typename?: 'functions', id: any, code: string, name: string, description?: string | null, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null } | null };

export type GetApplicationFunctionsQueryVariables = Exact<{
  where: Functions_Bool_Exp;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type GetApplicationFunctionsQuery = { __typename?: 'query_root', functions: Array<{ __typename?: 'functions', id: any, code: string, name: string, description?: string | null, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null }>, functions_aggregate: { __typename?: 'functions_aggregate', aggregate?: { __typename?: 'functions_aggregate_fields', count: number } | null } };

export type GetDataObjectByPkQueryVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type GetDataObjectByPkQuery = { __typename?: 'query_root', data_objects_by_pk?: { __typename?: 'data_objects', id: any, code: string, name: string, description?: string | null, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null } | null };

export type GetDataObjectsQueryVariables = Exact<{
  where: Data_Objects_Bool_Exp;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type GetDataObjectsQuery = { __typename?: 'query_root', data_objects: Array<{ __typename?: 'data_objects', id: any, code: string, name: string, description?: string | null, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null }>, data_objects_aggregate: { __typename?: 'data_objects_aggregate', aggregate?: { __typename?: 'data_objects_aggregate_fields', count: number } | null } };

export type GetDirectoryCountQueryVariables = Exact<{
  kind: Scalars['directory_kind_enum']['input'];
}>;


export type GetDirectoryCountQuery = { __typename?: 'query_root', directories_aggregate: { __typename?: 'directories_aggregate', aggregate?: { __typename?: 'directories_aggregate_fields', count: number } | null } };

export type GetDirectoryItemByPkQueryVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type GetDirectoryItemByPkQuery = { __typename?: 'query_root', directories_by_pk?: { __typename?: 'directories', id: any, code: string, name: string, description?: string | null, color?: string | null, byDefault: boolean, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null } | null };

export type GetDirectoryItemsQueryVariables = Exact<{
  kind: Scalars['directory_kind_enum']['input'];
}>;


export type GetDirectoryItemsQuery = { __typename?: 'query_root', directories: Array<{ __typename?: 'directories', id: any, code: string, name: string, description?: string | null, color?: string | null, byDefault: boolean, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null }> };

export type GetDirectoryRelationsQueryVariables = Exact<{
  sourceId: Scalars['uuid']['input'];
}>;


export type GetDirectoryRelationsQuery = { __typename?: 'query_root', map_directory_items: Array<{ __typename?: 'map_directory_items', createdAt: any, type: any, sourceId: any, targetId: any, target: { __typename?: 'directories', id: any, code: string, name: string, description?: string | null, kind: any } }> };

export type GetSystemSoftwareByPkQueryVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type GetSystemSoftwareByPkQuery = { __typename?: 'query_root', system_software_by_pk?: { __typename?: 'system_software', id: any, code: string, name: string, description?: string | null, version?: string | null, kind: any, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null, type?: { __typename?: 'directories', id: any, name: string } | null, licenseType?: { __typename?: 'directories', id: any, name: string } | null } | null };

export type GetSystemSoftwareQueryVariables = Exact<{
  where: System_Software_Bool_Exp;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type GetSystemSoftwareQuery = { __typename?: 'query_root', system_software: Array<{ __typename?: 'system_software', id: any, code: string, name: string, description?: string | null, version?: string | null, kind: any, createdAt: any, createdBy?: any | null, updatedAt?: any | null, updatedBy?: any | null, type?: { __typename?: 'directories', id: any, name: string } | null, licenseType?: { __typename?: 'directories', id: any, name: string } | null }>, system_software_aggregate: { __typename?: 'system_software_aggregate', aggregate?: { __typename?: 'system_software_aggregate_fields', count: number } | null } };

export type GetSystemSoftwareListQueryVariables = Exact<{
  where: System_Software_Bool_Exp;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type GetSystemSoftwareListQuery = { __typename?: 'query_root', system_software: Array<{ __typename?: 'system_software', id: any, code: string, name: string }>, system_software_aggregate: { __typename?: 'system_software_aggregate', aggregate?: { __typename?: 'system_software_aggregate_fields', count: number } | null } };
