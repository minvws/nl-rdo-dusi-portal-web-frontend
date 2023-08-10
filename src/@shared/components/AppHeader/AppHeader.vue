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
            v-for="({ name, label, icon }, index) in leftLinks"
            :key="`default-link-${index}`"
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
          <li
            v-for="({ name, label, badge }, index) in rightLinks"
            :key="`auth-link-${index}`"
          >
            <RouterLink :to="{ name }">
              <AppIcon
                name="logout"
                aria-hidden="true"
              />
              {{ label }}
              <MessageCounter
                v-if="badge"
                :value="badge"
              />
            </RouterLink>
          </li>
        </ul>
        <ul v-if="hasAutentication">
          <li>
            <AppAuthenticationButton />
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
import { useBreadcrumbs } from '@shared/composables/useBreadcrumbs'
import { translate } from '@shared/i18n'
import AppAuthenticationButton from '@shared/components/AppAuthenticationButton/AppAuthenticationButton.vue'
import AppHeaderLogoLink from '@shared/components/AppHeaderLogoLink/AppHeaderLogoLink.vue'
import AppIcon from '@shared/components/AppIcon/AppIcon.vue'
import BreadcrumbBar from '@shared/components/BreadcrumbBar/BreadcrumbBar.vue'
import MessageCounter from '@shared/components/MessageCounter/MessageCounter.vue'

import vCollapsible from '@shared/directives/collapsible'
import { useAppHeaderLinks } from '@shared/composables/useAppHeaderLinks'

const { breadcrumbs } = useBreadcrumbs()
const { leftLinks, rightLinks, hasAutentication } = await useAppHeaderLinks()
</script>

<style lang="scss" scoped>
.app-header {
  --header-navigation-list-item-align-items: center;
}
</style>
