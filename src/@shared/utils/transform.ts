import { formatDate } from '@shared/utils/date'
import { translate } from '@shared/i18n'

import {
  caseStatusToTranslation,
  caseStatusToRouteName,
  requestStatusToRouteName,
  requestStatusToTranslation,
  statusToIcon,
  statusToRequiredAction,
  statusToRouteText
} from '@shared/utils/mappers'

import type {
  RawAssessmentData,
  AssessmentsData,
  RawRequestData,
  RequestData
} from '@shared/types/table'

import { AssessmentsDataType } from '@shared/types/table'

import { MY_CASE_DETAILS } from '@assessment/router/names'

const options = {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
} as Intl.DateTimeFormatOptions

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
    ...setRequestStatus(status),
    ...setDeadline(deadlineForResponseAt),
    ...setCreated(submittedAt),
    ...setActionRequired(status),
    ...setRequestAction(reference, status)
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
      ...setCaseStatus(status),
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
  return data.data.map(({ id, reference, subsidy, status, final_review_deadline, updated_at }) => ({
    ...setFile(reference),
    ...setArrangement(subsidy),
    ...setCaseStatus(status),
    ...setDeadline(final_review_deadline),
    ...setUpdated(updated_at),
    ...setCaseAction(id, status)
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

const setRequestStatus = (text: string) =>
  createSet('status', {
    icon: statusToIcon[text],
    type: AssessmentsDataType.STRING,
    text: requestStatusToTranslation[text]
  })

const setCaseStatus = (text: string) =>
  createSet('status', {
    icon: statusToIcon[text],
    type: AssessmentsDataType.STRING,
    text: caseStatusToTranslation[text]
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
    text: statusToRequiredAction[status]
  })

const setRequestAction = (reference: string, status: string) =>
  createSet('action', {
    type: AssessmentsDataType.BUTTON_LINK,
    to: {
      name: requestStatusToRouteName[status],
      params: { reference }
    },
    text: statusToRouteText[status]
  })

const setCaseAction = (id: string, status: string) =>
  createSet('action', {
    type: AssessmentsDataType.BUTTON_LINK,
    to: {
      name: caseStatusToRouteName[status],
      params: { id }
    },
    text: statusToRouteText[status]
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
