const useMockData = import.meta.env.VITE_MOCK_DATA

export const useApiFormsUrl = (id: string | number) => {
  const base = import.meta.env.VITE_API_BASE_URL
  return `${base}/forms/${id}`
}

export const useApiSubsidyUrl = () => {
  if (useMockData) return '../../mock/current-arrangements.json'
  const base = import.meta.env.VITE_API_BASE_URL
  return `${base}/subsidies`
}

export const useApiArrangementsUrl = () => {
  if (useMockData) return '../../mock/current-arrangements.json'
  const base = import.meta.env.VITE_API_BASE_URL
  return `${base}/subsidies`
}

export const useApiMessagesUrl = () => {
  return '../../mock/messages.json'
}

export const useApiRequestsUrl = () => {
  return '../../mock/requests.json'
}

export const useApiRequestDetail = (id: string) => {
  return `../../mock/${id}.json`
}
