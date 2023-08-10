import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { translate } from '@shared/i18n'
import { HOME } from '@shared/router/names'
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
