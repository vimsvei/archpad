import type { ApplicationComponent, RelatedItem, FlowItem, StakeholderItem } from '@/@types/application-component';

export const mockComponents: ApplicationComponent[] = [
  {
    id: 'comp-001',
    code: 'CRM-001',
    name: 'Customer Relationship Management System',
    description: '# CRM System\n\nCore system for managing customer relationships and sales processes.\n\n## Features\n- Contact management\n- Lead tracking\n- Sales pipeline\n- Customer analytics',
    state: {
      id: 'state-1',
      name: 'Production',
      color: '#22c55e',
    },
    createdAt: '2024-01-15T10:30:00Z',
    createdBy: 'John Doe',
    updatedAt: '2024-02-10T14:20:00Z',
    updatedBy: 'Jane Smith',
    
    // Classification
    licenseType: { id: 'lic-1', name: 'Commercial' },
    architectureStyle: { id: 'arch-1', name: 'Microservices' },
    criticalLevel: { id: 'crit-1', name: 'High' },
    
    // Related items - Functions
    functions: [
      {
        id: 'func-001',
        code: 'F-CRM-001',
        name: 'Manage Customer Contacts',
        description: 'Create, read, update and delete customer contact information',
        state: { id: 'state-1', name: 'Production', color: '#22c55e' },
      },
      {
        id: 'func-002',
        code: 'F-CRM-002',
        name: 'Track Sales Pipeline',
        description: 'Monitor and manage sales opportunities through various stages',
        state: { id: 'state-1', name: 'Production', color: '#22c55e' },
      },
      {
        id: 'func-003',
        code: 'F-CRM-003',
        name: 'Generate Reports',
        description: 'Create sales and customer analytics reports',
        state: { id: 'state-2', name: 'Development', color: '#3b82f6' },
      },
    ],
    
    // Data Objects
    dataObjects: [
      {
        id: 'data-001',
        code: 'DO-CRM-001',
        name: 'Customer',
        description: 'Customer master data',
      },
      {
        id: 'data-002',
        code: 'DO-CRM-002',
        name: 'Opportunity',
        description: 'Sales opportunity data',
      },
      {
        id: 'data-003',
        code: 'DO-CRM-003',
        name: 'Activity',
        description: 'Customer interaction activities',
      },
    ],
    
    // Interfaces
    interfaces: [
      {
        id: 'int-001',
        code: 'INT-CRM-001',
        name: 'REST API',
        description: 'RESTful API for external integrations',
      },
      {
        id: 'int-002',
        code: 'INT-CRM-002',
        name: 'Web UI',
        description: 'Browser-based user interface',
      },
    ],
    
    // Events
    events: [
      {
        id: 'evt-001',
        code: 'EVT-CRM-001',
        name: 'Customer Created',
        description: 'Triggered when a new customer is created',
      },
      {
        id: 'evt-002',
        code: 'EVT-CRM-002',
        name: 'Opportunity Won',
        description: 'Triggered when an opportunity is marked as won',
      },
    ],
    
    // System Software
    systemSoftware: [
      {
        id: 'sw-001',
        code: 'SW-JAVA',
        name: 'Java Runtime Environment',
        description: 'JRE 17',
        state: { id: 'state-1', name: 'Production', color: '#22c55e' },
      },
      {
        id: 'sw-002',
        code: 'SW-POSTGRES',
        name: 'PostgreSQL',
        description: 'Database server v15',
        state: { id: 'state-1', name: 'Production', color: '#22c55e' },
      },
    ],
    
    // Technology Nodes
    technologyNodes: [
      {
        id: 'node-001',
        code: 'NODE-APP-01',
        name: 'Application Server 01',
        description: 'Primary application server',
        state: { id: 'state-1', name: 'Production', color: '#22c55e' },
      },
    ],
    
    // Technology Networks
    technologyNetworks: [
      {
        id: 'net-001',
        code: 'NET-PROD',
        name: 'Production Network',
        description: 'Production environment network',
      },
    ],
    
    // Hierarchy
    parents: [],
    children: [
      {
        id: 'comp-002',
        code: 'CRM-MOD-001',
        name: 'Contact Management Module',
        description: 'Submodule for managing contacts',
      },
      {
        id: 'comp-003',
        code: 'CRM-MOD-002',
        name: 'Sales Pipeline Module',
        description: 'Submodule for managing sales pipeline',
      },
    ],
    
    // Business Layer
    businessActors: [
      {
        id: 'actor-001',
        code: 'BA-SALES',
        name: 'Sales Representative',
        description: 'Sales team member who manages customer relationships and handles day-to-day customer interactions and sales activities',
        state: { id: 'state-1', name: 'Production', color: '#22c55e' },
      },
      {
        id: 'actor-002',
        code: 'BA-MANAGER',
        name: 'Sales Manager',
        description: 'Manager overseeing sales team and pipeline performance with strategic oversight responsibilities',
        state: { id: 'state-1', name: 'Production', color: '#22c55e' },
      },
    ],
    businessProcesses: [
      {
        id: 'proc-001',
        code: 'BP-LEAD-QUAL',
        name: 'Lead Qualification Process',
        description: 'Process for qualifying and converting leads to opportunities through systematic evaluation and scoring mechanisms',
        state: { id: 'state-1', name: 'Production', color: '#22c55e' },
      },
      {
        id: 'proc-002',
        code: 'BP-SALES-CLOSE',
        name: 'Sales Closing Process',
        description: 'Process for closing sales opportunities and finalizing contracts with detailed approval workflows',
        state: { id: 'state-2', name: 'Development', color: '#3b82f6' },
      },
    ],
    
    // Flows
    incomingFlows: [
      {
        id: 'flow-001',
        code: 'FLOW-IN-001',
        name: 'Customer Data Sync',
        description: 'Sync customer data from ERP',
        sourceComponent: 'ERP System',
        targetComponent: 'CRM System',
      },
    ],
    outgoingFlows: [
      {
        id: 'flow-002',
        code: 'FLOW-OUT-001',
        name: 'Order Creation',
        description: 'Create orders in ERP from CRM opportunities',
        sourceComponent: 'CRM System',
        targetComponent: 'ERP System',
      },
      {
        id: 'flow-003',
        code: 'FLOW-OUT-002',
        name: 'Marketing Sync',
        description: 'Sync contacts to marketing automation',
        sourceComponent: 'CRM System',
        targetComponent: 'Marketing Automation',
      },
    ],
  },
];

export const mockStakeholders: StakeholderItem[] = [
  {
    id: 'sh-001',
    stakeholderId: 'stake-001',
    stakeholderName: 'Sales Department',
    roleId: 'role-001',
    roleName: 'Primary User',
  },
  {
    id: 'sh-002',
    stakeholderId: 'stake-002',
    stakeholderName: 'IT Department',
    roleId: 'role-002',
    roleName: 'System Owner',
  },
  {
    id: 'sh-003',
    stakeholderId: 'stake-003',
    stakeholderName: 'Customer Service',
    roleId: 'role-001',
    roleName: 'Primary User',
  },
];

export const mockDirectoryItems = {
  states: [
    { id: 'state-1', name: 'Development', color: '#3b82f6' },
    { id: 'state-2', name: 'Production', color: '#22c55e' },
    { id: 'state-3', name: 'Deprecated', color: '#ef4444' },
  ],
  licenseTypes: [
    { id: 'lic-1', name: 'Commercial' },
    { id: 'lic-2', name: 'Open Source' },
    { id: 'lic-3', name: 'Proprietary' },
  ],
  architectureStyles: [
    { id: 'arch-1', name: 'Microservices' },
    { id: 'arch-2', name: 'Monolithic' },
    { id: 'arch-3', name: 'Serverless' },
  ],
  criticalLevels: [
    { id: 'crit-1', name: 'Low' },
    { id: 'crit-2', name: 'Medium' },
    { id: 'crit-3', name: 'High' },
    { id: 'crit-4', name: 'Critical' },
  ],
};

// Helper to get component by ID
export function getComponentById(id: string): ApplicationComponent | undefined {
  return mockComponents.find(c => c.id === id);
}

// Helper to get stakeholders for component
export function getStakeholdersForComponent(componentId: string): StakeholderItem[] {
  // In a real app, this would filter by componentId
  return mockStakeholders;
}