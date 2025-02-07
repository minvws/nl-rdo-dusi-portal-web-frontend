import type { Form, FormData } from '@shared/types/form'
import type { ApplicationDetails, ApplicationForm } from '@shared/types/cases'

import { computed } from 'vue'

import { useQueryFetch } from '@shared/composables/useQueryFetch'
import { useApiCaseDetailsUrl } from '@assessment/composables/useApiUrl'
import { useFetchTransitionHistory } from '@assessment/composables/useFetchTransitionHistory'

import { transformForm, transformFormValues, getFormTitle } from '@shared/utils/form'

export const useFetchCase = (id: string) => {
  const url = useApiCaseDetailsUrl(id)
  const { data: json, ...fetch } = useQueryFetch('with-credentials', { url })

  const { transitionHistory, isFetching: isFetchingTransitionHistory } =
    useFetchTransitionHistory(id)

  const data = computed<ApplicationDetails>(() => json.value?.data)

  const caseDetail = computed(() => transform(data.value?.application))

  const caseStages = computed(() => {
    const stages = data.value?.applicationStages
    if (!stages) return undefined
    return stages.map((stage) => transform(stage))
  })

  const caseStage = computed(() => caseStages?.value?.[0])

  const otherCases = computed(() => {
    const cases = caseStages?.value?.slice(1, -1)
    if (!cases) {
      return transitionHistory.value ? [transitionHistory.value] : undefined
    }

    if (transitionHistory.value) {
      return [...cases, transitionHistory.value]
    }
    return cases
  })

  const lastCase = computed(() => {
    return caseStages?.value?.slice(-1)?.[0]
  })

  const caseTitle = computed(() => {
    const target = data.value?.applicationStages.find(
      (application: ApplicationForm) => application.metadata.applicationStage.isCurrent
    )
    if (!target) return undefined
    return getFormTitle(target)
  })

  const caseStageId = computed(
    () => data.value.applicationStages?.[0]?.metadata?.applicationStage?.id
  )

  const caseReference = computed(() => data.value?.application?.data?.reference)

  function transform(data: Form & { data?: FormData }) {
    const forms = transformForm(data)
    return {
      forms,
      values: transformFormValues(data?.data),
      title: getFormTitle(data)
    }
  }
  return {
    data,
    lastCase,
    caseDetail,
    caseStage,
    otherCases,
    caseTitle,
    caseStageId,
    caseReference,
    isFetchingTransitionHistory,
    ...fetch
  }
}
