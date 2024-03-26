import type { Form, FormData, FormResult } from '@shared/types/form'

import { computed, ref, watch } from 'vue'

import { useApiEditFormUrl } from '@shared/composables/useApiUrl'
import { useFetchWithEncryption } from '@shared/composables/useFetchWithEncryption'

import { transformForm, getFormTitle, transformFormValues } from '@shared/utils/form'

type Props = {
  edit?: boolean
  id: string
  values?: FormData
}

export const useFetchForm = ({ id, values, edit }: Props, readonly?: boolean) => {
  const title = ref<string>('')
  const forms = ref<Form[]>([])
  const formData = ref<FormData | undefined>(undefined)
  const formId = ref<string | undefined>(undefined)

  const url = computed<string>(() => useApiEditFormUrl(id))

  const { data, ...fetch } = useFetchWithEncryption<FormResult>(url).json()

  watch(data, (data) => {
    if (!data) {
      title.value = ''
      forms.value = []
      formData.value = undefined
      return
    }
    const {
      title: formTitle,
      dataschema,
      uischema,
      viewschema,
      values: formValues,
      metadata
    } = data
    forms.value = readonly
      ? [{ dataschema, uischema: viewschema }]
      : transformForm({ title: formTitle, dataschema, uischema })
    title.value = getFormTitle(data)
    formData.value = transformFormValues(values ?? formValues)
    formId.value = metadata?.id
  })

  return {
    id: formId,
    title,
    forms,
    values: formData,
    ...fetch
  }
}
