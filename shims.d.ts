export {}

declare global {
  interface Window {
    config?: {
      api?: string
      formEncryptionPublicKey?: string
    }
  }
}
