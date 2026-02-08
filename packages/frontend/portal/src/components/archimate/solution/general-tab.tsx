"use client"

import * as React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BaseObjectItem } from "@/components/shared/base-object/base-object-item"
import type { BaseObjectValues } from "@/components/shared/base-object/base-object-types"
import type { RootState, AppDispatch } from "@/store/store"
import { 
  updateBasicFields, 
  selectBasicFields,
  updateDecisionStatus,
  updateImplementationStatus,
} from "@/store/slices/solution-edit-slice"
import { MarkdownEditor } from "@/components/archimate/application-component/markdown-editor"

type GeneralTabProps = {
  t: (key: string, fallback?: string) => string
  isSaving: boolean
}

export const GeneralTab = React.memo(function GeneralTab({ t, isSaving }: GeneralTabProps) {
  const dispatch = useDispatch<AppDispatch>()
  const basicFields = useSelector(selectBasicFields)
  const editState = useSelector((state: RootState) => state.solutionEdit)

  const draft: BaseObjectValues = basicFields

  const handleDraftChange = React.useCallback(
    (values: BaseObjectValues) => {
      dispatch(updateBasicFields(values))
    },
    [dispatch]
  )

  const handleDescriptionChange = React.useCallback(
    (markdown: string) => {
      dispatch(updateBasicFields({ ...draft, description: markdown }))
    },
    [dispatch, draft]
  )

  const handleDecisionStatusChange = React.useCallback(
    (value: string) => {
      dispatch(updateDecisionStatus(value || null))
    },
    [dispatch]
  )

  const handleImplementationStatusChange = React.useCallback(
    (value: string) => {
      dispatch(updateImplementationStatus(value || null))
    },
    [dispatch]
  )

  return (
    <div className="min-h-0 flex-1 flex flex-col h-full">
      <Card className="flex-1 flex flex-col gap-4 p-6 min-h-0">
        <BaseObjectItem
          values={draft}
          onChange={handleDraftChange}
          submitLabel={t("action.save")}
          hideActions
          hideDescription
          disabled={isSaving}
          onSubmit={async () => {
            // Save is handled globally
          }}
        />

        {/* Status fields */}
        <div className="grid grid-cols-2 gap-4 flex-shrink-0">
          <div className="grid gap-2">
            <Label htmlFor="decision-status">{t("solution.decision-status")}</Label>
            <Select
              value={editState.decisionStatus ?? ""}
              onValueChange={handleDecisionStatusChange}
              disabled={isSaving}
            >
              <SelectTrigger id="decision-status" className="w-full">
                <SelectValue placeholder={t("select.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solution.life-cycle.proposed">{t("solution.life-cycle.proposed")}</SelectItem>
                <SelectItem value="solution.life-cycle.accepted">{t("solution.life-cycle.accepted")}</SelectItem>
                <SelectItem value="solution.life-cycle.superseded">{t("solution.life-cycle.superseded")}</SelectItem>
                <SelectItem value="solution.life-cycle.deprecated">{t("solution.life-cycle.deprecated")}</SelectItem>
                <SelectItem value="solution.life-cycle.rejected">{t("solution.life-cycle.rejected")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="implementation-status">{t("solution.implementation-status")}</Label>
            <Select
              value={editState.implementationStatus ?? ""}
              onValueChange={handleImplementationStatusChange}
              disabled={isSaving}
            >
              <SelectTrigger id="implementation-status" className="w-full">
                <SelectValue placeholder={t("select.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solution.not-started">{t("solution.not-started")}</SelectItem>
                <SelectItem value="solution.in-progres">{t("solution.in-progres")}</SelectItem>
                <SelectItem value="solution.implemented">{t("solution.implemented")}</SelectItem>
                <SelectItem value="solution.implementation">{t("solution.implementation")}</SelectItem>
                <SelectItem value="solution.rolled_back">{t("solution.rolled_back")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Description field */}
        <div className="flex-1 flex flex-col min-h-0">
          <Label htmlFor="description">{t("item.description")}</Label>
          <div className="flex-1 min-h-0 mt-2">
            <MarkdownEditor
              key={basicFields.code}
              value={draft.description}
              onChange={handleDescriptionChange}
              disabled={isSaving}
              placeholder={t("description.placeholder")}
              showToolbar={true}
            />
          </div>
        </div>
      </Card>
    </div>
  )
})