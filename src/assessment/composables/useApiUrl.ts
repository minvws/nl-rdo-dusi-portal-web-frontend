import { useMockUrl, useMockData } from '@shared/composables/useMock'
import { Project } from '@shared/types/project'

const baseUrl = window?.config?.api || import.meta.env.VITE_ASSESSMENT_API_BASE_URL
const mockUrl = `${useMockUrl()}/${Project.ASSESSMENT}`

export const useApiTwoFactorChallengeUrl = () => {
  return `${baseUrl}/api/two-factor-challenge`
}

export const useSubmitCaseUrl = (id: string) => {
  return `${baseUrl}/api/applications/${id}`
}

export const useApiCaseDetailsUrl = (id: string) => {
  return useMockData ? `${mockUrl}/details/${id}.json` : `${baseUrl}/api/applications/${id}`
}

export const useApiCaseHistoryUrl = (id: string) => {
  return useMockData ? `${mockUrl}/history/${id}.json` : `${baseUrl}/api/applications/${id}/history` // Not final url yet.
}

export const useApiCaseReviewerUrl = (id: string) => {
  return useMockData
    ? `${mockUrl}/reviewer/${id}.json`
    : `${baseUrl}/api/applications/${id}/reviewer` // Not final url yet.
}

export const useApiCasesFilterCountUrl = () => {
  return useMockData ? `${mockUrl}/filters.json` : `${baseUrl}/api/ui/applications/count`
}

export const useApiLoginUrl = () => {
  return `${baseUrl}/api/login`
}

export const useApiLogoutUrl = () => {
  return `${baseUrl}/api/logout`
}

export const useApiPersonalCasesUrl = () => {
  return useMockData ? `${mockUrl}/my-cases.json` : `${baseUrl}/api/applications/assigned` // Not final url yet.
}

export const useApiCasesUrl = () => {
  return useMockData ? `${mockUrl}/cases.json` : `${baseUrl}/api/applications`
}

export const useApiUserStatusUrl = () => {
  return `${baseUrl}/api/user`
}
