<template>
  <div
    v-if="forms"
    class="filter"
    :class="{ disabled }"
    v-filters
  >
    <div ref="el"><slot /></div>
    <FormView
      :aria-label="t('component.filterOptions.title')"
      :button-labels="{ submit: t('component.filterOptions.submit') }"
      :forms="forms"
      hide-debug
      hide-required-label
      :id="type"
      persistent
      @init="onSubmit"
      @submit="onSubmit"
    />
  </div>
  <FormNotification
    v-else-if="error"
    display-as="error"
    :message="error"
  />
</template>

<script setup lang="ts">
import type { FormOptions } from '@shared/types/form-options'
import type { FormData } from '@shared/types/form'

import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useFetchFilterOptions } from '@shared/composables/useFetchFilterOptions'

import FormView from '@shared/components/FormView/FormView.vue'
import vFilters from '@shared/directives/filters'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'

import { toggleAriaExpanded } from '@shared/utils/button'

type Props = {
  type: FormOptions
  autoClose?: boolean
  disabled?: boolean
  modelValue?: FormData
}

const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue', 'close'])

const { t } = useI18n()
const { forms, error } = useFetchFilterOptions(props.type)

const el = ref()

function onSubmit(data: FormData) {
  emit('update:modelValue', data)

  if (!props.autoClose) {
    return
  }

  const button = el.value?.querySelector('button')
  const notExpanded = toggleAriaExpanded(button, true)

  if (notExpanded) {
    // filter is closed, scroll to top
    scrollTo(0, 0)
  }
}
</script>

<style lang="scss" scoped>
.disabled {
  pointer-events: none;
}
</style>
