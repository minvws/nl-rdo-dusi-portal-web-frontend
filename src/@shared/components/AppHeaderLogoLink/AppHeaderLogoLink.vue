<template>
  <RouterLink
    to="/"
    class="app-header-logo-link"
    :aria-label="translate('component.header.homeLink.aria-label')"
  >
    <img
      class="logo-desktop"
      :src="logo.desktop"
      :alt="translate('component.header.homeLink.alt')"
    />
    <img
      class="logo-mobile"
      :src="logo.mobile"
      :alt="translate('component.header.homeLink.alt')"
    />
    <span class="visually-hidden">{{ translate('component.header.homeLink.label') }}</span>
  </RouterLink>
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'

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
