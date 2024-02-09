<template>
  <dl class="description-list">
    <div
      v-for="({ term, type, text, url, field, files, formId }, index) in items"
      :key="index"
    >
      <dt>{{ term }}</dt>
      <dd v-if="type === 'string'">{{ text }}</dd>
      <dd v-else-if="text && type === 'date'">
        {{ formatDate(text, locale) }}
      </dd>
      <dd v-else-if="type === 'url'">
        <a
          :href="url"
          :title="text"
          target="_blank"
          rel="external"
        >
          {{ text }}
        </a>
      </dd>
      <dd v-else-if="files && field && formId && type === 'file'">
        <AppFileLink
          v-for="(file, index) in files"
          :key="`${field}-${index}`"
          :field="field"
          :file="file"
          :form-id="formId"
        />
      </dd>
    </div>
  </dl>
</template>

<script setup lang="ts">
import type { DescriptionListItem } from '@shared/types/details'

import { useI18n } from 'vue-i18n'

import AppFileLink from '@shared/components/AppFileLink/AppFileLink.vue'

import { formatDate } from '@shared/utils/date'

type Props = {
  items: DescriptionListItem[]
}

defineProps<Props>()

const { locale, t } = useI18n()
</script>

<style lang="scss" scoped>
dl > div {
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--grey-2);

  &:nth-child(odd) {
    background-color: transparent;
  }

  + div {
    padding-top: 0.75rem;
  }

  dd {
    font-weight: bold;
  }
}
</style>
