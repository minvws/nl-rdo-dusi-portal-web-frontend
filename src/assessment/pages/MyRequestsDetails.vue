<template>
  <Suspense>
    <template #default>
      <AppLoader
        v-if="isFetching"
        centered
      />
      <div v-else-if="error">Error: {{ error }}</div>
      <template v-else-if="!isFetching && assessment">
        <ReviewRequestOverview v-bind="{ ...assessment.data }" />
      </template>
      <p v-else>Geen details beschikbaar</p>
    </template>
    <template #fallback>
      <AppLoader centered />
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import AppLoader from '@shared/components/AppLoader/AppLoader.vue'
import ReviewRequestOverview from '@assessment/components/ReviewRequestOverview/ReviewRequestOverview.vue'

import { useAssessmentStore } from '@shared/store/useAssessmentStore'

const assessmentStore = useAssessmentStore()
const route = useRoute()

const { id } = route.params
const { assessment, isFetching, error } = storeToRefs(assessmentStore)

onBeforeMount(() => assessmentStore.fetchAssessment(id as string))
</script>
