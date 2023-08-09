<template>
  <MyRequestsOverview v-if="isOverviewRoute" />
  <RouterView v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import MyRequestsOverview from '@review/pages/MyRequestsOverview.vue'

import { MY_REQUESTS_OVERVIEW } from '@shared/router/names'

const route = useRoute()

const isOverviewRoute = computed(() => [MY_REQUESTS_OVERVIEW].includes(route.name as string))
</script>
