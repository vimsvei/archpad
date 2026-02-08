"use client"

import * as React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Card } from "@/components/ui/card"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContents,
  TabsContent,
} from "@/components/animate-ui/components/animate/tabs"
import type { RootState, AppDispatch } from "@/store/store"
import { updateADRField, selectADRFields } from "@/store/slices/solution-edit-slice"
import { MarkdownEditor } from "@/components/archimate/application-component/markdown-editor"

type ADRTabProps = {
  t: (key: string, fallback?: string) => string
  isSaving: boolean
}

export const ADRTab = React.memo(function ADRTab({ t, isSaving }: ADRTabProps) {
  const dispatch = useDispatch<AppDispatch>()
  const adrFields = useSelector(selectADRFields)
  const [tab, setTab] = React.useState<string>("context")

  const handleContextChange = React.useCallback(
    (value: string) => {
      dispatch(updateADRField({ field: "context", value }))
    },
    [dispatch]
  )

  const handleDecisionChange = React.useCallback(
    (value: string) => {
      dispatch(updateADRField({ field: "decision", value }))
    },
    [dispatch]
  )

  const handleConsequencesChange = React.useCallback(
    (value: string) => {
      dispatch(updateADRField({ field: "consequences", value }))
    },
    [dispatch]
  )

  const handleAlternativesChange = React.useCallback(
    (value: string) => {
      dispatch(updateADRField({ field: "alternatives", value }))
    },
    [dispatch]
  )

  return (
    <div className="min-h-0 flex-1 flex flex-col h-full">
      <Tabs value={tab} onValueChange={setTab} className="flex min-h-0 flex-1 flex-col">
        <TabsList className="relative w-fit">
          <TabsTrigger value="context">
            {t("solution.context")}
          </TabsTrigger>
          <TabsTrigger value="decision">
            {t("solution.decision")}
          </TabsTrigger>
          <TabsTrigger value="consequences">
            {t("solution.consequences")}
          </TabsTrigger>
          <TabsTrigger value="alternatives">
            {t("solution.alternatives")}
          </TabsTrigger>
        </TabsList>

        <TabsContents className="flex min-h-0 flex-1 flex-col">
          <TabsContent value="context" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <Card className="flex-1 flex flex-col p-6 min-h-0">
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 min-h-0">
                  <MarkdownEditor
                    key="context"
                    value={adrFields.context}
                    onChange={handleContextChange}
                    disabled={isSaving}
                    placeholder={t("solution.context.placeholder")}
                    showToolbar={true}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="decision" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <Card className="flex-1 flex flex-col p-6 min-h-0">
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 min-h-0">
                  <MarkdownEditor
                    key="decision"
                    value={adrFields.decision}
                    onChange={handleDecisionChange}
                    disabled={isSaving}
                    placeholder={t("solution.decision.placeholder")}
                    showToolbar={true}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="consequences" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <Card className="flex-1 flex flex-col p-6 min-h-0">
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 min-h-0">
                  <MarkdownEditor
                    key="consequences"
                    value={adrFields.consequences}
                    onChange={handleConsequencesChange}
                    disabled={isSaving}
                    placeholder={t("solution.consequences.placeholder")}
                    showToolbar={true}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="alternatives" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <Card className="flex-1 flex flex-col p-6 min-h-0">
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 min-h-0">
                  <MarkdownEditor
                    key="alternatives"
                    value={adrFields.alternatives}
                    onChange={handleAlternativesChange}
                    disabled={isSaving}
                    placeholder={t("solution.alternatives.placeholder")}
                    showToolbar={true}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>
        </TabsContents>
      </Tabs>
    </div>
  )
})