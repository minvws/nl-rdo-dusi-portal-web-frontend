export type PaginationItem = Record<string, unknown>

export type PaginationMetaData = {
  currentPage: number
  from: number
  lastPage: number
  perPage: number
  to: number
  total: number
}

export type RawPaginationMetaData = {
  meta: {
    current_page: number
    from: number
    last_page: number
    links: Record<string, any>[]
    per_page: number
    to: number
    total: number
  }
}
