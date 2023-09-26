import type { FiltersDataInput, FilterItem } from '@shared/types/filters'
import type { CaseData, CaseDetails, CaseForm } from '@shared/types/cases'

import { translate } from '@shared/i18n'

import { MY_MESSAGE_DETAILS } from '@portal/router/names'

export const formatFile = (path = '') => {
  const file = path.split('\\')
  return file[file.length - 1] || translate('form.component.fileInput.chooseFile')
}

export const formatFileSize = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

/**
 * Formats data from the API for filters
 *
 * @param {FiltersDataInput} data - The data to format.
 * @returns {FilterItem[]} - The formatted data.
 */
export function formatFiltersData(data: FiltersDataInput): FilterItem[] {
  return Object.entries(data.data).map(([name, count]) => {
    return {
      text: translate(`component.filterTabs.${name.toLowerCase()}`),
      id: name.toLowerCase(),
      count
    }
  })
}

/**
 * Formats data from the API for messages
 *
 * @param data
 * @returns
 */
export function formatMessagesData(data: any) {
  return data.items.map((item: any) => ({
    date: item.sentAt,
    to: {
      name: MY_MESSAGE_DETAILS,
      params: { id: item.id }
    },
    title: item.subject
  }))
}

/**
 * Formats data from the API for cases
 *
 * @param data
 * @returns
 */
export function formatCaseData(data: CaseData): CaseDetails {
  const { application, applicationStages: stages } = data

  if (!application || !stages.length) {
    return {} as CaseDetails
  }

  const stage = stages[0]
  const otherStages = stages.slice(1)
  const currentStage: CaseForm | undefined = stages.find((stage: CaseForm) => {
    const { isCurrent } = stage.metadata.applicationStage
    return isCurrent || false
  })

  return {
    application: application,
    applicantApplicationStage: stage,
    otherApplicationStages: otherStages,
    currentApplicationStage: currentStage
  }
}
