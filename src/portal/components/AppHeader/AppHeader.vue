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
            v-for="({ name, label, icon }, index) in defaultLinks"
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
          <template v-if="isLoggedIn">
            <li
              v-for="({ name, label, badge }, index) in authenticatedLinks"
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
          </template>
        </ul>
        <ul>
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
import { storeToRefs } from 'pinia'
import type { Link } from '@shared/types/link'

import { useBreadcrumbs } from '@shared/composables/useBreadcrumbs'
import { useAuthStore } from '@shared/store/useAuthStore'

import { translate } from '@shared/i18n'
import { ARRANGEMENT_OVERVIEW, HOME, MY_FILE_OVERVIEW, MY_MESSAGES } from '@shared/router/names'

import AppAuthenticationButton from '@shared/components/AppAuthenticationButton/AppAuthenticationButton.vue'
import AppHeaderLogoLink from '@shared/components/AppHeaderLogoLink/AppHeaderLogoLink.vue'
import AppIcon from '@shared/components/AppIcon/AppIcon.vue'
import BreadcrumbBar from '@shared/components/BreadcrumbBar/BreadcrumbBar.vue'
import MessageCounter from '@portal/components/MessageCounter/MessageCounter.vue'

import vCollapsible from '@shared/directives/collapsible'

const authStore = useAuthStore()
const { breadcrumbs } = useBreadcrumbs()

const { isLoggedIn } = storeToRefs(authStore)

const defaultLinks: Link[] = [
  {
    name: HOME,
    label: translate('app.name'),
    icon: 'home'
  }
]

const authenticatedLinks: Link[] = [
  {
    name: ARRANGEMENT_OVERVIEW,
    label: translate('pages.arrangements-overview.title')
  },
  {
    name: MY_FILE_OVERVIEW,
    label: translate('pages.my-file-overview.title'),
    badge: 2 // @TODO: get from API/store
  },
  {
    name: MY_MESSAGES,
    label: translate('pages.my-messages-overview.title'),
    badge: 4 // @TODO: get from API/store
  }
]
</script>

<style lang="scss" scoped>
.app-header {
  --header-navigation-list-item-align-items: center;
}
</style>
