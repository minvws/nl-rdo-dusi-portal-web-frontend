<template>
  <ReportsOverview v-if="isOverviewRoute" />
  <RouterView v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import ReportsOverview from '@assessment/pages/ReportsOverview.vue'

import { REPORTS_OVERVIEW } from '@assessment/router/names'

const route = useRoute()

const isOverviewRoute = computed<boolean>(() => route.name === REPORTS_OVERVIEW)
</script>
