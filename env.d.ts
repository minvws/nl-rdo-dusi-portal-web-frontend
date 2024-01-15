/// <reference types="vite/client" />

// Reference: https://vitejs.dev/guide/env-and-mode
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_ASSESSMENT_API_BASE_URL: string
  readonly VITE_BASE_URL: string
  readonly VITE_DISABLE_LOGIN_REDIRECT_HOME: boolean
  readonly VITE_ENCRYPTED_HEADER: string
  readonly VITE_FORM_PUBLIC_KEY: string
  readonly VITE_MOCK_DATA: boolean
  readonly VITE_PORTAL_API_BASE_URL: string
  readonly VITE_PORTAL_LOCAL_FORMS: boolean
  readonly VITE_PUBLIC_KEY_HEADER: string
  readonly VITE_SESSION_DURATION: number
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
