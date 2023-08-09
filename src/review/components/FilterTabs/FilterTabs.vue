<template>
  <div class="tabs filter-tabs">
    <ul>
      <li
        v-for="(item, index) in items"
        :key="index"
      >
        <AppButton
          class="button"
          :class="{ selected: selectedValue && item.id === selectedValue.id }"
          @click="onClick(item)"
        >
          {{ item.text }} ({{ item.count }})
        </AppButton>
      </li>
      <li v-if="showAll">
        <AppButton
          class="button"
          @click="onClick(null)"
          :class="{ selected: selectedValue === null }"
        >
          {{ translate('component.filterTabs.allCases', { count: totalCount }) }}
        </AppButton>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { translate } from '@shared/i18n'

import AppButton from '@shared/components/AppButton/AppButton.vue'

import type { FilterCountItem } from '@shared/types/table'

const emit = defineEmits(['update:modelValue'])

type Props = {
  items: FilterCountItem[]
  modelValue: FilterCountItem | null
  showAll?: boolean
  totalCount?: number
}

const props = defineProps<Props>()

onBeforeMount(() => (selectedValue.value = props.items[0]))

const selectedValue = computed({
  get() {
    return props.modelValue
  },
  set(newVal) {
    emit('update:modelValue', newVal)
  }
})

function onClick(item: FilterCountItem | null) {
  selectedValue.value = item
}
</script>

<style lang="scss" scoped>
.filter-tabs .button {
  --button-base-background-color: transparent;
  --button-base-border-color: transparent;
  --button-base-text-color: var(--grey-5);
  --button-base-hover-background-color: transparent;
  --button-base-hover-text-color: var(--grey-5);
  --button-base-focus-background-color: transparent;
  --button-base-focus-text-color: var(--grey-5);
  --button-base-focus-border-color: transparent;
  --button-base-active-background-color: transparent;
  --button-base-active-text-color: var(--grey-5);
  --button-base-active-border-color: transparent;
}

.filter-tabs .button.selected {
  --button-base-selected-background-color: transparent;
  --button-base-selected-text-color: var(--ruby-red-text-color-dark);

  position: relative;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--ruby-red-text-color-dark);
  }
}

.filter-tabs .button.selected:not(:focus) {
  outline: none;
}

.filter-tabs .button.selected:disabled {
  --disabled-cursor: pointer;
  --disabled-opacity: 1;
}
</style>
