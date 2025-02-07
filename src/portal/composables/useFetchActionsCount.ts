import { computed } from 'vue'

import { useApiActionsCountUrl } from '@portal/composables/useApiUrl'
import { useCustomFetch } from '@shared/composables/useCustomFetch'

export const useFetchActionsCount = () => {
  const url = useApiActionsCountUrl()
  const { data: json, ...fetch } = useCustomFetch('with-encryption', url, undefined, {
    immediate: false
  }).json()

  const data = computed(() => json.value || {})

  return {
    data,
    ...fetch
  }
}
