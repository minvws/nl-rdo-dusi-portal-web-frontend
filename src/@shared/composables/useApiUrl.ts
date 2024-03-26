import type { FileLink } from '@shared/types/link'
import type { FormOptions } from '@shared/types/form-options'

import { ProjectType } from '@shared/types/project'
import { useMockUrl, useMockData } from '@shared/composables/useMock'

function getBaseUrl() {
  if (window?.config?.api) {
    return window.config.api
  } else if (import.meta.env.VITE_PROJECT === ProjectType.PORTAL) {
    return import.meta.env.VITE_PORTAL_API_BASE_URL
  } else if (import.meta.env.VITE_PROJECT === ProjectType.ASSESSMENT) {
    return import.meta.env.VITE_ASSESSMENT_API_BASE_URL
  } else {
    throw new Error('no base url is set')
  }
}

const baseUrl = getBaseUrl()

const mockUrl = `${useMockUrl()}/shared`

export const useApiDraftFormUrl = (subsidyCode: string) => {
  return `${baseUrl}/api/subsidies/${subsidyCode}/applications`
}

export const useApiFileUrl = (reference?: string, fieldCode?: string) => {
  if (!reference) throw new Error('reference is not set for file upload')
  return `${baseUrl}/api/applications/${reference}/fields/${fieldCode}/files`
}

export const useApiGetFileUrl = ({ reference, fieldCode, id }: FileLink) => {
  return `${useApiFileUrl(reference, fieldCode)}/${id}`
}

export const useApiFilterOptionsUrl = (type: FormOptions) => {
  return useMockData
    ? `${mockUrl}/filter-options/${type}.json`
    : `${baseUrl}/api/ui/applications/${type}-filter`
}

export const useApiFormsSubmitUrl = (id?: string) => {
  if (!id) throw new Error('id is not set for submitting form')
  return `${baseUrl}/api/applications/${id}`
}

export const useApiFormsValidateUrl = (id?: string) => {
  if (!id) throw new Error('id is not set for validating form')
  return `${baseUrl}/api/applications/${id}/validate`
}

export const useApiEditFormUrl = (id: string) => {
  if (!id) throw new Error('id is not set for fetching existing editable form')
  return `${baseUrl}/api/forms/${id}`
}
