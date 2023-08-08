import { iban } from '@form-validation/validator-iban'
import type { JsonSchema } from '@jsonforms/core'

export const isValidIban = (schema: JsonSchema, value: string) => {
  const { valid } = iban().validate({ value })
  return valid
}
