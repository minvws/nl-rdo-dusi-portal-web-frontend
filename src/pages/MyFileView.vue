<template>
  <MyFileOverview v-if="isOverviewRoute" />
  <RouterView v-else />
  <NotificationObligation />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import MyFileOverview from '@/pages/MyFileOverview.vue'
import NotificationObligation from '@/components/NotificationObligation/NotificationObligation.vue'

const route = useRoute()

const isOverviewRoute = computed(() => route.name === 'my-file-overview')
</script>
