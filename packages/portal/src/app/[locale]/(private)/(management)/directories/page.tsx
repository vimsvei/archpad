"use client"

import { useTranslate } from "@tolgee/react"
import { listKnownDirectorySlugs } from "@/components/directories/directory-meta"
import { DirectoriesLayout } from "@/components/layouts/private/directory/directories-layout"
import { DirectoryListPage } from "@/components/directories/directory-list-page"

export default function DirectoriesIndexPage() {
  const { t } = useTranslate()
  const slugs = listKnownDirectorySlugs()
  const firstSlug = slugs.length > 0 ? slugs[0] : null

  if (slugs.length === 0) {
    return (
      <DirectoriesLayout>
        <div className="flex flex-1 items-center justify-center text-muted-foreground">
          {t("directories.no-directories")}
        </div>
      </DirectoriesLayout>
    )
  }

  // Show first directory by default
  return (
    <DirectoriesLayout currentDirectorySlug={firstSlug}>
      <DirectoryListPage directorySlug={firstSlug!} />
    </DirectoriesLayout>
  )
}

