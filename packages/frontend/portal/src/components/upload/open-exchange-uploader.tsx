"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { startOpenExchangeImport } from "@/store/slices/open-exchange-import-slice"
import { cn } from "@/lib/utils"

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B"
  const units = ["B", "KB", "MB", "GB"]
  let v = bytes
  let i = 0
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024
    i++
  }
  return `${v.toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

export function OpenExchangeUploader() {
  const { t } = useTranslate()
  const dispatch = useAppDispatch()
  const state = useAppSelector((s) => s.openExchangeImport)

  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [file, setFile] = React.useState<File | null>(null)
  const [clearBeforeImport, setClearBeforeImport] = React.useState(false)

  const canStart = Boolean(file) && (state?.status === "idle" || state?.status === "completed" || state?.status === "failed")
  const isRunning = state?.status === "uploading" || state?.status === "processing"

  function pickFile(f: File | null) {
    if (!f) return
    setFile(f)
  }

  async function onStart() {
    if (!file) return
    dispatch(startOpenExchangeImport(file, { clearBeforeImport }))
  }

  return (
    <div className="flex flex-1 flex-col gap-4 min-h-0">
      <Card className="p-4 shrink-0">
        <div className="flex flex-col gap-3">
          <div className="text-sm text-muted-foreground">{t("upload.open-exchange.subtitle")}</div>

          <div
            className={cn(
              "rounded-lg border border-dashed p-6 text-center",
              isRunning ? "opacity-60 pointer-events-none" : "hover:bg-muted/50"
            )}
            onDragOver={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            onDrop={(e) => {
              e.preventDefault()
              e.stopPropagation()
              const f = e.dataTransfer.files?.[0]
              if (f) pickFile(f)
            }}
            onClick={() => inputRef.current?.click()}
          >
            <div className="font-medium">{t("upload.open-exchange.dropzone.title")}</div>
            <div className="text-sm text-muted-foreground">{t("upload.open-exchange.dropzone.hint")}</div>
            <input
              ref={inputRef}
              type="file"
              accept=".xml,text/xml,application/xml"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null
                if (f) pickFile(f)
              }}
            />
          </div>

          {file ? (
            <div className="flex items-center justify-between gap-3 rounded-md border p-3">
              <div className="min-w-0">
                <div className="truncate font-medium">{file.name}</div>
                <div className="text-xs text-muted-foreground">{formatBytes(file.size)}</div>
              </div>
              <Button variant="secondary" onClick={() => setFile(null)} disabled={isRunning}>
                {t("action.remove")}
              </Button>
            </div>
          ) : null}

          <label className={cn("flex items-center gap-2 text-sm", isRunning ? "opacity-60" : "")}>
            <Checkbox
              checked={clearBeforeImport}
              disabled={isRunning}
              onCheckedChange={(v) => setClearBeforeImport(Boolean(v))}
            />
            <span>{t("upload.open-exchange.clear-before.label")}</span>
          </label>

          <div className="flex items-center gap-2">
            <Button onClick={onStart} disabled={!canStart}>
              {t("upload.open-exchange.action.start")}
            </Button>
            {state?.jobId ? (
              <div className="text-xs text-muted-foreground">
                {t("upload.open-exchange.job-id")}: <span className="font-mono">{state.jobId}</span>
              </div>
            ) : null}
          </div>

          {state?.status !== "idle" ? (
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center justify-between text-sm">
                <div className="font-medium">{t("repository.open-exchange.progress")}</div>
                <div className="text-muted-foreground">{Math.round(state.progress ?? 0)}%</div>
              </div>
              <Progress value={state.progress ?? 0} />
            </div>
          ) : null}
        </div>
      </Card>

      <Card className="p-4 flex flex-col overflow-hidden min-h-[200px] max-h-[min(450px,50vh)]">
        <div className="flex items-center justify-between shrink-0">
          <div className="font-medium">{t("upload.open-exchange.logs.title")}</div>
          {state?.logs?.length ? (
            <div className="text-xs text-muted-foreground">{t("upload.open-exchange.logs.count", { count: state.logs.length })}</div>
          ) : null}
        </div>

        {state?.error ? (
          <div className="mt-3 p-3 rounded-md bg-destructive/10 text-destructive text-sm break-words shrink-0">
            {state.error}
          </div>
        ) : null}

        <div className="mt-3 flex-1 min-h-0 space-y-2 overflow-y-auto pr-1 [scrollbar-gutter:stable]">
          {state?.logs?.length ? (
            state.logs.slice(-50).map((log: any) => (
              <div key={`${log.at}-${log.key}`} className="text-sm">
                <span className="text-muted-foreground font-mono mr-2">
                  {new Date(log.at).toLocaleTimeString()}
                </span>
                <span>{t(log.key, log.params as any)}</span>
              </div>
            ))
          ) : (
            <div className="text-sm text-muted-foreground">{t("upload.open-exchange.logs.empty")}</div>
          )}
        </div>

        {state?.result?.created ? (
          <div className="mt-4 rounded-md bg-muted p-3 text-sm">
            <div className="font-medium">{t("upload.open-exchange.summary.title")}</div>
            <div className="mt-1 text-muted-foreground space-y-0.5">
              <div>
                {t("upload.open-exchange.summary.line", {
                  components: state.result.created.applicationComponents,
                  functions: state.result.created.applicationFunctions,
                  links: state.result.created.componentFunctionLinks,
                  actorRoleLinks: state.result.created.componentActorRoleLinks ?? 0,
                  flows: state.result.created.applicationFlows,
                })}
              </div>
              {(state.result.created.businessActors !== undefined ||
                state.result.created.systemSoftware !== undefined) && (
                <div>
                  {t("upload.open-exchange.summary.cross-layer", {
                    businessActors: state.result.created.businessActors ?? 0,
                    businessRoles: state.result.created.businessRoles ?? 0,
                    systemSoftware: state.result.created.systemSoftware ?? 0,
                    communicationNetworks: state.result.created.communicationNetworks ?? 0,
                    technologyNodes: state.result.created.technologyNodes ?? 0,
                  })}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </Card>
    </div>
  )
}


