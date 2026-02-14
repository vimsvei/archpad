"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AppDispatch } from "@/store/store"

export type DrawIoImportStatus = "idle" | "uploading" | "processing" | "completed" | "failed"

export type DrawIoImportLogItem = {
  key: string
  params?: Record<string, string | number | boolean | null | undefined>
  at: number
}

export type DrawIoImportJobView = {
  id: string
  status: "queued" | "running" | "completed" | "failed"
  progress: number
  fileName?: string
  createdAt: number
  startedAt?: number
  finishedAt?: number
  error?: string
  logs: DrawIoImportLogItem[]
  result?: {
    created: {
      applicationComponents: number
      applicationFunctions: number
      dataObjects: number
      systemSoftware: number
      componentFunctionLinks: number
      componentHierarchyLinks: number
      applicationFlows: number
    }
  }
}

export type DrawIoImportState = {
  status: DrawIoImportStatus
  progress: number
  uploadProgress: number
  jobId?: string
  file?: { name: string; size: number }
  logs: DrawIoImportLogItem[]
  error?: string
  result?: DrawIoImportJobView["result"]
}

const initialState: DrawIoImportState = {
  status: "idle",
  progress: 0,
  uploadProgress: 0,
  logs: [],
}

const slice = createSlice({
  name: "drawIoImport",
  initialState,
  reducers: {
    reset() {
      return initialState
    },
    setFile(state, action: PayloadAction<{ name: string; size: number } | undefined>) {
      state.file = action.payload
    },
    setStatus(state, action: PayloadAction<DrawIoImportStatus>) {
      state.status = action.payload
    },
    setJob(state, action: PayloadAction<{ jobId: string }>) {
      state.jobId = action.payload.jobId
    },
    setUploadProgress(state, action: PayloadAction<number>) {
      state.uploadProgress = Math.max(0, Math.min(1, Number(action.payload) || 0))
    },
    setProgress(state, action: PayloadAction<number>) {
      state.progress = Math.max(0, Math.min(100, Math.round(Number(action.payload) || 0)))
    },
    setLogs(state, action: PayloadAction<DrawIoImportLogItem[]>) {
      state.logs = action.payload
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload
    },
    setResult(state, action: PayloadAction<DrawIoImportState["result"] | undefined>) {
      state.result = action.payload
    },
  },
})

export const drawIoImportReducer = slice.reducer
export const drawIoImportActions = slice.actions

function computeUiProgress(uploadProgress: number, jobProgress: number): number {
  const uploadWeight = 25
  const processWeight = 75
  return Math.round(uploadWeight * uploadProgress + processWeight * (jobProgress / 100))
}

export function startDrawIoImport(file: File, options?: { clearBeforeImport?: boolean }) {
  return async (dispatch: AppDispatch) => {
    dispatch(drawIoImportActions.reset())
    dispatch(drawIoImportActions.setFile({ name: file.name, size: file.size }))
    dispatch(drawIoImportActions.setStatus("uploading"))
    dispatch(drawIoImportActions.setLogs([{ key: "repository.draw-io.client.selected", params: { fileName: file.name }, at: Date.now() }]))

    const form = new FormData()
    form.append("file", file, file.name)

    const jobId: string = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      const clear = options?.clearBeforeImport ? "1" : "0"
      xhr.open("POST", `/api/rest/arch-repo-service/import/draw-io/jobs?clear=${encodeURIComponent(clear)}`)
      xhr.responseType = "json"

      xhr.upload.onprogress = (evt) => {
        if (!evt.lengthComputable) return
        const frac = evt.total > 0 ? evt.loaded / evt.total : 0
        dispatch(drawIoImportActions.setUploadProgress(frac))
        dispatch(drawIoImportActions.setProgress(computeUiProgress(frac, 0)))
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

    dispatch(drawIoImportActions.setJob({ jobId }))
    dispatch(drawIoImportActions.setStatus("processing"))

    while (true) {
      const res = await fetch(`/api/rest/arch-repo-service/import/draw-io/jobs/${encodeURIComponent(jobId)}`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      })
      const json = (await res.json().catch(() => null)) as DrawIoImportJobView | null

      if (!res.ok || !json) {
        const msg = (json as any)?.message ?? `Job poll failed (${res.status})`
        dispatch(drawIoImportActions.setStatus("failed"))
        dispatch(drawIoImportActions.setError(msg))
        return
      }

      dispatch(drawIoImportActions.setLogs(json.logs ?? []))
      dispatch(drawIoImportActions.setResult(json.result))
      dispatch(drawIoImportActions.setProgress(computeUiProgress(1, json.progress ?? 0)))

      if (json.status === "completed") {
        dispatch(drawIoImportActions.setStatus("completed"))
        return
      }
      if (json.status === "failed") {
        dispatch(drawIoImportActions.setStatus("failed"))
        dispatch(drawIoImportActions.setError(json.error ?? "Import failed"))
        return
      }

      await new Promise((r) => setTimeout(r, 500))
    }
  }
}
