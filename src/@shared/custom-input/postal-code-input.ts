import type { JsonSchema } from '@jsonforms/core'
import type { Control } from '@shared/types/field'

export const isValidPostalCode = (schema: JsonSchema, value: string) => {
  /* format: 1111AA or 1111 AA */
  const dutchPostalCodeRegex = /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/
  return dutchPostalCodeRegex.test(value)
}

const formatPostCode = (value: string, format = false) => {
  /* format 1111A? to 1111 A? */
  const startsWith = value?.match(/^[1-9][0-9]{0,3}\s?/g)?.[0] ?? ''
  const endsWith = value?.match(/[a-zA-Z]{0,2}$/g)?.[0] ?? ''
  const spacing = format && startsWith?.length === 4 ? ' ' : ''

  if (startsWith.length >= 4) {
    return `${startsWith}${spacing}${endsWith}`.toUpperCase()
  }
  return `${startsWith}${spacing}`
}

export default {
  test(control: Control) {
    return control.schema.postalCode
  },
  onFocus(value: string) {
    return formatPostCode(value)
  },
  onBlur(value: string) {
    return formatPostCode(value, true)
  },
  onInput(value: string) {
    return formatPostCode(value)
  },
  onChange(value: string) {
    return formatPostCode(value)
  }
}
