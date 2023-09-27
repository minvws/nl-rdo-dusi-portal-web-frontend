import type { ComputedRef } from 'vue'
import { Project } from '@shared/types/project'

import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import { useFetchWithEncryption } from '@shared/composables/useFetchWithEncryption'

export type UseFetchConfig = {
  refetch?: boolean
  immediate?: boolean
}

export const useCustomFetch = (
  url: string | ComputedRef<string>,
  useFetchOptions?: RequestInit,
  fetchOptions?: UseFetchConfig
) => {
  if (import.meta.env.VITE_PROJECT === Project.PORTAL) {
    console.log('useFetchWithEncryption')
    return useFetchWithEncryption(url, useFetchOptions, fetchOptions)
  } else {
    console.log('useFetchWithEncryption')
    return useFetchWithCredentials(url, useFetchOptions, fetchOptions)
  }
}
