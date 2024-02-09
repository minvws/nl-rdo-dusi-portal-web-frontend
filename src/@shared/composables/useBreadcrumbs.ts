import type { Link } from '@shared/types/link'

import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { t } from '@shared/i18n'

export const useBreadcrumbs = () => {
  const route = useRoute()

  const hasBreadCrumbs = computed<boolean>(() => route.path !== '/')

  const breadcrumbs = computed<Link[]>(() => {
    if (!hasBreadCrumbs.value) {
      return []
    }

    const links: Link[] = []
    // Add route links
    for (const { name } of route.matched) {
      if (!name) continue
      const linkName = name as string
      const label = t(`pages.${linkName}.title`)

      // do not show breadcrumb when page does not have a label
      if (!label) continue

      links.push({
        name: linkName,
        label: t(`pages.${linkName}.title`)
      })
    }

    links.unshift({
      name: '',
      label: t('app.name')
    })

    if (links.length <= 1) return []

    return links
  })

  return {
    breadcrumbs
  }
}
