<template>
  <MyDetailsOverview v-if="isDetailsRoute" />
  <RouterView v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import MyDetailsOverview from '@portal/pages/MyDetailsOverview.vue'

const route = useRoute()

const isDetailsRoute = computed<boolean>(() => route.name === 'my-details-overview')
</script>
