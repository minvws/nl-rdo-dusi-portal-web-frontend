import { computed } from 'vue'
import { useQueryFetch } from '@shared/composables/useQueryFetch'

import { useApiMessagesUrl } from '@portal/composables/useApiUrl'

import { formatMessagesData } from '@shared/utils/format'

export const useFetchMessages = (immediate = false) => {
  const url = useApiMessagesUrl()
  const { data: json, ...fetch } = useQueryFetch({ url }, { immediate })

  const data = computed(() => (json.value ? formatMessagesData(json.value) : []))

  return {
    data,
    ...fetch
  }
}
