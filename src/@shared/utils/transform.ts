import type { CaseHistory, CaseHistoryItem, RawCaseHistory } from '@shared/types/case-history'
import type { IbanCheckItem, RawIbanCheck } from '@shared/types/iban-check'
import type { ReviewerActionType } from '@shared/types/reviewer'
import type { AssessmentsData, RawAssessmentData } from '@shared/types/assessment'
import type { RequestData, RawRequestData } from '@shared/types/request'
import type { RawPaginationMetaData, PaginationMetaData } from '@shared/types/pagination'

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

import { TableDataType } from '@shared/types/table'
import { ReviewerAction } from '@shared/types/reviewer'

import { MY_CASE_DETAILS } from '@assessment/router/names'

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
    ...setFinalReviewDeadline(deadlineForResponseAt),
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
      ...setFinalReviewDeadline(final_review_deadline),
      ...setUpdatedAt(updated_at),
      ...setCaseAction(id, status, actions),
      ...setReviewer(status, id, assessor),
      ...setReviewerAction(id, actions)
    })
  )
}

/**
 * Transforms 'case history' data from the API to a format that we can use.
 *
 * @param data
 * @returns data
 */
export function transformCaseHistoryData(data: RawCaseHistory): CaseHistory {
  return data.map(
    ({ updatedAt, subsidyStage, assessorUser, internalNote }) =>
      ({
        ...setUpdatedAt(updatedAt),
        ...setHistoryAction(subsidyStage.title),
        ...setAssessor(assessorUser?.name),
        ...setInternalNote(internalNote)
      }) as CaseHistoryItem
  )
}

/**
 * Transforms 'iban check' data from the API to a format that we can use.
 *
 * @param data
 * @returns data
 */
export function transformIbanData(data: RawIbanCheck): IbanCheckItem[] {
  return data.map(
    ({ count, applications }) =>
      ({
        ...setCount(count),
        ...setApplications(applications)
      }) as IbanCheckItem
  )
}

/**
 * Transforms pagination 'meta' data from the API to a format that we can use.
 *
 * @param data
 * @returns data
 */
export function transformPaginationMetaData(data: RawPaginationMetaData): PaginationMetaData {
  const { current_page, from, last_page, per_page, to, total } = data.meta

  return {
    currentPage: current_page,
    from,
    lastPage: last_page,
    perPage: per_page,
    to,
    total
  }
}

const createSet = (text: string, data: object) => ({
  [text]: data
})

const setSubsidy = (url: string, text: string) =>
  createSet('subsidy', {
    type: TableDataType.EXTERNAL_LINK,
    to: url,
    text
  })

const setFile = (text: string) =>
  createSet('file', {
    type: TableDataType.STRING,
    text
  })

const setArrangement = (text: string, url: string) =>
  createSet('arrangement', {
    type: TableDataType.EXTERNAL_LINK,
    to: url,
    text
  })

const setRequestStatus = (text: string) =>
  createSet('status', {
    icon: statusToIcon[text],
    type: TableDataType.STRING,
    text: requestStatusToTranslation[text]
  })

const setCaseStatus = (text: string) =>
  createSet('status', {
    icon: statusToIcon[text],
    type: TableDataType.STRING,
    text: caseStatusToTranslation[text]
  })

const setStageTitle = (text: string) =>
  createSet('stage-title', {
    type: TableDataType.STRING,
    text: text
  })

const setFinalReviewDeadline = (date: string) =>
  createSet('final_review_deadline', {
    type: TableDataType.DATE,
    text: date ? formatDate(date, 'nl-NL') : '-'
  })

const setUpdatedAt = (date: string) =>
  createSet('updated_at', {
    type: TableDataType.DATE,
    text: date ? formatDate(date, 'nl-NL') : '-'
  })

const setCreated = (date: string) =>
  createSet('created', {
    type: TableDataType.DATE,
    text: date ? formatDate(date, 'nl-NL') : '-'
  })

const setActionRequired = (status: string) =>
  createSet('actionRequired', {
    type: TableDataType.STRING,
    text: statusToRequiredAction[status]
  })

const setInternalNote = (note?: string) =>
  createSet('internalNote', {
    type: TableDataType.STRING,
    text: note ?? '-'
  })

const setHistoryAction = (title: string) =>
  createSet('action', {
    type: TableDataType.STRING,
    text: title
  })

const setAssessor = (name?: string) =>
  createSet('assessor', {
    type: TableDataType.STRING,
    text: name ?? '-'
  })

const setCount = (count: string) =>
  createSet('count', {
    type: TableDataType.STRING,
    text: count
  })

const setApplications = (applications: { id: string; reference: string }[]) =>
  createSet('applications', {
    type: TableDataType.LINK_LIST,
    list: applications.map(({ id, reference }) => ({
      type: TableDataType.BUTTON_LINK,
      to: {
        name: MY_CASE_DETAILS,
        params: { id }
      },
      text: reference
    }))
  })

const setRequestAction = (reference: string, status: string) =>
  createSet('action', {
    type: TableDataType.BUTTON_LINK,
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
        type: TableDataType.BUTTON,
        text: reviewerActionToRouteText[type],
        action: { type, params: { id } }
      })
    default:
      return createSet('action', {
        type: TableDataType.BUTTON,
        text: reviewerActionToRouteText[type],
        action: { type, params: { id } }
      })
  }
}

const setCaseAction = (id: string, status: string, actions?: ReviewerActionType[]) => {
  const type = actions?.find(action => action === ReviewerAction.SHOW)
  if (!type) return createSet('case', {})
  return createSet('case', {
    type: TableDataType.BUTTON_GHOST_LINK,
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
    type: TableDataType.STRING,
    text: assessor.name
  }
}
