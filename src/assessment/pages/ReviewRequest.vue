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
          v-bind:is="requestTypeComponent"
          v-bind="{ ...data, id }"
        ></component>
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

import { useApiAssessmentDetailsUrl } from '@shared/composables/useApiUrl'

import AppLoader from '@shared/components/AppLoader/AppLoader.vue'
import NotFound from '@shared/pages/NotFound.vue'
import NewReview from '@assessment/pages/NewReview.vue'
import SubsequentReview from '@assessment/pages/SubsequentReview.vue'

type Props = {
  id: string
}

defineProps<Props>()

const route = useRoute()

const url = useApiAssessmentDetailsUrl(route.params.id as string)

const { data, error, isFetching } = useFetch(url).json()

const requestTypeComponent = computed(() => {
  const { type } = data.value
  console.log(type)
  switch (type) {
    // case 'first':
    //   return SubsequentReview
    case 'new':
      return NewReview
    // case 'subsequent':
    //   return SubsequentReview
    default:
      // @TODO: find better alternative
      return NotFound
  }
})
</script>
