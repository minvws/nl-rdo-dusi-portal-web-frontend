declare global {
  interface Window {
      config?: {
        api?: string
      };
  }
}
const baseUrl = window?.config?.api || import.meta.env.VITE_API_BASE_URL
const useMockData = import.meta.env.VITE_MOCK_DATA

export const useApiDraftFormUrl = (id: string) => {
  return `${baseUrl}/api/forms/${id}/applications`
}

export const useApiFileUrl = (id: string) => {
  return `${baseUrl}/api/applications/${id}/files`
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

export const useApiFormsUrl = (id: string | number) => {
  return `${baseUrl}/api/forms/${id}`
}

export const useApiFormsSubmitUrl = (id: string) => {
  return `${baseUrl}/api/applications/${id}`
}

export const useApiSubsidyUrl = () => {
  return `${baseUrl}/api/subsidies`
}

export const useApiMessagesUrl = () => {
  if (useMockData) return '../../mock/messages.json'
  return `${baseUrl}/api/messages`
}

export const useApiRequestsUrl = () => {
  if (useMockData) return '../../mock/requests.json'
  return `${baseUrl}/api/requests`
}

export const useApiRequestDetail = (id: string) => {
  return `../../mock/${id}.json`
}
