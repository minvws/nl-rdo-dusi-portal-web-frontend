import { computed } from 'vue'
import { useFetch } from '@vueuse/core'

import { useApiActionsCountUrl } from '@/portal/composables/useApiUrl'

export const useFetchActionsCount = () => {
  const url = useApiActionsCountUrl()
  const { data: json, ...fetch } = useFetch(url, {
    credentials: 'include'
  }).json()

  const data = computed(() => (json.value ? json.value : {}))

  return {
    data,
    ...fetch
  }
}
