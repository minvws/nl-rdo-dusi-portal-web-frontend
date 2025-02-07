import type { JsonSchema } from '@jsonforms/core'
import type { Control } from '@shared/types/field'

import { iban } from '@form-validation/validator-iban'

export const isValidIban = (schema: JsonSchema, value: string) => {
  const { valid } = iban().validate({ value })
  return valid
}

export default {
  test(control: Control) {
    return control.schema.iban
  },
  onChange(value: string) {
    return value?.split(' ').join('').toUpperCase()
  }
}
