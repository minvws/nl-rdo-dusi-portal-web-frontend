<template>
  <ArrangementsOverview v-if="isOverviewRoute" />
  <RouterView v-else />
  <MoreInfo />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import ArrangementsOverview from '@/pages/ArrangementsOverview.vue'
import MoreInfo from '@/components/MoreInfo/MoreInfo.vue'

const route = useRoute()

const isOverviewRoute = computed(() => route.name === 'arrangements-overview')
</script>
