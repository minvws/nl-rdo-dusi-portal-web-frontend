<template>
  <AppHtml
    as="p"
    :class="displayAs"
    :html="html"
  />
</template>

<script setup lang="ts">
import { translate } from '@/shared/i18n'
import { computed } from 'vue'
import AppHtml from '@/shared/components/AppHtml/AppHtml.vue'

type Props = {
  message: string
  displayAs: 'error' | 'warning' | 'explanation' | 'success'
}

const props = defineProps<Props>()

const translatedType = computed(() => translate(`component.formNotification.${props.displayAs}`))
const html = computed(() => `<span>${translatedType.value}:</span> ${props.message}`)
</script>
