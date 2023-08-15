declare global {
  interface Window {
    config?: {
      api?: string
    }
  }
}

const baseUrl = window?.config?.api || import.meta.env.VITE_ASSESSMENT_API_BASE_URL
const useMockData = import.meta.env.VITE_MOCK_DATA === 'true'

export const useApiMyAssessmentRequestsUrl = () => {
  return useMockData ? '../../mock/assessment/my-requests.json' : `${baseUrl}/api/applications/`
}

export const useApiAssessmentDetailsUrl = (id: string) => {
  return useMockData
    ? `../../mock/assessment/details/${id}.json`
    : `${baseUrl}/api/applications/${id}`
}

export const useApiAssessmentRequestsUrl = () => {
  return useMockData ? '../../mock/assessment/requests.json' : `${baseUrl}/api/applications` // Not final url yet.
}
