export type ApplicationComponent = {
  id: string
  code: string
  name: string
  description?: string | null
}

export type Paginated<T> = {
  items: T[]
  total: number
  page: number
  pageSize: number
  pageCount: number
}


