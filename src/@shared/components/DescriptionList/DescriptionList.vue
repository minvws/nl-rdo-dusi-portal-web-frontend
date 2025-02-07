<template>
  <dl class="description-list" :class="{ 'without-borders': showBorders === false }">
    <div
      v-for="({ term, type, text, url, field, files, formId }, index) in items"
      :key="index"
    >
      <dt>{{ term }}</dt>
      <dd>
        <template v-if="type === 'string'">{{ text }}</template>
        <template v-else-if="text && type === 'date'">{{ formatAsReadableDate(text, locale) }}</template>
        <template v-else-if="type === 'url'">
          <a
            :href="url"
            :title="text"
            target="_blank"
            rel="external"
          >
            {{ text }}
          </a>
        </template>
        <template v-else-if="files && field && formId && type === 'file'">
          <AppFileLink
            v-for="(file, index) in files"
            :key="`${field}-${index}`"
            :field="field"
            :file="file"
            :form-id="formId"
          />
        </template>
      </dd>
    </div>
  </dl>
</template>

<script setup lang="ts">
import type { DescriptionListItem } from '@shared/types/details'

import { useI18n } from 'vue-i18n'

import AppFileLink from '@shared/components/AppFileLink/AppFileLink.vue'

import { formatAsReadableDate } from '@shared/utils/date'

type Props = {
  items: DescriptionListItem[],
  showBorders?: boolean
}

defineProps<Props>()

const { locale, t } = useI18n()
</script>

<style lang="scss" scoped>
.description-list {
  --description-list-item-padding: 0.75rem 0.25rem;
  --description-list-border-width: 0 0 1px 0;
  --description-list-border-color: var(--grey-2);
  --description-list-border-style: solid;
}

.description-list.without-borders {
  --description-list-border-width: 0;
}

dl > div {
  &:nth-child(odd) {
    background-color: transparent;
  }
}

dd {
  white-space: break-spaces;
}
</style>
