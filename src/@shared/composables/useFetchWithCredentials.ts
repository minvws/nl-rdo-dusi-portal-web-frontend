import type { MaybeRefOrGetter, UseFetchOptions } from '@vueuse/core'

import { useFetch } from '@vueuse/core'

const useCredendials = !import.meta.env.PROD

export const useFetchWithCredentials = <T>(
  url: MaybeRefOrGetter<string>,
  fetchOptions?: RequestInit,
  useFetchOptions?: UseFetchOptions
) => {
  const defaultOptions: Record<string, RequestCredentials> = useCredendials ? { credentials: 'include' } : {}
  const defaultUseFetchOptions: UseFetchOptions = { immediate: true, updateDataOnError: true }

  const fetchConfig = { ...defaultOptions, ...fetchOptions }
  const useFetchConfig = {
    ...defaultUseFetchOptions,
    ...useFetchOptions,
  }

  return useFetch<T>(url, fetchConfig, useFetchConfig)
}
