import type { JsonSchema, UISchemaElement, JsonFormsCore } from '@jsonforms/core'

export type FormTitle = { title?: string }
export type Form = {
  dataschema: JsonSchema & { anyOf?: any }
  uischema: UISchemaElement
} & FormTitle
export type FormResult = { dataschema: JsonSchema; uischema: UISchemaElement } & FormTitle
export type FormValue = string | boolean | string[] | boolean[]
export type FormData = Record<string, FormValue>
export type FormError = Pick<JsonFormsCore, 'errors'> | any //  & { params?: { missingProperty: string, keyword: string }, message?: string }
export type FormResponse = any // @TODO
export type FormButtonLabels = {
  start?: string
  previous?: string
  next?: string
  submit?: string
}
