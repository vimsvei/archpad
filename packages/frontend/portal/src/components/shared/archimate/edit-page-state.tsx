"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

type EditPageStateBaseProps = {
  title: string
  backLabel: string
  onBack: () => void
}

type EditPageLoadingProps = EditPageStateBaseProps & {
  loadingLabel: string
}

type EditPageErrorProps = EditPageStateBaseProps & {
  errorTitle: string
  errorMessage: string
  retryLabel: string
  onRetry: () => void
}

function EditPageHeader({ title, backLabel, onBack }: EditPageStateBaseProps) {
  return (
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label={backLabel}
            onClick={onBack}
          >
            <ArrowLeft />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">{backLabel}</TooltipContent>
      </Tooltip>
      <h1 className="text-2xl font-semibold">{title}</h1>
    </div>
  )
}

export function EditPageLoadingState(props: EditPageLoadingProps) {
  return (
    <div className="flex flex-col gap-4">
      <EditPageHeader title={props.title} backLabel={props.backLabel} onBack={props.onBack} />
      <Card className="p-10">
        <div className="flex items-center justify-center gap-2">
          <Spinner className="h-6 w-6" />
          <span className="text-muted-foreground">{props.loadingLabel}</span>
        </div>
      </Card>
    </div>
  )
}

export function EditPageErrorState(props: EditPageErrorProps) {
  return (
    <div className="flex flex-col gap-4">
      <EditPageHeader title={props.title} backLabel={props.backLabel} onBack={props.onBack} />
      <Card className="p-6">
        <div className="text-destructive font-medium mb-2">{props.errorTitle}</div>
        <div className="text-muted-foreground">{props.errorMessage}</div>
        <Button variant="outline" className="mt-4" onClick={props.onRetry}>
          {props.retryLabel}
        </Button>
      </Card>
    </div>
  )
}
