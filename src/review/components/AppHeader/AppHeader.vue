<template>
  <header class="app-header">
    <AppHeaderLogoLink />
    <nav
      data-open-label="Menu"
      data-close-label="Sluit menu"
      data-media="(min-width: 50rem)"
      :aria-label="translate('component.header.nav.aria-label')"
      class="collapsible"
      v-collapsible
    >
      <div class="collapsing-element">
        <ul>
          <li
            v-for="({ name, label, icon }, index) in links"
            :key="index"
          >
            <RouterLink :to="{ name }">
              <AppIcon
                v-if="icon"
                :name="icon"
                aria-hidden="true"
              />
              {{ label }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>

    <BreadcrumbBar
      v-if="breadcrumbs.length"
      :links="breadcrumbs"
    />
  </header>
</template>

<script setup lang="ts">
import type { Link } from '@shared/types/link'
import { translate } from '@shared/i18n'

import { useBreadcrumbs } from '@shared/composables/useBreadcrumbs'

import vCollapsible from '@shared/directives/collapsible'

import AppHeaderLogoLink from '@shared/components/AppHeaderLogoLink/AppHeaderLogoLink.vue'
import AppIcon from '@shared/components/AppIcon/AppIcon.vue'
import BreadcrumbBar from '@shared/components/BreadcrumbBar/BreadcrumbBar.vue'

import { HOME, MY_REQUESTS_OVERVIEW } from '@shared/router/names'

const { breadcrumbs } = useBreadcrumbs()

const links: Link[] = [
  {
    name: HOME,
    label: translate('app.name'),
    icon: 'home'
  },
  {
    name: MY_REQUESTS_OVERVIEW,
    label: translate('pages.my-requests-overview.title')
  }
]
</script>

<style lang="scss" scoped>
.app-header {
  --header-navigation-list-item-align-items: center;
}
.home-link {
  width: 175px;
  text-decoration: none;
}

@media (min-width: 35rem) {
  .home-link {
    width: 225px;
  }
}

@media (min-width: 48rem) {
  .home-link {
    width: 250px;
  }
}
</style>
