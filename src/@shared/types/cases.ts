import type { JsonSchema, UISchemaElement } from '@jsonforms/core'

export type ApplicationForm = {
  metadata: Record<string, any>
  dataschema: JsonSchema
  uischema: UISchemaElement & { elements: [] }
  data?: Record<string, any>
  [key: string]: any
}

export type ApplicationDetails = {
  application: ApplicationForm
  applicationStages: ApplicationForm[]
}

export const CaseType = {
  ALL_CASES: 'all-cases',
  MY_CASES: 'cases'
} as const

export type Case = (typeof CaseType)[keyof typeof CaseType]
