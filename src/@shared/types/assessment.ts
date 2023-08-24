import type { JsonSchema, UISchemaElement } from '@jsonforms/core'

export type AssessmentStage = {
  dataschema: JsonSchema
  metadata: Record<string, any>
  uischema: UISchemaElement
  values?: Record<string, any>
  [key: string]: any
}

export type Assessment = {
  metadata: Record<string, any>
  stages: AssessmentStage[]
}
