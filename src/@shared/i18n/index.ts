import type { VueMessageType } from 'vue-i18n'
import type { LocaleMessage } from '@intlify/core-base'

import { createI18n } from 'vue-i18n'
import merge from 'lodash.merge'

import { externalLinks } from '@shared/external-links'

type FileContent = Record<string, Record<string, unknown>[]>

type TranslationFileEntry = {
  locale: string
  content: FileContent
}

type RawTranslationEntry = Record<string, FileContent[]>
type TranslationEntry = { [x: string]: LocaleMessage<VueMessageType> }

let translate: (_key: string, _props?: Record<string, string>, _count?: number) => string
const files: Record<string, () => Promise<unknown>> = import.meta.glob('@/**/i18n/*.json')

/**
 * Get the content of all translation files
 *
 * @returns {Promise<TranslationFileEntry[]>}
 */
async function getFilesContent(): Promise<TranslationFileEntry[]> {
  const entries: [string, () => Promise<unknown>][] = Object.entries(files)
  const contentByFile = []

  for (const entry of entries) {
    const [path, file] = entry
    const locale: string = path?.split('/').pop()?.split('.')[0] || ''
    const currentProject: string = path?.split('/').splice(2, 1)?.[0] || ''
    const projects: string[] = [import.meta.env.VITE_PROJECT, '@shared']

    if (!projects.includes(currentProject)) {
      continue
    }

    const content = (await file()) as FileContent

    contentByFile.push({ locale, content })
  }

  return Promise.all(contentByFile)
}

/**
 * Combine translations by locale
 *
 * @param {TranslationFileEntry[]} array
 * @returns {RawTranslationEntry}
 */
function combineTranslationsByLocale(array: TranslationFileEntry[]): RawTranslationEntry {
  let combined: RawTranslationEntry = {}

  for (let i = 0; i < array.length; i++) {
    const entry = array[i]

    if (!entry) {
      continue
    }

    const { locale, content } = entry

    if (combined[locale] === undefined) {
      combined[locale] = []
    }

    combined[locale].push(content)
  }

  return combined
}

/**
 * Transform translations by locale
 *
 * @param {TranslationFileEntry[]} translations
 * @returns {TranslationEntry}
 */
function transformTranslationsByLocale(translations: TranslationFileEntry[]): TranslationEntry {
  const combinedTranslations = combineTranslationsByLocale(translations)
  let transformed: TranslationEntry = {}

  const entries = Object.entries(combinedTranslations)

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]
    const [locale, translations] = entry
    transformed[locale] = merge(null, ...translations)
  }

  return transformed
}

/**
 * Get all messages
 *
 * @returns {Promise<TranslationEntry>}
 */
async function getMessages(): Promise<TranslationEntry> {
  const contentByFile = await getFilesContent()

  return transformTranslationsByLocale(contentByFile)
}

/**
 * Translate a key
 *
 * @param {string} key
 * @param {Record<string, string | number>} props
 * @param {number} count
 * @returns {string | undefined}
 */
export function t(
  key: string,
  props?: Record<string, string | number>,
  count?: number
): string | undefined {
  // only translate when key does not match result, otherwise the key is not translated
  const value = translate(key, { ...externalLinks, ...props }, count)

  if (value === key) {
    return undefined
  }

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
  translate = i18n.global.t
  return i18n
}
