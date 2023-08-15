import type { DetailsDataInput, DetailsDataOutput } from '@shared/types/details'
import { translate } from '@shared/i18n'

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
