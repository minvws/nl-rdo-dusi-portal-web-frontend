<template>
  <MyCasesOverview v-if="isOverviewRoute" />
  <RouterView v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import MyCasesOverview from '@assessment/pages/MyCasesOverview.vue'

import { MY_CASES_OVERVIEW } from '@assessment/router/names'

const route = useRoute()

const isOverviewRoute = computed<boolean>(() => [MY_CASES_OVERVIEW].includes(route.name as string))
</script>
