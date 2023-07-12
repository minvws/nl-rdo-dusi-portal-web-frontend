import type { ComputedRef, Ref } from 'vue'
import { computed, ref } from 'vue'
import type { Form, FormResult } from '@/type/form-types'

import { useApiFormsUrl } from '@/composables/useApiUrl'

export const useLoadForm = () => {
  const data: Ref<Form | undefined> = ref(undefined)
  const error: Ref<string> = ref('')
  const isLoading = ref(false)

  const loadFormById = async (id: string | number) => {
    error.value = ''
    data.value = undefined
    isLoading.value = true

    try {
      const url = useApiFormsUrl(id)
      const response = await fetch(url)
      const json: FormResult = await response.json()
      const { title, dataSchema: schema, uiSchema: uischema } = json

      data.value = {
        title,
        schema,
        uischema
      }
    } catch (e) {
      error.value = `${e}`
    } finally {
      isLoading.value = false
    }
  }

  const forms: ComputedRef<Form[] | undefined> = computed(() => {
    // @TODO:
    // right now the api returns one form
    // create an array of the forms
    if (!data.value) return undefined

    return [data.value]
  })

  const title = computed(() => {
    return data.value?.title
  })

  return {
    forms,
    title,
    error,
    isLoading,
    loadFormById
  }
}
