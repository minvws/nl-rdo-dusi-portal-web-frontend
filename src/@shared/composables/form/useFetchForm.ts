import type { Ref } from 'vue'
import type { Form, FormData, FormResult } from '@shared/types/form'
import { computed, ref, watch } from 'vue'
import { useApiFormsUrl } from '@shared/composables/useApiUrl'
import { transformForm, getFormTitle } from '@shared/utils/form'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'

export const useFetchForm = ({ id, values }: { id: string; values?: FormData }) => {
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
    forms.value = transformForm({ title: formTitle, dataschema, uischema, viewschema })
    title.value = getFormTitle(data)
    formData.value = values ?? formValues
  })

  return {
    title,
    forms,
    values: formData,
    ...fetch
  }
}
