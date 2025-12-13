import Link from "next/link"

import { getDirectoryMeta, listKnownDirectorySlugs } from "@/components/directories/directory-meta"
import { Card } from "@/components/ui/card"

export default function DirectoriesIndexPage() {
  const slugs = listKnownDirectorySlugs()

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Directories</h1>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {slugs.map((slug) => (
          <Card key={slug} className="p-4">
            <Link href={`/directories/${slug}`} className="block">
              <div className="font-medium">{getDirectoryMeta(slug).title}</div>
              <div className="text-muted-foreground text-sm">/{slug}</div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}

