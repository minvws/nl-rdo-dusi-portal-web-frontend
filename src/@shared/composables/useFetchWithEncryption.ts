import type {
  AfterFetchContext,
  BeforeFetchContext,
  MaybeRefOrGetter,
  OnFetchErrorContext,
  UseFetchOptions
} from '@vueuse/core'

import { useFetch } from '@vueuse/core'
import { useEncryption } from '@shared/composables/useEncryption'
import { useSessionLifetimeStore } from '@shared/store/useSessionLifetimeStore'

import type { KeyPair } from 'libsodium-wrappers'

const PUBLIC_KEY_HEADER: string = import.meta.env.VITE_PUBLIC_KEY_HEADER
const ENCRYPTED_HEADER: string = import.meta.env.VITE_ENCRYPTED_HEADER

const useCredentials = !import.meta.env.PROD

type DecryptResponse = {
  ctx: {
    data: any
    response: Response | undefined
    error?: any
  }
  keyPair: KeyPair | undefined
}

async function decryptResponse({ ctx, keyPair }: DecryptResponse) {
  const { decrypt } = useEncryption()
  const { data, response } = ctx
  const headers = response?.headers

  const isEncrypted = headers?.get(ENCRYPTED_HEADER) === 'true'
  const isJson = headers?.get('content-type')?.includes('application/json')

  const notTypedArray = !(data instanceof Uint8Array)
  const notBlob = !(data instanceof Blob)
  const notString = typeof data !== 'string'
  const unexpectedType = notString && notTypedArray && notBlob

  if (!keyPair || !isEncrypted || unexpectedType) {
    return undefined
  }

  const decryptedData = await decrypt(data, keyPair)

  if (!(decryptedData instanceof Uint8Array)) {
    return undefined // decryption failed
  }

  if (isJson) {
    const json = new TextDecoder().decode(decryptedData)
    return JSON.parse(json)
  }

  return decryptedData
}

export const useFetchWithEncryption = <T>(
  url: MaybeRefOrGetter<string>,
  fetchOptions?: RequestInit,
  useFetchOptions?: UseFetchOptions
) => {
  const sessionLifetimeStore = useSessionLifetimeStore()
  const { generateKeyPair, getPublicKey } = useEncryption()
  const defaultOptions: Record<string, RequestCredentials> = useCredentials
    ? { credentials: 'include' }
    : {}
  const defaultUseFetchOptions: UseFetchOptions = { immediate: true, updateDataOnError: true }

  let keyPair: KeyPair | undefined

  // Reference: https://vueuse.org/core/useFetch/#intercepting-a-request
  async function beforeFetch({ options }: BeforeFetchContext) {
    keyPair = await generateKeyPair()
    const publicKey = await getPublicKey(keyPair)

    options.headers = {
      ...options.headers,
      [PUBLIC_KEY_HEADER]: publicKey
    }

    return {
      options
    }
  }

  async function afterFetch(ctx: AfterFetchContext) {
    const decryptedResponse = await decryptResponse({ ctx, keyPair })

    if (decryptedResponse) {
      ctx.data = decryptedResponse
    }

    sessionLifetimeStore.extendSession()

    return ctx
  }

  async function onFetchError(ctx: OnFetchErrorContext & { response: Response | null }) {
    const { data, error, response } = ctx
    const context = { data, error, response: response || undefined }
    const decryptedResponse = await decryptResponse({ ctx: context, keyPair })

    if (decryptedResponse) {
      ctx.data = undefined
      ctx.error = decryptedResponse
    }

    return ctx
  }

  const fetchConfig = { ...defaultOptions, ...fetchOptions }
  const useFetchConfig = {
    ...defaultUseFetchOptions,
    ...useFetchOptions,
    beforeFetch,
    afterFetch,
    onFetchError
  }

  return useFetch<T>(url, fetchConfig, useFetchConfig)
}
