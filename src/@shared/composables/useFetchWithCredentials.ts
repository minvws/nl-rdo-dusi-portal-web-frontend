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

export const useFetchWithCredentials = <T>(
  url: MaybeRefOrGetter<string>,
  fetchOptions?: RequestInit,
  useFetchOptions?: UseFetchOptions
) => {
  const { generateKeyPair, getPublicKey, decrypt } = useEncryption()
  const defaultOptions: Record<string, RequestCredentials> = { credentials: 'include' }
  const defaultUseFetchOptions: UseFetchOptions = { immediate: true }

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
    const isEncrypted = ctx.response.headers.get(ENCRYPTED_HEADER) === 'true'

    if (!keyPair || !isEncrypted) {
      return ctx // not encrypted
    }

    if (typeof ctx.data !== 'string' && !(ctx.data instanceof Uint8Array)) {
      return ctx // unexpected type
    }

    const decryptedData = await decrypt(ctx.data, keyPair)

    if (!(decryptedData instanceof Uint8Array)) {
      return ctx // decryption failed
    }

    ctx.data = decryptedData
    if (ctx.response.headers.get('Content-Type') === 'application/json') {
      const json = new TextDecoder().decode(decryptedData)
      ctx.data = JSON.parse(json)
    } else {
      ctx.data = decryptedData
    }

    return ctx
  }

  const fetchConfig = { ...defaultOptions, ...fetchOptions }
  const useFetchConfig = { ...defaultUseFetchOptions, ...useFetchOptions, beforeFetch, afterFetch }

  return useFetch<T>(url, fetchConfig, useFetchConfig)
}
