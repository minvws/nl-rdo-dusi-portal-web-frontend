<template>
  <a href="#main-content" class="button skip-to-content"> {{ translate('app.skip-content') }} </a>
  <AppHeader />
  <AppContent>
    <RouterView />
  </AppContent>
  <AppFooter />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import { translate } from '@/i18n'

import AppContent from '@/components/AppContent/AppContent.vue'
import AppFooter from '@/components/AppFooter/AppFooter.vue'
import AppHeader from '@/components/AppHeader/AppHeader.vue'
</script>
