"use client"

import * as React from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import type { RelatedItem } from "@/store/slices/data-object-edit-slice"
import { RelatedItemsMapTab } from "@/components/shared/archimate/maps-tabs/related-items-map-tab"

export function ComponentsTable() {
  const editState = useSelector((s: RootState) => s.dataObjectEdit)
  const items = editState.components as RelatedItem[]
  const isLoading = editState.isSaving || editState.isLoading

  return (
    <RelatedItemsMapTab<RelatedItem>
      items={items}
      isLoading={isLoading}
      iconType="application-component"
      editPath={(item) => `/application/components/${item.id}`}
    />
  )
}


