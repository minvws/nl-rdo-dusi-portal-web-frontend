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
            <RouterLink
              :to="{ name }"
              custom
              v-slot="{ href, navigate, isActive, isExactActive }"
            >
              <a
                :href="href"
                @click="navigate"
                :aria-current="isActive ? (isExactActive ? 'page' : 'true') : undefined"
                :class="{ active: isActive, 'exact-active': isExactActive }"
              >
                <AppIcon
                  v-if="icon"
                  :name="icon"
                  aria-hidden="true"
                />
                {{ label }}
              </a>
            </RouterLink>
          </li>
          <li
            v-for="({ name, label, icon, badge }, index) in rightLinks"
            :key="`auth-link-${index}`"
          >
            <RouterLink
              :to="{ name }"
              custom
              v-slot="{ href, navigate, isActive, isExactActive }"
            >
              <a
                :href="href"
                @click="navigate"
                :aria-current="isActive ? (isExactActive ? 'page' : 'true') : undefined"
                :class="{ active: isActive, 'exact-active': isExactActive }"
              >
                <AppIcon
                  v-if="icon"
                  :name="icon"
                  aria-hidden="true"
                />
                {{ label }}
                <MessageCounter
                  v-if="badge"
                  :value="badge"
                />
              </a>
            </RouterLink>
          </li>
        </ul>
        <ul v-if="AuthComponent">
          <li>
            <component :is="AuthComponent" />
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
import { translate } from '@shared/i18n'

import { useAppHeaderLinks } from '@shared/composables/useAppHeaderLinks'
import { useBreadcrumbs } from '@shared/composables/useBreadcrumbs'

import AppHeaderLogoLink from '@shared/components/AppHeaderLogoLink/AppHeaderLogoLink.vue'
import AppIcon from '@shared/components/AppIcon/AppIcon.vue'
import BreadcrumbBar from '@shared/components/BreadcrumbBar/BreadcrumbBar.vue'
import MessageCounter from '@shared/components/MessageCounter/MessageCounter.vue'

import vCollapsible from '@shared/directives/collapsible'

const { breadcrumbs } = useBreadcrumbs()
const { leftLinks, rightLinks, AuthComponent } = await useAppHeaderLinks()
</script>

<style lang="scss" scoped>
.app-header {
  @include hide-print;

  --header-navigation-list-item-align-items: center;
}
</style>
