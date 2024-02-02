import type { JsonFormsI18nState } from '@jsonforms/core'

import { t } from '@shared/i18n'
import { useForms } from '@shared/composables/form/useForms'

function getProps(form: any, context: any) {
  // pass field of field to i18n
  const errorContext = context?.error
  const property = errorContext?.params?.missingProperty ?? errorContext?.instancePath?.substring(1)

  const title =
    errorContext?.parentSchema?.properties?.[property]?.title ??
    form.schema.value?.properties?.[property]?.title ??
    context?.uischema?.label ??
    form.getScopedElement(property)?.label

  const field = title ?? property
  const isBoolean = errorContext?.parentSchema?.properties?.[property]?.type === 'boolean'
  const schema = context?.schema ?? form.schema?.value.properties[property]
  return { ...schema, field, isBoolean }
}

export const useI18n = () => {
  const form = useForms()

  function formsTranslate(id: string, defaultMessage?: string, context?: any): string | undefined {
    const { isBoolean, ...props } = getProps(form, context)
    const type = isBoolean ? '-boolean' : ''
    let error = `${id}${type}`

    if (error === 'error.minLength' && props.minLength === props?.maxLength) {
      // when minLength and maxLength are the same,
      // show message that the input should be equal to a length
      error = 'error.length'
    }

    return t(`form.fields.${error}`, props) ?? defaultMessage
  }

  return {
    translate: formsTranslate
  } as JsonFormsI18nState
}
