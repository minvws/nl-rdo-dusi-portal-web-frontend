import { computed } from 'vue'
import { useQueryFetch } from '@shared/composables/useQueryFetch'

import { useApiCaseDetailsUrl } from '@assessment/composables/useApiUrl'

import type { ApplicationData, ApplicationDetails, ApplicationForm, Case, CaseStage } from "@shared/types/cases"

import { Stage } from '@shared/types/stages'

export const useFetchCase = (id: string) => {
  const url = useApiCaseDetailsUrl(id)
  const { data: json, ...fetch } = useQueryFetch({ url })

  const data = computed(() => (json.value ? getCase(json.value.data) : null))

  function getCase(data: ApplicationDetails): ApplicationData {
    return {
      application: data.application,
      applicantApplicationStage: data.applicationStages[0],
      otherApplicationStages: data.applicationStages.slice(1),
      currentApplicationStage: data.applicationStages.find((s: ApplicationForm) => s.metadata.applicationStage.isCurrent)
    }
  }

  return { data, ...fetch }
}
