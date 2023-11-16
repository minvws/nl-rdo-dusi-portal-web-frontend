import { computed } from 'vue'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import { useApiAssessorPoolUrl } from '@assessment/composables/useApiUrl'

export const useFetchAssessors = (id: string) => {
  const url = useApiAssessorPoolUrl(id)
  const { data: json, ...fetch } = useFetchWithCredentials(url).json()

  const data = computed(() => (json.value ? json.value.data : {}))

  return {
    data,
    ...fetch
  }
}
