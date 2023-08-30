import { computed } from 'vue'
import { useFetch } from '@vueuse/core'

import { useApiCaseDetailsUrl } from '@/assessment/composables/useApiUrl'

import { formatDetailsData } from '@shared/utils/format'

import type { Case, CaseStage } from '@shared/types/cases'
import type { DetailsDataInput } from '@shared/types/details'
import { Stage } from '@shared/types/stages'

export const useFetchCaseDetails = (id: string) => {
  const url = useApiCaseDetailsUrl(id)
  const { data: json, ...fetch } = useFetch(url).json()

  const data = computed(() => (json.value ? getCaseDetails(json.value.data) : []))

  function getCaseDetails(data: Case) {
    const caseDetails =
      data.stages.find((stage: CaseStage) => stage.metadata.title === Stage.REQUEST) || {}
    return formatDetailsData(caseDetails as DetailsDataInput)
  }

  return { data, ...fetch }
}
