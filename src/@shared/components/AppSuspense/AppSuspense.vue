<template>
  <component :is="is">
    <slot name="title" />
    <Suspense>
      <template #default>
        <template v-if="isFetching">
          <AppLoader
            v-if="showLoader"
            :centered="loaderIsCentered"
        /></template>
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
        <AppLoader :centered="loaderIsCentered" />
      </template>
    </Suspense>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import AppLoader from '@shared/components/AppLoader/AppLoader.vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'

type Error = { message?: string; code?: string }

type Props = {
  as?: string
  data?: [] | object | undefined
  error: Error | string | undefined
  isFetching: boolean
  loaderIsCentered?: boolean
  showLoader?: boolean
}

const props = withDefaults(defineProps<Props>(), { loaderIsCentered: true, showLoader: true })

const errorMessage = computed<Error | string | undefined>(() => {
  if (!props.error) return undefined
  if (typeof props.error === 'object' && props.error?.message) {
    return props.error.message
  }
  return props.error
})

const hasData = computed<boolean>(
  () =>
    props.data !== null &&
    props.data !== undefined &&
    (Array.isArray(props.data) ? props.data.length > 0 : Object.keys(props.data).length > 0)
)

const is = computed<string>(() => props.as || 'div')
</script>
