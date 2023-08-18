/* eslint-disable */
export enum AssessmentsDataType {
  LINK = 'link',
  STRING = 'string',
  DATE = 'date',
  BUTTON = 'button'
}

export type AssessmentsData = Record<string, Record<string, any>>[]

export type RequestData = Record<string, Record<string, any>>[]

export type RawAssessmentData = {
  data: Record<string, any>[]
}

export type RawRequestData = {
  data: Record<string, any>[]
}

export type FilterItem = {
  text: string
  id: string
  count?: number
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
