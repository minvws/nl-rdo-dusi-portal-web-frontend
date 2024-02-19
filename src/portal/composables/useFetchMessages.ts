import { computed } from 'vue'
import { useQueryFetch } from '@shared/composables/useQueryFetch'

import { useApiMessagesUrl } from '@portal/composables/useApiUrl'

import { transformMessagesData } from '@shared/utils/transform'

export const useFetchMessages = (immediate = false) => {
  const url = useApiMessagesUrl()
  const { data: json, ...fetch } = useQueryFetch('with-encryption', { url }, { immediate })

  const data = computed(() => (json.value ? transformMessagesData(json.value) : []))

  return {
    data,
    ...fetch
  }
}
