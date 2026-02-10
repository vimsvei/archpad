"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AppDispatch, RootState } from "@/store/store"

export type OpenExchangeImportStatus = "idle" | "uploading" | "processing" | "completed" | "failed"

export type OpenExchangeImportLogItem = {
  key: string
  params?: Record<string, string | number | boolean | null | undefined>
  at: number
}

export type OpenExchangeImportJobView = {
  id: string
  status: "queued" | "running" | "completed" | "failed"
  progress: number
  fileName?: string
  createdAt: number
  startedAt?: number
  finishedAt?: number
  error?: string
  logs: OpenExchangeImportLogItem[]
  result?: {
    created: {
      applicationComponents: number
      applicationFunctions: number
      applicationInterfaces: number
      applicationEvents: number
      dataObjects: number
      applicationFlows: number
      componentFunctionLinks: number
      businessActors?: number
      businessRoles?: number
      systemSoftware?: number
      communicationNetworks?: number
      technologyNodes?: number
    }
  }
}

export type OpenExchangeImportState = {
  status: OpenExchangeImportStatus
  progress: number // 0..100 (UI)
  uploadProgress: number // 0..1
  jobId?: string
  file?: { name: string; size: number }
  logs: OpenExchangeImportLogItem[]
  error?: string
  result?: OpenExchangeImportJobView["result"]
}

const initialState: OpenExchangeImportState = {
  status: "idle",
  progress: 0,
  uploadProgress: 0,
  logs: [],
}

const slice = createSlice({
  name: "openExchangeImport",
  initialState,
  reducers: {
    reset() {
      return initialState
    },
    setFile(state, action: PayloadAction<{ name: string; size: number } | undefined>) {
      state.file = action.payload
    },
    setStatus(state, action: PayloadAction<OpenExchangeImportStatus>) {
      state.status = action.payload
    },
    setJob(state, action: PayloadAction<{ jobId: string }>) {
      state.jobId = action.payload.jobId
    },
    setUploadProgress(state, action: PayloadAction<number>) {
      const v = Math.max(0, Math.min(1, Number(action.payload) || 0))
      state.uploadProgress = v
    },
    setProgress(state, action: PayloadAction<number>) {
      const v = Math.max(0, Math.min(100, Math.round(Number(action.payload) || 0)))
      state.progress = v
    },
    setLogs(state, action: PayloadAction<OpenExchangeImportLogItem[]>) {
      state.logs = action.payload
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload
    },
    setResult(state, action: PayloadAction<OpenExchangeImportState["result"] | undefined>) {
      state.result = action.payload
    },
  },
})

export const openExchangeImportReducer = slice.reducer
export const openExchangeImportActions = slice.actions

function computeUiProgress(uploadProgress: number, jobProgress: number): number {
  // Show repository as first 25%, then server job as remaining 75%.
  const uploadWeight = 25
  const processWeight = 75
  const u = Math.max(0, Math.min(1, uploadProgress))
  const p = Math.max(0, Math.min(100, jobProgress))
  return Math.round(uploadWeight * u + processWeight * (p / 100))
}

export function startOpenExchangeImport(file: File, options?: { clearBeforeImport?: boolean }) {
  return async (dispatch: AppDispatch, _getState: () => RootState) => {
    dispatch(openExchangeImportActions.reset())
    dispatch(openExchangeImportActions.setFile({ name: file.name, size: file.size }))
    dispatch(openExchangeImportActions.setStatus("uploading"))
    dispatch(openExchangeImportActions.setLogs([{ key: "repository.open-exchange.client.selected", params: { fileName: file.name }, at: Date.now() }]))

    const form = new FormData()
    form.append("file", file, file.name)

    const jobId: string = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      const clear = options?.clearBeforeImport ? "1" : "0"
      xhr.open("POST", `/api/rest/arch-repo-service/import/open-exchange/jobs?clear=${encodeURIComponent(clear)}`)
      xhr.responseType = "json"

      xhr.upload.onprogress = (evt) => {
        if (!evt.lengthComputable) return
        const frac = evt.total > 0 ? evt.loaded / evt.total : 0
        dispatch(openExchangeImportActions.setUploadProgress(frac))
        dispatch(openExchangeImportActions.setProgress(computeUiProgress(frac, 0)))
      }

      xhr.onload = () => {
        const status = xhr.status
        const json = (xhr.response ?? null) as any
        if (status >= 200 && status < 300 && json?.jobId) {
          resolve(String(json.jobId))
          return
        }
        reject(new Error(json?.message ?? json?.error ?? `Upload failed (${status})`))
      }

      xhr.onerror = () => reject(new Error("Network error"))
      xhr.onabort = () => reject(new Error("Upload aborted"))
      xhr.send(form)
    })

    dispatch(openExchangeImportActions.setJob({ jobId }))
    dispatch(openExchangeImportActions.setStatus("processing"))
    dispatch(openExchangeImportActions.setLogs([{ key: "repository.open-exchange.client.job-created", params: { jobId }, at: Date.now() }]))

    // Poll job status
    while (true) {
      const res = await fetch(`/api/rest/arch-repo-service/import/open-exchange/jobs/${encodeURIComponent(jobId)}`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      })
      const json = (await res.json().catch(() => null)) as OpenExchangeImportJobView | null

      if (!res.ok || !json) {
        const msg = (json as any)?.message ?? (json as any)?.error ?? `Job poll failed (${res.status})`
        dispatch(openExchangeImportActions.setStatus("failed"))
        dispatch(openExchangeImportActions.setError(msg))
        dispatch(openExchangeImportActions.setLogs([{ key: "repository.open-exchange.client.poll-failed", params: { message: msg }, at: Date.now() }]))
        return
      }

      dispatch(openExchangeImportActions.setLogs(json.logs ?? []))
      dispatch(openExchangeImportActions.setResult(json.result))
      dispatch(openExchangeImportActions.setProgress(computeUiProgress(1, json.progress ?? 0)))

      if (json.status === "completed") {
        dispatch(openExchangeImportActions.setStatus("completed"))
        return
      }
      if (json.status === "failed") {
        dispatch(openExchangeImportActions.setStatus("failed"))
        dispatch(openExchangeImportActions.setError(json.error ?? "Import failed"))
        return
      }

      await new Promise((r) => setTimeout(r, 500))
    }
  }
}


