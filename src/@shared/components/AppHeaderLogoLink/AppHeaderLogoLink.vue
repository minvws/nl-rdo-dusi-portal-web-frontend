<template>
  <RouterLink
    to="/"
    class="app-header-logo-link"
    :aria-label="t('component.header.homeLink.aria-label')"
  >
    <img
      class="logo-desktop"
      :src="logo.desktop"
      :alt="t('component.header.homeLink.alt')"
      width="314"
      height="125"
    />
    <img
      class="logo-mobile"
      :src="logo.mobile"
      :alt="t('component.header.homeLink.alt')"
      width="40"
      height="70"
    />
    <span class="visually-hidden">{{ t('component.header.homeLink.label') }}</span>
  </RouterLink>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const logo = {
  desktop: '/img/vws_dusi_logo.svg',
  mobile: '/img/vws_dusi_logo-mobile.svg'
}
</script>

<style lang="scss" scoped>
.app-header-logo-link {
  position: relative;
  left: -5px;
  text-decoration: none;

  .logo-desktop {
    display: none;
  }

  @include desktop {
    left: 132px;

    .logo-desktop {
      display: block;
    }

    .logo-mobile {
      display: none;
    }
  }
}
</style>
