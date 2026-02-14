export type NamedObjectRecord = {
  id: string
  code: string
  name: string
  description: string | null
  layer?: string | null
  createdAt?: string | null
  createdBy?: string | null
  updatedAt?: string | null
  updatedBy?: string | null
}

export type NamedObjectRelationItem = {
  id: string
  code: string
  name: string
  description: string | null
}

export type CreateNamedObjectInput = {
  code?: string
  name: string
  description?: string
}

export type UpdateNamedObjectInput = Partial<CreateNamedObjectInput>
