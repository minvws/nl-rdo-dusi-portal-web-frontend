import type { HeadObject, UseHeadInput } from '@vueuse/head'
import { useHead } from '@vueuse/head'
import { translate } from '@/shared/i18n'

export default function useSEO(customHead: HeadObject) {
  const defaultHead = {
    title: translate('app.prefix'),
    meta: [
      {
        name: 'description',
        content: translate('app.description')
      }
    ]
  }

  return useHead({ ...defaultHead, ...customHead }) as UseHeadInput
}
