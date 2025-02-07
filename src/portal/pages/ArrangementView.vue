<template>
  <ArrangementOverview :id="id" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import ArrangementOverview from '@portal/pages/ArrangementOverview.vue'

const route = useRoute()

const id = computed<string>(() => route.params.id as string)
</script>
