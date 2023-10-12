<template>
  <div
    v-if="forms"
    class="filter"
    v-filters
  >
    <div ref="el"><slot /></div>
    <FormView
      v-bind="{
        id: type,
        forms,
        buttonLabels: { submit: translate('component.filterOptions.submit') },
        hideDebug: true,
        hideRequiredLabel: true,
        persistent: true
      }"
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
import type { Ref } from 'vue'
import type { FormOptions } from '@shared/types/form-options'
import type { FormData } from '@shared/types/form'

import { ref } from 'vue'

import { translate } from '@shared/i18n'
import { useFetchFilterOptions } from '@shared/composables/useFetchFilterOptions'

import FormView from '@shared/components/FormView/FormView.vue'
import vFilters from '@shared/directives/filters'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'

import { toggleAriaExpanded } from '@shared/utils/button'

type Props = {
  type: FormOptions
  autoClose?: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'close'])

const el: Ref = ref()
const { forms, error } = useFetchFilterOptions(props.type)

function onSubmit(data: FormData) {
  emit('update:modelValue', data)
  if (!props.autoClose) return
  const button = el.value?.querySelector('button')
  if (toggleAriaExpanded(button, true)) {
    // filter is closed, scroll to top
    scrollTo(0, 0)
  }
}
</script>
