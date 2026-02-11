import type { Meta, StoryObj } from '@storybook/react';
import { ComponentDetailNoStakeholders } from './component-detail-no-stakeholders';
import { TooltipProvider } from '@/app/components/ui/tooltip';
import { Toaster } from '@/app/components/ui/sonner';
import type { ApplicationComponent } from '@/@types/application-component';

const meta = {
  title: 'Pages/Component Detail No Stakeholders',
  component: ComponentDetailNoStakeholders,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Story />
          <Toaster />
        </div>
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof ComponentDetailNoStakeholders>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock component without stakeholders - Basic
const mockComponentBasic: ApplicationComponent = {
  id: 'comp-no-sh-001',
  code: 'WEB-PORTAL-001',
  name: 'Customer Web Portal',
  description: 'Web application for customer self-service.\n\nProvides access to account information, order tracking, and support tickets.\n\nBuilt with React and TypeScript.',
  state: {
    id: 'state-2',
    name: 'Development',
    color: '#3b82f6',
  },
  createdAt: '2024-01-20T09:00:00Z',
  createdBy: 'Alex Johnson',
  updatedAt: '2024-02-08T16:30:00Z',
  updatedBy: 'Alex Johnson',
  
  licenseType: { id: 'lic-2', name: 'Open Source' },
  architectureStyle: { id: 'arch-2', name: 'Monolithic' },
  criticalLevel: { id: 'crit-2', name: 'Medium' },
  
  // Some basic relations
  functions: [
    {
      id: 'func-101',
      code: 'F-WP-001',
      name: 'User Authentication',
      description: 'Login and authentication for customers',
      state: { id: 'state-1', name: 'Production', color: '#22c55e' },
    },
    {
      id: 'func-102',
      code: 'F-WP-002',
      name: 'View Account Details',
      description: 'Display customer account information',
      state: { id: 'state-2', name: 'Development', color: '#3b82f6' },
    },
  ],
  
  dataObjects: [
    {
      id: 'data-101',
      code: 'D-WP-001',
      name: 'Customer Account',
      description: 'Customer account information',
      state: { id: 'state-1', name: 'Production', color: '#22c55e' },
    },
  ],
  
  interfaces: [],
  events: [],
  parents: [],
  children: [],
  businessActors: [],
  businessProcesses: [],
  systemSoftware: [],
  technologyNodes: [],
  technologyNetworks: [],
  incomingFlows: [],
  outgoingFlows: [],
};

// Mock component without stakeholders - With more relations
const mockComponentExtended: ApplicationComponent = {
  id: 'comp-no-sh-002',
  code: 'API-GW-001',
  name: 'API Gateway Service',
  description: '# API Gateway\n\nCentral entry point for all microservices.\n\n## Responsibilities\n- Request routing\n- Authentication & authorization\n- Rate limiting\n- API versioning\n- Request/response transformation',
  state: {
    id: 'state-3',
    name: 'Planning',
    color: '#f59e0b',
  },
  createdAt: '2024-01-25T11:00:00Z',
  createdBy: 'Maria Garcia',
  updatedAt: '2024-02-09T10:15:00Z',
  updatedBy: 'Maria Garcia',
  
  licenseType: { id: 'lic-1', name: 'Commercial' },
  architectureStyle: { id: 'arch-1', name: 'Microservices' },
  criticalLevel: { id: 'crit-1', name: 'High' },
  
  functions: [
    {
      id: 'func-201',
      code: 'F-GW-001',
      name: 'Route Requests',
      description: 'Route incoming API requests to appropriate microservices',
      state: { id: 'state-3', name: 'Planning', color: '#f59e0b' },
    },
    {
      id: 'func-202',
      code: 'F-GW-002',
      name: 'Authenticate Requests',
      description: 'Validate JWT tokens and API keys',
      state: { id: 'state-3', name: 'Planning', color: '#f59e0b' },
    },
    {
      id: 'func-203',
      code: 'F-GW-003',
      name: 'Apply Rate Limiting',
      description: 'Enforce rate limits per client',
      state: { id: 'state-3', name: 'Planning', color: '#f59e0b' },
    },
  ],
  
  interfaces: [
    {
      id: 'int-201',
      code: 'I-GW-001',
      name: 'REST API v1',
      description: 'RESTful API interface for external clients',
      state: { id: 'state-3', name: 'Planning', color: '#f59e0b' },
    },
    {
      id: 'int-202',
      code: 'I-GW-002',
      name: 'GraphQL API',
      description: 'GraphQL endpoint for flexible queries',
      state: { id: 'state-3', name: 'Planning', color: '#f59e0b' },
    },
  ],
  
  events: [
    {
      id: 'evt-201',
      code: 'E-GW-001',
      name: 'Request Received',
      description: 'Emitted when new API request is received',
      state: { id: 'state-3', name: 'Planning', color: '#f59e0b' },
    },
  ],
  
  systemSoftware: [
    {
      id: 'sys-201',
      code: 'S-GW-001',
      name: 'Kong Gateway',
      description: 'API gateway platform',
      state: { id: 'state-3', name: 'Planning', color: '#f59e0b' },
    },
  ],
  
  technologyNodes: [
    {
      id: 'node-201',
      code: 'N-GW-001',
      name: 'API Gateway Cluster',
      description: 'Kubernetes cluster for API gateway',
      state: { id: 'state-3', name: 'Planning', color: '#f59e0b' },
    },
  ],
  
  dataObjects: [],
  parents: [],
  children: [],
  businessActors: [],
  businessProcesses: [],
  technologyNetworks: [],
  incomingFlows: [],
  outgoingFlows: [],
};

// Mock component without stakeholders - Minimal data
const mockComponentMinimal: ApplicationComponent = {
  id: 'comp-no-sh-003',
  code: 'CACHE-001',
  name: 'Redis Cache Service',
  description: 'In-memory caching layer for application data.',
  state: {
    id: 'state-4',
    name: 'Retired',
    color: '#6b7280',
  },
  createdAt: '2023-06-10T14:00:00Z',
  createdBy: 'System',
  updatedAt: '2024-01-15T09:00:00Z',
  updatedBy: 'Admin',
  
  licenseType: { id: 'lic-2', name: 'Open Source' },
  architectureStyle: undefined,
  criticalLevel: { id: 'crit-3', name: 'Low' },
  
  functions: [],
  interfaces: [],
  events: [],
  parents: [],
  children: [],
  businessActors: [],
  businessProcesses: [],
  systemSoftware: [],
  technologyNodes: [],
  technologyNetworks: [],
  dataObjects: [],
  incomingFlows: [],
  outgoingFlows: [],
};

// Mock component with flows but no stakeholders
const mockComponentWithFlows: ApplicationComponent = {
  id: 'comp-no-sh-004',
  code: 'MSG-QUEUE-001',
  name: 'Message Queue Service',
  description: 'Asynchronous message processing queue.\n\nHandles background jobs and event-driven communication between services.',
  state: {
    id: 'state-1',
    name: 'Production',
    color: '#22c55e',
  },
  createdAt: '2023-11-05T10:00:00Z',
  createdBy: 'DevOps Team',
  updatedAt: '2024-02-10T15:45:00Z',
  updatedBy: 'DevOps Team',
  
  licenseType: { id: 'lic-2', name: 'Open Source' },
  architectureStyle: { id: 'arch-3', name: 'Event-Driven' },
  criticalLevel: { id: 'crit-1', name: 'High' },
  
  functions: [
    {
      id: 'func-301',
      code: 'F-MQ-001',
      name: 'Enqueue Messages',
      description: 'Add messages to processing queue',
      state: { id: 'state-1', name: 'Production', color: '#22c55e' },
    },
    {
      id: 'func-302',
      code: 'F-MQ-002',
      name: 'Process Messages',
      description: 'Process messages from queue',
      state: { id: 'state-1', name: 'Production', color: '#22c55e' },
    },
  ],
  
  systemSoftware: [
    {
      id: 'sys-301',
      code: 'S-MQ-001',
      name: 'RabbitMQ',
      description: 'Message broker software',
      state: { id: 'state-1', name: 'Production', color: '#22c55e' },
    },
  ],
  
  incomingFlows: [
    { id: 'flow-in-1', name: 'User Events', description: 'User action events from web app' },
    { id: 'flow-in-2', name: 'System Events', description: 'System-generated events' },
  ],
  
  outgoingFlows: [
    { id: 'flow-out-1', name: 'Processed Events', description: 'Events after processing' },
    { id: 'flow-out-2', name: 'Notifications', description: 'Notification messages' },
  ],
  
  interfaces: [],
  events: [],
  parents: [],
  children: [],
  businessActors: [],
  businessProcesses: [],
  technologyNodes: [],
  technologyNetworks: [],
  dataObjects: [],
};

export const BasicComponent: Story = {
  args: {
    component: mockComponentBasic,
    onBack: () => alert('Back to list'),
    onSave: (component) => console.log('Saved:', component),
  },
};

export const ExtendedRelations: Story = {
  args: {
    component: mockComponentExtended,
    onBack: () => alert('Back to list'),
    onSave: (component) => console.log('Saved:', component),
  },
};

export const MinimalData: Story = {
  args: {
    component: mockComponentMinimal,
    onBack: () => alert('Back to list'),
    onSave: (component) => console.log('Saved:', component),
  },
};

export const WithFlows: Story = {
  args: {
    component: mockComponentWithFlows,
    onBack: () => alert('Back to list'),
    onSave: (component) => console.log('Saved:', component),
  },
};
