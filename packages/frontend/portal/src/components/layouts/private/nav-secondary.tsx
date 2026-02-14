import * as React from "react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {TSecondaryMenu} from "@/menu/t-menu-item";
import {useTranslate} from "@tolgee/react";

interface INavSecondaryProps {
  menu: TSecondaryMenu
}
export function NavSecondary({
                               menu,
                               ...props
                             }: INavSecondaryProps & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const { t } = useTranslate();
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {menu.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="sm">
                <a href={item.url}>
                  {
                    item.icon && ( item.color
                    ? <item.icon color={item.color} strokeWidth={3}/>
                    : <item.icon strokeWidth={3}/>
                  )}
                  <span>{t(item.title)}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
