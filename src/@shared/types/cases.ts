import type { JsonSchema, UISchemaElement } from '@jsonforms/core'

export type CaseForm = {
  metadata: Record<string, any>
  dataschema: JsonSchema
  uischema: UISchemaElement & { elements: [] }
  data?: Record<string, any>
  [key: string]: any
}

export type CaseData = {
  application: CaseForm
  applicationStages: CaseForm[]
}

export type CaseDetails = {
  application: CaseForm
  applicantApplicationStage: CaseForm
  otherApplicationStages: CaseForm[]
  currentApplicationStage?: CaseForm
}
