"use client"

import { ChevronRight } from "lucide-react"
import * as React from "react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {TMenu} from "@/menu/t-menu-item";
import {useTranslate} from "@tolgee/react";

interface INavMenuProps {
  menu: TMenu
}

export function NavMenu({ menu }: INavMenuProps) {
  const { t } = useTranslate();
  // Radix Collapsible uses runtime-generated IDs (`useId()`), and in dev we can get
  // hydration warnings when server/client IDs don't line up. Render after mount.
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }

  return (
    <SidebarGroup className='flex flex-col gap-6' >
      {
        menu.map((menuItem, index) => (
          <div key={menuItem.title ?? index}>
            <SidebarGroupLabel>{t(menuItem.title)}</SidebarGroupLabel>
            <SidebarMenu>
              {menuItem.items.map((item) => (
                <Collapsible
                  key={item.title}
                  // asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    {
                      item.items
                        ? (
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton tooltip={t(item.title)}>
                              {item.icon && ( item.color
                                ? <item.icon color={item.color} strokeWidth={3}/>
                                : <item.icon strokeWidth={3}/>)}
                              <span>{t(item.title)}</span>
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                        )
                        : (
                          <SidebarMenuButton asChild>
                            <a href={item.url}>
                              {item.icon && <item.icon strokeWidth={3} />}
                              <span>{t(item.title)}</span>
                            </a>
                          </SidebarMenuButton>
                        )
                    }
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.url ?? subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a href={subItem.url}>
                                <span>{t(subItem.title)}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </div>
        ))
      }
    </SidebarGroup>
  )
}
