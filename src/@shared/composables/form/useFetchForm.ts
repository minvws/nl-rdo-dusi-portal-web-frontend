import type { Ref } from 'vue'
import type { Form, FormData, FormResult } from '@shared/types/form'
import { computed, ref, watch } from 'vue'
import { useApiFormsUrl } from '@shared/composables/useApiUrl'
import { transformForm, getFormTitle, transformFormValues } from '@shared/utils/form'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'

export const useFetchForm = (
  { id, values }: { id: string; values?: FormData },
  readonly?: boolean
) => {
  const title: Ref<string> = ref('')
  const forms: Ref<Form[]> = ref([])
  const formData: Ref<FormData | undefined> = ref(undefined)

  const url = computed(() => useApiFormsUrl(id))

  const { data, ...fetch } = useFetchWithCredentials<FormResult>(url).json()

  watch(data, data => {
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
