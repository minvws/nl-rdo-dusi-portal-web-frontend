export const TableDataType = {
  BUTTON_GHOST_LINK: 'button-link-ghost',
  BUTTON_LINK: 'button-link',
  BUTTON: 'button',
  DATE: 'date',
  EXTERNAL_LINK: 'external-link',
  ICON: 'icon',
  LINK_LIST: 'link-list',
  LINK: 'link',
  STRING: 'string'
} as const

export type TableData = (typeof TableDataType)[keyof typeof TableDataType]

export type Column = {
  id: string
  text?: string
  sortable?: boolean
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
