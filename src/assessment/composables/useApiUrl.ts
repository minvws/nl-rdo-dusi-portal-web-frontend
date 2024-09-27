import { useMockUrl, useMockData } from '@shared/composables/useMock'
import { ProjectType } from '@shared/types/project'

const baseUrl = window?.config?.api || import.meta.env.VITE_ASSESSMENT_API_BASE_URL
const mockUrl = `${useMockUrl()}/${ProjectType.ASSESSMENT}`

export const useApiAssessorPoolUrl = (id: string) => {
  return `${baseUrl}/api/applications/${id}/assessorpool`
}

export const useApiAssignCaseAssessorUrl = (id: string) => {
  return `${baseUrl}/api/applications/${id}/assign`
}

export const useApiCaseDetailsUrl = (id: string) => {
  return useMockData ? `${mockUrl}/details/${id}.json` : `${baseUrl}/api/applications/${id}`
}

export const useApiCaseHistoryUrl = (id: string) => {
  return useMockData ? `${mockUrl}/history/${id}.json` : `${baseUrl}/api/applications/${id}/history` // Not final url yet.
}

export const useApiCasesUrl = () => {
  return useMockData ? `${mockUrl}/cases.json` : `${baseUrl}/api/applications`
}

export const useApiCaseReviewerUrl = (id: string) => {
  return useMockData
    ? `${mockUrl}/reviewer/${id}.json`
    : `${baseUrl}/api/applications/${id}/reviewer` // Not final url yet.
}

export const useApiCaseTransitionPreviewUrl = (id: string) => {
  return `${baseUrl}/api/applications/${id}/transition-preview`
}

export const useApiCaseTransitionPreviewSubmitUrl = (id: string) => {
  return `${baseUrl}/api/applications/${id}/submit`
}

export const useApiCsrfCookieUrl = () => {
  return `${baseUrl}/sanctum/csrf-cookie`
}

export const useApiForgotPasswordUrl = () => {
  return `${baseUrl}/api/forgot-password`
}

export const useApiIbanCheckUrl = (id: string) => {
  return useMockData
    ? `${mockUrl}/checks/iban.json`
    : `${baseUrl}/api/subsidies/${id}/bankaccounts/duplicates`
}

export const useApiLoginUrl = () => {
  return `${baseUrl}/api/login`
}

export const useApiLogoutUrl = () => {
  return `${baseUrl}/api/logout`
}

export const useApiMessageDownloadUrl = (id: string, format: string) => {
  return `${baseUrl}/api/messages/${id}/download/${format}`
}

export const useApiPasswordResetUrl = () => {
  return `${baseUrl}/api/reset-password`
}

export const useApiPasswordUpdateUrl = () => {
  return `${baseUrl}/api/user/password`
}

export const useApiPersonalCasesUrl = () => {
  return useMockData ? `${mockUrl}/my-cases.json` : `${baseUrl}/api/applications/assigned` // Not final url yet.
}

export const useApiSetCaseUrl = (id: string) => {
  return `${baseUrl}/api/applications/${id}/assessor`
}

export const useApiSubmitCaseUrl = (id: string) => {
  return `${baseUrl}/api/applications/${id}`
}

export const useApiTransitionHistoryUrl = (id: string) => {
  return useMockData
    ? `${mockUrl}/transitions/mock.json`
    : `${baseUrl}/api/applications/${id}/transitions`
}

export const useApiTwoFactorChallengeUrl = () => {
  return `${baseUrl}/api/two-factor-challenge`
}

export const useApiUserSubsidiesUrl = () => {
  return useMockData ? `${mockUrl}/checks/subsidies.json` : `${baseUrl}/api/user/subsidies`
}

export const useApiUserStatusUrl = () => {
  return `${baseUrl}/api/user`
}

export const useApiDataExportUrl = () => {
  return useMockData ? `${mockUrl}/export/fdc.csv` : `${baseUrl}/api/export/applications`
}

export const useApiDamuDataExportUrl = () => {
  return `${baseUrl}/api/export/applications/damu`
}
