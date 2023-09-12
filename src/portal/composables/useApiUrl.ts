import { useMockUrl, useMockData } from '@shared/composables/useMock'
import { Project } from '@shared/types/project'
import type { config } from '@shared/types/window'

declare global {
  type Window = config
}

const baseUrl = window?.config?.api || import.meta.env.VITE_PORTAL_API_BASE_URL
const mockUrl = `${useMockUrl()}/${Project.PORTAL}`

export const useApiActionsCountUrl = () => {
  return useMockData ? `${mockUrl}/actions-count.json` : `${baseUrl}/api/actionables/counts`
}

export const useApiActiveRequestsUrl = () => {
  return useMockData ? `${mockUrl}/requests.json` : `${baseUrl}/api/applications`
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
