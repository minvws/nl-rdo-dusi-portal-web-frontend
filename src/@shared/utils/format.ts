import type { FiltersDataInput, FilterItem } from '@shared/types/filters'

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
 * Formats data from the API for the filters component.
 *
 * @param {FiltersDataInput} data - The data to format.
 * @returns {FilterItem[]} - The formatted data.
 */
export function formatFiltersData({ data }: FiltersDataInput): FilterItem[] | undefined {
  if (!data) return undefined
  return Object.entries(data).map(([name, count]) => {
    return {
      text: translate(`component.filterTabs.${name.toLowerCase()}`),
      id: name.toLowerCase(),
      count
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

export const fromCamelCaseToSnakeCase = (target: string) =>
  target.replace(/[A-Z]/g, char => `_${char.toLowerCase()}`)

export const formatPayloadFromCamelCaseToSnakeCase = (payload: Record<string, string>) => {
  return Object.entries(payload).reduce(
    (cul, [key, value]) => {
      if (value) return { ...cul, [fromCamelCaseToSnakeCase(key)]: value }
      return cul
    },
    {} as Record<string, string>
  )
}
