import { InputType } from '@/shared/type/input-types'
import type { ComputedRef } from 'vue'
import type { JsonSchema } from '@jsonforms/core'
import type { FormValue } from '@/shared/type/form-types'

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
} & FieldOptions

export type Control = {
  id: string
  data: FormValue
  schema: JsonSchema & FieldOptions
  options?: { label: string; value: string }[]
}

export type Field = { control: ComputedRef<Control> }
