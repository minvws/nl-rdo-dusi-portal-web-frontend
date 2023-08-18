<template>
  <div
    class="subsidy-summary card"
    role="group"
    :aria-label="translate('component.subsidySummary.aria-label')"
  >
    <h3>{{ title }}</h3>
    <span class="de-emphasized">
      <time :datetime="validFrom">{{ formattedDate(validFrom) }}</time>
      <template v-if="validTo">
        -
        <time :datetime="validTo">{{ formattedDate(validTo) }}</time>
      </template>
    </span>
    <p>{{ description }}</p>
    <RouterLink
      v-if="readMore"
      :to="readMore"
      >{{ translate('component.subsidySummary.link', { title }) }}</RouterLink
    >
    <RouterLink
      :to="link"
      rel="noopener noreferrer external"
      class="button ghost"
      >{{ translate('component.subsidySummary.button') }}</RouterLink
    >
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { translate } from '@shared/i18n'
import { EXTERNAL_DETAIL } from '@shared/router/names'

export type SubsidySummaryProps = {
  description: string
  publishedForm: {
    id: string
    version: number
  }
  readMore?: string
  title: string
  validFrom: string
  validTo?: string
  subsidy_page_url: string
}

const props = defineProps<SubsidySummaryProps>()

const { locale } = useI18n()

const options = {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
} as Intl.DateTimeFormatOptions

const link = computed(() => {
  return {
    name: EXTERNAL_DETAIL,
    params: {
      id: props.publishedForm.id,
      url: props.subsidy_page_url
    }
  }
})
function formattedDate(date: string) {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString(locale.value, options)
}
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
