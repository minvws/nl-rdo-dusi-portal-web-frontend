const DEFAULT_OPTIONS = {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
} as Intl.DateTimeFormatOptions

const DEFAULT_TIME_OPTIONS = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
} as Intl.DateTimeFormatOptions

const DEFAULT_DATE_OPTIONS = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
} as Intl.DateTimeFormatOptions

export function formatAsReadableDate(date: string, locale: string, options = DEFAULT_OPTIONS) {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString(locale, options)
}

export function formatAsDate(date: string, locale: string, options = DEFAULT_DATE_OPTIONS) {
  return new Date(date).toLocaleDateString(locale, options)
}

export function formatAsDateWithTime(date: string, locale: string, options = DEFAULT_TIME_OPTIONS) {
  return new Date(date).toLocaleTimeString(locale, options)
}
