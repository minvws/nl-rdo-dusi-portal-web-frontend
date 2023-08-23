export type DetailsDataInput = {
  values: Record<string, string>[]
  uischema: Record<string, any>
  [key: string]: any
}

export type DetailsDataInputSection = {
  title: string
  elements: Record<string, string>[]
}

export type DescriptionListDetails = {
  type: 'string' | 'date' | 'url'
  url?: string
  text: string
}

export type DescriptionListItem = {
  term: string
  details: DescriptionListDetails
}

export type RequestDetailsItem = {
  title: string
  items: DescriptionListItem[]
}
