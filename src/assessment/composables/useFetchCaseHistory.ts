import { computed } from 'vue'
import { useFetchWithEncryption } from '@shared/composables/useFetchWithEncryption'
import { useApiCaseHistoryUrl } from '@assessment/composables/useApiUrl'

export const useFetchCaseHistory = (id: string) => {
  const url = useApiCaseHistoryUrl(id)
  const { data: json, ...fetch } = useFetchWithEncryption(url).json()

  const data = computed(() => (json.value ? json.value.data : {}))

  return {
    data,
    ...fetch
  }
}
