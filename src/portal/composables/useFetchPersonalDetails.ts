import type { Ref } from 'vue'
import type { Form, FormData } from '@shared/types/form'
import { computed, ref, watch } from 'vue'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'

import {
  useApiRequestEditPersonalDetailsUrl,
  useApiRequestPersonalDetailsUrl
} from '@portal/composables/useApiUrl'

import { transformForm } from '@shared/utils/form'

export const useFetchPersonalDetails = ({ editable }: Record<string, boolean>) => {
  const forms: Ref<Form[]> = ref([])
  const values: Ref<FormData | undefined> = ref(undefined)

  const url = editable ? useApiRequestEditPersonalDetailsUrl() : useApiRequestPersonalDetailsUrl()

  const { data: json, ...fetch } = useFetchWithCredentials(url).json()

  const data = computed(() => (json.value?.data ? json.value.data : []))

  watch(data, data => {
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
