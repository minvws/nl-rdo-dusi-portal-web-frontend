import type { AssessmentsData, RawAssessmentData } from '@shared/types/assessment'
import type { CaseHistory, CaseHistoryItem, RawCaseHistory } from '@shared/types/case-history'
import type {
  SubsidyOverviewData,
  RawSubsidyOverviewData
} from '@shared/types/subsidy-overview'
import type { IbanCheck, IbanCheckItem, RawIbanCheck } from '@shared/types/iban-check'
import type { MessagesData, RawMessagesData, RawMessagesItem } from '@shared/types/messages'
import type { RawPaginationMetaData, PaginationMetaData } from '@shared/types/pagination'
import type {
  RequestData,
  RawRequestData,
  RawRequestItem,
  RequestItem
} from '@shared/types/request'
import type { ReviewerAction } from '@shared/types/reviewer'

import { MY_MESSAGE_DETAILS } from '@portal/router/names'

import { formatAsReadableDate } from '@shared/utils/date'
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
import { ReviewerActionType } from '@shared/types/reviewer'

import { MY_CASE_DETAILS } from '@assessment/router/names'

/**
 * Transforms the 'all requests' data from the API to a format that we can use.
 *
 * @param {RawRequestData} data
 * @returns {RequestData} data
 */
export function transformRequestsData(data: RawRequestData): RequestData {
  return data.items.map(mapRequestData)
}

/**
 * Transforms the 'subsidy overview' data from the API to a format that we can use.
 *
 * @param {RawSubsidyOverviewData} data
 * @returns {SubsidyOverviewData} data
 */
export function transformSubsidyOverviewApplicationsData(data: RawSubsidyOverviewData): SubsidyOverviewData {
  const applications = data.applications.map(mapRequestData)

  return {
    subsidy: data.subsidy,
    newConceptAllowed: data.newConceptAllowed,
    hasApprovedApplication: data.hasApprovedApplication,
    hasRejectedApplication: data.hasRejectedApplication,
    applications
  }
}

function mapRequestData({ finalReviewDeadline, reference, status, subsidy, updatedAt, submittedAt }: RawRequestItem): RequestItem  {
  return {
    ...setSubsidy(subsidy.pageUrl, subsidy.title),
    ...setFile(reference),
    ...setRequestStatus(status),
    ...setFinalReviewDeadline(finalReviewDeadline),
    ...setCreated(submittedAt),
    ...setUpdatedAt(updatedAt),
    ...setActionRequired(status),
    ...setRequestAction(reference, status)
  }
}

/**
 * Transforms 'cases' data from the API to a format that we can use.
 *
 * @param {RawAssessmentData} data
 * @returns {AssessmentsData} data
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
      ...setReviewer(assessor),
      ...setReviewerAction(id, actions)
    })
  )
}

/**
 * Transforms 'case history' data from the API to a format that we can use.
 *
 * @param {RawCaseHistory} data
 * @returns {CaseHistory} data
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
 * @param {RawIbanCheck} data
 * @returns {IbanCheck} data
 */
export function transformIbanData(data: RawIbanCheck): IbanCheck {
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
 * @param {RawPaginationMetaData} data
 * @returns {PaginationMetaData} data
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

/**
 * Transforms messages data from the API to a format that we can use.
 *
 * @param {RawMessagesData} data
 * @returns {MessagesData} data
 */
export function transformMessagesData(data: { items: RawMessagesData }): MessagesData {
  return data.items.map((item: RawMessagesItem) => ({
    date: item.sentAt,
    to: {
      name: MY_MESSAGE_DETAILS,
      params: { id: item.id }
    },
    title: item.subject,
    unread: item.isNew
  }))
}

function createSet(text: string, data: object) {
  return { [text]: data }
}

function setSubsidy(url: string, text: string) {
  return createSet('subsidy', {
    type: TableDataType.EXTERNAL_LINK,
    to: url,
    text
  })
}

function setFile(text: string) {
  return createSet('file', {
    type: TableDataType.STRING,
    text
  })
}

function setArrangement(text: string, url: string) {
  return createSet('arrangement', {
    type: TableDataType.EXTERNAL_LINK,
    to: url,
    text
  })
}

function setRequestStatus(text: string) {
  return createSet('status', {
    icon: statusToIcon[text],
    type: TableDataType.STRING,
    text: requestStatusToTranslation[text]
  })
}

function setCaseStatus(text: string) {
  return createSet('status', {
    icon: statusToIcon[text],
    type: TableDataType.STRING,
    text: caseStatusToTranslation[text]
  })
}

function setStageTitle(text: string) {
  return createSet('stage_title', {
    type: TableDataType.STRING,
    text: text
  })
}

function setFinalReviewDeadline(date: string | null) {
  return createSet('final_review_deadline', {
    type: TableDataType.DATE,
    text: date ? formatAsReadableDate(date, 'nl-NL') : '-'
  })
}

function setUpdatedAt(date: string) {
  return createSet('updated_at', {
    type: TableDataType.DATE,
    text: date ? formatAsReadableDate(date, 'nl-NL') : '-'
  })
}

function setCreated(date: string | null) {
  return createSet('created', {
    type: TableDataType.DATE,
    text: date ? formatAsReadableDate(date, 'nl-NL') : '-'
  })
}

function setActionRequired(status: string) {
  return createSet('actionRequired', {
    type: TableDataType.STRING,
    text: statusToRequiredAction[status]
  })
}

function setInternalNote(note?: string) {
  return createSet('internalNote', {
    type: TableDataType.STRING,
    text: note ?? '-'
  })
}

function setHistoryAction(title: string) {
  return createSet('action', {
    type: TableDataType.STRING,
    text: title
  })
}

function setAssessor(name?: string) {
  return createSet('assessor', {
    type: TableDataType.STRING,
    text: name ?? '-'
  })
}

function setCount(count: string) {
  return createSet('count', {
    type: TableDataType.STRING,
    text: count
  })
}

function setApplications(applications: { id: string; reference: string }[]) {
  return createSet('applications', {
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
}

function setRequestAction(reference: string, status: string) {
  return createSet('action', {
    type: TableDataType.BUTTON_LINK,
    to: {
      name: requestStatusToRouteName[status],
      params: { reference }
    },
    text: statusToRouteText[status]
  })
}

function setReviewerAction(id: string, actions?: ReviewerAction[]) {
  const type = actions?.find((action) => action !== ReviewerActionType.SHOW)
  if (!type) {
    return createSet('action', {})
  }

  switch (type) {
    case ReviewerActionType.ASSIGN: {
      return createSet('action', {
        type: TableDataType.BUTTON,
        text: reviewerActionToRouteText[type],
        action: {
          type: type,
          params: {
            id: id
          }
        }
      })
    }
    default: {
      return createSet('action', {
        type: TableDataType.BUTTON,
        text: reviewerActionToRouteText[type],
        action: {
          type: type,
          params: {
            id: id
          }
        }
      })
    }
  }
}

function setCaseAction(id: string, status: string, actions?: ReviewerAction[]) {
  const type = actions?.find((action) => action === ReviewerActionType.SHOW)
  if (!type) {
    return createSet('case', {})
  }

  return createSet('case', {
    type: TableDataType.BUTTON_GHOST_LINK,
    to: {
      name: caseStatusToRouteName[status],
      params: { id }
    },
    text: caseStatusToRouteText[status]
  })
}

function setReviewer(assessor?: { name: string }) {
  return createSet('reviewer', setReviewerPerson(assessor))
}

function setReviewerPerson(assessor?: { name: string }) {
  if (!assessor) {
    return {}
  }

  return {
    type: TableDataType.STRING,
    text: assessor.name
  }
}
