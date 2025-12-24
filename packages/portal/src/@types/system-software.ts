export type SystemSoftware = {
  id: string
  code: string
  name: string
  description: string | null
  version: string | null
  kind?: string | null
  type?: { id: string; name: string } | null
  license?: { id: string; name: string } | null
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

export type SystemSoftwareDirectoryFields = {
  typeId: string | null
  licenseTypeId: string | null
}

