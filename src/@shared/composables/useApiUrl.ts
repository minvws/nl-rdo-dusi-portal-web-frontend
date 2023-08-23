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

function getBaseUrl() {
  if (window?.config?.api) {
    return window.config.api
  } else if (import.meta.env.VITE_PROJECT === Project.PORTAL) {
    return import.meta.env.VITE_PORTAL_API_BASE_URL
  } else if (import.meta.env.VITE_PROJECT === Project.ASSESSMENT) {
    return import.meta.env.VITE_ASSESSMENT_API_BASE_URL
  } else {
    throw new Error('no base url is set')
  }
}

const baseUrl = getBaseUrl()

export const useApiDraftFormUrl = (id: string) => {
  return `${baseUrl}/api/forms/${id}/applications`
}

export const useApiFileUrl = (id: string) => {
  return `${baseUrl}/api/applications/${id}/files`
}

export const useApiFilterOptionsUrl = (type: FormOptions) => {
  return useMockData
    ? `../../mock/shared/filter-options/${type}.json`
    : `${baseUrl}/api/ui/applications/${type}-filter`
}

export const useApiFormsSubmitUrl = (id: string) => {
  return `${baseUrl}/api/applications/${id}`
}

export const useApiFormsUrl = (id: string | number) => {
  return `${baseUrl}/api/forms/${id}`
}

export const useApiLoginUrl = () => {
  return `${baseUrl}/oidc/login`
}

export const useApiLogoutUrl = () => {
  return `${baseUrl}/api/user/logout`
}

export const useApiUserStatusUrl = () => {
  return `${baseUrl}/api/user/info`
}
