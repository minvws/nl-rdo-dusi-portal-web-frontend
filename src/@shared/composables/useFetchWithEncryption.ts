import type {
  MaybeRefOrGetter,
  UseFetchOptions,
  BeforeFetchContext,
  AfterFetchContext
} from '@vueuse/core'

import { useFetch } from '@vueuse/core'
import { useEncryption } from '@shared/composables/useEncryption'
import sodium from 'libsodium-wrappers'

const PUBLIC_KEY_HEADER = import.meta.env.VITE_PUBLIC_KEY_HEADER
const ENCRYPTED_HEADER = import.meta.env.VITE_ENCRYPTED_HEADER

type DecryptResponse = {
  ctx: AfterFetchContext
  keyPair: sodium.KeyPair | undefined
}

async function decryptResponse({ ctx, keyPair }: DecryptResponse) {
  const { decrypt } = useEncryption()
  const { data, response } = ctx
  const { headers } = response

  const isEncrypted = headers.get(ENCRYPTED_HEADER) === 'true'
  const isJson = headers.get('Content-Type') === 'application/json'

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
  const { generateKeyPair, getPublicKey } = useEncryption()
  const defaultOptions: Record<string, RequestCredentials> = { credentials: 'include' }
  const defaultUseFetchOptions: UseFetchOptions = { immediate: true, updateDataOnError: true }

  let keyPair: sodium.KeyPair | undefined

  // Reference: https://vueuse.org/core/useFetch/#intercepting-a-request
  async function beforeFetch({ options }: BeforeFetchContext) {
    keyPair = await generateKeyPair()
    const publicKey = await getPublicKey(keyPair)

    options.headers = {
      ...options.headers,
      ...{ [`${PUBLIC_KEY_HEADER}`]: publicKey }
    }

    return {
      options
    }
  }

  async function afterFetch(ctx: AfterFetchContext) {
    const data = await decryptResponse({ ctx, keyPair })
    if (data) ctx.data = data
    return ctx
  }

  async function onFetchError(ctx: any) {
    const error = await decryptResponse({ ctx, keyPair })
    if (error) {
      ctx.data = undefined
      ctx.error = error
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
