<template>
  <div
    v-if="errorMessage || loadingMessage"
    class="form-loader-message"
  >
    <template v-if="loadingMessage">
      <AppLoader />
      {{ loadingMessage }}
    </template>
    <FormNotification
      v-else-if="errorMessage"
      displayAs="error"
      :message="errorMessage"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { translate } from '@shared/i18n'

import AppLoader from '@shared/components/AppLoader/AppLoader.vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'

type Props = {
  error?: string
  isLoading?: boolean
  isSubmitting?: boolean
}

const props = defineProps<Props>()

const loadingMessage = computed(() => {
  return (
    (props.isLoading && translate('form.message.loading')) ||
    (props.isSubmitting && translate('form.message.submitting'))
  )
})

const errorMessage = computed(() => {
  const { error } = props
  if (!error) return undefined
  return translate('form.message.loadingError', { error })
})
</script>
