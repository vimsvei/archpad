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
import { ComponentsTable } from "./components-table"
import { FunctionsTable } from "./functions-table"
import { DataObjectsTable } from "./data-objects-table"

type ApplicationsTabProps = {
  solutionId: string
  solutionName?: string
  onAddExistingComponent: () => void
  onAddExistingFunction?: () => void
  onAddExistingDataObject?: () => void
  onCreateComponent?: () => void
  onCreateFunction?: () => void
  onCreateDataObject?: () => void
}

export function ApplicationsTab({
  solutionId,
  solutionName,
  onAddExistingComponent,
  onAddExistingFunction,
  onAddExistingDataObject,
  onCreateComponent,
  onCreateFunction,
  onCreateDataObject,
}: ApplicationsTabProps) {
  const { t } = useTranslate()
  const [tab, setTab] = React.useState<string>("components")

  return (
    <div className="flex min-h-0 flex-1 flex-col h-full">
      <Tabs value={tab} onValueChange={setTab} className="flex min-h-0 flex-1 flex-col">
        <TabsList className="relative w-fit">
          <TabsTrigger value="components">
            {t("tab.components")}
          </TabsTrigger>
          <TabsTrigger value="functions">
            {t("tab.functions")}
          </TabsTrigger>
          <TabsTrigger value="data-objects">
            {t("tab.data-objects")}
          </TabsTrigger>
        </TabsList>

        <TabsContents className="flex min-h-0 flex-1 flex-col">
          <TabsContent value="components" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <ComponentsTable
              solutionId={solutionId}
              solutionName={solutionName}
              onAddExisting={onAddExistingComponent}
              onCreate={onCreateComponent}
            />
          </TabsContent>

          <TabsContent value="functions" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <FunctionsTable
              solutionId={solutionId}
              solutionName={solutionName}
              onAddExisting={onAddExistingFunction}
              onCreate={onCreateFunction}
            />
          </TabsContent>

          <TabsContent value="data-objects" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <DataObjectsTable
              solutionId={solutionId}
              solutionName={solutionName}
              onAddExisting={onAddExistingDataObject}
              onCreate={onCreateDataObject}
            />
          </TabsContent>
        </TabsContents>
      </Tabs>
    </div>
  )
}