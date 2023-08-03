import { externalLinks } from '@/external-links'
import { createI18n } from 'vue-i18n'

const getFiles = async () => {
  const locales = import.meta.glob('./locale/*.json')
  const files = await Promise.all(
    Object.entries(locales).map(async ([path, file]) => {
      return new Promise(resolve => {
        const locale = path?.split('/').pop()?.split('.')[0] || ''

        file().then(content => {
          resolve({
            locale,
            content
          })
        })
      })
    })
  )
  return files as Record<string, any>
}

const getMessages = async () => {
  const files = await getFiles()
  const messages = files.reduce(
    (cul: Record<string, any>, item: { locale: string; content: any }) => {
      const { locale, content } = item
      cul[locale] = content
      return cul
    },
    {} as Record<string, any>
  )
  return messages
}

let t: (_key: string, _props?: Record<string, string>) => string

export const translate = (key: string, props?: Record<string, string>) => {
  // only translate when key does not match result
  // otherwise the key is not translated
  const value = t(key, { ...externalLinks, ...props })
  if (value === key) return undefined
  return value
}

export const i18n = async () => {
  const messages = await getMessages()
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
