import type { Ref } from 'vue'
import type { Form, FormResult } from '@shared/types/form'
import { computed, ref, watch } from 'vue'
import { useApiFormsUrl } from '@shared/composables/useApiUrl'
import { useFetch } from '@vueuse/core'
import { transformForm, getFormTitle } from '@shared/utils/form'

export const useFetchForm = (id: string) => {
  const title: Ref<string> = ref('')
  const forms: Ref<Form[]> = ref([])

  const url = computed(() => useApiFormsUrl(id))

  const { data, ...fetch } = useFetch<FormResult>(url).json()

  watch(data, data => {
    if (!data) {
      title.value = ''
      forms.value = []
      return
    }
    const { title: formTitle, dataschema, uischema } = data
    forms.value = transformForm({ title: formTitle, dataschema, uischema })
    title.value = getFormTitle(data)
  })

  return {
    title,
    forms,
    ...fetch
  }
}
