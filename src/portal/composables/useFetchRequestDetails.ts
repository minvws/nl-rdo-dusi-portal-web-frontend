import type { Ref } from 'vue'
import type { Form, FormData } from '@shared/types/form'
import { computed, ref, watch } from 'vue'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'

import { useApiRequestDetailsUrl } from '@portal/composables/useApiUrl'

import { transformForm } from '@shared/utils/form'

export const useFetchRequestDetails = (reference: string) => {
  const forms: Ref<Form[]> = ref([])
  const values: Ref<FormData | undefined> = ref(undefined)

  const url = useApiRequestDetailsUrl(reference)
  const { data: json, ...fetch } = useFetchWithCredentials(url).json()

  const data = computed(() => (json.value ? json.value : {}))

  watch(data, data => {
    if (!data) {
      return
    }

    const { dataschema, uischema, values: formValues } = data
    forms.value = transformForm({ dataschema, uischema })
    values.value = formValues
  })

  return {
    forms,
    data,
    values,
    ...fetch
  }
}
