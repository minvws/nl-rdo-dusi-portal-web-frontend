import type { Form } from '@shared/types/form'
import type { FormOptions } from '@shared/types/form-options'
import { ref, watch, type Ref } from 'vue'
import { useFetch } from '@vueuse/core'
import { useApiFilterOptionsUrl } from '@shared/composables/useApiUrl'

export const useFetchFilterOptions = (type: FormOptions) => {
  const url = useApiFilterOptionsUrl(type)
  const { data, error, isFetching } = useFetch(url).json()
  const forms: Ref<Form[] | undefined> = ref(undefined)

  watch(data, ({ data }: { data: Form | Form[] }) => {
    forms.value = Array.isArray(data) ? data : [data]
  })

  watch(error, () => {
    forms.value = undefined
  })

  return {
    data,
    error,
    forms,
    isFetching
  }
}
