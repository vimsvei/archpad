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
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">{t("upload.repository.title")}</h1>

      <Tabs defaultValue="open-exchange" className="flex flex-col">
        <TabsList className="w-fit">
          <TabsTrigger value="open-exchange">
            {t("upload.repository.tab.open-exchange")}
          </TabsTrigger>
          <TabsTrigger value="draw-io">
            {t("upload.repository.tab.draw-io")}
          </TabsTrigger>
        </TabsList>

        <TabsContents className="mt-4">
          <TabsContent value="open-exchange" className="mt-0">
            <OpenExchangeUploader />
          </TabsContent>
          <TabsContent value="draw-io" className="mt-0">
            <DrawIoUploader />
          </TabsContent>
        </TabsContents>
      </Tabs>
    </div>
  )
}
