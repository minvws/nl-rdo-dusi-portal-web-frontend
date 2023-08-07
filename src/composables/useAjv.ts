import { createAjv } from '@jsonforms/core'
import type Ajv from '@jsonforms/core/node_modules/ajv'

import { isValidIban } from '@/custom-input/iban-input'
import { isValidPostalCode } from '@/custom-input/postal-code-input'
import { isValidPhoneNumber } from '@/custom-input/phone-number-input'

export const useAjv = (): Ajv => {
  const ajv = createAjv({
    useDefaults: true,
    allErrors: true,
    $data: true // reference to properties in JSON-Schema
  })

  ajv.addKeyword({
    keyword: 'iban',
    validate: isValidIban
  })

  ajv.addKeyword({
    keyword: 'postalCode',
    validate: isValidPostalCode
  })

  ajv.addKeyword({
    keyword: 'tel',
    validate: isValidPhoneNumber
  })

  ajv.addKeyword({
    keyword: 'postalCode',
    validate: (schema: JsonSchema, postalCode: string) => {
      /* format: 1111AA or 1111 AA */
      const dutchPostalCodeRegex = /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/
      return dutchPostalCodeRegex.test(postalCode)
    }
  })

  return ajv
}
