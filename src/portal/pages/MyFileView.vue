<template>
  <MyFileOverview v-if="isOverviewRoute" />
  <RouterView v-else />
  <NotificationObligation />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import MyFileOverview from '@portal/pages/MyFileOverview.vue'
import NotificationObligation from '@portal/components/NotificationObligation/NotificationObligation.vue'

const route = useRoute()

const isOverviewRoute = computed(() => route.name === 'my-file-overview')
</script>
