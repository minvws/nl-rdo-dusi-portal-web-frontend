import { computed } from 'vue'
import { useFetch } from '@vueuse/core'

import { useApiAssessmentDetailsUrl } from '@/assessment/composables/useApiUrl'

import { formatDetailsData } from '@shared/utils/format'

import type { Assessment, AssessmentStage } from '@shared/types/assessment'
import type { DetailsDataInput } from '@shared/types/details'
import { Stage } from '@shared/types/stages'

export const useFetchDetails = (id: string) => {
  const url = useApiAssessmentDetailsUrl(id)
  const { data: json, ...rest } = useFetch(url).json()

  const data = computed(() => (json.value ? getRequestDetails(json.value.data) : []))

  function getRequestDetails(data: Assessment) {
    const request =
      data.stages.find((stage: AssessmentStage) => stage.metadata.title === Stage.REQUEST) || {}
    return formatDetailsData(request as DetailsDataInput)
  }

  return { data, ...rest }
}
