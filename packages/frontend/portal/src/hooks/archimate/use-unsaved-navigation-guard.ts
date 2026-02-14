"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

type UseUnsavedNavigationGuardProps = {
  isDirty: boolean
  onBackNavigation: () => void
  onSave: () => Promise<boolean>
}

export function useUnsavedNavigationGuard({
  isDirty,
  onBackNavigation,
  onSave,
}: UseUnsavedNavigationGuardProps) {
  const router = useRouter()

  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false)
  const [pendingNavigation, setPendingNavigation] = React.useState<(() => void) | null>(null)

  const handleBack = React.useCallback(() => {
    if (isDirty) {
      setPendingNavigation(() => onBackNavigation)
      setConfirmDialogOpen(true)
      return
    }

    onBackNavigation()
  }, [isDirty, onBackNavigation])

  const handleDialogCancel = React.useCallback(() => {
    setConfirmDialogOpen(false)
    setPendingNavigation(null)
  }, [])

  const handleDialogSave = React.useCallback(async () => {
    try {
      const isSaved = await onSave()
      if (!isSaved) {
        return
      }

      if (pendingNavigation) {
        setConfirmDialogOpen(false)
        pendingNavigation()
        setPendingNavigation(null)
      }
    } catch {
      // keep confirmation dialog open on save error
    }
  }, [onSave, pendingNavigation])

  const handleLinkClick = React.useCallback(
    (event: MouseEvent) => {
      if (!isDirty || confirmDialogOpen) return

      const target = event.target as HTMLElement
      if (target.nodeName !== "A" && !target.closest) return

      const link = target.closest?.("a[href]") as HTMLAnchorElement | null
      if (!link) return

      const href = link.getAttribute("href")
      if (!href) return

      if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) {
        return
      }

      const currentPath = window.location.pathname
      if (href === currentPath || href === `${currentPath}/`) {
        return
      }

      event.preventDefault()
      event.stopPropagation()
      setPendingNavigation(() => () => router.push(href))
      setConfirmDialogOpen(true)
    },
    [confirmDialogOpen, isDirty, router]
  )

  React.useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty) {
        return
      }

      event.preventDefault()
      event.returnValue = ""
      return ""
    }

    const handlePopState = () => {
      if (!isDirty || confirmDialogOpen) {
        return
      }

      window.history.pushState(null, "", window.location.href)
      setPendingNavigation(() => () => window.history.back())
      setConfirmDialogOpen(true)
    }

    document.addEventListener("click", handleLinkClick, true)
    window.addEventListener("beforeunload", handleBeforeUnload)
    window.addEventListener("popstate", handlePopState)

    return () => {
      document.removeEventListener("click", handleLinkClick, true)
      window.removeEventListener("beforeunload", handleBeforeUnload)
      window.removeEventListener("popstate", handlePopState)
    }
  }, [confirmDialogOpen, handleLinkClick, isDirty])

  return {
    confirmDialogOpen,
    setConfirmDialogOpen,
    handleBack,
    handleDialogCancel,
    handleDialogSave,
  }
}
