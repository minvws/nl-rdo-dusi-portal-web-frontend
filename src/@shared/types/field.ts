import type { ComputedRef } from 'vue'
import type { JsonSchema } from '@jsonforms/core'
import type { FormValue } from '@shared/types/form'

import { InputType } from '@shared/types/input'
import type { ControlEvent } from './control'

type FieldOptions = {
  iban?: boolean
  tel?: boolean
  file?: boolean
  postalCode?: boolean
  formatMinimum?: string
  formatMaximum?: string
  updatePassword?: boolean
}
export type FieldProp = {
  type: string
  format?: InputType
  enum?: string[]
  default?: FormValue
  title?: string
  minLength?: number
  maxLength?: number
} & FieldOptions

export type Control = {
  id: string
  data: FormValue
  schema: JsonSchema & FieldOptions
  uischema: { options?: { validation?: ControlEvent[] } }
  options?: { label: string; value: string }[]
}

export type Field = { control: ComputedRef<Control> }
