import type { Form, FormData } from '@shared/types/form'
import type { ApplicationDetails, ApplicationForm } from '@shared/types/cases'

import { computed } from 'vue'

import { useQueryFetch } from '@shared/composables/useQueryFetch'
import { useApiCaseDetailsUrl } from '@assessment/composables/useApiUrl'

import { transformForm, transformFormValues, getFormTitle } from '@shared/utils/form'

export const useFetchCase = (id: string) => {
  const url = useApiCaseDetailsUrl(id)
  const { data: json, ...fetch } = useQueryFetch('with-credentials', { url })
  const data = computed(() => json.value?.data as ApplicationDetails)

  const caseDetail = computed(() => {
    return transform(data.value?.application)
  })

  const caseStages = computed(() => {
    const stages = data.value?.applicationStages
    if (!stages) return undefined
    return stages.map(stage => transform(stage))
  })

  const caseStage = computed(() => {
    return caseStages?.value?.[0]
  })

  const otherCases = computed(() => {
    return caseStages?.value?.slice(1)
  })

  const caseTitle = computed(() => {
    const target = data.value?.applicationStages.find(
      (s: ApplicationForm) => s.metadata.applicationStage.isCurrent
    )
    if (!target) return undefined
    return getFormTitle(target)
  })

  function transform(data: Form & { data?: FormData }) {
    const forms = transformForm(data)
    return {
      forms,
      values: transformFormValues(data?.data),
      title: getFormTitle(data)
    }
  }

  return { data, caseDetail, caseStage, otherCases, caseTitle, ...fetch }
}
