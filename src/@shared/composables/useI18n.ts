import type { JsonFormsI18nState } from '@jsonforms/core'

import { t } from '@shared/i18n'
import { useForms } from '@shared/composables/form/useForms'

function getProps(form: any, context: any) {
  // pass field of field to i18n
  const errorContext = context?.error
  const property = errorContext?.params?.missingProperty ?? errorContext?.instancePath?.slice(1)

  const title =
    errorContext?.parentSchema?.properties?.[property]?.title ??
    form.schema.value?.properties?.[property]?.title ??
    context?.uischema?.label ??
    form.getScopedElement(property)?.label

  const field = title ?? property
  const isBooleanField = errorContext?.parentSchema?.properties?.[property]?.type === 'boolean'
  const schema = context?.schema ?? form.schema?.value.properties[property]

  const isFileField = schema?.file || false
  const pluralNumber = typeof errorContext?.schema === 'number' ? errorContext?.schema : 1

  return { ...schema, field, isBooleanField, isFileField, pluralNumber }
}

export const useI18n = () => {
  const form = useForms()

  function formsTranslate(id: string, defaultMessage?: string, context?: any): string | undefined {
    if (!context?.error) {
      // if no error, return default message
      // currently we only translate errors
      return defaultMessage
    }

    const { isBooleanField, isFileField, pluralNumber, ...props } = getProps(form, context)
    const type = isBooleanField ? '-boolean' : ''
    let error = `${id}${type}`

    if (isFileField) {
      // custom error messages for file inputs
      return t(`form.fields.file.${error}`, props, pluralNumber)
    }

    if (error === 'error.minLength' && props.minLength === props?.maxLength) {
      // when minLength and maxLength are the same,
      // show message that the input should be equal to a length
      error = 'error.length'
    }

    return t(`form.fields.${error}`, props) ?? defaultMessage
  }

  return {
    locale: 'nl',
    translate: formsTranslate
  } as JsonFormsI18nState
}
