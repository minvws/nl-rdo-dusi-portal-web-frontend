import type { FormOptions } from '@shared/types/form-options'
import { Project } from '@shared/types/project'
declare global {
  interface Window {
    config?: {
      api?: string
    }
  }
}

const useMockData = import.meta.env.VITE_MOCK_DATA === 'true'

const getBaseUrl = () => {
  if (window?.config?.api) return window.config.api
  if (import.meta.env.VITE_PROJECT === Project.PORTAL)
    return import.meta.env.VITE_PORTAL_API_BASE_URL
  if (import.meta.env.VITE_PROJECT === Project.ASSESSMENT)
    return import.meta.env.VITE_ASSESSMENT_API_BASE_URL
  throw new Error('no base url is set')
}
const baseUrl = getBaseUrl()

export const useApiFilterOptionsUrl = (type: FormOptions) => {
  if (useMockData) return `../../mock/shared/filter-options/${type}.json`
  return `${baseUrl}/api/ui/applications/${type}-filter`
}
