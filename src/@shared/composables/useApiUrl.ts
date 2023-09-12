import type { FormOptions } from '@shared/types/form-options'
import { Project } from '@shared/types/project'
import { useMockUrl, useMockData } from '@shared/composables/useMock'
import type { config } from '@shared/types/window'

declare global {
  // eslint-disable-next-line
  interface Window extends config {}
}

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

const mockUrl = `${useMockUrl()}/shared`

export const useApiDraftFormUrl = (id: string) => {
  return `${baseUrl}/api/forms/${id}/applications`
}

export const useApiFileUrl = (id?: string) => {
  if (!id) throw new Error('id is not set for file upload')
  return `${baseUrl}/api/applications/${id}/files`
}

export const useApiFilterOptionsUrl = (type: FormOptions) => {
  return useMockData
    ? `${mockUrl}/filter-options/${type}.json`
    : `${baseUrl}/api/ui/applications/${type}-filter`
}

export const useApiFormsSubmitUrl = (id?: string) => {
  if (!id) throw new Error('id is not set for submitting form')
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
