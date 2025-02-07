import { computed, ref, watch } from 'vue'

import { useFetchSubsidies } from '@assessment/composables/useFetchSubsidies'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import { useApiIbanCheckUrl } from '@assessment/composables/useApiUrl'

import { transformIbanData } from '@shared/utils/transform'

export const useFetchIbanCheck = () => {
  const selectedId = ref<string>('')

  const url = computed<string>(() => useApiIbanCheckUrl(selectedId.value))

  const {
    data: subsidies,
    error: subsidiesError,
    isFetching: isFetchingSubsidies
  } = useFetchSubsidies()

  const {
    data: json,
    execute,
    ...fetch
  } = useFetchWithCredentials(url, undefined, { immediate: false }).json()

  const data = computed(() => (json.value ? transformIbanData(json.value.data) : []))

  watch(selectedId, (id) => {
    selectedId.value = id
    execute()
  })

  return {
    data,
    selectedId,
    subsidies,
    subsidiesError,
    isFetchingSubsidies,
    execute,
    ...fetch
  }
}
