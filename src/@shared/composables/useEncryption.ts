import sodium, { base64_variants } from 'libsodium-wrappers'

import { log } from '@shared/utils/logger'

export const useEncryption = () => {
  /**
   * Decrypts data with a private key
   * @param {sodium.KeyPair|string} keyPair Key pair
   * @param {Uint8Array} data
   * @returns {*} decrypted data
   */
  async function decrypt(
    data: Uint8Array | string,
    keyPair: sodium.KeyPair
  ): Promise<Uint8Array | undefined> {
    await sodium.ready

    try {
      if (typeof data === 'string') {
        data = sodium.from_base64(data, base64_variants.ORIGINAL)
      }
      return sodium.crypto_box_seal_open(data, keyPair.publicKey, keyPair.privateKey)
    } catch (error) {
      log('Decryption error:', error)
    }
  }

  /**
   * Encrypts data with a public key
   * @param {CryptoKey} publicKey
   * @param {string} data
   * @returns encrypted data
   */
  async function encrypt(publicKey: string, data: string): Promise<Uint8Array | undefined> {
    const key = sodium.from_base64(publicKey, base64_variants.ORIGINAL)
    const encryptedData = sodium.crypto_box_seal(data, key)

    try {
      return encryptedData
    } catch (error) {
      log('Encryption error:', error)
    }
  }

  /**
   * Generates a key pair
   * @returns {sodium.KeyPair} key pair
   */
  async function generateKeyPair(): Promise<sodium.KeyPair> {
    await sodium.ready
    return sodium.crypto_box_keypair()
  }

  /**
   * Returns the Base64 encoded public key for a given key pair
   * @param {sodium.KeyPair} keyPair
   * @returns {string} Base64 encoded public key
   */
  async function getPublicKey(keyPair: sodium.KeyPair): Promise<string> {
    await sodium.ready
    return sodium.to_base64(keyPair.publicKey, sodium.base64_variants.ORIGINAL)
  }

  return {
    decrypt,
    encrypt,
    generateKeyPair,
    getPublicKey
  }
}
