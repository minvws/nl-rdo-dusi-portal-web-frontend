import { computed } from 'vue'
import { useCustomFetch } from '@shared/composables/useCustomFetch'

import { useApiMessageDetailsUrl } from '@portal/composables/useApiUrl'

export const useFetchMessageDetails = (id: string) => {
  const url = useApiMessageDetailsUrl(id)
  const { data: json, ...fetch } = useCustomFetch('with-encryption', url).json()

  const data = computed(() => json.value || [])

  return {
    data,
    ...fetch
  }
}
