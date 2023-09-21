import type { Ref } from 'vue'
import type { Form, FormData } from '@shared/types/form'
import { computed, ref, watch } from 'vue'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import { useApiCaseDetailsUrl } from '@assessment/composables/useApiUrl'

import { formatCaseDetailsData } from '@shared/utils/format'

import type { ApplicationDetails, ApplicationForm, Case, CaseStage } from "@shared/types/cases"
import { Stage } from '@shared/types/stages'

import { transformForm } from '@shared/utils/form'

export const useFetchCaseDetails = (id: string) => {
  const forms: Ref<Form[]> = ref([])
  const values: Ref<FormData | undefined> = ref(undefined)
  const url = useApiCaseDetailsUrl(id)
  const { data: json, ...fetch } = useFetchWithCredentials(url).json()

  const data = computed(() => (json.value ? getCaseDetails(json.value.data) : {}) as ApplicationForm)

  const details = computed(() => formatCaseDetailsData(data.value))

  function getCaseDetails(data: ApplicationDetails) {
    return data.applicationStages[0]
  }

  watch(data, data => {
    if (!data) {
      return
    }

    const { dataschema, uischema, data: formValues } = data
    forms.value = transformForm({ dataschema, uischema })
    values.value = formValues
  })

  return {
    data: details,
    forms,
    values,
    ...fetch
  }
}
