"use client"

import * as React from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ArchimateObjectIcon } from "@/components/shared/archimate/archimate-object-icon"

export type DetailHeaderProps = {
  t: (key: string) => string
  name: string
  onNameChange: (value: string) => void
  stateName?: string
  stateColor?: string
  onBack: () => void
  onSave: () => void
  isSaving: boolean
  isDirty: boolean
  isDraftValid: boolean
  placeholder?: string
  /** Icon type for the entity, e.g. "application-component" */
  iconType?: "application-component"
}

/**
 * Reusable header for detail/edit pages: back button, icon, editable name, state badge, save.
 * Name is shown as a label by default; click to switch to inline edit.
 */
export function DetailHeader({
  t,
  name,
  onNameChange,
  stateName,
  stateColor,
  onBack,
  onSave,
  isSaving,
  isDirty,
  isDraftValid,
  placeholder,
  iconType = "application-component",
}: DetailHeaderProps) {
  const [isEditing, setIsEditing] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing])

  const handleLabelClick = () => {
    if (!isSaving) setIsEditing(true)
  }

  const handleBlur = () => {
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsEditing(false)
    }
  }

  return (
    <div className="flex items-center gap-3 mb-8">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-foreground hover:text-foreground"
          >
            <ArrowLeft />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t("action.back")}</TooltipContent>
      </Tooltip>

      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-12 p-2">
          <ArchimateObjectIcon type={iconType} className="text-primary shrink-0" size={24} />
        </div>
        {isEditing ? (
          <Input
            ref={inputRef}
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="text-2xl font-semibold border border-input rounded-md px-3 py-2 h-auto"
            placeholder={placeholder ?? t("application.component")}
          />
        ) : (
          <button
            type="button"
            onClick={handleLabelClick}
            disabled={isSaving}
            className="text-3xl font-semibold text-foreground text-left hover:text-primary/90 transition-colors truncate disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {(name || placeholder || t("application.component"))}
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {stateName && stateColor && (
          <Badge
            style={{
              backgroundColor: stateColor,
              color: "#ffffff",
            }}
          >
            {stateName}
          </Badge>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              onClick={onSave}
              disabled={!isDirty || !isDraftValid || isSaving}
            >
              <Save className="size-4 mr-2" />
              {t("action.save")}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t("action.save")}</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}
