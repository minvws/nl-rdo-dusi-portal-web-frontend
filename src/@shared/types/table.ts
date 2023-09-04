/* eslint-disable */
export enum AssessmentsDataType {
  BUTTON = 'button',
  BUTTON_LINK = 'button-link',
  DATE = 'date',
  LINK = 'link',
  STRING = 'string'
}

export type AssessmentsData = Record<string, Record<string, any>>[]

export type RequestData = Record<string, Record<string, any>>[]

export type RawAssessmentData = {
  data: Record<string, any>[]
}

export type RawRequestData = {
  items: Record<string, any>[]
}

export type Column = {
  id: string
  text: string | undefined
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
