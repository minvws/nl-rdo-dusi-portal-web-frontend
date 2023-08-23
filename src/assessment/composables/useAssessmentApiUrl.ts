declare global {
  interface Window {
    config?: {
      api?: string
    }
  }
}

const baseUrl = window?.config?.api || import.meta.env.VITE_ASSESSMENT_API_BASE_URL
const mockUrl = '../../mock/assessment'
const useMockData = import.meta.env.VITE_MOCK_DATA === 'true'

export const useApiAssessmentDetailsUrl = (id: string) => {
  return useMockData ? `${mockUrl}/details/${id}.json` : `${baseUrl}/api/applications/${id}`
}

export const useApiAssessmentFilterCountUrl = () => {
  return useMockData ? `${mockUrl}/filters.json` : `${baseUrl}/api/ui/applications/count`
}

export const useApiAssessmentPersonalRequestsUrl = () => {
  return useMockData ? `${mockUrl}/my-requests.json` : `${baseUrl}/api/applications` // Not final url yet.
}

export const useApiAssessmentRequestsUrl = () => {
  return useMockData ? `${mockUrl}/requests.json` : `${baseUrl}/api/applications`
}
