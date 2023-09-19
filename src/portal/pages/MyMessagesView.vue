<template>
  <MyMessagesOverview v-if="isOverviewRoute" />
  <RouterView v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import MyMessagesOverview from '@portal/pages/MyMessagesOverview.vue'

import { MY_MESSAGES_OVERVIEW, MY_MESSAGES_PAGE } from '@portal/router/names'

const route = useRoute()

const isOverviewRoute = computed(
  () => route.name === MY_MESSAGES_OVERVIEW || route.name === MY_MESSAGES_PAGE
)
</script>
