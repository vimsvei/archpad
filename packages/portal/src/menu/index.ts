import {TMenu, TMenuItem, TSecondaryMenu} from "@/menu/t-menu-item";
import {BrickWallShield, Folder, House, LayoutDashboard, LifeBuoy, Send, Settings2} from "lucide-react";
import { DirectoryKind } from "@archpad/contracts";

function slugFromDirectoryKindKey(key: string) {
  return `${key.toLowerCase().replace(/_/g, "-")}s`;
}

const DIRECTORY_MENU_ITEMS: TMenuItem[] = (Object.keys(DirectoryKind) as Array<keyof typeof DirectoryKind>)
  .sort()
  .map((key) => ({
    title: DirectoryKind[key], // Tolgee key
    icon: BrickWallShield,
    url: `/directories/${slugFromDirectoryKindKey(String(key))}`,
  }));

export const menu: TMenu = [
  {
    title: 'Menu-Dashboards',
    items: [
      {
        title: 'Main-Dashboards',
        icon: House,
        // icon: LayoutDashboard,
        url: '/dashboard',
      }
    ]
  },
  {
    title: 'Menu-Portfolio',
    items: [
      {
        title: 'Strategy',
        icon: Folder,
        color: '#fcca56',
        isActive: false,
        items: [
          {
            title: 'Strategy-Resource',
            url: '/resources',
          },
          {
            title: 'Strategy-Capability',
            url: '/capabilities',
          }
        ]
      },
      {
        title: 'Business',
        icon: Folder,
        color: '#ffffaf',
        items: [
          {
            title: 'Business-Actors',
            url: '/actors',
          },
          {
            title: 'Business-Roles',
            url: '/roles',
          }
        ]
      },
      {
        title: 'Application',
        icon: Folder,
        color: '#62fcfc',
        isActive: true,
        items: [
          {
            title: 'Application-Component',
            url: '/components',
          },
          {
            title: 'Application-DataObjects',
            url: '/data-objects',
          }
        ]
      },
      {
        title: 'Technologies',
        icon: Folder,
        color: '#77fc77',
        items: [
          {
            title: 'Technologies-Networks',
            url: '/networks',
          },
          {
            title: 'Technologies-System-Software',
            url: '/system-software',
          },
          {
            title: 'Technologies-Location',
            url: '/locations',
          }
        ]
      }
    ]
  },
  {
    title: 'Menu-Catalog',
    items: [
      {
        title: 'Solutions',
        icon: BrickWallShield,
        url: '/solutions',
      }
    ]
  },
  {
    title: 'Menu-Directory',
    items: [
      ...DIRECTORY_MENU_ITEMS,
    ]
  },
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
