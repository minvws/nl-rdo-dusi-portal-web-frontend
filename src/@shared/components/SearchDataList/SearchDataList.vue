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
        @input="reset"
      />
      <AppIcon name="search" />
    </div>
    <datalist>
      <option
        v-for="({ id, name }, index) in filteredResults"
        :key="id"
        :class="{
          'is-selected': index === selectedIndex
        }"
        :value="id"
        @click="selectResult(index)"
      >
        {{ name }}
      </option>
    </datalist>
    <div v-if="selectedResult">
      <h4>{{ translate('component.searchDataList.result') }}</h4>
      <p>{{ selectedResult.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'

import { ref, computed } from 'vue'

import AppIcon from '@shared/components/AppIcon/AppIcon.vue'

import { translate } from '@shared/i18n'

const emit = defineEmits(['select'])

export type OptionItem = {
  id: string
  name: string
}

type Props = {
  label: string
  options: OptionItem[]
  placeholder?: string
}

const props = defineProps<Props>()

const inputValue: Ref<string> = ref('')
const selectedIndex: Ref<number> = ref(-1)

const selectedResult = computed(() => filteredResults.value[selectedIndex.value])

const filteredResults = computed(() =>
  props.options.filter(result => {
    const name = result.name.toLowerCase()
    const query = inputValue.value.toLowerCase()

    return name.includes(query)
  })
)

function selectResult(index: number) {
  selectedIndex.value = index

  emit('select', selectedResult.value)
}

function reset() {
  selectedIndex.value = -1
}
</script>

<style lang="scss" scoped>
.search-data-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
}

.search-data-list-input {
  position: relative;
}

.app-icon {
  position: absolute;
  top: 50%;
  right: 1.75rem;
  width: 20px;
  transform: translateY(-50%);
  color: var(--ruby-red-background-color);
}

input:focus + .app-icon,
input:hover + .app-icon {
  display: none;
}

datalist {
  display: block;
  max-height: 175px;
  padding-bottom: 0.375rem;
  overflow-y: auto;
}

option {
  padding: 0.375rem 1rem;
  cursor: pointer;

  &.is-selected {
    background-color: var(--application-base-tint-1-background-color);
    font-weight: bold;
  }

  + option {
    border-top: 1px solid var(--grey-2);
  }
}
</style>
