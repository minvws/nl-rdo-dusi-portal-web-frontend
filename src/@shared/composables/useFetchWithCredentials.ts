import type { MaybeRefOrGetter, UseFetchOptions, BeforeFetchContext } from '@vueuse/core'
import { useFetch } from '@vueuse/core'

import { useEncryption } from '@shared/composables/useEncryption'

const HEADER = import.meta.env.VITE_PUBLIC_KEY_HEADER

export const useFetchWithCredentials = <T>(
  url: MaybeRefOrGetter<string>,
  fetchOptions?: RequestInit,
  useFetchOptions?: UseFetchOptions
) => {
  const { generateKeyPair, getPublicKey } = useEncryption()
  const defaultOptions: Record<string, RequestCredentials> = { credentials: 'include' }
  const defaultUseFetchOptions: UseFetchOptions = { immediate: true }

  async function beforeFetch({ options, cancel }: BeforeFetchContext) {
    const key = await generateKeyPair().then(() => getPublicKey())

    if (!key) {
      cancel()
    }

    options.headers = {
      ...options.headers,
      ...(key?.n && { [`${HEADER}`]: btoa(key.n) })
    }

    return {
      options
    }
  }

  const fetchConfig = { ...defaultOptions, ...fetchOptions }
  const useFetchConfig = { ...defaultUseFetchOptions, ...useFetchOptions, beforeFetch }

  return useFetch<T>(url, fetchConfig, useFetchConfig)
}
