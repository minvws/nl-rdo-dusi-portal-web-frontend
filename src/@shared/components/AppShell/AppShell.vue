<template>
  <a
    href="#main-content"
    class="button skip-to-content"
  >
    {{ translate('app.skip-content') }}
  </a>
  <Suspense><AppHeader /></Suspense>
  <AppContent>
    <AppNotifications />
    <RouterView />
  </AppContent>
  <AppFooter />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import { translate } from '@shared/i18n'

import AppContent from '@shared/components/AppContent/AppContent.vue'
import AppFooter from '@shared/components/AppFooter/AppFooter.vue'
import AppHeader from '@shared/components/AppHeader/AppHeader.vue'
import AppNotifications from '@shared/components/AppNotifications/AppNotifications.vue'
</script>
