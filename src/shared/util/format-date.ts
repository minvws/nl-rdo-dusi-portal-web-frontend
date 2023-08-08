const DEFAULT_OPTIONS = {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
} as Intl.DateTimeFormatOptions

export default function formatDate(date: string, locale: string, options = DEFAULT_OPTIONS) {
  const dateObj = new Date(date)

  return dateObj.toLocaleDateString(locale, options)
}
