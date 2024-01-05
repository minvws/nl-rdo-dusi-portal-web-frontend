<template>
  <ArrangementDetails v-if="isDetailsRoute" />
  <RouterView v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import ArrangementDetails from '@portal/pages/ArrangementDetails.vue'

import { ARRANGEMENT_DETAILS } from '@portal/router/names'

const route = useRoute()

const isDetailsRoute = computed<boolean>(() => route.name === ARRANGEMENT_DETAILS)
</script>
