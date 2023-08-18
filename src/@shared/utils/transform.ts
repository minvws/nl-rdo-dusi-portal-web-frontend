import { formatDate } from '@shared/utils/date'
import { translate } from '@shared/i18n'

import type {
  RawAssessmentData,
  AssessmentsData,
  RawRequestData,
  RequestData
} from '../types/table'
import { AssessmentsDataType } from '../types/table'

const options = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
} as Intl.DateTimeFormatOptions

const mapStatusToTranslation: Record<string, string> = {
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
  return data.data.map(({ id, subsidy, status, final_review_deadline, created_at }) => ({
    ...setArrangement(subsidy),
    ...setStatus(status),
    ...setDeadline(final_review_deadline),
    ...setCreated(created_at),
    ...setAction(id, 'my-request-details', 'Ja (2)')
  }))
}

/**
 * Transforms the 'all assessments' data from the API to a format that we can use.
 *
 * @param data
 * @returns data
 */
export function transformAssessmentsData(data: RawAssessmentData): AssessmentsData {
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
 * Transforms 'my assessments' data from the API to a format that we can use.
 *
 * @param data
 * @returns data
 */
export function transformMyAssessmentsData(data: RawAssessmentData): AssessmentsData {
  return data.data.map(({ id, subsidy, status, final_review_deadline, updated_at }) => ({
    ...setFile(id),
    ...setArrangement(subsidy),
    ...setStatus(status),
    ...setDeadline(final_review_deadline),
    ...setUpdated(updated_at),
    ...setAction(id, 'my-requests-details', translate('component.appTable.open'))
  }))
}

const createSet = (text: string, data: object) => ({
  [text]: data
})

const setFile = (text: string) =>
  createSet('file', {
    type: AssessmentsDataType.LINK,
    url: '/dossiernummer',
    text: text.split('-')[0] // fake file id for now
  })

const setArrangement = (text: string) =>
  createSet('arrangement', {
    type: AssessmentsDataType.LINK,
    url: '/regeling',
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
    type: AssessmentsDataType.BUTTON,
    to: { name: 'my-requests-details', params: { id } },
    text: translate('component.appTable.open')
  })

const setReviewer = (status: string, text: string) =>
  status === 'ToDo'
    ? createSet('reviewer', setReviewerButton())
    : createSet('reviewer', setReviewerPerson(text))

const setReviewerButton = () => ({
  type: AssessmentsDataType.BUTTON,
  to: { name: 'home' },
  text: translate('component.appTable.take')
})

const setReviewerPerson = (text: string) => ({
  type: AssessmentsDataType.STRING,
  text: text ? text : '-'
})
