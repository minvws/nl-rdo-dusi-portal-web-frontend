<template>
  <header class="app-header">
    <RouterLink
      to="/"
      class="ro-logo home-link"
      :aria-label="translate('component.header.homeLink.aria-label')"
    >
      <img src="/img/ro-logo.svg" :alt="translate('component.header.homeLink.alt')" />
      <span>{{ translate('component.header.homeLink.label') }}</span>
    </RouterLink>

    <nav
      data-open-label="Menu"
      data-close-label="Sluit menu"
      data-media="(min-width: 42rem)"
      :aria-label="translate('component.header.nav.aria-label')"
      class="collapsible"
      v-collapsible
    >
      <div class="collapsing-element">
        <ul :key="`header-group-${i}`" v-for="(group, i) in headerLinks">
          <li
            :key="`header-group-${index}-${index}`"
            v-for="({ name, params, badge, label, icon }, index) in group"
          >
            <RouterLink :to="{ name, params }">
              <AppIcon v-if="icon" :name="icon" aria-hidden="true" />
              {{ label }}
              <MessageCounter v-if="badge" :value="badge" />
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>

    <BreadcrumbBar v-if="breadcrumbs" :links="breadcrumbs" />
  </header>
</template>

<script setup lang="ts">
import { useHeaderLinks } from '@/composables/useLinks'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
import { translate } from '@/i18n'

import AppIcon from '@/components/AppIcon/AppIcon.vue'
import MessageCounter from '@/components/MessageCounter/MessageCounter.vue'
import BreadcrumbBar from '@/components/BreadcrumbBar/BreadcrumbBar.vue'

import vCollapsible from '@/directives/collapsible'

const { breadcrumbs } = useBreadcrumbs()
const headerLinks = useHeaderLinks()
</script>

<style lang="scss" scoped>
.home-link {
  text-decoration: none;
}
</style>
