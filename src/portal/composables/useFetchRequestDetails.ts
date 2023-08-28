import { computed } from 'vue'
import { useFetch } from '@vueuse/core'

import { useApiRequestDetailsUrl } from '@/portal/composables/useApiUrl'

export const useFetchRequestDetails = (id: string) => {
  const url = useApiRequestDetailsUrl(id)
  const { data: json, ...fetch } = useFetch(url).json()

  const data = computed(() => (json.value ? json.value : []))

  return {
    data,
    ...fetch
  }
}
