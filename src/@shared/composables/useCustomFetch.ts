import type { MaybeRefOrGetter } from 'vue'
import type { CustomFetch } from '@shared/types/fetch'
import { CustomFetchType } from '@shared/types/fetch'

import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import { useFetchWithEncryption } from '@shared/composables/useFetchWithEncryption'

export type UseFetchConfig = {
  refetch?: boolean
  immediate?: boolean
}

export const useCustomFetch = (
  type: CustomFetch = CustomFetchType.CREDENTIALS,
  url: MaybeRefOrGetter<string>,
  useFetchOptions?: RequestInit,
  fetchOptions?: UseFetchConfig
) => {
  if (type === CustomFetchType.CREDENTIALS) {
    return useFetchWithCredentials(url, useFetchOptions, fetchOptions)
  } else {
    return useFetchWithEncryption(url, useFetchOptions, fetchOptions)
  }
}
