import type { CaseDetailsItem, DescriptionListItem } from '@shared/types/details'
import type { CaseStage } from '@shared/types/cases'
import type { FiltersDataInput, FilterItem } from '@shared/types/filters'

import { translate } from '@shared/i18n'

import { MY_MESSAGE_DETAILS } from '@shared/router/names'

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
 * Formats data from the API for the filters component.
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
 * Formats data from the API for the request details component.
 *
 * @param {CaseStage} data - The data to format.
 * @returns {CaseDetailsItem[]} - The formatted data.
 */
export function formatDetailsData(data: CaseStage): CaseDetailsItem[] {
  if (!data?.uischema || !data?.dataschema) return []

  const { dataschema, uischema } = data
  const { properties } = dataschema as { properties: Record<string, any> }
  const { elements } = uischema as { elements: { label: string; elements: any[] }[] }

  return elements.map(({ label, elements }) => {
    const fields = elements[0].options.fields as Record<string, string>
    const items = Object.entries(fields) as [string, string][]

    return {
      title: label,
      items: items.map(item => {
        const key = item[1].slice(1, -1)
        const title = properties[key].title || '-'
        const type = properties[key].type || 'string'
        const value = properties[key].default || '-'
        const hasUrl = type === 'url' || type === 'file'

        return {
          term: title,
          type,
          text: value,
          ...(hasUrl && { url: value })
        } as DescriptionListItem
      })
    }
  })
}

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
