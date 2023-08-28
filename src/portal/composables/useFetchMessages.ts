import { computed } from 'vue'
import { useQueryFetch } from '@shared/composables/useQueryFetch'

import { useApiMessagesUrl } from '@/portal/composables/useApiUrl'

export const useFetchMessages = () => {
  const url = useApiMessagesUrl()
  const { data: json, ...fetch } = useQueryFetch({ url })

  const data = computed(() => (json.value ? json.value : []))

  return {
    data,
    ...fetch
  }
}
