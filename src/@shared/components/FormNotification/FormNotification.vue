<template>
  <AppHtml
    as="p"
    :class="displayAs"
    :html="html"
  />
</template>

<script setup lang="ts">
import { type Notification } from '@shared/types/notification'
import { translate } from '@shared/i18n'
import { computed } from 'vue'
import AppHtml from '@shared/components/AppHtml/AppHtml.vue'

const props = defineProps<Notification>()
const translatedType = computed(() => translate(`component.formNotification.${props.displayAs}`))

const message = computed(() => {
  if (typeof props.message === 'object') {
    return props.message?.message
  }
  return props.message
})

const html = computed(() => `<span>${props.label ?? translatedType.value}:</span> ${message.value}`)
</script>
