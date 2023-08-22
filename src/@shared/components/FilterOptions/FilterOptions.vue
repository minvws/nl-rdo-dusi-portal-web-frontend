<template>
  <div
    v-if="forms"
    class="filter"
    v-filters
  >
    <div><slot /></div>
    <FormView
      v-bind="{
        id: type,
        forms,
        hideDebug: true,
        buttonLabels: { submit: translate('component.filterOptions.submit') }
      }"
      @submit="onSubmit"
    />
  </div>
  <FormNotification
    v-else-if="error"
    display-as="error"
    :message="error"
  />
</template>

<script lang="ts" setup>
import type { FormOptions } from '@shared/types/form-options'

import { translate } from '@shared/i18n'
import { useFetchFilterOptions } from '@shared/composables/useFetchFilterOptions'

import FormView from '@shared/components/FormView/FormView.vue'
import vFilters from '@shared/directives/filters'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'

type Props = {
  type: FormOptions
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const { forms, error } = useFetchFilterOptions(props.type)

const onSubmit = (data: FormData) => {
  emit('update:modelValue', data)
}
</script>
