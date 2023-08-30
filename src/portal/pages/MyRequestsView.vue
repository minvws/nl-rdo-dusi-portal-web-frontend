<template>
  <MyRequestsOverview v-if="isOverviewRoute" />
  <RouterView v-else />
  <NotificationObligation />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import MyRequestsOverview from '@portal/pages/MyRequestsOverview.vue'
import NotificationObligation from '@portal/components/NotificationObligation/NotificationObligation.vue'

const route = useRoute()

const isOverviewRoute = computed(() => route.name === 'my-requests-overview')
</script>
