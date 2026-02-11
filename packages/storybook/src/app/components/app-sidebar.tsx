import * as React from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
} from '@/app/components/ui/sidebar';
import { menu, secondaryMenu } from '@/menu/menu';
import { t } from '@/lib/i18n';

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="text-sm font-semibold">EA</span>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">ArchPad</span>
                <span className="truncate text-xs text-sidebar-foreground/70">
                  Enterprise Architecture
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {menu.map((section, sectionIndex) => {
          // Skip sections with no items
          if (!section.items || section.items.length === 0) return null;

          return (
            <SidebarGroup key={section.title}>
              <SidebarGroupLabel>{t(section.title)}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((item) =>
                    item.items && item.items.length > 0 ? (
                      // Item with sub-items (collapsible)
                      <CollapsiblePrimitive.Root
                        key={item.title}
                        defaultOpen={item.isActive}
                        asChild
                      >
                        <SidebarMenuItem>
                          <CollapsiblePrimitive.Trigger asChild>
                            <SidebarMenuButton
                              tooltip={t(item.title)}
                              isActive={item.isActive}
                            >
                              {item.icon && <item.icon />}
                              <span>{t(item.title)}</span>
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsiblePrimitive.Trigger>
                          <CollapsiblePrimitive.Content>
                            <SidebarMenuSub>
                              {item.items.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton asChild>
                                    <Link to={subItem.url || '#'}>
                                      {subItem.icon && <subItem.icon />}
                                      <span>{t(subItem.title)}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsiblePrimitive.Content>
                        </SidebarMenuItem>
                      </CollapsiblePrimitive.Root>
                    ) : (
                      // Simple item without sub-items
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          tooltip={t(item.title)}
                          asChild={!!item.url}
                          isActive={item.isActive}
                        >
                          {item.url ? (
                            <Link to={item.url}>
                              {item.icon && <item.icon />}
                              <span>{t(item.title)}</span>
                            </Link>
                          ) : (
                            <>
                              {item.icon && <item.icon />}
                              <span>{t(item.title)}</span>
                            </>
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <SidebarFooter>
        {/* Secondary Menu (Support, Feedback) */}
        <SidebarMenu>
          {secondaryMenu.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} asChild size="sm">
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <SidebarSeparator />

        {/* User Profile */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <span className="text-sm font-semibold">JD</span>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">John Doe</span>
                <span className="truncate text-xs text-muted-foreground">
                  Administrator
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}