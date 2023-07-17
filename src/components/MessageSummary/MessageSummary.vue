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
    <a :href="link" class="button ghost" target="_blank" rel="noopener">
      {{ translate('component.messageSummary.button') }}
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { translate } from '@/i18n'

export type MessageSummaryProps = {
  date: string
  description?: string
  link: string
  title: string
}

const props = defineProps<MessageSummaryProps>()

const options = {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
} as Intl.DateTimeFormatOptions

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
