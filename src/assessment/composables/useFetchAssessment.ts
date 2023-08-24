import { computed } from 'vue'
import { useFetch } from '@vueuse/core'

import { useApiAssessmentDetailsUrl } from '@/assessment/composables/useApiUrl'

import type { Assessment, AssessmentStage } from '@shared/types/assessment'

import { Stage } from '@shared/types/stages'

export const useFetchAssessment = (id: string) => {
  const url = useApiAssessmentDetailsUrl(id)
  const { data: json, ...rest } = useFetch(url).json()

  const data = computed(() => (json.value ? getAssessment(json.value.data) : []))

  function getAssessment(data: Assessment) {
    return data.stages.filter((stage: AssessmentStage) => stage.metadata.title === Stage.ASSESSMENT)
  }

  return { data, ...rest }
}
