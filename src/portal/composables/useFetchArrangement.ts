import { computed } from 'vue'
import { useCustomFetch } from '@shared/composables/useCustomFetch'

import { useApiArrangementUrl } from '@portal/composables/useApiUrl'
import { transformSubsidyOverviewApplicationsData } from '@shared/utils/transform'

export const useFetchArrangement = (id: string) => {
  const url = useApiArrangementUrl(id)
  const { data: json, ...fetch } = useCustomFetch('with-encryption', url).json()

  const data = computed(() => (json.value ? transformSubsidyOverviewApplicationsData(json.value) : null))

  return {
    data,
    ...fetch
  }
}
