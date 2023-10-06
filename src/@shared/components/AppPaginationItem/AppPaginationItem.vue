<template>
  <li v-if="showStartEllipsis">&mldr;</li>
  <li>
    <AppButton
      :disabled="isDisabled"
      :aria-current="isAriaCurrent"
      @click.prevent="onClick"
    >
      <span class="visually-hidden">{{ translate('component.pagination.page') }}</span>
      {{ label }}
    </AppButton>
  </li>
  <li v-if="showEndEllipsis">&mldr;</li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { translate } from '@shared/i18n'

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

const isAriaCurrent = computed(() => (props.currentPage === props.pageIndex ? 'true' : undefined))

const isDisabled = computed(() => props.currentPage === props.pageIndex)

const showEndEllipsis = computed(() => props.ellipsisPosition === 'end' && props.currentPage > 4)

const showStartEllipsis = computed(
  () => props.ellipsisPosition === 'start' && props.currentPage < props.pageIndex - 3
)

function onClick() {
  emit('page-change', props.pageIndex)
}
</script>
