declare global {
  interface Window {
    config?: {
      api?: string
    }
  }
}

const baseUrl = window?.config?.api || import.meta.env.VITE_PORTAL_API_BASE_URL

export const useApiFormsUrl = (id: string | number) => {
  return `${baseUrl}/api/forms/${id}`
}
