<template>
  <AnnouncementContainer />
  <SkipToContentLink />
  <Suspense>
    <AppHeader />
  </Suspense>
  <AppContent>
    <AppNotifications />
    <RouterView />
  </AppContent>
  <AppFooter />
  <AppModal />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import AnnouncementContainer from '@shared/components/AnnouncementContainer/AnnouncementContainer.vue'
import AppContent from '@shared/components/AppContent/AppContent.vue'
import AppFooter from '@shared/components/AppFooter/AppFooter.vue'
import AppHeader from '@shared/components/AppHeader/AppHeader.vue'
import AppModal from '@shared/components/AppModal/AppModal.vue'
import AppNotifications from '@shared/components/AppNotifications/AppNotifications.vue'
import SkipToContentLink from '@shared/components/SkipToContentLink/SkipToContentLink.vue'
</script>
