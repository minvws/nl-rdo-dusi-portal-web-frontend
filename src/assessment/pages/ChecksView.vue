<template>
  <ChecksOverview v-if="isOverviewRoute" />
  <RouterView v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import ChecksOverview from '@assessment/pages/ChecksOverview.vue'

import { CHECKS_OVERVIEW } from '@assessment/router/names'

const route = useRoute()

const isOverviewRoute = computed<boolean>(() => route.name === CHECKS_OVERVIEW)
</script>
