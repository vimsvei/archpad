import type { Meta, StoryObj } from '@storybook/react';
import { DirectoryItemDetail } from './directory-item-detail';
import { getDirectoryById } from '@/lib/mock-directories';
import type { DirectoryItem } from '@/@types/directory';

const meta = {
  title: 'Pages/Directory Item Detail',
  component: DirectoryItemDetail,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onBack: { action: 'back' },
    onSave: { action: 'save' },
  },
} satisfies Meta<typeof DirectoryItemDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

const statesDirectory = getDirectoryById('dir-states')!;
const sampleStateItem: DirectoryItem = {
  id: 'state-1',
  code: 'ACTIVE',
  name: 'Active',
  description: 'Component is actively used in production environment.\n\nRegularly maintained and monitored.',
  color: '#22c55e',
  order: 1,
  byDefault: true,
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-02-10T14:20:00Z',
  relations: [
    {
      id: 'rel-1',
      targetDirectoryName: 'License Types',
      targetItemName: 'Commercial',
      relationType: 'uses',
    },
    {
      id: 'rel-2',
      targetDirectoryName: 'Critical Levels',
      targetItemName: 'High',
      relationType: 'has',
    },
  ],
};

export const WithRelations: Story = {
  name: 'State Item with Relations',
  args: {
    item: sampleStateItem,
    directory: statesDirectory,
  },
};

export const NoRelations: Story = {
  name: 'No Relations',
  args: {
    item: {
      ...sampleStateItem,
      relations: [],
    },
    directory: statesDirectory,
  },
};

export const LicenseType: Story = {
  name: 'License Type (Markdown)',
  args: {
    item: {
      id: 'license-1',
      code: 'OSS',
      name: 'Open Source',
      description: '# Open Source License\n\nFree to use, modify and distribute.\n\n## Popular Types:\n- MIT\n- Apache 2.0\n- GPL v3',
      color: '#3b82f6',
      order: 1,
      byDefault: false,
      createdAt: '2024-01-10T09:00:00Z',
      relations: [
        {
          id: 'rel-3',
          targetDirectoryName: 'States',
          targetItemName: 'Active',
          relationType: 'uses',
        },
      ],
    },
    directory: getDirectoryById('dir-license-types')!,
  },
};

export const MinimalData: Story = {
  name: 'Minimal Data',
  args: {
    item: {
      id: 'min-1',
      code: '',
      name: 'Minimal Item',
      description: '',
      color: '',
      order: 0,
      byDefault: false,
      relations: [],
    },
    directory: statesDirectory,
  },
};