export type ApplicationComponent = {
  id: string;
  code: string;
  name: string;
  description?: string;
  state?: {
    id: string;
    name: string;
    color?: string;
  };
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  
  // Related items
  functions?: RelatedItem[];
  dataObjects?: RelatedItem[];
  interfaces?: RelatedItem[];
  events?: RelatedItem[];
  systemSoftware?: RelatedItem[];
  technologyNodes?: RelatedItem[];
  technologyNetworks?: RelatedItem[];
  parents?: RelatedItem[];
  children?: RelatedItem[];
  
  // Business Layer
  businessActors?: RelatedItem[];
  businessProcesses?: RelatedItem[];
  
  // Classification
  licenseType?: DirectoryItem;
  architectureStyle?: DirectoryItem;
  criticalLevel?: DirectoryItem;
  
  // Flows
  incomingFlows?: FlowItem[];
  outgoingFlows?: FlowItem[];
};

export type RelatedItem = {
  id: string;
  code: string;
  name: string;
  description?: string;
  state?: {
    id: string;
    name: string;
    color?: string;
  };
};

export type DirectoryItem = {
  id: string;
  name: string;
  code?: string;
};

export type FlowItem = {
  id: string;
  code: string;
  name: string;
  description?: string;
  sourceComponent?: string;
  sourceFunction?: string;
  targetComponent?: string;
  targetFunction?: string;
};

export type StakeholderItem = {
  id: string;
  stakeholderId: string;
  stakeholderName: string;
  roleId: string;
  roleName: string;
};