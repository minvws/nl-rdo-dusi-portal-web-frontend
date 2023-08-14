import type { DetailsDataInput, DetailsDataOutput } from '@shared/types/details'
import { translate } from '@shared/i18n'
import { formatDate } from '@shared/utils/date'

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
 * Formats data from the API for the details component.
 *
 * @param {DetailsDataInput} data - The data to format.
 * @returns {DetailsDataOutput} The formatted data.
 */
export function formatDetailsData(data: DetailsDataInput): DetailsDataOutput {
  return data.map(item => ({
    title: item.title,
    data: Object.entries(item.data).map(([term, details]) => ({ term, details }))
  }))
}

function isDateObject(obj: Record<string, string>) {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    Object.prototype.hasOwnProperty.call(obj, 'type') &&
    obj.type === 'date' &&
    Object.prototype.hasOwnProperty.call(obj, 'text')
  )
}

/**
 * Recursively formats data from the API.
 *
 * @param {Array} data - The data to format.
 * @returns {Array} The formatted data.
 */
export function formatTableData(
  data: [] | Record<string, any> | any[],
  locale: string,
  options: object
): [] | Record<string, any> | any[] {
  if (Array.isArray(data)) {
    return data.map(item =>
      Array.isArray(item) || typeof item === 'object'
        ? formatTableData(item, locale, options)
        : item
    )
  }

  if (typeof data === 'object') {
    const isDate = isDateObject(data)

    if (isDate) {
      data.text = formatDate(data.text, locale, options)
      return data
    }

    for (const key in data) {
      const hasOwnProperty = Object.prototype.hasOwnProperty.call(data, key)

      if (hasOwnProperty) {
        if (Array.isArray(data[key]) || typeof data[key] === 'object') {
          data[key] = formatTableData(data[key], locale, options)
        }
      }
    }
  }

  return data
}
