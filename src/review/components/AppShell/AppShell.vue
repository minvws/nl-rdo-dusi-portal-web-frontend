<template>
  <a
    href="#main-content"
    class="button skip-to-content"
  >
    {{ translate('app.skip-content') }}
  </a>
  <AppHeader />
  <AppContent>
    <RouterView />
  </AppContent>
  <AppFooter />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import { translate } from '@shared/i18n'

import AppContent from '@shared/components/AppContent/AppContent.vue'
import AppFooter from '@shared/components/AppFooter/AppFooter.vue'
import AppHeader from '@review/components/AppHeader/AppHeader.vue'
</script>
