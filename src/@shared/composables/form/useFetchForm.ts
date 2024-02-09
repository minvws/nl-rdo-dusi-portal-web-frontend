import type { Form, FormData, FormResult } from '@shared/types/form'

import { computed, ref, watch } from 'vue'
import { useApiFormsUrl } from '@shared/composables/useApiUrl'
import { transformForm, getFormTitle, transformFormValues } from '@shared/utils/form'
import { useFetchWithEncryption } from '@shared/composables/useFetchWithEncryption'

export const useFetchForm = (
  { id, values }: { id: string; values?: FormData },
  readonly?: boolean
) => {
  const title = ref<string>('')
  const forms = ref<Form[]>([])
  const formData = ref<FormData | undefined>(undefined)

  const url = computed<string>(() => useApiFormsUrl(id))

  const { data, ...fetch } = useFetchWithEncryption<FormResult>(url).json()

  watch(data, (data) => {
    if (!data) {
      title.value = ''
      forms.value = []
      formData.value = undefined
      return
    }
    const { title: formTitle, dataschema, uischema, viewschema, values: formValues } = data
    forms.value = readonly
      ? [{ dataschema, uischema: viewschema }]
      : transformForm({ title: formTitle, dataschema, uischema })
    title.value = getFormTitle(data)
    formData.value = transformFormValues(values ?? formValues)
  })

  return {
    title,
    forms,
    values: formData,
    ...fetch
  }
}
