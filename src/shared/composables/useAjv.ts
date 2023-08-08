import { createAjv } from '@jsonforms/core'
import type Ajv from '@jsonforms/core/node_modules/ajv'

import { isValidIban } from '@/shared/custom-input/iban-input'
import { isValidPostalCode } from '@/shared/custom-input/postal-code-input'
import { isValidPhoneNumber } from '@/shared/custom-input/phone-number-input'

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
  return ajv
}
