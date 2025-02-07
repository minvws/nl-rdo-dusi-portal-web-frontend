export type Link = {
  name: string
  label?: string
  icon?: string
  badge?: number
  params?: Record<string, string>
}

export type FileLink = {
  reference: string
  fieldCode: string
  id: string
}
