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
      display-as="error"
      :message="errorMessage"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useI18n } from 'vue-i18n'

import AppLoader from '@shared/components/AppLoader/AppLoader.vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'

type Props = {
  error?: string
  isFetching?: boolean
  isSubmitting?: boolean
}

const props = defineProps<Props>()

const { t } = useI18n()

const loadingMessage = computed<string | false | undefined>(
  () =>
    (props.isFetching && t('form.message.loading')) ||
    (props.isSubmitting && t('form.message.submitting'))
)

const errorMessage = computed<string | undefined>(() => {
  const { error } = props
  if (!error) return undefined
  return t('form.message.loading_error', { error })
})
</script>
