import { useState } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/app/components/ui/sidebar';
import { AppSidebar } from '@/app/components/app-sidebar';
import { DataTable } from '@/app/components/data-table';
import { ComponentForm } from '@/app/components/component-form';
import { ComponentDetail } from '@/app/components/component-detail';
import { ComponentDetailV2 } from '@/app/components/component-detail-v2';
import { ComponentDetailV3 } from '@/app/components/component-detail-v3';
import { ComponentDetailNoStakeholders } from '@/app/components/component-detail-no-stakeholders';
import { Separator } from '@/app/components/ui/separator';
import { mockComponents, getComponentById } from '@/lib/mock-data';
import type { ApplicationComponent } from '@/@types/application-component';

type DetailVersion = 'v1' | 'v2' | 'v3' | 'no-stakeholders';

export function ComponentsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [detailVersion, setDetailVersion] = useState<DetailVersion>('v3');

  const selectedComponent = selectedComponentId ? getComponentById(selectedComponentId) : null;

  const handleRowClick = (componentId: string) => {
    setSelectedComponentId(componentId);
  };

  const handleBackToList = () => {
    setSelectedComponentId(null);
  };

  const handleSaveComponent = (component: ApplicationComponent) => {
    console.log('Saving component:', component);
    // In a real app, this would call an API
  };

  // Render the appropriate detail component based on version
  const renderDetailView = () => {
    if (!selectedComponent) return null;

    const props = {
      component: selectedComponent,
      onBack: handleBackToList,
      onSave: handleSaveComponent,
    };

    switch (detailVersion) {
      case 'v2':
        return <ComponentDetailV2 {...props} />;
      case 'v3':
        return <ComponentDetailV3 {...props} />;
      case 'no-stakeholders':
        return <ComponentDetailNoStakeholders {...props} />;
      default:
        return <ComponentDetail {...props} />;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {selectedComponent ? (
          // Component Detail View
          renderDetailView()
        ) : (
          // List View
          <>
            {/* Breadcrumb/Header Bar */}
            <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Architecture</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-muted-foreground">Application</span>
                <span className="text-muted-foreground">/</span>
                <span className="font-semibold">Components</span>
              </div>
              
              {/* Version Selector */}
              <div className="ml-auto flex items-center gap-1 border border-border rounded-lg p-1">
                <button
                  onClick={() => setDetailVersion('v1')}
                  className={`px-3 py-1 text-xs rounded transition-colors ${
                    detailVersion === 'v1'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Original
                </button>
                <button
                  onClick={() => setDetailVersion('v2')}
                  className={`px-3 py-1 text-xs rounded transition-colors ${
                    detailVersion === 'v2'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Grouped
                </button>
                <button
                  onClick={() => setDetailVersion('v3')}
                  className={`px-3 py-1 text-xs rounded transition-colors ${
                    detailVersion === 'v3'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Minimal
                </button>
                <button
                  onClick={() => setDetailVersion('no-stakeholders')}
                  className={`px-3 py-1 text-xs rounded transition-colors ${
                    detailVersion === 'no-stakeholders'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  No Stakeholders
                </button>
              </div>
            </header>

            {/* Main Content */}
            <DataTable
              onCreateNew={() => setDrawerOpen(true)}
              onRowClick={handleRowClick}
            />
          </>
        )}
      </SidebarInset>

      {/* Right Drawer */}
      <ComponentForm isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </SidebarProvider>
  );
}