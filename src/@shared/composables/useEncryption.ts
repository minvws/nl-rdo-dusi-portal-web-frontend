import type { Ref } from 'vue'
import { ref } from 'vue'

import { log } from '@shared/utils/logger'

export const useEncryption = () => {
  const keyPair: Ref<CryptoKeyPair | undefined> = ref(undefined)

  async function decrypt(privateKey: CryptoKey, data: ArrayBuffer) {
    const options = { name: 'RSA-OAEP' }

    try {
      const decryptedData = await crypto.subtle.decrypt(options, privateKey, data)

      return decryptedData
    } catch (error) {
      log('Decryption error:', error)
    }
  }

  async function encrypt(publicKey: CryptoKey, data: string) {
    const options = { name: 'RSA-OAEP' }
    const dataBuffer = new TextEncoder().encode(data)

    try {
      const encryptedData = await crypto.subtle.encrypt(options, publicKey, dataBuffer)
      return encryptedData
    } catch (error) {
      log('Encryption error:', error)
    }
  }

  async function exportKey(key: CryptoKey): Promise<JsonWebKey> {
    const result = await crypto.subtle.exportKey('jwk', key)
    return result
  }

  async function generateKeys() {
    const options: RsaHashedKeyGenParams = {
      name: 'RSA-OAEP',
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    }
    const isExtractable = true
    const keyUsages: KeyUsage[] = ['encrypt', 'decrypt']

    try {
      const result = await crypto.subtle.generateKey(options, isExtractable, keyUsages)
      console.log('result', result)
      keyPair.value = result
      return result
    } catch (error) {
      log('Key pair generation error:', error)
    }
  }

  async function getPublicKey() {
    if (!keyPair.value) {
      return
    }

    try {
      const result = await exportKey(keyPair.value?.publicKey)
      return result
    } catch (error) {
      log('Public key error:', error)
    }
  }

  return {
    decrypt,
    encrypt,
    keyPair,
    generateKeys,
    getPublicKey
  }
}
