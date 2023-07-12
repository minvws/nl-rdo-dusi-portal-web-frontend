const useMockData = import.meta.env.VITE_MOCK_DATA
const baseUrl = import.meta.env.VITE_API_BASE_URL

export const useApiFormsUrl = (id: string | number) => {
  return `${baseUrl}/forms/${id}`
}

export const useApiSubsidyUrl = () => {
  return `${baseUrl}/subsidies`
}

export const useApiMessagesUrl = () => {
  if (useMockData) return '../../mock/messages.json'
  return `${baseUrl}/messages`
}

export const useApiRequestsUrl = () => {
  if (useMockData) return '../../mock/requests.json'
  return `${baseUrl}/requests`
}

export const useApiRequestDetail = (id: string) => {
  return `../../mock/${id}.json`
}
