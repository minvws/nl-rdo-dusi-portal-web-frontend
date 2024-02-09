import type { FormError } from '@shared/types/form'

import { computed } from 'vue'
import { useI18n } from '@shared/composables/useI18n'
import { useForms } from '@shared/composables/form/useForms'

export const useFormConditionalRequiredError = (id: string) => {
  const { translate } = useI18n()
  const { errors, schema, getScopedElement } = useForms()

  const error = computed<FormError>(() =>
    errors.value.find(
      (error: FormError) => error?.params?.missingProperty === id && error?.keyword === 'required'
    )
  )

  const props = {
    schema: schema.value?.properties?.[id],
    uischema: getScopedElement(id),
    error
  }

  const conditionalError = computed<string | undefined>(() =>
    error.value?.message
      ? translate?.('error.required-conditional', error.value.message, props)
      : undefined
  )

  return {
    conditionalError
  }
}
