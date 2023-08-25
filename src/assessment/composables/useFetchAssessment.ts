import { computed } from 'vue'
import { useQueryFetch } from '@shared/composables/useQueryFetch'

import { useApiAssessmentDetailsUrl } from '@/assessment/composables/useApiUrl'

import type { Assessment, AssessmentStage } from '@shared/types/assessment'

import { Stage } from '@shared/types/stages'

export const useFetchAssessment = (id: string) => {
  const url = useApiAssessmentDetailsUrl(id)
  const { data: json, ...fetch } = useQueryFetch({ url })

  const data = computed(() => (json.value ? getAssessment(json.value.data) : []))

  function getAssessment(data: Assessment) {
    return data.stages.filter((stage: AssessmentStage) => stage.metadata.title === Stage.ASSESSMENT)
  }

  return { data, ...fetch }
}
