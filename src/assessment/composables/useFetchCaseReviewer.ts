import { computed } from 'vue'
import { useFetchWithEncryption } from '@shared/composables/useFetchWithEncryption'
import { useApiCaseReviewerUrl } from '@assessment/composables/useApiUrl'

export const useFetchCaseReviewer = (id: string) => {
  const url = useApiCaseReviewerUrl(id)
  const { data: json, ...fetch } = useFetchWithEncryption(url).json()

  const data = computed(() => (json.value ? json.value.data : {}))

  return {
    data,
    ...fetch
  }
}
