import type {
  RawAssessmentData,
  AssessmentsData,
  RawRequestData,
  RequestData
} from '@shared/types/table'

import { AssessmentsDataType } from '@shared/types/table'
import { RequestStatus } from '@shared/types/request'

import { formatDate } from '@shared/utils/date'
import { translate } from '@shared/i18n'

import { MY_REQUEST_STATUS, MY_REQUEST_EDIT } from '@portal/router/names'

import { MY_CASE_DETAILS } from '@assessment/router/names'

const options = {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
} as Intl.DateTimeFormatOptions

const mapStatusToTranslation: Record<string, string> = {
  [RequestStatus.APPROVED]: 'Goedgekeurd',
  [RequestStatus.DRAFT]: 'Nog niet ingediend',
  [RequestStatus.REJECTED]: 'Afgekeurd',
  [RequestStatus.REQUEST_CHANGES]: 'Aanvulling nodig',
  [RequestStatus.SUBMITTED]: 'In behandeling'
}

const mapStatusToIcon: Record<string, string> = {
  [RequestStatus.APPROVED]: 'confirmation',
  [RequestStatus.DRAFT]: 'warning',
  [RequestStatus.REJECTED]: 'error',
  [RequestStatus.REQUEST_CHANGES]: 'warning',
  [RequestStatus.SUBMITTED]: ''
}

const mapStatusToRequiredAction: Record<string, string> = {
  [RequestStatus.APPROVED]: 'Nee',
  [RequestStatus.DRAFT]: 'Ja',
  [RequestStatus.REJECTED]: 'Nee',
  [RequestStatus.REQUEST_CHANGES]: 'Ja',
  [RequestStatus.SUBMITTED]: 'Nee'
}

const mapStatusToRouteName: Record<string, string> = {
  [RequestStatus.APPROVED]: MY_REQUEST_STATUS,
  [RequestStatus.DRAFT]: MY_REQUEST_EDIT,
  [RequestStatus.REJECTED]: MY_REQUEST_STATUS,
  [RequestStatus.REQUEST_CHANGES]: MY_REQUEST_EDIT,
  [RequestStatus.SUBMITTED]: MY_REQUEST_STATUS
}

const mapStatusToRouteText: Record<string, string> = {
  [RequestStatus.APPROVED]: 'Bekijk aanvraag',
  [RequestStatus.DRAFT]: 'Open aanvraag',
  [RequestStatus.REJECTED]: 'Bekijk aanvraag',
  [RequestStatus.REQUEST_CHANGES]: 'Open aanvraag',
  [RequestStatus.SUBMITTED]: 'Bekijk aanvraag'
}

/**
 * Transforms the 'all requests' data from the API to a format that we can use.
 *
 * @param data
 * @returns data
 */
export function transformRequestsData(data: RawRequestData): RequestData {
  return data.items.map(({ deadlineForResponseAt, reference, status, subsidy, submittedAt }) => ({
    ...setSubsidy(subsidy.pageUrl, subsidy.title),
    ...setFile(reference),
    ...setStatus(status),
    ...setDeadline(deadlineForResponseAt),
    ...setCreated(submittedAt),
    ...setActionRequired(status),
    ...setAction(reference, status)
  }))
}

/**
 * Transforms 'all cases' data from the API to a format that we can use.
 *
 * @param data
 * @returns data
 */
export function transformCasesData(data: RawAssessmentData): AssessmentsData {
  return data.data.map(
    ({ id, reference, subsidy, status, final_review_deadline, updated_at, reviewer }) => ({
      ...setFile(reference),
      ...setArrangement(subsidy),
      ...setStatus(status),
      ...setDeadline(final_review_deadline),
      ...setUpdated(updated_at),
      ...setReviewer(status, reviewer, id)
    })
  )
}

/**
 * Transforms 'my cases' data from the API to a format that we can use.
 *
 * @param data
 * @returns data
 */
export function transformMyCasesData(data: RawAssessmentData): AssessmentsData {
  return data.data.map(({ id, subsidy, status, final_review_deadline, updated_at }) => ({
    ...setFile(id),
    ...setArrangement(subsidy),
    ...setStatus(status),
    ...setDeadline(final_review_deadline),
    ...setUpdated(updated_at)
  }))
}

const createSet = (text: string, data: object) => ({
  [text]: data
})

const setSubsidy = (url: string, text: string) =>
  createSet('subsidy', {
    type: AssessmentsDataType.EXTERNAL_LINK,
    to: url,
    text
  })

const setFile = (text: string) =>
  createSet('file', {
    type: AssessmentsDataType.STRING,
    text
  })

const setArrangement = (text: string) =>
  createSet('arrangement', {
    type: AssessmentsDataType.LINK,
    to: '/regeling', // @TODO: replace with real DUS-I link
    text
  })

const setStatus = (text: string) =>
  createSet('status', {
    icon: mapStatusToIcon[text],
    type: AssessmentsDataType.STRING,
    text: mapStatusToTranslation[text]
  })

const setDeadline = (date: string) =>
  createSet('deadline', {
    type: AssessmentsDataType.DATE,
    text: date ? formatDate(date, 'nl-NL', options) : '-'
  })

const setUpdated = (date: string) =>
  createSet('updated', {
    type: AssessmentsDataType.DATE,
    text: date ? formatDate(date, 'nl-NL', options) : '-'
  })

const setCreated = (date: string) =>
  createSet('created', {
    type: AssessmentsDataType.DATE,
    text: date ? formatDate(date, 'nl-NL', options) : '-'
  })

const setActionRequired = (status: string) =>
  createSet('actionRequired', {
    type: AssessmentsDataType.STRING,
    text: mapStatusToRequiredAction[status]
  })

const setAction = (reference: string, status: string) =>
  createSet('action', {
    type: AssessmentsDataType.BUTTON_LINK,
    to: {
      name: mapStatusToRouteName[status],
      params: { reference }
    },
    text: mapStatusToRouteText[status]
  })

const setReviewer = (status: string, text: string, id: string) =>
  status === 'ToDo'
    ? createSet('reviewer', setReviewerButton(id))
    : createSet('reviewer', setReviewerPerson(text))

const setReviewerButton = (id: string) => ({
  type: AssessmentsDataType.BUTTON_LINK,
  to: {
    name: MY_CASE_DETAILS,
    params: { id }
  },
  text: translate('component.appTable.take')
})

const setReviewerPerson = (text: string) => ({
  type: AssessmentsDataType.STRING,
  text: text ? text : '-'
})
