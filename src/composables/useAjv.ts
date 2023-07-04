import { createAjv, type JsonSchema } from '@jsonforms/core'
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

  return ajv
}
