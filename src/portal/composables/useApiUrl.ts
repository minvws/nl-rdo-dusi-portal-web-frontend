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

export const useApiMessagesUrl = () => {
  return useMockData ? `${mockUrl}/messages.json` : `${baseUrl}/api/messages`
}

export const useApiSubsidyUrl = () => {
  return `${baseUrl}/api/subsidies`
}

export const useApiRequestDetail = (id: string) => {
  return useMockData ? `${mockUrl}/details/${id}.json` : `${baseUrl}/api/requests/${id}` // Not final url yet.
}
