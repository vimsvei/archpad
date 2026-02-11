import { TMenu, TMenuItem, TSecondaryMenu } from '@/menu/t-menu-item';
import {
  Shield,
  BringToFront,
  Folder,
  House,
  LibraryBig,
  LifeBuoy,
  Send,
  Settings,
  Tent,
  TrendingUp,
  Upload,
  Layers,
  Network,
  Target,
  Building2,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { DirectoryKind } from '@/@types/directory-kind';

function slugFromDirectoryKindKey(key: string) {
  return `${key.toLowerCase().replace(/_/g, '-')}s`;
}

const DIRECTORY_MENU_ITEMS: TMenuItem[] = (
  Object.keys(DirectoryKind) as Array<keyof typeof DirectoryKind>
)
  .sort()
  .map((key) => ({
    title: DirectoryKind[key],
    icon: Shield,
    url: `/directories/${slugFromDirectoryKindKey(String(key))}`,
  }));

export const menu: TMenu = [
  {
    title: 'dashboards',
    items: [
      {
        title: 'dashboards.main',
        icon: House,
        url: '/dashboard',
      },
    ],
  },
  {
    title: 'architecture.layer',
    items: [
      {
        title: 'architecture.layer.strategy',
        icon: Target,
        isActive: false,
        items: [
          {
            title: 'strategy.resource',
            url: '/strategy/resources',
          },
          {
            title: 'strategy.capability',
            url: '/strategy/capabilities',
          },
        ],
      },
      {
        title: 'architecture.layer.business',
        icon: Building2,
        items: [
          {
            title: 'business.products',
            url: '/business/products',
          },
          {
            title: 'business.actors',
            url: '/business/actors',
          },
          {
            title: 'business.roles',
            url: '/business/roles',
          },
        ],
      },
      {
        title: 'architecture.layer.application',
        icon: Layers,
        isActive: true,
        items: [
          {
            title: 'application.components',
            url: '/application/components',
          },
          {
            title: 'application.functions',
            url: '/application/functions',
          },
          {
            title: 'application.data-objects',
            url: '/application/data-objects',
          },
        ],
      },
      {
        title: 'architecture.layer.technologies',
        icon: Network,
        items: [
          {
            title: 'technologies.networks',
            url: '/technologies/networks',
          },
          {
            title: 'technologies.nodes',
            url: '/technologies/nodes',
          },
          {
            title: 'technologies.system-software',
            url: '/technologies/system-software',
          },
          {
            title: 'technologies.location',
            url: '/technologies/locations',
          },
        ],
      },
      {
        title: 'architecture.layer.motivation',
        icon: Sparkles,
        items: [
          {
            title: 'motivation.stakeholders',
            url: '/motivation/stakeholders',
          },
          {
            title: 'motivation.motivation-items',
            url: '/motivation/items',
          },
        ],
      },
      {
        title: 'architecture.layer.implementation',
        icon: CheckCircle2,
        items: [
          {
            title: 'implementation.plateau',
            url: '/implementation/plateau',
          },
        ],
      },
    ],
  },
  {
    title: 'portfolio',
    items: [
      {
        title: 'portfolio.solutions',
        icon: Shield,
        url: '/solutions',
      },
      {
        title: 'portfolio.flows',
        icon: TrendingUp,
        url: '/flows',
      },
    ],
  },
  {
    title: 'management',
    items: [
      {
        title: 'management.directories',
        icon: LibraryBig,
        url: '/directories',
      },
      {
        title: 'management.state.schemas',
        icon: BringToFront,
        url: '/state-schemas',
      },
      {
        title: 'management.settings.tenants',
        icon: Tent,
        url: '/tenants',
      },
      {
        title: 'management.settings',
        icon: Settings,
        items: [
          {
            title: 'management.settings.upload.repository',
            icon: Upload,
            url: '/upload/repository',
          },
        ],
      },
    ],
  },
  {
    title: 'admin-level',
    items: [],
  },
];

export const secondaryMenu: TSecondaryMenu = [
  {
    title: 'Support',
    url: '#',
    icon: LifeBuoy,
  },
  {
    title: 'Feedback',
    url: '#',
    icon: Send,
  },
];