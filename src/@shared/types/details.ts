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
  data: Record<string, DescriptionListDetails>
}

export type DetailsDataInput = {
  title: string
  data: Record<string, DescriptionListDetails>
}[]

export type DetailsDataOutput = {
  title: string
  data: DescriptionListItem[]
}[]
