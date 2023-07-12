<template>
  <a href="#main-content" class="button skip-to-content"> {{ translate('app.skip-content') }} </a>
  <AppHeader />
  <AppContent>
    <RouterView />
  </AppContent>
  <AppFooter />
</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'

import { translate } from '@/i18n'

import { useAuthStore } from '@/store/useAuthStore'

import AppFooter from '@/components/AppFooter/AppFooter.vue'
import AppHeader from '@/components/AppHeader/AppHeader.vue'
import AppContent from '@/components/AppContent/AppContent.vue'

const authStore = useAuthStore()
const router = useRouter()

router.afterEach((to, from) => {
  authStore.checkUserStatus()
})
</script>
