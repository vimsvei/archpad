"use client"

import type { DataObject } from "@/@types/data-object"
import { NamedObjectListPage } from "@/components/shared/archimate/named-object-list-page"
import {
  useCreateDataObjectMutation,
  useGetDataObjectsQuery,
} from "@/store/apis/data-object-api"

export function ListPage() {
  return (
    <NamedObjectListPage<DataObject>
      titleKey="application.data-objects"
      tableId="data-object"
      iconType="application-data-object"
      editPathPrefix="/application/data-objects"
      emptyTitleKey="table.data-objects.no-results"
      emptyDescriptionKey="table.data-objects.no-results.description"
      useListQuery={useGetDataObjectsQuery as any}
      useCreateMutation={useCreateDataObjectMutation as any}
    />
  )
}
