export type DataObject = {
  id: string
  code: string
  name: string
  description: string | null
  createdAt?: string | null
  createdBy?: string | null
  updatedAt?: string | null
  updatedBy?: string | null
}

export type { Paginated } from "@archpad/contract"

