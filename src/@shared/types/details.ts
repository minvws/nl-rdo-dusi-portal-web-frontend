export type DetailsDataInput = {
  values: Record<string, string>[]
  uischema: Record<string, any>
  [key: string]: any
}

export type DetailsDataInputSection = {
  title: string
  elements: Record<string, string>[]
}

export const DescriptionListDetailsFieldType = {
  FILE: 'file',
  DATE: 'date',
  URL: 'url',
  STRING: 'string'
} as const

export type DescriptionListDetailsType =
  (typeof DescriptionListDetailsFieldType)[keyof typeof DescriptionListDetailsFieldType]

export type DescriptionListDetails = {
  type: DescriptionListDetailsType
  url?: string
  text: string
}

export type DescriptionListItem = {
  term: string
} & DescriptionListDetails

export type CaseDetailsItem = {
  title: string
  items: DescriptionListItem[]
}
