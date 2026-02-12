import {TMenu, TMenuItem, TSecondaryMenu} from "@/menu/t-menu-item";
import {BrickWallShield, BringToFront, Building2, CheckCircle2, Folder, House, Layers, LayoutDashboard,
  LibraryBig, LifeBuoy, Network, Send, Settings, Settings2, Sparkles, Target, Tent, TrendingUp, Upload} from "lucide-react";
import { DirectoryKind } from "@/@types/directory-kind";

function slugFromDirectoryKindKey(key: string) {
  return `${key.toLowerCase().replace(/_/g, "-")}s`;
}

const DIRECTORY_MENU_ITEMS: TMenuItem[] = (Object.keys(DirectoryKind) as Array<keyof typeof DirectoryKind>)
  .sort()
  .map((key) => ({
    title: DirectoryKind[key],
    icon: BrickWallShield,
    url: `/directories/${slugFromDirectoryKindKey(String(key))}`,
  }));

export const menu: TMenu = [
  {
    title: 'dashboards',
    items: [
      {
        title: 'dashboards.main',
        icon: House,
        // icon: LayoutDashboard,
        url: '/dashboard',
      }
    ]
  },
  {
    title: 'architecture.layer',
    items: [
      {
        title: 'architecture.layer.strategy',
        icon: Target,
        // color: '#fcca56',
        isActive: false,
        items: [
          {
            title: 'strategy.resource',
            url: '/strategy/resources',
          },
          {
            title: 'strategy.capability',
            url: '/strategy/capabilities',
          }
        ]
      },
      {
        title: 'architecture.layer.business',
        icon: Building2,
        // color: '#ffffaf',
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
          }
        ]
      },
      {
        title: 'architecture.layer.application',
        icon: Layers,
        // color: '#62fcfc',
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
          }
        ]
      },
      {
        title: 'architecture.layer.technologies',
        icon: Network,
        // color: '#77fc77',
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
          }
        ]
      },
      {
        title: 'architecture.layer.motivation',
        icon: Sparkles,
        // color: '#77fc77',
        items: [
          {
            title: 'motivation.stakeholders',
            url: '/motivation/stakeholders',
          },
          {
            title: 'motivation.motivation-items',
            url: '/motivation/items',
          },
        ]
      },
      {
        title: 'architecture.layer.implementation',
        icon: CheckCircle2,
        items: [
          {
            title: 'implementation.plateau',
            url: '/implementation/plateau',
          },
        ]
      },
      {
        title: 'portfolio.solutions',
        icon: BrickWallShield,
        url: '/solutions',
      },
      {
        title: 'portfolio.flows',
        icon: TrendingUp,
        url: '/flows',
      }
    ]
  },
  {
    title: 'portfolio',
    items: [
    
    ]
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
        title: 'management.settings',
        icon: Settings,
        items: [
          {
            title: 'management.settings.upload.repository',
            icon: Upload,
            url: '/upload/repository',
          },
        ]
      }
    ]
  },
  {
    title: 'admin-level',
    items: [
      {
        title: 'management.settings.tenants',
        icon: Tent,
        url: '/admin/tenants',
      },
      {
        title: 'management.settings.users',
        icon: Tent,
        url: '/admin/users',
      },
    ]
  }
]

// export const secondaryMenu: TSecondaryMenu = [
//   {
//     title: "Support",
//     url: "#",
//     icon: LifeBuoy,
//   },
//   {
//     title: "Feedback",
//     url: "#",
//     icon: Send,
//   },
// ]
