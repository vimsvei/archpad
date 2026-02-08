import type { Metadata } from "next";
import "../../globals.css";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/layouts/private/app-sidebar";
import {Separator} from "@/components/ui/separator";
import {ModeToggle} from "@/components/toggles/mode-toggle";
import {LocaleToggle} from "@/components/toggles/locale-toggle";
import { PrivateBreadcrumbs } from "@/components/layouts/private/breadcrumbs";
import { DirectoriesPreloader } from "@/components/providers/directories-preloader";

export const metadata: Metadata = {
  title: "Archpad - The new Architecture Repository",
  description: "",
};

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DirectoriesPreloader />
      <AppSidebar />
      {/* Prevent document/body scrolling; allow only inner regions (e.g. tables) to scroll */}
      <SidebarInset className="min-w-0 overflow-hidden">
        <header className="flex justify-between h-16 pr-4 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <PrivateBreadcrumbs />
          </div>
          <div className="flex gap-2">
            <LocaleToggle/>
            <ModeToggle/>
          </div>
        </header>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 p-4 pt-0 overflow-hidden">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
