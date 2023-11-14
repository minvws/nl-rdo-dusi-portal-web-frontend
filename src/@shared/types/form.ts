import type { JsonSchema, UISchemaElement, JsonFormsCore } from '@jsonforms/core'

export type FormTitle = { title?: string }
export type FormMetaData = Record<string, any>

export const FormUiTypes = {
  INPUT: 'INPUT',
  VIEW: 'VIEW'
}

export type FormUiType = (typeof FormUiTypes)[keyof typeof FormUiTypes]

export type Form = {
  dataschema: JsonSchema & { anyOf?: any }
  uischema: UISchemaElement
  metadata?: FormMetaData
  uiType?: FormUiType
} & FormTitle

export type FileType = {
  name: string
  mimeType: string
  id: string
}

export type FormResult = { dataschema: JsonSchema; uischema: UISchemaElement } & FormTitle

export type FormValue = string | boolean | string[] | boolean[] | FileType[]

export type FormData = Record<string, FormValue>

export type FormError = Pick<JsonFormsCore, 'errors'> | any //  & { params?: { missingProperty: string, keyword: string }, message?: string }

export type FormResponse = any // @TODO

export const FormSubmitTypes = {
  SUBMIT: 'submit',
  DRAFT: 'draft',
  VALIDATION: 'validation'
}

export type FormSubmitType = (typeof FormSubmitTypes)[keyof typeof FormSubmitTypes]

export type FormButtonLabels = {
  start?: string
  previous?: string
  next?: string
  submit?: string
  save?: string
}

export type FormViewProps = {
  forms: Form[]
  id: string
  title?: string
  values?: FormData
  createDraft?: boolean
  locked?: boolean
  hideDebug?: boolean
  buttonLabels?: FormButtonLabels
  hasSaveButton?: boolean
  noStyle?: boolean // @TODO: remove when we have a better solution for styling the form.
  noButtons?: boolean
  hideRequiredLabel?: boolean
  persistent?: boolean
  ariaLabel?: string
}

export type FormValidationEntry = {
  type: 'error' | 'warning' | 'explanation' | 'confirmation'
  message: string
  params?: { suggestion?: { code: string; value: FormValue } }
}

export type FormValidationResult = Record<string, FormValidationEntry[]>
