import type { FormError } from '@shared/types/form'

import { computed } from 'vue'
import { useI18n } from '@shared/composables/useI18n'
import { useForms } from '@shared/composables/form/useForms'

export const useFormConditionalRequiredError = (id: string) => {
  const { translate } = useI18n()
  const { errors, schema, getScopedElement } = useForms()

  const error = computed<FormError>(() =>
    errors.value?.find(
      ({ params, keyword }: { params?: { missingProperty: string }; keyword?: string }) =>
        params?.missingProperty === id && keyword === 'required'
    )
  )

  const props = {
    schema: schema.value?.properties?.[id],
    uischema: getScopedElement(id),
    error
  }

  return computed(() => {
    const hasError = error.value
    return hasError
      ? translate?.('error.required-conditional', hasError?.message, props)
      : undefined
  })
}
