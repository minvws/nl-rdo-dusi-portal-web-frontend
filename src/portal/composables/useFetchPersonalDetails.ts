import type { Form, FormData } from '@shared/types/form'

import { computed, ref, watch } from 'vue'
import { useCustomFetch } from '@shared/composables/useCustomFetch'

import {
  useApiRequestEditPersonalDetailsUrl,
  useApiRequestPersonalDetailsUrl
} from '@portal/composables/useApiUrl'

import { transformForm } from '@shared/utils/form'

export const useFetchPersonalDetails = ({ editable }: Record<string, boolean>) => {
  const forms = ref<Form[]>([])
  const values = ref<FormData | undefined>(undefined)

  const url = editable ? useApiRequestEditPersonalDetailsUrl() : useApiRequestPersonalDetailsUrl()

  const { data: json, ...fetch } = useCustomFetch('with-encryption', url, undefined, {
    immediate: false
  }).json()

  const data = computed(() => json.value?.data ?? [])

  watch(data, (data) => {
    if (!data) {
      return
    }

    const { dataschema, uischema, values: formValues } = data
    forms.value = transformForm({ dataschema, uischema })
    values.value = formValues
  })

  return {
    data: forms,
    values,
    ...fetch
  }
}
