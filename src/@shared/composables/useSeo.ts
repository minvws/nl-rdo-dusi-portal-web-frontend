import type { HeadObject, UseHeadInput } from '@vueuse/head'

import { useHead } from '@vueuse/head'
import { t } from '@shared/i18n'

export function useSEO(customHead: HeadObject) {
  const defaultHead = {
    title: t('app.prefix'),
    meta: [
      {
        name: 'description',
        content: t('app.description')
      }
    ]
  }

  return useHead({ ...defaultHead, ...customHead }) as UseHeadInput
}
