import { formatDate } from '@shared/utils/date'
import { translate } from '@shared/i18n'

import { AssessmentDataType } from '../types/table'
import type { AssessmentData, RawAssessmentData, RawRequestData, RequestData } from '../types/table'

const options = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
} as Intl.DateTimeFormatOptions

const mapStatusToTranslation: Record<string, string> = {
  submitted: 'Nieuw',
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
export function transformAssessmentsData(data: RawAssessmentData): AssessmentData {
  return data.data.map(({ id, subsidy, status, final_review_deadline, last_update, reviewer }) => ({
    ...setFile(id),
    ...setArrangement(subsidy),
    ...setStatus(status),
    ...setDeadline(final_review_deadline),
    ...setUpdated(last_update),
    ...setReviewer(status, reviewer)
  }))
}

/**
 * Transforms 'my assessments' data from the API to a format that we can use.
 *
 * @param data
 * @returns data
 */
export function transformMyAssessmentsData(data: RawAssessmentData): AssessmentData {
  return data.data.map(({ id, subsidy, status, final_review_deadline, last_update }) => ({
    ...setFile(id),
    ...setArrangement(subsidy),
    ...setStatus(status),
    ...setDeadline(final_review_deadline),
    ...setUpdated(last_update),
    ...setAction(id, 'my-requests-details', translate('component.appTable.open'))
  }))
}

const createSet = (text: string, data: object) => ({
  [text]: data
})

const setFile = (text: string) =>
  createSet('file', {
    type: AssessmentDataType.LINK,
    url: '/dossiernummer',
    text: text.split('-')[0] // fake file id for now
  })

const setArrangement = (text: string) =>
  createSet('arrangement', {
    type: AssessmentDataType.LINK,
    url: '/regeling',
    text
  })

const setStatus = (text: string) =>
  createSet('status', {
    type: AssessmentDataType.STRING,
    text: mapStatusToTranslation[text]
  })

const setDeadline = (date: string) =>
  createSet('deadline', {
    type: AssessmentDataType.DATE,
    text: date ? formatDate(date, 'nl-NL', options) : '-'
  })

const setUpdated = (date: string) =>
  createSet('updated', {
    type: AssessmentDataType.DATE,
    text: date ? formatDate(date, 'nl-NL', options) : '-'
  })

const setCreated = (date: string) =>
  createSet('created', {
    type: AssessmentDataType.DATE,
    text: date ? formatDate(date, 'nl-NL', options) : '-'
  })

const setAction = (id: string, name: string, text: string | undefined) =>
  createSet('action', {
    type: AssessmentDataType.BUTTON,
    to: { name, params: { id } },
    text: text
  })

const setReviewer = (status: string, text: string) =>
  status === 'submitted'
    ? createSet('reviewer', setReviewerButton())
    : createSet('reviewer', setReviewerPerson(text))

const setReviewerButton = () => ({
  type: AssessmentDataType.BUTTON,
  to: { name: 'home' },
  text: translate('component.appTable.take')
})

const setReviewerPerson = (text: string) => ({
  type: AssessmentDataType.STRING,
  text: text ? text : '-'
})
