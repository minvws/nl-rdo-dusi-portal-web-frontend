import type { JsonSchema, UISchemaElement } from '@jsonforms/core'

export type CaseStage = {
  dataschema: JsonSchema
  metadata: Record<string, any>
  uischema: UISchemaElement
  values?: Record<string, any>
  [key: string]: any
}

export type Case = {
  metadata: Record<string, any>
  stages: CaseStage[]
}
