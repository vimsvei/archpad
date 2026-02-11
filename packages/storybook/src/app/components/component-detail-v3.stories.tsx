import type { Meta, StoryObj } from '@storybook/react';
import { ComponentDetailV3 } from './component-detail-v3';
import { mockComponents } from '@/lib/mock-data';

const meta = {
  title: 'Pages/Component Detail',
  component: ComponentDetailV3,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ComponentDetailV3>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    component: mockComponents[0],
    onBack: () => console.log('Back clicked'),
    onSave: (component) => console.log('Saved:', component),
  },
};

export const WithManyRelations: Story = {
  args: {
    component: mockComponents[1],
    onBack: () => console.log('Back clicked'),
    onSave: (component) => console.log('Saved:', component),
  },
};

export const MinimalData: Story = {
  args: {
    component: {
      ...mockComponents[0],
      description: '',
      businessActors: [],
      businessProcesses: [],
      functions: [],
      interfaces: [],
      events: [],
      parents: [],
      children: [],
      systemSoftware: [],
      technologyNodes: [],
      technologyNetworks: [],
      dataObjects: [],
      incomingFlows: [],
      outgoingFlows: [],
    },
    onBack: () => console.log('Back clicked'),
    onSave: (component) => console.log('Saved:', component),
  },
};
