import { translate } from '@shared/i18n'

import { RequestStatus as Status } from '@shared/types/request'

import { MY_REQUEST_STATUS, MY_REQUEST_EDIT } from '@portal/router/names'
import { REVIEW_CASE } from '@assessment/router/names'

const transformRequestStatus = (id: string) => {
  return Object.values(Status).reduce(
    (cul, key) => {
      const value = translate(`requestStatus.${id}.${key}`) ?? ''
      return { ...cul, [key]: value }
    },
    {} as Record<string, string>
  )
}

export const statusToIcon: Record<string, string> = {
  [Status.APPROVED]: 'confirmation',
  [Status.DRAFT]: 'warning',
  [Status.REJECTED]: 'error',
  [Status.REQUEST_CHANGES]: 'warning',
  [Status.SUBMITTED]: ''
}

export const caseStatusToRouteName: Record<string, string> = {
  [Status.APPROVED]: REVIEW_CASE,
  [Status.DRAFT]: REVIEW_CASE,
  [Status.REJECTED]: REVIEW_CASE,
  [Status.REQUEST_CHANGES]: REVIEW_CASE,
  [Status.SUBMITTED]: REVIEW_CASE
}

export const requestStatusToRouteName: Record<string, string> = {
  [Status.APPROVED]: MY_REQUEST_STATUS,
  [Status.DRAFT]: MY_REQUEST_EDIT,
  [Status.REJECTED]: MY_REQUEST_STATUS,
  [Status.REQUEST_CHANGES]: MY_REQUEST_EDIT,
  [Status.SUBMITTED]: MY_REQUEST_STATUS
}

export const statusToRequiredAction: Record<string, string> = transformRequestStatus('action')
export const caseStatusToTranslation: Record<string, string> = transformRequestStatus('status')
export const requestStatusToTranslation: Record<string, string> = transformRequestStatus('status')
export const statusToRouteText: Record<string, string> = transformRequestStatus('route')
