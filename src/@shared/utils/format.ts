import type { FiltersDataInput, FilterItem } from '@shared/types/filters'
import type {
  DetailsDataInput,
  DetailsDataInputSection,
  RequestDetailsItem
} from '@shared/types/details'
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
 * Formats data from the API for the filters component.
 *
 * @param {FiltersDataInput} data - The data to format.
 * @returns {FilterItem[]} The formatted data.
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
 * Formats data from the API for the details component.
 *
 * @param data
 * @returns data
 */
export function formatDetailsData(data: DetailsDataInput): RequestDetailsItem[] {
  if (!data?.uiSchema?.sections || !data?.values) return []

  const { uiSchema, values } = data

  return uiSchema.sections.map(({ elements, title }: DetailsDataInputSection) => ({
    title: translate(`component.requestDetails.section.${title}`),
    items: elements.map(element => {
      const value = values.find(item => Object.prototype.hasOwnProperty.call(item, element.field))
      return {
        term: translate(`component.requestDetails.term.${element.field}`),
        details: { type: element.type, text: value ? value[element.field] : '' }
      }
    })
  }))
}
