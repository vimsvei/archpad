"use client"

import Link from "next/link"
import { LibraryBig } from "lucide-react"
import { useTranslate } from "@tolgee/react"

import { getDirectoryMeta, listKnownDirectorySlugs } from "@/components/directories/directory-meta"
import { Card } from "@/components/ui/card"
import { useGetDirectoryCountQuery } from "@/store/apis/directory-api"

export default function DirectoriesIndexPage() {
  const { t } = useTranslate()
  const slugs = listKnownDirectorySlugs()

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">
        {t("directories.title")}
      </h1>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {slugs.map((slug) => {
          const { data: count, isLoading } = useGetDirectoryCountQuery(slug)
          return (
            <Card key={slug} className="p-4">
              <Link href={`/directories/${slug}`} className="block">
                <div className="flex items-start gap-3">
                  <LibraryBig className="mt-0.5 size-10 text-foreground/80" />
                  <div className="min-w-0">
                    <div className="font-medium">{t(getDirectoryMeta(slug).titleKey)}</div>
                    <div className="text-muted-foreground text-sm">
                      {isLoading ? "…" : `${t("directory.rows", "rows")}: ${count ?? 0}`}
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

