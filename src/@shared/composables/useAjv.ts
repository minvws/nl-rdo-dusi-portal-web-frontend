import type Ajv from 'ajv'

import { createAjv } from '@jsonforms/core'

import { t } from '@shared/i18n'

import { isValidIban } from '@shared/custom-input/iban-input'
import { isValidPostalCode } from '@shared/custom-input/postal-code-input'
import { isValidPhoneNumber } from '@shared/custom-input/phone-number-input'
import { isValidPassword } from '@shared/custom-input/password-input'

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
    keyword: 'updatePassword',
    validate: isValidPassword,
    error: {
      message: () => t('form.fields.error.password-update') ?? ''
    }
  })

  return ajv
}
