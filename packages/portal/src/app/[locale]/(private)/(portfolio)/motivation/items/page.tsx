import { UnderConstructionBlock } from "@/components/empty/under-construction"
import { getTranslate } from "@/tolgee/server"

export default async function MotivationItemsPage() {
  const t = await getTranslate()
  return (
    <UnderConstructionBlock
      title={t("under-construction.title")}
      description={t("under-construction.description")}
    />
  )
}

