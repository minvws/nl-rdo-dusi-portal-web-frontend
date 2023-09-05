import { formatDate } from '@shared/utils/date'
import { translate } from '@shared/i18n'

import { MY_REQUESTS_DETAILS } from '@shared/router/names'

import type {
  RawAssessmentData,
  AssessmentsData,
  RawRequestData,
  RequestData
} from '../types/table'
import { AssessmentsDataType } from '../types/table'

const options = {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
} as Intl.DateTimeFormatOptions

const mapStatusToTranslation: Record<string, string> = {
  new: 'Nieuw',
  ToDo: 'Nieuw',
  rejected: 'Afgekeurd',
  in_progress: 'Eerste beoordeling'
}

/**
 * Transforms the 'all requests' data from the API to a format that we can use.
 *
 * @param data
 * @returns data
 */
export function transformRequestsData(data: RawRequestData): RequestData {
  return data.items.map(({ subsidy, status, deadlineForResponseAt, submittedAt }) => ({
    ...setArrangement(subsidy.title),
    ...setStatus(status),
    ...setDeadline(deadlineForResponseAt),
    ...setCreated(submittedAt),
    ...setAction(subsidy.id, MY_REQUESTS_DETAILS, '@TODO') // @TODO: replace with real data
  }))
}

/**
 * Transforms 'all cases' data from the API to a format that we can use.
 *
 * @param data
 * @returns data
 */
export function transformCasesData(data: RawAssessmentData): AssessmentsData {
  return data.data.map(({ id, subsidy, status, final_review_deadline, updated_at, reviewer }) => ({
    ...setFile(id),
    ...setArrangement(subsidy),
    ...setStatus(status),
    ...setDeadline(final_review_deadline),
    ...setUpdated(updated_at),
    ...setReviewer(status, reviewer)
  }))
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
    ...setUpdated(updated_at),
    ...setAction(id, 'my-case-details', translate('component.appTable.open'))
  }))
}

const createSet = (text: string, data: object) => ({
  [text]: data
})

const setFile = (text: string) =>
  createSet('file', {
    type: AssessmentsDataType.LINK,
    to: '/dossiernummer', // @TODO: replace with real DUS-I link
    text: text.split('-')[0] // fake file id for now
  })

const setArrangement = (text: string) =>
  createSet('arrangement', {
    type: AssessmentsDataType.LINK,
    to: '/regeling', // @TODO: replace with real DUS-I link
    text
  })

const setStatus = (text: string) =>
  createSet('status', {
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

const setAction = (id: string, name: string, text: string | undefined) =>
  createSet('action', {
    type: AssessmentsDataType.BUTTON_LINK,
    to: { name, params: { id } },
    text
  })

const setReviewer = (status: string, text: string) =>
  status === 'ToDo'
    ? createSet('reviewer', setReviewerButton())
    : createSet('reviewer', setReviewerPerson(text))

const setReviewerButton = () => ({
  type: AssessmentsDataType.BUTTON,
  onClick: () => {
    console.log('@TODO: assign to me')
  },
  text: translate('component.appTable.take')
})

const setReviewerPerson = (text: string) => ({
  type: AssessmentsDataType.STRING,
  text: text ? text : '-'
})
