import type { JsonSchema } from '@jsonforms/core'
import type { Control } from '@shared/types/field'

const STARTS_WITH = '+31(0) '

export const isValidPhoneNumber = (schema: JsonSchema, value: string) => {
  const regex = /^\+31\(0\) [1-9][0-9]{8}$/
  return regex.test(value)
}

const formatPhoneNumber = (value: string) => {
  return value?.match(/\+31\(0\) [1-9]{1}[0-9]{0,8}$/g)?.[0] ?? STARTS_WITH
}

export default {
  test(control: Control) {
    return control.schema.tel
  },
  onFocus(value: string) {
    if (!value) return STARTS_WITH
    return value
  },
  onBlur(value: string) {
    if (value === STARTS_WITH) return ''
    return value
  },
  onChange(value: string) {
    return formatPhoneNumber(value)
  }
}
