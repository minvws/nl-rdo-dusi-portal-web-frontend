import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { translate } from '@shared/i18n'
import type { Link } from '@shared/types/link'

export const useBreadcrumbs = () => {
  const route = useRoute()

  const hasBreadCrumbs = computed(() => {
    return route.path !== '/'
  })

  const breadcrumbs = computed(() => {
    if (!hasBreadCrumbs.value) {
      return []
    }

    const links: Link[] = []
    // Add route links
    route.matched.forEach(({ name }) => {
      if (!name) return
      const linkName = name as string
      const label = translate(`pages.${linkName}.title`)
      if (!label) return // do not show breadcrumb when page does not has a label
      links.push({
        name: linkName,
        label: translate(`pages.${linkName}.title`)
      })
    })

    if (links.length <= 1) return []

    return links
  })

  return {
    breadcrumbs
  }
}
