<template>
  <div class="assign-assessor">
    <div class="assign-assessor__input">
      <label
        for="autocomplete"
        id="assign-assessor-label"
        class="visually-hidden"
      >
        {{ t('component.assignAssessor.label') }}
      </label>
      <div class="combobox">
        <input
          ref="input"
          type="search"
          autocomplete="off"
          id="autocomplete"
          role="combobox"
          aria-autocomplete="list"
          aria-controls="ex1-grid"
          :placeholder="t('component.assignAssessor.placeholder')"
          v-model="searchQuery"
          @keydown.tab="onInputTab"
        />
        <AppIcon name="search" />
      </div>
    </div>
    <div
      class="grid-popup"
      role="listbox"
    >
      <AppSuspense
        class="assign-assessor__list"
        v-bind="{ data, error, isFetching }"
        as="div"
        aria-labelledby="assign-assessor-label"
        role="grid"
      >
        <div
          v-for="({ id, name }, index) in data"
          :key="id"
          ref="list"
          class="assign-assessor__list-item"
          :class="{
            'assign-assessor__list-item--is-selected': selectedIndex === index,
            'assign-assessor__list-item--highlighted': highlightedIndex === index
          }"
          role="option"
          tabindex="0"
          :aria-selected="selectedIndex === index"
          @keydown.arrow-down.prevent="onHighlightNext"
          @keydown.arrow-up.prevent="onHighlightPrevious"
          @keydown.enter.prevent="onSelectAssessor(index)"
          @keydown.tab.prevent.stop="onListTab"
          @keydown.shift.tab.prevent.stop="onListShiftTab"
          @click="onSelectAssessor(index)"
        >
          <div role="gridcell">{{ name }}</div>
        </div>
        <template #fallback>
          <p class="de-emphasized">
            {{ t('component.assignAssessor.noResults', { query: searchQuery }) }}
          </p>
        </template>
      </AppSuspense>
    </div>
    <div
      role="region"
      aria-live="polite"
      aria-atomic="true"
    >
      <p v-if="selectedResult">
        {{ t('component.assignAssessor.result') }}
        <strong>{{ selectedResult.name }}</strong>
      </p>
      <p
        v-else
        class="de-emphasized"
      >
        {{ t('component.assignAssessor.noSelection') }}
      </p>
    </div>
    <div class="assign-assessor__actions">
      <button
        ref="cancelButton"
        type="button"
        class="ghost"
        @click="onCancel"
      >
        {{ t('component.assignAssessor.cancel') }}
      </button>
      <button
        ref="submitButton"
        type="button"
        :disabled="isDisabled"
        @click="onSubmit"
      >
        {{ t('component.assignAssessor.assign') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useFetchAssessors } from '@assessment/composables/useFetchAssessors'
import { useAssignCaseAssessor } from '@assessment/composables/useAssignCaseAssessor'
import { useAppModalStore } from '@shared/store/useAppModalStore'

import AppIcon from '@shared/components/AppIcon/AppIcon.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'

defineEmits(['select', 'update:modelValue'])

type Props = {
  id: string
}

const props = defineProps<Props>()

const selectedIndex = ref<number>(-1)
const highlightedIndex = ref<number>(-1)
const input = ref<HTMLInputElement | null>(null)
const list = ref<HTMLDivElement[]>([])
const cancelButton = ref<HTMLButtonElement | null>(null)

const { t } = useI18n()
const { data, error, isFetching, searchQuery } = useFetchAssessors(props.id)
const { onSubmitCaseAssessor } = useAssignCaseAssessor()
const { closeModal } = useAppModalStore()

const selectedResult = computed<Record<string, string>>(() => data.value[selectedIndex.value])

const isDisabled = computed<boolean>(() => !selectedResult.value)

function onSelectAssessor(index: number): void {
  if (index === selectedIndex.value) {
    selectedIndex.value = -1
  } else {
    selectedIndex.value = index
  }
}

function onCancel(): void {
  selectedIndex.value = -1
  closeModal()
}

function onSubmit(): void {
  if (selectedResult.value) {
    onSubmitCaseAssessor(props.id, selectedResult.value.id)
  }
}

function onHighlightNext(): void {
  if (highlightedIndex.value < data.value.length - 1) {
    highlightedIndex.value = highlightedIndex.value + 1

    if (list.value) {
      list.value[highlightedIndex.value].focus()
    }
  }
}

function onHighlightPrevious(): void {
  if (highlightedIndex.value > 0) {
    highlightedIndex.value = highlightedIndex.value - 1

    if (list.value) {
      list.value[highlightedIndex.value].focus()
    }
  }
}

function onListTab(): void {
  highlightedIndex.value = -1

  if (cancelButton.value) {
    cancelButton.value.focus()
  }
}

function onListShiftTab(): void {
  highlightedIndex.value = -1

  if (input.value) {
    input.value.focus()
  }
}

function onInputTab(): void {
  if (highlightedIndex.value === -1) {
    highlightedIndex.value = 0
  }
}
</script>

<style lang="scss" scoped>
.assign-assessor {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  margin: 1rem 0 0;
}

.assign-assessor__input {
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

.assign-assessor__list {
  display: block;
  max-height: 175px;
  padding: 0;
  padding-bottom: 1rem;
  overflow-y: auto;
  border-bottom: 1px solid var(--grey-3);
  list-style: none;
}

.assign-assessor__list-item {
  display: flex;
  align-items: center;
  padding: 0.5em 0.75em;
  cursor: pointer;

  &:focus {
    outline: 2px dotted #000;
    outline-offset: -2px;
  }

  &:nth-child(even) {
    background-color: var(--application-base-tint-1-background-color);

    &.assign-assessor__list-item--highlighted {
      background-color: var(--ruby-red-tint-2-background-color);
    }

    &.assign-assessor__list-item--is-selected {
      background-color: var(--ruby-red-selected-background-color);
      color: var(--ruby-red-text-color);
      font-weight: bold;
    }
  }

  & + .assign-assessor__list-item {
    border-top: 1px solid var(--grey-2);
  }
}

.assign-assessor__list-item--highlighted {
  background-color: var(--ruby-red-tint-2-background-color);
}

.assign-assessor__list-item--is-selected {
  background-color: var(--ruby-red-selected-background-color);
  color: var(--ruby-red-text-color);
  font-weight: bold;
}

.assign-assessor__actions {
  display: flex;
  justify-content: space-between;
}
</style>
