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
import { TechnologyNodesTable } from "./technology-nodes-table"
import { TechnologyNetworksTable } from "./technology-networks-table"

type TechnologyTabProps = {
  solutionId: string
  solutionName?: string
  onAddExistingNode?: () => void
  onAddExistingNetwork?: () => void
}

export function TechnologyTab({
  solutionId,
  solutionName,
  onAddExistingNode,
  onAddExistingNetwork,
}: TechnologyTabProps) {
  const { t } = useTranslate()
  const [tab, setTab] = React.useState<string>("nodes")

  return (
    <div className="flex min-h-0 flex-1 flex-col h-full">
      <Tabs value={tab} onValueChange={setTab} className="flex min-h-0 flex-1 flex-col">
        <TabsList className="relative w-fit">
          <TabsTrigger value="nodes">
            {t("tab.technology.nodes")}
          </TabsTrigger>
          <TabsTrigger value="networks">
            {t("tab.technology.networks")}
          </TabsTrigger>
        </TabsList>

        <TabsContents className="flex min-h-0 flex-1 flex-col">
          <TabsContent value="nodes" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <TechnologyNodesTable
              solutionId={solutionId}
              solutionName={solutionName}
              onAddExisting={onAddExistingNode}
            />
          </TabsContent>

          <TabsContent value="networks" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <TechnologyNetworksTable
              solutionId={solutionId}
              solutionName={solutionName}
              onAddExisting={onAddExistingNetwork}
            />
          </TabsContent>
        </TabsContents>
      </Tabs>
    </div>
  )
}