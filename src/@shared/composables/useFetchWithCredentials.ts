import type { MaybeRefOrGetter, UseFetchOptions } from '@vueuse/core'

import { useFetch } from '@vueuse/core'
import cookie from 'js-cookie'

const useCredentials = !import.meta.env.PROD

export const useFetchWithCredentials = <T>(
  url: MaybeRefOrGetter<string>,
  fetchOptions?: RequestInit,
  useFetchOptions?: UseFetchOptions
) => {
  const defaultUseFetchOptions: UseFetchOptions = { immediate: true, updateDataOnError: true }
  const defaultOptions: Record<string, RequestCredentials> = useCredentials
    ? { credentials: 'include' }
    : {}

  const token = cookie.get('XSRF-TOKEN')
  const headers = { headers: { ...fetchOptions?.headers, ...(token && { 'X-XSRF-TOKEN': token }) } }

  const fetchConfig: RequestInit = {
    ...defaultOptions,
    ...fetchOptions,
    ...headers
  }
  const useFetchConfig: UseFetchOptions = {
    ...defaultUseFetchOptions,
    ...useFetchOptions
  }

  return useFetch<T>(url, fetchConfig, useFetchConfig)
}
