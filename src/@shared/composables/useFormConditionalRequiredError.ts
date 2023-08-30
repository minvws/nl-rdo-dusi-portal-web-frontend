import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useI18n } from '@shared/composables/useI18n'
import { useFormStore } from '@shared/store/useFormStore'

export const useFormConditionalRequiredError = (id: string) => {
  const { translate } = useI18n()
  const formStore = useFormStore()
  const { getScopedElement } = formStore

  const { errors, schema } = storeToRefs(formStore)

  const error = computed(() => {
    return errors.value?.find(
      ({ params, keyword }: { params?: { missingProperty: string }; keyword?: string }) =>
        params?.missingProperty === id && keyword === 'required'
    )
  })
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
