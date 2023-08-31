import { computed } from 'vue'
import { useQueryFetch } from '@shared/composables/useQueryFetch'

import { useApiCaseDetailsUrl } from '@/assessment/composables/useApiUrl'

import type { Case, CaseStage } from '@shared/types/cases'

import { Stage } from '@shared/types/stages'

export const useFetchCase = (id: string) => {
  const url = useApiCaseDetailsUrl(id)
  const { data: json, ...fetch } = useQueryFetch({ url })

  const data = computed(() => (json.value ? getAssessment(json.value.data) : []))

  function getAssessment(data: Case) {
    return data.stages.filter((stage: CaseStage) => stage.metadata.title === Stage.ASSESSMENT)
  }

  return { data, ...fetch }
}
