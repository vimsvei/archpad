import { getTranslate } from "@/tolgee/server"
import { UnderConstructionBlock } from "@/components/empty/under-construction"

export default async function ActorsPage() {
  const t = await getTranslate()
  return (
    <UnderConstructionBlock
      title={t("under-construction.title")}
      description={t("under-construction.description")}
    />
  )
}

import { getTranslate } from "@/tolgee/server"
import { UnderConstructionBlock } from "@/components/empty/under-construction"

export default async function ActorsPage() {
  const t = await getTranslate()
  return (
    <UnderConstructionBlock
      title={t("under-construction.title")}
      description={t("under-construction.description")}
    />
  )
}


