<template>
  <AppHtml
    as="p"
    :class="displayAs"
    :html="html"
  />
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'
import { computed } from 'vue'
import AppHtml from '@shared/components/AppHtml/AppHtml.vue'

type Props = {
  message: string | { message?: string }
  displayAs: 'error' | 'warning' | 'explanation' | 'success'
}

const props = defineProps<Props>()
const translatedType = computed(() => translate(`component.formNotification.${props.displayAs}`))

const message = computed(() => {
  if (typeof props.message === 'object') {
    return props.message?.message
  }
  return props.message
})

const html = computed(() => `<span>${translatedType.value}:</span> ${message.value}`)
</script>
