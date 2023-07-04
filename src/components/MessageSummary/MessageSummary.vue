<template>
  <div
    class="message-summary card"
    role="group"
    :aria-label="translate('component.messageSummary.aria-label')"
  >
    <span class="de-emphasized">
      <time :datetime="date">{{ formattedDate }}</time>
    </span>
    <h4>{{ title }}</h4>
    <p v-if="description">{{ description }}</p>
    <RouterLink :to="link" class="button ghost">
      {{ translate('component.messageSummary.button') }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DateTimeFormatOptions } from '@intlify/core-base'
import { translate } from '@/i18n'

export type MessageSummaryProps = {
  description?: string
  date: string
  link: string
  title: string
}

const props = defineProps<MessageSummaryProps>()

const options = {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
} as DateTimeFormatOptions

const formattedDate = computed(() => {
  const date = new Date(props.date)
  return date.toLocaleDateString('nl-NL', options)
})
</script>

<style lang="scss" scoped>
.message-summary {
  --card-breakpoint-1-padding-top: 1rem;
  --card-breakpoint-2-padding-top: 1rem;
  --card-breakpoint-1-padding-bottom: 1rem;
  --card-breakpoint-2-padding-bottom: 1rem;
}
.message-summary .de-emphasized {
  align-self: flex-end;
}

.message-summary > p {
  margin: 1rem 0 0;
}

.message-summary .button {
  margin: 1rem 0 0;
}
</style>
