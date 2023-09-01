import type { Ref } from 'vue'
import type { Form, FormData, FormResult } from '@shared/types/form'
import { computed, ref, watch } from 'vue'
import { useApiFormsUrl } from '@shared/composables/useApiUrl'
import { useFetch } from '@vueuse/core'
import { transformForm, getFormTitle } from '@shared/utils/form'

export const useFetchForm = (id: string) => {
  const title: Ref<string> = ref('')
  const forms: Ref<Form[]> = ref([])
  const values: Ref<FormData | undefined> = ref(undefined)

  const url = computed(() => useApiFormsUrl(id))

  const { data, ...fetch } = useFetch<FormResult>(url).json()

  watch(data, data => {
    if (!data) {
      title.value = ''
      forms.value = []
      values.value = undefined
      return
    }
    const { title: formTitle, dataschema, uischema, values: formValues } = data
    forms.value = transformForm({ title: formTitle, dataschema, uischema })
    title.value = getFormTitle(data)
    values.value = formValues
    console.log(formValues)
  })

  return {
    title,
    forms,
    values,
    ...fetch
  }
}
