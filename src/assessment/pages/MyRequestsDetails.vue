<template>
  <Suspense>
    <template #default>
      <AppLoader
        v-if="isFetching"
        centered
      />
      <div v-else-if="error">Error: {{ error }}</div>
      <ReviewRequestOverview v-else-if="!isFetching && data" v-bind="{ ...data }" />
      <p v-else>Geen details beschikbaar</p>
    </template>
    <template #fallback>
      <AppLoader centered />
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

import { useFetchAssessment } from '@assessment/composables/useFetchAssessment'

import AppLoader from '@shared/components/AppLoader/AppLoader.vue'
import ReviewRequestOverview from '@assessment/components/ReviewRequestOverview/ReviewRequestOverview.vue'

const route = useRoute()

const { id } = route.params

const { data, error, isFetching } = useFetchAssessment(id as string)
</script>
