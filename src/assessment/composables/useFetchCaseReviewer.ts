import { computed } from 'vue'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import { useApiCaseReviewerUrl } from '@assessment/composables/useApiUrl'

export const useFetchCaseReviewer = (id: string) => {
  const url = useApiCaseReviewerUrl(id)
  const { data: json, ...fetch } = useFetchWithCredentials(url).json()
  const data = computed(() => (json.value ? json.value.data : {}))

  return {
    data,
    ...fetch
  }
}
