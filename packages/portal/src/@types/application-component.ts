export type ApplicationComponent = {
  id: string
  code: string
  name: string
  description?: string | null
  state?: { name: string; color?: string | null } | null
  createdAt?: string | null
  createdBy?: string | null
  updatedAt?: string | null
  updatedBy?: string | null
}

export type Paginated<T> = {
  items: T[]
  total: number
  page: number
  pageSize: number
  pageCount: number
}


