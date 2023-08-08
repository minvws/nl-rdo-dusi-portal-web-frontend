<template>
  <ArrangementDetails v-if="isDetailsRoute" />
  <RouterView v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import ArrangementDetails from '@/shared/pages/ArrangementDetails.vue'

const route = useRoute()

const isDetailsRoute = computed(() => route.name === 'arrangement-details')
</script>
