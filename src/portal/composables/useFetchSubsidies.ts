import { computed } from 'vue'
import { useFetch } from '@vueuse/core'

import { useApiSubsidyUrl } from '@/portal/composables/useApiUrl'

export const useFetchSubsidies = () => {
  const url = useApiSubsidyUrl()
  const { data: json, ...fetch } = useFetch(url).json()

  const data = computed(() => (json.value ? json.value : []))

  return {
    data,
    ...fetch
  }
}
