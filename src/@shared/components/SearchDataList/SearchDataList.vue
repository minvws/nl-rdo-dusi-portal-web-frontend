<template>
  <div class="search-data-list">
    <div class="search-data-list-input">
      <label
        for="autocomplete"
        class="visually-hidden"
        >{{ label }}</label
      >
      <input
        type="search"
        autocomplete="off"
        id="autocomplete"
        v-model="inputValue"
        :placeholder="placeholder"
      />
      <AppIcon name="search" />
    </div>
    <datalist>
      <option
        v-for="(result, index) in filteredResults"
        :key="index"
        :class="{
          'is-selected': index === selectedIndex
        }"
        :value="result"
        @click="selectResult(index)"
      >
        {{ result }}
      </option>
    </datalist>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'

import { ref, computed } from 'vue'

import AppIcon from '@shared/components/AppIcon/AppIcon.vue'

const emit = defineEmits(['select'])

type Props = {
  label: string
  options: string[]
  placeholder?: string
}

const props = defineProps<Props>()

const inputValue: Ref<string> = ref('')
const selectedIndex: Ref<number> = ref(-1)

const filteredResults = computed(() =>
  props.options.filter(result => result.toLowerCase().includes(inputValue.value.toLowerCase()))
)

function selectResult(index: number) {
  selectedIndex.value = index
  const result = filteredResults.value[index]

  emit('select', result)
}
</script>

<style lang="scss" scoped>
.search-data-list {
  border: 1px solid var(--grey-2);
  box-shadow: 0px 8px 16px 0px rgba(17, 20, 22, 0.15);
  max-width: 320px;
}

.search-data-list-input {
  position: relative;
  padding: 1rem;
}

.app-icon {
  position: absolute;
  top: 50%;
  width: 20px;
  right: 1.75rem;
  transform: translateY(-50%);
  color: var(--ruby-red-background-color);
}

input:focus + .app-icon,
input:hover + .app-icon {
  display: none;
}

datalist {
  display: block;
  overflow-y: auto;
  max-height: 250px;
  padding-bottom: 0.375rem;
}

option {
  padding: 0.375rem 1rem;
  cursor: pointer;

  &.is-selected {
    font-weight: bold;
    background-color: var(--application-base-tint-1-background-color);
  }
}
</style>
