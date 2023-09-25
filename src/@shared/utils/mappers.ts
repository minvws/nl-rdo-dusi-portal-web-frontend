import { RequestStatus as Status } from '@shared/types/request'

import { MY_REQUEST_STATUS, MY_REQUEST_EDIT } from '@portal/router/names'

export const caseStatusToTranslation: Record<string, string> = {
  [Status.APPROVED]: 'Goedgekeurd',
  [Status.DRAFT]: 'Nog niet ingediend',
  [Status.REJECTED]: 'Afgekeurd',
  [Status.REQUEST_CHANGES]: 'Aanvulling gevraagd',
  [Status.SUBMITTED]: 'In behandeling'
}

export const requestStatusToTranslation: Record<string, string> = {
  [Status.APPROVED]: 'Goedgekeurd',
  [Status.DRAFT]: 'Nog niet ingediend',
  [Status.REJECTED]: 'Afgekeurd',
  [Status.REQUEST_CHANGES]: 'Aanvulling nodig',
  [Status.SUBMITTED]: 'In behandeling'
}

export const statusToIcon: Record<string, string> = {
  [Status.APPROVED]: 'confirmation',
  [Status.DRAFT]: 'warning',
  [Status.REJECTED]: 'error',
  [Status.REQUEST_CHANGES]: 'warning',
  [Status.SUBMITTED]: ''
}

export const statusToRequiredAction: Record<string, string> = {
  [Status.APPROVED]: 'Nee',
  [Status.DRAFT]: 'Ja',
  [Status.REJECTED]: 'Nee',
  [Status.REQUEST_CHANGES]: 'Ja',
  [Status.SUBMITTED]: 'Nee'
}

export const statusToRouteName: Record<string, string> = {
  [Status.APPROVED]: MY_REQUEST_STATUS,
  [Status.DRAFT]: MY_REQUEST_EDIT,
  [Status.REJECTED]: MY_REQUEST_STATUS,
  [Status.REQUEST_CHANGES]: MY_REQUEST_EDIT,
  [Status.SUBMITTED]: MY_REQUEST_STATUS
}

export const statusToRouteText: Record<string, string> = {
  [Status.APPROVED]: 'Bekijk aanvraag',
  [Status.DRAFT]: 'Open aanvraag',
  [Status.REJECTED]: 'Bekijk aanvraag',
  [Status.REQUEST_CHANGES]: 'Open aanvraag',
  [Status.SUBMITTED]: 'Bekijk aanvraag'
}
