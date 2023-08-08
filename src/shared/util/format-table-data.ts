import formatDate from '@/shared/util/format-date'

type TableData = [] | Record<string, any> | any[]

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
 * @param {TableData} data - The data to format.
 * @returns {TableData} The formatted data.
 */
export default function formatTableData(
  data: TableData,
  locale: string,
  options: object
): TableData {
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
