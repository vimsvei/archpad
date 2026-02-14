"use client"

import type { BusinessProcess } from "@/@types/business-process"
import { NamedObjectListPage } from "@/components/shared/archimate/named-object-list-page"
import {
  useCreateBusinessProcessMutation,
  useGetBusinessProcessesQuery,
} from "@/store/apis/business-process-api"

export function ListPage() {
  return (
    <NamedObjectListPage<BusinessProcess>
      titleKey="business.processes"
      tableId="business-process"
      iconType="business-process"
      editPathPrefix="/common/processes"
      emptyTitleKey="table.processes.no-results"
      emptyDescriptionKey="table.processes.no-results.description"
      useListQuery={useGetBusinessProcessesQuery as any}
      useCreateMutation={useCreateBusinessProcessMutation as any}
    />
  )
}
