import type { Ref } from 'vue'
import type { Form } from '@shared/types/form'
import { computed, ref, watch } from 'vue'
import { useFetch } from '@vueuse/core'

import { useApiCaseDetailsUrl } from '@/assessment/composables/useApiUrl'

import { formatDetailsData } from '@shared/utils/format'

import type { Case, CaseStage } from '@shared/types/cases'
import { Stage } from '@shared/types/stages'

import { transformForm } from '@shared/utils/form'

export const useFetchCaseDetails = (id: string) => {
  const forms: Ref<Form[]> = ref([])
  const url = useApiCaseDetailsUrl(id)
  const { data: json, ...fetch } = useFetch(url).json()

  const data = computed(() => (json.value ? getCaseDetails(json.value.data) : {}) as CaseStage)

  const details = computed(() => formatDetailsData(data.value))

  function getCaseDetails(data: Case) {
    return data.stages.find((stage: CaseStage) => stage.metadata.title === Stage.REQUEST) || {}
  }

  watch(data, data => {
    if (!data) {
      return
    }

    const { dataschema, uischema } = data
    forms.value = transformForm({ dataschema, uischema })
  })

  return {
    data: details,
    forms,
    ...fetch
  }
}
