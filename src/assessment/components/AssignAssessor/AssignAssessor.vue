<template>
  <div class="assign-assessor">
    <div class="assign-assessor__input">
      <label
        for="autocomplete"
        class="visually-hidden"
        >{{ translate('component.assignAssessor.label') }}</label
      >
      <input
        type="search"
        autocomplete="off"
        id="autocomplete"
        v-model="searchQuery"
        :placeholder="translate('component.assignAssessor.placeholder')"
      />
      <AppIcon name="search" />
    </div>
    <AppSuspense
      v-bind="{ data, error, isFetching }"
      as="datalist"
    >
      <option
        v-for="({ id, name }, index) in data"
        :key="id"
        :class="{
          'is-selected': index === selectedIndex
        }"
        :value="id"
        @click="selectResult(index)"
      >
        {{ name }}
      </option>
      <template #fallback>
        <p class="de-emphasized">
          {{ translate('component.assignAssessor.noResults', { query: searchQuery }) }}
        </p>
      </template>
    </AppSuspense>
    <div v-if="selectedResult">
      <h4>{{ translate('component.assignAssessor.result') }}</h4>
      <p>{{ selectedResult.name }}</p>
    </div>
    <AppButton
      class="assign-assessor__button"
      @click="submit"
      :disabled="isDisabled"
    >
      {{ translate('component.assignAssessor.assign') }}
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'

import { computed, ref } from 'vue'

import { useFetchAssessors } from '@assessment/composables/useFetchAssessors'
import { useAssignCaseAssessor } from '@assessment/composables/useAssignCaseAssessor'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppIcon from '@shared/components/AppIcon/AppIcon.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'

import { translate } from '@shared/i18n'

defineEmits(['select', 'update:modelValue'])

type Props = {
  id: string
}

const props = defineProps<Props>()

const selectedIndex: Ref<number> = ref(-1)

const { data, error, isFetching, searchQuery } = useFetchAssessors(props.id)
const { onSubmitCaseAssessor } = useAssignCaseAssessor()

const selectedResult = computed(() => data.value[selectedIndex.value])

const isDisabled = computed(() =>
  Boolean(
    selectedResult.value &&
      !Object.prototype.hasOwnProperty.call(selectedResult.value, 'id') &&
      !Object.prototype.hasOwnProperty.call(selectedResult.value, 'name')
  )
)

function selectResult(index: number) {
  selectedIndex.value = index
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
  flex-direction: column;
  gap: 1rem;
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

datalist {
  display: block;
  max-height: 175px;
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
