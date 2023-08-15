declare global {
  interface Window {
    config?: {
      api?: string
    }
  }
}
const baseUrl = window?.config?.api || import.meta.env.VITE_API_BASE_URL
const useMockData = import.meta.env.VITE_MOCK_DATA === 'true'

export const useApiActiveRequestsUrl = () => {
  if (useMockData) return '../../mock/portal/requests.json'
  return `${baseUrl}/api/requests`
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

export const useApiFormsUrl = (id: string | number) => {
  return `${baseUrl}/api/forms/${id}`
}

export const useApiLoginUrl = () => {
  return `${baseUrl}/oidc/login`
}

export const useApiLogoutUrl = () => {
  return `${baseUrl}/api/user/logout`
}

export const useApiMessagesUrl = () => {
  if (useMockData) return '../../mock/portal/messages.json'
  return `${baseUrl}/api/messages`
}

export const useApiMyAssessmentRequestsUrl = () => {
  if (useMockData) return '../../mock/assessment/my-requests.json'
  return `${baseUrl}/api/my-requests`
}

export const useApiRequestDetail = (id: string) => {
  return `../../mock/${id}.json`
}

export const useApiRequestDetailsUrl = (id: string) => {
  if (useMockData) return `../../mock/assessment/details/${id}.json`
  return `${baseUrl}/api/requests/${id}`
}

export const useApiAssessmentRequestsUrl = () => {
  if (useMockData) return '../../mock/assessment/requests.json'
  // @TODO: Remove this when the API is ready
  return 'http://localhost:8002/api/applications'
}

export const useApiSubsidyUrl = () => {
  return `${baseUrl}/api/subsidies`
}

export const useApiUserStatusUrl = () => {
  return `${baseUrl}/api/user/info`
}
