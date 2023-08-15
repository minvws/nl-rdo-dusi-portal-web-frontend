<template>
  <div class="tabs filter-tabs">
    <ul>
      <li
        v-for="(item, index) in items"
        :key="index"
      >
        <AppButton
          class="button"
          :class="{ selected: selectedValue && selectedValue.id === item.id }"
          @click="onClick(item)"
        >
          {{ item.text }} ({{ item.count }})
        </AppButton>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

import AppButton from '@shared/components/AppButton/AppButton.vue'

import type { FilterItem } from '@shared/types/table'

const emit = defineEmits(['change'])

type Props = {
  items: FilterItem[]
}

const props = defineProps<Props>()

const selectedValue = ref<FilterItem | null>(null)

onBeforeMount(() => (selectedValue.value = props.items[0]))

function onClick(item: FilterItem | null) {
  selectedValue.value = item

  emit('change', item)
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
