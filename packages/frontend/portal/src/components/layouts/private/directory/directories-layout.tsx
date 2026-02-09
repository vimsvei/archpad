"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { NotebookText } from "lucide-react"
import { useTranslate } from "@tolgee/react"
import { cn } from "@/lib/utils"
import Link from "next/link"

import type { DirectorySlug } from "@/@types/directories"
import { getDirectoryMeta, listKnownDirectorySlugs } from "@/components/directories/directory-meta"
import { Card } from "@/components/ui/card"

type DirectoriesLayoutProps = {
  children: React.ReactNode
  currentDirectorySlug?: DirectorySlug | null
}

export function DirectoriesLayout({ children, currentDirectorySlug }: DirectoriesLayoutProps) {
  const { t } = useTranslate()
  const pathname = usePathname()
  const slugs = listKnownDirectorySlugs()

  // Extract directorySlug from pathname if not provided
  const activeSlug = currentDirectorySlug ?? (() => {
    const match = pathname?.match(/\/directories\/([^/]+)/)
    return match ? (match[1] as DirectorySlug) : null
  })()

  return (
    <div className="flex min-h-0 min-w-0 flex-1 gap-4">
      {/* Left sidebar - 1/4 width */}
      <div className="flex w-1/4 min-w-[200px] flex-col">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold">{t("directories.title")}</h1>
        </div>
        <Card className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="p-3 space-y-1">
              {slugs.map((slug) => {
                const meta = getDirectoryMeta(slug)
                const isSelected = activeSlug === slug
                const href = `/directories/${slug}`
                return (
                  <Link
                    key={slug}
                    href={href}
                    className={cn(
                      "flex w-full items-center rounded-md px-4 py-3 text-sm text-left transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      isSelected 
                        ? "bg-primary text-primary-foreground font-medium shadow-sm" 
                        : "text-foreground"
                    )}
                  >
                    <NotebookText className="mr-2 shrink-0 size-4 text-green-600 dark:text-green-500" />
                    <span className="truncate">{t(meta.titleKey)}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </Card>
      </div>

      {/* Right content - 3/4 width */}
      <div className="flex min-w-0 min-h-0 flex-1 flex-col h-full">
        {children}
      </div>
    </div>
  )
}
