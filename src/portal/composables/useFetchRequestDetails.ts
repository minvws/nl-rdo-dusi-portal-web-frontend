import { computed } from 'vue'
import { useFetchWithEncryption } from '@shared/composables/useFetchWithEncryption'
import { useApiRequestDetailsUrl } from '@portal/composables/useApiUrl'
import { transformFormValues } from '@shared/utils/form'

export const useFetchRequestDetails = (reference: string) => {
  const url = useApiRequestDetailsUrl(reference)
  const { data: json, ...fetch } = useFetchWithEncryption(url).json()

  const data = computed(() => (json.value ? json.value : {}))
  const values = computed(() => transformFormValues(data.value?.data))

  return {
    data,
    values,
    ...fetch
  }
}
