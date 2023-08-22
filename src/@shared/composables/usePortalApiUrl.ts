import type { FormOptions } from '@shared/types/form-options'
declare global {
  interface Window {
    config?: {
      api?: string
    }
  }
}

const baseUrl = window?.config?.api || import.meta.env.VITE_PORTAL_API_BASE_URL
const mockUrl = '../../mock/portal'
const useMockData = import.meta.env.VITE_MOCK_DATA === 'true'

export const useApiActiveRequestsUrl = () => {
  return useMockData ? `${mockUrl}/requests.json` : `${baseUrl}/api/requests`
}

export const useApiDraftFormUrl = (id: string) => {
  return `${baseUrl}/api/forms/${id}/applications`
}

export const useApiFileUrl = (id: string) => {
  return `${baseUrl}/api/applications/${id}/files`
}

export const useApiFormsSubmitUrl = (id: string) => {
  return `${baseUrl}/api/applications/${id}`
}

export const useApiLoginUrl = () => {
  return `${baseUrl}/oidc/login`
}

export const useApiLogoutUrl = () => {
  return `${baseUrl}/api/user/logout`
}

export const useApiMessagesUrl = () => {
  return useMockData ? `${mockUrl}/messages.json` : `${baseUrl}/api/messages`
}

export const useApiSubsidyUrl = () => {
  return `${baseUrl}/api/subsidies`
}

export const useApiUserStatusUrl = () => {
  return `${baseUrl}/api/user/info`
}

export const useApiRequestDetail = (id: string) => {
  return useMockData ? `${mockUrl}/details/${id}.json` : `${baseUrl}/api/requests/${id}` // Not final url yet.
}

export const useApiFilterOptionsUrl = (type: FormOptions) => {
  if (useMockData) return `../../mock/shared/filter-options/${type}.json`
  // @TODO: set correct baseUrl
  return 'http://localhost:8002/api/applicationfilterui'
}
