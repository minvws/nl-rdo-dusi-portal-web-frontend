<template>
  <div class="assign-assessor">
    <div class="assign-assessor__input">
      <label
        for="autocomplete"
        class="visually-hidden"
        >{{ t('component.assignAssessor.label') }}</label
      >
      <input
        type="search"
        autocomplete="off"
        id="autocomplete"
        v-model="searchQuery"
        :placeholder="t('component.assignAssessor.placeholder')"
      />
      <AppIcon name="search" />
    </div>
    <AppSuspense
      class="assign-assessor__list"
      v-bind="{ data, error, isFetching }"
      as="ul"
    >
      <li
        v-for="({ id, name }, index) in data"
        :key="id"
      >
        <AppButton
          type="button"
          class="button"
          :class="{ 'is-selected': index === selectedIndex }"
          @click="selectResult(index)"
        >
          {{ name }}
        </AppButton>
      </li>
      <template #fallback>
        <p class="de-emphasized">
          {{ t('component.assignAssessor.noResults', { query: searchQuery }) }}
        </p>
      </template>
    </AppSuspense>
    <div>
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
    <AppButton
      type="button"
      class="assign-assessor__button"
      :disabled="isDisabled"
      @click="submit"
    >
      {{ t('component.assignAssessor.assign') }}
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useFetchAssessors } from '@assessment/composables/useFetchAssessors'
import { useAssignCaseAssessor } from '@assessment/composables/useAssignCaseAssessor'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppIcon from '@shared/components/AppIcon/AppIcon.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'

defineEmits(['select', 'update:modelValue'])

type Props = {
  id: string
}

const props = defineProps<Props>()

const selectedIndex = ref<number>(-1)

const { t } = useI18n()
const { data, error, isFetching, searchQuery } = useFetchAssessors(props.id)
const { onSubmitCaseAssessor } = useAssignCaseAssessor()

const selectedResult = computed(() => data.value[selectedIndex.value])

const isDisabled = computed<boolean>(() => Boolean(!selectedResult.value))

function selectResult(index: number) {
  selectedIndex.value = selectedIndex.value === index ? -1 : index
}

function submit() {
  if (!selectedResult.value) {
    return
  }

  onSubmitCaseAssessor(props.id, selectedResult.value?.id)
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

  li {
    padding: 0;

    & + li {
      border-top: 1px solid var(--grey-2);
    }
  }

  .button {
    --button-base-background-color: transparent;
    --button-base-border-color: transparent;
    --button-base-border-width: 0;
    --button-base-text-color: var(--ruby-red-text-color-dark);
    --button-base-hover-background-color: var(--ruby-red-tint-2-background-color);
    --button-base-hover-text-color: var(--ruby-red-text-color-dark);
    --button-base-focus-background-color: transparent;
    --button-base-focus-text-color: var(--ruby-red-text-color-dark);
    --button-base-focus-border-color: transparent;
    --button-base-focus-border-width: 0;
    --button-base-active-background-color: transparent;
    --button-base-active-text-color: var(--ruby-red-text-color-dark);
    --button-base-active-border-color: transparent;
    --button-base-active-border-width: 0;
    --button-base-justify-content: flex-start;
    --button-base-focus-outline-color: var(--ruby-red-text-color);
    --button-base-focus-outline-offset: -2px;

    width: 100%;

    &.is-selected {
      background-color: var(--ruby-red-selected-background-color);
      color: var(--ruby-red-text-color);
      font-weight: bold;
    }
  }

  li:nth-child(even) .button {
    --button-base-background-color: var(--application-base-tint-1-background-color);
    --button-base-hover-background-color: var(--ruby-red-tint-2-background-color);
    --button-base-focus-background-color: var(--application-base-tint-1-background-color);
    --button-base-active-background-color: var(--application-base-tint-1-background-color);
  }
}
</style>
