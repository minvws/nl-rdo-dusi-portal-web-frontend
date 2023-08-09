<template>
  <ArrangementsOverview
    v-if="isOverviewRoute"
    v-bind="props"
  />
  <RouterView v-else />
  <MoreInfo />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import MoreInfo from '@portal/components/MoreInfo/MoreInfo.vue'

import ArrangementsOverview from '@portal/pages/ArrangementsOverview.vue'

type Props = {
  page?: string
}

const props = defineProps<Props>()

const route = useRoute()

const isOverviewRoute = computed(
  () => ['arrangements-overview', 'arrangements-overview-page'].includes(route.name as string) // @TODO: we should solve this in the routes
)
</script>
