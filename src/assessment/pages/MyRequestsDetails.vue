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

import { useApiRequestDetailsUrl } from '@shared/composables/useApiUrl'

import AppLoader from '@shared/components/AppLoader/AppLoader.vue'
import NotFound from '@shared/pages/NotFound.vue'

import ApprovedReview from '@review/pages/ApprovedReview.vue'
import NewReview from '@review/pages/NewReview.vue'
import RejectedReview from '@review/pages/RejectedReview.vue'

type Props = {
  id: string
}

defineProps<Props>()

const route = useRoute()

const url = useApiRequestDetailsUrl(route.params.id as string)

const { data, error, isFetching } = useFetch(url).json()

const requestTypeComponent = computed(() => {
  switch (data.value.type) {
    case 'approved':
      return ApprovedReview
    case 'new':
      return NewReview
    case 'rejected':
      return RejectedReview
    default:
      // @TODO: find better alternative
      return NotFound
  }
})
</script>
