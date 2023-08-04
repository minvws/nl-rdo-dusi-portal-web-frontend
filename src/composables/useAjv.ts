import type { JsonSchema } from '@jsonforms/core'
import { createAjv } from '@jsonforms/core'
import type Ajv from '@jsonforms/core/node_modules/ajv'
import { iban } from '@form-validation/validator-iban'

export const useAjv = (): Ajv => {
  const ajv = createAjv({
    useDefaults: true,
    allErrors: true,
    $data: true // reference to properties in JSON-Schema
  })

  ajv.addKeyword({
    keyword: 'iban',
    validate: (schema: JsonSchema, value: string) => {
      const { valid } = iban().validate({ value })
      return valid
    }
  })

  ajv.addKeyword({
    keyword: 'postalCode',
    validate: (schema: JsonSchema, postalCode: string) => {
      const dutchPostalCodeRegex = /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/
      return dutchPostalCodeRegex.test(postalCode)
    }
  })

  return ajv
}
