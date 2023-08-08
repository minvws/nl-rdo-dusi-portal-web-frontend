<template>
  <dl class="description-list">
    <div
      v-for="({ term, details }, index) in items"
      :key="index"
    >
      <dt>{{ term }}</dt>
      <dd v-if="details.type === 'string'">
        {{ details.text }}
      </dd>
      <dd v-else-if="details.type === 'date'">
        {{ formatDate(details.text, locale) }}
      </dd>
      <dd v-else-if="details.type === 'url'">
        <a
          :href="details.url"
          :title="details.text"
        >
          {{ details.text }}
        </a>
      </dd>
    </div>
  </dl>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import formatDate from '@/shared/util/format-date'

import type { DescriptionListItem } from '@/shared/type/details-types'

type Props = {
  items: DescriptionListItem[]
}

defineProps<Props>()

const { locale } = useI18n()
</script>
