import { t } from '@shared/i18n'

import { RequestStatus as Status } from '@shared/types/request'

import { MY_REQUEST_STATUS, MY_REQUEST_EDIT } from '@portal/router/names'
import { ReviewerActionType } from '@shared/types/reviewer'
import { REVIEW_CASE } from '@assessment/router/names'

function transformRequestStatus(id: string) {
  let acc: Record<string, string> = {}

  for (const key of Object.values(Status)) {
    const value = t(`requestStatus.${id}.${key}`) ?? ''
    acc[key] = value
  }

  return acc
}

function transfromReviewerActions() {
  let acc: Record<string, string> = {}

  for (const key of Object.values(ReviewerActionType)) {
    const value = t(`reviewerAction.${key}`) ?? ''
    acc[key] = value
  }

  return acc
}

export const statusToStep: Record<string, number> = {
  [Status.ALLOCATED]: 3,
  [Status.APPROVED]: 3,
  [Status.DRAFT]: 1,
  [Status.PENDING]: 1,
  [Status.REJECTED]: 3,
  [Status.RECLAIMED]: 3,
  [Status.REQUEST_CHANGES]: 1
}

export const statusToIcon: Record<string, string> = {
  [Status.ALLOCATED]: 'confirmation',
  [Status.APPROVED]: 'confirmation',
  [Status.DRAFT]: 'warning',
  [Status.PENDING]: '',
  [Status.REJECTED]: 'error',
  [Status.RECLAIMED]: 'error',
  [Status.REQUEST_CHANGES]: 'warning'
}

export const caseStatusToRouteName: Record<string, string> = {
  [Status.ALLOCATED]: REVIEW_CASE,
  [Status.APPROVED]: REVIEW_CASE,
  [Status.DRAFT]: REVIEW_CASE,
  [Status.PENDING]: REVIEW_CASE,
  [Status.RECLAIMED]: REVIEW_CASE,
  [Status.REJECTED]: REVIEW_CASE,
  [Status.REQUEST_CHANGES]: REVIEW_CASE
}

export const requestStatusToRouteName: Record<string, string> = {
  [Status.ALLOCATED]: MY_REQUEST_STATUS,
  [Status.APPROVED]: MY_REQUEST_STATUS,
  [Status.DRAFT]: MY_REQUEST_EDIT,
  [Status.PENDING]: MY_REQUEST_STATUS,
  [Status.RECLAIMED]: MY_REQUEST_STATUS,
  [Status.REJECTED]: MY_REQUEST_STATUS,
  [Status.REQUEST_CHANGES]: MY_REQUEST_EDIT
}

export const statusToRequiredAction: Record<string, string> = transformRequestStatus('action')
export const caseStatusToTranslation: Record<string, string> = transformRequestStatus('status')
export const requestStatusToTranslation: Record<string, string> = transformRequestStatus('status')
export const statusToRouteText: Record<string, string> = transformRequestStatus('route')
export const caseStatusToRouteText: Record<string, string> = transformRequestStatus('cases')
export const reviewerActionToRouteText: Record<string, string> = transfromReviewerActions()
