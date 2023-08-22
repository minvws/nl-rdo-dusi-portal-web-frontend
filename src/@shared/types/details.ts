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
