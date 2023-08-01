<template>
  <header class="app-header">
    <RouterLink
      to="/"
      class="home-link"
      :aria-label="translate('component.header.homeLink.aria-label')"
    >
      <img
        src="/img/vws_dusi_logo.png"
        :alt="translate('component.header.homeLink.alt')"
      />
      <span class="visually-hidden">{{ translate('component.header.homeLink.label') }}</span>
    </RouterLink>

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
      v-if="breadcrumbs"
      :links="breadcrumbs"
    />
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Link } from '@/type/link-types'

import { useBreadcrumbs } from '@/composables/useBreadcrumbs'

import { translate } from '@/i18n'
import { ARRANGEMENT_OVERVIEW, HOME, MY_FILE_OVERVIEW, MY_MESSAGES } from '@/router/names'

import AppAuthenticationButton from '@/components/AppAuthenticationButton/AppAuthenticationButton.vue'
import AppIcon from '@/components/AppIcon/AppIcon.vue'
import MessageCounter from '@/components/MessageCounter/MessageCounter.vue'
import BreadcrumbBar from '@/components/BreadcrumbBar/BreadcrumbBar.vue'

import vCollapsible from '@/directives/collapsible'

import { useAuthStore } from '@/store/useAuthStore'

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
