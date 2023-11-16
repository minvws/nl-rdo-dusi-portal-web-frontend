import type { ReviewerActionType } from '@shared/types/reviewer'
import type {
  RawAssessmentData,
  AssessmentsData,
  RawRequestData,
  RequestData
} from '@shared/types/table'

import { formatDate } from '@shared/utils/date'
import {
  caseStatusToTranslation,
  caseStatusToRouteName,
  caseStatusToRouteText,
  requestStatusToRouteName,
  requestStatusToTranslation,
  statusToIcon,
  statusToRequiredAction,
  statusToRouteText,
  reviewerActionToRouteText
} from '@shared/utils/mappers'

import { AssessmentsDataType } from '@shared/types/table'
import { ReviewerAction } from '@shared/types/reviewer'

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
 * Transforms 'cases' data from the API to a format that we can use.
 *
 * @param data
 * @returns data
 */
export function transformCasesData(data: RawAssessmentData): AssessmentsData {
  return data.data?.map(
    ({
      id,
      reference,
      subsidy,
      subsidy_page_url,
      subsidy_stage_title,
      status,
      final_review_deadline,
      updated_at,
      assessor,
      actions
    }) => ({
      ...setFile(reference),
      ...setArrangement(subsidy, subsidy_page_url),
      ...setStageTitle(subsidy_stage_title),
      ...setCaseStatus(status),
      ...setDeadline(final_review_deadline),
      ...setUpdated(updated_at),
      ...setCaseAction(id, status, actions),
      ...setReviewer(status, id, assessor),
      ...setReviewerAction(id, actions)
    })
  )
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

const setArrangement = (text: string, url: string) =>
  createSet('arrangement', {
    type: AssessmentsDataType.EXTERNAL_LINK,
    to: url,
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

const setStageTitle = (text: string) =>
  createSet('stage-title', {
    type: AssessmentsDataType.STRING,
    text: text
  })
const setDeadline = (date: string) =>
  createSet('deadline', {
    type: AssessmentsDataType.DATE,
    text: date ? formatDate(date, 'nl-NL') : '-'
  })

const setUpdated = (date: string) =>
  createSet('updated', {
    type: AssessmentsDataType.DATE,
    text: date ? formatDate(date, 'nl-NL') : '-'
  })

const setCreated = (date: string) =>
  createSet('created', {
    type: AssessmentsDataType.DATE,
    text: date ? formatDate(date, 'nl-NL') : '-'
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

const setReviewerAction = (id: string, actions?: ReviewerActionType[]) => {
  const type = actions?.find(action => action !== ReviewerAction.SHOW)
  if (!type) return createSet('action', {})

  switch (type) {
    case ReviewerAction.ASSIGN:
      return createSet('action', {
        type: AssessmentsDataType.BUTTON,
        text: reviewerActionToRouteText[type],
        action: { type, params: { id } }
      })
    default:
      return createSet('action', {
        type: AssessmentsDataType.BUTTON,
        text: reviewerActionToRouteText[type],
        action: { type, params: { id } }
      })
  }
}

const setCaseAction = (id: string, status: string, actions?: ReviewerActionType[]) => {
  const type = actions?.find(action => action === ReviewerAction.SHOW)
  if (!type) return createSet('case', {})
  return createSet('case', {
    type: AssessmentsDataType.BUTTON_GHOST_LINK,
    to: {
      name: caseStatusToRouteName[status],
      params: { id }
    },
    text: caseStatusToRouteText[status]
  })
}

const setReviewer = (status: string, id: string, assessor?: { name: string }) => {
  return createSet('reviewer', setReviewerPerson(assessor))
}

const setReviewerPerson = (assessor?: { name: string }) => {
  if (!assessor) return {}
  return {
    type: AssessmentsDataType.STRING,
    text: assessor.name
  }
}
