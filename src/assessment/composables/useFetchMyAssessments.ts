import { computed } from 'vue'
import { useQueryFetch } from '@shared/composables/useQueryFetch'
import { useApiMyAssessmentRequestsUrl } from '@shared/composables/useApiUrl'
import { transformMyAssessmentsData } from '@shared/utils/transform'

export const useFetchMyAssessments = () => {
  const url = useApiMyAssessmentRequestsUrl()
  const { data: result, ...fetch } = useQueryFetch(url)
  const data = computed(() => (result.value ? transformMyAssessmentsData(result.value) : undefined))
  return {
    data,
    ...fetch
  }
}
