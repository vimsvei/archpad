import {TMenu, TMenuItem, TSecondaryMenu} from "@/menu/t-menu-item";
import {BrickWallShield, Folder, House, LayoutDashboard, LifeBuoy, Send, Settings2} from "lucide-react";
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
        icon: Folder,
        // color: '#fcca56',
        isActive: false,
        items: [
          {
            title: 'strategy.resource',
            url: '/resources',
          },
          {
            title: 'strategy.capability',
            url: '/capabilities',
          }
        ]
      },
      {
        title: 'architecture.layer.business',
        icon: Folder,
        // color: '#ffffaf',
        items: [
          {
            title: 'business.actors',
            url: '/actors',
          },
          {
            title: 'business.roles',
            url: '/roles',
          }
        ]
      },
      {
        title: 'architecture.layer.application',
        icon: Folder,
        // color: '#62fcfc',
        isActive: true,
        items: [
          {
            title: 'application.component',
            url: '/application/components',
          },
          {
            title: 'application.data-objects',
            url: '/application/data-objects',
          }
        ]
      },
      {
        title: 'architecture.layer.technologies',
        icon: Folder,
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
        icon: Folder,
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
    ]
  },
  {
    title: 'portfolio',
    items: [
      {
        title: 'portfolio.solutions',
        icon: BrickWallShield,
        url: '/solutions',
      },
      {
        title: 'portfolio.flows',
        icon: BrickWallShield,
        url: '/solutions',
      }
    ]
  },
  {
    title: 'management',
    items: [
      {
        title: 'management.directories',
        items: [
          ...DIRECTORY_MENU_ITEMS,
        ]
      },
      
    ]
  },
  {
    title: 'admin-level',
    items: []
  }
]

export const secondaryMenu: TSecondaryMenu = [
  {
    title: "Support",
    url: "#",
    icon: LifeBuoy,
  },
  {
    title: "Feedback",
    url: "#",
    icon: Send,
  },
]
