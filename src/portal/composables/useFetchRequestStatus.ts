import { computed } from 'vue'
import { useCustomFetch } from '@shared/composables/useCustomFetch'

import { useApiRequestDetailsUrl } from '@portal/composables/useApiUrl'

export const useFetchRequestStatus = (reference: string) => {
  const url = useApiRequestDetailsUrl(reference)
  const { data: json, ...fetch } = useCustomFetch('with-encryption', url).json()

  const data = computed(() => json.value || {})
  const values = computed(() => data.value?.data)

  return {
    data,
    values,
    ...fetch
  }
}
