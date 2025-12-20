import { getTranslate } from "@/tolgee/server"
import { UnderConstructionBlock } from "@/components/empty/under-construction"

export default async function TechnologyLocationsPage() {
  const t = await getTranslate()
  return (
    <UnderConstructionBlock
      title={t("under-construction.title")}
      description={t("under-construction.description")}
    />
  )
}


