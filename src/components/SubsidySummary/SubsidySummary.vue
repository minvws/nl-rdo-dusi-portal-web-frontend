<template>
  <div
    class="subsidy-summary card"
    role="group"
    :aria-label="translate('component.subsidySummary.aria-label')"
  >
    <h3>{{ title }}</h3>
    <span class="de-emphasized">
      <time :datetime="startDate">{{ formattedStartDate }}</time> -
      <time :datetime="endDate">{{ formattedEndDate }}</time>
    </span>
    <p>{{ description }}</p>
    <RouterLink v-if="readMore" :to="readMore">{{
      translate('component.subsidySummary.link', { title })
    }}</RouterLink>
    <RouterLink :to="link" class="button ghost">{{
      translate('component.subsidySummary.button')
    }}</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { translate } from '@/i18n'
import name from '@/router/name'
import { useI18n } from 'vue-i18n'
import type { DateTimeFormatOptions } from '@intlify/core-base'

export type SubsidySummaryProps = {
  startDate: string
  endDate: string
  title: string
  description: string
  form: {
    id: string
    version: number
  }
  readMore?: string
}

const props = defineProps<SubsidySummaryProps>()

const { locale } = useI18n()

const options = {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
} as DateTimeFormatOptions

const formattedStartDate = computed(() => {
  const date = new Date(props.startDate)
  return date.toLocaleDateString(locale.value, options)
})

const formattedEndDate = computed(() => {
  const date = new Date(props.endDate)
  return date.toLocaleDateString(locale.value, options)
})

const link = computed(() => ({
  name: name.ARRANGEMENT_DETAILS,
  params: {
    id: props.form.id
  }
}))
</script>

<style lang="scss" scoped>
.subsidy-summary {
  --card-border-width: 0;
  --card-breakpoint-1-padding-top: 1rem;
  --card-breakpoint-2-padding-top: 1rem;
  --card-breakpoint-1-padding-right: 1rem;
  --card-breakpoint-2-padding-right: 1rem;
  --card-breakpoint-1-padding-bottom: 1rem;
  --card-breakpoint-2-padding-bottom: 1rem;
  --card-breakpoint-1-padding-left: 1rem;
  --card-breakpoint-2-padding-left: 1rem;
}

.subsidy-summary > p {
  margin: 1rem 0;
}

.subsidy-summary .button {
  margin-top: 1rem;
}
</style>
