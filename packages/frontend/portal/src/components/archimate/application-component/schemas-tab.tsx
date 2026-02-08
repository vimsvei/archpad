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
import { ApplicationSchemaView } from "./application-schema-view"
import { TechnologySchemaView } from "./technology-schema-view"

type SchemasTabProps = {
  componentId: string
  componentName?: string
}

export function SchemasTab({
  componentId,
  componentName,
}: SchemasTabProps) {
  const { t } = useTranslate()
  const [tab, setTab] = React.useState<string>("application")

  return (
    <div className="flex min-h-0 flex-1 flex-col h-full">
      <Tabs value={tab} onValueChange={setTab} className="flex min-h-0 flex-1 flex-col">
        <TabsList className="relative w-fit">
          <TabsTrigger value="application">
            {t("tab.schemas.application")}
          </TabsTrigger>
          <TabsTrigger value="technology">
            {t("tab.schemas.technology")}
          </TabsTrigger>
        </TabsList>

        <TabsContents className="flex min-h-0 flex-1 flex-col">
          <TabsContent value="application" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <ApplicationSchemaView
              componentId={componentId}
              componentName={componentName}
            />
          </TabsContent>

          <TabsContent value="technology" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <TechnologySchemaView
              componentId={componentId}
              componentName={componentName}
            />
          </TabsContent>
        </TabsContents>
      </Tabs>
    </div>
  )
}

