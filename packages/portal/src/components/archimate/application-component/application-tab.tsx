"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContents,
  TabsContent,
} from "@/components/animate-ui/components/animate/tabs"
import { FunctionsTable } from "./functions-table"
import { DataObjectsTable } from "./data-objects-table"
import { InterfacesTable } from "./interfaces-table"
import { EventsTable } from "./events-table"
import { HierarchyTable } from "./hierarchy-table"

type ApplicationTabProps = {
  componentId: string
  componentName?: string
  onAddExistingParent: () => void
  onAddExistingChild: () => void
  onAddExistingDataObjects: () => void
  onAddExistingFunctions?: () => void
  onAddExistingInterfaces?: () => void
  onAddExistingEvents?: () => void
  onCreateDataObjects?: () => void
  onCreateFunctions?: () => void
  onCreateInterfaces?: () => void
  onCreateEvents?: () => void
}

export function ApplicationTab({
  componentId,
  componentName,
  onAddExistingParent,
  onAddExistingChild,
  onAddExistingDataObjects,
  onAddExistingFunctions,
  onAddExistingInterfaces,
  onAddExistingEvents,
  onCreateDataObjects,
  onCreateFunctions,
  onCreateInterfaces,
  onCreateEvents,
}: ApplicationTabProps) {
  const { t } = useTranslate()
  const [tab, setTab] = React.useState<string>("functions")

  return (
    <div className="flex min-h-0 flex-1 flex-col h-full">
      <Tabs value={tab} onValueChange={setTab} className="flex min-h-0 flex-1 flex-col">
        <TabsList className="relative w-fit">
          <TabsTrigger value="functions">
            {t("tab.functions")}
          </TabsTrigger>
          <TabsTrigger value="data-objects">
            {t("tab.data-objects")}
          </TabsTrigger>
          <TabsTrigger value="interfaces">
            {t("tab.interfaces")}
          </TabsTrigger>
          <TabsTrigger value="events">
            {t("tab.events")}
          </TabsTrigger>
          <TabsTrigger value="hierarchy">
            {t("tab.hierarchy")}
          </TabsTrigger>
        </TabsList>

        <TabsContents className="flex min-h-0 flex-1 flex-col">
          <TabsContent value="functions" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <FunctionsTable
              componentId={componentId}
              componentName={componentName}
              onAddExisting={onAddExistingFunctions}
              onCreate={onCreateFunctions}
            />
          </TabsContent>

          <TabsContent value="data-objects" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <DataObjectsTable
              componentId={componentId}
              componentName={componentName}
              onAddExisting={onAddExistingDataObjects}
              onCreate={onCreateDataObjects}
            />
          </TabsContent>

          <TabsContent value="interfaces" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <InterfacesTable
              componentId={componentId}
              componentName={componentName}
              onAddExisting={onAddExistingInterfaces}
              onCreate={onCreateInterfaces}
            />
          </TabsContent>

          <TabsContent value="events" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <EventsTable
              componentId={componentId}
              componentName={componentName}
              onAddExisting={onAddExistingEvents}
              onCreate={onCreateEvents}
            />
          </TabsContent>

          <TabsContent value="hierarchy" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <HierarchyTable
              componentId={componentId}
              onAddExistingParent={onAddExistingParent}
              onAddExistingChild={onAddExistingChild}
            />
          </TabsContent>
        </TabsContents>
      </Tabs>
    </div>
  )
}
