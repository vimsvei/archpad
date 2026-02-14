"use client"

import type { ApplicationFunction } from "@/@types/application-function"
import { NamedObjectListPage } from "@/components/shared/archimate/named-object-list-page"
import {
  useCreateApplicationFunctionMutation,
  useGetApplicationFunctionsQuery,
} from "@/store/apis/application-function-api"

export function ListPage() {
  return (
    <NamedObjectListPage<ApplicationFunction>
      titleKey="application.functions"
      tableId="application-function"
      iconType="application-function"
      editPathPrefix="/common/functions"
      emptyTitleKey="table.functions.no-results"
      emptyDescriptionKey="table.functions.no-results.description"
      useListQuery={useGetApplicationFunctionsQuery as any}
      useCreateMutation={useCreateApplicationFunctionMutation as any}
    />
  )
}
