import { InputType } from '@shared/types/input'
import type { ComputedRef } from 'vue'
import type { JsonSchema } from '@jsonforms/core'
import type { FormValue } from '@shared/types/form'

type FieldOptions = {
  iban?: boolean
  tel?: boolean
  file?: boolean
  postalCode?: boolean
}
export type FieldProp = {
  type: string
  format?: InputType
  enum?: string[]
  default?: FormValue
} & FieldOptions

export type Control = {
  id: string
  data: FormValue
  schema: JsonSchema & FieldOptions
  options?: { label: string; value: string }[]
}

export type Field = { control: ComputedRef<Control> }
