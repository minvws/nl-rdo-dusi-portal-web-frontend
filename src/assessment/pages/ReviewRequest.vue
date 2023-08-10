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
          v-bind="data"
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

import { useApiRequestDetailsUrl } from '@shared/composables/useApiUrl'

import AppLoader from '@shared/components/AppLoader/AppLoader.vue'
import NotFound from '@shared/pages/NotFound.vue'
import SubsequentReview from '@assessment/pages/SubsequentReview.vue'

type Props = {
  id: string
}

defineProps<Props>()

const route = useRoute()

const url = useApiRequestDetailsUrl(route.params.id as string)

const { data, error, isFetching } = useFetch(url).json()

const requestTypeComponent = computed(() => {
  switch (data.value.type) {
    case 'first':
      return SubsequentReview
    case 'new':
      return SubsequentReview
    case 'subsequent':
      return SubsequentReview
    default:
      // @TODO: find better alternative
      return NotFound
  }
})
</script>
