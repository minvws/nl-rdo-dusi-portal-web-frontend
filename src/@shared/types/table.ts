export type TableDataRecord = Record<string, Record<string, string | boolean>>

export type TableData = {
  headings: Column[]
  filters: FilterItem[]
  items: TableDataRecord[]
}

export type FilterItem = {
  text: string
  id: string
  value: number | string | boolean
}

export type FilterCountItem = FilterItem & {
  count: number
}

export type FilterTabItem = {
  text: string
  id: string
  value: string
  count: number
}

export type Column = {
  field: string
  text: string
  sortable: boolean
}

export type Response = {
  data: {
    headings: Record<string, string>[]
    filters: Record<string, string>[]
    items: Record<string, Record<string, string | boolean>>[]
  }
  error?: string
  isFetching: boolean
}
