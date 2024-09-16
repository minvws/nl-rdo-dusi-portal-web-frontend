import type { ComputedRef } from 'vue'
import type { JsonSchema } from '@jsonforms/core'
import type { FormValue } from '@shared/types/form'

import { InputType } from '@shared/types/input'

type FieldOptions = {
  iban?: boolean
  tel?: boolean
  file?: boolean
  postalCode?: boolean
  formatMinimum?: string
  formatMaximum?: string
  updatePassword?: boolean
  step?: number
  minimum?: number
  maximum?: number
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

export type ControlEvent = 'onFocus' | 'onBlur' | 'onInput' | 'onChange' | 'onValid'

export type Control = {
  id: string
  path: string
  data: FormValue
  schema: ControlSchema
  uischema: {
    options?: Record<string, unknown> & {
      validation?: ControlEvent[]
      remoteAction?: ControlEvent[]
    }
  }
  options?: { label: string; value: string }[]
}

export type ControlSchema = JsonSchema & FieldOptions

export type Field = { control: ComputedRef<Control> }

export type ValidationError = {
  message: string
  id?: string
}
