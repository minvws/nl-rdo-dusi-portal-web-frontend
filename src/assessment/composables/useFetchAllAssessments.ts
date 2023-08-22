import { computed } from 'vue'
import { useQueryFetch } from '@shared/composables/useQueryFetch'
import { useApiAssessmentRequestsUrl } from '@/assessment/composables/useAssessmentApiUrl'
import { transformAssessmentsData } from '@shared/utils/transform'

export const useFetchAllAssessments = () => {
  const url = useApiAssessmentRequestsUrl()
  const { data: result, ...fetch } = useQueryFetch(url)
  const data = computed(() => (result.value ? transformAssessmentsData(result.value) : undefined))

  return {
    data,
    ...fetch
  }
}
