"use client"

import { useTranslate } from "@tolgee/react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContents,
  TabsContent,
} from "@/components/animate-ui/components/animate/tabs"
import { OpenExchangeUploader } from "@/components/upload/open-exchange-uploader"
import { DrawIoUploader } from "@/components/upload/draw-io-uploader"

export default function UploadPage() {
  const { t } = useTranslate()

  return (
    <div className="flex flex-1 flex-col gap-6 min-h-0">
      <h1 className="text-2xl font-semibold shrink-0">{t("upload.repository.title")}</h1>

      <Tabs defaultValue="open-exchange" className="flex flex-1 flex-col min-h-0 min-w-0">
        <TabsList className="w-fit shrink-0">
          <TabsTrigger value="open-exchange">
            {t("upload.repository.tab.open-exchange")}
          </TabsTrigger>
          <TabsTrigger value="draw-io">
            {t("upload.repository.tab.draw-io")}
          </TabsTrigger>
        </TabsList>

        <TabsContents className="mt-4 flex-1 min-h-0 flex flex-col">
          <TabsContent value="open-exchange" className="mt-0 flex-1 min-h-0 flex flex-col">
            <OpenExchangeUploader />
          </TabsContent>
          <TabsContent value="draw-io" className="mt-0 flex-1 min-h-0 flex flex-col">
            <DrawIoUploader />
          </TabsContent>
        </TabsContents>
      </Tabs>
    </div>
  )
}
