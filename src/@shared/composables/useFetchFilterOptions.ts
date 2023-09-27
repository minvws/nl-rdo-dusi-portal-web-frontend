import type { Ref } from 'vue'
import type { Form } from '@shared/types/form'
import type { FormOptions } from '@shared/types/form-options'

import { ref, watch } from 'vue'
import { useCustomFetch } from '@shared/composables/useCustomFetch'
import { useApiFilterOptionsUrl } from '@shared/composables/useApiUrl'

export const useFetchFilterOptions = (type: FormOptions) => {
  const url = useApiFilterOptionsUrl(type)
  const { data, error, ...fetch } = useCustomFetch('with-encryption', url).json()
  const forms: Ref<Form[] | undefined> = ref(undefined)

  watch(
    data,
    ({ data }: { data: Form | Form[] }) => (forms.value = Array.isArray(data) ? data : [data])
  )

  watch(error, () => (forms.value = undefined))

  return {
    data,
    error,
    forms,
    ...fetch
  }
}
