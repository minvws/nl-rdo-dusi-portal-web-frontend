import { externalLinks } from '@shared/external-links'
import { createI18n } from 'vue-i18n'
import { reviewProject } from '@shared/utils/env'
import { mergeObjects } from '@shared/utils/object'

let t: (_key: string, _props?: Record<string, string>) => string

function getLocaleFromPath(path: string) {
  return path?.split('/').pop()?.split('.')[0] || ''
}

function getI18nFiles() {
  const baseI18n = import.meta.glob('@shared/i18n/*.json')
  const portalI18n = import.meta.glob('@portal/i18n/*.json')
  const reviewI18n = import.meta.glob('@review/i18n/*.json')

  const projectI18n = reviewProject ? reviewI18n : portalI18n

  return { ...baseI18n, ...projectI18n }
}

async function getTranslationsFromFiles() {
  let locale = ''
  const files = getI18nFiles()
  const translations = await Promise.all(
    Object.entries(files).map(
      async ([path, file]) =>
        new Promise(resolve => {
          locale = getLocaleFromPath(path)
          file().then(content => resolve(JSON.parse(JSON.stringify(content))))
        })
    )
  )

  return { locale, translations }
}

async function createLocalizedMessages() {
  const { locale, translations } = await getTranslationsFromFiles()
  const base = translations[0] as Record<string, any>
  const project = translations[1] as Record<string, any>
  const mergedTranslations = mergeObjects({ ...base }, project)

  return { [locale]: mergedTranslations }
}

export const translate = (key: string, props?: Record<string, string | number>) => {
  // only translate when key does not match result
  // otherwise the key is not translated
  const value = t(key, { ...externalLinks, ...props })
  if (value === key) return undefined
  return value
}

export const i18n = async () => {
  const messages = await createLocalizedMessages()
  const i18n = createI18n({
    legacy: false,
    messages,
    locale: 'nl-NL',
    fallbackLocale: 'nl-NL',
    fallbackWarn: false, // hide fallback warnings
    warnHtmlMessage: false, // hide html warnings
    missingWarn: false // hide i18n missing translations
  })
  // @ts-ignore:next-line
  t = i18n.global.t
  return i18n
}
