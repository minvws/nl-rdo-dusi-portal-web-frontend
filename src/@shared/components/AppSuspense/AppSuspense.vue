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
          v-else-if="errorMessage"
          display-as="error"
          :message="errorMessage"
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
  data?: [] | object | null
  error: { message?: string, code?: string } | string | null
  isFetching: boolean
}

const props = defineProps<Props>()

const errorMessage = computed(() => {
  if (!props.error) return undefined
  if (typeof props.error === 'object' && props.error?.message) {
    return props.error.message
  }
  return props.error
})

const hasData = computed(
  () =>
    props.data !== null &&
    props.data !== undefined &&
    (Array.isArray(props.data) ? props.data.length > 0 : Object.keys(props.data).length > 0)
)

const is = computed(() => (props.as ? props.as : 'div'))
</script>
