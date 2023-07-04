<template>
  <div v-if="errorMessage || loadingMessage" class="form-loader-message">
    <template v-if="loadingMessage">
      <AppLoader />
      {{ loadingMessage }}
    </template>
    <FormNotification v-else-if="errorMessage" type="error" :message="errorMessage" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { translate } from '@/i18n'

import AppLoader from '@/components/AppLoader/AppLoader.vue'
import FormNotification from '@/components/form/FormNotification/FormNotification.vue'

const props = defineProps<{ isLoading?: boolean; isSubmitting?: boolean; error?: string }>()

const loadingMessage = computed(() => {
  return (
    (props.isLoading && translate('form.message.loading')) ||
    (props.isSubmitting && translate('form.message.submitting'))
  )
})

const errorMessage = computed(() => {
  const { error } = props
  if (!error) return undefined
  return translate('form.message.loadingError', { error })!
})
</script>
