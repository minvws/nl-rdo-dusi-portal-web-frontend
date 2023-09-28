import type { MaybeRefOrGetter } from 'vue'

import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import { useFetchWithEncryption } from '@shared/composables/useFetchWithEncryption'

export type UseFetchConfig = {
  refetch?: boolean
  immediate?: boolean
}

export const useCustomFetch = (
  type: 'with-credentials' | 'with-encryption' = 'with-credentials',
  url: MaybeRefOrGetter<string>,
  useFetchOptions?: RequestInit,
  fetchOptions?: UseFetchConfig
) => {
  if (type === 'with-encryption') {
    return useFetchWithEncryption(url, useFetchOptions, fetchOptions)
  } else {
    return useFetchWithCredentials(url, useFetchOptions, fetchOptions)
  }
}
