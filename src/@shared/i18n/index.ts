import { externalLinks } from '@shared/external-links'
import { createI18n } from 'vue-i18n'
import merge from 'lodash.merge'

let t: (_key: string, _props?: Record<string, string>, _count?: number) => string

function getLocaleFromPath(path: string) {
  return path?.split('/').pop()?.split('.')[0] || ''
}

function getProjectFromPath(path: string) {
  return path?.split('/').splice(2, 1)?.[0]
}

function getI18nFiles() {
  return import.meta.glob('@/**/i18n/*.json')
}

async function getTranslationsFromFiles() {
  const files = getI18nFiles()
  const translations = await Promise.all(
    Object.entries(files).map(async ([path, file]) => {
      const locale = getLocaleFromPath(path)
      const project = getProjectFromPath(path)
      if (![import.meta.env.VITE_PROJECT, '@shared'].includes(project)) {
        return undefined
      }
      const content = await file()
      return {
        locale,
        content
      }
    })
  )
  const combined = translations.reduce(
    (cul, entry) => {
      if (!entry) return cul
      const { locale, content } = entry
      if (!cul[locale]) cul[locale] = []
      cul[locale] = [...cul[locale], content]
      return cul
    },
    {} as Record<string, any>
  )
  return combined
}

async function createLocalizedMessages() {
  const translations = await getTranslationsFromFiles()
  return Object.entries(translations).reduce(
    (cul, [locale, translations]) => {
      return { ...cul, [locale]: merge(null, ...translations) }
    },
    {} as Record<string, any>
  )
}

export const translate = (key: string, props?: Record<string, string | number>, count?: number) => {
  // only translate when key does not match result
  // otherwise the key is not translated
  const value = t(key, { ...externalLinks, ...props }, count)
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
