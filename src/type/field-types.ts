import { InputType } from '@/type/input-types'
import type { ComputedRef } from 'vue'
import type { JsonSchema } from '@jsonforms/core'
import type { FormValue } from '@/type/form-types'

export type FieldProp = {
  type: string
  iban?: boolean
  tel?: boolean
  file?: boolean
  format?: InputType
  enum?: string[]
}

export type Control = {
  id: string
  data: FormValue
  schema: JsonSchema & { file?: boolean; tel?: boolean; postalCode?: boolean }
  options?: { label: string; value: string }[]
}

export type Field = { control: ComputedRef<Control> }
