import type { FileType } from '@shared/types/form'

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
  DATE: 'date',
  FILE: 'file',
  STRING: 'string',
  URL: 'url'
} as const

export type DescriptionListDetailsType =
  (typeof DescriptionListDetailsFieldType)[keyof typeof DescriptionListDetailsFieldType]

export type DescriptionListDetails = {
  type: DescriptionListDetailsType
  text?: string
  url?: string
  field?: string
  files?: FileType[]
  formId?: string
}

export type DescriptionListItem = {
  term: string
} & DescriptionListDetails

export type CaseDetailsItem = {
  title: string
  items: DescriptionListItem[]
}

export const descriptionListSupportedFormats = Object.values(DescriptionListDetailsFieldType)
