import {TMenu, TMenuItem, TSecondaryMenu} from "@/menu/t-menu-item";
import {BrickWallShield, Folder, House, LayoutDashboard, LifeBuoy, Send, Settings2} from "lucide-react";

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
      {
        title: 'Architecture-Style',
        icon: BrickWallShield,
        url: '/directories/architecture-style',
      },
      {
        title: 'Critical-Levels',
        icon: BrickWallShield,
        url: '/directories/critical-levels',
      },
      {
        title: 'Node-Types',
        icon: BrickWallShield,
        url: '/directories/node-types',
      },
      {
        title: 'License-Types',
        icon: BrickWallShield,
        url: '/directories/license-types',
      },
      {
        title: 'Protocol-Types',
        icon: BrickWallShield,
        url: '/directories/protocol-types',
      },
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
