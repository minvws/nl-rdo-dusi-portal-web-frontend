<template>
  <component :is="is">
    <slot name="title" />
    <Suspense>
      <template #default>
        <AppLoader
          v-if="isFetching"
          centered
        />
        <FormNotification
          v-else-if="error"
          display-as="error"
          :message="error"
        />
        <template v-else-if="!isFetching && hasData">
          <slot />
        </template>
        <template v-else>
          <slot name="fallback" />
        </template>
      </template>
      <template #fallback>
        <AppLoader centered />
      </template>
    </Suspense>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import AppLoader from '@shared/components/AppLoader/AppLoader.vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'

type Props = {
  as?: string
  data: [] | object
  error: string | null
  isFetching: boolean
}

const props = defineProps<Props>()

const hasData = computed(
  () =>
    props.data !== null &&
    props.data !== undefined &&
    (Array.isArray(props.data) ? props.data.length > 0 : Object.keys(props.data).length > 0)
)

const is = computed(() => (props.as ? props.as : 'div'))
</script>
