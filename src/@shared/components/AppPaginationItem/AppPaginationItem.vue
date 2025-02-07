<template>
  <li v-if="showStartEllipsis">&mldr;</li>
  <li>
    <AppButton
      :disabled="isDisabled"
      :aria-current="isAriaCurrent"
      @click.prevent="onClick"
    >
      <span class="visually-hidden">{{ t('component.pagination.page') }}</span>
      {{ label }}
    </AppButton>
  </li>
  <li v-if="showEndEllipsis">&mldr;</li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppButton from '@shared/components/AppButton/AppButton.vue'

const emit = defineEmits(['page-change'])

type Props = {
  currentPage: number
  label: number | string
  pageIndex: number
  showSeparator?: boolean
  ellipsisPosition?: 'start' | 'end'
}

const props = defineProps<Props>()

const { t } = useI18n()

const isAriaCurrent = computed<string | undefined>(() =>
  props.currentPage === props.pageIndex ? 'true' : undefined
)

const isDisabled = computed<boolean>(() => props.currentPage === props.pageIndex)

const showEndEllipsis = computed<boolean>(
  () => props.ellipsisPosition === 'end' && props.currentPage > 3
)

const showStartEllipsis = computed<boolean>(
  () => props.ellipsisPosition === 'start' && props.currentPage < props.pageIndex - 2
)

function onClick() {
  emit('page-change', props.pageIndex)
}
</script>
