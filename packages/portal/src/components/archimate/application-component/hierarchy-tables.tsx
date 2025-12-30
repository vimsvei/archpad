"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"
import { RelatedItemsList, type RelatedItem } from "@/components/shared/related-items-list"

type ApplicationComponent = RelatedItem

type ParentTableProps = {
  componentId: string
  onAddExisting?: () => void
}

export function ParentTable({ componentId, onAddExisting }: ParentTableProps) {
  const { t } = useTranslate()
  const [isLoading, setIsLoading] = React.useState(false)
  const [parents, setParents] = React.useState<ApplicationComponent[]>([])

  const handleRefresh = React.useCallback(() => {
    setIsLoading(true)
    // TODO: Implement API call to fetch parents where componentId is child
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [componentId])

  const handleAdd = React.useCallback(() => {
    // TODO: Implement add parent dialog
    console.log("Add parent")
  }, [])

  const handleDelete = React.useCallback((item: ApplicationComponent) => {
    // TODO: Implement delete parent
    console.log("Delete parent", item)
  }, [])

  return (
    <RelatedItemsList<ApplicationComponent>
      title={t("hierarchy.parent")}
      items={parents}
      isLoading={isLoading}
      iconType="application-component"
      editPath={(item) => `/application/components/${item.id}`}
      onRefresh={handleRefresh}
      onAdd={handleAdd}
      onAddExisting={onAddExisting}
      onDelete={handleDelete}
    />
  )
}

type ChildrenTableProps = {
  componentId: string
  onAddExisting?: () => void
}

export function ChildrenTable({ componentId, onAddExisting }: ChildrenTableProps) {
  const { t } = useTranslate()
  const [isLoading, setIsLoading] = React.useState(false)
  const [children, setChildren] = React.useState<ApplicationComponent[]>([])

  const handleRefresh = React.useCallback(() => {
    setIsLoading(true)
    // TODO: Implement API call to fetch children where componentId is parent
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [componentId])

  const handleAdd = React.useCallback(() => {
    // TODO: Implement add child dialog
    console.log("Add child")
  }, [])

  const handleDelete = React.useCallback((item: ApplicationComponent) => {
    // TODO: Implement delete child
    console.log("Delete child", item)
  }, [])

  return (
    <RelatedItemsList<ApplicationComponent>
      title={t("hierarchy.children")}
      items={children}
      isLoading={isLoading}
      iconType="application-component"
      editPath={(item) => `/application/components/${item.id}`}
      onRefresh={handleRefresh}
      onAdd={handleAdd}
      onAddExisting={onAddExisting}
      onDelete={handleDelete}
    />
  )
}
