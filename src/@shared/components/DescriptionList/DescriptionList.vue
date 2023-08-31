<template>
  <dl class="description-list">
    <div
      v-for="({ term, type, text, url }, index) in items"
      :key="index"
    >
      <dt>{{ term }}</dt>
      <dd v-if="type === 'string'">
        {{ text }}
      </dd>
      <dd v-else-if="type === 'date'">
        {{ formatDate(text, locale) }}
      </dd>
      <dd v-else-if="type === 'url' || type === 'file'">
        <a
          :href="url"
          :title="text"
          :download="type === 'file'"
          rel="external"
        >
          {{ text }}
        </a>
      </dd>
    </div>
  </dl>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { formatDate } from '@shared/utils/date'

import type { DescriptionListItem } from '@shared/types/details'

type Props = {
  items: DescriptionListItem[]
}

defineProps<Props>()

const { locale } = useI18n()
</script>

<style lang="scss" scoped>
dl > div {
  display: grid;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--grey-2);

  &:nth-child(odd) {
    background-color: transparent;
  }

  + div {
    padding-top: 0.75rem;
  }

  dt {
    width: 100%;
  }

  dd {
    font-weight: bold;
  }
}
</style>
