import { computed } from 'vue'
import { useFetch } from '@vueuse/core'
import { useApiAssessmentDetailsUrl } from '@/assessment/composables/useAssessmentApiUrl'

export const useFetchAssessment = (id: string) => {
  const url = useApiAssessmentDetailsUrl(id)
  const { data: json, error, isFetching } = useFetch(url).json()

  const data = computed(() => (json.value ? json.value.data : {}))
  return {
    data,
    error,
    isFetching
  }
}
