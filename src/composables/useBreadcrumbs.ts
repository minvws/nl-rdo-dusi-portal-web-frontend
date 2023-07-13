import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { translate } from '@/i18n'
import { HOME } from '@/router/names'

import type { Link } from '@/type/link-types'

export const useBreadcrumbs = () => {
  const route = useRoute()

  const hasBreadCrumbs = computed(() => {
    return route.path !== '/'
  })

  const breadcrumbs = computed(() => {
    if (!hasBreadCrumbs.value) return undefined

    const links: Link[] = []

    links.push({
      name: HOME,
      label: translate('app.name')
    })

    // Add route links
    route.matched.forEach(({ name }) => {
      if (!name) return
      const linkName = name as string
      links.push({
        name: linkName,
        label: translate(`pages.${linkName}.title`)
      })
    })

    return links
  })

  return {
    breadcrumbs
  }
}
