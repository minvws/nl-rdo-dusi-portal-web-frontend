<template>
  <Suspense>
    <template #default>
      <AppLoader
        v-if="isFetching"
        centered
      />
      <div v-else-if="error">Error: {{ error }}</div>
      <template v-else-if="!isFetching && data">
        <component
          v-bind:is="componentType"
          v-bind="{ id }"
        />
      </template>
      <p v-else>Geen details beschikbaar</p>
    </template>
    <template #fallback>
      <AppLoader centered />
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useFetch } from '@vueuse/core'

import { useApiAssessmentDetailsUrl } from '@shared/composables/useAssessmentApiUrl'

import AppLoader from '@shared/components/AppLoader/AppLoader.vue'
import NotFound from '@shared/pages/NotFound.vue'

import ReviewRequest from '@assessment/pages/ReviewRequest.vue'
import SubsequentReview from '@assessment/pages/SubsequentReview.vue'

type Props = {
  id: string
}

defineProps<Props>()

const route = useRoute()

const url = useApiAssessmentDetailsUrl(route.params.id as string)

const { data, error, isFetching } = useFetch(url).json()

const componentType = computed(() => {
  const { type } = data.value
  switch (type) {
    case 'new':
      return ReviewRequest
    case 'first':
      return SubsequentReview
    case 'subsequent':
      return SubsequentReview
    default:
      // @TODO: find better alternative
      return NotFound
  }
})
</script>
