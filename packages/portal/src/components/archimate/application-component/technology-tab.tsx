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
import { SystemSoftwareTable } from "./system-software-table"
import { TechnologyNodesTable } from "./technology-nodes-table"
import { TechnologyNetworksTable } from "./technology-networks-table"

type TechnologyTabProps = {
  componentId: string
  componentName?: string
  onAddExistingSystemSoftware: () => void
  onAddExistingNode?: () => void
  onAddExistingNetwork?: () => void
}

export function TechnologyTab({
  componentId,
  componentName,
  onAddExistingSystemSoftware,
  onAddExistingNode,
  onAddExistingNetwork,
}: TechnologyTabProps) {
  const { t } = useTranslate()
  const [tab, setTab] = React.useState<string>("system-software")

  return (
    <div className="flex min-h-0 flex-1 flex-col h-full">
      <Tabs value={tab} onValueChange={setTab} className="flex min-h-0 flex-1 flex-col">
        <TabsList className="relative w-fit">
          <TabsTrigger value="system-software">
            {t("tab.technology.system-software", "Системное ПО")}
          </TabsTrigger>
          <TabsTrigger value="nodes">
            {t("tab.technology.nodes", "Узлы")}
          </TabsTrigger>
          <TabsTrigger value="networks">
            {t("tab.technology.networks", "Сети")}
          </TabsTrigger>
        </TabsList>

        <TabsContents className="flex min-h-0 flex-1 flex-col">
          <TabsContent value="system-software" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <SystemSoftwareTable
              componentId={componentId}
              componentName={componentName}
              onAddExisting={onAddExistingSystemSoftware}
            />
          </TabsContent>

          <TabsContent value="nodes" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <TechnologyNodesTable
              componentId={componentId}
              componentName={componentName}
              onAddExisting={onAddExistingNode}
            />
          </TabsContent>

          <TabsContent value="networks" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <TechnologyNetworksTable
              componentId={componentId}
              componentName={componentName}
              onAddExisting={onAddExistingNetwork}
            />
          </TabsContent>
        </TabsContents>
      </Tabs>
    </div>
  )
}
