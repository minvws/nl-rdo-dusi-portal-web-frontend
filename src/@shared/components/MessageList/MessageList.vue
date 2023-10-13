<template>
  <div class="message-list">
    <div
      class="message-list-item"
      v-for="({ date, formattedDate, to, title }, index) in list"
      :key="`list-item-${index}`"
    >
      <RouterLink
        class="message-list-content"
        :to="to"
      >
        <time :datetime="date">
          {{ formattedDate }}
        </time>
        <div>
          {{ title }}
        </div>
        <AppIcon
          class="icon"
          name="chevron-right"
        />
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LocationAsRelativeRaw } from 'vue-router'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppIcon from '@shared/components/AppIcon/AppIcon.vue'

import { formatDate } from '@shared/utils/date'

type Props = {
  items: {
    date: string
    title: string
    to: LocationAsRelativeRaw
  }[]
}
const props = defineProps<Props>()

const { locale } = useI18n()

const list = computed(() =>
  props.items.map(item => ({ ...item, formattedDate: formatDate(item.date, locale.value) }))
)
</script>

<style lang="scss" scoped>
.message-list {
  gap: 0;
  width: 100%;
}

.message-list-item {
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid var(--grey-2);
  cursor: pointer;

  &:hover {
    background: var(--grey-1);

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      border-left: 4px solid var(--branding-color-1-background-color);
    }
  }

  .icon {
    margin-left: auto;
    color: var(--branding-color-1-background-color);
    font-size: 1em;
  }
}

.message-list-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: 100%;
  padding: 0.666em 1em;
  text-decoration: none;

  time {
    width: 10em;
    color: var(--grey-6);
    font-size: 0.8em;
  }
}
</style>
