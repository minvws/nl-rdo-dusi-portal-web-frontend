import type { JsonSchema } from '@jsonforms/core'

export const isValidPhoneNumber = (schema: JsonSchema, value: string) => {
  const regex =
    /^\+?[0-9]{1,3}?[-.\s]?(\([0-9]{1,3}\)|[0-9]{1,4})[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/
  return regex.test(value)
}
