const DEFAULT_OPTIONS = {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
} as Intl.DateTimeFormatOptions

const DEFAULT_TIME_OPTIONS = {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric'
} as Intl.DateTimeFormatOptions

export function formatDate(date: string, locale: string, options = DEFAULT_OPTIONS) {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString(locale, options)
}

export function formatDateWithTime(date: string, locale: string, options = DEFAULT_TIME_OPTIONS) {
  return new Date(date).toLocaleTimeString(locale, options)
}
