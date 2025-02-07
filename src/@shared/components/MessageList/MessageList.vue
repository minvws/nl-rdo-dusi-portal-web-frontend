<template>
  <div class="message-list">
    <div
      v-for="({ date, formattedDate, to, title, unread }, index) in list"
      :key="index"
      class="message-list-item"
      :class="{ 'message-list-item--unread': unread }"
      :aria-label="setAriaLabel(unread)"
    >
      <RouterLink
        class="message-list-content"
        :to="to"
        :title="formatTitle(title, unread)"
      >
        <time :datetime="date">
          {{ formattedDate }}
        </time>
        <div class="message-list-content__title">
          {{ title }}
        </div>
        <div
          v-if="unread"
          class="message-list-content__label"
        >
          <span>Nieuw</span>
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
import type { MessagesItem } from '@shared/types/messages'
import type { PaginationItem } from '@shared/types/pagination'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppIcon from '@shared/components/AppIcon/AppIcon.vue'

import { formatAsReadableDate } from '@shared/utils/date'

type Props = {
  items: PaginationItem[]
}

const props = defineProps<Props>()

const { locale } = useI18n()

const list = computed<MessagesItem[]>(() =>
  props.items.map(
    (item) =>
      ({
        ...item,
        formattedDate: formatAsReadableDate(item.date as string, locale.value)
      }) as MessagesItem
  )
)

function setAriaLabel(unread: boolean): string {
  return unread ? 'Nieuw bericht' : 'Bericht'
}

function formatTitle(title: string, unread: boolean): string {
  return `Bekijk ${unread ? 'nieuw' : ' '} bericht: ${title}`
}
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
    background-color: var(--grey-1);

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
    color: var(--branding-color-1-background-color);
    font-size: 1em;
  }
}

.message-list-item--unread {
  font-weight: bold;
  background-color: var(--ruby-red-tint-2-background-color);

  &:hover {
    background-color: var(--ruby-red-tint-1-background-color);
  }
}

.message-list-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 1rem;
  width: 100%;
  max-width: 100%;
  padding: 0.666em 1em;
  text-decoration: none;

  time {
    width: 9em;
    color: var(--grey-6);
    font-size: 0.8em;
  }
}

.message-list-content__title {
  margin-right: auto;
}

.message-list-content__label {
  padding: 0 10px;
  border: 2px solid var(--branding-color-1-background-color);
  border-radius: 17px;
  font-size: 0.8em;
}
</style>
