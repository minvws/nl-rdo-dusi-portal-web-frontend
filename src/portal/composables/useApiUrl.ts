import { useMockUrl, useMockData } from '@shared/composables/useMock'
import { ProjectType } from '@shared/types/project'

const baseUrl = window?.config?.api || import.meta.env.VITE_PORTAL_API_BASE_URL
const mockUrl = `${useMockUrl()}/${ProjectType.PORTAL}`

export const useApiArrangementUrl = (id: string) => {
  return useMockData ? `${mockUrl}/subsidy/${id}.json` : `${baseUrl}/api/subsidies/${id}`
}

export const useApiActionsCountUrl = () => {
  return useMockData ? `${mockUrl}/actions-count.json` : `${baseUrl}/api/actionables/counts`
}

export const useApiRequestsUrl = () => {
  return useMockData ? `${mockUrl}/requests.json` : `${baseUrl}/api/applications`
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

export const useApiMessageDetailsUrl = (id: string) => {
  return useMockData ? `${mockUrl}/messages/${id}.json` : `${baseUrl}/api/messages/${id}`
}

export const useApiMessageDownloadUrl = (id: string, format: string) => {
  return `${baseUrl}/api/messages/${id}/download/${format}`
}

export const useApiRequestDetailsUrl = (id: string) => {
  return useMockData ? `${mockUrl}/requests/${id}.json` : `${baseUrl}/api/applications/${id}`
}

export const useApiRequestPersonalDetailsUrl = () => {
  return useMockData ? `${mockUrl}/personal-data.json` : `${baseUrl}/api/personal-details`
}

export const useApiRequestEditPersonalDetailsUrl = () => {
  return useMockData ? `${mockUrl}/edit-personal-data.json` : `${baseUrl}/api/personal-details`
}

export const useApiUserStatusUrl = () => {
  return `${baseUrl}/api/user/info`
}
