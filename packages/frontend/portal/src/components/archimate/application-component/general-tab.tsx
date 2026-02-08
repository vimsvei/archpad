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
import { useDirectoryItems } from "@/hooks/use-directory-items"
import type { RootState, AppDispatch } from "@/store/store"
import { updateBasicFields, updateStateId, selectBasicFields } from "@/store/slices/application-component-edit-slice"
import { MarkdownEditor } from "./markdown-editor"

type GeneralTabProps = {
  t: (key: string, fallback?: string) => string
  isSaving: boolean
}

export const GeneralTab = React.memo(function GeneralTab({ t, isSaving }: GeneralTabProps) {
  const dispatch = useDispatch<AppDispatch>()
  const basicFields = useSelector(selectBasicFields)
  const stateId = useSelector((state: RootState) => state.applicationComponentEdit.stateId)
  const { items: componentStates = [], isLoading: isLoadingStates } = useDirectoryItems("component-states")

  const draft: BaseObjectValues = basicFields

  const handleDraftChange = React.useCallback(
    (values: BaseObjectValues) => {
      dispatch(updateBasicFields(values))
    },
    [dispatch]
  )

  const handleStateChange = React.useCallback(
    (value: string) => {
      dispatch(updateStateId(value || null))
    },
    [dispatch]
  )

  const handleDescriptionChange = React.useCallback(
    (markdown: string) => {
      dispatch(updateBasicFields({ ...draft, description: markdown }))
    },
    [dispatch, draft]
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

        {/* State field */}
        <div className="grid gap-2 flex-shrink-0">
          <Label htmlFor="component-state">{t("item.state")}</Label>
          <Select
            value={stateId ?? ""}
            onValueChange={handleStateChange}
            disabled={isSaving || isLoadingStates}
          >
            <SelectTrigger id="component-state" className="w-full">
              <SelectValue placeholder={t("select.placeholder")} />
            </SelectTrigger>
            <SelectContent>
              {componentStates.map((state) => (
                <SelectItem key={state.id} value={state.id}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Description field - занимает все свободное пространство */}
        <div className="flex-1 flex flex-col min-h-0">
          <Label htmlFor="description">{t("item.description")}</Label>
          <div className="flex-1 min-h-0 mt-2">
            <MarkdownEditor
              key={basicFields.code}
              value={draft.description}
              onChange={handleDescriptionChange}
              disabled={isSaving}
              placeholder={t("description.placeholder")}
            />
          </div>
        </div>
      </Card>
    </div>
  )
})
