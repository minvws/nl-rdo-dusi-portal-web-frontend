import type { JsonSchema, UISchemaElement, JsonFormsCore } from '@jsonforms/core'
import type { ErrorObject } from 'ajv'
import type { Ref } from 'vue'

export type FormTitle = { title?: string }
export type FormMetaData = Record<string, any>

export const FormUiType = {
  INPUT: 'INPUT',
  VIEW: 'VIEW'
} as const

export type FormUi = (typeof FormUiType)[keyof typeof FormUiType]

export type Form = {
  dataschema: JsonSchema & { anyOf?: any }
  uischema: UISchemaElement
  metadata?: FormMetaData
  uiType?: FormUi
} & FormTitle

export type FileType = {
  name: string
  mimeType: string
  id: string
}

export type FormResult = {
  dataschema: JsonSchema
  uischema: UISchemaElement
  metadata: FormMetaData
} & FormTitle

export type FormValue = string | boolean | string[] | boolean[] | FileType[]

export type FormData = Record<string, FormValue>

export type FormError = (ErrorObject & { instancePath?: string }) | undefined
export type FormErrors = FormError[][]

export const FormSubmitType = {
  SUBMIT: 'submit',
  DRAFT: 'draft',
  VALIDATION: 'validation',
  ACTION: 'action'
} as const

export type FormSubmit = (typeof FormSubmitType)[keyof typeof FormSubmitType]

export type FormSubmitError = {
  error?: Error | undefined
  isValidationError: boolean
}

export type FormSubmitReturnType = {
  data: Ref<any> | undefined
  error?: FormSubmitError
  statusCode: number | null
}

export type FormButtonLabels = {
  start?: string
  previous?: string
  next?: string
  submit?: string
  save?: string
}

export type FormViewProps = {
  forms: Form[]
  reference?: string
  id: string
  title?: string
  values?: FormData
  locked?: boolean
  hideDebug?: boolean
  buttonLabels?: FormButtonLabels
  hasSaveButton?: boolean
  noStyle?: boolean
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
