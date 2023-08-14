<template>
  <div class="message-list">
    <div
      class="message-list-item"
      v-for="({ date, formattedDate, link, title, rel }, index) in list"
      :key="`list-item-${index}`"
    >
      <a
        class="message-list-content"
        :href="link"
        :rel="rel"
        target="_blank"
      >
        <time :datetime="date">
          {{ formattedDate }}
        </time>
        <div>
          {{ title }}
        </div>
      </a>
      <AppIcon
        class="icon"
        name="chevron-right"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { formatDate } from '@shared/utils/date'
import { computed } from 'vue'
import { Rel } from '@shared/external-links'
import AppIcon from '@shared/components/AppIcon/AppIcon.vue'

type Props {
  items: {
    date: string
    title: string
    link: string
  }[]
}
const props = defineProps<Props>()

const { locale } = useI18n()

const list = computed(() => {
  return props.items.map(item => ({
    ...item,
    formattedDate: formatDate(item.date, locale.value),
    rel: [Rel.NO_OPENER, Rel.NO_REFERRER].join(' ')
  }))
})
</script>

<style lang="scss" scoped>
.message-list {
  width: 100%;
  gap: 0;

  &-item {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 0.666em 0 0.666em 1em;
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
      padding-right: 1em;
      font-size: 1em;
      color: var(--branding-color-1-background-color);
    }
  }

  &-content {
    display: flex;
    flex-direction: row;
    text-decoration: none;
    align-items: center;
    width: 100%;

    time {
      width: 10em;
      font-size: 0.8em;
      color: var(--grey-6);
    }
  }
}
</style>
