import { computed } from 'vue'
import { useCustomFetch } from '@shared/composables/useCustomFetch'
import { useApiRequestDetailsUrl } from '@portal/composables/useApiUrl'
import { transformFormValues } from '@shared/utils/form'

export const useFetchRequestDetails = (reference: string) => {
  const url = useApiRequestDetailsUrl(reference)
  const { data: json, ...fetch } = useCustomFetch('with-encryption', url, undefined).json()

  const data = computed(() => json.value || {})
  const values = computed(() => transformFormValues(data.value?.data))

  return {
    data,
    values,
    ...fetch
  }
}
