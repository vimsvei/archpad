"use client"

import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "@/store/store"
import { updateBasicFields } from "@/store/slices/data-object-edit-slice"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function GeneralTab({ isSaving }: { isSaving: boolean }) {
  const dispatch = useDispatch<AppDispatch>()
  const { code, name, description } = useSelector((s: RootState) => s.dataObjectEdit)

  return (
    <Card className="p-6 flex flex-col gap-6">
      <div className="grid gap-2">
        <Label htmlFor="code">Code</Label>
        <Input
          id="code"
          value={code}
          disabled={isSaving}
          onChange={(e) => dispatch(updateBasicFields({ code: e.target.value }))}
          placeholder="AUTO or custom"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          disabled={isSaving}
          onChange={(e) => dispatch(updateBasicFields({ name: e.target.value }))}
          placeholder="Data object name"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          disabled={isSaving}
          onChange={(e) => dispatch(updateBasicFields({ description: e.target.value }))}
          placeholder="Optional description"
          rows={6}
        />
      </div>
    </Card>
  )
}


